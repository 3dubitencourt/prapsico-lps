"use client";

import Image from "next/image";
import { trackBeginCheckoutPos } from "@/lib/tracking";
import { usePosContent } from "./pos-content";

export function PosHeader() {
  const { checkoutUrl } = usePosContent();
  return (
    <header className="sticky top-0 z-50 border-b border-cyan/20 bg-navy-950/95 backdrop-blur">
      <div className="container-lp py-2.5 md:py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 md:gap-5 min-w-0">
          <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
            <Image
              src="/logo-anhanguera.png"
              alt="Anhanguera"
              width={120}
              height={32}
              className="h-5 md:h-6 w-auto object-contain"
              priority
            />
            <div className="h-4 md:h-5 w-px bg-white/10" />
            <Image
              src="/logo-prapsico.png"
              alt="Prapsico"
              width={120}
              height={32}
              className="h-5 md:h-6 w-auto object-contain"
              priority
            />
          </div>
          <span className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/5 text-[10px] tracking-[0.2em] uppercase font-medium text-cyan whitespace-nowrap">
            Pós-graduação reconhecida pelo MEC
          </span>
        </div>

        <a
          href={checkoutUrl}
          onClick={() => trackBeginCheckoutPos("header")}
          className="
            inline-flex items-center justify-center gap-2
            rounded-full font-bold tracking-wide whitespace-nowrap
            text-[11px] md:text-sm
            bg-cyan text-navy-950 hover:bg-cyan-light transition
            shadow-[0_4px_12px_rgba(6,164,212,0.3)]
            px-4 md:px-6 py-2 md:py-2.5
          "
        >
          QUERO ME INSCREVER
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
