import {
  deliveryOptions,
  driverOptions,
  transmissions,
  vehicleCategories,
  type DeliveryOption,
  type DriverOption,
  type RentalVehicle,
  type Transmission,
  type VehicleCategory,
} from '@/data/rental-vehicles';
import { addDays, type SearchParams } from './tour-guides';

const MAX_RENTAL_DAYS = 90;

export type FleetFilters = {
  category: VehicleCategory | '';
  transmission: Transmission | '';
  delivery: DeliveryOption[];
  driver: DriverOption[];
  from?: string;
  to?: string;
  dateError?: string;
};

const all = (value: string | string[] | undefined) => (Array.isArray(value) ? value : value ? [value] : []);
const first = (value: string | string[] | undefined) => all(value)[0];

function parseDate(value: string | string[] | undefined) {
  const v = first(value);
  if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
  const parsed = new Date(`${v}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === v ? v : undefined;
}

export const rentalDays = (from: string, to: string) =>
  Math.max(1, Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000));

export function readFleetFilters(params: SearchParams, today: string): FleetFilters {
  let from = parseDate(params.from);
  let to = parseDate(params.to);
  let dateError: string | undefined;

  if (from && !to) to = addDays(from, 1);
  if (to && !from) from = today;

  if (from && to) {
    if (from < today) dateError = 'Pickup date can\u2019t be in the past.';
    else if (to < from) dateError = 'Return date must be on or after the pickup date.';
    else if (rentalDays(from, to) > MAX_RENTAL_DAYS) dateError = `Rentals can span at most ${MAX_RENTAL_DAYS} days.`;
    if (dateError) {
      from = undefined;
      to = undefined;
    }
  }

  const category = first(params.category) ?? '';
  const transmission = first(params.transmission) ?? '';

  return {
    category: vehicleCategories.some((c) => c.value === category) ? (category as VehicleCategory) : '',
    transmission: transmissions.includes(transmission as Transmission) ? (transmission as Transmission) : '',
    delivery: all(params.delivery).filter((d): d is DeliveryOption => deliveryOptions.some((o) => o.value === d)),
    driver: all(params.driver).filter((d): d is DriverOption => driverOptions.some((o) => o.value === d)),
    from,
    to,
    dateError,
  };
}

// Within a group (delivery / driver) a vehicle matches if it offers any selected option.
export function filterVehicles(vehicles: RentalVehicle[], f: FleetFilters) {
  return vehicles.filter(
    (v) =>
      (!f.category || v.category === f.category) &&
      (!f.transmission || v.transmission === f.transmission) &&
      (f.delivery.length === 0 || f.delivery.some((d) => v.delivery.includes(d))) &&
      (f.driver.length === 0 || f.driver.some((d) => v.driver.includes(d))),
  );
}

export function fleetHref(providerId: string, filters: FleetFilters, overrides: Partial<FleetFilters> = {}) {
  const f = { ...filters, ...overrides };
  const query = new URLSearchParams();
  if (f.category) query.set('category', f.category);
  if (f.transmission) query.set('transmission', f.transmission);
  f.delivery.forEach((d) => query.append('delivery', d));
  f.driver.forEach((d) => query.append('driver', d));
  if (f.from && f.to) {
    query.set('from', f.from);
    query.set('to', f.to);
  }
  const qs = query.toString();
  return `/rentals/${providerId}${qs ? `?${qs}` : ''}`;
}

// Cheapest way to cover `days` using monthly (30d), weekly (7d) and daily rates.
export function estimateTotal(v: Pick<RentalVehicle, 'daily' | 'weekly' | 'monthly'>, days: number) {
  const months = Math.floor(days / 30);
  const rest = days % 30;
  const weeks = Math.floor(rest / 7);
  const extraDays = rest % 7;
  const remainder = Math.min(
    rest * v.daily,
    weeks * v.weekly + extraDays * v.daily,
    (weeks + 1) * v.weekly,
    v.monthly,
  );
  return months * v.monthly + remainder;
}

export const formatLkr = (amount: number) => `Rs. ${amount.toLocaleString('en-US')}`;
