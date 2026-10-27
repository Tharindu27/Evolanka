import FinancialsManager from "@/components/dashboards/hotel-owner/FinancialsManager";

interface FinancialsPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerFinancialsPage({ params }: FinancialsPageProps) {
  const { hotelId } = await params;
  return <FinancialsManager />;
}
