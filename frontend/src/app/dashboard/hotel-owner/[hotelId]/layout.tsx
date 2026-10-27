import HotelOwnerShell from "@/components/dashboards/hotel-owner/HotelOwnerShell";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerLayout({
  children,
  params,
}: LayoutProps) {
  const { hotelId } = await params;

  return (
    <HotelOwnerShell hotelId={hotelId}>
      {children}
    </HotelOwnerShell>
  );
}
