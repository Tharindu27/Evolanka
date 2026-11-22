/**
 * Hotel Room Listing & Inventory Logic Layer
 * 
 * Provides domain data models, master schemas, hotel room inventory state,
 * occupancy rules, multi-meal plan pricing in LKR, and pure business logic functions.
 */

export const MAX_PHOTO_BYTES = 2 * 1024 * 1024; // 2 MB
export const MAX_GUESTS = 10;

export const roomTypes = [
  "Single Room",
  "Double Room",
  "Twin Room",
  "Standard Room",
  "Superior Room",
  "Deluxe Room",
  "Family Room",
  "Suite",
] as const;

export type RoomType = (typeof roomTypes)[number] | string;

export const bedTypes = [
  "Single bed",
  "Double bed",
  "Queen bed",
  "King bed",
  "Bunk bed",
  "Sofa bed",
] as const;

export type BedType = (typeof bedTypes)[number] | string;

export const mealPlans = [
  { key: "roomOnly", label: "Room Only" },
  { key: "bedBreakfast", label: "Bed & Breakfast" },
  { key: "halfBoard", label: "Half Board" },
  { key: "breakfastLunch", label: "Breakfast & Lunch" },
  { key: "fullBoard", label: "Full Board" },
] as const;

export type MealKey = (typeof mealPlans)[number]["key"];

export interface PaxRate {
  id: number;
  adults: number;
  prices: Record<MealKey, string>;
}

export interface Bed {
  type: string;
  count: number;
}

export interface Photo {
  id: string;
  name: string;
  url: string;
}

export interface HotelRoom {
  id: number;
  roomType: string;
  name: string;
  beds: Bed[];
  size: string; // sqm
  bathrooms: string;
  quantity: string; // number of units
  rates: PaxRate[];
  photos: Photo[];
  status: "available" | "occupied" | "cleaning" | "maintenance";
  floor?: number;
  amenities?: string[];
}

export const emptyPrices = (): Record<MealKey, string> => ({
  roomOnly: "",
  bedBreakfast: "",
  halfBoard: "",
  breakfastLunch: "",
  fullBoard: "",
});

export const occupancyLabel = (adults: number): string =>
  `${["Single", "Double", "Triple", "Quadruple", "Quintuple", "Sextuple"][adults - 1] ?? "Group"} Occupancy`;

let nextRoomId = 101;
export const getNextRoomId = () => nextRoomId++;

export function createDefaultRoom(): HotelRoom {
  const id = getNextRoomId();
  return {
    id,
    roomType: "Deluxe Room",
    name: "Deluxe Ocean View",
    beds: [{ type: "King bed", count: 1 }],
    size: "35",
    bathrooms: "1",
    quantity: "4",
    status: "available",
    floor: 2,
    amenities: ["Ocean View", "Free Wi-Fi", "Air Conditioning", "Rain Shower"],
    rates: [
      {
        id: 1,
        adults: 1,
        prices: {
          roomOnly: "38000",
          bedBreakfast: "42000",
          halfBoard: "48000",
          breakfastLunch: "46000",
          fullBoard: "55000",
        },
      },
      {
        id: 2,
        adults: 2,
        prices: {
          roomOnly: "45000",
          bedBreakfast: "52000",
          halfBoard: "62000",
          breakfastLunch: "59000",
          fullBoard: "72000",
        },
      },
    ],
    photos: [
      {
        id: "p1",
        name: "deluxe-ocean-view.jpg",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      },
    ],
  };
}

// Initial realistic hotel rooms for Grand Azure Villa
const initialRooms: HotelRoom[] = [
  {
    id: 1,
    roomType: "Suite",
    name: "Ocean Panorama Deluxe Suite",
    beds: [{ type: "King bed", count: 1 }],
    size: "52",
    bathrooms: "1",
    quantity: "6",
    status: "available",
    floor: 3,
    amenities: ["Ocean View", "Balcony", "Jacuzzi", "High-speed WiFi", "Espresso Bar"],
    rates: [
      {
        id: 101,
        adults: 1,
        prices: {
          roomOnly: "48000",
          bedBreakfast: "54000",
          halfBoard: "62000",
          breakfastLunch: "59000",
          fullBoard: "72000",
        },
      },
      {
        id: 102,
        adults: 2,
        prices: {
          roomOnly: "55000",
          bedBreakfast: "64000",
          halfBoard: "76000",
          breakfastLunch: "72000",
          fullBoard: "88000",
        },
      },
    ],
    photos: [
      {
        id: "p-101",
        name: "ocean-suite.jpg",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 2,
    roomType: "Suite",
    name: "Private Lagoon Villa Suite",
    beds: [
      { type: "King bed", count: 1 },
      { type: "Queen bed", count: 1 },
    ],
    size: "85",
    bathrooms: "2",
    quantity: "3",
    status: "occupied",
    floor: 1,
    amenities: ["Private Plunge Pool", "Lagoon Access", "Outdoor Shower", "Butler Service"],
    rates: [
      {
        id: 201,
        adults: 2,
        prices: {
          roomOnly: "85000",
          bedBreakfast: "95000",
          halfBoard: "110000",
          breakfastLunch: "105000",
          fullBoard: "125000",
        },
      },
      {
        id: 202,
        adults: 4,
        prices: {
          roomOnly: "105000",
          bedBreakfast: "120000",
          halfBoard: "145000",
          breakfastLunch: "135000",
          fullBoard: "165000",
        },
      },
    ],
    photos: [
      {
        id: "p-201",
        name: "lagoon-villa.jpg",
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 3,
    roomType: "Deluxe Room",
    name: "Azure Horizon Deluxe",
    beds: [{ type: "King bed", count: 1 }],
    size: "40",
    bathrooms: "1",
    quantity: "8",
    status: "available",
    floor: 3,
    amenities: ["Sunset View", "Mini Bar", "Bathtub", "Smart TV 65\"", "Breakfast Included"],
    rates: [
      {
        id: 301,
        adults: 1,
        prices: {
          roomOnly: "42000",
          bedBreakfast: "48000",
          halfBoard: "56000",
          breakfastLunch: "52000",
          fullBoard: "65000",
        },
      },
      {
        id: 302,
        adults: 2,
        prices: {
          roomOnly: "50000",
          bedBreakfast: "58000",
          halfBoard: "68000",
          breakfastLunch: "64000",
          fullBoard: "79000",
        },
      },
    ],
    photos: [
      {
        id: "p-301",
        name: "azure-deluxe.jpg",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 4,
    roomType: "Superior Room",
    name: "Ceylon Heritage Superior",
    beds: [{ type: "Queen bed", count: 1 }],
    size: "32",
    bathrooms: "1",
    quantity: "10",
    status: "available",
    floor: 2,
    amenities: ["Antique Teak Furnishing", "Courtyard View", "Ensuite Bath", "Organic Tea Bar"],
    rates: [
      {
        id: 401,
        adults: 1,
        prices: {
          roomOnly: "32000",
          bedBreakfast: "36000",
          halfBoard: "42000",
          breakfastLunch: "40000",
          fullBoard: "49000",
        },
      },
      {
        id: 402,
        adults: 2,
        prices: {
          roomOnly: "38000",
          bedBreakfast: "44000",
          halfBoard: "52000",
          breakfastLunch: "48000",
          fullBoard: "60000",
        },
      },
    ],
    photos: [
      {
        id: "p-401",
        name: "ceylon-heritage.jpg",
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 5,
    roomType: "Family Room",
    name: "Royal Garden Family Suite",
    beds: [
      { type: "King bed", count: 1 },
      { type: "Single bed", count: 2 },
    ],
    size: "70",
    bathrooms: "2",
    quantity: "4",
    status: "cleaning",
    floor: 1,
    amenities: ["Private Garden", "Sun Deck", "Barbecue Access", "Connecting Kids Room"],
    rates: [
      {
        id: 501,
        adults: 2,
        prices: {
          roomOnly: "65000",
          bedBreakfast: "75000",
          halfBoard: "88000",
          breakfastLunch: "82000",
          fullBoard: "102000",
        },
      },
      {
        id: 502,
        adults: 4,
        prices: {
          roomOnly: "88000",
          bedBreakfast: "102000",
          halfBoard: "122000",
          breakfastLunch: "115000",
          fullBoard: "142000",
        },
      },
    ],
    photos: [
      {
        id: "p-501",
        name: "garden-family.jpg",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: 6,
    roomType: "Standard Room",
    name: "Colonial Garden Standard",
    beds: [{ type: "King bed", count: 1 }],
    size: "28",
    bathrooms: "1",
    quantity: "6",
    status: "maintenance",
    floor: 2,
    amenities: ["Garden Terrace", "Rain Shower", "Work Desk", "Espresso Machine"],
    rates: [
      {
        id: 601,
        adults: 1,
        prices: {
          roomOnly: "28000",
          bedBreakfast: "32000",
          halfBoard: "38000",
          breakfastLunch: "36000",
          fullBoard: "44000",
        },
      },
      {
        id: 602,
        adults: 2,
        prices: {
          roomOnly: "34000",
          bedBreakfast: "40000",
          halfBoard: "48000",
          breakfastLunch: "45000",
          fullBoard: "56000",
        },
      },
    ],
    photos: [
      {
        id: "p-601",
        name: "colonial-standard.jpg",
        url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

/**
 * Returns initial hotel rooms for the specified hotelId
 */
export function getInitialHotelRooms(hotelId?: string): HotelRoom[] {
  return initialRooms;
}

/**
 * Adds a new room to the inventory list
 */
export function addRoom(rooms: HotelRoom[], newRoom: HotelRoom): HotelRoom[] {
  return [...rooms, newRoom];
}

/**
 * Updates an existing room by ID
 */
export function updateRoom(
  rooms: HotelRoom[],
  roomId: number | string,
  updates: Partial<HotelRoom>
): HotelRoom[] {
  return rooms.map((room) => (room.id === roomId ? { ...room, ...updates } : room));
}

/**
 * Deletes a room by ID
 */
export function deleteRoom(rooms: HotelRoom[], roomId: number | string): HotelRoom[] {
  return rooms.filter((room) => room.id !== roomId);
}

/**
 * Updates room status (available | occupied | cleaning | maintenance)
 */
export function updateRoomStatus(
  rooms: HotelRoom[],
  roomId: number | string,
  status: HotelRoom["status"]
): HotelRoom[] {
  return rooms.map((room) => (room.id === roomId ? { ...room, status } : room));
}

/**
 * Calculates operational room stats (total types, total units, available, occupied, maintenance)
 */
export function calculateRoomStats(rooms: HotelRoom[]) {
  const totalTypes = rooms.length;
  const totalUnits = rooms.reduce((sum, r) => sum + (parseInt(r.quantity, 10) || 1), 0);
  const available = rooms.filter((r) => r.status === "available").length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const cleaning = rooms.filter((r) => r.status === "cleaning").length;
  const maintenance = rooms.filter((r) => r.status === "maintenance").length;

  return {
    totalTypes,
    totalUnits,
    available,
    occupied,
    cleaning,
    maintenance,
  };
}

/**
 * Returns the starting rate formatted in LKR (e.g. "LKR 45,000")
 */
export function getStartingPrice(room: HotelRoom): string {
  const allPrices: number[] = [];

  room.rates.forEach((rate) => {
    Object.values(rate.prices).forEach((val) => {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed) && parsed > 0) {
        allPrices.push(parsed);
      }
    });
  });

  if (allPrices.length === 0) return "LKR 35,000";

  const minPrice = Math.min(...allPrices);
  return `LKR ${minPrice.toLocaleString()}`;
}

/**
 * Formats bed list into a concise readable string
 */
export function getFormattedBedSummary(beds: Bed[]): string {
  if (!beds || beds.length === 0) return "1 King bed";
  return beds.map((b) => `${b.count > 1 ? `${b.count} ` : ""}${b.type}`).join(" + ");
}

/**
 * Estimates guest capacity from bed configuration
 */
export function getTotalBedCapacity(beds: Bed[]): number {
  if (!beds || beds.length === 0) return 2;
  return beds.reduce((acc, b) => {
    const isDouble = /king|queen|double/i.test(b.type);
    const capacityPerBed = isDouble ? 2 : 1;
    return acc + capacityPerBed * b.count;
  }, 0);
}

