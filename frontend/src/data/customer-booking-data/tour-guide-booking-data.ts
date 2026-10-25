import type { BaseBooking } from './booking-data';

export type TourGuideBookingStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
export type TourGuidePaymentStatus = 'Paid' | 'Pay on Arrival' | 'Refunded';

export type GuideVehicle = {
  type: string;
  model: string;
  plateNumber: string;
  seats: number;
  airConditioned: boolean;
  color: string;
};

export type TourGuideBooking = BaseBooking & {
  tab: 'Tour Guide Bookings';
  category: 'Tour Guide';
  bookingStatus: TourGuideBookingStatus;
  bookedAt: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  experienceYears: number;
  phone: string;
  startTime: string;
  duration: string;
  meetingPoint: string;
  destinations: string[];
  adults: number;
  children: number;
  specialRequirements?: string;
  rateType: 'Per Day' | 'Per Group';
  rateDetail: string;
  paymentStatus: TourGuidePaymentStatus;
  vehicle?: GuideVehicle;
  cancellationPolicy: string;
};

export const getTourGuideBookingById = (id: string) => tourGuideBookings.find((booking) => booking.id === id);

export const tourGuideBookings: TourGuideBooking[] = [
  {
    id: 'booking-5',
    tab: 'Tour Guide Bookings',
    group: 'Upcoming',
    category: 'Tour Guide',
    title: 'Nuwan Perera',
    reference: 'EVO-TG-11890',
    status: 'Confirmed / Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '14 Oct 2025, 4:20 PM',
    dateRange: '10 Nov 2025 - 11 Nov 2025',
    totalAmount: 'LKR 28,500',
    image: 'https://i.pravatar.cc/400?img=12',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
    languages: ['English', 'German', 'Sinhala'],
    rating: 4.8,
    reviewCount: 126,
    experienceYears: 9,
    phone: '+94 77 123 4567',
    startTime: '8:30 AM',
    duration: '2 Days',
    meetingPoint: 'Hotel Lobby, Colombo Fort',
    destinations: ['Sigiriya Rock Fortress', 'Dambulla Cave Temple', 'Minneriya National Park'],
    adults: 4,
    children: 0,
    specialRequirements: 'Vegetarian food preferences',
    rateType: 'Per Day',
    rateDetail: 'LKR 14,250 per day x 2 days',
    paymentStatus: 'Paid',
    vehicle: {
      type: 'Van',
      model: 'Toyota KDH',
      plateNumber: 'CAB-4521',
      seats: 9,
      airConditioned: true,
      color: 'White',
    },
    cancellationPolicy: 'Free cancellation up to 21 Oct 2025. After that, 50% of the total amount is charged.',
  },
  {
    id: 'booking-9',
    tab: 'Tour Guide Bookings',
    group: 'Upcoming',
    category: 'Tour Guide',
    title: 'Kasun Fernando',
    reference: 'EVO-TG-20417',
    status: 'Confirmed / Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '02 Oct 2025, 11:05 AM',
    dateRange: '18 Nov 2025 - 19 Nov 2025',
    totalAmount: 'LKR 34,000',
    image: 'https://i.pravatar.cc/400?img=33',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Nov 15',
    languages: ['English', 'French', 'Sinhala'],
    rating: 4.9,
    reviewCount: 203,
    experienceYears: 12,
    phone: '+94 71 456 7890',
    startTime: '7:00 AM',
    duration: '2 Days',
    meetingPoint: 'Kandy Railway Station',
    destinations: ['Temple of the Tooth', 'Peradeniya Botanical Gardens', 'Nuwara Eliya'],
    adults: 2,
    children: 1,
    specialRequirements: 'Child seat required, wheelchair accessible stops preferred',
    rateType: 'Per Group',
    rateDetail: 'LKR 34,000 flat rate for the group',
    paymentStatus: 'Paid',
    cancellationPolicy: 'Free cancellation up to 15 Nov 2025. After that, 50% of the total amount is charged.',
  },
  {
    id: 'booking-6',
    tab: 'Tour Guide Bookings',
    group: 'Past',
    category: 'Tour Guide',
    title: 'Dilini Jayawardena',
    reference: 'EVO-TG-93327',
    status: 'Completed',
    bookingStatus: 'Completed',
    bookedAt: '28 Aug 2025, 9:40 AM',
    dateRange: '12 Sep 2025 - 12 Sep 2025',
    totalAmount: 'LKR 21,000',
    image: 'https://i.pravatar.cc/400?img=47',
    tagTone: 'green',
    cancellationText: 'Your tour session has ended',
    languages: ['English', 'Japanese', 'Sinhala'],
    rating: 4.7,
    reviewCount: 88,
    experienceYears: 6,
    phone: '+94 76 234 5678',
    startTime: '9:00 AM',
    duration: 'Full Day (8 hours)',
    meetingPoint: 'Galle Face Hotel, Colombo',
    destinations: ['Galle Fort', 'Unawatuna Beach', 'Kosgoda Turtle Hatchery'],
    adults: 2,
    children: 0,
    rateType: 'Per Day',
    rateDetail: 'LKR 21,000 per day x 1 day',
    paymentStatus: 'Paid',
    vehicle: {
      type: 'Car',
      model: 'Toyota Premio',
      plateNumber: 'CBG-8830',
      seats: 4,
      airConditioned: true,
      color: 'Silver',
    },
    cancellationPolicy: 'This tour has been completed. No cancellation is available.',
  },
  {
    id: 'booking-10',
    tab: 'Tour Guide Bookings',
    group: 'Cancelled',
    category: 'Tour Guide',
    title: 'Ruwan Silva',
    reference: 'EVO-TG-66302',
    status: 'Cancelled',
    bookingStatus: 'Cancelled',
    bookedAt: '20 Aug 2025, 6:15 PM',
    dateRange: '02 Sep 2025 - 02 Sep 2025',
    totalAmount: 'LKR 26,500',
    image: 'https://i.pravatar.cc/400?img=15',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
    languages: ['English', 'Tamil', 'Sinhala'],
    rating: 4.6,
    reviewCount: 64,
    experienceYears: 5,
    phone: '+94 75 345 6789',
    startTime: '6:30 AM',
    duration: 'Full Day (10 hours)',
    meetingPoint: 'Jaffna Bus Stand',
    destinations: ['Nallur Kandaswamy Temple', 'Jaffna Fort', 'Casuarina Beach'],
    adults: 3,
    children: 0,
    rateType: 'Per Group',
    rateDetail: 'LKR 26,500 flat rate for the group',
    paymentStatus: 'Refunded',
    vehicle: {
      type: 'Van',
      model: 'Nissan Caravan',
      plateNumber: 'NP-KA-2290',
      seats: 12,
      airConditioned: false,
      color: 'Blue',
    },
    cancellationPolicy: 'Cancelled by you. The full amount was refunded to your wallet.',
  },
];
