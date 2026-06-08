import Image from "next/image";

const stats = [
  { value: "25+", label: "anos de clínica" },
  { value: "8.000+", label: "alunos formados" },
  { value: "USP-RP", label: "extensão hospitalar" },
];

export function MiniBio() {
  return (
    <section className="py-14 md:py-28 bg-navy-900 border-y border-white/5">
      <div className="container-lp max-w-5xl">
        {/* Mobile: header compacto com avatar + nome */}
        <div className="md:hidden flex items-center gap-4 mb-6">
          <div className="relative rounded-xl overflow-hidden border border-white/10 w-20 h-28 shrink-0 ring-1 ring-cyan/15 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
            <Image
              src="/paulo-de-tarso.png"
              alt="Psicólogo Paulo de Tarso"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0">
            <p className="eyebrow mb-1">Pra quem chegou agora</p>
            <h2 className="text-xl font-bold leading-tight">
              <span className="font-serif italic text-cyan font-normal">
                Psicólogo Paulo de Tarso
              </span>
            </h2>
          </div>
        </div>

        {/* Desktop: header tradicional centrado */}
        <p className="eyebrow mb-4 text-center hidden md:block">Pra quem chegou agora</p>
        <h2 className="hidden md:block text-2xl md:text-4xl font-bold leading-tight text-center mb-14 text-balance">
          Quem é o{" "}
          <em className="font-serif italic text-cyan font-normal">Psicólogo Paulo de Tarso</em>
        </h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start">
          {/* Foto grande só no desktop (mobile usa o avatar acima) */}
          <div className="hidden md:block relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] w-full mx-auto shadow-[0_16px_48px_rgba(0,0,0,0.4)] ring-1 ring-cyan/10">
            <Image
              src="/paulo-de-tarso.png"
              alt="Psicólogo Paulo de Tarso"
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-5 md:space-y-6">
            <p className="text-muted leading-relaxed text-base md:text-lg text-pretty">
              Psicólogo com mais de 25 anos em comportamento humano. Especialista em Neurociência e Psicologia Positiva, com extensão em Psicologia Hospitalar pela USP Ribeirão Preto.
            </p>

            <ul className="grid grid-cols-3 gap-2 md:gap-4">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="rounded-xl bg-navy-950 border border-white/5 px-2 py-3 md:px-4 md:py-5 text-center"
                >
                  <p className="font-serif italic text-cyan text-lg md:text-3xl leading-none mb-1.5">
                    {s.value}
                  </p>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.10em] text-subtle leading-tight">
                    {s.label}
                  </p>
                </li>
              ))}
            </ul>

            <blockquote className="border-l-2 border-cyan/60 pl-4 md:pl-5 py-1">
              <p className="text-ink/90 leading-relaxed text-sm md:text-lg text-pretty">
                A live de 8 de junho foi uma{" "}
                <span className="text-ink">aula clínica de 90 minutos</span> sobre os fundamentos que separam quem atende bem de quem só atende.{" "}
                <span className="font-serif italic text-cyan">Universal</span> — pra quem tem CRP e pra quem ainda não tem.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
