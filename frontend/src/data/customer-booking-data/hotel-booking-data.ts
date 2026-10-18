import type { BaseBooking } from './booking-data';

export type HotelBooking = BaseBooking & {
  tab: 'Hotel Bookings';
  category: 'Hotel';
};

export const hotelBookings: HotelBooking[] = [
  {
    id: 'booking-1',
    tab: 'Hotel Bookings',
    group: 'Upcoming',
    category: 'Hotel',
    title: 'Cinnamon Grand Luxury Stay - Colombo',
    reference: 'EVO-BK-89421',
    status: 'Confirmed / Paid',
    dateRange: '24 Oct 2025 - 28 Oct 2025',
    totalAmount: 'LKR 145,000',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
  },
  {
    id: 'booking-2',
    tab: 'Hotel Bookings',
    group: 'Upcoming',
    category: 'Hotel',
    title: 'Amangalla Resort - Galle Fort',
    reference: 'EVO-BK-91024',
    status: 'Confirmed / Paid',
    dateRange: '05 Nov 2025 - 08 Nov 2025',
    totalAmount: 'LKR 180,000',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
  },
  {
    id: 'booking-3',
    tab: 'Hotel Bookings',
    group: 'Past',
    category: 'Hotel',
    title: 'The Fortress Hotel - Kandy',
    reference: 'EVO-BK-77214',
    status: 'Completed',
    dateRange: '14 Sep 2025 - 17 Sep 2025',
    totalAmount: 'LKR 96,500',
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80',
    tagTone: 'green',
    cancellationText: 'Your stay was successfully completed',
  },
  {
    id: 'booking-4',
    tab: 'Hotel Bookings',
    group: 'Cancelled',
    category: 'Hotel',
    title: 'Jetwing Blue - Negombo',
    reference: 'EVO-BK-53618',
    status: 'Cancelled',
    dateRange: '18 Aug 2025 - 21 Aug 2025',
    totalAmount: 'LKR 74,000',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
  },
];
