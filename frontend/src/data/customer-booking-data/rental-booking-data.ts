import type { BaseBooking } from './booking-data';

export type RentalBookingStatus = 'Confirmed' | 'Active / On-Trip' | 'Completed' | 'Cancelled';
export type RentalPaymentStatus = 'Paid' | 'Partially Paid' | 'Pay on Pickup' | 'Refunded';
export type DepositStatus = 'Paid' | 'Pay on Pickup' | 'Refunded';

export type RentalDriver = {
  name: string;
  photo: string;
  phone: string;
};

// Doorstep: vehicle is brought to the tourist. Location Pickup: tourist collects and returns it at the rental service.
export type RentalPickupDetails =
  | { pickupMode: 'Doorstep Pickup'; pickupLocation: string; dropoffLocation: string }
  | { pickupMode: 'Location Pickup'; serviceLocation: string };

export type RentalBooking = BaseBooking &
  RentalPickupDetails & {
  tab: 'Rental Bookings';
  category: 'Rental';
  bookingStatus: RentalBookingStatus;
  bookedAt: string;
  vehicleName: string;
  plateNumber: string;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  seats: number;
  pickupDateTime: string;
  dropoffDateTime: string;
  duration: string;
  rentalType: 'Self-Drive' | 'With Driver';
  driver?: RentalDriver;
  insurancePlan: string;
  depositAmount: string;
  depositStatus: DepositStatus;
  paymentStatus: RentalPaymentStatus;
  ownerName: string;
  ownerPhone: string;
  supportPhone: string;
  cancellationPolicy: string;
};

export const getRentalBookingById = (id: string) => rentalBookings.find((booking) => booking.id === id);

export const rentalBookings: RentalBooking[] = [
  {
    id: 'booking-7',
    tab: 'Rental Bookings',
    group: 'Upcoming',
    category: 'Rental',
    title: 'Premium SUV Rental - Colombo',
    reference: 'EVO-RT-56681',
    status: 'Confirmed / Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '12 Oct 2025, 2:10 PM',
    dateRange: '22 Oct 2025 - 26 Oct 2025',
    totalAmount: 'LKR 38,000',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Oct 21',
    vehicleName: 'Toyota RAV4',
    plateNumber: 'CAR-7742',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    pickupDateTime: '22 Oct 2025, 9:00 AM',
    dropoffDateTime: '26 Oct 2025, 6:00 PM',
    duration: '4 Days',
    pickupMode: 'Doorstep Pickup',
    pickupLocation: 'Hilton Colombo, Lotus Road, Colombo 01',
    dropoffLocation: 'Bandaranaike International Airport, Katunayake',
    rentalType: 'With Driver',
    driver: {
      name: 'Sunil Rathnayake',
      photo: 'https://i.pravatar.cc/400?img=60',
      phone: '+94 77 998 1122',
    },
    insurancePlan: 'Full Coverage',
    depositAmount: 'LKR 25,000',
    depositStatus: 'Paid',
    paymentStatus: 'Paid',
    ownerName: 'Lanka Premium Rentals',
    ownerPhone: '+94 11 234 5566',
    supportPhone: '+94 11 700 0100',
    cancellationPolicy: 'Free cancellation up to 21 Oct 2025. After that, one day of rental is charged.',
  },
  {
    id: 'booking-11',
    tab: 'Rental Bookings',
    group: 'Upcoming',
    category: 'Rental',
    title: 'Tuk Tuk Rental - Galle',
    reference: 'EVO-RT-78115',
    status: 'Confirmed / Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '30 Sep 2025, 10:30 AM',
    dateRange: '12 Nov 2025 - 14 Nov 2025',
    totalAmount: 'LKR 12,000',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=900&q=80',
    tagTone: 'blue',
    cancellationText: 'Free cancellation until Nov 10',
    vehicleName: 'Bajaj RE Tuk Tuk',
    plateNumber: 'SP-TKT-3318',
    transmission: 'Manual',
    fuelType: 'Petrol',
    seats: 3,
    pickupDateTime: '12 Nov 2025, 8:00 AM',
    dropoffDateTime: '14 Nov 2025, 5:00 PM',
    duration: '2 Days',
    pickupMode: 'Location Pickup',
    serviceLocation: 'Galle Tuk Tuk Hire, Church Street, Galle Fort',
    rentalType: 'Self-Drive',
    insurancePlan: 'Basic Insurance Included',
    depositAmount: 'LKR 5,000',
    depositStatus: 'Pay on Pickup',
    paymentStatus: 'Paid',
    ownerName: 'Galle Tuk Tuk Hire',
    ownerPhone: '+94 91 223 4455',
    supportPhone: '+94 11 700 0100',
    cancellationPolicy: 'Free cancellation up to 10 Nov 2025. After that, 50% of the total amount is charged.',
  },
  {
    id: 'booking-12',
    tab: 'Rental Bookings',
    group: 'Past',
    category: 'Rental',
    title: 'Scooter Rental - Mirissa',
    reference: 'EVO-RT-40923',
    status: 'Completed',
    bookingStatus: 'Completed',
    bookedAt: '25 Aug 2025, 5:45 PM',
    dateRange: '03 Sep 2025 - 06 Sep 2025',
    totalAmount: 'LKR 9,600',
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    tagTone: 'green',
    cancellationText: 'Your vehicle rental was successfully completed',
    vehicleName: 'Honda Dio Scooter',
    plateNumber: 'BEF-3471',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 2,
    pickupDateTime: '03 Sep 2025, 10:00 AM',
    dropoffDateTime: '06 Sep 2025, 10:00 AM',
    duration: '3 Days',
    pickupMode: 'Location Pickup',
    serviceLocation: 'Mirissa Scooter Rentals, Beach Road, Mirissa',
    rentalType: 'Self-Drive',
    insurancePlan: 'Basic Insurance Included',
    depositAmount: 'LKR 10,000',
    depositStatus: 'Refunded',
    paymentStatus: 'Paid',
    ownerName: 'Mirissa Scooter Rentals',
    ownerPhone: '+94 41 225 6789',
    supportPhone: '+94 11 700 0100',
    cancellationPolicy: 'This rental has been completed. No cancellation is available.',
  },
  {
    id: 'booking-8',
    tab: 'Rental Bookings',
    group: 'Cancelled',
    category: 'Rental',
    title: 'Airport Transfer Van - Katunayake',
    reference: 'EVO-RT-21940',
    status: 'Cancelled',
    bookingStatus: 'Cancelled',
    bookedAt: '28 Sep 2025, 8:20 PM',
    dateRange: '05 Oct 2025 - 05 Oct 2025',
    totalAmount: 'LKR 14,500',
    image:
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80',
    tagTone: 'red',
    cancellationText: 'Refund processed to your wallet',
    vehicleName: 'Toyota HiAce Van',
    plateNumber: 'CAT-2208',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 9,
    pickupDateTime: '05 Oct 2025, 6:00 AM',
    dropoffDateTime: '05 Oct 2025, 2:00 PM',
    duration: '1 Day',
    pickupMode: 'Doorstep Pickup',
    pickupLocation: 'Bandaranaike International Airport, Katunayake',
    dropoffLocation: 'Colombo Fort Railway Station, Colombo 01',
    rentalType: 'With Driver',
    driver: {
      name: 'Prasanna Gunasekara',
      photo: 'https://i.pravatar.cc/400?img=52',
      phone: '+94 72 556 7788',
    },
    insurancePlan: 'Full Coverage',
    depositAmount: 'LKR 15,000',
    depositStatus: 'Refunded',
    paymentStatus: 'Refunded',
    ownerName: 'Katunayake Transfers',
    ownerPhone: '+94 11 225 8899',
    supportPhone: '+94 11 700 0100',
    cancellationPolicy: 'Cancelled by you. The full amount and deposit were refunded to your wallet.',
  },
];
