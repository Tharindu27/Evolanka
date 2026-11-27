import type { Metadata } from "next";
import ProvidersManager from "@/components/admin-dashboard/providers/ProvidersManager";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Service Providers | EVOLANKA Admin" };

export default function AdminProvidersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Partner network"
        title="Service Providers"
        description="Verify hotels, vehicle owners and guides, and keep the marketplace trustworthy."
      />
      <ProvidersManager />
    </div>
  );
}
