import { notFound } from 'next/navigation';

import HotelBookingDetails from '@/components/customer/booking/hotel-booking-details';
import Sidebar from '@/components/customer/common/sidebar';
import { navigationItems } from '@/data/customer-account-data';
import { getHotelBookingById } from '@/data/customer-booking-data';

type BookingDetailsPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { bookingId } = await params;
  const booking = getHotelBookingById(bookingId);

  if (!booking) {
    notFound();
  }

  return (
    <div className="brand-backdrop min-h-screen bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <HotelBookingDetails booking={booking} />
        </main>
      </div>
    </div>
  );
}
