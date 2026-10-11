import Link from 'next/link';
import { PinIcon, StarIcon } from '@/components/guides/icons';
import { vehiclesFor } from '@/data/rental-vehicles';
import type { RentalProvider } from '@/data/rentals';
import { FleetIcon } from './rental-icons';

export default function RentalCard({ provider }: { provider: RentalProvider }) {
  const { name, rating, badge, province, area, description, image, fleet, cta } = provider;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#c3c6d6] bg-white shadow-sm transition-all duration-300 hover:border-[#003d9b]/50 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${name} vehicles`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 font-mono text-xs font-medium text-white ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-[#041b3c]">{name}</h3>
          <span className="flex shrink-0 items-center text-[#003d9b]">
            <StarIcon width={18} height={18} className="fill-current" />
            <span className="ml-1 font-mono text-xs text-[#041b3c]">{rating.toFixed(1)}</span>
          </span>
        </div>

        <p className="mb-4 flex items-center gap-1 text-sm text-[#434654]">
          <PinIcon width={16} height={16} />
          {province} Province, {area}
        </p>

        <p className="mb-6 line-clamp-2 text-sm text-[#434654]">{description}</p>

        <ul className="mb-8 grid grid-cols-3 gap-2 rounded-lg border border-[#c3c6d6]/50 bg-slate-50 p-3">
          {fleet.map(({ label, kind }) => (
            <li key={label} className="border-[#c3c6d6] text-center [&:nth-child(2)]:border-x">
              <FleetIcon kind={kind} className="mx-auto mb-1 text-[#003d9b]" />
              <span className="font-mono text-xs text-[#434654]">{label}</span>
            </li>
          ))}
        </ul>

        {vehiclesFor(provider.id).length > 0 ? (
          <Link
            href={`/rentals/${provider.id}`}
            className="mt-auto block w-full rounded-lg bg-[#003d9b] py-3 text-center font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {cta}
          </Link>
        ) : (
          // This provider hasn't published a fleet yet, so there is nothing to open.
          <button
            type="button"
            aria-disabled="true"
            title="Fleet details are coming soon"
            className="mt-auto w-full cursor-not-allowed rounded-lg bg-[#003d9b] py-3 font-bold text-white opacity-90"
          >
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}
