"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CURRICULUM_12 } from "./constants";

// TODO: Substituir pela grade real fornecida pela Prapsico
export function CurriculumCert() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-4xl">
        <p className="eyebrow mb-4 text-center">GRADE CURRICULAR</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-4 text-balance">
          O que você vai aprender em{" "}
          <em className="font-serif italic text-cyan font-normal">12 módulos</em>
        </h2>
        <p className="text-center text-muted text-base md:text-lg mb-12 max-w-2xl mx-auto text-pretty">
          Um módulo por mês, com aulas gravadas e ao vivo. Toque pra abrir e ver o conteúdo de cada mês.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {CURRICULUM_12.map((mod) => (
            <AccordionItem
              key={mod.month}
              value={`mes-${mod.month}`}
              className="rounded-2xl bg-navy-900 border border-white/5 px-5 md:px-6 data-[state=open]:border-cyan/30"
            >
              <AccordionTrigger className="text-left py-5 hover:no-underline gap-4">
                <span className="flex items-center gap-4 md:gap-5">
                  <span className="font-serif italic text-cyan text-2xl md:text-3xl shrink-0 w-10 md:w-12">
                    {String(mod.month).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[10px] md:text-xs tracking-[0.18em] uppercase text-subtle font-medium mb-0.5">
                      Mês {mod.month}
                    </span>
                    <span className="block text-base md:text-lg font-semibold text-ink">
                      {mod.title}
                    </span>
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
      </div>
    </section>
  );
}
