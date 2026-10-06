import { guideImages } from './tour-guide-images';

export type GuideType = 'national' | 'chauffeur' | 'site';
export type SpecialtyIcon = 'heritage' | 'camera' | 'wildlife' | 'hiking' | 'food';
export type VehicleFeatureIcon = 'ac' | 'wifi' | 'seats' | 'charger';

export type TourGuide = {
  id: string;
  name: string;
  title: string;
  type: GuideType;
  location: string;
  districts: string[];
  rating: number;
  reviews: number;
  languages: string[];
  specializations: string[]; // filter categories
  tags: string[];
  pricePerDay: number;
  about: string[];
  specialties: { label: string; icon: SpecialtyIcon }[];
  regions: { name: string; image?: string }[];
  vehicle?: {
    name: string;
    details: string;
    image?: string;
    features: { label: string; icon: VehicleFeatureIcon }[];
  };
  cardPhoto?: string;
  portrait?: string;
  // Days (relative to today) on which the guide is already booked.
  busyRanges: { from: number; to: number }[];
};

export const guideTypes: { value: GuideType; label: string; badge: string }[] = [
  { value: 'national', label: 'National Guide', badge: 'bg-[#0052cc] text-[#c4d2ff]' },
  { value: 'chauffeur', label: 'Chauffeur Guide', badge: 'bg-[#006844] text-[#72e9af]' },
  { value: 'site', label: 'Site Guide', badge: 'bg-[#feaa00] text-[#684300]' },
];

export const specializationOptions = ['Culture', 'Wildlife', 'Adventure', 'Food'];
export const languageOptions = ['English', 'German', 'French', 'Sinhala', 'Mandarin', 'Italian', 'Tamil'];
export const districtOptions = [
  'Colombo',
  'Kandy',
  'Galle',
  'Matara',
  'Anuradhapura',
  'Hambantota',
  'Nuwara Eliya',
];

// Placeholder profiles until the guides API exists.
export const tourGuides: TourGuide[] = [
  {
    id: 'chaminda-perera',
    name: 'Chaminda Perera',
    title: 'Senior National Tour Guide',
    type: 'national',
    location: 'Kandy & Central Province',
    districts: ['Kandy', 'Anuradhapura'],
    rating: 4.9,
    reviews: 124,
    languages: ['English', 'German', 'Sinhala', 'Italian'],
    specializations: ['Culture', 'Wildlife'],
    tags: ['Heritage Sites', 'History'],
    pricePerDay: 85,
    about: [
      'With over 10 years of dedicated experience traversing the vibrant landscapes of Sri Lanka, I specialize in creating immersive experiences that blend cultural heritage with the raw beauty of our island\u2019s wildlife. As a National Licensed Guide, my mission is to provide more than just a tour; I offer a gateway to the authentic soul of Ceylon.',
      'Whether we are scaling the ancient heights of Sigiriya at dawn or tracking leopards in the dense brush of Yala, my focus remains on safety, storytelling, and professional service. I am an avid photographer and love helping guests capture the perfect light in our stunning tropical settings.',
    ],
    specialties: [
      { label: 'Cultural Heritage', icon: 'heritage' },
      { label: 'Wildlife', icon: 'wildlife' },
      { label: 'Photography', icon: 'camera' },
    ],
    regions: [
      { name: 'Sigiriya', image: guideImages.sigiriya },
      { name: 'Yala', image: guideImages.yala },
      { name: 'Kandy', image: guideImages.kandy },
    ],
    vehicle: {
      name: 'Toyota KDH Luxury Van',
      details: 'Model: 2022 \u2022 High Roof \u2022 Executive Series',
      image: guideImages.van,
      features: [
        { label: 'Climate Control', icon: 'ac' },
        { label: 'On-board Wi-Fi', icon: 'wifi' },
        { label: '6 Comfort Seats', icon: 'seats' },
        { label: 'USB Charging', icon: 'charger' },
      ],
    },
    cardPhoto: guideImages.chamindaCard,
    portrait: guideImages.chamindaPortrait,
    busyRanges: [
      { from: 3, to: 6 },
      { from: 14, to: 17 },
    ],
  },
  {
    id: 'nilu-jayawardena',
    name: 'Nilu Jayawardena',
    title: 'Wildlife & Safari Specialist',
    type: 'site',
    location: 'Yala & Southern Parks',
    districts: ['Hambantota', 'Matara'],
    rating: 5.0,
    reviews: 86,
    languages: ['English', 'French'],
    specializations: ['Wildlife', 'Adventure'],
    tags: ['Wildlife', 'Bird Watching'],
    pricePerDay: 95,
    about: [
      'I grew up on the edge of Yala and have spent more than a decade reading the park\u2019s tracks, calls and moods. My safaris are unhurried, quiet and focused on the animals rather than the crowd.',
      'From leopard sightings at first light to the migratory birds of Bundala, I tailor each outing to your interests and your camera.',
    ],
    specialties: [
      { label: 'Wildlife', icon: 'wildlife' },
      { label: 'Bird Watching', icon: 'camera' },
    ],
    regions: [{ name: 'Yala', image: guideImages.yala }, { name: 'Udawalawe' }, { name: 'Bundala' }],
    vehicle: {
      name: 'Open-top Safari Jeep',
      details: 'Model: 2020 \u2022 Park-licensed \u2022 Photography seats',
      features: [
        { label: 'Panoramic Views', icon: 'ac' },
        { label: '6 Seats', icon: 'seats' },
        { label: 'Binoculars Provided', icon: 'wifi' },
        { label: 'Charging Points', icon: 'charger' },
      ],
    },
    cardPhoto: guideImages.niluCard,
    busyRanges: [
      { from: 0, to: 2 },
      { from: 10, to: 12 },
    ],
  },
  {
    id: 'ruwan-silva',
    name: 'Ruwan Silva',
    title: 'Chauffeur Guide',
    type: 'chauffeur',
    location: 'Colombo & Islandwide',
    districts: ['Colombo', 'Galle'],
    rating: 4.8,
    reviews: 203,
    languages: ['English', 'Mandarin'],
    specializations: ['Culture', 'Food'],
    tags: ['City Tours', 'Airport Transfer'],
    pricePerDay: 70,
    about: [
      'Reliable, punctual and fluent in English and Mandarin, I take care of everything on the road so you can simply enjoy Sri Lanka. I specialise in airport transfers, city tours and comfortable multi-day journeys across the island.',
    ],
    specialties: [
      { label: 'City Tours', icon: 'heritage' },
      { label: 'Street Food', icon: 'food' },
    ],
    regions: [{ name: 'Colombo' }, { name: 'Negombo' }, { name: 'Galle' }],
    vehicle: {
      name: 'Toyota Land Cruiser Prado',
      details: 'Model: 2021 \u2022 Leather interior \u2022 7 seater',
      features: [
        { label: 'Climate Control', icon: 'ac' },
        { label: 'On-board Wi-Fi', icon: 'wifi' },
        { label: '7 Comfort Seats', icon: 'seats' },
        { label: 'USB Charging', icon: 'charger' },
      ],
    },
    cardPhoto: guideImages.ruwanCard,
    busyRanges: [{ from: 5, to: 9 }],
  },
  {
    id: 'dilani-fernando',
    name: 'Dilani Fernando',
    title: 'National Tour Guide',
    type: 'national',
    location: 'Galle & Southern Coast',
    districts: ['Galle', 'Matara'],
    rating: 4.7,
    reviews: 58,
    languages: ['English', 'French', 'Sinhala'],
    specializations: ['Culture', 'Food'],
    tags: ['Galle Fort', 'Street Food'],
    pricePerDay: 75,
    about: [
      'Born and raised inside Galle Fort, I love sharing its Dutch-colonial stories, hidden courtyards and the best kottu on the coast. My walking tours blend history, food and everyday local life.',
    ],
    specialties: [
      { label: 'Cultural Heritage', icon: 'heritage' },
      { label: 'Culinary Tours', icon: 'food' },
    ],
    regions: [{ name: 'Galle Fort' }, { name: 'Unawatuna' }, { name: 'Mirissa' }],
    busyRanges: [{ from: 1, to: 4 }],
  },
  {
    id: 'kasun-bandara',
    name: 'Kasun Bandara',
    title: 'Ancient Cities Site Guide',
    type: 'site',
    location: 'Anuradhapura & North Central',
    districts: ['Anuradhapura'],
    rating: 4.8,
    reviews: 71,
    languages: ['English', 'German', 'Sinhala'],
    specializations: ['Culture', 'Adventure'],
    tags: ['Ancient Cities', 'Cycling'],
    pricePerDay: 60,
    about: [
      'A trained archaeologist turned guide, I bring the ruins of Anuradhapura, Polonnaruwa and Mihintale to life with stories you will not find in a guidebook. Cycling tours between the sites are my speciality.',
    ],
    specialties: [
      { label: 'Archaeology', icon: 'heritage' },
      { label: 'Cycling Adventures', icon: 'hiking' },
    ],
    regions: [{ name: 'Anuradhapura' }, { name: 'Polonnaruwa' }, { name: 'Mihintale' }],
    busyRanges: [{ from: 8, to: 11 }],
  },
  {
    id: 'tharindu-wickrama',
    name: 'Tharindu Wickrama',
    title: 'Hill Country Chauffeur Guide',
    type: 'chauffeur',
    location: 'Kandy & Hill Country',
    districts: ['Kandy', 'Nuwara Eliya'],
    rating: 4.6,
    reviews: 44,
    languages: ['English', 'Sinhala', 'Tamil'],
    specializations: ['Adventure', 'Food'],
    tags: ['Tea Country', 'Scenic Drives'],
    pricePerDay: 80,
    about: [
      'From Kandy through the tea estates to Ella, I know every viewpoint, tea factory and roadside stall worth stopping for. Expect smooth driving, local stories and plenty of photo breaks.',
    ],
    specialties: [
      { label: 'Tea Country', icon: 'food' },
      { label: 'Scenic Hiking', icon: 'hiking' },
    ],
    regions: [{ name: 'Ella' }, { name: 'Nuwara Eliya' }, { name: 'Kandy', image: guideImages.kandy }],
    vehicle: {
      name: 'Toyota Corolla Cross',
      details: 'Model: 2023 \u2022 Hybrid \u2022 Hill-country tuned',
      features: [
        { label: 'Climate Control', icon: 'ac' },
        { label: 'On-board Wi-Fi', icon: 'wifi' },
        { label: '4 Comfort Seats', icon: 'seats' },
        { label: 'USB Charging', icon: 'charger' },
      ],
    },
    busyRanges: [
      { from: 2, to: 3 },
      { from: 20, to: 24 },
    ],
  },
];

export const getGuide = (id: string) => tourGuides.find((g) => g.id === id);
