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
  return rentalProviders.map((provider) => ({ rentalId: provider.id }));
}

export async function generateMetadata({ params }: RentalPageProps): Promise<Metadata> {
  const { rentalId } = await params;
  const provider = rentalProviders.find((item) => item.id === rentalId);

  if (!provider) {
    return { title: 'Rental provider not found | EVOLANKA' };
  }

  const hasDetailedInventory = (rentalVehiclesByProvider[rentalId] ?? []).length > 0;

  return {
    title: `${provider.name} Fleet | EVOLANKA`,
    description: hasDetailedInventory
      ? `Explore vehicle options and sample rates from ${provider.name} in ${provider.location}.`
      : `Explore fleet categories from ${provider.name} in ${provider.location}. Contact the provider for vehicle details and rates.`,
  };
}

export default async function RentalProviderPage({ params }: RentalPageProps) {
  const { rentalId } = await params;
  const provider = rentalProviders.find((item) => item.id === rentalId);

  if (!provider) {
    notFound();
  }

  const vehicles = rentalVehiclesByProvider[rentalId] ?? [];

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
