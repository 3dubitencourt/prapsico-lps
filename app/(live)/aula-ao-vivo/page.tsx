import type { Metadata } from "next";
import { LiveLP } from "./LiveLP";
import { getSettings } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title:
    "Como ir além da escuta · Aula ao vivo 10 de Julho | Prapsico",
  description:
    "Torne-se um psicoterapeuta capacitado, seguro e com reconhecimento técnico — partindo do zero, com método validado pelo MEC. Aula ao vivo 8 de junho às 19h.",
  openGraph: {
    title:
      "Como ir além da escuta · Aula ao vivo 10 de Julho",
    description:
      "Torne-se um psicoterapeuta capacitado, seguro e com reconhecimento técnico — método validado pelo MEC.",
    images: ["/og-aula-ao-vivo.jpg"],
  },
};

export default async function Page() {
  const settings = await getSettings();
  return <LiveLP checkoutUrl={settings.liveCheckoutUrl} />;
}
