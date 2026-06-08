import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AREA_OPTIONS = [
  "consultorio_proprio",
  "clinica_instituicao",
  "recem_formado",
  "outra_area_psi",
] as const;

const TIMING_OPTIONS = ["proxima_turma", "3_meses", "avaliando"] as const;

const bodySchema = z.object({
  nome: z.string().trim().min(3),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().email(),
  crp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 4),
  area: z.enum(AREA_OPTIONS),
  timing: z.enum(TIMING_OPTIONS),
});

type Lead = z.infer<typeof bodySchema> & {
  source: string;
  persona: "B";
  leadType: "qualified";
  pipeline: "coordenacao_academica";
  createdAt: string;
};

const AREA_LABELS: Record<(typeof AREA_OPTIONS)[number], string> = {
  consultorio_proprio: "Sim, em consultório próprio",
  clinica_instituicao: "Sim, em clínica/instituição",
  recem_formado: "Ainda não, recém-formado",
  outra_area_psi: "Trabalho em outra área da Psi",
};

const TIMING_LABELS: Record<(typeof TIMING_OPTIONS)[number], string> = {
  proxima_turma: "Próxima turma",
  "3_meses": "Próximos 3 meses",
  avaliando: "Ainda avaliando",
};

async function sendToCRM(lead: Lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log("[inscricao-pos] CRM_WEBHOOK_URL not set — skipping. Lead:", lead);
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
        tags: ["persona_B", `atuacao_${lead.area}`, `timing_${lead.timing}`],
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[inscricao-pos] CRM webhook failed:", err);
  }
}

async function notifyCoordination(lead: Lead) {
  const slackUrl =
    process.env.SLACK_COORDENACAO_WEBHOOK_URL ||
    process.env.SLACK_LEADS_WEBHOOK_URL;
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChat =
    process.env.TELEGRAM_COORDENACAO_CHAT_ID ||
    process.env.TELEGRAM_LEADS_CHAT_ID;

  const summary =
    `🎓 *Lead qualificado · PÓS (Persona B)*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*CRP:* ${lead.crp}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `*Atende hoje:* ${AREA_LABELS[lead.area]}\n` +
    `*Timing:* ${TIMING_LABELS[lead.timing]}\n` +
    `📞 Pipeline: Coordenação Acadêmica\n` +
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
        console.error("[inscricao-pos] slack notify failed:", err),
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
        console.error("[inscricao-pos] telegram notify failed:", err),
      ),
    );
  }

  if (!slackUrl && !telegramChat) {
    console.log("[inscricao-pos] coordination notify (placeholder):", summary);
  }

  await Promise.allSettled(jobs);
}

async function sendAutoWhatsApp(lead: Lead) {
  const url = process.env.WHATSAPP_AUTOMSG_WEBHOOK_URL;
  const phoneDigits = lead.whatsapp.replace(/\D/g, "");
  const firstName = lead.nome.split(" ")[0];
  const message =
    `Olá, Dr(a). ${firstName}! Somos da Coordenação Acadêmica da pós em Psicologia Positiva e Neurociência Afetiva (Prapsico × Anhanguera). ` +
    `Recebemos sua manifestação de interesse e em até 5 minutos um membro da coordenação te chama por aqui pra apresentar a grade e tirar dúvidas técnicas. ` +
    `Até já. 📚`;

  if (!url) {
    console.log("[inscricao-pos] WhatsApp auto-msg (placeholder):", {
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
    console.error("[inscricao-pos] WhatsApp auto-msg failed:", err);
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
    source: "inscricao-pos",
    persona: "B",
    leadType: "qualified",
    pipeline: "coordenacao_academica",
    createdAt: new Date().toISOString(),
  };

  const teamSummary =
    `🎓 *Lead qualificado · PÓS (Persona B)*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*CRP:* ${lead.crp}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `*Atende hoje:* ${AREA_LABELS[lead.area]}\n` +
    `*Timing:* ${TIMING_LABELS[lead.timing]}\n` +
    `📞 Pipeline: Coordenação Acadêmica\n` +
    `⏱ Meta: 1ª resposta < 5min`;

  await Promise.allSettled([
    sendToCRM(lead),
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      crp: lead.crp,
      area_label: AREA_LABELS[lead.area],
      timing_label: TIMING_LABELS[lead.timing],
      persona: lead.persona,
      pipeline: lead.pipeline,
      leadType: lead.leadType,
    }),
    notifyCoordination(lead),
    sendAutoWhatsApp(lead),
    notifyTeamWhatsApp({ source: "inscricao-pos", summary: teamSummary }),
  ]);

  return NextResponse.json({ ok: true });
}
