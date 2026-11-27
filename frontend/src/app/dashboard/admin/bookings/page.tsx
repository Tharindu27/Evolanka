import type { Metadata } from "next";
import BookingsTable from "@/components/admin-dashboard/bookings/BookingsTable";
import DisputeResolution from "@/components/admin-dashboard/bookings/DisputeResolution";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Bookings | EVOLANKA Admin" };

export default function AdminBookingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Reservations"
        title="Bookings"
        description="Monitor reservation statuses and resolve disputes between tourists and providers."
      />
      <BookingsTable />
      <DisputeResolution />
    </div>
  );
}
