import Image from "next/image";
import { Quote, Stethoscope, Brain, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FACULTY_AREAS } from "./constants";

const AREA_ICONS: Record<string, LucideIcon> = { Stethoscope, Brain, Sparkles };

export function Faculty() {
  return (
    <section className="py-16 md:py-20 bg-navy-950">
      <div className="container-lp max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="eyebrow mb-3">QUEM CONDUZ SUA FORMAÇÃO</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
            Psicólogo{" "}
            <em className="font-serif italic text-cyan font-normal">
              Paulo de Tarso
            </em>
          </h2>
        </div>

        {/* Bio principal — Paulo (com quote integrada à direita) */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-stretch">
          {/* Foto — proporção 4:5 no mobile, estica até a altura do texto no desktop */}
          <div className="relative mx-auto md:mx-0 w-full max-w-[280px] aspect-[4/5] md:aspect-auto">
            <div className="absolute -inset-2 rounded-3xl bg-cyan/10 blur-lg pointer-events-none" />
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-cyan/30 ring-1 ring-cyan/20 shadow-[0_16px_40px_rgba(6,164,212,0.2)]">
              <Image
                src="/paulo-de-tarso.png"
                alt="Psicólogo Paulo de Tarso"
                fill
                sizes="(min-width: 768px) 280px, 240px"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Lado direito — stats + bio + quote inline */}
          <div>
            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Stat number="20+" label="anos de clínica" />
              <Stat number="2.000+" label="alunos formados" />
              <Stat number="MEC" label="Anhanguera + Prapsico" />
            </div>

            <div className="space-y-3 text-muted leading-relaxed text-base md:text-lg text-pretty">
              <p>
                Psicólogo clínico, supervisor de formação e{" "}
                <span className="text-ink font-medium">
                  diretor acadêmico da Prapsico
                </span>
                . Coordenador da Pós-graduação em Psicoterapia da Anhanguera-Prapsico.
              </p>
              <p>
                Especialista em clínica fundamental, dedica sua prática ao que ele chama de{" "}
                <em className="font-serif italic text-cyan-light">
                  &ldquo;a diferença entre atender e atender bem&rdquo;
                </em>{" "}
                — os fundamentos invisíveis que separam uma escuta competente de um atendimento improvisado.
              </p>
            </div>

            {/* Quote inline com border-l ciano */}
            <figure className="mt-6 border-l-2 border-cyan pl-5 md:pl-6">
              <Quote className="w-5 h-5 text-cyan mb-2" strokeWidth={1.75} />
              <blockquote className="font-serif italic text-lg md:text-xl leading-relaxed text-ink text-pretty">
                &ldquo;Não vendo certificação.{" "}
                <span className="text-cyan-light">Formo psicoterapeutas.</span>{" "}
                Aqui você sai sabendo atender — com método, ética e supervisão. Não tem atalho, tem caminho.&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-[11px] md:text-xs text-subtle tracking-[0.2em] uppercase">
                — Psicólogo Paulo de Tarso
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Corpo docente — áreas de especialidade */}
        <div className="mt-14 md:mt-16 pt-10 border-t border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="eyebrow mb-3">CORPO DOCENTE</p>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-balance">
              Especialistas em{" "}
              <em className="font-serif italic text-cyan font-normal">
                cada área do método
              </em>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {FACULTY_AREAS.map(({ icon, title, desc }) => {
              const Icon = AREA_ICONS[icon];
              return (
                <div
                  key={title}
                  className="rounded-2xl bg-navy-900 border border-white/5 p-6 md:p-7 hover:border-cyan/30 transition"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 mb-4">
                    <Icon className="w-6 h-6 text-cyan" strokeWidth={1.75} />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 text-pretty">
                    {title}
                  </h4>
                  <p className="text-sm text-muted leading-relaxed text-pretty">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-xs md:text-sm text-subtle max-w-xl mx-auto text-pretty">
            Aulas conduzidas por docentes do programa Anhanguera + Prapsico.
            Lista completa do corpo docente disponibilizada no acesso à plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl bg-navy-900 border border-white/5 px-3 py-3 md:py-4 text-center">
      <p className="font-serif italic text-cyan text-xl md:text-2xl leading-none mb-1">
        {number}
      </p>
      <p className="text-[10px] md:text-xs text-subtle tracking-wide leading-tight text-pretty">
        {label}
      </p>
    </div>
  );
}
