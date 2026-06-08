import { CTACert } from "./CTACert";

export function CertHero() {
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
          {/* Left column */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan/30 bg-navy-900/70 backdrop-blur">
              <span className="text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium text-cyan">
                Certificação em Psicanálise e Neurociência
              </span>
            </div>

            <h1 className="mt-5 text-3xl md:text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
              Torne-se psicoterapeuta reconhecido em{" "}
              <em className="font-serif italic text-cyan font-normal">12 meses</em>
            </h1>

            <p className="mt-5 md:mt-6 text-base md:text-lg text-muted leading-relaxed max-w-xl text-pretty">
              Sem graduação em Psicologia. Certificação reconhecida pelo MEC e Ministério da Saúde.
            </p>

            <div className="mt-8 flex flex-col items-center lg:items-start">
              <CTACert source="hero" size="lg" />
              <p className="mt-3 text-xs md:text-sm text-subtle">
                12x sem juros no cartão ou boleto · garantia de 30 dias
              </p>
            </div>
          </div>

          {/* Right column — VSL */}
          <div className="relative">
            <div className="relative aspect-[9/16] mx-auto max-w-[360px] rounded-3xl overflow-hidden border border-cyan/20 bg-navy-900 shadow-[0_20px_60px_rgba(6,164,212,0.18)]">
              <iframe
                src="https://www.youtube.com/embed/soRbpn6Ktbk?rel=0&modestbranding=1"
                title="VSL Certificação · Dr. Paulo de Tarso"
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
