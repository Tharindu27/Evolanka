import type { BaseBooking } from './booking-data';

export type TourGuideBooking = BaseBooking & {
  tab: 'Tour Guide Bookings';
  category: 'Tour Guide';
};

export const tourGuideBookings: TourGuideBooking[] = [
  {
    id: 'booking-5',
    tab: 'Tour Guide Bookings',
    group: 'Upcoming',
    category: 'Tour Guide',
    title: 'Nuwan Perera',
    reference: 'EVO-TG-11890',
    status: 'Confirmed / Paid',
    dateRange: '10 Nov 2025 - 11 Nov 2025',
    totalAmount: 'LKR 28,500',
    image: 'https://i.pravatar.cc/400?img=12',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
  },
  {
    id: 'booking-9',
    tab: 'Tour Guide Bookings',
    group: 'Upcoming',
    category: 'Tour Guide',
    title: 'Kasun Fernando',
    reference: 'EVO-TG-20417',
    status: 'Confirmed / Paid',
    dateRange: '18 Nov 2025 - 19 Nov 2025',
    totalAmount: 'LKR 34,000',
    image: 'https://i.pravatar.cc/400?img=33',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Nov 15',
  },
  {
    id: 'booking-6',
    tab: 'Tour Guide Bookings',
    group: 'Past',
    category: 'Tour Guide',
    title: 'Dilini Jayawardena',
    reference: 'EVO-TG-93327',
    status: 'Completed',
    dateRange: '12 Sep 2025 - 12 Sep 2025',
    totalAmount: 'LKR 21,000',
    image: 'https://i.pravatar.cc/400?img=47',
    tagTone: 'green',
    cancellationText: 'Your tour session has ended',
  },
  {
    id: 'booking-10',
    tab: 'Tour Guide Bookings',
    group: 'Cancelled',
    category: 'Tour Guide',
    title: 'Ruwan Silva',
    reference: 'EVO-TG-66302',
    status: 'Cancelled',
    dateRange: '02 Sep 2025 - 02 Sep 2025',
    totalAmount: 'LKR 26,500',
    image: 'https://i.pravatar.cc/400?img=15',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
  },
];
