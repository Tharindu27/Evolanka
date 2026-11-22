import Link from 'next/link';

import type { TourGuideBooking } from '@/data/customer-booking-data';

import { Field, iconProps, paymentStyles, pluralize, Section, statusStyles } from './booking-details-ui';

export default function TourGuideBookingDetails({ booking }: { booking: TourGuideBooking }) {
  const isUpcoming = booking.group === 'Upcoming';
  const phoneDigits = booking.phone.replace(/\D/g, '');
  const { vehicle } = booking;

  const guestSummary = [
    pluralize(booking.adults, 'Adult'),
    booking.children > 0 ? pluralize(booking.children, 'Child', 'Children') : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="max-w-[1120px]">
      <Link
        href="/customer/profile/bookings"
        className="inline-flex items-center gap-2 rounded-xl border border-[#dfe7f5] bg-white px-4 py-2 text-sm font-semibold text-[#001a43] shadow-sm transition hover:bg-[#f4f8ff]"
        aria-label="Back to bookings"
      >
        <svg {...iconProps}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Bookings
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="brand-page-title text-3xl font-black tracking-[-0.05em] md:text-4xl">Booking Details</h1>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusStyles[booking.bookingStatus]}`}>
              {booking.bookingStatus}
            </span>
          </div>
          <p className="brand-page-subtitle mt-2 text-sm">
            Reference <span className="font-semibold text-[#001a43]">#{booking.reference}</span> &middot; Booked on {booking.bookedAt}
          </p>
        </div>
      </div>


      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <Section title="Tour Guide Details">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="h-[190px] w-full shrink-0 overflow-hidden rounded-[1.15rem] border border-[#e5edf9] bg-[#edf3ff] md:w-[190px]">
                <img src={booking.image} alt={booking.title} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black tracking-[-0.04em] text-[#001a43]">{booking.title}</h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.92rem] text-[#3d4455]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#001a43]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f5a623]" fill="currentColor" aria-hidden="true">
                      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
                    </svg>
                    {booking.rating.toFixed(1)}
                    <span className="font-normal text-[#6d7280]">({booking.reviewCount} reviews)</span>
                  </span>
                  <span>{pluralize(booking.experienceYears, 'year')} of experience</span>
                </div>

                <div className="mt-4">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6d7280]">Languages Spoken</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {booking.languages.map((language) => (
                      <span key={language} className="rounded-full bg-[#edf4ff] px-3 py-1 text-xs font-bold text-[#0f3d9c]">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 text-[0.92rem] text-[#3d4455]">
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Phone</dt>
                    <svg {...iconProps} className="h-4 w-4 stroke-current text-[#4f586e]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6 6l1.24-1.23a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    <dd>
                      <a href={`tel:${phoneDigits}`} className="hover:text-[#0d4abe]">
                        {booking.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Section>

          <Section title="Tour Schedule & Location">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Tour Date">{booking.dateRange}</Field>
              <Field label="Start Time">{booking.startTime}</Field>
              <Field label="Duration">{booking.duration}</Field>
              <Field label="Meeting / Pickup Point">{booking.meetingPoint}</Field>
              <div className="sm:col-span-2">
                <Field label="Destinations">
                  <div className="mt-1 flex flex-wrap gap-2">
                    {booking.destinations.map((destination) => (
                      <span key={destination} className="rounded-xl border border-[#e5edf9] bg-[#f8fbff] px-3 py-1.5 text-sm font-semibold">
                        {destination}
                      </span>
                    ))}
                  </div>
                </Field>
              </div>
            </div>
          </Section>

         

          <Section title="Guest & Group Details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Guests">{guestSummary}</Field>
              <Field label="Special Requirements">{booking.specialRequirements ?? 'None'}</Field>
            </div>
          </Section>

          {vehicle ? (
            <Section title="Vehicle Details">
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="Vehicle Type">{vehicle.type}</Field>
                <Field label="Model">{vehicle.model}</Field>
                <Field label="Plate Number">{vehicle.plateNumber}</Field>
                <Field label="Seats">{pluralize(vehicle.seats, 'Seat')}</Field>
                <Field label="Air Conditioning">{vehicle.airConditioned ? 'Yes' : 'No'}</Field>
                <Field label="Color">{vehicle.color}</Field>
              </div>
            </Section>
          ) : null}

          <Section title="Pricing & Payment">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Total Amount">
                <span className="text-xl font-black tracking-[-0.03em]">{booking.totalAmount}</span>
              </Field>
              <Field label="Payment Status">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${paymentStyles[booking.paymentStatus]}`}>
                  {booking.paymentStatus}
                </span>
              </Field>
              <Field label="Rate Type">{booking.rateType} rate</Field>
              <Field label="Rate Breakdown">{booking.rateDetail}</Field>
            </div>
          </Section>

          <Section title="Policies & Notes">
            <Field label="Cancellation Policy">{booking.cancellationPolicy}</Field>
          </Section>
        </div>

        <aside className="h-fit space-y-3 rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:sticky lg:top-6">
          <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">Quick Actions</h2>

          <a
            href={`tel:${phoneDigits}`}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
          >
            <svg {...iconProps}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6 6l1.24-1.23a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
            </svg>
            Call Guide
          </a>

          <a
            href={`https://wa.me/${phoneDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe3f0] bg-[#eef3ff] px-4 py-2.5 text-sm font-semibold text-[#003d9b] transition hover:bg-[#e1eaff]"
          >
            <svg {...iconProps}>
              <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1 1 21 12Z" />
            </svg>
            Message on WhatsApp
          </a>


          {isUpcoming ? (
            <div className="grid grid-cols-2 gap-3 border-t border-[#e6ecf7] pt-4">
              <button
                type="button"
                className="rounded-xl border border-[#dbe3f0] bg-white px-3 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Reschedule
              </button>
              <button
                type="button"
                className="rounded-xl border border-[#f3c8c4] bg-[#fdecea] px-3 py-2.5 text-sm font-semibold text-[#d93025] transition hover:bg-[#fbdcd9]"
              >
                Cancel Booking
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
