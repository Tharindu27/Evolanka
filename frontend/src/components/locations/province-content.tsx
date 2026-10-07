'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { Place, Province } from '@/data/location-data/location-mock-data';
import PlaceCard from './place-card';

type ProvinceContentProps = {
  province: Province;
  places: Place[];
};

export default function ProvinceContent({ province, places }: ProvinceContentProps) {
  const [query, setQuery] = useState('');
  const [district, setDistrict] = useState('all');

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    return places.filter((place) => {
      const districtMatch = district === 'all' || place.district === district;
      const queryMatch =
        !value ||
        place.name.toLowerCase().includes(value) ||
        place.city.toLowerCase().includes(value) ||
        place.shortDescription.toLowerCase().includes(value);
      return districtMatch && queryMatch;
    });
  }, [places, query, district]);

  return (
    <>
      <section className="relative mb-10 overflow-hidden rounded-2xl">
        <div className="h-[440px] w-full">
          <img src={province.image} alt={province.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute left-0 top-0 p-5">
          <Link href="/locations" className="inline-flex items-center rounded-xl bg-black/50 px-4 py-2 text-sm text-white">
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 text-white md:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]">Discover Sri Lanka</p>
          <h1 className="mb-3 text-5xl font-black">{province.name}</h1>
          <p className="max-w-2xl text-white/90">{province.shortDescription}</p>
        </div>
      </section>

      <section className="mb-16 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px_140px]">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search attractions..."
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#003d9b]/20"
          />
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#003d9b]/20"
          >
            <option value="all">All Districts</option>
            {province.districts.map((districtName) => (
              <option key={districtName} value={districtName}>
                {districtName}
              </option>
            ))}
          </select>
          <button type="button" className="rounded-xl bg-[#003d9b] px-4 py-3 font-semibold text-white">
            Explore
          </button>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-2 text-4xl font-black text-[#001a43]">Must-Visit Destinations</h2>
        <p className="mb-8 text-[#434654]">Filtered results inside {province.name}.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </>
  );
}
