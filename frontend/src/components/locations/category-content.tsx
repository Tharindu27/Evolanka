'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { Category, Place } from '@/data/location-data/location-mock-data';
import PlaceCard from './place-card';

type CategoryContentProps = {
  category: Category;
  places: Place[];
};

export default function CategoryContent({ category, places }: CategoryContentProps) {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;

  const filtered = useMemo(() => {
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

      <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/70 shadow-[0_24px_60px_rgba(0,26,67,0.18)]">
        <div className="h-[360px] w-full">
          <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#001a43]/95 via-[#001a43]/30 to-[#c9a227]/20" />

        <div className="absolute left-0 top-0 p-5">
          <Link
            href="/locations"
            className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 text-white md:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd977]">Category</p>
          <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">{category.name}</h1>
          <p className="max-w-2xl text-white/90">{category.shortDescription}</p>
        </div>
      </section>

      <section className="relative mx-auto mb-8 max-w-2xl">
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
              placeholder="Search places inside this category..."
              className="w-full border-none bg-transparent text-[#001a43] outline-none placeholder:text-[#6c7387]"
            />
          </div>
        </div>
      </section>

      <section className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Category Places</p>
          <h2 className="text-3xl font-black tracking-tight text-[#001a43]">
            {hasQuery ? 'Places matching your search' : 'Explore Places'}
          </h2>
        </div>
        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#003d9b] shadow-[0_10px_30px_rgba(0,26,67,0.08)]">
          {filtered.length} results
        </span>
      </section>

      {filtered.length > 0 ? (
        <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place, index) => (
            <div
              key={place.id}
              className="animate-[location-rise_560ms_ease-out_both]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <PlaceCard place={place} />
            </div>
          ))}
        </section>
      ) : (
        <section className="mb-6 rounded-[28px] border border-dashed border-[#c7d2ea] bg-white/80 px-6 py-16 text-center shadow-[0_12px_40px_rgba(0,26,67,0.06)]">
          <p className="text-xl font-bold text-[#001a43]">No places found for your search.</p>
          <p className="mt-2 text-[#434654]">Try another city, district, or place name.</p>
        </section>
      )}
    </div>
  );
}