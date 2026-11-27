import type { Metadata } from "next";
import AddLocationForm from "@/components/admin-dashboard/locations/AddLocationForm";
import LocationRequests from "@/components/admin-dashboard/locations/LocationRequests";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Locations | EVOLANKA Admin" };

export default function AdminLocationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Destinations"
        title="Locations"
        description="Create detailed destination profiles and review submissions from tourists and service providers."
      />
      <AddLocationForm />
      <LocationRequests />
    </div>
  );
}
