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

  const hasQuery = query.trim().length > 0 || district !== 'all';

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#dfe4f2] bg-[#f4f7fb] px-4 py-8 shadow-[0_30px_90px_rgba(0,26,67,0.08)] sm:px-6 lg:px-10 lg:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-[location-float_12s_ease-in-out_infinite] absolute -left-20 top-10 h-56 w-56 rounded-full bg-[#003d9b]/10 blur-3xl" />
        <div className="animate-[location-float_14s_ease-in-out_infinite] absolute right-0 top-1/3 h-64 w-64 rounded-full bg-[#c9a227]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#003d9b]/25 to-transparent" />
      </div>

      <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/70 shadow-[0_24px_60px_rgba(0,26,67,0.18)]">
        <div className="h-[440px] w-full">
          <img src={province.image} alt={province.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#001a43]/95 via-[#001a43]/30 to-[#c9a227]/20" />

        <div className="absolute left-0 top-0 p-5">
          <Link href="/locations" className="btn-back">
            Back
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 text-white md:p-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd977]">Discover Sri Lanka</p>
          <h1 className="mb-3 text-4xl font-black tracking-tight md:text-5xl">{province.name}</h1>
          <p className="max-w-2xl text-white/90">{province.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              {province.districts.length} districts
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              {province.attractions}
            </span>
          </div>
        </div>
      </section>

      <section className="mb-10 rounded-[28px] border border-[#dce3f1] bg-white/90 p-4 shadow-[0_14px_40px_rgba(0,26,67,0.08)] backdrop-blur md:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_240px]">
          <div className="search-bar-field">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#003d9b]/10 text-[#003d9b]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search attractions..."
              className="search-bar-input"
            />
          </div>
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="rounded-full border border-[#dce3f1] bg-[#f8fbff] px-4 py-3 text-[#001a43] outline-none transition-all duration-300 focus:border-[#003d9b]/35 focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,61,155,0.08)]"
          >
            <option value="all">All Districts</option>
            {province.districts.map((districtName) => (
              <option key={districtName} value={districtName}>
                {districtName}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Province Places</p>
            <h2 className="text-3xl font-black tracking-tight text-[#001a43]">
              {hasQuery ? 'Places matching your filters' : 'Must-Visit Destinations'}
            </h2>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#003d9b] shadow-[0_10px_30px_rgba(0,26,67,0.08)]">
            {filtered.length} results
          </span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place, index) => (
              <div
                key={place.id}
                className="animate-[location-rise_560ms_ease-out_both]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <PlaceCard place={place} backTo={`/locations/province/${province.id}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-[#c7d2ea] bg-white/80 px-6 py-16 text-center shadow-[0_12px_40px_rgba(0,26,67,0.06)]">
            <p className="text-xl font-bold text-[#001a43]">No places found for your filters.</p>
            <p className="mt-2 text-[#434654]">Try another district or search term.</p>
          </div>
        )}
      </section>
    </div>
  );
}