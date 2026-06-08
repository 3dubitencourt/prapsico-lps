import { Quote, PlayCircle } from "lucide-react";
import { TESTIMONIALS_POS } from "./constants";

// TODO: Substituir por depoimentos reais (com foto + CRP autorizados + link de vídeo)
export function TestimonialsPos() {
  return (
    <section className="py-20 md:py-28 bg-navy-900">
      <div className="container-lp max-w-6xl">
        <p className="eyebrow mb-4 text-center">DEPOIMENTOS</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 md:mb-16 text-balance">
          O que diz quem{" "}
          <em className="font-serif italic text-cyan font-normal">já está atendendo melhor</em>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {TESTIMONIALS_POS.map((t) => (
            <article
              key={t.initials}
              className={`rounded-2xl bg-navy-950 border p-6 md:p-7 flex flex-col ${
                t.isVideo ? "border-cyan/30" : "border-white/5"
              }`}
            >
              {t.isVideo ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-900 border border-cyan/20 mb-5">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse at center, rgba(6,164,212,0.18) 0%, transparent 65%)",
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <PlayCircle
                      className="w-10 h-10 text-cyan mb-1.5"
                      strokeWidth={1.25}
                    />
                    <p className="text-[10px] tracking-[0.18em] uppercase text-subtle">
                      Depoimento em vídeo
                    </p>
                  </div>
                </div>
              ) : (
                <Quote className="w-7 h-7 text-cyan mb-4 shrink-0" strokeWidth={1.5} />
              )}

              <p className="text-sm md:text-base leading-relaxed text-ink/95 text-pretty mb-5 grow">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan/10 border border-cyan/20 text-cyan font-serif italic text-xs shrink-0">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-ink leading-tight truncate">
                    {t.name}
                  </p>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-cyan font-medium leading-snug mt-0.5">
                    {t.crp}
                  </p>
                  <p className="text-[11px] text-muted leading-snug mt-0.5 text-pretty">
                    {t.role}
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
