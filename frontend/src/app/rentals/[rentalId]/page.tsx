import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import RentalProviderDetail from '@/components/rentals/rental-provider-detail';
import { rentalProviders, rentalVehiclesByProvider } from '@/data/rentals';

type RentalPageProps = {
  params: Promise<{ rentalId: string }>;
};

export function generateStaticParams() {
  return Object.keys(rentalVehiclesByProvider).map((rentalId) => ({ rentalId }));
}

export async function generateMetadata({ params }: RentalPageProps): Promise<Metadata> {
  const { rentalId } = await params;
  const provider = rentalProviders.find((item) => item.id === rentalId);

  if (!provider || !rentalVehiclesByProvider[rentalId]) {
    return { title: 'Rental provider not found | EVOLANKA' };
  }

  return {
    title: `${provider.name} Fleet | EVOLANKA`,
    description: `Explore vehicle options and sample rates from ${provider.name} in ${provider.location}.`,
  };
}

export default async function RentalProviderPage({ params }: RentalPageProps) {
  const { rentalId } = await params;
  const provider = rentalProviders.find((item) => item.id === rentalId);
  const vehicles = rentalVehiclesByProvider[rentalId];

  if (!provider || !vehicles) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43]">
      <Navbar />
      <main>
        <RentalProviderDetail provider={provider} vehicles={vehicles} />
      </main>
      <Footer />
    </div>
  );
}
