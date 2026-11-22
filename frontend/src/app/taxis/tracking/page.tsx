import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import TaxiTrackingContent from '@/components/taxi/TaxiTrackingContent';

export const metadata = {
  title: 'Live Taxi Tracking – EVOLANKA',
  description: 'Track your assigned driver and vehicle live on the route to pickup in Sri Lanka.',
};

export default function TaxiTrackingPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43] flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-12 flex-1">
        <TaxiTrackingContent />
      </main>
      <Footer />
    </div>
  );
}
