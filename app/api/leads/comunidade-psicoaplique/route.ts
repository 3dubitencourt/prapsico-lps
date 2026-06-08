import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===========================================================================
 *  ROTA DE CAPTURA — Comunidade Psicoaplique (carta de vendas cega)
 *  Recebe { nome, email, whatsapp } + UTMs e dispara em paralelo:
 *    - sendToCRM  → grava o lead no webhook (Apps Script / Make / Zapier)
 *    - notifySalesTeam → Slack/Telegram (se configurados)
 *    - pushToKommo → CRM Kommo (se configurado)
 *    - notifyTeamWhatsApp → aviso do time no WhatsApp (se configurado)
 *  TODO/CONFIG: cada destino é PULADO em silêncio se a env não estiver setada,
 *  então o formulário nunca quebra. Configure só o que for usar.
 *    • CRM_WEBHOOK_URL  → endpoint que grava o lead (principal do MVP)
 *    • COMUNIDADE_WEBHOOK_URL → opcional: webhook só desta LP (tem prioridade)
 * =========================================================================== */

const bodySchema = z.object({
  nome: z.string().trim().min(3),
  email: z.string().trim().email(),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  utm_source: z.string().trim().optional(),
  utm_medium: z.string().trim().optional(),
  utm_campaign: z.string().trim().optional(),
});

type Lead = z.infer<typeof bodySchema> & {
  source: string;
  leadType: "captura";
  createdAt: string;
};

async function sendToCRM(lead: Lead) {
  // Prioriza um webhook dedicado desta LP; cai pro CRM_WEBHOOK_URL geral.
  const url =
    process.env.COMUNIDADE_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log(
      "[comunidade-psicoaplique] CRM_WEBHOOK_URL/COMUNIDADE_WEBHOOK_URL not set — skipping. Lead:",
      lead,
    );
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[comunidade-psicoaplique] CRM webhook failed:", err);
  }
}

async function notifySalesTeam(summary: string) {
  const slackUrl = process.env.SLACK_LEADS_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChat = process.env.TELEGRAM_LEADS_CHAT_ID;

  const jobs: Promise<unknown>[] = [];

  if (slackUrl) {
    jobs.push(
      fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
        cache: "no-store",
      }).catch((err) =>
        console.error("[comunidade-psicoaplique] slack notify failed:", err),
      ),
    );
  }

  if (telegramToken && telegramChat) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChat,
          text: summary,
          parse_mode: "Markdown",
        }),
        cache: "no-store",
      }).catch((err) =>
        console.error("[comunidade-psicoaplique] telegram notify failed:", err),
      ),
    );
  }

  if (!slackUrl && !telegramChat) {
    console.log("[comunidade-psicoaplique] sales notify (placeholder):", summary);
  }

  await Promise.allSettled(jobs);
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const lead: Lead = {
    ...parsed.data,
    source: "comunidade-psicoaplique",
    leadType: "captura",
    createdAt: new Date().toISOString(),
  };

  const utmLine = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
    .filter(Boolean)
    .join(" / ");

  const teamSummary =
    `🎁 *Lead novo · Comunidade Psicoaplique*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    (utmLine ? `*Origem:* ${utmLine}\n` : "") +
    `📲 Vai chamar pelo WhatsApp pra resgatar R$100 + bônus`;

  await Promise.allSettled([
    sendToCRM(lead),
    notifySalesTeam(teamSummary),
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      leadType: lead.leadType,
      pipeline: "comunidade",
      extraFields: utmLine ? { Origem: utmLine } : undefined,
    }),
    notifyTeamWhatsApp({ source: "comunidade-psicoaplique", summary: teamSummary }),
  ]);

  return NextResponse.json({ ok: true });
}
