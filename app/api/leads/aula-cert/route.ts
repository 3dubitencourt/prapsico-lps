import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  nome: z.string().trim().min(3),
  whatsapp: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10),
  email: z.string().trim().email(),
});

type Lead = z.infer<typeof bodySchema> & { source: string; createdAt: string };

async function sendToCRM(lead: Lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log("[aula-cert] CRM_WEBHOOK_URL not set — skipping. Lead:", lead);
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
    console.error("[aula-cert] CRM webhook failed:", err);
  }
}

async function sendTransactionalEmail(lead: Lead) {
  // TODO: integrar provedor real (Resend / SendGrid / Mailgun).
  console.log("[aula-cert] email transacional (placeholder):", lead.email);
}

async function enqueueWhatsAppNurture(lead: Lead) {
  // TODO: enfileirar no fluxo de aquecimento WhatsApp 7 dias.
  console.log("[aula-cert] WhatsApp nurture 7d (placeholder):", lead.whatsapp);
}

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Body inválido." },
      { status: 400 },
    );
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
    source: "aula-gratuita-cert",
    createdAt: new Date().toISOString(),
  };

  const summary =
    `📚 *Lead · Aula Gratuita CERT*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `Fonte: aula-gratuita-cert`;

  await Promise.allSettled([
    sendToCRM(lead),
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
    }),
    sendTransactionalEmail(lead),
    enqueueWhatsAppNurture(lead),
    notifyTeamWhatsApp({ source: "aula-cert", summary }),
  ]);

  return NextResponse.json({ ok: true });
}
