import { notFound } from "next/navigation";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import HotelDetailContent from "@/components/hotels/hotel-detail-content";
import { mockHotelDetails } from "@/lib/hotel-detail-logic";

interface Props {
  params: Promise<{ hotelId: string }>;
}

export async function generateStaticParams() {
  return Object.keys(mockHotelDetails).map((id) => ({ hotelId: id }));
}

export async function generateMetadata({ params }: Props) {
  const { hotelId } = await params;
  const hotel = mockHotelDetails[hotelId];
  if (!hotel) return { title: "Hotel Not Found | EVOLANKA" };
  return {
    title: `${hotel.name} | Hotels | EVOLANKA`,
    description: hotel.description.slice(0, 160),
  };
}

export default async function HotelDetailPage({ params }: Props) {
  const { hotelId } = await params;
  const hotel = mockHotelDetails[hotelId];

  if (!hotel) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43] flex flex-col justify-between">
      <Navbar />
      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 pt-28 pb-20 flex-1">
        <HotelDetailContent hotel={hotel} />
      </main>
      <Footer />
    </div>
  );
}

