import type { BaseBooking } from './booking-data';

export type RentalBooking = BaseBooking & {
  tab: 'Rental Bookings';
  category: 'Rental';
};

export const rentalBookings: RentalBooking[] = [
  {
    id: 'booking-7',
    tab: 'Rental Bookings',
    group: 'Upcoming',
    category: 'Rental',
    title: 'Premium SUV Rental - Colombo',
    reference: 'EVO-RT-56681',
    status: 'Confirmed / Paid',
    dateRange: '22 Oct 2025 - 26 Oct 2025',
    totalAmount: 'LKR 38,000',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
  },
  {
    id: 'booking-11',
    tab: 'Rental Bookings',
    group: 'Upcoming',
    category: 'Rental',
    title: 'Tuk Tuk Rental - Galle',
    reference: 'EVO-RT-78115',
    status: 'Confirmed / Paid',
    dateRange: '12 Nov 2025 - 14 Nov 2025',
    totalAmount: 'LKR 12,000',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Nov 10',
  },
  {
    id: 'booking-12',
    tab: 'Rental Bookings',
    group: 'Past',
    category: 'Rental',
    title: 'Scooter Rental - Mirissa',
    reference: 'EVO-RT-40923',
    status: 'Completed',
    dateRange: '03 Sep 2025 - 06 Sep 2025',
    totalAmount: 'LKR 9,600',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    tagTone: 'green',
    cancellationText: 'Your vehicle rental was successfully completed',
  },
  {
    id: 'booking-8',
    tab: 'Rental Bookings',
    group: 'Cancelled',
    category: 'Rental',
    title: 'Airport Transfer Van - Katunayake',
    reference: 'EVO-RT-21940',
    status: 'Cancelled',
    dateRange: '05 Oct 2025 - 05 Oct 2025',
    totalAmount: 'LKR 14,500',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
  },
];
