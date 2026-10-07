import { notFound } from 'next/navigation';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import PlaceDetailContent from '@/components/locations/place-detail-content';
import { getPlaceById } from '@/data/location-data/location-mock-data';

type PlaceDetailPageProps = {
  params: Promise<{ placeId: string }>;
};

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { placeId } = await params;
  const place = getPlaceById(placeId);

  if (!place) {
    notFound();
  }

  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12">
        <PlaceDetailContent place={place} />
      </main>
      <Footer />
    </div>
  );
}
