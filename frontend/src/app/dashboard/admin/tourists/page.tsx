import type { Metadata } from "next";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";
import TouristsManager from "@/components/admin-dashboard/tourists/TouristsManager";

export const metadata: Metadata = { title: "Tourists | EVOLANKA Admin" };

export default function AdminTouristsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Community"
        title="Tourists"
        description="View registered travellers, check their activity and restrict suspicious accounts."
      />
      <TouristsManager />
    </div>
  );
}
