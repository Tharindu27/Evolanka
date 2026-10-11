import type { Listing } from "./types";

const LAST_PROPERTY_KEY = "evolanka:lastPropertyId";

export function propertyHref(propertyId: string, path = "overview") {
  return `/dashboard/hotel-owner/${propertyId}/${path}`;
}

export function rememberLastProperty(propertyId: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${LAST_PROPERTY_KEY}=${propertyId}; path=/; max-age=${
    60 * 60 * 24 * 90
  }; SameSite=Lax`;
}

export function getLastPropertyId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LAST_PROPERTY_KEY}=([^;]+)`),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function findProperty(
  listings: Listing[],
  propertyId: string,
): Listing | undefined {
  return listings.find((l) => l.id === propertyId);
}