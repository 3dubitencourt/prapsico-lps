import { AdminShell } from "@/components/admin/AdminShell";
import { ContentForm } from "./ContentForm";

export const dynamic = "force-dynamic";

export default function ConteudoPage() {
  return (
    <AdminShell active="conteudo" title="Conteúdo das LPs">
      <ContentForm />
    </AdminShell>
  );
}
