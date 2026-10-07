import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import LocationsHomeContent from '@/components/locations/locations-home-content';
import { categories, places, provinces } from '@/data/location-data/location-mock-data';

export default function LocationsPage() {
  return (
    <div className="bg-white text-[#001a43]">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-32 md:px-12">
        <LocationsHomeContent provinces={provinces} categories={categories} places={places} />

        <section className="mt-24 rounded-2xl border border-[#c3c6d6] bg-[#f8f9fa] p-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="mb-4 text-4xl font-black text-[#001a43]">Share Your Journey</h2>
              <p className="text-[#434654]">
                Have you discovered a hidden gem in Sri Lanka? Contribute your experience and help others explore the
                authentic island lifestyle.
              </p>
            </div>
            <button className="whitespace-nowrap rounded-full bg-[#003d9b] px-8 py-4 font-bold text-white transition-all hover:brightness-110 active:scale-95">
              Post a New Location
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
