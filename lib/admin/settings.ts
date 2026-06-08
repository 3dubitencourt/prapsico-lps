/**
 * Modelo de conteúdo editável pelo painel /admin.
 *
 * Os DEFAULTS vêm dos constants.ts das LPs (fonte única de verdade). O admin
 * grava apenas overrides no storage; getSettings() faz o merge (override por
 * cima do default). Se um campo nunca foi editado, a LP renderiza idêntica a
 * hoje — zero regressão.
 */

import { kvGet, kvSet } from "@/lib/admin/store";
import {
  CHECKOUT_URL as CERT_CHECKOUT,
  PRICE_MONTHLY as CERT_PRICE_MONTHLY,
  PRICE_LABEL as CERT_PRICE_LABEL,
  INSTALLMENTS_LABEL as CERT_INSTALLMENTS,
  FAQS as CERT_FAQS,
} from "@/components/sections/cert/constants";
import {
  CHECKOUT_URL as POS_CHECKOUT,
  PRICE_MONTHLY as POS_PRICE_MONTHLY,
  PRICE_LABEL as POS_PRICE_LABEL,
  INSTALLMENTS_LABEL as POS_INSTALLMENTS,
  FAQS_POS as POS_FAQS,
} from "@/components/sections/pos/constants";
import {
  REPLAY_DEADLINE_UTC_MS,
  VIMEO_VIDEO_ID,
} from "@/components/sections/replay/constants";

const SETTINGS_KEY = "prapsico:settings";

export type FaqItem = { q: string; a: string };

export type Settings = {
  // Contato global
  whatsappNumber: string; // dígitos com DDI, ex "5535992571045"
  whatsappDisplay: string; // ex "(35) 99257-1045"

  // Certificação
  certCheckoutUrl: string;
  certPriceMonthly: number;
  certPriceLabel: string;
  certInstallmentsLabel: string;
  certFaqs: FaqItem[];

  // Pós-graduação
  posCheckoutUrl: string;
  posPriceMonthly: number;
  posPriceLabel: string;
  posInstallmentsLabel: string;
  posFaqs: FaqItem[];

  // Live (8 jun) + replay
  liveCheckoutUrl: string; // Hotmart
  liveWhatsappGroupUrl: string;
  liveBonusVideoUrl: string; // embed do YouTube
  replayVimeoId: string;
  replayDeadlineMs: number;
};

export const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: "5535992571045",
  whatsappDisplay: "(35) 99257-1045",

  certCheckoutUrl: CERT_CHECKOUT,
  certPriceMonthly: CERT_PRICE_MONTHLY,
  certPriceLabel: CERT_PRICE_LABEL,
  certInstallmentsLabel: CERT_INSTALLMENTS,
  certFaqs: CERT_FAQS as FaqItem[],

  posCheckoutUrl: POS_CHECKOUT,
  posPriceMonthly: POS_PRICE_MONTHLY,
  posPriceLabel: POS_PRICE_LABEL,
  posInstallmentsLabel: POS_INSTALLMENTS,
  posFaqs: POS_FAQS as FaqItem[],

  liveCheckoutUrl: "https://pay.hotmart.com/Q105795816Y",
  liveWhatsappGroupUrl: "https://chat.whatsapp.com/EQ9BB74Jrsh47ppiAVpm05",
  liveBonusVideoUrl: "https://www.youtube.com/embed/pzas_C_FH0U",
  replayVimeoId: VIMEO_VIDEO_ID,
  replayDeadlineMs: REPLAY_DEADLINE_UTC_MS,
};

/** Lê os overrides salvos e mescla sobre os defaults. */
export async function getSettings(): Promise<Settings> {
  const saved = await kvGet<Partial<Settings>>(SETTINGS_KEY);
  if (!saved) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...saved };
}

/** Salva os overrides (apenas os campos enviados são persistidos). */
export async function saveSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = (await kvGet<Partial<Settings>>(SETTINGS_KEY)) ?? {};
  const next = { ...current, ...patch };
  await kvSet(SETTINGS_KEY, next);
  return { ...DEFAULT_SETTINGS, ...next };
}
