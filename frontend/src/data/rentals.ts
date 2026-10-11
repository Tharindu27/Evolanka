import { rentalImages } from './rental-images';

export type FleetKind = 'sedan' | 'suv' | 'van' | 'bus' | 'scooter' | 'bike' | 'electric';

export type RentalProvider = {
  id: string;
  name: string;
  rating: number;
  badge?: { label: string; className: string };
  province: string;
  district: string;
  area: string;
  description: string;
  image: string;
  fleet: { label: string; kind: FleetKind }[];
  cta: 'Book Now' | 'View Rates';
};

export const provinceDistricts: Record<string, string[]> = {
  Western: ['Colombo', 'Gampaha'],
  Central: ['Kandy'],
  Southern: ['Galle'],
  Northern: ['Jaffna'],
};

export const provinceOptions = Object.keys(provinceDistricts);
export const allDistricts = Object.values(provinceDistricts).flat();

export const getRentalProvider = (id: string) => rentalProviders.find((p) => p.id === id);

export const rentalProviders: RentalProvider[] = [
  {
    id: 'ceylon-rent-a-car',
    name: 'Ceylon Rent-A-Car',
    rating: 4.9,
    badge: { label: 'Premium', className: 'bg-[#003d9b]' },
    province: 'Western',
    district: 'Colombo',
    area: 'Colombo 07',
    description:
      "Sri Lanka's leading luxury vehicle provider specializing in high-end hybrids and executive SUVs for long-distance travel.",
    image: rentalImages.ceylon,
    fleet: [
      { label: '12 Sedans', kind: 'sedan' },
      { label: '8 SUVs', kind: 'suv' },
      { label: '4 Scooters', kind: 'scooter' },
    ],
    cta: 'Book Now',
  },
  {
    id: 'lanka-wheels',
    name: 'Lanka Wheels',
    rating: 4.7,
    badge: { label: 'Eco-Friendly', className: 'bg-[#004e32]' },
    province: 'Southern',
    district: 'Galle',
    area: 'Galle',
    description:
      'Affordable rental solutions for backpackers and long-term travelers. Wide range of fuel-efficient hybrids and automatic scooters.',
    image: rentalImages.lankaWheels,
    fleet: [
      { label: '4 Toyota Priuses', kind: 'sedan' },
      { label: '1 Yamaha FZ', kind: 'bike' },
      { label: '2 BYD Jeeps', kind: 'suv' },
      { label: '3 Honda Vezels', kind: 'suv' },
    ],
    cta: 'View Rates',
  },
  {
    id: 'hill-country-expeditions',
    name: 'Hill Country Expeditions',
    rating: 4.8,
    badge: { label: 'Adventure', className: 'bg-[#a33500]' },
    province: 'Central',
    district: 'Kandy',
    area: 'Kandy',
    description:
      'Specializing in 4x4 off-road vehicles and robust SUVs designed specifically for the winding roads and misty terrains of Sri Lanka.',
    image: rentalImages.hillCountry,
    fleet: [
      { label: '3 Defenders', kind: 'suv' },
      { label: '2 Jetours', kind: 'suv' },
      { label: '4 Mitsubishi Triton Cabs', kind: 'suv' },
    ],
    cta: 'Book Now',
  },
  {
    id: 'island-wide-rentals',
    name: 'Island Wide Rentals',
    rating: 4.5,
    province: 'Western',
    district: 'Gampaha',
    area: 'Negombo',
    description:
      'Convenient airport pickup and drop-off services with a diverse fleet catering to all budget ranges from luxury to economy.',
    image: rentalImages.islandWide,
    fleet: [
      { label: '30+ Cars', kind: 'sedan' },
      { label: '10 SUVs', kind: 'suv' },
      { label: '12 Scooters', kind: 'scooter' },
    ],
    cta: 'View Rates',
  },
  {
    id: 'translanka-logistics',
    name: 'TransLanka Logistics',
    rating: 4.6,
    badge: { label: 'Group Travel', className: 'bg-[#003d9b]' },
    province: 'Western',
    district: 'Colombo',
    area: 'Colombo',
    description:
      'Specialized fleet for group tours, corporate events, and large family vacations featuring luxury mini-vans and buses.',
    image: rentalImages.transLanka,
    fleet: [
      { label: '12 Vans', kind: 'van' },
      { label: '5 Buses', kind: 'bus' },
      { label: '4 SUVs', kind: 'suv' },
    ],
    cta: 'Book Now',
  },
  {
    id: 'neodrive-ev-rentals',
    name: 'NeoDrive EV Rentals',
    rating: 5.0,
    badge: { label: 'New Arrival', className: 'bg-[#8f0045]' },
    province: 'Western',
    district: 'Colombo',
    area: 'Battaramulla',
    description:
      'The future of travel in Sri Lanka. Experience our exclusive fleet of all-electric sedans and high-performance electric motorcycles.',
    image: rentalImages.neoDrive,
    fleet: [
      { label: '10 EVs', kind: 'electric' },
      { label: '8 E-Bikes', kind: 'bike' },
      { label: '15 E-Scoots', kind: 'scooter' },
    ],
    cta: 'View Rates',
  },
];
