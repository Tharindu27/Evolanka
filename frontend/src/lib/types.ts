// ── Listings ────────────────────────────────────────
export type ListingStatus = "published" | "draft" | "archived";

export interface Listing {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  status: ListingStatus;
  ratesFrom: number | null;
  capacity: string;
  rating: number | null;
  reviewCount: number;
  completeness: number;
}

// ── Bookings ────────────────────────────────────────
export type BookingStatus = "confirmed" | "pending" | "cancelled" | "checked-in";
export type BookingTab = "upcoming" | "checked-in" | "completed" | "cancelled";

// ── Rooms ───────────────────────────────────────────
export type RoomStatus = "available" | "booked" | "out-of-order";

// ── Misc ────────────────────────────────────────────
export type Currency = "LKR" | "USD";