import Image from "next/image";
import { Quote, GraduationCap } from "lucide-react";
import { FACULTY_POS } from "./constants";

// TODO: Substituir placeholders por fotos + bios reais quando a Prapsico enviar
export function FacultyPos() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <p className="eyebrow mb-3">QUEM ENSINA</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-balance">
            Doutores e mestres com{" "}
            <em className="font-serif italic text-cyan font-normal">
              produção científica na área
            </em>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed text-pretty max-w-2xl mx-auto">
            Não generalistas. Pesquisadores e clínicos com vínculo institucional na pós Anhanguera-Prapsico.
          </p>
        </div>

        {/* Card coordenação — Paulo */}
        <div className="rounded-3xl bg-navy-900 border border-cyan/20 p-6 md:p-10 mb-12 md:mb-14 shadow-[0_24px_60px_rgba(6,164,212,0.12)]">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-cyan/30 bg-cyan/5">
            <GraduationCap className="w-3.5 h-3.5 text-cyan" strokeWidth={2} />
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium text-cyan">
              Coordenação acadêmica
            </span>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-stretch">
            {/* Foto */}
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

            {/* Texto */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-1.5 text-balance">
                Psicólogo Paulo de Tarso
              </h3>
              <p className="text-sm md:text-base text-cyan font-medium mb-5">
                Coordenador da Pós-graduação Anhanguera-Prapsico
              </p>

              <div className="space-y-3 text-muted leading-relaxed text-base md:text-lg text-pretty">
                <p>
                  Psicólogo clínico há mais de 20 anos, supervisor de formação e{" "}
                  <span className="text-ink font-medium">diretor acadêmico da Prapsico</span>
                  . Responsável pela coordenação da pós lato sensu em parceria com a Anhanguera.
                </p>
                <p>
                  Especialista em clínica fundamental, com mais de 2.000 alunos formados nas trilhas de Certificação e Pós-graduação.
                </p>
              </div>

              <figure className="mt-6 border-l-2 border-cyan pl-5 md:pl-6">
                <Quote className="w-5 h-5 text-cyan mb-2" strokeWidth={1.75} />
                <blockquote className="font-serif italic text-lg md:text-xl leading-relaxed text-ink text-pretty">
                  &ldquo;Aqui o psicólogo aprofunda. Não vamos repetir o que você viu na graduação —{" "}
                  <span className="text-cyan-light">vamos onde a graduação não foi</span>
                  .&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[11px] md:text-xs text-subtle tracking-[0.2em] uppercase">
                  — Psicólogo Paulo de Tarso
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Corpo docente — grid de professores */}
        <div className="pt-2">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
            <p className="eyebrow mb-3">CORPO DOCENTE</p>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-balance">
              Quem conduz{" "}
              <em className="font-serif italic text-cyan font-normal">cada módulo</em>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {FACULTY_POS.map((p) => (
              <article
                key={p.initials}
                className="rounded-2xl bg-navy-900 border border-white/5 p-5 md:p-6 hover:border-cyan/30 transition flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan/10 border border-cyan/20 text-cyan font-serif italic text-sm shrink-0">
                    {p.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-cyan font-medium mb-0.5">
                      {p.title}
                    </p>
                    <p className="font-bold text-base text-ink leading-tight truncate">
                      {p.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm leading-relaxed">
                  <p>
                    <span className="text-subtle text-[11px] tracking-[0.18em] uppercase block mb-0.5">
                      Especialidade
                    </span>
                    <span className="text-ink/95">{p.specialty}</span>
                  </p>
                  <p>
                    <span className="text-subtle text-[11px] tracking-[0.18em] uppercase block mb-0.5">
                      Linha de pesquisa
                    </span>
                    <span className="text-muted">{p.research}</span>
                  </p>
                  <p>
                    <span className="text-subtle text-[11px] tracking-[0.18em] uppercase block mb-0.5">
                      Vínculo
                    </span>
                    <span className="text-cyan-light text-xs">{p.institution}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs md:text-sm text-subtle max-w-xl mx-auto text-pretty">
            Corpo docente do programa Anhanguera-Prapsico. Lista completa com fotos e currículos Lattes disponibilizada no acesso à plataforma.
          </p>
        </div>
      </div>
    </section>
  );
}
