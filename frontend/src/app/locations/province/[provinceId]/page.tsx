import { notFound } from 'next/navigation';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import ProvinceContent from '@/components/locations/province-content';
import { getProvinceById, places } from '@/data/location-data/location-mock-data';

type ProvincePageProps = {
  params: Promise<{ provinceId: string }>;
};

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { provinceId } = await params;
  const province = getProvinceById(provinceId);

  if (!province) {
    notFound();
  }

  const provincePlaces = places.filter((place) => place.provinceId === province.id);

  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12">
        <ProvinceContent province={province} places={provincePlaces} />
      </main>
      <Footer />
    </div>
  );
}
