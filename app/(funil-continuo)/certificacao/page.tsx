import type { Metadata } from "next";
import { CertLP } from "./CertLP";
import { getSettings } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Certificação em Psicanálise e Neurociência | Prapsico × Anhanguera",
  description:
    "Torne-se psicoterapeuta reconhecido em 12 meses. Certificação EAD em parceria com a Anhanguera, reconhecida pelo MEC. A partir de R$ 257/mês.",
  openGraph: {
    title:
      "Certificação em Psicanálise e Neurociência | Prapsico × Anhanguera",
    description:
      "Torne-se psicoterapeuta reconhecido em 12 meses. 12x sem juros · garantia de 30 dias.",
    images: ["/og-certificacao.jpg"],
  },
  alternates: { canonical: "/certificacao" },
};

export default async function Page() {
  const settings = await getSettings();
  return (
    <>
      <link rel="preconnect" href="https://pay.voompcreators.com.br" />
      <CertLP checkoutUrl={settings.certCheckoutUrl} faqs={settings.certFaqs} />
    </>
  );
}
