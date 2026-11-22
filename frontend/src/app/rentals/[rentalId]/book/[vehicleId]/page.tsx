import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import VehicleBooking from '@/components/rentals/vehicle-booking';
import { rentalProviders, rentalVehiclesByProvider } from '@/data/rentals';

type VehicleBookingPageProps = {
  params: Promise<{ rentalId: string; vehicleId: string }>;
};

function findBookingSelection(rentalId: string, vehicleId: string) {
  const provider = rentalProviders.find((item) => item.id === rentalId);
  const vehicle = rentalVehiclesByProvider[rentalId]?.find((item) => item.id === vehicleId);

  return provider && vehicle ? { provider, vehicle } : null;
}

export function generateStaticParams() {
  return Object.entries(rentalVehiclesByProvider).flatMap(([rentalId, vehicles]) =>
    vehicles.map((vehicle) => ({ rentalId, vehicleId: vehicle.id })),
  );
}

export async function generateMetadata({ params }: VehicleBookingPageProps): Promise<Metadata> {
  const { rentalId, vehicleId } = await params;
  const selection = findBookingSelection(rentalId, vehicleId);

  return {
    title: selection
      ? `Book ${selection.vehicle.name} | EVOLANKA`
      : 'Vehicle booking not found | EVOLANKA',
    description: selection
      ? `Choose your dates and review the estimated rental total for ${selection.vehicle.name} from ${selection.provider.name}.`
      : 'The requested rental vehicle could not be found.',
  };
}

export default async function VehicleBookingPage({ params }: VehicleBookingPageProps) {
  const { rentalId, vehicleId } = await params;
  const selection = findBookingSelection(rentalId, vehicleId);

  if (!selection) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43]">
      <Navbar />
      <main>
        <VehicleBooking provider={selection.provider} vehicle={selection.vehicle} />
      </main>
      <Footer />
    </div>
  );
}
