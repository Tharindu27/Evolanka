import { notFound } from 'next/navigation';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import CategoryContent from '@/components/locations/category-content';
import { getCategoryById, places } from '@/data/location-data/location-mock-data';

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const category = getCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  const categoryPlaces = places.filter((place) => place.categoryId === category.id);

  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />
      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-24 md:px-12">
        <CategoryContent category={category} places={categoryPlaces} />
      </main>
      <Footer />
    </div>
  );
}
