import type { Metadata } from "next";
import { ComunidadePsicoapliqueLP } from "./ComunidadePsicoapliqueLP";
import { libreFranklin } from "./fonts";

export const metadata: Metadata = {
  title: "Comunidade Psicoaplique | Seu porto seguro de saúde mental",
  description:
    "Saia do modo sobrevivência com apoio real, todos os dias. Desbloqueie agora seu presente exclusivo na Comunidade Psicoaplique.",
  openGraph: {
    title: "Comunidade Psicoaplique | Seu porto seguro de saúde mental",
    description:
      "Cura não acontece no isolamento. Conheça o ecossistema de saúde mental do Dr. Paulo de Tarso e desbloqueie seu presente.",
    images: ["/og-comunidade-psicoaplique.jpg"], // TODO: subir a imagem em /public
  },
  alternates: { canonical: "/comunidade-psicoaplique" },
};

export default function Page() {
  return (
    <div className={`${libreFranklin.variable} font-psa`}>
      <ComunidadePsicoapliqueLP />
    </div>
  );
}
