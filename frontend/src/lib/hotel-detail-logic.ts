/**
 * Hotel Detail & Booking Logic Layer
 *
 * Provides HotelDetail data model, mock hotel data matching Stitch screen designs,
 * booking form state, robust validations, price calculations, and booking confirmation logic.
 */

import type { MealKey } from "./hotel-rooms-logic";

// ── Interfaces ─────────────────────────────────────────────────────────────

export interface RoomOption {
  id: string;
  roomType: string;
  name: string;
  bedSummary: string; // e.g. "1× King bed"
  size: string; // sqm e.g. "45" or "80"
  maxGuests: number;
  popular?: boolean;
  /** Lowest price (Room Only, 1 adult) in LKR */
  basePriceLKR: number;
  /** Per-adult prices for each meal plan */
  mealPrices: Record<MealKey, number>;
  amenities: string[];
  image: string;
}

export interface SignatureFacility {
  title: string;
  icon: string;
  description: string;
}

export interface AmenityCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface PolicyCard {
  title: string;
  icon: string;
  lines: string[];
}

export interface LocationHighlight {
  icon: string;
  title: string;
  subtitle: string;
}

export interface HotelDetail {
  id: string;
  name: string;
  type: string;
  badge?: string;
  location: string;
  district: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  checkIn: string; // e.g. "14:00"
  checkOut: string; // e.g. "12:00"
  images: string[]; // index 0 = hero
  amenities: string[]; // quick-display tags
  rooms: RoomOption[];
  refundPolicy: string;
  phone?: string;
  email?: string;
  // Heritage / Stitch specific details:
  establishedYear?: string;
  siteCategory?: string;
  storyHeading?: string;
  storyParagraphs?: string[];
  storyImage?: string;
  signatureFacilities?: SignatureFacility[];
  categorizedAmenities?: AmenityCategory[];
  policies?: PolicyCard[];
  locationHighlights?: LocationHighlight[];
  mapImage?: string;
}

export interface BookingFormState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomId: string;
  mealPlan: MealKey | "";
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
}

export interface BookingError {
  field: string;
  message: string;
}

export interface BookingPriceBreakdown {
  nightlyRate: number;
  nights: number;
  baseTotal: number;
  serviceCharge: number; // 10%
  tax: number; // 2.5%
  total: number;
}

export interface ConfirmedBooking {
  bookingId: string;
  hotel: HotelDetail;
  room: RoomOption;
  form: BookingFormState;
  breakdown: BookingPriceBreakdown;
  bookedAt: string;
}

// ── Default booking form ────────────────────────────────────────────────────

export function createDefaultBooking(): BookingFormState {
  return {
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    roomId: "",
    mealPlan: "bedBreakfast",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  };
}

// ── Date & Booking Validation ──────────────────────────────────────────────

export function validateBookingDatesAndRoom(
  form: BookingFormState,
  rooms: RoomOption[]
): BookingError[] {
  const errors: BookingError[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!form.checkIn) {
    errors.push({ field: "checkIn", message: "Select a check-in date" });
  } else {
    const ci = new Date(form.checkIn);
    if (ci < today) {
      errors.push({ field: "checkIn", message: "Check-in cannot be in the past" });
    }
  }

  if (!form.checkOut) {
    errors.push({ field: "checkOut", message: "Select a check-out date" });
  } else if (form.checkIn) {
    const ci = new Date(form.checkIn);
    const co = new Date(form.checkOut);
    if (co <= ci) {
      errors.push({ field: "checkOut", message: "Check-out must be after check-in" });
    }
  }

  if (form.adults < 1) {
    errors.push({ field: "adults", message: "At least 1 adult is required" });
  }

  if (!form.roomId) {
    errors.push({ field: "roomId", message: "Please select an accommodation type" });
  } else {
    const room = rooms.find((r) => r.id === form.roomId);
    if (room && form.adults + form.children > room.maxGuests) {
      errors.push({
        field: "roomId",
        message: `Maximum ${room.maxGuests} guests allowed for ${room.name}`,
      });
    }
  }

  if (!form.mealPlan) {
    errors.push({ field: "mealPlan", message: "Please choose a meal plan" });
  }

  return errors;
}

export function validateBookingGuestInfo(form: BookingFormState): BookingError[] {
  const errors: BookingError[] = [];

  if (!form.guestName.trim() || form.guestName.trim().length < 2) {
    errors.push({ field: "guestName", message: "Please enter your full name" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.guestEmail.trim()) {
    errors.push({ field: "guestEmail", message: "Please enter your email address" });
  } else if (!emailRegex.test(form.guestEmail.trim())) {
    errors.push({ field: "guestEmail", message: "Please enter a valid email address" });
  }

  const phoneClean = form.guestPhone.replace(/[\s-]/g, "");
  if (!phoneClean) {
    errors.push({ field: "guestPhone", message: "Please enter a contact number" });
  } else if (phoneClean.length < 8) {
    errors.push({ field: "guestPhone", message: "Please enter a valid phone number" });
  }

  return errors;
}

export function validateBooking(
  form: BookingFormState,
  rooms: RoomOption[]
): BookingError[] {
  return [
    ...validateBookingDatesAndRoom(form, rooms),
    ...validateBookingGuestInfo(form),
  ];
}

// ── Price Calculation ────────────────────────────────────────────────────────

export function calcNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

export function calcBookingBreakdown(
  room: RoomOption,
  mealPlan: MealKey | "",
  nights: number,
  adults: number
): BookingPriceBreakdown {
  if (!mealPlan || nights <= 0) {
    return {
      nightlyRate: room.basePriceLKR,
      nights: Math.max(1, nights),
      baseTotal: 0,
      serviceCharge: 0,
      tax: 0,
      total: 0,
    };
  }

  const nightlyRate = room.mealPrices[mealPlan] ?? room.basePriceLKR;
  // Scaled for guest count beyond single occupancy
  const adultMultiplier = adults <= 1 ? 1 : adults === 2 ? 1.0 : 1 + (adults - 2) * 0.35;
  const adjustedNightly = Math.round(nightlyRate * adultMultiplier);
  const baseTotal = adjustedNightly * nights;
  const serviceCharge = Math.round(baseTotal * 0.1); // 10% Service Charge standard
  const tax = Math.round(baseTotal * 0.025); // 2.5% Tourism Development Levy
  const total = baseTotal + serviceCharge + tax;

  return {
    nightlyRate: adjustedNightly,
    nights,
    baseTotal,
    serviceCharge,
    tax,
    total,
  };
}

export function calcBookingTotal(
  room: RoomOption,
  mealPlan: MealKey | "",
  nights: number,
  adults: number
): number {
  return calcBookingBreakdown(room, mealPlan, nights, adults).total;
}

export function formatLKR(amount: number): string {
  return `LKR ${amount.toLocaleString("en-LK")}`;
}

export function generateBookingReference(): string {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `EVO-HTL-${num}`;
}

// ── Meal Plan Labels ─────────────────────────────────────────────────────────

export const mealPlanLabels: Record<MealKey, string> = {
  roomOnly: "Room Only",
  bedBreakfast: "Bed & Breakfast",
  halfBoard: "Half Board",
  breakfastLunch: "Breakfast & Lunch",
  fullBoard: "Full Board",
};

// ── Mock Hotel Detail Data (Matching Stitch Designs) ──────────────────────────

export const mockHotelDetails: Record<string, HotelDetail> = {
  h1: {
    id: "h1",
    name: "Amangalla Galle Fort",
    type: "Luxury Resort",
    badge: "PREMIUM",
    location: "Galle Fort, Galle",
    district: "Galle",
    rating: 4.9,
    reviewCount: 120,
    description:
      "Occupying an ensemble of buildings that date back to 1684, Amangalla is a living record of the Dutch colonial era and the historic port of Galle. Once the New Oriental Hotel, it has welcomed travelers for over a century, preserving its stately atmosphere and gracious service.",
    highlights: [
      "UNESCO World Heritage location within 17th-century ramparts",
      "Signature Aman spa with Ayurvedic hydrotherapy baths",
      "Private butler service & curated colonial walking tours",
      "The Verandah fine dining overlooking Galle street life",
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    establishedYear: "1684",
    siteCategory: "UNESCO Site Location",
    storyHeading: "Heritage & Elegance",
    storyParagraphs: [
      "Occupying an ensemble of buildings that date back to 1684, Amangalla is a living record of the Dutch colonial era and the historic port of Galle. Once the New Oriental Hotel, it has welcomed travelers for over a century, preserving its stately atmosphere and gracious service.",
      "Step onto the polished jackwood floors and experience a serene atmosphere where high ceilings, antique furniture, and the gentle hum of ceiling fans transport you to a bygone era, perfectly balanced with Aman's signature minimalist sophistication.",
    ],
    storyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyp_fYyIFClfIEvAUhIKYqMJIMVQTDGUMSWMyMnjPD7HFbxOC3DDXMXdzq90LzL7mr1eD-FY0XixT_NWM1r1nJlF_aeAIAtJuGhADH1EcH-hvN_wmn4XaJOQKovsHVKCkjo-7AY1f79Qr9Ykl2Hcb8tWnHAnUe9bV5y8zq4j6lTpuotQr9KiJQaCyBsgwXtV5_gK4GFrr6pKLYYAmwjAxX_g93K-DRBb6GKNwgstfdJXmbmw0W7JAShQ",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHuyN6yUKl5BdQnLrOoMjOhaqk3bI_UdPgsV3Sq1issJd5hrobtuMuseVzadUZc3rBxX0L1VusnKK1p08D7yX1NKBoEW1yAkA6I6aJYDIUkdzgxXxJjJbOWV4BzrUxTGvaN6vI7c_T-KiPj8uHZkp-atej8KW3qdHgnLit4-UQ2XuNQ3znBLrSuOZWfLvMZxmzRIxk1W8IyDE-fNqd62M7eUkxYnGkdY0fhYfDEFi-oqHTFxLMUK2_iA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4eA9D_Y8b7fNp1bD7pisUBngPllyYuuczpB6Pw1g1z3bjWlKgw5yV-Izw-jVNjl-qluta3P6lFyd-u74ylt8oxfR7JTqUV2yVPhIfy2ureeClNQcHZMW8xdd5kiutcm_mSlqHGQ-YSbH6rAkGa_8CkUcZIH97b0eJMeeQvhYHZle-mnSSHAtROLlJUB_IEzNxHvocJcSwT082yLQYMgnAXTXo677Ms2iAbmg0ko_sKG_IbPWs3Xh_LQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAreB6tUcEvtz9QVvegvGgwtnMIcPs65WOlL8oO0DRmIsYBXP4MgwUbT_Kxaa74a5Xfsbb5mMPgcph9TjhP0K8V7eQQ078lBQOofXdptFKknia-ccBuiIMM1McCTqOUqYpsLVytm4DWorjQSJDx9I0n-1GDF2OzsbSF3MisTKKEbG2_or58cPnG-0LjFbs9NyZXASIs9J213fHEtoXSWNVtQNV7n10nUNsX14FOzogDyV3rv3IhKVTm9g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGB5kyiQZ4onU86DwnTBwJ0x-E3SQlefijJmzf2GHGQJOkkYigKG8yPm6RVfQ7STaZNW--z72l8Vs9Ez6JTcRonYkJCTj4uWsz7qeQ9d6ZqMpr5XAFfjTLciYdH6pwNu16M7zxxBz6mCZ3qVNiKQypA6tHo1q_QQdVXXh2FN9bcM3cAmISVN36UUNTrgaPpj9DhnYUIVJSMFXFIRVavmaek9xXrOD5KorIHtlbtBQNYUVRNisjjTiEZw",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Spa & Wellness Center",
      "Free Wi-Fi",
      "Air Conditioning",
      "Restaurant",
      "Bar / Lounge",
      "24-Hour Front Desk",
      "Breakfast Included",
    ],
    signatureFacilities: [
      {
        title: "The Baths",
        icon: "spa",
        description: "Traditional hydrotherapy & ayurvedic rituals.",
      },
      {
        title: "The Library",
        icon: "menu_book",
        description: "A collection of history, art & local maps.",
      },
      {
        title: "The Verandah",
        icon: "restaurant",
        description: "Fine dining overlooking the street life of Galle.",
      },
      {
        title: "The Pool",
        icon: "pool",
        description: "A 21-meter pool set in lush walled gardens.",
      },
      {
        title: "High Tea",
        icon: "emoji_food_beverage",
        description: "Traditional afternoon service in the Zaal.",
      },
    ],
    categorizedAmenities: [
      {
        category: "General",
        icon: "info",
        items: ["Free Wi-Fi", "24-hour Front Desk", "Concierge", "Laundry Service"],
      },
      {
        category: "Wellness",
        icon: "spa",
        items: ["Spa & Ayurveda", "Yoga Pavilion", "Outdoor Pool", "Steam Room"],
      },
      {
        category: "Dining",
        icon: "restaurant",
        items: ["The Verandah (Fine Dining)", "The Zaal (High Tea)", "Poolside Service"],
      },
    ],
    policies: [
      {
        title: "Check-in / Out",
        icon: "event_available",
        lines: ["Check-in from 2:00 PM", "Check-out by 12:00 PM"],
      },
      {
        title: "Cancellation",
        icon: "cancel",
        lines: ["Free cancellation up to 48 hours before arrival."],
      },
      {
        title: "Children & Pets",
        icon: "family_restroom",
        lines: ["Children of all ages welcome", "Pets are not allowed"],
      },
      {
        title: "Payment",
        icon: "payments",
        lines: ["Major credit cards accepted.", "LKR & USD supported."],
      },
    ],
    locationHighlights: [
      {
        icon: "directions_walk",
        title: "5 min to the Lighthouse",
        subtitle: "Iconic views of the coastline.",
      },
      {
        icon: "directions_walk",
        title: "3 min to the Ramparts",
        subtitle: "The perfect spot for sunset watching.",
      },
      {
        icon: "location_city",
        title: "Galle Fort UNESCO Center",
        subtitle: "Located right inside Church Street.",
      },
    ],
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDHL9VJ_zTH1rMp9icDL_iIoFrkCjCdn_CwPYUh_sf8QFrDoHU3vz-coaqin82xUTwdSdn7IFA6bMQxZtDvFT218c7jv-szWqyazPA5eiUiQOJjYsfbkSx3GXrjCFVskCLRjzp1H-Fof40gU6lUkyifMp1rSEoDI0SS_r6JDbtLdfBvjPik5UCJ6E4ewIn48IAUYqn2n7UA-BErmTX9mY3XYQ0NM5R9B_ZJFVLXhn0GuzUry_jvt3L2dQ",
    rooms: [
      {
        id: "r1-bedroom",
        roomType: "Deluxe Room",
        name: "Bedroom",
        bedSummary: "1× King bed",
        size: "45",
        maxGuests: 2,
        basePriceLKR: 145000,
        mealPrices: {
          roomOnly: 145000,
          bedBreakfast: 158000,
          halfBoard: 172000,
          breakfastLunch: 168000,
          fullBoard: 185000,
        },
        amenities: ["King bed", "Garden Views", "Teak Flooring", "Jackwood Desks"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA4eA9D_Y8b7fNp1bD7pisUBngPllyYuuczpB6Pw1g1z3bjWlKgw5yV-Izw-jVNjl-qluta3P6lFyd-u74ylt8oxfR7JTqUV2yVPhIfy2ureeClNQcHZMW8xdd5kiutcm_mSlqHGQ-YSbH6rAkGa_8CkUcZIH97b0eJMeeQvhYHZle-mnSSHAtROLlJUB_IEzNxHvocJcSwT082yLQYMgnAXTXo677Ms2iAbmg0ko_sKG_IbPWs3Xh_LQ",
      },
      {
        id: "r1-chamber",
        roomType: "Superior Room",
        name: "Chamber",
        bedSummary: "1× King bed",
        size: "80",
        maxGuests: 3,
        popular: true,
        basePriceLKR: 195000,
        mealPrices: {
          roomOnly: 195000,
          bedBreakfast: 215000,
          halfBoard: 235000,
          breakfastLunch: 228000,
          fullBoard: 252000,
        },
        amenities: ["80 sqm space", "Separate Living Area", "High-beamed Ceilings", "Antique Armchairs"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAreB6tUcEvtz9QVvegvGgwtnMIcPs65WOlL8oO0DRmIsYBXP4MgwUbT_Kxaa74a5Xfsbb5mMPgcph9TjhP0K8V7eQQ078lBQOofXdptFKknia-ccBuiIMM1McCTqOUqYpsLVytm4DWorjQSJDx9I0n-1GDF2OzsbSF3MisTKKEbG2_or58cPnG-0LjFbs9NyZXASIs9J213fHEtoXSWNVtQNV7n10nUNsX14FOzogDyV3rv3IhKVTm9g",
      },
      {
        id: "r1-suite",
        roomType: "Suite",
        name: "Suite",
        bedSummary: "1× King bed + 1× Daybed",
        size: "120",
        maxGuests: 4,
        basePriceLKR: 280000,
        mealPrices: {
          roomOnly: 280000,
          bedBreakfast: 305000,
          halfBoard: 330000,
          breakfastLunch: 320000,
          fullBoard: 355000,
        },
        amenities: ["Fort & Ocean Views", "120 sqm Space", "Separate Dining", "Butler Service"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCGB5kyiQZ4onU86DwnTBwJ0x-E3SQlefijJmzf2GHGQJOkkYigKG8yPm6RVfQ7STaZNW--z72l8Vs9Ez6JTcRonYkJCTj4uWsz7qeQ9d6ZqMpr5XAFfjTLciYdH6pwNu16M7zxxBz6mCZ3qVNiKQypA6tHo1q_QQdVXXh2FN9bcM3cAmISVN36UUNTrgaPpj9DhnYUIVJSMFXFIRVavmaek9xXrOD5KorIHtlbtBQNYUVRNisjjTiEZw",
      },
    ],
    refundPolicy: "Free cancellation up to 48 hours before check-in.",
    phone: "+94 91 223 3388",
    email: "galle@aman.com",
  },

  h2: {
    id: "h2",
    name: "98 Acres Resort & Spa",
    type: "Luxury Resort",
    badge: "SCENIC VIEW",
    location: "Ella, Badulla District",
    district: "Badulla",
    rating: 4.8,
    reviewCount: 350,
    description:
      "Perched majestically across 98 rolling tea-covered acres in Ella, this resort delivers breathtaking panoramic views of the hill country, Ella Rock, and Little Adam's Peak. Infinity pools blend into the horizon while colonial-inspired villas offer intimate luxury amid lush greenery.",
    highlights: [
      "98-acre private tea estate with panoramic Ella vistas",
      "Multi-tiered infinity pool overlooking Little Adam's Peak",
      "Private tea tasting sessions & estate walking trails",
      "Bar 98 fine cocktail lounge carved from railway timber",
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    establishedYear: "2012",
    siteCategory: "Highlands Eco Sanctuary",
    storyHeading: "Tea Country Splendour",
    storyParagraphs: [
      "Built with reclaimed wooden railway sleepers and indigenous stones, 98 Acres honors the colonial hill country heritage while minimizing ecological impact.",
      "Villas sit nestled into the mountainside surrounded by rolling tea plantations, cool misty air, and dramatic dawn sunrises over Ravana Falls valley.",
    ],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Spa & Wellness Center",
      "Free Wi-Fi",
      "Restaurant",
      "Terrace",
      "Garden",
      "Room Service",
      "Hot Water",
    ],
    signatureFacilities: [
      {
        title: "Spa 98",
        icon: "spa",
        description: "Ayurvedic body treatments using fresh hill country tea herbs.",
      },
      {
        title: "Infinity Pool",
        icon: "pool",
        description: "Heated infinity pool facing Ella Rock.",
      },
      {
        title: "Restaurant 98",
        icon: "restaurant",
        description: "Contemporary Sri Lankan fusion cuisine with panoramic deck.",
      },
      {
        title: "Bar 98",
        icon: "local_bar",
        description: "Craft cocktails crafted with local spices and aged arrack.",
      },
      {
        title: "Tea Factory Tour",
        icon: "emoji_food_beverage",
        description: "Private guided tasting and plucking experiences.",
      },
    ],
    categorizedAmenities: [
      {
        category: "General",
        icon: "info",
        items: ["Free Wi-Fi", "24-Hour Front Desk", "Tour Desk", "Buggy Transport"],
      },
      {
        category: "Wellness",
        icon: "spa",
        items: ["Spa 98", "Yoga Deck", "Scenic Mountain Jogging Track"],
      },
      {
        category: "Dining",
        icon: "restaurant",
        items: ["Restaurant 98", "Bar 98", "In-Villa Private BBQ"],
      },
    ],
    policies: [
      {
        title: "Check-in / Out",
        icon: "event_available",
        lines: ["Check-in from 2:00 PM", "Check-out by 12:00 PM"],
      },
      {
        title: "Cancellation",
        icon: "cancel",
        lines: ["Free cancellation up to 72 hours before arrival."],
      },
      {
        title: "Children & Pets",
        icon: "family_restroom",
        lines: ["Children of all ages welcome", "Pets are not allowed"],
      },
      {
        title: "Payment",
        icon: "payments",
        lines: ["Major credit cards & cash in LKR/USD accepted."],
      },
    ],
    locationHighlights: [
      {
        icon: "directions_walk",
        title: "10 min to Little Adam's Peak",
        subtitle: "Direct private trail from resort grounds.",
      },
      {
        icon: "directions_car",
        title: "15 min to Nine Arch Bridge",
        subtitle: "Iconic colonial train viaduct.",
      },
    ],
    rooms: [
      {
        id: "r2-villa",
        roomType: "Superior Room",
        name: "Standard Deluxe Villa",
        bedSummary: "1× Queen bed",
        size: "42",
        maxGuests: 2,
        basePriceLKR: 65000,
        mealPrices: {
          roomOnly: 65000,
          bedBreakfast: 74000,
          halfBoard: 84000,
          breakfastLunch: 80000,
          fullBoard: 94000,
        },
        amenities: ["Valley View", "Private Balcony", "Tea Kettle", "Free Wi-Fi"],
        image:
          "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "r2-premium",
        roomType: "Deluxe Room",
        name: "Premium Mountain Chalet",
        bedSummary: "1× King bed",
        size: "58",
        maxGuests: 3,
        popular: true,
        basePriceLKR: 88000,
        mealPrices: {
          roomOnly: 88000,
          bedBreakfast: 98000,
          halfBoard: 112000,
          breakfastLunch: 106000,
          fullBoard: 124000,
        },
        amenities: ["Ella Rock View", "Sun Deck", "Stone Bathtub", "Minibar"],
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "Free cancellation up to 72 hours before check-in.",
    phone: "+94 57 222 8888",
    email: "info@98acresresort.com",
  },

  h3: {
    id: "h3",
    name: "Santani Wellness Resort",
    type: "Wellness Resort",
    badge: "WELLNESS",
    location: "Werapitiya, Kandy",
    district: "Kandy",
    rating: 4.9,
    reviewCount: 95,
    description:
      "A sanctuary devoted to holistic wellness nestled in the misty hills above Kandy. Santani offers immersive Ayurvedic programmes, meditation retreats, and mindful dining across 15 acres of unspoiled rainforest.",
    highlights: [
      "Award-winning Ayurvedic spa and holistic retreat programmes",
      "Rainforest chalets with floor-to-ceiling valley panoramas",
      "Daily yoga, meditation & guided forest walks",
      "Nutritionist-designed plant-forward cuisine",
    ],
    checkIn: "15:00",
    checkOut: "11:00",
    establishedYear: "2016",
    siteCategory: "Holistic Sanctuary",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Spa & Wellness Center",
      "Sauna",
      "Steam Room",
      "Free Wi-Fi",
      "Restaurant",
      "Garden",
      "Hot Water",
      "Yoga Studio",
    ],
    rooms: [
      {
        id: "r3-jungle",
        roomType: "Villa/Bungalow",
        name: "Mountain View Chalet",
        bedSummary: "1× King bed",
        size: "55",
        maxGuests: 2,
        basePriceLKR: 82000,
        mealPrices: {
          roomOnly: 82000,
          bedBreakfast: 92000,
          halfBoard: 108000,
          breakfastLunch: 102000,
          fullBoard: 120000,
        },
        amenities: ["Infinity Dip Pool", "Outdoor Shower", "Valley Views", "Yoga Mat"],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "Non-refundable for wellness retreats. 50% refund if cancelled 7+ days before.",
    phone: "+94 81 208 0480",
    email: "reservations@santani.lk",
  },

  h4: {
    id: "h4",
    name: "Chena Huts by Uga Escapes",
    type: "Safari Lodge",
    badge: "WILDLIFE",
    location: "Yala National Park, Yala",
    district: "Hambantota",
    rating: 5.0,
    reviewCount: 50,
    description:
      "Chena Huts redefines luxury in the wild — 30 open-plan huts situated at the edge of Yala National Park. Wake to elephant herds at your doorstep and leopard sightings over sundowner cocktails.",
    highlights: [
      "30 open-plan eco-huts bordering Yala National Park",
      "Twice-daily guided safari jeep tours included",
      "Infinity pool with views over the Yala scrubland",
      "Naturalist-curated wildlife experiences & stargazing",
    ],
    checkIn: "14:00",
    checkOut: "11:00",
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Private Bathroom",
      "Bathtub",
      "Air Conditioning",
      "Free Wi-Fi",
      "Bar / Lounge",
      "24-Hour Security",
      "Safari Included",
    ],
    rooms: [
      {
        id: "r4-hut",
        roomType: "Villa/Bungalow",
        name: "Luxury Safari Pavilion",
        bedSummary: "1× King bed",
        size: "48",
        maxGuests: 2,
        basePriceLKR: 120000,
        mealPrices: {
          roomOnly: 120000,
          bedBreakfast: 138000,
          halfBoard: 158000,
          breakfastLunch: 150000,
          fullBoard: 175000,
        },
        amenities: ["Private Plunge Pool", "Scrubland Views", "Mini Bar", "Binoculars"],
        image:
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "Free cancellation up to 7 days before check-in. 50% charge within 7 days.",
    phone: "+94 11 271 5555",
    email: "reservations@ugaescapes.com",
  },

  h5: {
    id: "h5",
    name: "The Fortress Resort & Spa",
    type: "Beachfront Resort",
    badge: "BEACHFRONT",
    location: "Koggala, Southern Province",
    district: "Galle",
    rating: 4.7,
    reviewCount: 210,
    description:
      "An architectural masterpiece rising from the shores of Koggala beach, The Fortress Resort & Spa merges bold Sri Lankan design with the rhythms of the Indian Ocean.",
    highlights: [
      "Private beachfront access on Koggala's pristine coastline",
      "Multi-tiered infinity pool merging with the Indian Ocean",
      "Mandara Spa with signature couple's retreat packages",
      "Award-winning seafood restaurant & oceanside bar",
    ],
    checkIn: "14:00",
    checkOut: "12:00",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Kids Pool",
      "Fitness Center",
      "Restaurant",
      "Free Wi-Fi",
      "Air Conditioning",
      "Housekeeping",
      "Beach Access",
    ],
    rooms: [
      {
        id: "r5-ocean",
        roomType: "Deluxe Room",
        name: "Ocean Terrace Room",
        bedSummary: "1× King bed",
        size: "40",
        maxGuests: 2,
        basePriceLKR: 45000,
        mealPrices: {
          roomOnly: 45000,
          bedBreakfast: 52000,
          halfBoard: 62000,
          breakfastLunch: 58000,
          fullBoard: 72000,
        },
        amenities: ["Ocean Terrace", "Air Conditioning", "Mini Bar", "Free Wi-Fi"],
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "Free cancellation up to 48 hours before check-in.",
    phone: "+94 91 438 9400",
    email: "info@thefortress.lk",
  },

  h6: {
    id: "h6",
    name: "Wild Coast Tented Lodge",
    type: "Eco-Luxury Lodge",
    badge: "ECO-LUXURY",
    location: "Yala, Southern Province",
    district: "Hambantota",
    rating: 4.9,
    reviewCount: 88,
    description:
      "Where eco-luxury meets the untamed wilderness of Yala. Wild Coast Tented Lodge offers 28 cocoon-like luxury tents elevated above the rocky coastline.",
    highlights: [
      "28 suspended luxury tents over rocky Yala coastline",
      "Zero single-use plastic policy & carbon-neutral operations",
      "Professional naturalist-led safari experiences",
      "Private plunge pools & direct ocean terrace access",
    ],
    checkIn: "14:00",
    checkOut: "11:00",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Free Wi-Fi",
      "Bar / Lounge",
      "Restaurant",
      "Air Conditioning",
      "24-Hour Front Desk",
      "Safari Included",
      "Ocean View",
    ],
    rooms: [
      {
        id: "r6-tent",
        roomType: "Villa/Bungalow",
        name: "Coastal Luxury Cocoon",
        bedSummary: "1× King bed",
        size: "44",
        maxGuests: 2,
        basePriceLKR: 135000,
        mealPrices: {
          roomOnly: 135000,
          bedBreakfast: 152000,
          halfBoard: 172000,
          breakfastLunch: 165000,
          fullBoard: 190000,
        },
        amenities: ["Plunge Pool", "Ocean Deck", "Outdoor Shower", "Eco-Amenities"],
        image:
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "50% deposit on booking. Free cancellation up to 14 days before check-in.",
    phone: "+94 11 230 0001",
    email: "reservations@wildcoastlodge.lk",
  },

  "grand-azure": {
    id: "grand-azure",
    name: "Grand Azure Villa Colombo",
    type: "Luxury Villa",
    badge: "VERIFIED HOST",
    location: "Kollupitiya, Colombo 03",
    district: "Colombo",
    rating: 4.9,
    reviewCount: 342,
    description:
      "A cosmopolitan luxury villa in the heart of Colombo's most prestigious neighbourhood. Grand Azure blends contemporary design with Sri Lankan warmth — offering infinity pool, a world-class spa, and curated dining experiences steps from the city's top boutiques and Galle Face promenade.",
    highlights: [
      "Prime Kollupitiya location near Galle Face & top dining",
      "Rooftop infinity pool with Colombo skyline views",
      "Full-service spa, fitness centre & butler concierge",
      "In-house fine dining and crafted cocktail bar",
    ],
    checkIn: "15:00",
    checkOut: "12:00",
    establishedYear: "2019",
    siteCategory: "Urban Coastal Haven",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    ],
    amenities: [
      "Swimming Pool",
      "Free Wi-Fi",
      "Air Conditioning",
      "Spa & Wellness Center",
      "Breakfast Included",
      "Bathtub",
      "24-Hour Security",
      "Restaurant",
    ],
    rooms: [
      {
        id: "ga-deluxe",
        roomType: "Deluxe Room",
        name: "Azure Deluxe Room",
        bedSummary: "1× Queen bed",
        size: "35",
        maxGuests: 2,
        basePriceLKR: 55000,
        mealPrices: {
          roomOnly: 55000,
          bedBreakfast: 63000,
          halfBoard: 74000,
          breakfastLunch: 70000,
          fullBoard: 84000,
        },
        amenities: ["City View", "Rain Shower", "Mini Bar", "Free Wi-Fi"],
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "ga-suite",
        roomType: "Suite",
        name: "Ocean Panorama Suite",
        bedSummary: "1× King bed",
        size: "52",
        maxGuests: 3,
        popular: true,
        basePriceLKR: 85000,
        mealPrices: {
          roomOnly: 85000,
          bedBreakfast: 96000,
          halfBoard: 112000,
          breakfastLunch: 108000,
          fullBoard: 128000,
        },
        amenities: ["Ocean View Balcony", "Jacuzzi", "Bathtub", "Butler Service", "Free Wi-Fi"],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      },
    ],
    refundPolicy: "Free cancellation up to 48 hours before check-in.",
    phone: "+94 11 234 5678",
    email: "bookings@grandazure.lk",
  },
};
