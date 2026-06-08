import { Check } from "lucide-react";
import { PAIN_POINTS } from "./constants";

export function PainValidation() {
  return (
    <section className="py-20 md:py-28 bg-navy-950">
      <div className="container-lp max-w-4xl">
        <p className="eyebrow mb-4 text-center">VOCÊ SENTE ISSO?</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-12 text-balance">
          Reconhece{" "}
          <em className="font-serif italic text-cyan font-normal">essas falas?</em>
        </h2>

        <ul className="space-y-3 md:space-y-4">
          {PAIN_POINTS.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-2xl bg-navy-900 border border-white/5 p-5 md:p-6"
            >
              <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-md bg-cyan/15 border border-cyan/30 shrink-0">
                <Check className="w-3.5 h-3.5 text-cyan" strokeWidth={3} />
              </span>
              <p className="text-base md:text-lg text-ink/95 leading-relaxed text-pretty">
                &ldquo;{p}&rdquo;
              </p>
            </li>
          ))}
        </ul>

        <p className="text-center mt-10 font-serif italic text-lg md:text-2xl text-cyan-light text-pretty max-w-xl md:max-w-none md:whitespace-nowrap mx-auto">
          Se você marcou pelo menos 2, essa certificação foi feita pra você.
        </p>
      </div>
    </section>
  );
}
