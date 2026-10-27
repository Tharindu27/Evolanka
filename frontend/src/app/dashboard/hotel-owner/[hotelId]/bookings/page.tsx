import BookingsManager from "@/components/dashboards/hotel-owner/BookingsManager";

interface BookingsPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerBookingsPage({ params }: BookingsPageProps) {
  const { hotelId } = await params;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Bookings &amp; Reservations
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Search guest manifests, perform check-ins, verify deposit payments, and view vouchers
          </p>
        </div>
      </div>

      <BookingsManager hotelId={hotelId} />
    </div>
  );
}
