"use client";

import { createContext, useContext, type ReactNode } from "react";
import { CHECKOUT_URL, FAQS } from "./constants";

export type FaqItem = { q: string; a: string };
export type CertContent = { checkoutUrl: string; faqs: FaqItem[] };

/** Default = o que está no código. Se o admin não sobrescrever, é idêntico a hoje. */
const DEFAULT: CertContent = {
  checkoutUrl: CHECKOUT_URL,
  faqs: FAQS as FaqItem[],
};

const CertContentContext = createContext<CertContent>(DEFAULT);

export function CertContentProvider({
  value,
  children,
}: {
  value?: Partial<CertContent>;
  children: ReactNode;
}) {
  const merged: CertContent = {
    checkoutUrl: value?.checkoutUrl ?? DEFAULT.checkoutUrl,
    faqs: value?.faqs && value.faqs.length > 0 ? value.faqs : DEFAULT.faqs,
  };
  return (
    <CertContentContext.Provider value={merged}>
      {children}
    </CertContentContext.Provider>
  );
}

export function useCertContent() {
  return useContext(CertContentContext);
}
