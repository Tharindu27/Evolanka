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

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#dfe4f2] bg-[#f4f7fb] px-4 py-8 shadow-[0_30px_90px_rgba(0,26,67,0.08)] sm:px-6 lg:px-10 lg:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-[location-float_12s_ease-in-out_infinite] absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#003d9b]/10 blur-3xl" />
        <div className="animate-[location-float_14s_ease-in-out_infinite] absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#c9a227]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#003d9b]/25 to-transparent" />
      </div>

      <section className="relative mb-12 overflow-hidden rounded-[28px] border border-white/70 bg-gradient-to-r from-[#001a43] via-[#003d9b] to-[#0d4bb8] px-6 py-10 text-white shadow-[0_24px_60px_rgba(0,61,155,0.22)] sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(201,162,39,0.22),transparent_30%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="animate-[location-rise_700ms_ease-out_both]">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/90 backdrop-blur">
              Explore Sri Lanka
            </span>
            <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Discover Sri Lanka, Place by Place
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Explore the unique charm and heritage of every district. From mist-covered tea estates to sun-drenched
              coastal forts, find your next destination through local eyes.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <div className="animate-[location-rise_700ms_ease-out_120ms_both] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Provinces</p>
              <p className="mt-2 text-3xl font-black">{provinces.length}</p>
            </div>
            <div className="animate-[location-rise_700ms_ease-out_240ms_both] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Categories</p>
              <p className="mt-2 text-3xl font-black">{categories.length}</p>
            </div>
            <div className="animate-[location-rise_700ms_ease-out_360ms_both] rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Places</p>
              <p className="mt-2 text-3xl font-black">{places.length}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto mb-12 max-w-2xl">
        <div className="rounded-full border border-[#d6dcef] bg-white/90 p-2 shadow-[0_16px_45px_rgba(0,26,67,0.08)] backdrop-blur">
          <div className="flex items-center gap-3 rounded-full border border-[#dce3f1] bg-[#f8fbff] px-5 py-4 transition-all duration-300 focus-within:border-[#003d9b]/35 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(0,61,155,0.08)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003d9b]/10 text-[#003d9b]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by place name, city or district..."
              className="w-full border-none bg-transparent text-[#001a43] outline-none placeholder:text-[#6c7387]"
            />
          </div>
        </div>
      </section>

      {!hasQuery ? (
        <div className="space-y-12">
          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Top Provinces</p>
                <h2 className="text-3xl font-black tracking-tight text-[#001a43]">Explore by Province</h2>
              </div>
              <span className="hidden text-sm font-medium text-[#434654] sm:block">Swipe to browse</span>
            </div>

            <div className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {provinces.map((province, index) => (
                <Link
                  key={province.id}
                  href={`/locations/province/${province.id}`}
                  className="group relative block h-[20rem] w-[16rem] flex-none overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_18px_50px_rgba(0,26,67,0.12)] transition-transform duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <img
                    src={province.image}
                    alt={province.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/95 via-[#001a43]/25 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#ffd977]">Province</p>
                    <p className="mt-2 text-2xl font-black leading-tight">{province.name.replace(' Province', '')}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {province.districts.length} districts
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {province.attractions}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>


          <section>
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Browse Categories</p>
              <h2 className="text-3xl font-black tracking-tight text-[#001a43]">Discover by Category</h2>
              <p className="mt-3 max-w-2xl text-[#434654]">
                Explore Sri Lanka&apos;s diverse attractions curated by interest, from heritage sites to beach escapes.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/locations/category/${category.id}`}
                  className="group relative block min-h-64 overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_18px_50px_rgba(0,26,67,0.10)] transition-transform duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#001a43]/95 via-[#001a43]/30 to-[#c9a227]/20 transition-opacity duration-500 group-hover:opacity-95" />
                  <div className="relative flex h-full flex-col justify-end p-6 text-white">
                    <h3 className="mt-4 text-3xl font-black tracking-tight">{category.name}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">{category.shortDescription}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ffd977] transition-transform duration-300 group-hover:translate-x-1">
                      Explore now
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <section className="mb-4">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Search Results</p>
              <h2 className="text-3xl font-black tracking-tight text-[#001a43]">Places matching your search</h2>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#003d9b] shadow-[0_10px_30px_rgba(0,26,67,0.08)]">
              {filteredPlaces.length} results
            </span>
          </div>

          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPlaces.map((place, index) => (
                <div key={place.id} className="animate-[location-rise_560ms_ease-out_both]" style={{ animationDelay: `${index * 80}ms` }}>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-[#c7d2ea] bg-white/80 px-6 py-16 text-center shadow-[0_12px_40px_rgba(0,26,67,0.06)]">
              <p className="text-xl font-bold text-[#001a43]">No places found for your search.</p>
              <p className="mt-2 text-[#434654]">Try another city, district, or place name.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}