'use client';

import Link from 'next/link';

import RouteClusters from '@/components/trip-plan/route-clusters';
import { describeDates, getStartPoint, useItineraries } from '@/lib/itinerary';

export default function ItineraryDetail({ itineraryId }: { itineraryId: string }) {
  const itineraries = useItineraries();

  if (itineraries === null) return <p className="mt-10 text-sm text-[#6d7280]">Loading itinerary…</p>;

  const itinerary = itineraries.find((item) => item.id === itineraryId);

  if (!itinerary) {
    return (
      <div className="mt-8 rounded-[1.5rem] border border-dashed border-[#c9d5ea] bg-white px-6 py-14 text-center">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">Itinerary not found</h2>
        <Link href="/customer/profile/itinerary" className="mt-4 inline-flex text-sm font-semibold text-[#0d4abe] hover:underline">
          Back to My Itinerary
        </Link>
      </div>
    );
  }

  const startPoint = getStartPoint(itinerary.inSriLanka);
  const stopCount = itinerary.clusters.flat().length;

  return (
    <div>
      <Link href="/customer/profile/itinerary" className="text-sm font-semibold text-[#0d4abe] hover:underline">
        ← Back to My Itinerary
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">{itinerary.name}</h1>
          <p className="brand-page-subtitle mt-2 text-base">
            {describeDates(itinerary)} · {stopCount} {stopCount === 1 ? 'stop' : 'stops'} · {itinerary.clusters.length}{' '}
            {itinerary.clusters.length === 1 ? 'cluster' : 'clusters'}
          </p>
        </div>

        <Link
          href={`/trip-plan?edit=${itinerary.id}`}
          className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition hover:text-white"
        >
          Edit
        </Link>
      </div>

      <div className="mt-8">
        <RouteClusters
          startLabel={startPoint.label}
          startTag={startPoint.tag}
          clusters={itinerary.clusters}
          addedHotels={itinerary.hotels}
        />
      </div>
    </div>
  );
}
