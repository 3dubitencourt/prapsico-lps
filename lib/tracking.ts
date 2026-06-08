declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackView() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "view_live_lp" });
}

export function trackCheckout(eventId?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "initiate_checkout",
    value: 37,
    currency: "BRL",
  });
  window.fbq?.(
    "track",
    "InitiateCheckout",
    { value: 37, currency: "BRL" },
    eventId ? { eventID: eventId } : undefined,
  );
}

export function trackLiveLead(eventId?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", item_id: "live-8jun" });
  window.fbq?.(
    "track",
    "Lead",
    { content_name: "live-8jun" },
    eventId ? { eventID: eventId } : undefined,
  );
}

export function trackPurchase(transactionId?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "purchase",
    value: 37,
    currency: "BRL",
    transaction_id: transactionId,
  });
  window.fbq?.("track", "Purchase", { value: 37, currency: "BRL" });
}

export function trackClickWhatsAppGroup() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "click_whatsapp_group" });
}

export function trackPlayBonusVideo() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "play_bonus_video" });
}

export function trackAddToCalendar(type: "google" | "apple" | "outlook") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "add_to_calendar", type });
}

export function trackViewReplay() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "view_replay" });
  window.fbq?.("track", "ViewContent", { content_name: "replay_live_8jun" });
}

export function trackPlayReplay() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "play_replay" });
}

export function trackReplayProgress(milestone: "25%" | "50%" | "75%" | "complete") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `watched_${milestone}` });
}

export function trackReplayQualifiedLead() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "replay_qualified_lead" });
  window.fbq?.("track", "Lead", { content_name: "replay_30min" });
}

export function trackClickPath(path: "cert" | "pos") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "click_path", path });
}

export function trackChapterSeek(chapter: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "replay_chapter_seek", chapter });
}

export function trackViewCert() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "cert",
    item_name: "Certificacao Psicanalise e Neurociencia",
    value: 257,
    currency: "BRL",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "cert",
    content_ids: ["cert"],
    value: 257,
    currency: "BRL",
  });
}

export function trackViewAulaCert() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "aula-cert",
    item_name: "Aula Gratuita Certificacao",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "aula-cert",
    content_ids: ["aula-cert"],
  });
}

export function trackGenerateLeadAulaCert() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    item_id: "aula-cert",
  });
  window.fbq?.("track", "Lead", {
    content_name: "aula-cert",
    content_ids: ["aula-cert"],
  });
}

export function trackViewInscricaoCert() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "inscricao-cert",
    item_name: "Inscricao Certificacao Psicanalise",
    value: 257,
    currency: "BRL",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "inscricao-cert",
    content_category: "cert_qualified",
    content_ids: ["inscricao-cert"],
    value: 257,
    currency: "BRL",
  });
}

export function trackGenerateLeadInscricaoCert() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_type: "qualified",
    persona: "A",
    item_id: "inscricao-cert",
  });
  window.fbq?.("track", "Lead", {
    content_category: "cert_qualified",
    content_name: "inscricao-cert",
    content_ids: ["inscricao-cert"],
  });
}

export function trackViewAulaPos() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "aula-pos",
    item_name: "Aula Gratuita Pos Psicologia Positiva",
    content_category: "pos_graduacao",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "aula-pos",
    content_category: "pos_graduacao",
    content_ids: ["aula-pos"],
  });
}

export function trackGenerateLeadAulaPos(formation?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    persona: "B",
    content_category: "pos_graduacao",
    item_id: "aula-pos",
    formation,
  });
  window.fbq?.("track", "Lead", {
    content_category: "pos_graduacao",
    content_name: "aula-pos",
    content_ids: ["aula-pos"],
  });
}

export function trackViewInscricaoPos() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "inscricao-pos",
    item_name: "Inscricao Pos Psicologia Positiva",
    content_category: "pos_qualified",
    value: 427,
    currency: "BRL",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "inscricao-pos",
    content_category: "pos_qualified",
    content_ids: ["inscricao-pos"],
    value: 427,
    currency: "BRL",
  });
}

export function trackGenerateLeadInscricaoPos(area?: string, timing?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    persona: "B",
    lead_type: "qualified",
    content_category: "pos_qualified",
    item_id: "inscricao-pos",
    area,
    timing,
  });
  window.fbq?.("track", "Lead", {
    content_category: "pos_qualified",
    content_name: "inscricao-pos",
    content_ids: ["inscricao-pos"],
  });
}

export function trackBeginCheckoutCert(source?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "begin_checkout",
    item_id: "cert",
    value: 257,
    currency: "BRL",
    source,
  });
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "cert",
    content_ids: ["cert"],
    value: 257,
    currency: "BRL",
  });
}

export function trackViewPos() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "pos",
    item_name: "Pos Psicologia Positiva e Neurociencia Afetiva",
    value: 427,
    currency: "BRL",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "pos",
    content_ids: ["pos"],
    value: 427,
    currency: "BRL",
  });
}

export function trackBeginCheckoutPos(source?: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "begin_checkout",
    item_id: "pos",
    persona: "B",
    value: 427,
    currency: "BRL",
    source,
  });
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "pos",
    content_ids: ["pos"],
    value: 427,
    currency: "BRL",
  });
}

/* -------------------------------------------------------------------------
 *  COMUNIDADE PSICOAPLIQUE (carta cega · presente desbloqueável)
 *  Preço oculto na página → não enviamos `value`. Persona "outra".
 * ------------------------------------------------------------------------- */

export function trackViewComunidade() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "view_item",
    item_id: "comunidade-psicoaplique",
    item_name: "Comunidade Psicoaplique",
    content_category: "comunidade",
  });
  window.fbq?.("track", "ViewContent", {
    content_name: "comunidade-psicoaplique",
    content_category: "comunidade",
    content_ids: ["comunidade-psicoaplique"],
  });
}

export function trackGenerateLeadComunidade() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_type: "qualified",
    persona: "outra",
    content_category: "comunidade",
    item_id: "comunidade-psicoaplique",
  });
  window.fbq?.("track", "Lead", {
    content_name: "comunidade-psicoaplique",
    content_category: "comunidade",
    content_ids: ["comunidade-psicoaplique"],
  });
}

/** Clique no botão "Resgatar no WhatsApp" do pop-up de revelação. */
export function trackClickWhatsAppComunidade() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "click_whatsapp",
    item_id: "comunidade-psicoaplique",
    content_category: "comunidade",
  });
}
