import { AdminShell } from "@/components/admin/AdminShell";
import { CampaignsClient } from "./CampaignsClient";

export const dynamic = "force-dynamic";

export default function CampanhasPage() {
  return (
    <AdminShell active="campanhas" title="Campanhas">
      <CampaignsClient />
    </AdminShell>
  );
}
