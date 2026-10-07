'use client';

import { useMemo, useState } from 'react';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import FilterSection from '@/components/hotels/filter-section';
import HotelCard from '@/components/hotels/hotel-card';
import { filterGroups, hotels, categories } from '@/components/hotels/hotel-data';
import SearchBar from '@/components/hotels/search-bar';

export default function HotelsPage() {
  const [destination, setDestination] = useState('');
  const [activeCategory, setActiveCategory] = useState('Luxury Resorts');
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(filterGroups.filter((group) => group.initiallyOpen).map((group) => group.title)),
  );

  const filteredHotels = useMemo(() => {
    const destinationQuery = destination.trim().toLowerCase();
    return hotels.filter((hotel) => {
      const matchesDestination = !destinationQuery || `${hotel.name} ${hotel.location}`.toLowerCase().includes(destinationQuery);
      return matchesDestination && hotel.categories.includes(activeCategory);
    });
  }, [activeCategory, destination]);

  const toggleFilter = (option: string) => {
    setSelectedFilters((current) => {
      const next = new Set(current);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  };

  const toggleGroup = (title: string) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#001a43]">
      <Navbar />
      <div className="pt-24">
        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#001a43] md:text-5xl">Find Your Perfect Stay in Sri Lanka</h1>
            <p className="max-w-[32rem] text-base leading-6 text-[#434654]">Discover a handpicked collection of the finest hotels, boutique villas, and scenic retreats across the island.</p>
          </div>
        </section>

        <section className="relative z-20 mx-auto -mt-4 max-w-[1440px] px-6 md:px-12">
          <SearchBar destination={destination} onDestinationChange={setDestination} />
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-12 md:px-12">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-6 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${activeCategory === category ? 'border-[#003d9b] bg-[#003d9b] text-white' : 'border-[#c3c6d6] bg-[#f8f9fa] text-[#434654] hover:text-[#003d9b]'}`}>
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 pb-24 md:flex-row md:px-12">
          <aside className="w-full shrink-0 md:w-80">
            <div className="rounded-xl border border-[#c3c6d6]/50 bg-white p-6 shadow-sm md:sticky md:top-24 md:max-h-[calc(100vh-120px)] md:overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#001a43]">Filters</h2>
                <button type="button" onClick={() => setSelectedFilters(new Set())} className="text-xs font-bold uppercase tracking-widest text-[#003d9b] hover:underline">Clear all</button>
              </div>
              <div className="space-y-4">
                {filterGroups.map((group) => (
                  <FilterSection key={group.title} group={group} open={openGroups.has(group.title)} onToggle={() => toggleGroup(group.title)} selected={selectedFilters} onSelect={toggleFilter} />
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {filteredHotels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {filteredHotels.map((hotel) => <HotelCard key={hotel.name} hotel={hotel} />)}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#c3c6d6] p-12 text-center">
                <span className="material-symbols-outlined mb-3 text-4xl text-[#8b90a0]">travel_explore</span>
                <h2 className="text-xl font-bold text-[#001a43]">No stays found</h2>
                <p className="mt-2 text-[#434654]">Try another destination or choose a different stay category.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
