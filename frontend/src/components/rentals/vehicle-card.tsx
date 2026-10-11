import { StarIcon } from '@/components/guides/icons';
import type { RentalVehicle } from '@/data/rental-vehicles';
import { estimateTotal, formatLkr } from '@/lib/rental-vehicles';

const chip = 'rounded-full bg-[#eef4ff] px-2 py-1 text-[10px] font-semibold text-[#003d9b]';

export default function VehicleCard({ vehicle, days }: { vehicle: RentalVehicle; days?: number }) {
  const { name, image, rating, daily, weekly, monthly, seats, transmission, fuel } = vehicle;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,82,204,0.08)] transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 shadow-sm">
          <StarIcon width={14} height={14} className="fill-current text-yellow-600" />
          <span className="text-xs font-semibold text-[#041b3c]">{rating.toFixed(1)}</span>
        </span>
        <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 focus-within:translate-y-0 focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Booking isn't built yet, so the action is shown but inert. */}
          <button
            type="button"
            aria-disabled="true"
            title="Online booking is coming soon"
            className="w-full cursor-not-allowed rounded-lg bg-white/20 py-2 text-sm font-semibold text-white backdrop-blur-md"
          >
            Book Now
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-1 text-lg font-bold text-[#041b3c]">{name}</h3>

        <div className="mb-4 space-y-1 text-[11px] text-[#434654]">
          <p className="flex justify-between">
            <span>
              Daily: <b className="text-[#003d9b]">{formatLkr(daily)}</b>
            </span>
            <span>
              Weekly: <b className="text-[#003d9b]">{formatLkr(weekly)}</b>
            </span>
          </p>
          <p>
            Monthly: <b className="text-[#003d9b]">{formatLkr(monthly)}</b>
          </p>
        </div>

        {days !== undefined && (
          <p className="mb-4 rounded-lg bg-[#e8edff] px-3 py-2 text-xs font-semibold text-[#041b3c]">
            Estimated {days} {days === 1 ? 'day' : 'days'}: {formatLkr(estimateTotal(vehicle, days))}
          </p>
        )}

        <ul className="mt-auto flex flex-wrap gap-2">
          <li className={chip}>{seats} Seats</li>
          <li className={chip}>{transmission}</li>
          <li className={chip}>{fuel}</li>
        </ul>
      </div>
    </article>
  );
}
