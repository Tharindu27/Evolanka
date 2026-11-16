"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { bookings as initialBookings } from "@/data/admin-data/bookings";
import { listings as initialListings } from "@/data/admin-data/listings";
import { initialDestinations, locationRequests as initialRequests } from "@/data/admin-data/locations";
import { providers as initialProviders } from "@/data/admin-data/providers";
import type {
  Booking,
  BookingStatus,
  Destination,
  Listing,
  ListingStatus,
  LocationRequest,
  Provider,
  ProviderStatus,
} from "@/data/admin-data/types";

interface AdminDataValue {
  providers: Provider[];
  listings: Listing[];
  bookings: Booking[];
  locationRequests: LocationRequest[];
  destinations: Destination[];
  pending: { providers: number; listings: number; locations: number };
  setProviderStatus: (id: string, status: ProviderStatus) => void;
  setListingStatus: (id: string, status: ListingStatus) => void;
  toggleFeatured: (id: string) => void;
  setBookingStatus: (id: string, status: BookingStatus) => void;
  reviewLocationRequest: (id: string, status: "Approved" | "Rejected") => void;
  submitLocation: (request: Omit<LocationRequest, "id" | "submittedOn" | "status">) => boolean;
  addDestination: (name: string, district: string) => boolean;
}

const AdminDataContext = createContext<AdminDataValue | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [providers, setProviders] = useState(initialProviders);
  const [listings, setListings] = useState(initialListings);
  const [bookings, setBookings] = useState(initialBookings);
  const [locationRequests, setLocationRequests] = useState(initialRequests);
  const [destinations, setDestinations] = useState(initialDestinations);

  const addDestination = useCallback(
    (name: string, district: string, source: Destination["source"] = "Admin") => {
      const exists = destinations.some((item) => item.name.toLowerCase() === name.toLowerCase());
      if (exists) return false;
      setDestinations((items) => [...items, { name, district, source }]);
      return true;
    },
    [destinations],
  );

  const reviewLocationRequest = useCallback(
    (id: string, status: "Approved" | "Rejected") => {
      const request = locationRequests.find((item) => item.id === id);
      if (!request) return;
      setLocationRequests((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
      if (status === "Approved") addDestination(request.name, request.district, "Tourist");
    },
    [locationRequests, addDestination],
  );

  const submitLocation = useCallback(
    (request: Omit<LocationRequest, "id" | "submittedOn" | "status">) => {
      const exists = destinations.some((item) => item.name.toLowerCase() === request.name.toLowerCase());
      if (exists) return false;
      const today = new Date().toISOString().slice(0, 10);
      const entry: LocationRequest = {
        ...request,
        id: `LC-${String(Date.now()).slice(-6)}`,
        submittedOn: today,
        status: "Approved",
      };
      setLocationRequests((items) => [entry, ...items]);
      addDestination(request.name, request.district, "Admin");
      return true;
    },
    [destinations, addDestination],
  );

  const value = useMemo<AdminDataValue>(
    () => ({
      providers,
      listings,
      bookings,
      locationRequests,
      destinations,
      pending: {
        providers: providers.filter((item) => item.status === "Pending").length,
        listings: listings.filter((item) => item.status === "Pending").length,
        locations: locationRequests.filter((item) => item.status === "Pending").length,
      },
      setProviderStatus: (id, status) =>
        setProviders((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      setListingStatus: (id, status) =>
        setListings((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      toggleFeatured: (id) =>
        setListings((items) => items.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))),
      setBookingStatus: (id, status) =>
        setBookings((items) => items.map((item) => (item.id === id ? { ...item, status } : item))),
      reviewLocationRequest,
      submitLocation,
      addDestination: (name, district) => addDestination(name, district),
    }),
    [providers, listings, bookings, locationRequests, destinations, reviewLocationRequest, submitLocation, addDestination],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) throw new Error("useAdminData must be used inside AdminDataProvider");
  return context;
}
