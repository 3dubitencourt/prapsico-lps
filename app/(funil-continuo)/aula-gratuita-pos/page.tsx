import type { Metadata } from "next";
import { AulaPosLP } from "./AulaPosLP";

export const metadata: Metadata = {
  title:
    "Aula Gratuita · Pós em Psicologia Positiva | Prapsico × Anhanguera",
  description:
    "Para psicólogos formados. O que sua graduação não te ensinou sobre atender. Aula gratuita de 3 minutos.",
  openGraph: {
    title:
      "Aula Gratuita · Pós em Psicologia Positiva | Prapsico × Anhanguera",
    description:
      "Para psicólogos formados. O que sua graduação não te ensinou sobre atender. Aula gratuita de 3 minutos.",
  },
  alternates: { canonical: "/aula-gratuita-pos" },
};

export default function Page() {
  return <AulaPosLP />;
}
