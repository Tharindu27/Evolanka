import type { BaseBooking } from './booking-data';

export type HotelBookingStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
export type HotelPaymentStatus = 'Paid' | 'Pay at Hotel' | 'Partially Paid' | 'Refunded';

export type HotelBooking = BaseBooking & {
  tab: 'Hotel Bookings';
  category: 'Hotel';
  bookingStatus: HotelBookingStatus;
  bookedAt: string;
  address: string;
  phone: string;
  email: string;
  frontDeskHotline: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: { type: string; count: number }[];
  adults: number;
  children: number;
  paymentStatus: HotelPaymentStatus;
  paymentMethod: string;
  cancellationPolicy: string;
};

export const getHotelBookingById = (id: string) => hotelBookings.find((booking) => booking.id === id);

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
    bookingStatus: 'Confirmed',
    bookedAt: '10 Oct 2025, 3:42 PM',
    address: '77 Galle Road, Colombo 03, Sri Lanka',
    phone: '+94 11 555 0101',
    email: 'reservations@cinnamongrand.example.com',
    frontDeskHotline: '+94 11 555 0100',
    checkIn: 'Oct 24, 2025 - 2:00 PM',
    checkOut: 'Oct 28, 2025 - 12:00 PM',
    nights: 4,
    rooms: [{ type: 'Deluxe Ocean View Suite', count: 1 }],
    adults: 2,
    children: 0,
    paymentStatus: 'Paid',
    paymentMethod: 'Visa Card **** 4321',
    cancellationPolicy: 'Free cancellation until Oct 21, 2025',
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
    bookingStatus: 'Confirmed',
    bookedAt: '12 Oct 2025, 9:15 AM',
    address: '10 Church Street, Galle Fort, Galle 80000, Sri Lanka',
    phone: '+94 91 555 0202',
    email: 'stay@amangalla.example.com',
    frontDeskHotline: '+94 91 555 0200',
    checkIn: 'Nov 05, 2025 - 2:00 PM',
    checkOut: 'Nov 08, 2025 - 12:00 PM',
    nights: 3,
    rooms: [
      { type: 'Heritage Garden Chamber', count: 1 },
      { type: 'Heritage Twin Room', count: 1 },
    ],
    adults: 2,
    children: 1,
    paymentStatus: 'Paid',
    paymentMethod: 'Mastercard **** 8812',
    cancellationPolicy: 'Free cancellation until Oct 21, 2025',
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
    bookingStatus: 'Completed',
    bookedAt: '28 Aug 2025, 6:20 PM',
    address: 'Raja Veediya, Kandy 20000, Sri Lanka',
    phone: '+94 81 555 0303',
    email: 'bookings@fortresskandy.example.com',
    frontDeskHotline: '+94 81 555 0300',
    checkIn: 'Sep 14, 2025 - 2:00 PM',
    checkOut: 'Sep 17, 2025 - 12:00 PM',
    nights: 3,
    rooms: [{ type: 'Signature King Room', count: 1 }],
    adults: 2,
    children: 0,
    paymentStatus: 'Paid',
    paymentMethod: 'Visa Card **** 4321',
    cancellationPolicy: 'Non-refundable',
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
    bookingStatus: 'Cancelled',
    bookedAt: '02 Aug 2025, 11:05 AM',
    address: '70 Ethukala, Negombo 11500, Sri Lanka',
    phone: '+94 31 555 0404',
    email: 'reservations@jetwingblue.example.com',
    frontDeskHotline: '+94 31 555 0400',
    checkIn: 'Aug 18, 2025 - 2:00 PM',
    checkOut: 'Aug 21, 2025 - 12:00 PM',
    nights: 3,
    rooms: [{ type: 'Garden Deluxe Room', count: 1 }],
    adults: 2,
    children: 1,
    paymentStatus: 'Refunded',
    paymentMethod: 'Visa Card **** 4321',
    cancellationPolicy: 'Free cancellation until Aug 15, 2025',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
  },
];
