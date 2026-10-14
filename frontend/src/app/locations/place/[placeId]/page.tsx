import { notFound } from 'next/navigation';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import PlaceDetailContent from '@/components/locations/place-detail-content';
import { getPlaceById } from '@/data/location-data/location-mock-data';

type PlaceDetailPageProps = {
  params: Promise<{ placeId: string }>;
  searchParams?: Promise<{ from?: string }>;
};

export default async function PlaceDetailPage({ params, searchParams }: PlaceDetailPageProps) {
  const { placeId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const place = getPlaceById(placeId);

  if (!place) {
    notFound();
  }

  const backHref = resolvedSearchParams.from || '/locations';

  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12">
        <PlaceDetailContent place={place} backHref={backHref} />
      </main>
      <Footer />
    </div>
  );
}
