import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReplayLP } from "./ReplayLP";
import { getSettings } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Replay · Aula ao Vivo · Psicólogo Paulo de Tarso | Prapsico",
  description:
    "Replay oficial da aula clínica de 8 de junho. Disponível por 7 dias. Em parceria com a Anhanguera.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Replay · Aula ao Vivo · Psicólogo Paulo de Tarso",
    description: "Replay oficial. Disponível por 7 dias.",
    images: ["/og-aula-ao-vivo.jpg"],
  },
};

type Props = {
  searchParams: { token?: string };
};

function isExpired(token: string | undefined, deadlineMs: number): boolean {
  if (!token) {
    return Date.now() > deadlineMs;
  }
  try {
    const decoded = parseInt(Buffer.from(token, "base64url").toString("utf-8"), 10);
    if (!Number.isFinite(decoded)) return true;
    return Date.now() > decoded;
  } catch {
    return true;
  }
}

export default async function Page({ searchParams }: Props) {
  const settings = await getSettings();
  if (isExpired(searchParams?.token, settings.replayDeadlineMs)) {
    redirect("/replay-encerrado");
  }
  return (
    <ReplayLP
      vimeoId={settings.replayVimeoId}
      deadlineMs={settings.replayDeadlineMs}
    />
  );
}
