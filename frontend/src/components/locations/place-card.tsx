import Link from 'next/link';

import type { Place } from '@/data/location-data/location-mock-data';

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/locations/place/${place.id}`} className="group block">
      <article className="overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(0,26,67,0.11)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,26,67,0.18)]">
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/92 via-[#001a43]/25 to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            {place.district}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
            <p className="line-clamp-1 text-xl font-black tracking-tight text-white">{place.name}</p>
            <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-semibold text-[#ffd977] backdrop-blur">
              View
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-b from-white to-[#f7f9fc] p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-[#4e5568]">{place.shortDescription}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#003d9b] transition-transform duration-300 group-hover:translate-x-1">
            Explore details
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}