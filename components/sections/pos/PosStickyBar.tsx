"use client";

import { trackBeginCheckoutPos } from "@/lib/tracking";
import { usePosContent } from "./pos-content";

export function PosStickyBar() {
  const { checkoutUrl } = usePosContent();
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-cyan/30 bg-navy-900/95 backdrop-blur md:hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top, rgba(6,164,212,0.08) 0%, transparent 60%)",
      }}
    >
      <div className="container-lp py-3 flex items-center justify-between gap-3">
        <p className="text-xs leading-tight text-ink">
          <span className="text-muted">Pós lato sensu</span>{" "}
          <em className="font-serif italic text-cyan font-normal">MEC</em>
          <br />
          <span className="font-semibold text-ink">R$ 427/mês · 360h</span>
        </p>
        <a
          href={checkoutUrl}
          onClick={() => trackBeginCheckoutPos("sticky_bar")}
          className="
            inline-flex items-center justify-center gap-1.5 shrink-0
            rounded-full font-bold tracking-wide text-xs
            bg-cyan text-navy-950 hover:bg-cyan-light transition
            shadow-[0_4px_16px_rgba(6,164,212,0.35)]
            px-5 py-3 whitespace-nowrap
          "
        >
          INSCREVER
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
