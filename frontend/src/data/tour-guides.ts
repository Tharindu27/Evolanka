export type TourGuide = {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  guideType: 'National Guide' | 'Site Specialist' | 'Chauffeur Guide';
  specializations: string[];
  languages: string[];
  district: string;
  experience: string;
  summary: string;
  image: string;
};

export const tourGuides: TourGuide[] = [
  {
    id: 'chaminda-perera',
    name: 'Chaminda Perera',
    title: 'Heritage and culture specialist',
    location: 'Kandy & Central Province',
    rating: 4.9,
    reviews: 128,
    guideType: 'National Guide',
    specializations: ['Heritage Sites', 'History'],
    languages: ['English', 'German'],
    district: 'Kandy',
    experience: '12 years of experience',
    summary: 'Thoughtful, story-rich journeys through Sri Lanka’s ancient kingdoms, temples, and tea country.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6_oxwiVSaer0DbvEhSLX2O9Q8vxoKLWMqqEuoai91WM6ReNBru7h0TmDurs4yeiXBnvcNF1ZC4f0iktL-ueutLH52t8RtGfSEoAtwghknHhOInJ1ugFsTl_l6yqOVuhGNnO4ieHfu_ZKOeSQUgNu7vUdGcC-89yKLjnpwJWP7LBd4D93APRCUz9Gjy8W-0aKGdmKaE_DBcO_fhAbAPC35ZXQVmj1ofXxy-3eZtIsavigYvdiBU_Cbow',
  },
  {
    id: 'nilu-jayawardena',
    name: 'Nilu Jayawardena',
    title: 'Wildlife and birding guide',
    location: 'Yala & Southern Parks',
    rating: 5,
    reviews: 94,
    guideType: 'Site Specialist',
    specializations: ['Wildlife', 'Bird Watching'],
    languages: ['English', 'French'],
    district: 'Matara',
    experience: '9 years of experience',
    summary: 'A patient nature guide for intimate safaris, coastal birding, and responsible wildlife encounters.',
    image: '/images/guides/nilu-jayawardena.jpg',
  },
  {
    id: 'ruwan-silva',
    name: 'Ruwan Silva',
    title: 'Islandwide chauffeur guide',
    location: 'Colombo & Islandwide',
    rating: 4.8,
    reviews: 156,
    guideType: 'Chauffeur Guide',
    specializations: ['City Tours', 'Airport Transfers'],
    languages: ['English', 'Mandarin'],
    district: 'Colombo',
    experience: '11 years of experience',
    summary: 'Comfortable, reliable islandwide travel with local recommendations beyond the guidebook.',
    image: '/images/guides/ruwan-silva.jpg',
  },
  {
    id: 'tharushi-fonseka',
    name: 'Tharushi Fonseka',
    title: 'Food and lifestyle guide',
    location: 'Galle & Southern Coast',
    rating: 4.9,
    reviews: 76,
    guideType: 'National Guide',
    specializations: ['Food', 'Local Culture'],
    languages: ['English', 'Sinhala'],
    district: 'Galle',
    experience: '8 years of experience',
    summary: 'Explore the flavours, makers, and coastal rituals that give southern Sri Lanka its character.',
    image: '/images/guides/tharushi-fonseka.jpg',
  },
  {
    id: 'kasun-wijesinghe',
    name: 'Kasun Wijesinghe',
    title: 'Adventure and highland guide',
    location: 'Ella & Hill Country',
    rating: 4.8,
    reviews: 112,
    guideType: 'Site Specialist',
    specializations: ['Adventure', 'Hiking'],
    languages: ['English', 'German'],
    district: 'Badulla',
    experience: '10 years of experience',
    summary: 'Tailored treks, train journeys, and highland adventures for curious, active travellers.',
    image: '/images/guides/kasun-wijesinghe.jpg',
  },
  {
    id: 'ishani-de-silva',
    name: 'Ishani de Silva',
    title: 'Sacred cities guide',
    location: 'Anuradhapura & Cultural Triangle',
    rating: 5,
    reviews: 83,
    guideType: 'National Guide',
    specializations: ['History', 'Heritage Sites'],
    languages: ['English', 'French'],
    district: 'Anuradhapura',
    experience: '13 years of experience',
    summary: 'An insightful companion for the monasteries, rock temples, and stories of ancient Sri Lanka.',
    image: '/images/guides/ishani-de-silva.jpg',
  },
];

export function getTourGuide(guideId: string) {
  return tourGuides.find((guide) => guide.id === guideId);
}

export type TourGuideRegion = { name: string; image: string };

export type TourGuideProfileDetails = {
  pricePerDay: number;
  bio: string[];
  regions: TourGuideRegion[];
  vehicle: { name: string; details: string; features: string[]; image?: string };
};

export const guideHeroImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-rXwEnfYzKtBpkpyTBcvBoAYWCU7ZkE7vDkxyeKdB2wYk4XocXwlfcXDhZ3jMoKJh3QQMdfU4x9uLcib3SwE_AMbrCAy82BRk0AmbghIYl3Dvf6L3lmM9UxoM0sWFwUaMkt97aOom009v1Byd24b7wY0af7kbGColX_XKyd3ow2d67V_JlFv9yyHHXkU4nroQoqEzREFjalZ03B9gCgGkkX7SAiG29hv5ezIFhn9DmqHYx17Gr1TU7w';

const sigiriya = {
  name: 'Sigiriya',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCnU8ALDBOZp6VWLIl6IMkf_ynjZr9O1qGAccXd3GPD-vBNSvxP3NcABR6Rva1yLFlh5WPZeRF1V9iEXkW_TtKKugJ-jz0rYhSXDBuveFqQRLiBPFoWV2XMW7orNKWGA5OKvUwB-hR0pEMoXQ9xp9yLVVUDfGkGxxGSpqrXJxwcBRsttSMrLyKenMFnINM7BxD8pN99qDeFeFXBQLM1CdPQqQcsaxagtm8iBFn33KRWinFT2o_86SWiw',
};
const yala = {
  name: 'Yala',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAG7_0ZWqXrVJyaRy70b9yF0EP8B2itXNhJt03wmL1FD-q9NgNg8wF_C9zUofWWdcDC1j0-JnKKIteIIZ8YcMuPsNyUTH8Xbg05gBSkiNG38jexPMFlCu1ibbG35z_uJ1vmXr-iJW2YnIxd6wjvK2LZL4P8Q6UQI_gdnkKRL5mR9IrbchA6y0t45obFERY6ZXH8rco4wJC3FIdcxo0Xg4W4LaSkPj6RJfd9siPh9T1ec3OcmVvb3eJRiw',
};
const kandy = {
  name: 'Kandy',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCMTMUAlkZFlhdRs0W0QqrxD82JzT6JPVSXPKPlC-Ky9m2JKj-ZpyiIwko1-F68dbXx4Dv5J-tVFbGqwG0LELbYhM6A7hk5bpb6V9OQ6ONroCxO5pQml0dy7g6oOEVJeeoOMcWBapP-JomNAVpLgzJ7NQpUNTMTsvKXvuHW3R_cUIhg0J3z6KmdeKEaqPbIdidsy_7zW467xO84vQ06xoazReTyN01mThsm7TLIs3jHr-pa284sAFvKfw',
};
const galle = { name: 'Galle Fort', image: '/images/landing-page/gallefort.png' };
const mirissa = { name: 'Mirissa', image: '/images/landing-page/mirissabeach.png' };

export const tourGuideProfiles: Record<string, TourGuideProfileDetails> = {
  'chaminda-perera': {
    pricePerDay: 85,
    bio: [
      'With over a decade of experience traversing Sri Lanka’s kingdoms, temples, and tea country, I create journeys that blend cultural heritage with the island’s natural beauty. As a National Licensed Guide, my mission is to offer more than a tour — a gateway to the authentic soul of Ceylon.',
      'Whether we are climbing Sigiriya at dawn or wandering the sacred city of Kandy, my focus remains on safety, storytelling, and attentive service.',
    ],
    regions: [sigiriya, yala, kandy],
    vehicle: {
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuChI9mUqe5Uy3cuu9lOQ1E8LSZ7-Y2P8N-7-9vU1iSfC-S74DXOvMYq407QUrz5bT3MtXjvz_SD0EV9fES02b5LhLD-MxLAaDYycmu4u66P3f-mQ6zf3Kp9M5bPd_pObRLqUGlbm3jkGGivLoo7IYaUzVS9ydsw-h6IzyY31geH9aL01gDJGA_hFo44VJGGzzQYJh8I9j5XTaj4n9BR86RPiQTIecpY_GweRcFNowvdIZ7JbjmveUoaAg',
      name: 'Toyota KDH Luxury Van',
      details: '2022 • High Roof • Executive Series',
      features: ['Climate Control', 'On-board Wi-Fi', '6 Comfort Seats', 'USB Charging'],
    },
  },
  'nilu-jayawardena': {
    pricePerDay: 95,
    bio: [
      'I guide intimate safaris and coastal birding trips with patience and respect for the animals we meet. Every outing is paced around the wildlife, not the clock.',
      'From leopard tracking in Yala to dawn bird walks along the southern lagoons, I help guests see more while leaving the lightest footprint.',
    ],
    regions: [mirissa, sigiriya, galle],
    vehicle: {
      image: '/images/guides/vehicles/nilu-jayawardena.jpg',
      name: 'Land Cruiser Safari Jeep',
      details: '2020 • Open Roof • Safari Series',
      features: ['Raised Seating', 'Cool Box', '5 Comfort Seats', 'USB Charging'],
    },
  },
  'ruwan-silva': {
    pricePerDay: 75,
    bio: [
      'As an islandwide chauffeur guide I combine safe, comfortable driving with the local know-how that guidebooks miss — the best roadside stalls, quiet viewpoints, and timing for every stop.',
      'From airport arrival to your last sunset, I keep the journey smooth so you can simply enjoy Sri Lanka.',
    ],
    regions: [galle, sigiriya, mirissa],
    vehicle: {
      image: '/images/guides/vehicles/ruwan-silva.jpg',
      name: 'Toyota Prius Executive',
      details: '2021 • Hybrid • Executive Series',
      features: ['Climate Control', 'On-board Wi-Fi', '3 Comfort Seats', 'USB Charging'],
    },
  },
  'tharushi-fonseka': {
    pricePerDay: 70,
    bio: [
      'I introduce guests to the flavours, makers, and coastal rituals that give the south its character — from morning fish markets to family kitchens and spice gardens.',
      'My tours are slow, social, and delicious, designed for travellers who want to taste and meet the real Sri Lanka.',
    ],
    regions: [galle, mirissa, sigiriya],
    vehicle: {
      image: '/images/guides/vehicles/tharushi-fonseka.jpg',
      name: 'Toyota Axio Sedan',
      details: '2020 • Automatic • Comfort Series',
      features: ['Climate Control', 'Bottled Water', '3 Comfort Seats', 'USB Charging'],
    },
  },
  'kasun-wijesinghe': {
    pricePerDay: 80,
    bio: [
      'I design tailored treks, scenic train journeys, and highland adventures for active travellers who like to earn their views.',
      'From sunrise at Little Adam’s Peak to tea-estate trails around Ella, I handle the route, the pace, and the safety so you can focus on the climb.',
    ],
    regions: [{ name: 'Ella', image: '/images/landing-page/landing-hero.png' }, sigiriya, mirissa],
    vehicle: {
      image: '/images/guides/vehicles/kasun-wijesinghe.jpg',
      name: 'Nissan Caravan Van',
      details: '2021 • Diesel • Hill Country Series',
      features: ['Climate Control', 'Luggage Space', '6 Comfort Seats', 'USB Charging'],
    },
  },
  'ishani-de-silva': {
    pricePerDay: 90,
    bio: [
      'For thirteen years I have walked visitors through the monasteries, rock temples, and ruined cities of the Cultural Triangle, bringing their stories to life.',
      'I believe heritage is best understood slowly — so we visit early, linger where it matters, and leave with context, not just photographs.',
    ],
    regions: [sigiriya, { name: 'Anuradhapura', image: '/images/landing-page/landing-hero.png' }, galle],
    vehicle: {
      name: 'Toyota KDH Luxury Van',
      details: '2022 • High Roof • Executive Series',
      features: ['Climate Control', 'On-board Wi-Fi', '6 Comfort Seats', 'USB Charging'],
    },
  },
};

export function getTourGuideProfile(guideId: string) {
  return tourGuideProfiles[guideId];
}
