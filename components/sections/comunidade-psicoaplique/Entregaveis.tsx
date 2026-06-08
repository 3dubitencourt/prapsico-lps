import { ENTREGAVEIS } from "./constants";
import { BrandMark } from "./BrandMark";

/* ===== APLIQUE SEU DESIGN AQUI (Entregáveis — grid de 4 cards) =====
 * Marcador = estrelinha de marca (elemento-4). Troque por ícones reais depois. */
export function Entregaveis() {
  return (
    <section className="bg-psa-cream-200 py-16 md:py-20 border-y border-psa-navy/10">
      <div className="container-lp">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-psa-navy mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
          {ENTREGAVEIS.titulo}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {ENTREGAVEIS.cards.map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-psa-navy/10 bg-white p-6 md:p-7 shadow-[0_8px_24px_rgba(30,34,97,0.06)]"
            >
              {/* marcador = estrelinha de marca */}
              <span
                aria-hidden
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-psa-lime"
              >
                <BrandMark
                  src="/psa/elemento-4.png"
                  color="bg-psa-navy"
                  className="w-5 h-5"
                />
              </span>
              <p className="mt-4 text-base md:text-lg text-psa-navy leading-snug font-medium">
                {card}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
