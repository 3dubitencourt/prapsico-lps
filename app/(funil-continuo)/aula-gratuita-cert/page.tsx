import type { Metadata } from "next";
import { AulaCertLP } from "./AulaCertLP";

export const metadata: Metadata = {
  title: "Aula Gratuita · Certificação em Psicanálise | Prapsico × Anhanguera",
  description:
    "3 minutos com Dr. Paulo de Tarso. Descubra como se tornar psicoterapeuta reconhecido sem graduação em Psicologia.",
  openGraph: {
    title: "Aula Gratuita · Certificação em Psicanálise | Prapsico × Anhanguera",
    description:
      "3 minutos com Dr. Paulo de Tarso. Descubra como se tornar psicoterapeuta reconhecido sem graduação em Psicologia.",
  },
  alternates: { canonical: "/aula-gratuita-cert" },
};

export default function Page() {
  return <AulaCertLP />;
}
