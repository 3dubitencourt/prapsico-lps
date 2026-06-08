import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./constants";

export function ConsultativeCTA() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-2xl text-center">
        <p className="eyebrow mb-5">Conversa sem pressão</p>
        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-5 text-balance">
          Ainda em dúvida{" "}
          <em className="font-serif italic text-cyan font-normal">entre os caminhos?</em>
        </h2>
        <p className="text-muted text-base md:text-lg leading-relaxed mb-8 text-pretty">
          Nossa equipe está disponível pra conversar sem pressão. Em 15 minutos no WhatsApp, te ajudamos a entender qual caminho faz sentido pro seu momento profissional.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide whitespace-nowrap bg-success text-ink hover:opacity-90 transition px-6 md:px-8 py-4 text-sm md:text-base shadow-[0_8px_24px_rgba(47,190,122,0.30)]"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2.25} aria-hidden />
          Falar com a equipe no WhatsApp
        </a>
      </div>
    </section>
  );
}
