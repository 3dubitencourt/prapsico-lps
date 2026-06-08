import { IDENTIFICACAO } from "./constants";

/* ===== APLIQUE SEU DESIGN AQUI (Identificação — "pra você que") ===== */
export function Identificacao() {
  return (
    <section className="bg-psa-cream py-16 md:py-20">
      <div className="container-lp max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-psa-navy mb-10 md:mb-12 text-balance">
          {IDENTIFICACAO.titulo}
        </h2>
        <ul className="space-y-4 md:space-y-5">
          {IDENTIFICACAO.itens.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 md:gap-4 rounded-xl border border-psa-navy/10 bg-white p-4 md:p-5"
            >
              <span
                aria-hidden
                className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full bg-psa-lime text-psa-navy font-bold text-sm"
              >
                ✓
              </span>
              <span className="text-psa-navy text-base md:text-lg leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
