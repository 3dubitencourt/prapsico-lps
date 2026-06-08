import { NextResponse } from "next/server";
import { z } from "zod";
import { notifyTeamWhatsApp } from "@/lib/leads/notify-whatsapp";
import { pushToKommo } from "@/lib/leads/kommo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORMATION_OPTIONS = ["recem", "2_a_5", "mais_de_5"] as const;

const FORMATION_LABELS: Record<(typeof FORMATION_OPTIONS)[number], string> = {
  recem: "Recém-formado (≤ 2 anos)",
  "2_a_5": "2 a 5 anos",
  mais_de_5: "Mais de 5 anos",
};

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
    .refine((v) => /^\d{2}\/\d{4,6}$/.test(v), {
      message: "CRP no formato UF/NÚMERO (ex.: 04/12345)",
    }),
  formation: z.enum(FORMATION_OPTIONS),
});

type Lead = z.infer<typeof bodySchema> & {
  source: string;
  persona: "B";
  tags: string[];
  createdAt: string;
};

async function sendToCRM(lead: Lead) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.log("[aula-pos] CRM_WEBHOOK_URL not set — skipping. Lead:", lead);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        formation_label: FORMATION_LABELS[lead.formation],
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[aula-pos] CRM webhook failed:", err);
  }
}

async function sendTransactionalEmail(lead: Lead) {
  // TODO: integrar provedor real (Resend / SendGrid / Mailgun) com link da aula.
  console.log("[aula-pos] email transacional (placeholder):", lead.email);
}

async function enqueueWhatsAppNurture(lead: Lead) {
  // TODO: enfileirar no fluxo de aquecimento WhatsApp 7 dias.
  // Tom técnico: cases, estudos, referências — não motivacional.
  console.log("[aula-pos] WhatsApp nurture 7d técnico (placeholder):", {
    phone: lead.whatsapp,
    persona: lead.persona,
    formation: lead.formation,
  });
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
    source: "aula-gratuita-pos",
    persona: "B",
    tags: ["persona_B", `formation_${parsed.data.formation}`],
    createdAt: new Date().toISOString(),
  };

  const summary =
    `🎓 *Lead · Aula Gratuita PÓS (Persona B)*\n` +
    `*Nome:* ${lead.nome}\n` +
    `*CRP:* ${lead.crp}\n` +
    `*WhatsApp:* ${lead.whatsapp}\n` +
    `*E-mail:* ${lead.email}\n` +
    `*Formação:* ${FORMATION_LABELS[lead.formation]}\n` +
    `Fonte: aula-gratuita-pos`;

  await Promise.allSettled([
    sendToCRM(lead),
    pushToKommo({
      source: lead.source,
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      email: lead.email,
      crp: lead.crp,
      formation_label: FORMATION_LABELS[lead.formation],
      persona: lead.persona,
      tags: lead.tags,
    }),
    sendTransactionalEmail(lead),
    enqueueWhatsAppNurture(lead),
    notifyTeamWhatsApp({ source: "aula-pos", summary }),
  ]);

  return NextResponse.json({ ok: true });
}
