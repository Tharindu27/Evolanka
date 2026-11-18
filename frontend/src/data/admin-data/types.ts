export type ProviderType = "Hotel" | "Vehicle Rental" | "Tour Guide" | "Taxi";
export type ProviderStatus = "Pending" | "Active" | "Restricted" | "Banned" | "Rejected";

export interface ProviderDocument {
  label: string;
  reference: string;
}

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  email: string;
  phone: string;
  district: string;
  rating: number | null;
  registeredOn: string;
  status: ProviderStatus;
  documents: ProviderDocument[];
}

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled" | "Refunded";

export interface Booking {
  id: string;
  tourist: string;
  provider: string;
  service: string;
  date: string;
  amount: number;
  status: BookingStatus;
}

export interface Dispute {
  id: string;
  bookingId: string;
  raisedBy: "Tourist" | "Provider";
  reason: string;
  openedOn: string;
}

export type TouristStatus = "Active" | "Restricted" | "Banned";
export type SignupMethod = "Google" | "Apple" | "Email";

export interface TouristReview {
  service: string;
  rating: number;
  comment: string;
}

export interface Tourist {
  id: string;
  name: string;
  email: string;
  country: string;
  signupMethod: SignupMethod;
  joinedOn: string;
  status: TouristStatus;
  bookings: Booking[];
  reviews: TouristReview[];
}

export type ListingStatus = "Pending" | "Active" | "Restricted" | "Banned";
export type ListingType = "Tour Package" | "Villa" | "Vehicle" | "Room";

export interface Listing {
  id: string;
  title: string;
  type: ListingType;
  provider: string;
  location: string;
  price: string;
  submittedOn: string;
  status: ListingStatus;
  featured: boolean;
}

export type LocationRequestStatus = "Pending" | "Approved" | "Rejected";
export type LocationSubmissionType = "Tourist" | "Provider" | "Admin";

export interface LocationRequest {
  id: string;
  name: string;
  province?: string;
  district: string;
  nearestTown?: string;
  categories?: string[];
  description: string;
  highlights?: string[];
  bestTime?: string;
  openingDays?: string;
  localAdultPrice?: string;
  localChildPrice?: string;
  foreignAdultPrice?: string;
  foreignChildPrice?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  nearbyStays?: string[];
  travelTips?: string[];
  photos?: string[];
  submittedBy: string;
  type: LocationSubmissionType;
  submittedOn: string;
  status: LocationRequestStatus;
}

export interface Destination {
  name: string;
  district: string;
  source: "Admin" | "Tourist";
}

export type TransactionStatus = "Paid" | "Pending" | "Failed" | "Refunded";

export interface Transaction {
  id: string;
  bookingId: string;
  method: string;
  gateway: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}

export interface Payout {
  id: string;
  provider: string;
  period: string;
  gross: number;
  method: string;
  status: "Pending" | "Paid";
}

export type ReviewVisibility = "Visible" | "Hidden" | "Flagged";

export interface Review {
  id: string;
  tourist: string;
  provider: string;
  rating: number;
  comment: string;
  date: string;
  visibility: ReviewVisibility;
}

export interface SupportTicket {
  id: string;
  subject: string;
  from: string;
  priority: "High" | "Normal" | "Low";
  message: string;
  receivedOn: string;
}


