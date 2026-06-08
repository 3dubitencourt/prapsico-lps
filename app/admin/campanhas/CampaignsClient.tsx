"use client";

import { useEffect, useState } from "react";
import { RefreshCw, BarChart3, AlertCircle } from "lucide-react";

type CampaignRow = {
  id: string;
  name: string;
  status: string;
  dailyBudget: number | null;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  results: number;
  resultLabel: string;
  costPerResult: number | null;
};

type Result =
  | { configured: false }
  | { configured: true; error?: string }
  | {
      configured: true;
      accountId: string;
      totals: { spend: number; results: number; cac: number | null };
      campaigns: CampaignRow[];
    };

const PRESETS: { key: string; label: string }[] = [
  { key: "today", label: "Hoje" },
  { key: "yesterday", label: "Ontem" },
  { key: "last_7d", label: "7 dias" },
  { key: "last_30d", label: "30 dias" },
  { key: "maximum", label: "Tudo" },
];

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const int = (n: number) => n.toLocaleString("pt-BR");

function statusBadge(status: string) {
  const active = status === "ACTIVE";
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
        active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
      }`}
    >
      {active ? "Ativa" : "Pausada"}
    </span>
  );
}

export function CampaignsClient() {
  const [preset, setPreset] = useState("last_7d");
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  async function load(p = preset) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/campaigns?preset=${p}`, {
        cache: "no-store",
      });
      setData(await res.json());
    } catch {
      setData({ configured: true, error: "Falha ao consultar o Meta." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(preset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  if (loading && !data) {
    return <p className="text-sm text-slate-500">Carregando…</p>;
  }

  if (data && data.configured === false) {
    return <NotConfigured />;
  }

  if (data && "error" in data && data.error) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">Não consegui falar com o Meta agora.</p>
          <p className="mt-1 text-amber-700">{data.error}</p>
          <p className="mt-1 text-xs text-amber-600">
            Geralmente é o token que expirou. Veja como renovar abaixo.
          </p>
        </div>
      </div>
    );
  }

  if (!data || !("campaigns" in data)) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              onClick={() => setPreset(p.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                preset === p.key
                  ? "bg-[#06163A] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => load()}
          className="flex items-center gap-2 self-start rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </button>
      </div>

      {/* Totais */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Investido" value={brl(data.totals.spend)} />
        <Stat label="Resultados" value={int(data.totals.results)} />
        <Stat
          label="Custo por resultado (CAC)"
          value={data.totals.cac != null ? brl(data.totals.cac) : "—"}
        />
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Campanha</th>
                <th className="px-4 py-3 font-semibold">Investido</th>
                <th className="px-4 py-3 font-semibold">Result.</th>
                <th className="px-4 py-3 font-semibold">Custo/result.</th>
                <th className="px-4 py-3 font-semibold">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="block font-medium text-slate-900">{c.name}</span>
                    <span className="mt-0.5 flex items-center gap-2">
                      {statusBadge(c.status)}
                      {c.dailyBudget != null && (
                        <span className="text-xs text-slate-400">
                          {brl(c.dailyBudget)}/dia
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{brl(c.spend)}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {int(c.results)}
                    <span className="block text-xs text-slate-400">
                      {c.resultLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {c.costPerResult != null ? brl(c.costPerResult) : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {c.ctr.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {data.campaigns.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-400">
                    Nenhuma campanha no período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-400">
        Dados direto do Meta Ads · conta {data.accountId} · somente leitura.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-6">
        <BarChart3 className="mt-0.5 h-6 w-6 shrink-0 text-slate-400" />
        <div className="text-sm text-slate-600">
          <p className="text-base font-semibold text-slate-900">
            Conectar o Meta Ads
          </p>
          <p className="mt-2">
            Pra ver gastos, resultados e CAC das campanhas aqui, precisa
            configurar duas chaves no projeto (Vercel → Settings → Environment
            Variables):
          </p>
          <ul className="mt-3 space-y-2">
            <li className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs">
              META_ADS_TOKEN = <span className="text-slate-400">token de acesso (ads_read)</span>
            </li>
            <li className="rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs">
              META_AD_ACCOUNT_ID = act_412861414433318
            </li>
          </ul>
          <p className="mt-3 text-xs text-slate-400">
            O token sai do Gerenciador de Negócios do Meta. É só leitura — este
            painel nunca altera campanha. Me chama que eu ajudo a gerar o token.
          </p>
        </div>
      </div>
    </div>
  );
}
