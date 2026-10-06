import type { Metadata } from 'next';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import GuideCard from '@/components/tour-guides/guide-card';
import GuideSearchForm from '@/components/tour-guides/guide-search-form';
import { guideImages } from '@/data/tour-guide-images';
import { tourGuides } from '@/data/tour-guides';
import { readFilters, searchGuides, todayKey } from '@/lib/tour-guides';

export const metadata: Metadata = {
  title: 'Find a Local Expert | EVOLANKA Tour Guides',
  description: 'Browse vetted Sri Lankan tour guides by date, language, specialization and district.',
};

export default async function TourGuidesPage({ searchParams }: PageProps<'/tour-guides'>) {
  const today = todayKey();
  const filters = readFilters(await searchParams, today);
  const { results, unavailableCount } = searchGuides(tourGuides, filters, today);

  return (
    <div className="bg-[#f9f9ff] text-[#041b3c]">
      <Navbar active="/tour-guides" />

      <main className="mx-auto max-w-[1280px] px-6 pb-20 pt-24 md:px-12">
        <section className="relative mb-12 h-[400px] overflow-hidden rounded-xl shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={guideImages.listingHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-6 max-w-2xl md:bottom-12 md:left-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">Find Your Local Expert</h1>
            <p className="leading-relaxed text-white/90">
              Unlock the secrets of Sri Lanka with our curated network of vetted professional tour guides. From
              heritage site specialists to wildlife experts, find a companion who speaks your language and shares
              your passion.
            </p>
          </div>
        </section>

        <div className="mb-12">
          <GuideSearchForm filters={filters} today={today} />
        </div>

        <p role="status" className="mb-6 text-sm font-semibold text-[#434654]">
          {results.length} {results.length === 1 ? 'guide' : 'guides'} found
          {filters.start && filters.end && (
            <>
              {' '}
              for {filters.start === filters.end ? filters.start : `${filters.start} \u2192 ${filters.end}`}
            </>
          )}
          {unavailableCount > 0 && (
            <span className="font-normal text-[#737685]">
              {' '}
              · {unavailableCount} more {unavailableCount === 1 ? 'guide is' : 'guides are'} booked for these dates
            </span>
          )}
        </p>

        {results.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {results.map((guide) => (
              <GuideCard key={guide.id} guide={guide} filters={filters} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#c3c6d6] bg-white p-12 text-center">
            <h2 className="text-xl font-bold">No guides match your search</h2>
            <p className="mt-2 text-[#434654]">Try different dates or remove a few filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
