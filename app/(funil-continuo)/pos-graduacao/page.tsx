import type { Metadata } from "next";
import { PosLP } from "./PosLP";
import { getSettings } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Pós-graduação em Psicologia Positiva e Neurociência Afetiva | Prapsico × Anhanguera",
  description:
    "Pós lato sensu reconhecida pelo MEC. 360h. Para psicólogos que querem profundidade técnica. R$ 427/mês.",
  openGraph: {
    title:
      "Pós-graduação em Psicologia Positiva e Neurociência Afetiva | Prapsico × Anhanguera",
    description:
      "Pós lato sensu reconhecida pelo MEC · 360h · 12x sem juros · garantia de 30 dias.",
    images: ["/og-pos-graduacao.jpg"],
  },
  alternates: { canonical: "/pos-graduacao" },
};

export default async function Page() {
  const settings = await getSettings();
  return (
    <>
      <link rel="preconnect" href="https://pay.voompcreators.com.br" />
      <PosLP checkoutUrl={settings.posCheckoutUrl} faqs={settings.posFaqs} />
    </>
  );
}
