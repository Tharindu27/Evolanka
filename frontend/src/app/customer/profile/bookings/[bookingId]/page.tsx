import { notFound } from 'next/navigation';

import HotelBookingDetails from '@/components/customer/booking/hotel-booking-details';
import RentalBookingDetails from '@/components/customer/booking/rental-booking-details';
import TourGuideBookingDetails from '@/components/customer/booking/tour-guide-booking-details';
import Sidebar from '@/components/customer/common/sidebar';
import { navigationItems } from '@/data/customer-account-data';
import { getHotelBookingById, getRentalBookingById, getTourGuideBookingById } from '@/data/customer-booking-data';

type BookingDetailsPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { bookingId } = await params;
  const hotelBooking = getHotelBookingById(bookingId);
  const tourGuideBooking = getTourGuideBookingById(bookingId);
  const rentalBooking = getRentalBookingById(bookingId);

  if (!hotelBooking && !tourGuideBooking && !rentalBooking) {
    notFound();
  }

  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          {hotelBooking ? <HotelBookingDetails booking={hotelBooking} /> : null}
          {tourGuideBooking ? <TourGuideBookingDetails booking={tourGuideBooking} /> : null}
          {rentalBooking ? <RentalBookingDetails booking={rentalBooking} /> : null}
        </main>
      </div>
    </div>
  );
}
