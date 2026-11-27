import type { Metadata } from "next";
import ListingsManager from "@/components/admin-dashboard/listings/ListingsManager";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Listings & Packages | EVOLANKA Admin" };

export default function AdminListingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Marketplace"
        title="Listings & Packages"
        description="Approve new tour packages, villas and vehicles, and choose what is featured on the home page."
      />
      <ListingsManager />
    </div>
  );
}
