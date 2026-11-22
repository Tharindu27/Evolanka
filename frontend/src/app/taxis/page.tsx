import Navbar from '@/components/common/navbar';
import TaxiBookingContent from '@/components/taxi/TaxiBookingContent';

export const metadata = {
  title: 'Book a Taxi – EVOLANKA',
  description: 'On-demand taxi booking across Sri Lanka. Fast dispatch, multiple vehicle categories, and real-time map tracking.',
};

export default function TaxisPage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-[#f8fbff] text-[#001a43] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 relative overflow-hidden flex flex-col">
        <TaxiBookingContent />
      </main>
    </div>
  );
}
