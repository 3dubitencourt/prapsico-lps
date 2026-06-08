/**
 * Leitura read-only das campanhas no Meta Ads (Graph API).
 *
 * Precisa de duas envs:
 *   META_ADS_TOKEN       — token de acesso com permissão ads_read
 *   META_AD_ACCOUNT_ID   — id da conta, ex "act_412861414433318"
 *
 * Sem elas, retorna { configured: false } e o painel mostra como conectar.
 * É só leitura — o painel nunca altera campanha.
 */

const GRAPH = "https://graph.facebook.com/v21.0";

export type CampaignRow = {
  id: string;
  name: string;
  status: string;
  dailyBudget: number | null; // R$
  spend: number; // R$
  impressions: number;
  clicks: number;
  ctr: number; // %
  cpc: number; // R$
  results: number; // compras (ou leads)
  resultLabel: string;
  costPerResult: number | null; // R$
};

export type CampaignsResult =
  | { configured: false }
  | {
      configured: true;
      datePreset: string;
      accountId: string;
      totals: { spend: number; results: number; cac: number | null };
      campaigns: CampaignRow[];
    };

function num(v: unknown): number {
  const n = typeof v === "string" ? parseFloat(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

/** Extrai um "resultado" das actions do insight (prioriza compra, cai pra lead). */
function pickResult(actions: { action_type: string; value: string }[] | undefined): {
  count: number;
  label: string;
} {
  if (!actions) return { count: 0, label: "Resultados" };
  const find = (...types: string[]) =>
    actions.find((a) => types.includes(a.action_type));

  const purchase = find(
    "purchase",
    "omni_purchase",
    "offsite_conversion.fb_pixel_purchase",
  );
  if (purchase) return { count: num(purchase.value), label: "Compras" };

  const lead = find(
    "lead",
    "offsite_conversion.fb_pixel_lead",
    "onsite_conversion.lead_grouped",
  );
  if (lead) return { count: num(lead.value), label: "Leads" };

  const ic = find(
    "initiate_checkout",
    "offsite_conversion.fb_pixel_initiate_checkout",
  );
  if (ic) return { count: num(ic.value), label: "Checkouts" };

  return { count: 0, label: "Resultados" };
}

export async function getCampaigns(
  datePreset = "maximum",
): Promise<CampaignsResult> {
  const token = process.env.META_ADS_TOKEN;
  const account = process.env.META_AD_ACCOUNT_ID;
  if (!token || !account) return { configured: false };

  const fields = [
    "name",
    "status",
    "daily_budget",
    `insights.date_preset(${datePreset}){spend,impressions,clicks,ctr,cpc,actions}`,
  ].join(",");

  const url =
    `${GRAPH}/${account}/campaigns?fields=${encodeURIComponent(fields)}` +
    `&limit=200&access_token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Meta API ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    data?: Array<{
      id: string;
      name: string;
      status: string;
      daily_budget?: string;
      insights?: {
        data?: Array<{
          spend?: string;
          impressions?: string;
          clicks?: string;
          ctr?: string;
          cpc?: string;
          actions?: { action_type: string; value: string }[];
        }>;
      };
    }>;
  };

  const campaigns: CampaignRow[] = (json.data ?? []).map((c) => {
    const ins = c.insights?.data?.[0];
    const spend = num(ins?.spend);
    const { count: results, label } = pickResult(ins?.actions);
    return {
      id: c.id,
      name: c.name,
      status: c.status,
      dailyBudget: c.daily_budget ? num(c.daily_budget) / 100 : null,
      spend,
      impressions: num(ins?.impressions),
      clicks: num(ins?.clicks),
      ctr: num(ins?.ctr),
      cpc: num(ins?.cpc),
      results,
      resultLabel: label,
      costPerResult: results > 0 ? spend / results : null,
    };
  });

  const totalSpend = campaigns.reduce((s, c) => s + c.spend, 0);
  const totalResults = campaigns.reduce((s, c) => s + c.results, 0);

  return {
    configured: true,
    datePreset,
    accountId: account,
    totals: {
      spend: totalSpend,
      results: totalResults,
      cac: totalResults > 0 ? totalSpend / totalResults : null,
    },
    campaigns: campaigns.sort((a, b) => b.spend - a.spend),
  };
}
