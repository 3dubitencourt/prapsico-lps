"use client";

import { useEffect } from "react";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { PauloDeTarsoBio } from "@/components/sections/PauloDeTarsoBio";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { trackViewAulaPos } from "@/lib/tracking";
import { AulaPosForm } from "./AulaPosForm";

const HERO_FORM_ID = "form-aula-pos-hero";

function scrollToForm() {
  const el = document.getElementById(HERO_FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const firstInput = el.querySelector<HTMLInputElement>("input");
  setTimeout(() => firstInput?.focus({ preventScroll: true }), 500);
}

export function AulaPosLP() {
  useEffect(() => {
    trackViewAulaPos();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-950 pt-12 md:pt-20 pb-12 md:pb-20 overflow-hidden">
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
            <div className="text-center md:text-left">
              <span className="inline-block text-[10px] md:text-xs tracking-[0.18em] uppercase font-medium text-cyan border border-cyan/30 rounded-md md:rounded-full px-3 py-1.5 leading-snug">
                <span className="md:hidden">
                  Aula gratuita · Psicólogos formados
                </span>
                <span className="hidden md:inline">
                  Aula gratuita · Dr. Paulo de Tarso · Psicólogos formados
                </span>
              </span>
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] text-balance text-ink">
              O que sua graduação em Psicologia{" "}
              <em className="font-serif italic text-cyan font-normal">
                não te ensinou sobre atender
              </em>
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted leading-relaxed text-pretty">
              Em 3 minutos, Dr. Paulo de Tarso aborda os 3 fundamentos clínicos
              que separam o psicólogo que apenas formou — do psicólogo que
              atende com método.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm md:text-base text-muted">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Pós-graduação reconhecida pelo MEC
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Em parceria com a Anhanguera
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Psicologia Positiva + Neurociência Afetiva
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Para psicólogos graduados
              </li>
            </ul>
          </div>

          <div>
            <AulaPosForm id={HERO_FORM_ID} />
          </div>
        </div>
      </section>

      {/* DADO DE IMPACTO — faixa horizontal cor primária */}
      <section className="bg-cyan text-navy-950 py-10 md:py-14">
        <div className="container-lp grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
          <div className="text-center md:text-left">
            <div className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
              85%
            </div>
            <div className="mt-1 text-[11px] md:text-xs uppercase tracking-[0.18em] font-semibold text-navy-950/70">
              — CFP
            </div>
          </div>
          <div className="text-center md:text-left">
            <p className="text-base md:text-xl leading-snug font-medium text-balance">
              dos psicólogos largam a profissão clínica nos primeiros 5 anos
              por não se sentirem preparados pra atender.
            </p>
            <p className="mt-4 text-lg md:text-2xl font-bold leading-tight text-balance">
              Essa aula é sobre como{" "}
              <span className="underline decoration-2 underline-offset-4">
                NÃO virar estatística
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* NESSA AULA DE 3 MINUTOS */}
      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-lp max-w-4xl">
          <p className="eyebrow text-center mb-4">Nessa aula de 3 minutos</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-12 max-w-3xl mx-auto text-balance">
            3 fundamentos clínicos pra atender com método
          </h2>

          <ul className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                num: "01",
                title: "Os 3 erros clínicos",
                body: "mais comuns que graduandos cometem nos primeiros atendimentos",
              },
              {
                num: "02",
                title: "Como Psicologia Positiva e Neurociência Afetiva",
                body: "se integram na prática clínica baseada em evidências",
              },
              {
                num: "03",
                title: "O que diferencia",
                body: "uma pós-graduação técnica de uma especialização superficial",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-navy-900/60 p-6 md:p-7"
              >
                <div className="text-xs md:text-sm font-bold tracking-[0.18em] text-cyan mb-3">
                  {item.num}
                </div>
                <p className="text-base md:text-lg leading-snug text-ink">
                  <span className="font-bold">{item.title}</span>{" "}
                  <span className="text-muted">{item.body}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <InstitutionalBar />

      {/* FAIXA INSTITUCIONAL EXTRA — corpo docente */}
      <section className="bg-navy-900 py-8 md:py-10 border-b border-white/5">
        <div className="container-lp text-center space-y-1.5 md:space-y-2">
          <p className="text-sm md:text-base text-ink font-medium">
            Pós-graduação reconhecida pelo MEC
          </p>
          <p className="text-xs md:text-sm text-muted">
            Corpo docente: doutores e mestres em Psicologia Positiva
          </p>
        </div>
      </section>

      {/* QUEM É PAULO */}
      <section className="bg-navy-950 py-16 md:py-20 border-b border-white/5">
        <div className="container-lp max-w-4xl">
          <PauloDeTarsoBio variant="long" />
          <p className="mt-6 text-sm md:text-base text-cyan font-medium tracking-wide">
            Coordenador da Pós em Psicologia Positiva e Neurociência Afetiva
          </p>
          <blockquote className="mt-8 md:mt-10 border-l-2 border-cyan pl-5 md:pl-6 text-base md:text-xl italic font-serif text-ink leading-relaxed text-pretty">
            “Quem se forma em Psicologia e acha que vai aprender clínica na
            prática descobre — geralmente cedo demais — que prática sem método
            é só erro repetido.”
          </blockquote>
        </div>
      </section>

      {/* CTA REPETIDO */}
      <section className="bg-navy-950 py-14 md:py-20">
        <div className="container-lp text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-ink mb-3 text-balance">
            Pronto pra preencher essa lacuna?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Deixe seu CRP no formulário acima e receba o link da aula agora
            mesmo.
          </p>
          <button
            type="button"
            onClick={scrollToForm}
            className="
              inline-flex items-center justify-center gap-2 rounded-full
              bg-cyan text-navy-950 font-bold tracking-wide text-sm md:text-base
              px-8 py-4 md:px-10 md:py-5 hover:bg-cyan-light transition
              shadow-[0_8px_24px_rgba(6,164,212,0.45)]
            "
          >
            <span aria-hidden>↑</span>
            QUERO ASSISTIR A AULA
          </button>
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
          QUERO ASSISTIR A AULA <span aria-hidden>→</span>
        </button>
      </div>
      {/* Spacer to avoid sticky overlap on mobile */}
      <div aria-hidden className="md:hidden h-20" />
    </>
  );
}
