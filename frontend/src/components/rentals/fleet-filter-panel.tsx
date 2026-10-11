import Link from 'next/link';
import {
  deliveryOptions,
  driverOptions,
  transmissions,
  vehicleCategories,
  type VehicleCategory,
} from '@/data/rental-vehicles';
import { fleetHref, type FleetFilters } from '@/lib/rental-vehicles';
import type { FleetKind } from '@/data/rentals';
import { FleetIcon } from './rental-icons';

type Props = {
  providerId: string;
  filters: FleetFilters;
  today: string;
};

const categoryIcons: Record<VehicleCategory | '', FleetKind> = {
  '': 'sedan',
  cars: 'sedan',
  bikes: 'scooter',
  suvs: 'suv',
  vans: 'van',
};

const heading = 'font-mono text-[11px] font-medium uppercase tracking-wider text-[#737685]';
const dateInput =
  'w-full rounded-lg border border-[#c3c6d6] bg-white p-2 text-sm outline-none focus:border-[#003d9b] focus:ring-1 focus:ring-[#003d9b]';
const tab = 'flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-all duration-200';

export default function FleetFilterPanel({ providerId, filters, today }: Props) {
  const hasFilters = Boolean(
    filters.category || filters.transmission || filters.delivery.length || filters.driver.length || filters.from,
  );

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="space-y-6 rounded-xl bg-[#eef4ff] p-6 lg:sticky lg:top-24">
        <div>
          <h2 className="text-lg font-bold text-[#003d9b]">Filters</h2>
          <p className="text-xs text-[#434654] opacity-70">Refine your search</p>
        </div>

        <div className="space-y-2">
          <p className={heading}>Vehicle Type</p>
          <nav aria-label="Vehicle type" className="space-y-1">
            {[{ value: '' as const, label: 'All Vehicles' }, ...vehicleCategories].map(({ value, label }) => {
              const active = filters.category === value;
              return (
                <Link
                  key={label}
                  href={fleetHref(providerId, filters, { category: value })}
                  aria-current={active ? 'page' : undefined}
                  className={`${tab} ${
                    active
                      ? 'bg-[#0052cc] font-bold text-white'
                      : 'text-[#434654] hover:bg-[#dbe9ff]'
                  }`}
                >
                  <FleetIcon kind={categoryIcons[value]} width={20} height={20} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <form method="get" action={`/rentals/${providerId}`} className="space-y-6">
          {filters.category && <input type="hidden" name="category" value={filters.category} />}

          <fieldset className="space-y-2">
            <legend className={`${heading} mb-2`}>Rental Period</legend>
            <label className="block text-xs text-[#434654]">
              Pickup Date
              <input type="date" name="from" min={today} defaultValue={filters.from} className={`${dateInput} mt-1`} />
            </label>
            <label className="block text-xs text-[#434654]">
              Return Date
              <input type="date" name="to" min={today} defaultValue={filters.to} className={`${dateInput} mt-1`} />
            </label>
            {filters.dateError && (
              <p role="alert" className="text-xs font-semibold text-[#ba1a1a]">
                {filters.dateError}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className={`${heading} mb-2`}>Transmission</legend>
            <div className="grid grid-cols-2 gap-2">
              {transmissions.map((t) => (
                <label key={t} className="cursor-pointer">
                  <input
                    type="radio"
                    name="transmission"
                    value={t}
                    defaultChecked={filters.transmission === t}
                    className="peer sr-only"
                  />
                  <span className="block rounded-lg border border-[#c3c6d6] bg-white px-3 py-2 text-center text-xs font-semibold transition-colors hover:border-[#003d9b] peer-checked:border-[#003d9b] peer-checked:bg-[#003d9b] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#003d9b]">
                    {t === 'Automatic' ? 'Auto' : t}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className={`${heading} mb-2`}>Delivery Option</legend>
            {deliveryOptions.map(({ value, label }) => (
              <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="delivery"
                  value={value}
                  defaultChecked={filters.delivery.includes(value)}
                  className="h-4 w-4 rounded border-[#c3c6d6] accent-[#003d9b]"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <fieldset className="space-y-2">
            <legend className={`${heading} mb-2`}>Driver Option</legend>
            {driverOptions.map(({ value, label }) => (
              <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="driver"
                  value={value}
                  defaultChecked={filters.driver.includes(value)}
                  className="h-4 w-4 rounded border-[#c3c6d6] accent-[#003d9b]"
                />
                {label}
              </label>
            ))}
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#003d9b] py-3 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Apply Filters
          </button>
          {hasFilters && (
            <Link href={`/rentals/${providerId}`} className="block text-center text-sm font-bold text-[#003d9b] hover:underline">
              Clear all filters
            </Link>
          )}
        </form>
      </div>
    </aside>
  );
}
