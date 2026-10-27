import RoomsPageClient from "@/components/dashboards/hotel-owner/RoomsPageClient";

interface RoomsPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerRoomsPage({ params }: RoomsPageProps) {
  const { hotelId } = await params;
  return <RoomsPageClient hotelId={hotelId} />;
}
