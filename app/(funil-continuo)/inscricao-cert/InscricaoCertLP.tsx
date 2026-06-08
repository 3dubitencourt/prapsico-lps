"use client";

import { useEffect } from "react";
import { InstitutionalBar } from "@/components/sections/InstitutionalBar";
import { PauloDeTarsoBio } from "@/components/sections/PauloDeTarsoBio";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { trackViewInscricaoCert } from "@/lib/tracking";
import { InscricaoCertForm } from "./InscricaoCertForm";

const HERO_FORM_ID = "form-inscricao-cert-hero";

function scrollToForm() {
  const el = document.getElementById(HERO_FORM_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const firstInput = el.querySelector<HTMLInputElement>("input");
  setTimeout(() => firstInput?.focus({ preventScroll: true }), 500);
}

const BENEFITS = [
  {
    title: "Formação Reconhecida",
    body: "Certificação em parceria com a Anhanguera, validada pelo MEC. Aulas diretas com Dr. Paulo de Tarso.",
  },
  {
    title: "Consultório Próprio",
    body: "Aprenda a montar e gerir sua própria prática. Alunos faturando até R$ 7.000/mês em consultório.",
  },
  {
    title: "Suporte Real",
    body: "Supervisão de casos com profissionais experientes. Núcleo de atendimento social pra prática supervisionada.",
  },
];

const FIT_BULLETS = [
  "Sente o chamado pra ajudar pessoas com saúde emocional",
  "Já atua com terapia alternativa e quer reconhecimento formal",
  "Quer começar uma profissão segura e rentável, em qualquer idade",
  "Busca formação prática, com supervisão e método",
];

const TESTIMONIALS = [
  {
    initials: "MR",
    name: "Marina R.",
    role: "Psicoterapeuta · Belo Horizonte/MG",
    quote:
      "Saí da terapia alternativa pro consultório formal em 8 meses. Hoje atendo com método e cobro o que vale.",
  },
  {
    initials: "JC",
    name: "Júlio C.",
    role: "Psicoterapeuta · Uberlândia/MG",
    quote:
      "Com 52 anos, mudei de carreira. A supervisão do Paulo me deu segurança pra atender desde o primeiro caso.",
  },
  {
    initials: "AS",
    name: "Aline S.",
    role: "Psicoterapeuta · Goiânia/GO",
    quote:
      "Comecei do zero, sem graduação. Hoje fatura R$ 6.800/mês no consultório próprio em menos de 1 ano formada.",
  },
];

export function InscricaoCertLP() {
  useEffect(() => {
    trackViewInscricaoCert();
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
              Certificação em Psicanálise e Neurociência
              <span className="block md:inline mt-0.5 md:mt-0 md:ml-1 text-subtle font-medium">
                <span className="hidden md:inline">·</span> 12 meses · EAD
              </span>
            </p>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] text-balance text-ink">
              Construa uma{" "}
              <em className="font-serif italic text-cyan font-normal">
                carreira reconhecida
              </em>{" "}
              em saúde emocional — em 12 meses
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted leading-relaxed text-pretty">
              Certificação em parceria com a Anhanguera, reconhecida pelo MEC e
              Ministério da Saúde. Atenda em consultório próprio, com método
              sólido e supervisão real.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm md:text-base text-muted">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Não precisa de graduação em Psicologia
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                Requisito: Ensino Médio completo
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-cyan font-bold">✓</span>
                A partir de{" "}
                <span className="text-ink font-semibold">R$ 257/mês</span> ·
                parcelado em até 12x
              </li>
            </ul>

            <p className="mt-6 text-sm md:text-base text-ink leading-relaxed">
              →{" "}
              <span className="text-muted">
                Preencha ao lado e nossa equipe entra em contato em até{" "}
              </span>
              <span className="text-cyan font-semibold">5 minutos</span>
              <span className="text-muted"> pra entender seu momento.</span>
            </p>
          </div>

          <div>
            <InscricaoCertForm id={HERO_FORM_ID} />
          </div>
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <InstitutionalBar />

      {/* O QUE VOCÊ VAI CONQUISTAR */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp">
          <p className="eyebrow text-center mb-4">O que você vai conquistar</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
            Uma carreira sólida — não um curso a mais na sua estante
          </h2>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {BENEFITS.map((card) => (
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

      {/* ESSA CERTIFICAÇÃO É PRA VOCÊ SE */}
      <section className="bg-navy-900 py-16 md:py-20 border-y border-white/5">
        <div className="container-lp max-w-3xl">
          <p className="eyebrow text-center mb-4">Confere se faz sentido</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-12 text-balance">
            Essa certificação é pra você se:
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

      {/* QUEM É PAULO */}
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp">
          <PauloDeTarsoBio variant="long" />
          <blockquote className="mt-8 md:mt-10 max-w-3xl border-l-2 border-cyan pl-5 md:pl-6 text-base md:text-lg italic font-serif text-ink leading-relaxed">
            “Não basta querer ajudar. Quem atende sem método faz mais mal que
            bem. Aqui você aprende clínica de verdade — desde o primeiro mês.”
          </blockquote>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="bg-navy-900 py-16 md:py-20 border-y border-white/5">
        <div className="container-lp">
          <p className="eyebrow text-center mb-4">Quem já fez</p>
          <h2 className="text-2xl md:text-4xl font-bold text-center text-ink mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
            Resultado real de quem trilhou esse caminho
          </h2>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-white/10 bg-navy-950/60 p-6 md:p-7 flex flex-col"
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
      <section className="bg-navy-950 py-16 md:py-20">
        <div className="container-lp max-w-3xl">
          <div className="rounded-2xl border border-cyan/30 bg-navy-900/60 p-7 md:p-10 text-center shadow-[0_20px_60px_rgba(6,164,212,0.18)]">
            <span className="inline-block text-[11px] md:text-xs tracking-[0.18em] uppercase font-bold text-navy-950 bg-cyan rounded-full px-4 py-1.5">
              30 dias de garantia incondicional
            </span>
            <h2 className="mt-6 text-2xl md:text-4xl font-bold text-ink leading-tight text-balance">
              Se não for pra você,{" "}
              <em className="font-serif italic text-cyan font-normal">
                devolvemos seu dinheiro
              </em>{" "}
              sem complicação.
            </h2>
            <p className="mt-4 text-muted text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              Você tem 30 dias pra conhecer a certificação por dentro. Se sentir
              que não é o caminho certo, a gente devolve 100% do valor — sem
              perguntas, sem burocracia.
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
              FALAR COM A EQUIPE AGORA
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

      <Footer />

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
          FALAR COM A EQUIPE <span aria-hidden>→</span>
        </button>
      </div>
      <div aria-hidden className="md:hidden h-20" />
    </>
  );
}
