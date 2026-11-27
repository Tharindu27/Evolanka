export type Province = {
  id: string;
  name: string;
  districts: string[];
  shortDescription: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
};

const provinceImageBase = '/images/Location/Main-Location/province';
const categoryImageBase = '/images/Location/Main-Location/category';

export const provinces: Province[] = [
  {
    id: 'western',
    name: 'Western Province',
    districts: ['Colombo', 'Gampaha', 'Kalutara'],
    shortDescription: 'Modern cityscapes, colonial landmarks, and vibrant coastlines.',
    image: `${provinceImageBase}/western.png`,
  },
  {
    id: 'southern',
    name: 'Southern Province',
    districts: ['Galle', 'Matara', 'Hambantota'],
    shortDescription: 'Iconic beaches, whale trails, and fort cities.',
    image: `${provinceImageBase}/south.png`,
  },
  {
    id: 'central',
    name: 'Central Province',
    districts: ['Kandy', 'Matale', 'Nuwara Eliya'],
    shortDescription: 'Tea-country peaks, sacred temples, and cool-climate escapes.',
    image: `${provinceImageBase}/central.png`,
  },
  {
    id: 'northern',
    name: 'Northern Province',
    districts: ['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    shortDescription: 'Ancient heritage, northern lagoons, and rich Tamil culture.',
    image: `${provinceImageBase}/north.png`,
  },
  {
    id: 'eastern',
    name: 'Eastern Province',
    districts: ['Trincomalee', 'Batticaloa', 'Ampara'],
    shortDescription: 'Pristine bays, surf towns, and marine sanctuaries.',
    image: `${provinceImageBase}/eastern.png`,
  },
  {
    id: 'north-western',
    name: 'North Western Province',
    districts: ['Kurunegala', 'Puttalam'],
    shortDescription: 'Historic capitals, wetlands, and coconut country.',
    image: `${provinceImageBase}/north-west.png`,
  },
  {
    id: 'north-central',
    name: 'North Central Province',
    districts: ['Anuradhapura', 'Polonnaruwa'],
    shortDescription: 'UNESCO kingdoms, reservoirs, and timeless ruins.',
    image: `${provinceImageBase}/north-central.png`,
  },
  {
    id: 'uva',
    name: 'Uva Province',
    districts: ['Badulla', 'Monaragala'],
    shortDescription: 'Hill-country rail routes and dramatic escarpments.',
    image: `${provinceImageBase}/uva.png`,
  },
  {
    id: 'sabaragamuwa',
    name: 'Sabaragamuwa Province',
    districts: ['Ratnapura', 'Kegalle'],
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

export function getProvinceById(provinceId: string) {
  return provinces.find((province) => province.id === provinceId);
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.id === categoryId);
}
