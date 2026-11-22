import PackagesManager from "@/components/dashboards/hotel-owner/PackagesManager";

interface PackagesPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerPackagesPage({ params }: PackagesPageProps) {
  const { hotelId } = await params;
  return <PackagesManager hotelId={hotelId} />;
}
