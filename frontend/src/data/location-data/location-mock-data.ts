export type Province = {
  id: string;
  name: string;
  districts: string[];
  attractions: string;
  shortDescription: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
};

export type Place = {
  id: string;
  name: string;
  city: string;
  district: string;
  provinceId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  overview: string;
  highlights: string[];
  image: string;
  gallery: string[];
  visitingHours: string;
  openingTimes: string;
  ticketFees: string;
  bestTimeToVisit: string;
  nearbyHotels: string[];
  travelTips: string[];
  mapLabel: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

const provinceImageBase = '/images/Location/Main-Location/province';
const categoryImageBase = '/images/Location/Main-Location/category';

export const provinces: Province[] = [
  {
    id: 'western',
    name: 'Western Province',
    districts: ['Colombo', 'Gampaha', 'Kalutara'],
    attractions: '45+ Attractions',
    shortDescription: 'Modern cityscapes, colonial landmarks, and vibrant coastlines.',
    image: `${provinceImageBase}/western.png`,
  },
  {
    id: 'southern',
    name: 'Southern Province',
    districts: ['Galle', 'Matara', 'Hambantota'],
    attractions: '60+ Attractions',
    shortDescription: 'Iconic beaches, whale trails, and fort cities.',
    image: `${provinceImageBase}/south.png`,
  },
  {
    id: 'central',
    name: 'Central Province',
    districts: ['Kandy', 'Matale', 'Nuwara Eliya'],
    attractions: '55+ Attractions',
    shortDescription: 'Tea-country peaks, sacred temples, and cool-climate escapes.',
    image: `${provinceImageBase}/central.png`,
  },
  {
    id: 'northern',
    name: 'Northern Province',
    districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    attractions: '30+ Attractions',
    shortDescription: 'Ancient heritage, northern lagoons, and rich Tamil culture.',
    image: `${provinceImageBase}/north.png`,
  },
  {
    id: 'eastern',
    name: 'Eastern Province',
    districts: ['Trincomalee', 'Batticaloa', 'Ampara'],
    attractions: '40+ Attractions',
    shortDescription: 'Pristine bays, surf towns, and marine sanctuaries.',
    image: `${provinceImageBase}/eastern.png`,
  },
  {
    id: 'north-western',
    name: 'North Western Province',
    districts: ['Kurunegala', 'Puttalam'],
    attractions: '35+ Attractions',
    shortDescription: 'Historic capitals, wetlands, and coconut country.',
    image: `${provinceImageBase}/north-west.png`,
  },
  {
    id: 'north-central',
    name: 'North Central Province',
    districts: ['Anuradhapura', 'Polonnaruwa'],
    attractions: '32+ Attractions',
    shortDescription: 'UNESCO kingdoms, reservoirs, and timeless ruins.',
    image: `${provinceImageBase}/north-central.png`,
  },
  {
    id: 'uva',
    name: 'Uva Province',
    districts: ['Badulla', 'Monaragala'],
    attractions: '28+ Attractions',
    shortDescription: 'Hill-country rail routes and dramatic escarpments.',
    image: `${provinceImageBase}/uva.png`,
  },
  {
    id: 'sabaragamuwa',
    name: 'Sabaragamuwa Province',
    districts: ['Ratnapura', 'Kegalle'],
    attractions: '34+ Attractions',
    shortDescription: 'Rainforest gateways, gem trails, and mountain routes.',
    image: `${provinceImageBase}/sabaragamuwa.png`,
  },
];

export const categories: Category[] = [
  { id: 'heritage', name: 'Heritage Places', shortDescription: 'Ancient cities, forts, and archaeological wonders.', image: `${categoryImageBase}/heritage.png` },
  { id: 'wild', name: 'Wild and Nature', shortDescription: 'Parks, safaris, and biodiversity hotspots.', image: `${categoryImageBase}/wild.png` },
  { id: 'religious', name: 'Religious Places', shortDescription: 'Temples, shrines, and sacred monuments.', image: `${categoryImageBase}/religious.png` },
  { id: 'hill', name: 'Scenic and Hill Country', shortDescription: 'Tea estates, viewpoints, and misty trails.', image: `${categoryImageBase}/hill.png` },
  { id: 'beach', name: 'Beach Places', shortDescription: 'Coastal escapes, coral bays, and sunsets.', image: `${categoryImageBase}/beach.png` },
  { id: 'adventure', name: 'Thrills and Adventure', shortDescription: 'Rafting, climbing, and high-energy experiences.', image: `${categoryImageBase}/adventure.png` },
];

export const places: Place[] = [
  {
    id: 'sigiriya-lion-rock',
    name: 'Sigiriya Lion Rock',
    city: 'Dambulla',
    district: 'Matale',
    provinceId: 'central',
    categoryId: 'heritage',
    shortDescription: 'Ancient sky fortress with world-famous frescoes and lion-gate ruins.',
    description:
      'Sigiriya is a UNESCO World Heritage site featuring a dramatic rock citadel, water gardens, and murals that reflect early urban planning and artistic excellence.',
    overview:
      'Rising dramatically above the central plains, Sigiriya blends royal ambition, advanced landscape design, and ancient artistry into one of Sri Lanka’s most iconic destinations.',
    highlights: [
      'The Lion Gate staircase and summit palace ruins',
      'World-famous Sigiriya frescoes and mirror wall',
      'Symmetrical water gardens and boulder gardens below',
    ],
    image: '/images/landing-page/sigiriya.png',
    gallery: ['/images/landing-page/sigiriya.png', '/images/landing-page/gallefort.png', '/images/landing-page/mirissabeach.png'],
    visitingHours: 'Open Daily (Mon - Sun)',
    openingTimes: '6:30 AM - 5:30 PM',
    ticketFees: 'Foreigners: USD 30 | Locals: LKR 1000',
    bestTimeToVisit: 'Early morning or late afternoon',
    nearbyHotels: ['Aliya Resort and Spa', 'Hotel Sigiriya', 'EKHO Sigiriya'],
    travelTips: [
      'Start early to avoid midday heat on the climb.',
      'Carry water and comfortable walking shoes.',
      'Visit Pidurangala nearby for a panoramic Sigiriya view.',
    ],
    mapLabel: 'Sigiriya, Matale',
    coordinates: {
      lat: 7.957,
      lng: 80.7603,
    },
  },
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    city: 'Galle',
    district: 'Galle',
    provinceId: 'southern',
    categoryId: 'heritage',
    shortDescription: 'Coastal UNESCO fort blending Portuguese, Dutch, and British architecture.',
    description:
      'Galle Fort offers cobblestone streets, rampart views, museums, and cafes inside one of Asia’s best-preserved fortified old towns.',
    overview:
      'Galle Fort combines colonial architecture, boutique culture, and ocean-facing ramparts in a compact historic district perfect for slow exploration.',
    highlights: [
      'Sunset walks along the fort ramparts',
      'Dutch colonial lanes lined with galleries and cafes',
      'Historic churches, museums, and lighthouse viewpoints',
    ],
    image: '/images/landing-page/gallefort.png',
    gallery: ['/images/landing-page/gallefort.png', '/images/landing-page/mirissabeach.png', '/images/landing-page/sigiriya.png'],
    visitingHours: 'Open Daily',
    openingTimes: 'Anytime (best in morning/evening)',
    ticketFees: 'No entry fee',
    bestTimeToVisit: 'Sunset',
    nearbyHotels: ['The Fort Printers', 'Amangalla', 'Le Grand Galle'],
    travelTips: [
      'Visit in the late afternoon for cooler weather and sunset.',
      'Wear light clothing because the fort area can get warm.',
      'Combine your walk with lighthouse and museum stops.',
    ],
    mapLabel: 'Galle, Southern Province',
    coordinates: {
      lat: 6.0261,
      lng: 80.2168,
    },
  },
  {
    id: 'mirissa-beach',
    name: 'Mirissa Beach',
    city: 'Mirissa',
    district: 'Matara',
    provinceId: 'southern',
    categoryId: 'beach',
    shortDescription: 'Palm-fringed bay known for whale watching and sunset surfing.',
    description:
      'Mirissa is one of Sri Lanka’s most popular southern beaches with gentle waves, seafood spots, and seasonal whale safaris.',
    overview:
      'Mirissa is a laid-back southern beach town where golden sand, surf breaks, and ocean excursions create one of the island’s most popular coastal escapes.',
    highlights: [
      'Whale watching excursions during the season',
      'Sunset viewpoints and beachside cafes',
      'Calm swimming zones and beginner-friendly surf areas',
    ],
    image: '/images/landing-page/mirissabeach.png',
    gallery: ['/images/landing-page/mirissabeach.png', '/images/landing-page/gallefort.png', '/images/landing-page/sigiriya.png'],
    visitingHours: 'Open Daily',
    openingTimes: 'Anytime',
    ticketFees: 'No entry fee',
    bestTimeToVisit: 'November to April',
    nearbyHotels: ['Triple O Six', 'Paradise Beach Club', 'Lantern Boutique Hotel'],
    travelTips: [
      'Check sea conditions before swimming during monsoon periods.',
      'Book whale-watching early in peak season.',
      'Arrive before sunset if you want quieter photo spots.',
    ],
    mapLabel: 'Mirissa, Matara',
    coordinates: {
      lat: 5.9485,
      lng: 80.4719,
    },
  },
  {
    id: 'yala-national-park',
    name: 'Yala National Park',
    city: 'Kataragama',
    district: 'Hambantota',
    provinceId: 'southern',
    categoryId: 'wild',
    shortDescription: 'Famous safari park with leopards, elephants, and birdlife.',
    description:
      'Yala combines dry-zone forests, lagoons, and grasslands, offering one of the best wildlife experiences on the island.',
    overview:
      'Yala National Park is Sri Lanka’s signature safari landscape, combining dense wildlife populations with dramatic dry-zone scenery and wetlands.',
    highlights: [
      'High chance of spotting leopards and elephants',
      'Safari tracks through forests, lagoons, and open scrubland',
      'Excellent birdwatching and photography opportunities',
    ],
    image: '/images/landing-page/mirissabeach.png',
    gallery: ['/images/landing-page/mirissabeach.png', '/images/landing-page/sigiriya.png', '/images/landing-page/gallefort.png'],
    visitingHours: 'Open Daily',
    openingTimes: '6:00 AM - 6:00 PM',
    ticketFees: 'Vehicle and park permit required',
    bestTimeToVisit: 'Early morning',
    nearbyHotels: ['Jetwing Yala', 'Cinnamon Wild Yala', 'EKHO Safari Tissa'],
    travelTips: [
      'Choose early morning safaris for better wildlife movement.',
      'Carry sun protection and binoculars.',
      'Go with a licensed jeep guide for the best route planning.',
    ],
    mapLabel: 'Yala, Hambantota',
    coordinates: {
      lat: 6.3725,
      lng: 81.5185,
    },
  },
  {
    id: 'ella-nine-arch-bridge',
    name: 'Nine Arch Bridge',
    city: 'Ella',
    district: 'Badulla',
    provinceId: 'uva',
    categoryId: 'hill',
    shortDescription: 'Iconic colonial-era viaduct surrounded by jungle hills.',
    description:
      'The Nine Arch Bridge is one of Sri Lanka’s most photographed hill-country landmarks, best seen when trains pass through.',
    overview:
      'Hidden among tea-country greenery, the Nine Arch Bridge offers a cinematic view of colonial railway engineering and slow mountain travel.',
    highlights: [
      'Classic train crossing photo moments',
      'Jungle walking trail to scenic viewpoints',
      'Cool hill-country climate and nearby Ella cafes',
    ],
    image: '/images/landing-page/sigiriya.png',
    gallery: ['/images/landing-page/sigiriya.png', '/images/landing-page/mirissabeach.png', '/images/landing-page/gallefort.png'],
    visitingHours: 'Open Daily',
    openingTimes: 'Anytime',
    ticketFees: 'No entry fee',
    bestTimeToVisit: 'Morning',
    nearbyHotels: ['98 Acres Resort', 'EKHO Ella', 'Hotel Onrock'],
    travelTips: [
      'Check train times before heading to the viewpoint.',
      'The trail can be muddy after rain, so wear good shoes.',
      'Bring a light jacket for early morning visits.',
    ],
    mapLabel: 'Ella, Badulla',
    coordinates: {
      lat: 6.8768,
      lng: 81.0615,
    },
  },
  {
    id: 'temple-of-tooth',
    name: 'Temple of the Sacred Tooth Relic',
    city: 'Kandy',
    district: 'Kandy',
    provinceId: 'central',
    categoryId: 'religious',
    shortDescription: 'Sri Lanka’s most revered Buddhist temple complex.',
    description:
      'Located beside Kandy Lake, this sacred temple hosts daily rituals and the annual Esala Perahera cultural procession.',
    overview:
      'The Temple of the Sacred Tooth Relic stands at the spiritual heart of Kandy, drawing pilgrims and visitors with ritual, history, and royal architecture.',
    highlights: [
      'Sacred relic chamber and daily puja rituals',
      'Historic palace complex beside Kandy Lake',
      'Strong cultural connection to the Esala Perahera festival',
    ],
    image: '/images/landing-page/gallefort.png',
    gallery: ['/images/landing-page/gallefort.png', '/images/landing-page/sigiriya.png', '/images/landing-page/mirissabeach.png'],
    visitingHours: 'Open Daily',
    openingTimes: '5:30 AM - 8:00 PM',
    ticketFees: 'Entry tickets required',
    bestTimeToVisit: 'Evening ceremony',
    nearbyHotels: ['The Grand Kandyan', 'Queens Hotel Kandy', 'Radisson Hotel Kandy'],
    travelTips: [
      'Dress modestly because this is an active religious site.',
      'Visit around ritual times for the full atmosphere.',
      'Leave extra time for security checks during busy periods.',
    ],
    mapLabel: 'Kandy City, Central Province',
    coordinates: {
      lat: 7.2936,
      lng: 80.6413,
    },
  },
  {
    id: 'kitulgala-rafting',
    name: 'Kitulgala White Water Rafting',
    city: 'Kitulgala',
    district: 'Kegalle',
    provinceId: 'sabaragamuwa',
    categoryId: 'adventure',
    shortDescription: 'Adrenaline-packed rafting route through rainforest terrain.',
    description:
      'Kitulgala offers rapids suitable for both beginners and adventure seekers with scenic forest surroundings.',
    overview:
      'Kitulgala is one of Sri Lanka’s leading adventure hubs, known for river rafting, rainforest scenery, and high-energy outdoor experiences.',
    highlights: [
      'White-water rafting on the Kelani River',
      'Rainforest trails and canyoning options',
      'Adventure-friendly atmosphere for groups and day trips',
    ],
    image: '/images/landing-page/mirissabeach.png',
    gallery: ['/images/landing-page/mirissabeach.png', '/images/landing-page/sigiriya.png', '/images/landing-page/gallefort.png'],
    visitingHours: 'Open Daily',
    openingTimes: '7:00 AM - 5:00 PM',
    ticketFees: 'Activity package fees apply',
    bestTimeToVisit: 'Year round (weather dependent)',
    nearbyHotels: ['Palmstone Retreat', 'Rafters Retreat', 'Borderlands Eco Adventure Resort'],
    travelTips: [
      'Confirm river conditions before booking rafting sessions.',
      'Pack a change of clothes and waterproof protection.',
      'Travel with local guides for bundled adventure packages.',
    ],
    mapLabel: 'Kitulgala, Kegalle',
    coordinates: {
      lat: 6.99,
      lng: 80.4178,
    },
  },
];

export function getProvinceById(provinceId: string) {
  return provinces.find((province) => province.id === provinceId);
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}

export function getPlaceById(placeId: string) {
  return places.find((place) => place.id === placeId);
}
