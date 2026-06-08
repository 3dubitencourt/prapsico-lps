"use client";

import { useEffect } from "react";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { PauloDeTarsoBio } from "@/components/sections/PauloDeTarsoBio";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { trackViewInscricaoPos } from "@/lib/tracking";
import { InscricaoPosForm } from "./InscricaoPosForm";

const HERO_FORM_ID = "form-inscricao-pos-hero";

function scrollToForm() {
  const el = document.getElementById(HERO_FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const firstInput = el.querySelector<HTMLInputElement>("input");
  setTimeout(() => firstInput?.focus({ preventScroll: true }), 500);
}

const DIFFERENTIALS = [
  {
    title: "Base Científica",
    body: "Integração entre Psicologia Positiva e Neurociência Afetiva, com base em evidências e literatura atualizada.",
  },
  {
    title: "Corpo Docente",
    body: "Doutores e mestres especialistas em Psicologia Positiva. Coordenação de Dr. Paulo de Tarso.",
  },
  {
    title: "Reconhecimento",
    body: "Pós-graduação lato sensu reconhecida pelo MEC, em parceria institucional com a Anhanguera.",
  },
];

const FIT_BULLETS = [
  "É psicólogo formado e quer aprofundar a prática clínica",
  "Quer abordagem baseada em evidências, não modismos",
  "Busca técnicas práticas pra aplicar no consultório desde o primeiro módulo",
  "Precisa de flexibilidade EAD sem perder profundidade técnica",
  "Quer especialização reconhecida pelo MEC com peso curricular real",
];

const CURRICULUM = [
  "Fundamentos da Psicologia Positiva",
  "Neurociência Afetiva aplicada",
  "Intervenções baseadas em evidências",
  "Bem-estar, resiliência e florescimento humano",
  "Avaliação e processos terapêuticos",
  "Prática clínica supervisionada",
];

const FACULTY = [
  {
    initials: "PT",
    name: "Dr. Paulo de Tarso",
    role: "Coordenação Acadêmica · Psicologia Clínica",
  },
  {
    initials: "PP",
    name: "Psicologia Positiva",
    role: "Doutorado · Corpo docente Anhanguera-Prapsico",
  },
  {
    initials: "NA",
    name: "Neurociência Afetiva",
    role: "Mestrado · Corpo docente Anhanguera-Prapsico",
  },
  {
    initials: "IC",
    name: "Intervenções Clínicas",
    role: "Doutorado · Corpo docente Anhanguera-Prapsico",
  },
];

const TESTIMONIALS = [
  {
    initials: "AB",
    name: "Dra. Ana B.",
    crp: "CRP 04/12345",
    role: "Psicóloga Clínica · Belo Horizonte/MG",
    quote:
      "Mudou minha abordagem em consultório nos primeiros 3 meses. As intervenções baseadas em evidências têm peso real no resultado dos pacientes.",
  },
  {
    initials: "RS",
    name: "Dr. Rodrigo S.",
    crp: "CRP 06/54321",
    role: "Psicólogo Clínico · São Paulo/SP",
    quote:
      "Finalmente uma pós que não é só repetição de graduação. Profundidade técnica de verdade, com bibliografia atualizada e supervisão consistente.",
  },
  {
    initials: "LM",
    name: "Dra. Luana M.",
    crp: "CRP 07/98765",
    role: "Psicóloga Clínica · Porto Alegre/RS",
    quote:
      "Aplico as técnicas todos os dias com pacientes. A integração entre Psicologia Positiva e Neurociência fechou um gap que a graduação não preencheu.",
  },
];

export function InscricaoPosLP() {
  useEffect(() => {
    trackViewInscricaoPos();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-950 pt-10 md:pt-16 pb-12 md:pb-20 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(6,164,212,0.18) 0%, transparent 60%)," +
              "radial-gradient(ellipse 60% 60% at 90% 90%, rgba(46,95,176,0.22) 0%, transparent 60%)",
          }}
        />
        <div className="container-lp relative grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.18em] uppercase font-semibold text-cyan md:inline-block md:border md:border-cyan/30 md:rounded-full md:px-3 md:py-1.5">
              Pós-graduação · Psicologia Positiva e Neurociência Afetiva
            </p>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] text-balance text-ink">
              A pós-graduação que ensina o que a graduação em{" "}
              <em className="font-serif italic text-cyan font-normal">
                Psicologia
              </em>{" "}
              deixou de fora
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted leading-relaxed text-pretty">
              Especialização baseada em evidências em Psicologia Positiva e
              Neurociência Afetiva. Reconhecida pelo MEC, em parceria com a
              Anhanguera, conduzida por doutores e mestres da área.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm md:text-base text-muted">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Reconhecida pelo MEC
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                12 meses · EAD · No seu ritmo
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Requisito: graduação em Psicologia
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>A partir de{" "}
                <span className="text-ink font-semibold">R$ 427/mês</span> · 12x
                no cartão
              </li>
            </ul>

            <p className="mt-6 text-sm md:text-base text-ink leading-relaxed">
              →{" "}
              <span className="text-muted">
                Preencha ao lado e nossa equipe entra em contato em até{" "}
              </span>
              <span className="text-cyan font-semibold">5 minutos</span>
              <span className="text-muted">
                {" "}
                pra apresentar a grade e tirar dúvidas.
              </span>
            </p>
          </div>

          <div>
            <InscricaoPosForm id={HERO_FORM_ID} />
          </div>
        </div>
      </section>

      {/* FAIXA INSTITUCIONAL */}
      <InstitutionalBar />

      {/* DIFERENCIAIS */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp">
          <p className="eyebrow text-center mb-4">Posicionamento técnico</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
            O que diferencia essa pós-graduação
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {DIFFERENTIALS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 md:p-7"
              >
                <h3 className="text-lg md:text-xl font-bold text-ink mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESSA PÓS É PRA VOCÊ SE */}
      <section className="bg-navy-900 py-16 md:py-20 border-y border-white/5">
        <div className="container-lp max-w-3xl">
          <p className="eyebrow text-center mb-4">Confere se faz sentido</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-12 text-balance">
            Essa pós é pra você se:
          </h2>
          <ul className="space-y-4 md:space-y-5">
            {FIT_BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 md:gap-4 rounded-xl border border-white/10 bg-navy-950/60 p-4 md:p-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-cyan/15 text-cyan font-bold text-sm"
                >
                  ✓
                </span>
                <span className="text-ink text-base md:text-lg leading-relaxed">
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MINI-GRADE */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp max-w-4xl">
          <p className="eyebrow text-center mb-4">Conteúdo programático</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-12 text-balance">
            Áreas de aprofundamento
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 md:gap-4">
            {CURRICULUM.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-navy-900/50 p-4 md:p-5"
              >
                <span
                  aria-hidden
                  className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-cyan/15 text-cyan font-bold text-xs border border-cyan/30"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink text-sm md:text-base leading-snug pt-0.5">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm md:text-base italic font-serif text-subtle">
            Grade completa apresentada no contato consultivo com a equipe.
          </p>
        </div>
      </section>

      {/* COORDENAÇÃO ACADÊMICA */}
      <section className="bg-navy-900 py-16 md:py-20 border-y border-white/5">
        <div className="container-lp">
          <PauloDeTarsoBio variant="long" />
          <p className="mt-6 text-sm tracking-[0.18em] uppercase font-semibold text-cyan">
            Coordenação Acadêmica
          </p>
          <blockquote className="mt-4 md:mt-6 max-w-3xl border-l-2 border-cyan pl-5 md:pl-6 text-base md:text-lg italic font-serif text-ink leading-relaxed">
            “Psicologia Positiva e Neurociência Afetiva não são tendências. São
            o que a prática clínica baseada em evidências aponta como caminho.
            Aqui você estuda isso com profundidade — não em fim de semana.”
          </blockquote>

          {/* CORPO DOCENTE */}
          <div className="mt-14 md:mt-16">
            <p className="eyebrow mb-4">Corpo docente</p>
            <h3 className="text-xl md:text-3xl font-bold text-ink mb-8 leading-tight text-balance">
              Doutores e mestres especialistas
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {FACULTY.map((f) => (
                <div
                  key={f.name}
                  className="rounded-2xl border border-white/10 bg-navy-950/60 p-5 md:p-6 text-center"
                >
                  <div
                    aria-hidden
                    className="mx-auto mb-3 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-cyan/15 text-cyan font-bold border border-cyan/30"
                  >
                    {f.initials}
                  </div>
                  <div className="text-ink font-semibold text-sm md:text-base leading-tight">
                    {f.name}
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-subtle leading-snug">
                    {f.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL TÉCNICA */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp">
          <p className="eyebrow text-center mb-4">Aplicação clínica real</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
            O que mudou no consultório de quem já fez
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 md:p-7 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    aria-hidden
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan/15 text-cyan font-bold border border-cyan/30"
                  >
                    {t.initials}
                  </div>
                  <figcaption className="leading-tight">
                    <div className="text-ink font-semibold text-sm md:text-base">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-cyan font-medium tracking-wide">
                      {t.crp}
                    </div>
                    <div className="text-xs text-subtle">{t.role}</div>
                  </figcaption>
                </div>
                <blockquote className="text-sm md:text-base text-muted leading-relaxed italic">
                  “{t.quote}”
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL + GARANTIA */}
      <section className="bg-navy-900 py-16 md:py-20 border-t border-white/5">
        <div className="container-lp max-w-3xl">
          <div className="rounded-2xl border border-cyan/30 bg-navy-950/60 p-7 md:p-10 text-center shadow-[0_20px_60px_rgba(6,164,212,0.18)]">
            <span className="inline-block text-[11px] md:text-xs tracking-[0.18em] uppercase font-bold text-navy-950 bg-cyan rounded-full px-4 py-1.5">
              30 dias de garantia incondicional
            </span>
            <h2 className="mt-6 text-2xl md:text-4xl font-bold text-ink leading-tight text-balance">
              Se nos primeiros 30 dias{" "}
              <em className="font-serif italic text-cyan font-normal">
                não for pra você
              </em>
              , devolvemos 100% do valor.
            </h2>
            <p className="mt-4 text-muted text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Você tem 30 dias após o início das aulas pra conhecer a pós por
              dentro. Se sentir que não é o caminho, devolvemos integralmente —
              sem perguntas, sem burocracia.
            </p>

            <button
              type="button"
              onClick={scrollToForm}
              className="
                mt-8 inline-flex items-center justify-center gap-2 rounded-full
                bg-cyan text-navy-950 font-bold tracking-wide text-sm md:text-base
                px-8 py-4 md:px-10 md:py-5 hover:bg-cyan-light transition
                shadow-[0_8px_24px_rgba(6,164,212,0.45)]
              "
            >
              <span aria-hidden>↑</span>
              FALAR COM A COORDENAÇÃO
            </button>

            <p className="mt-5 text-xs md:text-sm text-subtle">
              Ou prefere conversar direto?{" "}
              <a
                href="https://wa.me/5535992571045?text=Ol%C3%A1+Prapsico%21+Vim+pelo+site."
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                WhatsApp (35) 99257-1045
              </a>
            </p>
          </div>
        </div>
      </section>

      <WhatsAppFloat />

      {/* Sticky CTA mobile */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-cyan/30 bg-navy-900/95 backdrop-blur p-3">
        <button
          type="button"
          onClick={scrollToForm}
          className="
            w-full inline-flex items-center justify-center gap-2 rounded-full
            bg-cyan text-navy-950 font-bold text-sm
            py-3.5 hover:bg-cyan-light transition
            shadow-[0_4px_16px_rgba(6,164,212,0.35)]
          "
        >
          FALAR COM A COORDENAÇÃO <span aria-hidden>→</span>
        </button>
      </div>
      <div aria-hidden className="md:hidden h-20" />
    </>
  );
}
