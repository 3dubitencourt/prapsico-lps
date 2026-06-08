import type { Metadata } from "next";
import { InscricaoPosLP } from "./InscricaoPosLP";

export const metadata: Metadata = {
  title: "Inscrição · Pós em Psicologia Positiva | Prapsico × Anhanguera",
  description:
    "Pós lato sensu reconhecida pelo MEC. Para psicólogos formados. Fale com a coordenação acadêmica.",
  openGraph: {
    title: "Inscrição · Pós em Psicologia Positiva | Prapsico × Anhanguera",
    description:
      "Pós lato sensu reconhecida pelo MEC. Para psicólogos formados. Fale com a coordenação acadêmica.",
  },
  alternates: { canonical: "/inscricao-pos" },
};

export default function Page() {
  return <InscricaoPosLP />;
}
