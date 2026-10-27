import PropertySettingsManager from "@/components/dashboards/hotel-owner/PropertySettingsManager";

interface SettingsPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerSettingsPage({ params }: SettingsPageProps) {
  const { hotelId } = await params;
  return <PropertySettingsManager />;
}
