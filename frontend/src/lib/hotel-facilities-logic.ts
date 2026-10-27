/**
 * Hotel Facilities & Amenities Logic Layer
 * 
 * Provides domain data models, master schemas, hotel-specific availability states,
 * and pure business logic functions for hotel facilities, amenities, schedules, and policies.
 */

export type GroupKey =
  | "access"
  | "room"
  | "bathroom"
  | "property"
  | "food"
  | "services"
  | "safety"
  | "payment";

export interface RefundPolicy {
  id: string;
  title: string;
  description: string;
  recommended?: boolean;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: "Pool" | "Spa" | "Dining" | "Gym" | "Ballroom" | "Lounge" | "Outdoor";
  location: string;
  status: "active" | "maintenance";
  description: string;
  hours: string;
  metricLabel: string;
  metricValue: string;
  occupancyPercent: number;
  maintenanceNotice?: string;
  image: string;
}

export interface CategoryMeta {
  key: GroupKey;
  title: string;
  icon: string;
  description: string;
}

export interface HotelFacilitiesState {
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  refundPolicyId: string;
  facilities: FacilityItem[];
  availableAmenities: Record<GroupKey, string[]>;
}

// Master option groups from the hotel creation / verification specification
export const masterOptionGroups: Record<GroupKey, string[]> = {
  access: ["Car park", "Front desk (24-hour)", "Keyless access", "Private check-in/out"],
  room: [
    "Air Conditioning",
    "Coffee / Tea Maker",
    "Electric Kettle",
    "Free Wi-Fi",
    "Heating",
    "Iron & Ironing Board",
    "Mini Bar",
    "Refrigerator",
    "Safe Deposit Box",
    "Soundproofing",
    "Telephone",
    "Television",
    "Wardrobe / Closet",
    "Work Desk",
  ],
  bathroom: [
    "Bathrobes",
    "Bathtub",
    "Bidet",
    "Free Toiletries",
    "Hair Dryer",
    "Hot Water",
    "Private Bathroom",
    "Shower",
    "Slippers",
    "Towels",
  ],
  property: [
    "Elevator / Lift",
    "EV Charging Station",
    "Fitness Center",
    "Garden",
    "Kids Pool",
    "Parking",
    "Sauna",
    "Spa & Wellness Center",
    "Steam Room",
    "Swimming Pool",
    "Terrace",
  ],
  food: [
    "Bar / Lounge",
    "BBQ Facilities",
    "Breakfast Included",
    "Buffet Breakfast",
    "Coffee Shop",
    "Restaurant",
    "Room Service",
  ],
  services: [
    "24-Hour Front Desk",
    "Airport Shuttle",
    "Car Rental",
    "Concierge Service",
    "Currency Exchange",
    "Dry Cleaning",
    "Housekeeping",
    "Laundry Service",
    "Luggage Storage",
    "Tour Desk",
  ],
  safety: [
    "24-Hour Security",
    "CCTV",
    "Fire Extinguishers",
    "In-room Safety",
    "Security Alarm",
    "Smoke Detectors",
  ],
  payment: ["American Express", "Cash", "MasterCard", "UnionPay", "Visa"],
};

export const masterRefundPolicies: RefundPolicy[] = [
  {
    id: "refund-1-day",
    title: "Refundable up to 1 day before check-in date",
    description:
      "Guest can cancel up until 1 day (24 hours) before the check-in date. Cancellation within 24 hours pays 100% penalty.",
  },
  {
    id: "refund-2-days",
    title: "Refundable up to 2 days before check-in date",
    description:
      "Guest can cancel up until 2 days (48 hours) before the check-in date. Cancellation within 48 hours pays 100% penalty.",
    recommended: true,
  },
  {
    id: "refund-3-days",
    title: "Refundable up to 3 days before check-in date",
    description:
      "Guest can cancel up until 3 days (72 hours) before the check-in date. Cancellation within 72 hours pays 100% penalty.",
  },
  {
    id: "non-refundable",
    title: "Non-refundable",
    description: "No free cancellation. A 100% penalty applies to all cancellations.",
  },
];

export const categoryMetaList: CategoryMeta[] = [
  {
    key: "room",
    title: "Room Amenities",
    icon: "bed",
    description: "In-suite comfort, climate control, tech, and guest furnishings",
  },
  {
    key: "bathroom",
    title: "Bathroom Essentials",
    icon: "bathtub",
    description: "Hygiene amenities, luxury toiletries, hot water, and private baths",
  },
  {
    key: "property",
    title: "Property & Wellness",
    icon: "domain",
    description: "Swimming pools, spa pavilions, fitness gym, and gardens",
  },
  {
    key: "food",
    title: "Food & Beverage",
    icon: "restaurant",
    description: "On-site dining, breakfast plans, lounge bar, and 24/7 room service",
  },
  {
    key: "services",
    title: "Guest Services",
    icon: "room_service",
    description: "Front desk, airport shuttle, luggage care, and concierge",
  },
  {
    key: "access",
    title: "Access & Arrival",
    icon: "door_front",
    description: "Parking entry, keyless room access, and 24-hr check-in",
  },
  {
    key: "safety",
    title: "Safety & Security",
    icon: "shield",
    description: "24-hr security patrol, CCTV, fire alarms, and in-room safety",
  },
  {
    key: "payment",
    title: "Accepted Payments",
    icon: "account_balance_wallet",
    description: "Accepted payment cards, digital processing, and cash settlement",
  },
];

export const amenityIcons: Record<string, string> = {
  // Access
  "Car park": "local_parking",
  "Front desk (24-hour)": "desk",
  "Keyless access": "key",
  "Private check-in/out": "badge",

  // Room
  "Air Conditioning": "ac_unit",
  "Coffee / Tea Maker": "coffee",
  "Electric Kettle": "soup_kitchen",
  "Free Wi-Fi": "wifi",
  Heating: "thermostat",
  "Iron & Ironing Board": "iron",
  "Mini Bar": "liquor",
  Refrigerator: "kitchen",
  "Safe Deposit Box": "lock",
  Soundproofing: "volume_off",
  Telephone: "call",
  Television: "tv",
  "Wardrobe / Closet": "checkroom",
  "Work Desk": "desk",

  // Bathroom
  Bathrobes: "apparel",
  Bathtub: "bathtub",
  Bidet: "wash",
  "Free Toiletries": "clean_hands",
  "Hair Dryer": "air",
  "Hot Water": "water_heater",
  "Private Bathroom": "shower",
  Shower: "shower",
  Slippers: "footprint",
  Towels: "dry",

  // Property
  "Elevator / Lift": "elevator",
  "EV Charging Station": "ev_station",
  "Fitness Center": "fitness_center",
  Garden: "yard",
  "Kids Pool": "pool",
  Parking: "local_parking",
  Sauna: "hot_tub",
  "Spa & Wellness Center": "spa",
  "Steam Room": "air",
  "Swimming Pool": "pool",
  Terrace: "deck",

  // Food
  "Bar / Lounge": "local_bar",
  "BBQ Facilities": "outdoor_grill",
  "Breakfast Included": "free_breakfast",
  "Buffet Breakfast": "brunch_dining",
  "Coffee Shop": "local_cafe",
  Restaurant: "restaurant",
  "Room Service": "room_service",

  // Services
  "24-Hour Front Desk": "support_agent",
  "Airport Shuttle": "airport_shuttle",
  "Car Rental": "directions_car",
  "Concierge Service": "concierge",
  "Currency Exchange": "currency_exchange",
  "Dry Cleaning": "dry_cleaning",
  Housekeeping: "cleaning_services",
  "Laundry Service": "local_laundry_service",
  "Luggage Storage": "luggage",
  "Tour Desk": "tour",

  // Safety
  "24-Hour Security": "security",
  CCTV: "videocam",
  "Fire Extinguishers": "fire_extinguisher",
  "In-room Safety": "health_and_safety",
  "Security Alarm": "crisis_alert",
  "Smoke Detectors": "detector_smoke",

  // Payment
  "American Express": "credit_card",
  Cash: "payments",
  MasterCard: "credit_card",
  UnionPay: "credit_card",
  Visa: "credit_card",
};

// Initial available facilities for the hotel
const initialHotelFacilities: FacilityItem[] = [
  {
    id: "f1",
    name: "Infinity Horizon Pool",
    category: "Pool",
    location: "Outdoor • 5th Floor Deck",
    status: "active",
    description: "Temperature-controlled freshwater pool overlooking the Indian Ocean with sun lounger service.",
    hours: "06:00 - 22:00",
    metricLabel: "Current Occupancy",
    metricValue: "28 / 40 (70%)",
    occupancyPercent: 70,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f2",
    name: "Ayur Ayurvedic Spa & Wellness",
    category: "Spa",
    location: "Wellness Wing • Ground Floor",
    status: "active",
    description: "Holistic healing treatments, steam rooms, herbal baths, and certified ayurvedic practitioners.",
    hours: "08:00 - 21:00",
    metricLabel: "Treatment Beds",
    metricValue: "12 / 16 (75% Booked)",
    occupancyPercent: 75,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f3",
    name: "Galle Face View Fine Dining",
    category: "Dining",
    location: "Mezzanine Level • East Wing",
    status: "active",
    description: "Signature seafood, authentic Sri Lankan fusion curries, and sunset ocean view seating.",
    hours: "06:30 - 23:00",
    metricLabel: "Dinner Seating",
    metricValue: "85 / 85 (Fully Booked)",
    occupancyPercent: 100,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f4",
    name: "State-of-the-Art Fitness Center",
    category: "Gym",
    location: "3rd Floor Fitness Wing",
    status: "active",
    description: "Technogym cardio stations, free weights, resistance machines, and dedicated yoga zone.",
    hours: "24/7 (Keycard Access)",
    metricLabel: "Active Workout Load",
    metricValue: "8 / 25 (32%)",
    occupancyPercent: 32,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f5",
    name: "Lotus Grand Ballroom & Events",
    category: "Ballroom",
    location: "Conference Center • Level 1",
    status: "maintenance",
    description: "Pillarless banquet hall with full AV equipment, hosting weddings and corporate summits.",
    hours: "On-Demand Reservations",
    metricLabel: "Acoustics Calibration",
    metricValue: "Scheduled Maintenance",
    occupancyPercent: 0,
    maintenanceNotice: "Acoustic panels & chandelier calibration in progress until Oct 28",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  },
];

// Initial available amenities for the hotel (what the hotel offers)
const initialAvailableAmenities: Record<GroupKey, string[]> = {
  access: ["Car park", "Front desk (24-hour)", "Private check-in/out", "Keyless access"],
  room: [
    "Air Conditioning",
    "Coffee / Tea Maker",
    "Electric Kettle",
    "Free Wi-Fi",
    "Mini Bar",
    "Refrigerator",
    "Safe Deposit Box",
    "Soundproofing",
    "Telephone",
    "Television",
    "Wardrobe / Closet",
    "Work Desk",
  ],
  bathroom: [
    "Bathrobes",
    "Bathtub",
    "Free Toiletries",
    "Hair Dryer",
    "Hot Water",
    "Private Bathroom",
    "Shower",
    "Slippers",
    "Towels",
  ],
  property: [
    "Elevator / Lift",
    "EV Charging Station",
    "Fitness Center",
    "Garden",
    "Kids Pool",
    "Parking",
    "Spa & Wellness Center",
    "Swimming Pool",
    "Terrace",
  ],
  food: [
    "Bar / Lounge",
    "Breakfast Included",
    "Buffet Breakfast",
    "Coffee Shop",
    "Restaurant",
    "Room Service",
  ],
  services: [
    "24-Hour Front Desk",
    "Airport Shuttle",
    "Car Rental",
    "Concierge Service",
    "Housekeeping",
    "Laundry Service",
    "Luggage Storage",
    "Tour Desk",
  ],
  safety: [
    "24-Hour Security",
    "CCTV",
    "Fire Extinguishers",
    "In-room Safety",
    "Security Alarm",
    "Smoke Detectors",
  ],
  payment: ["Visa", "MasterCard", "American Express", "Cash"],
};

/**
 * Returns the initial state for the given hotelId
 */
export function getInitialHotelFacilities(hotelId?: string): HotelFacilitiesState {
  return {
    hotelId: hotelId || "grand-azure-villa",
    hotelName: "Grand Azure Villa Colombo",
    checkIn: "14:00",
    checkOut: "11:00",
    refundPolicyId: "refund-2-days",
    facilities: initialHotelFacilities,
    availableAmenities: initialAvailableAmenities,
  };
}

/**
 * Toggles an amenity in the hotel's available amenities
 */
export function toggleAmenityInState(
  state: HotelFacilitiesState,
  group: GroupKey,
  option: string
): HotelFacilitiesState {
  const current = state.availableAmenities[group] || [];
  const exists = current.includes(option);
  const updatedList = exists
    ? current.filter((item) => item !== option)
    : [...current, option];

  return {
    ...state,
    availableAmenities: {
      ...state.availableAmenities,
      [group]: updatedList,
    },
  };
}

/**
 * Updates a major facility's status (active vs maintenance)
 */
export function updateFacilityStatusInState(
  state: HotelFacilitiesState,
  facilityId: string,
  status: "active" | "maintenance",
  notice?: string
): HotelFacilitiesState {
  return {
    ...state,
    facilities: state.facilities.map((fac) => {
      if (fac.id !== facilityId) return fac;
      return {
        ...fac,
        status,
        maintenanceNotice: status === "maintenance" ? (notice || "Routine maintenance in progress") : undefined,
      };
    }),
  };
}

/**
 * Adds a new facility to the hotel state
 */
export function addNewFacilityToState(
  state: HotelFacilitiesState,
  newFac: Omit<FacilityItem, "id">
): HotelFacilitiesState {
  const facility: FacilityItem = {
    ...newFac,
    id: `fac-${Date.now()}`,
  };

  return {
    ...state,
    facilities: [...state.facilities, facility],
  };
}

/**
 * Updates hotel schedule (check-in/check-out) and cancellation refund policy
 */
export function updateScheduleAndPolicy(
  state: HotelFacilitiesState,
  checkIn: string,
  checkOut: string,
  refundPolicyId: string
): HotelFacilitiesState {
  return {
    ...state,
    checkIn,
    checkOut,
    refundPolicyId,
  };
}

/**
 * Counts total available amenities across all categories
 */
export function getAvailableAmenitiesCount(state: HotelFacilitiesState): number {
  return Object.values(state.availableAmenities).reduce((sum, list) => sum + list.length, 0);
}

/**
 * Computes health and operational metrics for the hotel facilities
 */
export function computeFacilitiesHealth(state: HotelFacilitiesState) {
  const total = state.facilities.length;
  const active = state.facilities.filter((f) => f.status === "active").length;
  const maintenance = total - active;
  const healthPercent = total > 0 ? Math.round((active / total) * 100) : 100;

  return {
    total,
    active,
    maintenance,
    healthPercent,
  };
}

