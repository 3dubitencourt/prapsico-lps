import { AdminShell } from "@/components/admin/AdminShell";
import { LiveForm } from "./LiveForm";

export const dynamic = "force-dynamic";

export default function LivePage() {
  return (
    <AdminShell active="live" title="Config da Live">
      <LiveForm />
    </AdminShell>
  );
}
