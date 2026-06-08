import { CTACert } from "./CTACert";
import { WHATSAPP_URL } from "./constants";

export function FinalClosing() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-navy-900 to-navy-950 text-center border-t border-white/5">
      <div className="container-lp max-w-2xl">
        <p className="eyebrow mb-6">DECISÃO</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
          Tá pronto pra{" "}
          <em className="font-serif italic text-cyan font-normal">começar?</em>
        </h2>

        <div className="space-y-2 text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto text-pretty">
          <p>Em 12 meses você pode estar atendendo no seu próprio consultório.</p>
          <p>Ou pode estar exatamente onde está hoje.</p>
          <p className="font-serif italic text-ink text-lg md:text-xl pt-2">
            A decisão é sua.
          </p>
        </div>

        <CTACert source="final_closing" size="lg" />

        <p className="mt-8 text-sm text-subtle">
          Ou prefere falar com a equipe primeiro?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-cyan-light border-b border-cyan/30 hover:border-cyan transition whitespace-nowrap"
          >
            WhatsApp (35) 99257-1045
          </a>
        </p>
      </div>
    </section>
  );
}
