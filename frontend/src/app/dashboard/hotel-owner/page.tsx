import { redirect } from "next/navigation";

export default function HotelOwnerIndexPage() {
  redirect("/dashboard/hotel-owner/listings");
}