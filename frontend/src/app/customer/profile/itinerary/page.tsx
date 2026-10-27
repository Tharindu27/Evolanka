import Sidebar from '@/components/customer/common/sidebar';
import ItineraryList from '@/components/customer/itinerary/itinerary-list';
import { navigationItems } from '@/data/customer-account-data';

export default function CustomerItineraryPage() {
  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">My Itinerary</h1>
            <p className="brand-page-subtitle mt-2 text-base">Your saved trip plans, optimized into route clusters.</p>

            <ItineraryList />
          </div>
        </main>
      </div>
    </div>
  );
}
