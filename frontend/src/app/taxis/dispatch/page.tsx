import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import TaxiDispatchContent from '@/components/taxi/TaxiDispatchContent';

export const metadata = {
  title: 'Driver Dispatch & Timeout Fallback – EVOLANKA',
  description: 'Searching nearest drivers in Sri Lanka with automated timeout and fallback policies.',
};

export default function TaxiDispatchPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43] flex flex-col justify-between">
      <Navbar />
      <main className="pt-24 pb-12 flex-1 flex flex-col justify-center">
        <TaxiDispatchContent />
      </main>
      <Footer />
    </div>
  );
}
