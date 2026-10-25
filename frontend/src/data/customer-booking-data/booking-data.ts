import { hotelBookings, type HotelBooking } from './hotel-booking-data';
import { rentalBookings, type RentalBooking } from './rental-booking-data';
import { tourGuideBookings, type TourGuideBooking } from './tour-guide-booking-data';

export type BookingTab = 'Hotel Bookings' | 'Tour Guide Bookings' | 'Rental Bookings';
export type BookingFilter = 'Upcoming' | 'Past' | 'Cancelled';

export type BaseBooking = {
  id: string;
  title: string;
  reference: string;
  status: string;
  paymentStatus?: string;
  dateRange: string;
  totalAmount: string;
  image: string;
  tagTone?: 'blue' | 'green' | 'red';
  cancellationText?: string;
  group: BookingFilter;
};

export type BookingItem = HotelBooking | TourGuideBooking | RentalBooking;

export const bookingTabs: BookingTab[] = ['Hotel Bookings', 'Tour Guide Bookings', 'Rental Bookings'];

export const bookingFilters: BookingFilter[] = ['Upcoming', 'Past', 'Cancelled'];

export const bookings: BookingItem[] = [...hotelBookings, ...tourGuideBookings, ...rentalBookings];
