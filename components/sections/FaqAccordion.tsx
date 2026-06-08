import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Preciso ser psicólogo formado pra assistir?",
    a: "Não. A aula serve pros dois grupos: com ou sem CRP. Os 70 primeiros minutos são universais.",
  },
  {
    q: "Vai ter venda de curso na live?",
    a: "Nos últimos 10 minutos, o psicólogo Paulo apresenta de forma consultiva os dois caminhos formativos (Certificação e Pós-graduação). Sem countdown, sem pressão.",
  },
  {
    q: "Vou receber a gravação?",
    a: "Sim. A gravação será disponibilizada para todos por 7 dias após o evento.",
  },
  {
    q: "Como entro na live no dia?",
    a: "Você recebe o link via WhatsApp.",
  },
  {
    q: "Por que cobrar R$ 37 se a aula é educativa?",
    a: "Pra garantir que quem se inscreve realmente assiste. Live grátis tem 80% de no-show. Cobrando R$ 37, filtramos quem está comprometido.",
  },
];

export function FaqAccordion() {
  return (
    <section className="py-16 md:py-20 bg-navy-900 border-t border-white/5">
      <div className="container-lp max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12 text-center text-balance">
          Perguntas{" "}
          <em className="font-serif italic text-cyan font-normal">frequentes</em>
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-2xl bg-navy-900 border border-white/5 px-6 data-[state=open]:border-cyan/30"
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
