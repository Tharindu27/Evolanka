'use client';

import Link from 'next/link';

import { formatDate, useItineraries } from '@/lib/itinerary';

export default function ItineraryList() {
  const itineraries = useItineraries();

  if (itineraries === null) return <p className="mt-10 text-sm text-[#6d7280]">Loading your itineraries…</p>;

  if (itineraries.length === 0) {
    return (
      <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#c9d5ea] bg-white px-6 py-14 text-center">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">No itineraries yet</h2>
        <p className="mt-2 text-sm text-[#6d7280]">Plan a trip and save it to see it here.</p>
        <Link href="/trip-plan" className="btn-primary mt-5 inline-flex rounded-full px-6 py-2.5 text-sm font-bold text-white hover:text-white">
          Plan a trip
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2">
      {itineraries.map((itinerary) => {
        const stopCount = itinerary.clusters.flat().length;
        const flexible = itinerary.timing === 'flexible';

        return (
          <Link
            key={itinerary.id}
            href={`/customer/profile/itinerary/${itinerary.id}`}
            className="group rounded-[1.5rem] border border-[#dfe4f2] bg-white p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(0,26,67,0.1)]"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">{itinerary.name}</h2>
              {flexible ? (
                <span className="shrink-0 rounded-full bg-[#fbf3d9] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[#8a6d0f]">
                  Flexible
                </span>
              ) : null}
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-[#6d7280]">{flexible ? 'Dates' : 'Start date'}</dt>
                <dd className="font-semibold text-[#001a43]">
                  {flexible ? 'Flexible dates' : formatDate(itinerary.startDate) || 'Not set'}
                </dd>
              </div>
              {flexible ? null : (
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-[#6d7280]">End date</dt>
                  <dd className="font-semibold text-[#001a43]">{formatDate(itinerary.endDate) || 'Not set'}</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-[#6d7280]">Route</dt>
                <dd className="font-semibold text-[#001a43]">
                  {stopCount} {stopCount === 1 ? 'stop' : 'stops'} · {itinerary.clusters.length}{' '}
                  {itinerary.clusters.length === 1 ? 'cluster' : 'clusters'}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-[#a28116]">View details →</p>
          </Link>
        );
      })}
    </div>
  );
}
