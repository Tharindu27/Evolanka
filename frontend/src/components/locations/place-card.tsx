import Link from 'next/link';

import type { Place } from '@/data/location-data/location-mock-data';

type PlaceCardProps = {
  place: Place;
};

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/locations/place/${place.id}`} className="font-bold text-[#003d9b]">
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-48 w-full overflow-hidden">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
      </div>

      <div className="p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#003d9b]">{place.district}</p>
        <h3 className="mb-2 text-2xl font-bold text-[#001a43]">{place.name}</h3>
        <p className="mb-4 text-sm leading-relaxed text-slate-600">{place.shortDescription}</p>
      </div>
    </article>
    </Link>
  );
}
