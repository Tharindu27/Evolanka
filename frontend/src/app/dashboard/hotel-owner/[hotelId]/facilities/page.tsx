import FacilitiesManager from "@/components/dashboards/hotel-owner/FacilitiesManager";

interface FacilitiesPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerFacilitiesPage({ params }: FacilitiesPageProps) {
  const { hotelId } = await params;
  return <FacilitiesManager hotelId={hotelId} />;
}
