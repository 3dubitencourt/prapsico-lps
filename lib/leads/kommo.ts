type KommoLeadInput = {
  source: string;
  nome: string;
  whatsapp: string;
  email: string;
  crp?: string;
  area_label?: string;
  timing_label?: string;
  formation_label?: string;
  persona?: string;
  pipeline?: string;
  leadType?: string;
  tags?: string[];
  extraFields?: Record<string, string>;
};

const ENUM_WORK = "WORK";

function digits(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) return `55${d}`;
  return d;
}

function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function buildTags(input: KommoLeadInput): string[] {
  const base = [`source:${input.source}`];
  if (input.source.includes("cert")) base.push("produto:cert");
  else if (input.source.includes("pos")) base.push("produto:pos");
  if (input.persona) base.push(`persona_${input.persona}`);
  if (input.leadType) base.push(input.leadType);
  if (input.pipeline) base.push(`pipeline:${input.pipeline}`);
  if (input.tags?.length) base.push(...input.tags);
  return base;
}

function buildNote(input: KommoLeadInput): string {
  const lines = [
    `Fonte: ${input.source}`,
    input.area_label && `Atuação: ${input.area_label}`,
    input.timing_label && `Timing: ${input.timing_label}`,
    input.formation_label && `Formação: ${input.formation_label}`,
    input.crp && `CRP: ${input.crp}`,
    input.persona && `Persona: ${input.persona}`,
    input.pipeline && `Pipeline sugerido: ${input.pipeline}`,
  ].filter(Boolean);

  if (input.extraFields) {
    for (const [k, v] of Object.entries(input.extraFields)) {
      lines.push(`${k}: ${v}`);
    }
  }

  return lines.join("\n");
}

export async function pushToKommo(input: KommoLeadInput): Promise<void> {
  const subdomain = process.env.KOMMO_SUBDOMAIN;
  const token = process.env.KOMMO_ACCESS_TOKEN;

  if (!subdomain || !token) {
    console.log(
      `[${input.source}] Kommo env missing (KOMMO_SUBDOMAIN/KOMMO_ACCESS_TOKEN) — skipping. Lead:`,
      input,
    );
    return;
  }

  const { first, last } = splitName(input.nome);
  const phone = digits(input.whatsapp);
  const tags = buildTags(input);
  const pipelineId = process.env.KOMMO_PIPELINE_ID
    ? Number(process.env.KOMMO_PIPELINE_ID)
    : undefined;

  const customFields: Array<{
    field_code: string;
    values: Array<{ value: string; enum_code: string }>;
  }> = [
    {
      field_code: "PHONE",
      values: [{ value: phone, enum_code: ENUM_WORK }],
    },
  ];
  if (input.email) {
    customFields.push({
      field_code: "EMAIL",
      values: [{ value: input.email, enum_code: ENUM_WORK }],
    });
  }

  const body = [
    {
      name: `Lead · ${input.source}`,
      ...(pipelineId ? { pipeline_id: pipelineId } : {}),
      _embedded: {
        contacts: [
          {
            first_name: first,
            last_name: last,
            custom_fields_values: customFields,
          },
        ],
        tags: tags.map((name) => ({ name })),
      },
    },
  ];

  try {
    const res = await fetch(
      `https://${subdomain}.kommo.com/api/v4/leads/complex`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "<no body>");
      console.error(
        `[${input.source}] Kommo create lead failed: ${res.status} ${text}`,
      );
      return;
    }

    const data = (await res.json().catch(() => null)) as
      | Array<{ id?: number; contact_id?: number }>
      | null;
    const leadId = data?.[0]?.id;

    if (leadId) {
      await attachNote(subdomain, token, leadId, buildNote(input)).catch((err) =>
        console.error(`[${input.source}] Kommo note attach failed:`, err),
      );
    }
  } catch (err) {
    console.error(`[${input.source}] Kommo push failed:`, err);
  }
}

async function attachNote(
  subdomain: string,
  token: string,
  leadId: number,
  text: string,
): Promise<void> {
  if (!text) return;
  await fetch(
    `https://${subdomain}.kommo.com/api/v4/leads/${leadId}/notes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify([
        {
          note_type: "common",
          params: { text },
        },
      ]),
      cache: "no-store",
    },
  );
}
