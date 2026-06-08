import type { Metadata } from "next";
import { Suspense } from "react";
import { ObrigadoLiveLP } from "./ObrigadoLiveLP";
import { getSettings } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vaga Confirmada · Aula ao Vivo 8 de Junho | Prapsico",
  description:
    "Sua inscrição na aula clínica do dia 8 de junho está garantida. Próximos passos: grupo VIP, aula bônus e lembretes.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Vaga Confirmada · Aula ao Vivo 8 de Junho",
    description: "Inscrição confirmada. Próximos passos para participar da live.",
  },
};

export default async function Page() {
  const settings = await getSettings();
  return (
    <Suspense fallback={null}>
      <ObrigadoLiveLP
        whatsappGroupUrl={settings.liveWhatsappGroupUrl}
        bonusVideoUrl={settings.liveBonusVideoUrl}
      />
    </Suspense>
  );
}
