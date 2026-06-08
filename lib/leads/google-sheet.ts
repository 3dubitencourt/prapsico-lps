type SheetLeadInput = {
  source: string;
  nome: string;
  whatsapp: string;
  email: string;
  createdAt?: string;
};

/**
 * Envia o lead pra uma planilha Google via webhook do Apps Script.
 * Falha em silêncio se GOOGLE_SHEETS_WEBHOOK_URL não estiver setada.
 */
export async function pushToGoogleSheet(input: SheetLeadInput): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.log(
      `[${input.source}] GOOGLE_SHEETS_WEBHOOK_URL not set — skipping sheet. Lead:`,
      input,
    );
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: input.createdAt ?? new Date().toISOString(),
        nome: input.nome,
        whatsapp: input.whatsapp,
        email: input.email,
        source: input.source,
      }),
      cache: "no-store",
      redirect: "follow",
    });
  } catch (err) {
    console.error(`[${input.source}] Google Sheet push failed:`, err);
  }
}
