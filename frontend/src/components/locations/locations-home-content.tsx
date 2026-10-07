'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { Category, Place, Province } from '@/data/location-data/location-mock-data';
import PlaceCard from './place-card';

type LocationsHomeContentProps = {
  provinces: Province[];
  categories: Category[];
  places: Place[];
};

export default function LocationsHomeContent({ provinces, categories, places }: LocationsHomeContentProps) {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;

  const filteredPlaces = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return places;
    }

    return places.filter((place) => {
      return (
        place.name.toLowerCase().includes(value) ||
        place.city.toLowerCase().includes(value) ||
        place.district.toLowerCase().includes(value)
      );
    });
  }, [places, query]);

{/* main location page description */}

  return (
    <>
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tight text-[#001a43] md:text-5xl">
          Discover Sri Lanka, Place by Place
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#434654] md:text-lg">
          Explore the unique charm and heritage of every district. From mist-covered tea estates to sun-drenched
          coastal forts, find your next destination through local eyes.
        </p>
      </section>



{/* search bar for filtering places by name, city, or district */}

      <section className="relative mx-auto mb-16 max-w-xl">
        <div className="flex items-center rounded-full border border-[#c3c6d6] bg-[#f8f9fa] px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-[#003d9b]/20">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by place name, city or district..."
            className="w-full border-none bg-transparent text-[#001a43] outline-none placeholder:text-[#434654]"
          />
          <button type="button" className="rounded-full bg-[#003d9b] px-4 py-2 text-sm font-bold text-white">
            Search
          </button>
        </div>
      </section>

{/* province section */}
      {!hasQuery ? (
        <>
          <section className="mb-16">
            <h2 className="mb-8 text-[28px] font-bold text-[#001a43]">Explore by Province</h2>
            <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-4">
              {provinces.map((province) => (
                <Link
                  key={province.id}
                  href={`/locations/province/${province.id}`}
                  className="group relative block h-80 w-64 flex-none overflow-hidden rounded-2xl"
                >
                  <img
                    src={province.image}
                    alt={province.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <p className="mb-1 text-xl font-bold text-white">{province.name.replace(' Province', '')}</p>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-white/90">{province.districts.length} Districts</span>
                      <span className="text-xs font-medium text-white/90">{province.attractions}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

{/* category section */}
          <section className="mb-20">
            <div className="mb-10">
              <h2 className="mb-2 text-[28px] font-bold text-[#001a43]">Discover by Category</h2>
              <p className="text-[#434654]">Explore Sri Lanka&apos;s diverse attractions curated by interest.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {categories.map((category) => (
                <Link key={category.id} href={`/locations/category/${category.id}`} className="group relative block h-64 overflow-hidden rounded-2xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <span className="text-2xl font-bold tracking-tight text-white">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>

      ) : ( 
        <section className="mb-20">
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#434654]">No places found for your search.</p>
          )}
        </section>
      )}
    </>
  );
}
