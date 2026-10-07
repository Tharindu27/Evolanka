import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import AccommodationsSection from '@/components/hotels/showcase/accommodations-section';
import AmenitiesSection from '@/components/hotels/showcase/amenities-section';
import HeritageSection from '@/components/hotels/showcase/heritage-section';
import LocationSection from '@/components/hotels/showcase/location-section';
import ShowcaseHero from '@/components/hotels/showcase/showcase-hero';
import { getHotelDetail, hotels } from '@/components/hotels/hotel-data';

type HotelPageProps = {
  params: Promise<{ hotelId: string }>;
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({
    hotelId: hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { hotelId } = await params;
  const hotel = getHotelDetail(hotelId);
  return { title: `${hotel.name} | EvoLanka Hotels`, description: hotel.tagline };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { hotelId } = await params;
  const knownHotel = hotels.some((hotel) => hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hotelId);
  if (!knownHotel) notFound();

  const hotel = getHotelDetail(hotelId);

  return (
    <main className="min-h-screen bg-white text-[#001a43]">
      <Navbar />
      <div className="pt-20">
        <ShowcaseHero hotel={hotel} />
        <HeritageSection hotel={hotel} />
        <AccommodationsSection hotel={hotel} />
        <AmenitiesSection hotel={hotel} />
        <LocationSection hotel={hotel} />
      </div>
      <Footer />
    </main>
  );
}
