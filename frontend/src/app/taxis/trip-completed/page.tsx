import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import TaxiTripCompletedContent from '@/components/taxi/TaxiTripCompletedContent';

export const metadata = {
  title: 'Trip Completed & Payment – EVOLANKA',
  description: 'Review your ride summary, fare breakdown, and submit driver ratings on EVOLANKA.',
};

export default function TaxiTripCompletedPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43] flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
        <TaxiTripCompletedContent />
      </main>
      <Footer />
    </div>
  );
}
