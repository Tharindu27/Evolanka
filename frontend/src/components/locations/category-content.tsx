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
    <>
      <section className="relative mb-10 overflow-hidden rounded-2xl">
        <div className="h-[360px] w-full">
          <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        <div className="absolute left-0 top-0 p-5">
          <Link href="/locations" className="inline-flex items-center rounded-xl bg-black/50 px-4 py-2 text-sm text-white">
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 text-white md:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]">Category</p>
          <h1 className="mb-3 text-5xl font-black">{category.name}</h1>
          <p className="max-w-2xl text-white/90">{category.shortDescription}</p>
        </div>
      </section>



      <section className="mb-10 max-w-xl">
        <div className="flex items-center rounded-full border border-[#c3c6d6] bg-[#f8f9fa] px-6 py-4 transition-all focus-within:ring-2 focus-within:ring-[#003d9b]/20">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search places inside this category..."
            className="w-full border-none bg-transparent text-[#001a43] outline-none placeholder:text-[#434654]"
          />
          <button type="button" className="rounded-full bg-[#003d9b] px-4 py-2 text-sm font-bold text-white">
            Search
          </button>
        </div>
      </section>



      <section className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </section>
    </>
  );
}
