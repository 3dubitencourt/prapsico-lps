import { Quote } from "lucide-react";
import { TESTIMONIALS } from "./constants";

// TODO: Substituir por depoimentos reais com foto e autorização de uso
export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-6xl">
        <p className="eyebrow mb-4 text-center">DEPOIMENTOS</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 md:mb-16 text-balance">
          O que dizem{" "}
          <em className="font-serif italic text-cyan font-normal">nossos alunos</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.initials}
              className="rounded-2xl bg-navy-950 border border-white/5 p-6 md:p-7 flex flex-col"
            >
              <Quote className="w-7 h-7 text-cyan mb-4 shrink-0" strokeWidth={1.5} />
              <p className="text-base md:text-lg leading-relaxed text-ink/95 text-pretty mb-6 grow">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cyan/10 border border-cyan/20 text-cyan font-serif italic shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-ink truncate">{t.name}</p>
                  <p className="text-[11px] text-subtle leading-snug">
                    <span className="text-muted">Antes:</span> {t.before}
                  </p>
                  <p className="text-[11px] text-cyan leading-snug">
                    <span className="text-muted">Hoje:</span> {t.after}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
