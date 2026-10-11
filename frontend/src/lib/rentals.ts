import { provinceDistricts, provinceOptions, type RentalProvider } from '@/data/rentals';
import type { SearchParams } from './tour-guides';

export const PAGE_SIZE = 6;

export type RentalFilters = {
  province: string;
  district: string;
  q: string;
  page: number;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function readRentalFilters(params: SearchParams): RentalFilters {
  const province = first(params.province) ?? '';
  const validProvince = provinceOptions.includes(province) ? province : '';

  // Only accept a district that exists (within the chosen province, if any).
  const districts = validProvince ? provinceDistricts[validProvince] : Object.values(provinceDistricts).flat();
  const district = first(params.district) ?? '';
  const page = Number.parseInt(first(params.page) ?? '1', 10);

  return {
    province: validProvince,
    district: districts.includes(district) ? district : '',
    q: (first(params.q) ?? '').trim().slice(0, 80),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function searchRentals(providers: RentalProvider[], { province, district, q, page }: RentalFilters) {
  const needle = q.toLowerCase();
  const matching = providers.filter(
    (p) =>
      (!province || p.province === province) &&
      (!district || p.district === district) &&
      (!needle || [p.name, p.area, p.description].join(' ').toLowerCase().includes(needle)),
  );

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  return {
    total: matching.length,
    pageCount,
    page: current,
    results: matching.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
  };
}

export function rentalsHref(filters: Omit<RentalFilters, 'page'>, page: number) {
  const query = new URLSearchParams();
  if (filters.province) query.set('province', filters.province);
  if (filters.district) query.set('district', filters.district);
  if (filters.q) query.set('q', filters.q);
  if (page > 1) query.set('page', String(page));
  const qs = query.toString();
  return `/rentals${qs ? `?${qs}` : ''}`;
}
