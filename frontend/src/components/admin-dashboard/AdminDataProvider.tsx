"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { bookings as initialBookings } from "@/data/admin-data/bookings";
import { listings as initialListings } from "@/data/admin-data/listings";
import { initialDestinations } from "@/data/admin-data/locations";
import { providers as initialProviders } from "@/data/admin-data/providers";
import type {
  Booking,
  BookingStatus,
  Destination,
  Listing,
  ListingStatus,
  Provider,
  ProviderStatus,
} from "@/data/admin-data/types";
import {
  approveLocation,
  createAdminLocation,
  fetchAdminLocations,
  rejectLocation,
  reviseLocation,
  type LocationDecision,
} from "@/lib/admin-api";
import { getErrorMessage } from "@/lib/api";
import type { ApiLocation, LocationInput } from "@/lib/locations-api";

interface AdminDataValue {
  providers: Provider[];
  listings: Listing[];
  bookings: Booking[];
  locations: ApiLocation[];
  locationsLoading: boolean;
  locationsError: string;
  destinations: Destination[];
  pending: { providers: number; listings: number; locations: number };
  setProviderStatus: (id: string, status: ProviderStatus) => void;
  setListingStatus: (id: string, status: ListingStatus) => void;
  toggleFeatured: (id: string) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  reloadLocations: () => Promise<void>;
  approveLocation: (id: number) => Promise<LocationDecision>;
  rejectLocation: (id: number, reason?: string) => Promise<LocationDecision>;
  reviseLocation: (id: number) => Promise<void>;
  addLocation: (input: LocationInput, photos: File[]) => Promise<void>;
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

const sourceOf = (location: ApiLocation): Destination["source"] =>
  location.submitterType === "TOURIST" ? "Tourist" : location.submitterType === "PROVIDER" ? "Provider" : "Admin";

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [providers, setProviders] = useState(initialProviders);
  const [listings, setListings] = useState(initialListings);
  const [bookings, setBookings] = useState(initialBookings);
  const [locations, setLocations] = useState<ApiLocation[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [locationsError, setLocationsError] = useState("");

  const reloadLocations = useCallback(async () => {
    try {
      setLocations(await fetchAdminLocations());
      setLocationsError("");
    } catch (error) {
      setLocationsError(getErrorMessage(error));
    } finally {
      setLocationsLoading(false);
    }
  }, []);

  useEffect(() => {
    void reloadLocations();
  }, [reloadLocations]);

  // The server's copy of a location replaces the local one after every action.
  const replaceLocation = useCallback(
    (updated: ApiLocation) => setLocations((items) => items.map((item) => (item.id === updated.id ? updated : item))),
    [],
  );

  const approve = useCallback(
    async (id: number) => {
      const decision = await approveLocation(id);
      replaceLocation(decision.location);
      return decision;
    },
    [replaceLocation],
  );

  const reject = useCallback(
    async (id: number, reason?: string) => {
      const decision = await rejectLocation(id, reason);
      replaceLocation(decision.location);
      return decision;
    },
    [replaceLocation],
  );

  const revise = useCallback(
    async (id: number) => {
      replaceLocation((await reviseLocation(id)).location);
    },
    [replaceLocation],
  );

  const addLocation = useCallback(async (input: LocationInput, photos: File[]) => {
    const created = await createAdminLocation(input, photos);
    setLocations((items) => [created, ...items]);
  }, []);

  const destinations = useMemo(() => {
    const live: Destination[] = locations
      .filter((item) => item.status === "APPROVED")
      .map((item) => ({ name: item.name, district: item.district ?? "", source: sourceOf(item) }));
    const known = new Set(live.map((item) => item.name.toLowerCase()));
    return [...initialDestinations.filter((item) => !known.has(item.name.toLowerCase())), ...live];
  }, [locations]);

  const value = useMemo<AdminDataValue>(
    () => ({
      providers,
      listings,
      bookings,
      locations,
      locationsLoading,
      locationsError,
      destinations,
      pending: {
        providers: providers.filter((item) => item.status === "Pending").length,
        listings: listings.filter((item) => item.status === "Pending").length,
        locations: locations.filter((item) => item.status === "PENDING").length,
      },
      setProviderStatus: (id, status) =>
        setProviders((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      setListingStatus: (id, status) =>
        setListings((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      toggleFeatured: (id) =>
        setListings((items) => items.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))),
      setBookingStatus: (id, status) =>
        setBookings((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      reloadLocations,
      approveLocation: approve,
      rejectLocation: reject,
      reviseLocation: revise,
      addLocation,
    }),
    [providers, listings, bookings, locations, locationsLoading, locationsError, destinations, reloadLocations, approve, reject, revise, addLocation],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used inside AdminDataProvider");
  return context;
}
