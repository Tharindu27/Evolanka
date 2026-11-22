import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerPropertyIndexPage({ params }: PageProps) {
  const { hotelId } = await params;
  redirect(`/dashboard/hotel-owner/${hotelId}/overview`);
}
