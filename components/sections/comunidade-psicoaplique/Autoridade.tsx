import Image from "next/image";
import { AUTORIDADE } from "./constants";

/* ===== APLIQUE SEU DESIGN AQUI (Autoridade — Dr. Paulo de Tarso) ===== */
export function Autoridade() {
  return (
    <section className="bg-psa-cream-200 py-16 md:py-20 border-y border-psa-navy/10">
      <div className="container-lp">
        {/* eyebrow é cyan por padrão no projeto — sobrescrevo p/ marinho nesta LP */}
        <p className="eyebrow text-psa-navy-700 mb-4 text-center md:text-left">
          {AUTORIDADE.titulo}
        </p>
        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-psa-navy/15 aspect-[4/5] w-full max-w-[280px] mx-auto md:mx-0">
            {/* TODO: trocar por foto profissional e acolhedora do Dr. Paulo, se houver outra */}
            <Image
              src="/paulo-de-tarso.png"
              alt="Dr. Paulo de Tarso"
              fill
              sizes="(min-width: 768px) 280px, 240px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-psa-navy mb-4 leading-tight">
              Dr. Paulo de Tarso
            </h2>
            <p className="text-base md:text-lg text-psa-navy-700 leading-relaxed">
              {AUTORIDADE.corpo}
            </p>
            {/* TODO: inserir credenciais/registro profissional reais */}
            <p className="mt-4 text-sm text-psa-navy-500">
              {AUTORIDADE.credenciais}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
