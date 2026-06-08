import { CTAPos } from "./CTAPos";
import { WHATSAPP_URL } from "./constants";

export function FinalClosingPos() {
  return (
    <section className="pt-20 md:pt-28 pb-12 md:pb-16 bg-navy-950 text-center border-t border-white/5">
      <div className="container-lp max-w-2xl">
        <p className="eyebrow mb-6">DECISÃO</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-balance">
          A decisão é{" "}
          <em className="font-serif italic text-cyan font-normal">técnica</em>
          , não emocional.
        </h2>

        <div className="space-y-2 text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto text-pretty">
          <p>Olhe a grade. Olhe o corpo docente. Olhe o reconhecimento MEC.</p>
          <p className="font-serif italic text-ink text-lg md:text-xl pt-2">
            Se faz sentido pra sua prática clínica, a próxima turma te espera.
          </p>
        </div>

        <CTAPos source="final_closing" size="lg" />

        <p className="mt-8 text-sm text-subtle">
          Prefere conversar com a coordenação primeiro?{" "}
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
