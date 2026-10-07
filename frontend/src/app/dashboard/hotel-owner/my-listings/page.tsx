import type { Metadata } from "next";
import { hotelOwnerListings } from "@/data/hotelOwnerListings";
import MyListingsClient from "./MyListingsClient";

export const metadata: Metadata = {
  title: "My Listings | EvoLanka Provider Hub",
  description:
    "Manage, update, and monitor your listed properties across Sri Lanka",
};

export default function MyListingsPage() {
  return <MyListingsClient listings={hotelOwnerListings} />;
}