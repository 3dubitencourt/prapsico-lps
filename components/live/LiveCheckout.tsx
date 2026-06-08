"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  type MouseEvent,
} from "react";
import { trackCheckout } from "@/lib/tracking";
import { CheckoutCaptureModal } from "./CheckoutCaptureModal";

// ─────────────────────────────────────────────────────────────
// CHAVE DE CONTROLE — muda só esta linha pra ativar/desativar o form.
//   "direct" = comportamento atual (clica → vai direto pro Hotmart). SEGURO.
//   "form"   = sempre abre o form de captura antes do checkout.
//   "split"  = teste A/B 50/50 (metade form, metade direto), por navegador.
// ─────────────────────────────────────────────────────────────
const CHECKOUT_MODE: "direct" | "form" | "split" = "direct";

type Ctx = {
  /** Handler de clique pros CTAs. Decide se abre o form ou segue direto. */
  onCheckoutClick: (e: MouseEvent) => void;
};

const LiveCheckoutContext = createContext<Ctx | null>(null);

/** Hook opcional: retorna null fora do provider (CTA cai no comportamento padrão). */
export function useLiveCheckout() {
  return useContext(LiveCheckoutContext);
}

function pickVariant(): "form" | "direct" {
  // Tráfego de campanha de Leads vem com ?lead=1 na URL → força o form,
  // independente do CHECKOUT_MODE. Campanhas de Venda (sem o param) seguem o modo padrão.
  try {
    const params = new URLSearchParams(window.location.search);
    const leadParam = params.get("lead");
    if (leadParam === "1" || leadParam === "true") return "form";
  } catch {
    // sem window (SSR) — ignora e cai no modo padrão
  }

  if (CHECKOUT_MODE === "form") return "form";
  if (CHECKOUT_MODE === "direct") return "direct";
  try {
    const key = "live_checkout_variant";
    const saved = localStorage.getItem(key);
    if (saved === "form" || saved === "direct") return saved;
    const v: "form" | "direct" = Math.random() < 0.5 ? "form" : "direct";
    localStorage.setItem(key, v);
    return v;
  } catch {
    return "direct";
  }
}

export function LiveCheckoutProvider({
  checkoutUrl,
  children,
}: {
  checkoutUrl: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  // Começa "direct" no SSR/primeiro render; ajusta no cliente pra evitar mismatch.
  const [variant, setVariant] = useState<"form" | "direct">("direct");

  useEffect(() => {
    setVariant(pickVariant());
  }, []);

  const onCheckoutClick = useCallback(
    (e: MouseEvent) => {
      if (variant === "form") {
        e.preventDefault();
        setOpen(true);
        return;
      }
      // Variante direta: dispara InitiateCheckout e deixa o link <a> navegar.
      trackCheckout();
    },
    [variant],
  );

  return (
    <LiveCheckoutContext.Provider value={{ onCheckoutClick }}>
      {children}
      <CheckoutCaptureModal
        open={open}
        onClose={() => setOpen(false)}
        checkoutUrl={checkoutUrl}
      />
    </LiveCheckoutContext.Provider>
  );
}
