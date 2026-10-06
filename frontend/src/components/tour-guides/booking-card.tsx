'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, ShieldCheckIcon } from '@/components/guides/icons';
import { buildMonthCells, expandRange } from '@/lib/calendar';
import { GUEST_OPTIONS } from '@/lib/tour-guides';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const monthStart = (iso: string) => ({ year: Number(iso.slice(0, 4)), month: Number(iso.slice(5, 7)) - 1 });

export default function BookingCard({
  guideName,
  pricePerDay,
  busyDates,
  today,
  initialStart,
  initialEnd,
  initialGuests,
}: {
  guideName: string;
  pricePerDay: number;
  busyDates: string[];
  today: string;
  initialStart?: string;
  initialEnd?: string;
  initialGuests: string;
}) {
  const busy = useMemo(() => new Set(busyDates), [busyDates]);
  const [cursor, setCursor] = useState(monthStart(initialStart ?? today));
  const [start, setStart] = useState<string | undefined>(initialStart);
  const [end, setEnd] = useState<string | undefined>(initialEnd);
  const [guests, setGuests] = useState(initialGuests);
  const [confirmed, setConfirmed] = useState(false);

  const firstName = guideName.split(' ')[0];
  const lastDay = end ?? start;
  const days = start && lastDay ? expandRange(start, lastDay).length : 0;
  const total = days * pricePerDay;
  const { year, month } = cursor;
  const cells = buildMonthCells(year, month);
  const canGoBack = year * 12 + month > monthStart(today).year * 12 + monthStart(today).month;

  const title = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    if (!confirmed) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setConfirmed(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmed]);

  const shift = (delta: number) =>
    setCursor(({ year: y, month: m }) => {
      const next = new Date(y, m + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });

  const pick = (key: string) => {
    const restart = () => {
      setStart(key);
      setEnd(undefined);
    };
    // First click sets the start; a second click completes the range; a third starts over.
    if (!start || end !== undefined || key < start) return restart();
    // A range can't swallow a day the guide is already booked.
    if (expandRange(start, key).some((d) => busy.has(d))) return restart();
    setEnd(key);
  };

  return (
    <>
      <div className="rounded-2xl border border-[#c3c6d6]/30 bg-white p-4 shadow-[0_12px_24px_rgba(23,43,77,0.15)] lg:sticky lg:top-24">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <span className="text-3xl font-semibold text-[#003d9b]">${pricePerDay}</span>
            <span className="text-[#434654]"> / day</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#434654]">
            <ShieldCheckIcon width={16} height={16} /> Professional
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-[#041b3c]">Select Dates</p>
            <div className="rounded-xl border border-[#c3c6d6] bg-[#f1f3ff] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium" aria-live="polite">
                  {title}
                </span>
                <div className="flex gap-1 text-[#434654]">
                  <button
                    type="button"
                    aria-label="Previous month"
                    disabled={!canGoBack}
                    onClick={() => shift(-1)}
                    className="hover:text-[#003d9b] disabled:opacity-30"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => shift(1)}
                    className="hover:text-[#003d9b]"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>

              <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#737685]">
                {WEEKDAYS.map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {cells.map(({ day, key }, i) => {
                  if (!key) {
                    return (
                      <span key={i} className="p-1 text-[#c3c6d6]">
                        {day}
                      </span>
                    );
                  }
                  const disabled = key < today || busy.has(key);
                  const selected = start && lastDay && key >= start && key <= lastDay;
                  const edge = key === start || key === lastDay;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={disabled}
                      onClick={() => pick(key)}
                      aria-pressed={Boolean(selected)}
                      aria-label={`${shortDate(key)}${busy.has(key) ? ' (booked)' : ''}`}
                      className={`rounded-lg p-1 transition-colors ${
                        selected
                          ? edge
                            ? 'bg-[#003d9b] text-white'
                            : 'bg-[#0052cc]/15 text-[#003d9b]'
                          : disabled
                            ? 'cursor-not-allowed text-[#c3c6d6]'
                            : 'text-[#041b3c] hover:bg-[#0052cc]/10'
                      } ${busy.has(key) ? 'line-through' : ''}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-[#737685]">
                <span className="h-2 w-2 rounded-full bg-[#c3c6d6]" /> Crossed-out days are already booked
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="mb-1 block text-sm font-medium text-[#041b3c]">
              Number of Guests
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full rounded-xl border border-[#c3c6d6] bg-[#f1f3ff] p-3 outline-none transition-all focus:border-[#003d9b] focus:ring-2 focus:ring-[#003d9b]"
            >
              {GUEST_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g === '1' ? '1 Guest' : g === '5+' ? '5+ Guests' : `${g} Guests`}
                </option>
              ))}
            </select>
          </div>

          {days > 0 && start && lastDay && (
            <div className="rounded-xl bg-[#e8edff] p-3 text-sm" role="status">
              <div className="flex justify-between font-medium text-[#041b3c]">
                <span>{start === lastDay ? shortDate(start) : `${shortDate(start)} \u2013 ${shortDate(lastDay)}`}</span>
                <span>
                  ${pricePerDay} × {days} {days === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t border-[#c3c6d6] pt-2 font-bold text-[#003d9b]">
                <span>Estimated total</span>
                <span>${total}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={days === 0}
            onClick={() => setConfirmed(true)}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#feaa00] py-4 text-xl font-semibold text-[#684300] shadow-md transition-transform hover:bg-[#825500] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#feaa00] disabled:hover:text-[#684300]"
          >
            {days === 0 ? 'Select dates to book' : `Book ${firstName} Now`}
          </button>

          <div className="border-t border-[#c3c6d6] pt-4 text-center">
            <p className="text-xs text-[#737685]">Free cancellation up to 48h before arrival</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/30 bg-white/80 p-4 backdrop-blur-md">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0052cc]/10 text-[#003d9b]">
          <ShieldCheckIcon />
        </span>
        <div>
          <h4 className="text-sm font-bold text-[#041b3c]">EVOLANKA Verified</h4>
          <p className="text-xs text-[#434654]">Identity and license verified</p>
        </div>
      </div>

      {confirmed && start && lastDay && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#041b3c]/60 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setConfirmed(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
          >
            <span className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#82f9be]/30 text-[#006844]">
              <CheckCircleIcon width={48} height={48} strokeWidth={1.5} />
            </span>
            <h3 id="booking-title" className="mb-2 text-3xl font-semibold text-[#041b3c]">
              Booking Requested!
            </h3>
            <p className="mb-8 text-[#434654]">
              {firstName} has been notified of your interest for{' '}
              {start === lastDay ? shortDate(start) : `${shortDate(start)} \u2013 ${shortDate(lastDay)}`} (
              {guests === '1' ? '1 guest' : `${guests} guests`}). You will receive a response within 2 hours.
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setConfirmed(false)}
              className="w-full rounded-xl bg-[#003d9b] py-4 text-lg font-semibold text-white transition-transform active:scale-95"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
