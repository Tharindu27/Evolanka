import type { Metadata } from "next";
import AdminAccess from "@/components/admin-dashboard/settings/AdminAccess";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Admins & Settings | EVOLANKA Admin" };

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Control centre"
        title="Admins & Settings"
        description="Manage administrator access across the platform."
      />
      <AdminAccess />
    </div>
  );
}
