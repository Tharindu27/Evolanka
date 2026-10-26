'use client';

import { useEffect, useState } from 'react';

type GuideBookingCardProps = {
  guideName: string;
  pricePerDay: number;
};

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function GuideBookingCard({ guideName, pricePerDay }: GuideBookingCardProps) {
  const firstName = guideName.split(' ')[0];
  const [today] = useState(() => startOfDay(new Date()));
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(guestOptions[1]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showModal]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const canGoBack = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());

  const changeMonth = (offset: number) => setVisibleMonth(new Date(year, month + offset, 1));

  return (
    <>
      <div className="guide-booking-sticky">
      <div className="tour-guide-booking-card">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <span className="text-3xl font-black text-[#001a43]">${pricePerDay}</span>
            <span className="ml-1 text-sm font-semibold text-[#59637a]">/ day</span>
          </div>
          <span className="rounded-full bg-[#fff7dc] px-3 py-1 text-xs font-bold text-[#735600]">✓ Professional</span>
        </div>

        <div className="space-y-5">
          <div>
            <span className="tour-guides-filter-label">Select date</span>
            <div className="rounded-xl border border-[#d6dcef] bg-[#fbfcff] p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#001a43]">
                  {visibleMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </span>
                <div className="flex gap-1">
                  <button type="button" className="guide-calendar-nav" onClick={() => changeMonth(-1)} disabled={!canGoBack} aria-label="Previous month">
                    ‹
                  </button>
                  <button type="button" className="guide-calendar-nav" onClick={() => changeMonth(1)} aria-label="Next month">
                    ›
                  </button>
                </div>
              </div>
              <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#78839a]">
                {weekdays.map((day, index) => (
                  <span key={`${day}-${index}`}>{day}</span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({ length: leadingBlanks }, (_, index) => (
                  <span key={`blank-${index}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, index) => {
                  const date = new Date(year, month, index + 1);
                  const isPast = date < today;
                  const isSelected = selectedDate?.getTime() === date.getTime();

                  return (
                    <button
                      key={index}
                      type="button"
                      className="tour-guide-calendar-day"
                      disabled={isPast}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedDate(date)}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <label className="block">
            <span className="tour-guides-filter-label">Number of guests</span>
            <select className="tour-guides-control" value={guests} onChange={(event) => setGuests(event.target.value)}>
              {guestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="btn-secondary w-full rounded-xl px-6 py-3.5 text-sm font-bold shadow-[0_10px_24px_rgba(176,141,31,0.3)] transition-transform active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedDate}
            onClick={() => setShowModal(true)}
          >
            {selectedDate ? `Book ${firstName} now` : 'Select a date to book'}
          </button>

          <p className="border-t border-[#e4e9f3] pt-4 text-center text-xs font-semibold text-[#78839a]">
            Free cancellation up to 48h before arrival
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_14px_38px_rgba(0,26,67,0.08)] backdrop-blur-md">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edf3ff] text-lg font-black text-[#001a43]">✓</div>
        <div>
          <h4 className="text-sm font-extrabold text-[#001a43]">EVOLANKA Verified</h4>
          <p className="text-xs font-semibold text-[#59637a]">Identity and license verified</p>
        </div>
      </div>
      </div>

      {showModal && selectedDate && (
        <div className="guide-modal-backdrop" onClick={() => setShowModal(false)} role="presentation">
          <div className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f6ee] text-4xl font-black text-[#006844]">✓</div>
            <h3 id="booking-modal-title" className="text-2xl font-black text-[#001a43]">Booking requested!</h3>
            <p className="mb-7 mt-3 leading-relaxed text-[#59637a]">
              {firstName} has been notified of your request for {formatDate(selectedDate)} ({guests.toLowerCase()}). You will receive a response within 2 hours.
            </p>
            <button type="button" className="btn-primary w-full rounded-xl px-6 py-3.5 text-sm font-bold" onClick={() => setShowModal(false)}>
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
