import type { Metadata } from "next";
import { hotelOwnerListings } from "@/data/hotelOwnerListings";
import MyListingsClient from "./my-listings/MyListingsClient";

export const metadata: Metadata = {
  title: "My Listings | EvoLanka Provider Hub",
};

export default function MyListingsPage() {
  return <MyListingsClient listings={hotelOwnerListings} />;
}