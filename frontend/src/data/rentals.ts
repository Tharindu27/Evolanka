export type RentalFleetIcon = 'car' | 'suv' | 'scooter' | 'van' | 'bus' | 'electric';

export type RentalProvider = {
  id: string;
  name: string;
  province: string;
  district: string;
  location: string;
  rating: number;
  description: string;
  image: string;
  badge?: { label: string; tone: 'premium' | 'eco' | 'adventure' | 'group' | 'new' };
  fleet: { label: string; icon: RentalFleetIcon }[];
  actionLabel: 'Book Now' | 'View Rates';
  profileAvailable?: boolean;
};

export type RentalVehicleCategory = 'car' | 'motorbike' | 'suv' | 'van';
export type RentalTransmission = 'Automatic' | 'Manual';
export type RentalDeliveryOption = 'home' | 'pickup';
export type RentalDriverOption = 'self-drive' | 'with-driver';

export type RentalVehicle = {
  id: string;
  name: string;
  category: RentalVehicleCategory;
  rating: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  seats: number;
  transmission: RentalTransmission;
  fuel: string;
  image: string;
  imageAlt: string;
  deliveryOptions: RentalDeliveryOption[];
  driverOptions: RentalDriverOption[];
};

export const rentalProviders: RentalProvider[] = [
  {
    id: 'ceylon-rent-a-car',
    name: 'Ceylon Rent-A-Car',
    province: 'Western',
    district: 'Colombo',
    location: 'Western Province, Colombo 07',
    rating: 4.9,
    description:
      "Sri Lanka's leading luxury vehicle provider, specializing in high-end hybrids and executive SUVs for long-distance travel.",
    image: '/images/rentals/providers/ceylon-rent-a-car.jpg',
    badge: { label: 'Premium', tone: 'premium' },
    fleet: [
      { label: '12 Sedans', icon: 'car' },
      { label: '8 SUVs', icon: 'suv' },
      { label: '4 Scooters', icon: 'scooter' },
    ],
    actionLabel: 'Book Now',
    profileAvailable: true,
  },
  {
    id: 'lanka-wheels',
    name: 'Lanka Wheels',
    province: 'Southern',
    district: 'Galle',
    location: 'Southern Province, Galle',
    rating: 4.7,
    description:
      'Affordable rental solutions for backpackers and long-term travellers, with fuel-efficient hybrids and automatic scooters.',
    image: '/images/rentals/providers/lanka-wheels.jpg',
    badge: { label: 'Eco-Friendly', tone: 'eco' },
    fleet: [
      { label: '15 Hybrids', icon: 'car' },
      { label: '2 Jeeps', icon: 'suv' },
      { label: '25 Scooters', icon: 'scooter' },
    ],
    actionLabel: 'View Rates',
    profileAvailable: true,
  },
  {
    id: 'hill-country-expeditions',
    name: 'Hill Country Expeditions',
    province: 'Central',
    district: 'Kandy',
    location: 'Central Province, Kandy',
    rating: 4.8,
    description:
      'Specialising in 4x4 off-road vehicles and robust SUVs built for the winding roads and misty terrains of Sri Lanka.',
    image: '/images/rentals/providers/hill-country-expeditions.jpg',
    badge: { label: 'Adventure', tone: 'adventure' },
    fleet: [
      { label: '5 Sedans', icon: 'car' },
      { label: '18 4x4s', icon: 'suv' },
      { label: '0 Scooters', icon: 'scooter' },
    ],
    actionLabel: 'Book Now',
    profileAvailable: true,
  },
  {
    id: 'island-wide-rentals',
    name: 'Island Wide Rentals',
    province: 'Western',
    district: 'Negombo',
    location: 'Western Province, Negombo',
    rating: 4.5,
    description:
      'Convenient airport pickup and drop-off, with a diverse fleet covering every budget from luxury to economy.',
    image: '/images/rentals/providers/island-wide-rentals.jpg',
    fleet: [
      { label: '30+ Cars', icon: 'car' },
      { label: '10 SUVs', icon: 'suv' },
      { label: '12 Scooters', icon: 'scooter' },
    ],
    actionLabel: 'View Rates',
    profileAvailable: true,
  },
  {
    id: 'translanka-logistics',
    name: 'TransLanka Logistics',
    province: 'Western',
    district: 'Colombo',
    location: 'Western Province, Colombo',
    rating: 4.6,
    description:
      'A specialist fleet for group tours, corporate events, and family holidays, including luxury vans and buses.',
    image: '/images/rentals/providers/translanka-logistics.jpg',
    badge: { label: 'Group Travel', tone: 'group' },
    fleet: [
      { label: '12 Vans', icon: 'van' },
      { label: '5 Buses', icon: 'bus' },
      { label: '4 SUVs', icon: 'suv' },
    ],
    actionLabel: 'Book Now',
    profileAvailable: true,
  },
  {
    id: 'neodrive-ev-rentals',
    name: 'NeoDrive EV Rentals',
    province: 'Western',
    district: 'Battaramulla',
    location: 'Western Province, Battaramulla',
    rating: 5,
    description:
      'Travel electric with a fleet of all-electric sedans, high-performance electric motorcycles, and e-scooters.',
    image: '/images/rentals/providers/neodrive-ev-rentals.jpg',
    badge: { label: 'New Arrival', tone: 'new' },
    fleet: [
      { label: '10 EVs', icon: 'electric' },
      { label: '8 E-Bikes', icon: 'scooter' },
      { label: '15 E-Scoots', icon: 'scooter' },
    ],
    actionLabel: 'View Rates',
    profileAvailable: true,
  },
];

export const rentalProvinces = ['All Provinces', 'Western', 'Central', 'Southern', 'Northern'];

export const rentalVehiclesByProvider: Record<string, RentalVehicle[]> = {
  'ceylon-rent-a-car': [
    {
      id: 'toyota-prius',
      name: 'Toyota Prius',
      category: 'car',
      rating: 4.8,
      dailyRate: 15000,
      weeklyRate: 95000,
      monthlyRate: 350000,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      image: '/images/rentals/vehicles/toyota-prius.jpg',
      imageAlt: 'White Toyota Prius on a scenic coastal road',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive', 'with-driver'],
    },
    {
      id: 'honda-vezel',
      name: 'Honda Vezel',
      category: 'suv',
      rating: 4.7,
      dailyRate: 18000,
      weeklyRate: 115000,
      monthlyRate: 420000,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      image: '/images/rentals/vehicles/honda-vezel.jpg',
      imageAlt: 'Dark blue Honda Vezel in a modern urban setting',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive', 'with-driver'],
    },
    {
      id: 'yamaha-nmax',
      name: 'Yamaha NMAX',
      category: 'motorbike',
      rating: 4.9,
      dailyRate: 4500,
      weeklyRate: 28000,
      monthlyRate: 90000,
      seats: 2,
      transmission: 'Automatic',
      fuel: 'Petrol',
      image: '/images/rentals/vehicles/yamaha-nmax.jpg',
      imageAlt: 'Matte grey Yamaha NMAX scooter outside a cafe',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive'],
    },
    {
      id: 'mitsubishi-montero',
      name: 'Mitsubishi Montero',
      category: 'suv',
      rating: 4.6,
      dailyRate: 35000,
      weeklyRate: 220000,
      monthlyRate: 850000,
      seats: 7,
      transmission: 'Manual',
      fuel: 'Diesel',
      image: '/images/rentals/vehicles/mitsubishi-montero.jpg',
      imageAlt: 'Silver Mitsubishi Montero on a jungle trail',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive', 'with-driver'],
    },
    {
      id: 'toyota-hiace',
      name: 'Toyota Hiace',
      category: 'van',
      rating: 4.5,
      dailyRate: 25000,
      weeklyRate: 160000,
      monthlyRate: 600000,
      seats: 12,
      transmission: 'Automatic',
      fuel: 'Diesel',
      image: '/images/rentals/vehicles/toyota-hiace.jpg',
      imageAlt: 'White Toyota Hiace outside a bright airport terminal',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive', 'with-driver'],
    },
    {
      id: 'suzuki-swift',
      name: 'Suzuki Swift',
      category: 'car',
      rating: 4.8,
      dailyRate: 10000,
      weeklyRate: 65000,
      monthlyRate: 240000,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      image: '/images/rentals/vehicles/suzuki-swift.jpg',
      imageAlt: 'Red Suzuki Swift on a winding road through tea country',
      deliveryOptions: ['home', 'pickup'],
      driverOptions: ['self-drive', 'with-driver'],
    },
  ],
};
