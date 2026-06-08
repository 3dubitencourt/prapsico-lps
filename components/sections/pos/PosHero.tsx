import { Check } from "lucide-react";
import { CTAPos } from "./CTAPos";

const HERO_BULLETS = [
  "MEC · Pós lato sensu · 360h",
  "Em parceria com a Anhanguera",
  "Corpo docente: doutores e mestres",
  "EAD híbrido · 12 meses",
];

export function PosHero() {
  return (
    <section
      className="relative w-full bg-navy-950 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top right, rgba(6,164,212,0.12) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(6,164,212,0.06) 0%, transparent 60%)",
      }}
    >
      <div className="container-lp pt-10 md:pt-14 pb-12 md:pb-20">
        <div className="grid lg:grid-cols-[1fr_440px] xl:grid-cols-[1fr_520px] gap-10 md:gap-14 items-center">
          {/* Coluna esquerda */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan/30 bg-navy-900/70 backdrop-blur">
              <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium text-cyan">
                Pós-graduação Lato Sensu · 12 meses · EAD
              </span>
            </div>

            <h1 className="mt-5 text-3xl md:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
              Pós-graduação em{" "}
              <em className="font-serif italic text-cyan font-normal">
                Psicologia Positiva
              </em>{" "}
              e Neurociência Afetiva
            </h1>

            <p className="mt-5 md:mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl text-pretty">
              Para psicólogos que querem profundidade técnica real. Reconhecida pelo{" "}
              <span className="text-ink font-medium">MEC</span>, em parceria com a{" "}
              <span className="text-ink font-medium">Anhanguera</span>, conduzida por{" "}
              <span className="text-ink font-medium">doutores e mestres especialistas</span>{" "}
              — não por generalistas.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm md:text-base text-ink/95 max-w-xl text-left">
              {HERO_BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-cyan/15 border border-cyan/30 shrink-0">
                    <Check className="w-3 h-3 text-cyan" strokeWidth={3} />
                  </span>
                  <span className="leading-snug text-pretty">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center lg:items-start">
              <CTAPos source="hero" size="lg" />
              <p className="mt-3 text-xs md:text-sm text-subtle">
                12x sem juros no cartão · garantia de 30 dias
              </p>
            </div>
          </div>

          {/* Coluna direita — VSL */}
          <div className="relative">
            <div className="relative aspect-[9/16] mx-auto max-w-[360px] rounded-3xl overflow-hidden border border-cyan/20 bg-navy-900 shadow-[0_20px_60px_rgba(6,164,212,0.18)]">
              <iframe
                src="https://www.youtube.com/embed/HMy0IpBMjZw?rel=0&modestbranding=1"
                title="VSL Pós-graduação · Persona B"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
