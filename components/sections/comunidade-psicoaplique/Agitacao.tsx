import { AGITACAO } from "./constants";

/* ===== APLIQUE SEU DESIGN AQUI (Agitação do problema) ===== */
export function Agitacao() {
  return (
    <section className="bg-psa-cream-200 py-16 md:py-20 border-y border-psa-navy/10">
      <div className="container-lp max-w-3xl text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-psa-navy mb-6 text-balance">
          {AGITACAO.titulo}
        </h2>
        {AGITACAO.corpo.map((p) => (
          <p
            key={p}
            className="text-base md:text-lg text-psa-navy-700 leading-relaxed mt-4 text-pretty"
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
