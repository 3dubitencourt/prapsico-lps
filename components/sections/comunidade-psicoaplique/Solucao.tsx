import { SOLUCAO } from "./constants";
import { MediaSlot } from "./MediaSlot";
import { BrandMark } from "./BrandMark";

/* ===== APLIQUE SEU DESIGN AQUI (Solução / apresentação da comunidade) ===== */
export function Solucao() {
  return (
    <section className="bg-psa-cream py-16 md:py-20">
      <div className="container-lp">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center md:text-left">
            {/* ELEMENTO DE MARCA: estrela em contorno como detalhe */}
            <BrandMark
              src="/psa/elemento-2.png"
              color="bg-psa-lime-dark"
              className="w-10 h-10 mb-4 mx-auto md:mx-0"
            />
            <h2 className="text-2xl md:text-4xl font-bold text-psa-navy mb-6 text-balance">
              {SOLUCAO.titulo}
            </h2>
            <p className="text-base md:text-lg text-psa-navy-700 leading-relaxed">
              {SOLUCAO.corpo}
            </p>
          </div>
          {/* IMAGEM DE APOIO — troque por foto da comunidade / mockup / print */}
          <MediaSlot
            label="Imagem da comunidade"
            hint="Recomendado: 800 × 800 px (quadrada) ou 4:3"
            ratio="aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
