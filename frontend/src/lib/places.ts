import { categories, provinces, type Category } from '@/data/location-data/location-taxonomy';
import type { ApiLocation } from '@/lib/locations-api';

// What the public endpoint returns: approved content without review details.
export type PublicLocation = Omit<
  ApiLocation,
  'status' | 'rejectionReason' | 'submitterType' | 'submitterName' | 'submittedAt' | 'reviewedAt' | 'reviewedByName'
>;

export type NearbyHotel = { name: string; image: string };

export type Place = {
  id: string;
  name: string;
  city: string;
  district: string;
  provinceId: string | null;
  categoryIds: string[];
  categories: Category[];
  shortDescription: string;
  overview: string;
  highlights: string[];
  image: string;
  gallery: string[];
  openingDays: string | null;
  bestTime: string | null;
  freeEntry: boolean;
  prices: { localAdults: string | null; localChildren: string | null; foreignAdults: string | null; foreignChildren: string | null };
  ticketNote: string | null;
  address: string | null;
  coordinates: { lat: number; lng: number } | null;
  travelTips: string[];
  mapLabel: string;
  nearbyHotels: NearbyHotel[];
};

const fallbackImage = '/images/landing-page/sigiriya.png';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

// "Heritage" and "Heritage Places" both resolve to the same category.
export const findCategory = (label: string) => {
  const needle = normalize(label);
  return needle ? categories.find((item) => normalize(item.name).startsWith(needle) || item.id === needle) : undefined;
};

export const findProvince = (name: string | null, district: string | null) => {
  const byDistrict = district ? provinces.find((item) => item.districts.some((entry) => normalize(entry) === normalize(district))) : undefined;
  if (byDistrict) return byDistrict;
  const needle = name ? normalize(name) : '';
  return needle ? provinces.find((item) => normalize(item.name).startsWith(needle)) : undefined;
};

const excerpt = (text: string, max = 140) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 40)).trimEnd()}…`;
};

export function toPlace(location: PublicLocation): Place {
  const matched = location.categories.flatMap((label) => {
    const category = findCategory(label);
    return category ? [category] : [];
  });
  const resolved = matched.filter((item, index) => matched.indexOf(item) === index);
  const cover = location.photos.find((photo) => photo.isCover) ?? location.photos[0];
  const description = location.description?.trim() ?? '';
  const hasCoordinates = location.latitude !== null && location.longitude !== null;

  return {
    id: String(location.id),
    name: location.name,
    city: location.nearestTown ?? location.district ?? '',
    district: location.district ?? '',
    provinceId: findProvince(location.province, location.district)?.id ?? null,
    categoryIds: resolved.map((item) => item.id),
    categories: resolved,
    shortDescription: excerpt(description),
    overview: description,
    highlights: location.highlights,
    image: cover?.url ?? resolved[0]?.image ?? fallbackImage,
    gallery: location.photos.map((photo) => photo.url),
    openingDays: location.openingDays,
    bestTime: location.bestTime,
    freeEntry: location.freeEntry,
    prices: {
      localAdults: location.localAdultPrice,
      localChildren: location.localChildPrice,
      foreignAdults: location.foreignAdultPrice,
      foreignChildren: location.foreignChildPrice,
    },
    ticketNote: location.ticketNote,
    address: location.address,
    coordinates: hasCoordinates ? { lat: location.latitude as number, lng: location.longitude as number } : null,
    travelTips: location.travelTips,
    mapLabel: [location.nearestTown, location.district].filter(Boolean).join(', ') || location.address || 'Sri Lanka',
    nearbyHotels: [],
  };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function fetchPlaces(): Promise<Place[]> {
  const response = await fetch(`${apiUrl}/public/locations`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Could not load locations (${response.status})`);
  return ((await response.json()) as PublicLocation[]).map(toPlace);
}

// Resolves to null when the place does not exist or is not approved.
export async function fetchPlace(id: string): Promise<Place | null> {
  if (!/^\d+$/.test(id)) return null;
  const response = await fetch(`${apiUrl}/public/locations/${id}`, { cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Could not load the location (${response.status})`);
  return toPlace((await response.json()) as PublicLocation);
}
