export interface VehicleOption {
  id: string;
  name: string;
  type: 'tuk' | 'bike' | 'flex' | 'sedan' | 'van';
  passengers: number;
  etaMinutes: number;
  baseFare: number;
  perKmRate: number;
  iconName: string;
  popular?: boolean;
  description: string;
}

export const SRI_LANKAN_FLEET: VehicleOption[] = [
  {
    id: 'tuk',
    name: 'Tuk',
    type: 'tuk',
    passengers: 2,
    etaMinutes: 1,
    baseFare: 200,
    perKmRate: 95,
    iconName: 'electric_rickshaw',
    popular: true,
    description: 'Quick & affordable open-air local ride',
  },
  {
    id: 'bike',
    name: 'Bike',
    type: 'bike',
    passengers: 1,
    etaMinutes: 1,
    baseFare: 120,
    perKmRate: 60,
    iconName: 'two_wheeler',
    description: 'Fastest solo commute through traffic',
  },
  {
    id: 'flex',
    name: 'Flex',
    type: 'flex',
    passengers: 3,
    etaMinutes: 1,
    baseFare: 300,
    perKmRate: 125,
    iconName: 'directions_car',
    description: 'Compact AC hatchback for daily travel',
  },
  {
    id: 'sedan',
    name: 'Sedan / Car',
    type: 'sedan',
    passengers: 4,
    etaMinutes: 3,
    baseFare: 450,
    perKmRate: 165,
    iconName: 'local_taxi',
    description: 'Spacious executive comfort with luggage space',
  },
  {
    id: 'van',
    name: 'KDH Van',
    type: 'van',
    passengers: 8,
    etaMinutes: 5,
    baseFare: 800,
    perKmRate: 240,
    iconName: 'airport_shuttle',
    description: 'Comfortable family & group touring van',
  },
];

/**
 * Calculates straight line distance (Haversine formula in km)
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const rawDist = R * c;
  
  // Real road multiplier (average 1.35x of direct aerial distance in Sri Lanka)
  return Math.max(1.2, Number((rawDist * 1.35).toFixed(1)));
}

/**
 * Computes fare for a vehicle type, distance in km, number of intermediate stops, and expressway usage
 */
export function calculateTaxiFare(
  vehicle: VehicleOption,
  distanceKm: number,
  isReturnTrip: boolean = false,
  intermediateStopsCount: number = 0,
  useExpressway: boolean = false
): {
  fareLkr: number;
  starsEarned: number;
  expresswayTollLkr: number;
  waitingChargeLkr: number;
  durationMinutes: number;
} {
  const effectiveDistance = isReturnTrip ? distanceKm * 1.85 : distanceKm;
  let rawFare = vehicle.baseFare + effectiveDistance * vehicle.perKmRate;
  
  // Intermediate stops waiting charge buffer (e.g. LKR 150 per stop)
  const waitingChargeLkr = intermediateStopsCount * 150;
  
  // Expressway electronic toll (E03 Katunayake or E01 Southern)
  let expresswayTollLkr = 0;
  if (useExpressway && (vehicle.type === 'sedan' || vehicle.type === 'van' || vehicle.type === 'flex')) {
    expresswayTollLkr = 350; // standard E03/E01 car toll in Sri Lanka
  }

  const fareLkr = Math.round((rawFare + waitingChargeLkr + expresswayTollLkr) * 100) / 100;
  // Earn 1 star per LKR 100
  const starsEarned = Number((fareLkr / 100).toFixed(1));
  
  // Estimate travel duration (avg 35 km/h in urban + stops)
  const durationMinutes = Math.max(
    5,
    Math.round((effectiveDistance / 35) * 60) + intermediateStopsCount * 3
  );

  return {
    fareLkr,
    starsEarned,
    expresswayTollLkr,
    waitingChargeLkr,
    durationMinutes,
  };
}
