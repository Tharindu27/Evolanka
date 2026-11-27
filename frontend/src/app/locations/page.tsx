import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import LocationsHomeContent from '@/components/locations/locations-home-content';
import { categories, provinces } from '@/data/location-data/location-taxonomy';
import { fetchPlaces } from '@/lib/places';

export default async function LocationsPage() {
  const places = await fetchPlaces();

  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12">
        <LocationsHomeContent provinces={provinces} categories={categories} places={places} />
      </main>

      <Footer />
    </div>
  );
}
