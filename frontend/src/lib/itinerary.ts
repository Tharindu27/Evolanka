'use client';

import { useMemo, useSyncExternalStore } from 'react';

import { getPlaceById, type Place } from '@/data/location-data/location-mock-data';

export type Timing = 'exact' | 'flexible';

export type Itinerary = {
  id: string;
  name: string;
  timing: Timing;
  startDate: string;
  endDate: string;
  inSriLanka: boolean;
  clusters: string[][];
  hotels: string[];
  savedAt: number;
};

export type ClusterHotel = { name: string; image: string; nearPlace: string };

const STORAGE_KEY = 'evolanka-itineraries';
const CHANGE_EVENT = 'evolanka-itineraries-changed';
const CLUSTER_RADIUS_KM = 60;

const startPoints = {
  local: { label: 'Colombo Fort (Western Province)', tag: 'GPS', lat: 6.9344, lng: 79.8428 },
  airport: { label: 'Bandaranaike International Airport (BIA)', tag: 'CMB', lat: 7.1808, lng: 79.8841 },
};

export const getStartPoint = (inSriLanka: boolean) => (inSriLanka ? startPoints.local : startPoints.airport);

export const hotelSlug = (hotelName: string) =>
  hotelName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const distanceKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
};

// Visit nearest-first from the start point, then split into clusters where the hop to the next stop is long.
export function buildClusters(placeIds: string[], inSriLanka: boolean): string[][] {
  const remaining = placeIds.flatMap((id) => {
    const place = getPlaceById(id);
    return place ? [place] : [];
  });

  const ordered: Place[] = [];
  let current: { lat: number; lng: number } = getStartPoint(inSriLanka);

  while (remaining.length > 0) {
    let nearestIndex = 0;
    for (let i = 1; i < remaining.length; i += 1) {
      if (distanceKm(current, remaining[i].coordinates) < distanceKm(current, remaining[nearestIndex].coordinates)) {
        nearestIndex = i;
      }
    }
    const [next] = remaining.splice(nearestIndex, 1);
    ordered.push(next);
    current = next.coordinates;
  }

  const clusters: Place[][] = [];
  ordered.forEach((place) => {
    const last = clusters[clusters.length - 1];
    if (last && distanceKm(last[last.length - 1].coordinates, place.coordinates) <= CLUSTER_RADIUS_KM) {
      last.push(place);
    } else {
      clusters.push([place]);
    }
  });

  return clusters.map((cluster) => cluster.map((place) => place.id));
}

export function getClusterHotels(placeIds: string[]): ClusterHotel[] {
  const seen = new Set<string>();
  const hotels: ClusterHotel[] = [];

  placeIds.forEach((id) => {
    const place = getPlaceById(id);
    place?.nearbyHotels.forEach((hotel) => {
      if (seen.has(hotel.name)) return;
      seen.add(hotel.name);
      hotels.push({ name: hotel.name, image: hotel.image, nearPlace: place.name });
    });
  });

  return hotels;
}

export const placeIdsOf = (itinerary: Pick<Itinerary, 'clusters'>) => itinerary.clusters.flat();

export function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function describeDates(itinerary: Pick<Itinerary, 'timing' | 'startDate' | 'endDate'>) {
  if (itinerary.timing === 'flexible') return 'Flexible dates';
  if (itinerary.startDate && itinerary.endDate) return `${formatDate(itinerary.startDate)} – ${formatDate(itinerary.endDate)}`;
  if (itinerary.startDate) return `From ${formatDate(itinerary.startDate)}`;
  return 'Dates not set';
}

function parse(raw: string | null): Itinerary[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Itinerary[]) : [];
  } catch {
    return [];
  }
}

export function getItinerary(id: string) {
  return parse(window.localStorage.getItem(STORAGE_KEY)).find((item) => item.id === id);
}

export function saveItinerary(itinerary: Itinerary) {
  const all = parse(window.localStorage.getItem(STORAGE_KEY));
  const next = all.some((item) => item.id === itinerary.id)
    ? all.map((item) => (item.id === itinerary.id ? itinerary : item))
    : [itinerary, ...all];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

// Returns null until the browser has hydrated, then the saved list.
export function useItineraries(): Itinerary[] | null {
  const raw = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(STORAGE_KEY) ?? '',
    () => null,
  );
  return useMemo(() => (raw === null ? null : parse(raw)), [raw]);
}
