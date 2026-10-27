import Sidebar from '@/components/customer/common/sidebar';
import ItineraryDetail from '@/components/customer/itinerary/itinerary-detail';
import { navigationItems } from '@/data/customer-account-data';

export default async function CustomerItineraryDetailPage({ params }: { params: Promise<{ itineraryId: string }> }) {
  const { itineraryId } = await params;

  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <ItineraryDetail itineraryId={itineraryId} />
          </div>
        </main>
      </div>
    </div>
  );
}
