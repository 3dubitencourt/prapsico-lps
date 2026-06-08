"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePosContent } from "./pos-content";

export function PosFaq() {
  const { faqs } = usePosContent();
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-3xl">
        <p className="eyebrow mb-4 text-center">DÚVIDAS FREQUENTES</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-center text-balance">
          Tem alguma{" "}
          <em className="font-serif italic text-cyan font-normal">pergunta?</em>
        </h2>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl bg-navy-900 border border-white/5 px-5 md:px-6 data-[state=open]:border-cyan/30"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted leading-relaxed pb-5 text-base text-pretty">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
