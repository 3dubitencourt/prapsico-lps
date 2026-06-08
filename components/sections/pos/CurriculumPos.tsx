"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";
import { CURRICULUM_POS } from "./constants";

// TODO: Substituir pela grade real fornecida pela Prapsico
export function CurriculumPos() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-4xl">
        <p className="eyebrow mb-4 text-center">GRADE CURRICULAR</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-4 text-balance">
          <em className="font-serif italic text-cyan font-normal">360h</em>{" "}
          em 12 meses
        </h2>
        <p className="text-center text-muted text-base md:text-lg mb-12 max-w-2xl mx-auto text-pretty">
          Toque pra abrir cada módulo e ver o detalhamento da carga horária.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {CURRICULUM_POS.map((mod) => (
            <AccordionItem
              key={mod.n}
              value={`mod-${mod.n}`}
              className="rounded-2xl bg-navy-900 border border-white/5 px-5 md:px-6 data-[state=open]:border-cyan/30"
            >
              <AccordionTrigger className="text-left py-5 hover:no-underline gap-4">
                <span className="flex items-center gap-4 md:gap-5 w-full">
                  <span className="font-serif italic text-cyan text-2xl md:text-3xl shrink-0 w-10 md:w-12">
                    {String(mod.n).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[10px] md:text-xs tracking-[0.18em] uppercase text-subtle font-medium mb-0.5">
                      Módulo {mod.n}
                    </span>
                    <span className="block text-base md:text-lg font-semibold text-ink text-pretty">
                      {mod.title}
                    </span>
                  </span>
                  <span className="shrink-0 inline-flex items-center gap-1 text-[11px] md:text-xs font-bold text-cyan bg-cyan/10 border border-cyan/30 rounded-full px-2.5 py-1 whitespace-nowrap">
                    {mod.hours}h
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-0 md:pl-[4.5rem]">
                <ul className="space-y-2 text-muted text-sm md:text-base leading-relaxed">
                  {mod.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="mt-2 inline-block w-1 h-1 rounded-full bg-cyan shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 rounded-2xl bg-navy-900 border border-cyan/20 p-6 md:p-7">
          <div className="flex items-start gap-4">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-cyan/10 border border-cyan/20 shrink-0">
              <GraduationCap className="w-6 h-6 text-cyan" strokeWidth={1.75} />
            </div>
            <div className="text-sm md:text-base text-muted leading-relaxed">
              <p>
                <span className="text-ink font-semibold">Carga total:</span> 360h ·{" "}
                <span className="text-ink font-semibold">Modalidade:</span> EAD com aulas ao vivo + gravadas ·{" "}
                <span className="text-ink font-semibold">Avaliação:</span> trabalho de conclusão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
