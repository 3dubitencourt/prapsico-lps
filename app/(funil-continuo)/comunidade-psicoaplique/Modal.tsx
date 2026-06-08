"use client";

import { useEffect, useRef, ReactNode } from "react";

/* ===========================================================================
 *  Modal acessível e leve (sem dependência externa).
 *  - Fecha no Esc e no clique fora.
 *  - role="dialog" + aria-modal, trava o scroll do fundo.
 *  - Foca o primeiro elemento focável ao abrir.
 *  APLIQUE SEU DESIGN nas classes abaixo (overlay e "card").
 * =========================================================================== */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  closeAriaLabel = "Fechar",
}: {
  open: boolean;
  onClose: () => void;
  /** id do título dentro do modal, pra leitores de tela */
  labelledBy?: string;
  children: ReactNode;
  closeAriaLabel?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Esc fecha + trava scroll do body enquanto aberto.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // foca o primeiro campo/botão do modal
    const first = cardRef.current?.querySelector<HTMLElement>(
      'input, button, [tabindex]:not([tabindex="-1"])',
    );
    setTimeout(() => first?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      // overlay
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-psa-navy/80 backdrop-blur-sm"
      onMouseDown={(e) => {
        // clique no fundo (não no card) fecha
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative w-full max-w-md rounded-2xl border border-psa-navy/15 bg-psa-cream shadow-[0_20px_60px_rgba(30,34,97,0.25)] max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeAriaLabel}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-psa-navy-500 hover:text-psa-navy hover:bg-psa-navy/10 transition focus:outline-none focus:ring-2 focus:ring-psa-lime/50"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>
        {children}
      </div>
    </div>
  );
}
