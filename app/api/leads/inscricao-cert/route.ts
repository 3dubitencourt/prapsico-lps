import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AREA_OPTIONS = [
  "terapia_alternativa",
  "cuidador",
  "ainda_nao",
] as const;

const TIMING_OPTIONS = ["esse_mes", "3_meses", "pesquisando"] as const;

const bodySchema = z.object({
  nome: z.string().trim().min(3),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().email(),
  area: z.enum(AREA_OPTIONS),
  timing: z.enum(TIMING_OPTIONS),
});

type Lead = z.infer<typeof bodySchema> & {
  source: string;
  leadType: "qualified";
  createdAt: string;
};

const AREA_LABELS: Record<(typeof AREA_OPTIONS)[number], string> = {
  terapia_alternativa: "Sim, com terapia alternativa",
  cuidador: "Sim, como cuidador(a)",
  ainda_nao: "Ainda não, mas quero começar",
};

const TIMING_LABELS: Record<(typeof TIMING_OPTIONS)[number], string> = {
  esse_mes: "Esse mês",
  "3_meses": "Próximos 3 meses",
  pesquisando: "Ainda pesquisando",
};

async function sendToCRM(lead: Lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log("[inscricao-cert] CRM_WEBHOOK_URL not set — skipping. Lead:", lead);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        area_label: AREA_LABELS[lead.area],
        timing_label: TIMING_LABELS[lead.timing],
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[inscricao-cert] CRM webhook failed:", err);
  }
}

async function notifySalesTeam(lead: Lead) {
  const slackUrl = process.env.SLACK_LEADS_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChat = process.env.TELEGRAM_LEADS_CHAT_ID;

  const summary =
    `🔥 *Lead qualificado · CERT*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `*Atua:* ${AREA_LABELS[lead.area]}\n` +
    `*Timing:* ${TIMING_LABELS[lead.timing]}\n` +
    `⏱ Meta: 1ª resposta < 5min`;

  const jobs: Promise<unknown>[] = [];

  if (slackUrl) {
    jobs.push(
      fetch(slackUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
        cache: "no-store",
      }).catch((err) =>
        console.error("[inscricao-cert] slack notify failed:", err),
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
        console.error("[inscricao-cert] telegram notify failed:", err),
      ),
    );
  }

  if (!slackUrl && !telegramChat) {
    console.log("[inscricao-cert] sales notify (placeholder):", summary);
  }

  await Promise.allSettled(jobs);
}

async function sendAutoWhatsApp(lead: Lead) {
  const url = process.env.WHATSAPP_AUTOMSG_WEBHOOK_URL;
  const phoneDigits = lead.whatsapp.replace(/\D/g, "");
  const message = `Olá, ${lead.nome.split(" ")[0]}! Recebemos seus dados aqui na Prapsico. Em até 5 minutos um especialista te chama por aqui pra entender seu momento e te apresentar a certificação. 💙`;

  if (!url) {
    console.log("[inscricao-cert] WhatsApp auto-msg (placeholder):", {
      phone: phoneDigits,
      message,
    });
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneDigits, message }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[inscricao-cert] WhatsApp auto-msg failed:", err);
  }
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
    source: "inscricao-cert",
    leadType: "qualified",
    createdAt: new Date().toISOString(),
  };

  const teamSummary =
    `🔥 *Lead qualificado · CERT*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `*Atua:* ${AREA_LABELS[lead.area]}\n` +
    `*Timing:* ${TIMING_LABELS[lead.timing]}\n` +
    `⏱ Meta: 1ª resposta < 5min`;

  await Promise.allSettled([
    sendToCRM(lead),
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      area_label: AREA_LABELS[lead.area],
      timing_label: TIMING_LABELS[lead.timing],
      leadType: lead.leadType,
    }),
    notifySalesTeam(lead),
    sendAutoWhatsApp(lead),
    notifyTeamWhatsApp({ source: "inscricao-cert", summary: teamSummary }),
  ]);

  return NextResponse.json({ ok: true });
}
