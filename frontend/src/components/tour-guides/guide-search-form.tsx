import Link from 'next/link';
import { SearchIcon } from '@/components/guides/icons';
import { districtOptions, guideTypes, languageOptions, specializationOptions } from '@/data/tour-guides';
import type { GuideFilters } from '@/lib/tour-guides';

const label = 'mb-2 block font-mono text-xs font-medium uppercase tracking-wide';
const control =
  'w-full rounded-lg border border-[#c3c6d6] bg-white px-4 py-3 text-[#041b3c] outline-none transition-all focus:border-[#003d9b] focus:ring-1 focus:ring-[#003d9b]';

export default function GuideSearchForm({ filters, today }: { filters: GuideFilters; today: string }) {
  const hasFilters = Boolean(
    filters.q || filters.type || filters.specialization || filters.language || filters.district || filters.start,
  );

  return (
    <form
      method="get"
      action="/tour-guides"
      className="rounded-xl border border-[#c3c6d6] bg-white/80 p-6 shadow-xl backdrop-blur-md"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="start" className={`${label} text-[#003d9b]`}>
              Start Date
            </label>
            <input id="start" name="start" type="date" min={today} defaultValue={filters.start} className={control} />
          </div>
          <div>
            <label htmlFor="end" className={`${label} text-[#003d9b]`}>
              End Date
            </label>
            <input id="end" name="end" type="date" min={today} defaultValue={filters.end} className={control} />
          </div>
        </div>
        {filters.dateError && (
          <p role="alert" className="text-sm font-semibold text-[#ba1a1a]">
            {filters.dateError}
          </p>
        )}

        <div className="grid items-end gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <label htmlFor="q" className={`${label} text-[#737685]`}>
              Search Guides
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737685]" />
              <input
                id="q"
                name="q"
                type="search"
                maxLength={80}
                defaultValue={filters.q}
                placeholder="Search by name or keyword..."
                className={`${control} pl-10`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-8 md:grid-cols-5">
            <div>
              <label htmlFor="type" className={`${label} text-[#737685]`}>
                Guide Type
              </label>
              <select id="type" name="type" defaultValue={filters.type} className={control}>
                <option value="">All Types</option>
                {guideTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="specialization" className={`${label} text-[#737685]`}>
                Specialization
              </label>
              <select id="specialization" name="specialization" defaultValue={filters.specialization} className={control}>
                <option value="">Any Speciality</option>
                {specializationOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="language" className={`${label} text-[#737685]`}>
                Language
              </label>
              <select id="language" name="language" defaultValue={filters.language} className={control}>
                <option value="">Any Language</option>
                {languageOptions.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="district" className={`${label} text-[#737685]`}>
                District
              </label>
              <select id="district" name="district" defaultValue={filters.district} className={control}>
                <option value="">All Districts</option>
                {districtOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0052cc] font-bold text-[#c4d2ff] shadow-lg transition-all hover:brightness-110 active:scale-95"
              >
                <SearchIcon />
                Search
              </button>
            </div>
          </div>
        </div>

        {hasFilters && (
          <div className="text-right">
            <Link href="/tour-guides" className="text-sm font-bold text-[#003d9b] hover:underline">
              Clear all filters
            </Link>
          </div>
        )}
      </div>
      <input type="hidden" name="guests" value={filters.guests} />
    </form>
  );
}
