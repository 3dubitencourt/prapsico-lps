import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID || "1639061286623851";
const TOKEN = process.env.META_CAPI_TOKEN;
const API_VERSION = "v21.0";

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10 || d.length === 11) return `55${d}`;
  return d;
}

export type CapiInput = {
  eventName: "Lead" | "InitiateCheckout";
  eventId: string;
  sourceUrl?: string;
  nome?: string;
  whatsapp?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
  value?: number;
  currency?: string;
};

/**
 * Envia um evento server-side pra API de Conversões do Meta.
 * Usa o mesmo event_id do Pixel do navegador → Meta desduplica (event_name + event_id).
 * Falha em silêncio se META_CAPI_TOKEN não estiver setada.
 */
export async function sendCapiEvent(input: CapiInput): Promise<void> {
  if (!TOKEN) {
    console.log(`[meta-capi] META_CAPI_TOKEN não setada — pulando ${input.eventName}.`);
    return;
  }

  const userData: Record<string, unknown> = {};
  if (input.whatsapp) userData.ph = [sha256(normalizePhone(input.whatsapp))];
  if (input.nome) {
    const parts = input.nome.trim().split(/\s+/);
    userData.fn = [sha256(parts[0])];
    if (parts.length > 1) userData.ln = [sha256(parts.slice(1).join(" "))];
  }
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const event: Record<string, unknown> = {
    event_name: input.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    user_data: userData,
  };
  if (input.sourceUrl) event.event_source_url = input.sourceUrl;
  if (input.value != null) {
    event.custom_data = { value: input.value, currency: input.currency || "BRL" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [event] }),
        cache: "no-store",
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "<no body>");
      console.error(`[meta-capi] ${input.eventName} falhou: ${res.status} ${text}`);
    }
  } catch (err) {
    console.error(`[meta-capi] ${input.eventName} erro:`, err);
  }
}
