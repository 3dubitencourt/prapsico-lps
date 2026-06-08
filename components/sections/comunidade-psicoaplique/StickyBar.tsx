"use client";

import { HERO } from "./constants";

/* Barra fixa no rodapé (estilo aula-ao-vivo, adaptada à Comunidade).
 * Abre o formulário de captura em vez de ir pra um checkout. */
export function StickyBar({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-psa-lime/30 bg-psa-cream/95 backdrop-blur font-psa">
      <div className="container-lp py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        <div className="flex items-center gap-3 md:gap-5 text-center md:text-left">
          <span className="hidden md:inline-block text-[10px] tracking-[0.22em] uppercase text-psa-navy-500 font-semibold border-r border-psa-navy/15 pr-5">
            Presente exclusivo
          </span>
          <p className="text-sm md:text-base text-psa-navy leading-tight">
            <span className="text-psa-navy-700">Garanta agora seu</span>{" "}
            <span className="font-bold whitespace-nowrap">presente</span>{" "}
            <span className="text-psa-navy-700">na Comunidade Psicoaplique.</span>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenForm}
          className="
            inline-flex items-center justify-center gap-2 w-full md:w-auto
            rounded-full font-bold tracking-wide text-sm md:text-base
            bg-psa-lime text-psa-navy hover:bg-psa-lime-dark transition
            shadow-[0_4px_16px_rgba(143,197,46,0.4)]
            px-6 py-3 md:px-8 md:py-3.5 whitespace-nowrap
          "
        >
          {HERO.cta}
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
