import Image from "next/image";
import { HERO } from "./constants";

// Cor de fundo = creme do canto da própria arte BG2 (emenda sem seam).
const BG = "#EFE2C6";

export function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section
      className="relative isolate overflow-hidden font-psa"
      style={{ backgroundColor: BG }}
    >
      {/* ===== BANNER (Paulo) — full-bleed, proporção exata 2,5:1 (6000×2400) =====
       * Desktop usa a arte inteira. Mobile recorta no centro p/ o Paulo ficar maior. */}
      <div className="relative w-full aspect-[5/4] sm:aspect-[2/1] md:aspect-[5/2]">
        <Image
          src="/hero-comunidade-bg2.png"
          alt="Dr. Paulo de Tarso — Comunidade Psicoaplique"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top md:object-center"
        />
        {/* Fade creme na base: funde os braços do Paulo no creme p/ o texto subir sem corte seco */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: `linear-gradient(0deg, ${BG} 28%, rgba(239,226,198,0) 100%)` }}
        />
      </div>

      {/* ===== TEXTO — faixa creme logo abaixo do banner ===== */}
      <div className="container-lp relative -mt-28 md:-mt-44 pb-14 md:pb-20 flex flex-col items-center text-center">
        {/* Badge / selo */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-psa-lime/50 bg-psa-lime/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-psa-lime opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-psa-lime" />
          </span>
          <span className="text-[11px] lg:text-xs tracking-[0.18em] uppercase font-semibold text-psa-navy">
            {HERO.badge ?? "Comunidade Psicoaplique"}
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-5 text-3xl md:text-5xl font-extrabold leading-[1.08] tracking-tight text-balance max-w-4xl text-psa-navy">
          {HERO.headline}
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 text-base md:text-lg text-psa-navy-700 leading-relaxed text-pretty max-w-2xl">
          {HERO.subheadline}
        </p>

        {/* CTA */}
        <button
          type="button"
          onClick={onOpenForm}
          className="
            mt-8 inline-flex items-center justify-center gap-2 rounded-full
            bg-psa-lime text-psa-navy font-bold tracking-wide text-sm md:text-base
            px-8 py-4 md:px-10 md:py-5 hover:bg-psa-lime-dark transition
            shadow-[0_8px_24px_rgba(143,197,46,0.45)]
          "
        >
          {HERO.cta}
        </button>
      </div>
    </section>
  );
}
