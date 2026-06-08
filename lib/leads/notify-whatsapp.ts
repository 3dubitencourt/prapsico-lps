const DEFAULT_SALES_PHONE = "5535992571045";

export async function notifyTeamWhatsApp(opts: {
  source: string;
  summary: string;
}) {
  const url = process.env.WHATSAPP_NOTIFY_URL;
  const phone = process.env.SALES_WHATSAPP_NUMBER || DEFAULT_SALES_PHONE;

  if (!url) {
    console.log(`[${opts.source}] WHATSAPP_NOTIFY_URL not set — skipping team notify.`);
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message: opts.summary }),
      cache: "no-store",
    });
  } catch (err) {
    console.error(`[${opts.source}] team WhatsApp notify failed:`, err);
  }
}
