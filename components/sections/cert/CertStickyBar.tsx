"use client";

import { trackBeginCheckoutCert } from "@/lib/tracking";
import { useCertContent } from "./cert-content";

export function CertStickyBar() {
  const { checkoutUrl } = useCertContent();
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 border-t border-cyan/30 bg-navy-900/95 backdrop-blur"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top, rgba(6,164,212,0.08) 0%, transparent 60%)",
      }}
    >
      <div className="container-lp py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        <div className="flex items-center gap-3 md:gap-5 text-center md:text-left">
          <span className="hidden md:inline-block text-[10px] tracking-[0.22em] uppercase text-subtle font-medium border-r border-white/10 pr-5">
            Certificação
          </span>
          <p className="text-sm md:text-base text-ink leading-tight">
            <span className="text-muted">Psicanálise e</span>{" "}
            <em className="font-serif italic text-cyan font-normal">neurociência</em>{" "}
            <span className="text-muted">·</span>{" "}
            <span className="font-semibold text-ink whitespace-nowrap">12 meses</span>
            <span className="text-muted hidden md:inline"> · MEC</span>
          </p>
        </div>

        <a
          href={checkoutUrl}
          onClick={() => trackBeginCheckoutCert("sticky_bar")}
          className="
            inline-flex items-center justify-center gap-2 w-full md:w-auto
            rounded-full font-bold tracking-wide text-sm md:text-base
            bg-cyan text-navy-950 hover:bg-cyan-light transition
            shadow-[0_4px_16px_rgba(6,164,212,0.35)]
            px-6 py-3 md:px-8 md:py-3.5
            whitespace-nowrap
          "
        >
          INSCREVER · R$ 257/MÊS
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
