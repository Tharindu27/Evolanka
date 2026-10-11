import Link from 'next/link';
import { SearchIcon } from '@/components/guides/icons';
import { provinceDistricts, provinceOptions } from '@/data/rentals';
import type { RentalFilters } from '@/lib/rentals';

const label = 'mb-1 block font-mono text-xs font-medium uppercase tracking-wider text-[#434654]';
const control =
  'w-full rounded-lg border border-[#c3c6d6] bg-white px-4 py-2.5 text-[#041b3c] outline-none transition-all focus:border-[#003d9b] focus:ring-1 focus:ring-[#003d9b]';

export default function RentalSearchForm({ filters }: { filters: RentalFilters }) {
  const districts = filters.province
    ? provinceDistricts[filters.province]
    : Object.values(provinceDistricts).flat();
  const hasFilters = Boolean(filters.province || filters.district || filters.q);

  return (
    <form
      method="get"
      action="/rentals"
      className="mb-12 rounded-xl border border-[#c3c6d6] bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col items-end gap-4 md:flex-row">
        <div className="w-full md:w-1/4">
          <label htmlFor="province" className={label}>
            Province
          </label>
          <select id="province" name="province" defaultValue={filters.province} className={control}>
            <option value="">All Provinces</option>
            {provinceOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-1/4">
          <label htmlFor="district" className={label}>
            District
          </label>
          <select id="district" name="district" defaultValue={filters.district} className={control}>
            <option value="">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:flex-1">
          <label htmlFor="q" className={label}>
            Search by Name
          </label>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#434654]" />
            <input
              id="q"
              name="q"
              type="search"
              maxLength={80}
              defaultValue={filters.q}
              placeholder="Search service providers..."
              className={`${control} pl-10`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#003d9b] px-8 py-2.5 font-bold text-white transition-all hover:opacity-90 active:scale-95 md:w-auto"
        >
          Search
        </button>
      </div>

      {hasFilters && (
        <div className="mt-3 text-right">
          <Link href="/rentals" className="text-sm font-bold text-[#003d9b] hover:underline">
            Clear all filters
          </Link>
        </div>
      )}
    </form>
  );
}
