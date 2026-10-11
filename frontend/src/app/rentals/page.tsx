import type { Metadata } from 'next';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import RentalCard from '@/components/rentals/rental-card';
import RentalPagination from '@/components/rentals/rental-pagination';
import RentalSearchForm from '@/components/rentals/rental-search-form';
import { rentalProviders } from '@/data/rentals';
import { readRentalFilters, searchRentals } from '@/lib/rentals';

export const metadata: Metadata = {
  title: 'Rental Vehicle Services in Sri Lanka | EVOLANKA',
  description: 'Browse trusted vehicle rental providers across Sri Lanka by province, district or name.',
};

export default async function RentalsPage({ searchParams }: PageProps<'/rentals'>) {
  const filters = readRentalFilters(await searchParams);
  const { results, total, page, pageCount } = searchRentals(rentalProviders, filters);

  return (
    <div className="bg-white text-[#041b3c]">
      <Navbar active="/rentals" />

      <main className="mx-auto min-h-screen max-w-[1280px] px-6 pb-12 pt-28 md:px-12">
        <section className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Rental Vehicle Services in Sri Lanka
          </h1>
          <p className="max-w-2xl text-slate-700">
            Explore the island at your own pace. From premium SUVs for hill country adventures to agile scooters
            for coastal cruising, discover the most reliable fleets across Sri Lanka.
          </p>
        </section>

        <RentalSearchForm filters={filters} />

        <p role="status" className="mb-6 text-sm font-semibold text-[#434654]">
          {total} {total === 1 ? 'provider' : 'providers'} found
        </p>

        {results.length > 0 ? (
          <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {results.map((provider) => (
              <RentalCard key={provider.id} provider={provider} />
            ))}
          </section>
        ) : (
          <div className="rounded-xl border border-dashed border-[#c3c6d6] bg-white p-12 text-center">
            <h2 className="text-xl font-bold">No providers match your search</h2>
            <p className="mt-2 text-[#434654]">Try a different province or district, or clear the filters.</p>
          </div>
        )}

        <RentalPagination filters={filters} page={page} pageCount={pageCount} />
      </main>

      <Footer />
    </div>
  );
}
