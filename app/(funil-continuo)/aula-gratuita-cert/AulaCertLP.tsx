"use client";

import { useEffect } from "react";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { PauloDeTarsoBio } from "@/components/sections/PauloDeTarsoBio";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { trackViewAulaCert } from "@/lib/tracking";
import { AulaCertForm } from "./AulaCertForm";

const HERO_FORM_ID = "form-aula-cert-hero";

function scrollToForm() {
  const el = document.getElementById(HERO_FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const firstInput = el.querySelector<HTMLInputElement>("input");
  setTimeout(() => firstInput?.focus({ preventScroll: true }), 500);
}

export function AulaCertLP() {
  useEffect(() => {
    trackViewAulaCert();
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
                <span className="md:hidden">Aula gratuita · 3 min</span>
                <span className="hidden md:inline">Aula gratuita · 3 minutos · Dr. Paulo de Tarso</span>
              </span>
            </div>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] text-balance text-ink">
              Descubra como se tornar{" "}
              <em className="font-serif italic text-cyan font-normal">
                psicoterapeuta reconhecido
              </em>{" "}
              — mesmo sem graduação em Psicologia
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted leading-relaxed text-pretty">
              Em 3 minutos, Dr. Paulo de Tarso explica como milhares de pessoas
              estão construindo carreira na área da saúde emocional através da
              nossa certificação em parceria com a Anhanguera.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm md:text-base text-muted">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Reconhecido pelo MEC e Ministério da Saúde
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                EAD · No seu ritmo · 12 meses
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Requisito: Ensino Médio completo
              </li>
            </ul>
          </div>

          <div>
            <AulaCertForm id={HERO_FORM_ID} />
          </div>
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <InstitutionalBar />

      {/* PRA VOCÊ QUE */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp">
          <p className="eyebrow text-center mb-4">Essa aula é pra você que</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
            Quer construir uma carreira com propósito e reconhecimento na saúde emocional
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {[
              {
                title: "Quer ajudar pessoas",
                body: "com saúde emocional, mas não tem graduação em Psicologia",
              },
              {
                title: "Já atua com terapia alternativa",
                body: "e busca reconhecimento profissional formal",
              },
              {
                title: "Pensa em começar carreira nova",
                body: "com flexibilidade e propósito, sem importar a idade",
              },
            ].map((card) => (
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

      {/* QUEM É PAULO */}
      <section className="bg-navy-900 py-16 md:py-20 border-y border-white/5">
        <div className="container-lp max-w-4xl">
          <PauloDeTarsoBio variant="long" />
          <blockquote className="mt-10 md:mt-12 border-l-2 border-cyan pl-5 md:pl-6 text-base md:text-xl italic font-serif text-ink leading-relaxed">
            “Nessa aula de 3 minutos, te mostro o caminho mais direto pra quem
            quer atender com método e segurança.”
          </blockquote>
        </div>
      </section>

      {/* CTA REPETIDO */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-ink mb-3 text-balance">
            Pronto pra dar o primeiro passo?
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Deixe seu contato no formulário acima e receba o link da aula agora
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
            ASSISTIR AULA GRATUITA AGORA
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
