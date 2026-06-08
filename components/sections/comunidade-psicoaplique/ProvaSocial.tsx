import { PROVA_SOCIAL } from "./constants";

/* ===== APLIQUE SEU DESIGN AQUI (Prova social — prints + vídeos) =====
 * TODO: substituir os placeholders abaixo:
 *   - PRINTS: subir as imagens anonimizadas em /public e renderizar aqui
 *   - VÍDEOS: 2 a 3 embeds curtos de membros (YouTube/Vimeo/mp4) */
export function ProvaSocial() {
  return (
    <section className="bg-psa-cream py-16 md:py-20">
      <div className="container-lp">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-psa-navy mb-10 md:mb-14 max-w-3xl mx-auto text-balance">
          {PROVA_SOCIAL.titulo}
        </h2>

        {/* Grid de PRINTS (placeholder) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-psa-navy/25 bg-white/60 aspect-[3/4] flex items-center justify-center text-psa-navy-500 text-sm text-center px-4"
            >
              {/* TODO: print real anonimizado */}
              Print de WhatsApp/plataforma #{i + 1}
            </div>
          ))}
        </div>

        {/* Grid de VÍDEOS (placeholder) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-dashed border-psa-navy/25 bg-white/60 aspect-video flex items-center justify-center text-psa-navy-500 text-sm text-center px-4"
            >
              {/* TODO: embed de vídeo do membro */}
              Vídeo depoimento #{i + 1}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
