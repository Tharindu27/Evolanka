import type { Metadata } from 'next';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import RentalDirectory from '@/components/rentals/rental-directory';

export const metadata: Metadata = {
  title: 'Vehicle Rentals in Sri Lanka | EVOLANKA',
  description: 'Explore trusted rental fleets across Sri Lanka and find a vehicle for your next journey.',
};

export default function RentalsPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43]">
      <Navbar />
      <main>
        <RentalDirectory />
      </main>
      <Footer />
    </div>
  );
}
