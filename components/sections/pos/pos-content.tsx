"use client";

import { createContext, useContext, type ReactNode } from "react";
import { CHECKOUT_URL, FAQS_POS } from "./constants";

export type FaqItem = { q: string; a: string };
export type PosContent = { checkoutUrl: string; faqs: FaqItem[] };

/** Default = o que está no código. Se o admin não sobrescrever, é idêntico a hoje. */
const DEFAULT: PosContent = {
  checkoutUrl: CHECKOUT_URL,
  faqs: FAQS_POS as FaqItem[],
};

const PosContentContext = createContext<PosContent>(DEFAULT);

export function PosContentProvider({
  value,
  children,
}: {
  value?: Partial<PosContent>;
  children: ReactNode;
}) {
  const merged: PosContent = {
    checkoutUrl: value?.checkoutUrl ?? DEFAULT.checkoutUrl,
    faqs: value?.faqs && value.faqs.length > 0 ? value.faqs : DEFAULT.faqs,
  };
  return (
    <PosContentContext.Provider value={merged}>
      {children}
    </PosContentContext.Provider>
  );
}

export function usePosContent() {
  return useContext(PosContentContext);
}
