import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";
import { pushToGoogleSheet } from "@/lib/leads/google-sheet";
import { sendCapiEvent } from "@/lib/meta-capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  nome: z.string().trim().min(3),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  // email não é mais coletado no form (só nome + WhatsApp). Opcional pra compatibilidade.
  email: z.string().trim().email().optional().or(z.literal("")),
  // CAPI / deduplicação (opcionais)
  eventId: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  sourceUrl: z.string().optional(),
});

type Lead = z.infer<typeof bodySchema> & {
  source: string;
  createdAt: string;
};

async function sendAutoWhatsApp(lead: Lead) {
  const url = process.env.WHATSAPP_AUTOMSG_WEBHOOK_URL;
  const phoneDigits = lead.whatsapp.replace(/\D/g, "");
  const message = `Olá, ${lead.nome.split(" ")[0]}! Sua vaga na aula ao vivo de 8 de junho está quase garantida. Conclua o pagamento de R$ 37 pra receber o acesso e entrar no grupo VIP. Qualquer dúvida, é só responder por aqui. 💙`;

  if (!url) {
    console.log("[live-checkout] WhatsApp auto-msg (placeholder):", {
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
    console.error("[live-checkout] WhatsApp auto-msg failed:", err);
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
    source: "live-checkout",
    createdAt: new Date().toISOString(),
  };

  const email = lead.email || "";

  const teamSummary =
    `🎟️ *Lead · LIVE 8 JUN (pré-checkout)*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    (email ? `*E-mail:* ${email}\n` : "") +
    `↳ Clicou pra garantir vaga (R$ 37). Recuperar se não pagar.\n` +
    `⏱ Meta: 1ª resposta < 5min`;

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = req.headers.get("user-agent") || undefined;
  const capiCommon = {
    eventId: lead.eventId || lead.createdAt,
    sourceUrl: lead.sourceUrl,
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    fbp: lead.fbp,
    fbc: lead.fbc,
    clientIp,
    userAgent,
  };

  await Promise.allSettled([
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email,
      tags: ["live-8jun", "pre-checkout"],
    }),
    notifyTeamWhatsApp({ source: "live-checkout", summary: teamSummary }),
    sendAutoWhatsApp(lead),
    pushToGoogleSheet({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email,
      createdAt: lead.createdAt,
    }),
    // CAPI server-side — mesmo event_id do Pixel pra desduplicar
    sendCapiEvent({ ...capiCommon, eventName: "Lead" }),
    sendCapiEvent({ ...capiCommon, eventName: "InitiateCheckout", value: 37, currency: "BRL" }),
  ]);

  return NextResponse.json({ ok: true });
}
