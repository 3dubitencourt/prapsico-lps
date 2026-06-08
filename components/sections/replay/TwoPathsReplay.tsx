"use client";

import Link from "next/link";
import { ArrowRight, Check, Clock, GraduationCap, ClipboardList, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackClickPath } from "@/lib/tracking";
import { CERT_URL, POS_URL, WHATSAPP_URL } from "./constants";

type Path = {
  badge: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  trackId: "cert" | "pos";
  requirementIcon: typeof ClipboardList;
  requirement: string;
  duration: string;
  price: string;
  recognitions: string[];
};

const paths: Path[] = [
  {
    badge: "Caminho A · Certificação",
    title: "Psicanálise e Neurociência",
    description: "Pra quem sente o chamado mas não tem graduação em Psi.",
    href: CERT_URL,
    cta: "Conhecer a Certificação",
    trackId: "cert",
    requirementIcon: ClipboardList,
    requirement: "Requisito: Ensino Médio",
    duration: "12 meses · EAD",
    price: "R$ 257/mês",
    recognitions: ["Reconhecimento MEC", "Parceria Anhanguera"],
  },
  {
    badge: "Caminho B · Pós-graduação",
    title: "Psicologia Positiva e Neurociência Afetiva",
    description: "Pra psicólogo formado que busca aprofundamento técnico.",
    href: POS_URL,
    cta: "Conhecer a Pós",
    trackId: "pos",
    requirementIcon: GraduationCap,
    requirement: "Requisito: graduação em Psicologia",
    duration: "12 meses · EAD · 360h",
    price: "R$ 427/mês",
    recognitions: ["Pós lato sensu MEC", "Parceria Anhanguera"],
  },
];

export function TwoPathsReplay() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-6xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-center mb-12 text-balance max-w-3xl mx-auto">
          Se a live fez sentido pra você, conheça nossos{" "}
          <em className="font-serif italic text-cyan font-normal">2 caminhos formativos:</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {paths.map((path) => {
            const Icon = path.requirementIcon;
            return (
              <article
                key={path.trackId}
                className={cn(
                  "flex flex-col rounded-2xl bg-navy-900 border border-white/10 p-6 md:p-10",
                  "hover:border-cyan/40 transition-colors",
                )}
              >
                <p className="eyebrow mb-4">{path.badge}</p>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-3 text-balance">
                  {path.title}
                </h3>
                <p className="text-muted text-base mb-7 text-pretty">{path.description}</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm md:text-base">
                    <Icon className="w-4 h-4 text-cyan shrink-0" strokeWidth={1.75} aria-hidden />
                    <span className="text-muted">{path.requirement}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm md:text-base">
                    <Clock className="w-4 h-4 text-cyan shrink-0" strokeWidth={1.75} aria-hidden />
                    <span className="text-muted">{path.duration}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm md:text-base">
                    <Wallet className="w-4 h-4 text-cyan shrink-0" strokeWidth={1.75} aria-hidden />
                    <span className="text-muted">{path.price}</span>
                  </li>
                  {path.recognitions.map((r) => (
                    <li key={r} className="flex items-center gap-3 text-sm md:text-base">
                      <Check className="w-4 h-4 text-cyan shrink-0" strokeWidth={2} aria-hidden />
                      <span className="text-muted">{r}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={path.href}
                  onClick={() => trackClickPath(path.trackId)}
                  className={cn(
                    "mt-auto inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap",
                    "bg-cyan text-navy-950 hover:bg-cyan-light transition",
                    "shadow-[0_8px_24px_rgba(6,164,212,0.30)] hover:shadow-[0_12px_32px_rgba(6,164,212,0.45)]",
                    "px-6 md:px-8 py-4 text-sm md:text-base text-center",
                  )}
                >
                  {path.cta}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="text-center mt-10 font-serif italic text-base md:text-lg text-muted">
          Não sabe qual caminho é o seu?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-cyan-light underline-offset-4 hover:underline not-italic font-sans font-medium"
          >
            Fala com nosso time pelo WhatsApp.
          </a>
        </p>
      </div>
    </section>
  );
}
