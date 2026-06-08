import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { REPLAY_FAQS } from "./constants";

export function ReplayFaq() {
  return (
    <section className="py-20 md:py-28 bg-navy-900 border-y border-white/5">
      <div className="container-lp max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-center text-balance">
          Perguntas{" "}
          <em className="font-serif italic text-cyan font-normal">frequentes</em>
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {REPLAY_FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`replay-faq-${i}`}
              className="rounded-2xl bg-navy-950 border border-white/5 px-6 data-[state=open]:border-cyan/30"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-medium py-5 hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted leading-relaxed pb-5 text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
