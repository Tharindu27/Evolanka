import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import { ArrowLeftIcon } from '@/components/guides/icons';
import FleetFilterPanel from '@/components/rentals/fleet-filter-panel';
import VehicleCard from '@/components/rentals/vehicle-card';
import { vehiclesFor } from '@/data/rental-vehicles';
import { getRentalProvider } from '@/data/rentals';
import { filterVehicles, readFleetFilters, rentalDays } from '@/lib/rental-vehicles';
import { todayKey } from '@/lib/tour-guides';

export async function generateMetadata({ params }: PageProps<'/rentals/[rentalId]'>): Promise<Metadata> {
  const provider = getRentalProvider((await params).rentalId);
  if (!provider) return { title: 'Provider not found | EVOLANKA' };
  return { title: `${provider.name} Fleet | EVOLANKA`, description: provider.description };
}

export default async function RentalFleetPage({ params, searchParams }: PageProps<'/rentals/[rentalId]'>) {
  const provider = getRentalProvider((await params).rentalId);
  if (!provider) notFound();

  const today = todayKey();
  const filters = readFleetFilters(await searchParams, today);
  const fleet = vehiclesFor(provider.id);
  const vehicles = filterVehicles(fleet, filters);
  const days = filters.from && filters.to ? rentalDays(filters.from, filters.to) : undefined;

  return (
    <div className="bg-white text-[#041b3c]">
      <Navbar active="/rentals" />

      <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-12 pt-28 md:px-12">
        <Link
          href="/rentals"
          className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#003d9b] hover:underline"
        >
          <ArrowLeftIcon width={16} height={16} /> All rental providers
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row">
          <FleetFilterPanel providerId={provider.id} filters={filters} today={today} />

          <section className="min-w-0 flex-1">
            <header className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight">Fleet of {provider.name}</h1>
              <p className="text-lg text-[#434654]">Choose from our premium selection of vehicles for your journey.</p>
            </header>

            <p role="status" className="mb-6 text-sm font-semibold text-[#434654]">
              {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'} found
              {days !== undefined && filters.from && filters.to && ` for ${filters.from} \u2192 ${filters.to}`}
            </p>

            {vehicles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} days={days} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#c3c6d6] p-12 text-center">
                <h2 className="text-xl font-bold">
                  {fleet.length === 0 ? 'No vehicles listed yet' : 'No vehicles match your filters'}
                </h2>
                <p className="mt-2 text-[#434654]">
                  {fleet.length === 0
                    ? 'This provider hasn\u2019t published its fleet yet.'
                    : 'Try a different vehicle type or clear a few filters.'}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
