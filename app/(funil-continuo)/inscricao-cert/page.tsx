import type { Metadata } from "next";
import { InscricaoCertLP } from "./InscricaoCertLP";

export const metadata: Metadata = {
  title: "Inscrição · Certificação em Psicanálise | Prapsico × Anhanguera",
  description:
    "Construa carreira em saúde emocional em 12 meses. Certificação EAD R$ 257/mês. Fale com nossa equipe.",
  openGraph: {
    title: "Inscrição · Certificação em Psicanálise | Prapsico × Anhanguera",
    description:
      "Construa carreira em saúde emocional em 12 meses. Certificação EAD R$ 257/mês. Fale com nossa equipe.",
  },
  alternates: { canonical: "/inscricao-cert" },
};

export default function Page() {
  return <InscricaoCertLP />;
}
