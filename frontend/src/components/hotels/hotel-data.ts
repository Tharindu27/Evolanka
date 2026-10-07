export type FilterGroup = {
  title: string;
  options: string[];
  initiallyOpen?: boolean;
};

export type Hotel = {
  name: string;
  location: string;
  price: string;
  rating: string;
  reviews: number;
  image: string;
  badge?: string;
  categories: string[];
};

export type Accommodation = {
  name: string;
  price: string;
  image: string;
  description: string;
  features: { icon: string; label: string }[];
  popular?: boolean;
};

export type Amenity = {
  name: string;
  icon: string;
  description: string;
};

export type HotelDetail = Hotel & {
  slug: string;
  heroTitle: string;
  tagline: string;
  established: string;
  siteLabel: string;
  heritageTitle: string;
  heritage: string[];
  heritageImage: string;
  accommodations: Accommodation[];
  amenities: Amenity[];
  locationTitle: string;
  locationDescription: string;
  locationImage: string;
  nearby: { title: string; description: string }[];
};

export const categories = ['Luxury Resorts', 'Villa/Bungalow', 'Guest House', 'Apartment', 'Hostel', 'Camping'];

export const filterGroups: FilterGroup[] = [
  {
    title: 'General Amenities',
    initiallyOpen: true,
    options: ['Air Conditioning', 'Heating', 'Free Wi-Fi', 'Television', 'Telephone', 'Mini Bar', 'Refrigerator', 'Electric Kettle', 'Coffee / Tea Maker', 'Safe Deposit Box'],
  },
  {
    title: 'Room Features',
    options: ['Private Bathroom', 'Shower', 'Bathtub', 'Balcony', 'Ocean View', 'Mountain View', 'Kitchenette'],
  },
  {
    title: 'Food & Dining',
    options: ['Restaurant', 'Room Service', 'Breakfast Included', 'Bar', 'Outdoor Dining'],
  },
  {
    title: 'Recreation',
    options: ['Swimming Pool', 'Spa & Wellness', 'Fitness Center', 'Beach Access', 'Garden', 'Yoga'],
  },
  {
    title: 'Services',
    options: ['24-Hour Front Desk', 'Concierge Service', 'Luggage Storage', 'Laundry Service', 'Dry Cleaning', 'Housekeeping', 'Airport Shuttle', 'Car Rental', 'Currency Exchange', 'Tour Desk'],
  },
  {
    title: 'Security & Services',
    options: ['CCTV', 'Fire Extinguishers', 'Smoke Detectors', 'Security Alarm', '24-Hour Security', 'In-room Safety'],
  },
  {
    title: 'Access Modes',
    options: ['Private check-in/out', 'Keyless access', 'Front desk (24-hour)', 'Car park'],
  },
];

export const hotels: Hotel[] = [
  { name: 'Amangalla Galle', location: 'Galle, Sri Lanka', price: 'LKR 145k', rating: '4.9', reviews: 120, image: '/images/landing-page/gallefort.png', badge: 'PREMIUM', categories: ['Luxury Resorts'] },
  { name: '98 Acres Resort', location: 'Ella, Sri Lanka', price: 'LKR 62k', rating: '4.8', reviews: 342, image: '/images/landing-page/landing-hero.png', badge: 'TOP RATED', categories: ['Luxury Resorts', 'Villa/Bungalow'] },
  { name: 'Cinnamon Wild Yala', location: 'Yala, Sri Lanka', price: 'LKR 58k', rating: '4.8', reviews: 186, image: '/images/landing-page/sigiriya.png', categories: ['Luxury Resorts'] },
  { name: 'Mirissa Bay Villas', location: 'Mirissa, Sri Lanka', price: 'LKR 28k', rating: '4.6', reviews: 94, image: '/images/landing-page/mirissabeach.png', categories: ['Villa/Bungalow', 'Guest House'] },
  { name: 'The Fortress Resort', location: 'Koggala, Sri Lanka', price: 'LKR 45k', rating: '4.7', reviews: 210, image: '/images/landing-page/gallefort.png', categories: ['Luxury Resorts'] },
  { name: 'Wild Coast Lodge', location: 'Yala, Sri Lanka', price: 'LKR 135k', rating: '4.9', reviews: 88, image: '/images/landing-page/sigiriya.png', categories: ['Camping', 'Villa/Bungalow'] },
];

const amangalla = hotels[0];

export const hotelDetails: Record<string, HotelDetail> = {
  amangalla: {
    ...amangalla,
    slug: 'amangalla',
    heroTitle: 'Amangalla — A Timeless Sanctuary in Galle Fort',
    tagline: 'Discover the soul of southern Sri Lanka within the ramparts of a UNESCO World Heritage site, where colonial history meets modern luxury.',
    established: '1684',
    siteLabel: 'UNESCO',
    heritageTitle: 'Heritage & Elegance',
    heritage: [
      'Occupying an ensemble of buildings that date back to 1684, Amangalla is a living record of the Dutch colonial era and the historic port of Galle. Once the New Oriental Hotel, it has welcomed travelers for over a century, preserving its stately atmosphere and gracious service.',
      "Step onto the polished jackwood floors and experience a serene atmosphere where high ceilings, antique furniture, and the gentle hum of ceiling fans transport you to a bygone era, perfectly balanced with Aman's signature minimalist sophistication.",
    ],
    heritageImage: '/images/landing-page/gallefort.png',
    accommodations: [
      { name: 'Bedroom', price: 'LKR 145k', image: '/images/landing-page/landing-hero.png', description: 'Serene garden views with original teak flooring and colonial charm.', features: [{ icon: 'bed', label: 'King bed' }, { icon: 'filter_hdr', label: 'Garden views' }] },
      { name: 'Chamber', price: 'LKR 185k', image: '/images/landing-page/gallefort.png', description: 'Extended living areas featuring historic architectural details and grand proportions.', features: [{ icon: 'square_foot', label: '80 sqm' }, { icon: 'chair', label: 'Separate living area' }], popular: true },
      { name: 'Suite', price: 'LKR 295k', image: '/images/landing-page/sigiriya.png', description: 'Our most prestigious accommodation with separate lounge and breathtaking fort views.', features: [{ icon: 'visibility', label: 'Fort & ocean views' }, { icon: 'meeting_room', label: '120 sqm space' }] },
    ],
    amenities: [
      { name: 'The Baths', icon: 'spa', description: 'Traditional hydrotherapy and ayurvedic rituals.' },
      { name: 'The Library', icon: 'menu_book', description: 'A collection of history, art and local maps.' },
      { name: 'The Verandah', icon: 'restaurant', description: 'Fine dining overlooking the street life of Galle.' },
      { name: 'The Pool', icon: 'pool', description: 'A 21-metre pool set in lush walled gardens.' },
      { name: 'High Tea', icon: 'emoji_food_beverage', description: 'Traditional afternoon service in the Zaal.' },
    ],
    locationTitle: 'In the Heart of Galle Fort',
    locationDescription: "Amangalla is situated at the epicenter of the fort's cultural life. Wander through cobblestone streets lined with boutiques and cafes, or take a short evening stroll to the historic Lighthouse and atmospheric ramparts overlooking the Indian Ocean.",
    locationImage: '/images/landing-page/gallefort.png',
    nearby: [
      { title: '5 min to the Lighthouse', description: 'Iconic views of the coastline.' },
      { title: '3 min to the Ramparts', description: 'The perfect spot for sunset watching.' },
    ],
  },
};

export function getHotelDetail(slug: string): HotelDetail {
  const detail = hotelDetails[slug];
  if (detail) return detail;

  const hotel = hotels.find((item) => item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) ?? hotels[0];
  return {
    ...hotelDetails.amangalla,
    ...hotel,
    slug,
    heroTitle: `${hotel.name} — A memorable stay in ${hotel.location.split(',')[0]}`,
    tagline: `Experience a thoughtful stay at ${hotel.name}, with welcoming spaces and an ideal base for discovering ${hotel.location.split(',')[0]}.`,
    heritageTitle: 'Your Stay',
    heritage: [`Settle into ${hotel.name} and enjoy a carefully considered stay in ${hotel.location}.`, 'Our spaces combine local character, comfortable details and warm Sri Lankan hospitality.'],
    heritageImage: hotel.image,
    locationTitle: `Discover ${hotel.location.split(',')[0]}`,
    locationDescription: `${hotel.name} puts you close to the places, landscapes and local experiences that make this destination special.`,
    locationImage: hotel.image,
  };
}
