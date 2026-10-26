'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { RentalProvider, RentalVehicle } from '@/data/rentals';

type VehicleBookingProps = {
  provider: RentalProvider;
  vehicle: RentalVehicle;
};

type PriceBreakdownLine = {
  label: string;
  count: number;
  rate: number;
};

type PriceQuote = {
  days: number;
  total: number;
  breakdown: PriceBreakdownLine[];
};

function getLocalDateValue(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

function getRentalDays(pickupDate: string, returnDate: string) {
  const [pickupYear, pickupMonth, pickupDay] = pickupDate.split('-').map(Number);
  const [returnYear, returnMonth, returnDay] = returnDate.split('-').map(Number);
  const pickup = Date.UTC(pickupYear, pickupMonth - 1, pickupDay);
  const returned = Date.UTC(returnYear, returnMonth - 1, returnDay);

  return Math.round((returned - pickup) / 86_400_000);
}

function getPriceQuote(vehicle: RentalVehicle, days: number): PriceQuote {
  const weeklyIsBetter = vehicle.weeklyRate < vehicle.dailyRate * 7;
  const breakdown: PriceBreakdownLine[] = [];
  let bestTotal = Number.POSITIVE_INFINITY;
  let bestCounts = { monthly: 0, weekly: 0, daily: days };

  for (let monthlyCount = 0; monthlyCount <= Math.floor(days / 30); monthlyCount += 1) {
    const remainingDays = days - monthlyCount * 30;
    const weeklyCount = weeklyIsBetter ? Math.floor(remainingDays / 7) : 0;
    const dailyCount = remainingDays - weeklyCount * 7;
    const total =
      monthlyCount * vehicle.monthlyRate +
      weeklyCount * vehicle.weeklyRate +
      dailyCount * vehicle.dailyRate;

    if (total < bestTotal) {
      bestTotal = total;
      bestCounts = { monthly: monthlyCount, weekly: weeklyCount, daily: dailyCount };
    }
  }

  if (bestCounts.monthly > 0) {
    breakdown.push({
      label: '30-day monthly rate',
      count: bestCounts.monthly,
      rate: vehicle.monthlyRate,
    });
  }
  if (bestCounts.weekly > 0) {
    breakdown.push({
      label: '7-day weekly rate',
      count: bestCounts.weekly,
      rate: vehicle.weeklyRate,
    });
  }
  if (bestCounts.daily > 0) {
    breakdown.push({ label: 'Daily rate', count: bestCounts.daily, rate: vehicle.dailyRate });
  }

  return { days, total: bestTotal, breakdown };
}

function formatLkr(amount: number) {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}

export default function VehicleBooking({ provider, vehicle }: VehicleBookingProps) {
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const today = getLocalDateValue(new Date());
  const hasPickupDate = Boolean(pickupDate);
  const hasReturnDate = Boolean(returnDate);

  let dateError = '';
  if (hasPickupDate && pickupDate < today) {
    dateError = 'Pickup date cannot be in the past.';
  } else if (hasReturnDate && returnDate < today) {
    dateError = 'Return date cannot be in the past.';
  } else if (hasPickupDate && hasReturnDate && returnDate <= pickupDate) {
    dateError = 'Return date must be after the pickup date.';
  }

  const rentalDays = hasPickupDate && hasReturnDate && !dateError
    ? getRentalDays(pickupDate, returnDate)
    : 0;
  const quote = useMemo(
    () => (rentalDays > 0 ? getPriceQuote(vehicle, rentalDays) : null),
    [rentalDays, vehicle],
  );

  const clearDates = () => {
    setPickupDate('');
    setReturnDate('');
  };

  return (
    <div className="rental-booking-page">
      <div className="rental-booking-breadcrumb">
        <Link href={`/rentals/${provider.id}`}>{provider.name}</Link>
        <span aria-hidden="true">/</span>
        <span>Book {vehicle.name}</span>
      </div>

      <div className="rental-booking-layout">
        <main className="rental-booking-main">
          <header className="rental-booking-heading">
            <p className="rental-booking-eyebrow">Vehicle reservation</p>
            <h1>Book {vehicle.name}</h1>
            <p>Choose your rental dates to see an estimated total before continuing.</p>
          </header>

          <article className="rental-booking-vehicle">
            <div className="rental-booking-vehicle-image">
              <Image
                src={vehicle.image}
                alt={vehicle.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="rental-vehicle-image"
              />
            </div>
            <div className="rental-booking-vehicle-info">
              <p>{provider.name}</p>
              <h2>{vehicle.name}</h2>
              <ul className="rental-vehicle-features" aria-label={`${vehicle.name} features`}>
                <li>{vehicle.seats} Seats</li>
                <li>{vehicle.transmission}</li>
                <li>{vehicle.fuel}</li>
              </ul>
              <div className="rental-booking-rate-list" aria-label="Published sample rates">
                <span>Daily {formatLkr(vehicle.dailyRate)}</span>
                <span>Weekly {formatLkr(vehicle.weeklyRate)}</span>
                <span>Monthly {formatLkr(vehicle.monthlyRate)}</span>
              </div>
            </div>
          </article>

          <section className="rental-booking-dates" aria-labelledby="rental-booking-dates-title">
            <div className="rental-booking-section-heading">
              <span className="rental-booking-step">1</span>
              <div>
                <h2 id="rental-booking-dates-title">Choose your dates</h2>
                <p>Pickup day is charged; the return date is not counted as a rental day.</p>
              </div>
            </div>
            <div className="rental-booking-date-grid">
              <label className="rental-booking-date-field">
                <span>Pickup date</span>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(event) => setPickupDate(event.target.value)}
                  aria-invalid={Boolean(dateError)}
                  aria-describedby={dateError ? 'rental-booking-date-error' : undefined}
                />
              </label>
              <label className="rental-booking-date-field">
                <span>Return date</span>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                  aria-invalid={Boolean(dateError)}
                  aria-describedby={dateError ? 'rental-booking-date-error' : undefined}
                />
              </label>
            </div>
            {dateError ? (
              <p className="rental-booking-date-error" id="rental-booking-date-error" role="alert">
                {dateError}
              </p>
            ) : hasPickupDate !== hasReturnDate ? (
              <p className="rental-booking-date-hint" role="status">
                Select both dates to calculate the booking estimate.
              </p>
            ) : null}
            {hasPickupDate || hasReturnDate ? (
              <button type="button" className="rental-booking-clear-dates" onClick={clearDates}>
                Clear dates
              </button>
            ) : null}
          </section>
        </main>

        <aside className="rental-booking-summary" aria-labelledby="rental-booking-summary-title">
          <div className="rental-booking-summary-card">
            <p className="rental-booking-summary-eyebrow">Booking summary</p>
            <h2 id="rental-booking-summary-title">{vehicle.name}</h2>
            <p className="rental-booking-provider">{provider.name}</p>

            {quote ? (
              <div className="rental-booking-quote" aria-live="polite">
                <div className="rental-booking-days">
                  <span>Rental period</span>
                  <strong>{quote.days} {quote.days === 1 ? 'day' : 'days'}</strong>
                </div>
                <div className="rental-booking-breakdown">
                  {quote.breakdown.map((line) => (
                    <p key={line.label}>
                      <span>{line.count} × {line.label}</span>
                      <strong>{formatLkr(line.count * line.rate)}</strong>
                    </p>
                  ))}
                </div>
                <div className="rental-booking-total">
                  <span>Estimated total</span>
                  <strong>{formatLkr(quote.total)}</strong>
                </div>
                <p className="rental-booking-date-range">
                  {pickupDate} to {returnDate}
                </p>
              </div>
            ) : (
              <div className="rental-booking-no-quote" aria-live="polite">
                <p>Select a valid pickup and return date to see your estimated total.</p>
              </div>
            )}

            <button
              type="button"
              className="rental-booking-payment-button"
              disabled
              title="Payment is unavailable until a payment gateway is configured"
              aria-describedby="rental-payment-unavailable"
            >
              Continue to payment
            </button>
            <p className="rental-payment-unavailable" id="rental-payment-unavailable">
              Payment setup is not connected yet. No charge will be taken.
            </p>
            {vehicle.refundableDeposit ? (
              <p className="rental-booking-deposit">
                Refundable security deposit: {formatLkr(vehicle.refundableDeposit)}. This deposit is not included in the rental estimate.
              </p>
            ) : null}
            <p className="rental-booking-disclaimer">
              Estimate uses the lowest combination of 30-day, 7-day, and daily rates. Taxes, insurance, deposits, and provider availability are not included.
            </p>
            <Link href={`/rentals/${provider.id}`} className="rental-booking-back-link">
              Back to {provider.name}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
