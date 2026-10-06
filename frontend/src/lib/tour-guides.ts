import { guideTypes, type TourGuide } from '@/data/tour-guides';
import { expandRange, toDateKey } from './calendar';

export type SearchParams = Record<string, string | string[] | undefined>;

const MAX_TRIP_DAYS = 90;
export const GUEST_OPTIONS = ['1', '2', '3', '4', '5+'];

export function todayKey() {
  const d = new Date();
  return toDateKey(d.getFullYear(), d.getMonth(), d.getDate());
}

export function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const dayDiff = (start: string, end: string) =>
  Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000);

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

function parseDate(value: string | string[] | undefined) {
  const v = first(value);
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
  const parsed = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v ? v : undefined;
}

export type GuideFilters = {
  q: string;
  type: string;
  specialization: string;
  language: string;
  district: string;
  start?: string;
  end?: string;
  guests: string;
  dateError?: string;
};

export function readFilters(params: SearchParams, today: string): GuideFilters {
  let start = parseDate(params.start);
  let end = parseDate(params.end);
  let dateError: string | undefined;

  if (start && !end) end = start;
  if (end && !start) start = end;

  if (start && end) {
    if (start < today) {
      dateError = 'Start date can\u2019t be in the past.';
    } else if (end < start) {
      dateError = 'End date must be on or after the start date.';
    } else if (dayDiff(start, end) > MAX_TRIP_DAYS) {
      dateError = `Trips can span at most ${MAX_TRIP_DAYS} days.`;
    }
    if (dateError) {
      start = undefined;
      end = undefined;
    }
  }

  const guests = first(params.guests) ?? '2';

  return {
    q: (first(params.q) ?? '').trim().slice(0, 80),
    type: first(params.type) ?? '',
    specialization: first(params.specialization) ?? '',
    language: first(params.language) ?? '',
    district: first(params.district) ?? '',
    start,
    end,
    guests: GUEST_OPTIONS.includes(guests) ? guests : '2',
    dateError,
  };
}

export const busyDatesFor = (guide: TourGuide, today: string) =>
  guide.busyRanges.flatMap((r) => expandRange(addDays(today, r.from), addDays(today, r.to)));

function isAvailable(guide: TourGuide, start: string, end: string, today: string) {
  const busy = new Set(busyDatesFor(guide, today));
  return !expandRange(start, end).some((day) => busy.has(day));
}

export function searchGuides(guides: TourGuide[], filters: GuideFilters, today: string) {
  const q = filters.q.toLowerCase();

  const matching = guides.filter((g) => {
    if (filters.type && g.type !== filters.type) return false;
    if (filters.specialization && !g.specializations.includes(filters.specialization)) return false;
    if (filters.language && !g.languages.includes(filters.language)) return false;
    if (filters.district && !g.districts.includes(filters.district)) return false;
    if (!q) return true;
    return [g.name, g.title, g.location, ...g.tags, ...g.languages, ...g.specializations, ...g.regions.map((r) => r.name)]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });

  const { start, end } = filters;
  if (!start || !end) return { results: matching, unavailableCount: 0 };

  const results = matching.filter((g) => isAvailable(g, start, end, today));
  return { results, unavailableCount: matching.length - results.length };
}

export const typeInfo = (type: TourGuide['type']) => guideTypes.find((t) => t.value === type)!;

// Keeps the traveller's chosen dates and party size when moving to a guide's page.
export function guideHref(id: string, filters: Pick<GuideFilters, 'start' | 'end' | 'guests'>) {
  const query = new URLSearchParams();
  if (filters.start && filters.end) {
    query.set('start', filters.start);
    query.set('end', filters.end);
    query.set('guests', filters.guests);
  }
  const qs = query.toString();
  return `/tour-guides/${id}${qs ? `?${qs}` : ''}`;
}
