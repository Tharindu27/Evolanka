'use client';

import Link from 'next/link';
import { useState } from 'react';

import { getCategoryById, getPlaceById } from '@/data/location-data/location-mock-data';
import { getClusterHotels, hotelSlug } from '@/lib/itinerary';

type RouteClustersProps = {
  startLabel: string;
  startTag: string;
  clusters: string[][];
  addedHotels: string[];
  // When omitted the view is read-only and only the chosen hotels are listed.
  onToggleHotel?: (name: string) => void;
};

const cardClass = 'rounded-[1.5rem] border border-[#dfe8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.06)]';
const eyebrow = 'text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#6d7280]';

function TransitLink() {
  return (
    <div className="flex items-center gap-3 py-4" aria-hidden="true">
      <span className="h-px flex-1 border-t border-dashed border-[#c9d5ea]" />
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6d7280]">↓ Transit link</span>
      <span className="h-px flex-1 border-t border-dashed border-[#c9d5ea]" />
    </div>
  );
}

function ClusterCard({
  number,
  placeIds,
  addedHotels,
  onToggleHotel,
}: {
  number: number;
  placeIds: string[];
  addedHotels: string[];
  onToggleHotel?: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const hotels = getClusterHotels(placeIds);
  const chosen = hotels.filter((hotel) => addedHotels.includes(hotel.name)).slice(0, 1);
  const editable = Boolean(onToggleHotel);
  // Once a hotel is picked it is the only one shown; removing it brings the full list back.
  const visibleHotels = chosen.length > 0 ? chosen : editable ? hotels : [];

  return (
    <section className={cardClass}>
      <span className="inline-flex rounded-md bg-[#001a43] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-white">
        Cluster {number}
      </span>

      <p className={`${eyebrow} mt-5`}>Clustered locations</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {placeIds.map((id, index) => {
          const place = getPlaceById(id);
          if (!place) return null;
          return (
            <Link
              key={id}
              href={`/locations/place/${place.id}`}
              className="flex items-center gap-3 rounded-xl border border-[#dfe8f4] bg-[#f8fafd] p-3 transition hover:bg-[#f1f5ff]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c9d5ea] text-xs font-bold text-[#001a43]">
                {index + 1}
              </span>
              <img src={place.image} alt={place.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-black text-[#001a43]">{place.name}</span>
                <span className="block truncate text-xs text-[#6d7280]">
                  {getCategoryById(place.categoryId)?.name} · {place.district} District
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      {editable ? (
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          className="mt-5 flex w-full items-center justify-between rounded-xl border border-[#dfe8f4] bg-[#f8fafd] px-4 py-3 text-left transition hover:bg-[#f1f5ff]"
        >
          <span className={eyebrow}>
            Nearby hotels ({hotels.length})
            {chosen.length > 0 ? <span className="ml-2 text-[#0b6b3a]">· {chosen[0].name} selected</span> : null}
          </span>
          <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-[#001a43] stroke-2 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      ) : (
        <p className={`${eyebrow} mt-5`}>Selected hotel</p>
      )}

      {!editable && visibleHotels.length === 0 ? <p className="mt-3 text-sm text-[#6d7280]">No hotel selected for this cluster.</p> : null}

      {(editable ? open : true) && visibleHotels.length > 0 ? (
        <div className={`mt-3 grid gap-3 ${chosen.length > 0 ? 'md:grid-cols-1 md:max-w-sm' : 'md:grid-cols-3'}`}>
          {visibleHotels.map((hotel) => {
            const added = addedHotels.includes(hotel.name);
            return (
              <article key={hotel.name} className="flex flex-col rounded-xl border border-[#dfe8f4] bg-white p-3">
                <img src={hotel.image} alt={hotel.name} className="h-24 w-full rounded-lg object-cover" />
                <h4 className="mt-3 text-sm font-black text-[#001a43]">{hotel.name}</h4>
                <p className="mt-0.5 text-xs text-[#6d7280]">Near {hotel.nearPlace}</p>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/hotels/${hotelSlug(hotel.name)}`}
                    className="flex-1 rounded-lg border border-[#dfe7f5] bg-white px-3 py-2 text-center text-xs font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
                  >
                    View
                  </Link>
                  {editable ? (
                    <button
                      type="button"
                      onClick={() => onToggleHotel?.(hotel.name)}
                      className={[
                        'flex-1 rounded-lg px-3 py-2 text-xs font-bold transition',
                        added ? 'border border-[#f3b4b6] bg-white text-[#c4161c] hover:bg-[#fff1f1]' : 'btn-primary text-white hover:text-white',
                      ].join(' ')}
                    >
                      {added ? 'Remove' : 'Add'}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

export default function RouteClusters({ startLabel, startTag, clusters, addedHotels, onToggleHotel }: RouteClustersProps) {
  return (
    <div>
      <section className={cardClass}>
        <span className="inline-flex rounded-md bg-[#001a43] px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.1em] text-white">
          Cluster 1
        </span>
        <h2 className="mt-3 text-xl font-black tracking-[-0.03em] text-[#001a43]">Arrival &amp; Departure Node</h2>

        <div className="mt-4 rounded-xl border border-[#dfe8f4] bg-[#f8fafd] px-4 py-3">
          <p className={eyebrow}>Starting point</p>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-base font-black text-[#001a43]">
            {startLabel}
            <span className="rounded bg-[#e8eef9] px-2 py-0.5 text-[0.65rem] font-bold text-[#001a43]">{startTag}</span>
          </p>
        </div>
      </section>

      {clusters.map((placeIds, index) => (
        <div key={placeIds.join('|')}>
          <TransitLink />
          <ClusterCard number={index + 2} placeIds={placeIds} addedHotels={addedHotels} onToggleHotel={onToggleHotel} />
        </div>
      ))}
    </div>
  );
}
