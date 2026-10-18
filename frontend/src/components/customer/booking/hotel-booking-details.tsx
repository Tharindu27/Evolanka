import Link from 'next/link';
import type { ReactNode } from 'react';

import type { HotelBooking, HotelBookingStatus } from '@/data/customer-booking-data';

const statusStyles: Record<HotelBookingStatus, string> = {
  Confirmed: 'bg-[#ebf3ff] text-[#0b4fc5]',
  Pending: 'bg-[#fff5dd] text-[#a56a00]',
  Completed: 'bg-[#e6f4ea] text-[#0f9d58]',
  Cancelled: 'bg-[#fdecea] text-[#d93025]',
};

const paymentStyles: Record<HotelBooking['paymentStatus'], string> = {
  Paid: 'bg-[#e6f4ea] text-[#0f9d58]',
  'Pay at Hotel': 'bg-[#fff5dd] text-[#a56a00]',
  'Partially Paid': 'bg-[#fff5dd] text-[#a56a00]',
  Refunded: 'bg-[#ebf3ff] text-[#0b4fc5]',
};

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.5rem] border border-[#dde6f4] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6d7280]">{label}</div>
      <div className="mt-1 text-[0.98rem] font-semibold text-[#001a43]">{children}</div>
    </div>
  );
}

const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export default function HotelBookingDetails({ booking }: { booking: HotelBooking }) {
  const encodedAddress = encodeURIComponent(`${booking.title}, ${booking.address}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const isUpcoming = booking.group === 'Upcoming';
  const totalRooms = booking.rooms.reduce((sum, room) => sum + room.count, 0);

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
          <Section title="Hotel Details">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="h-[190px] w-full shrink-0 overflow-hidden rounded-[1.15rem] border border-[#e5edf9] bg-[#edf3ff] md:w-[260px]">
                <img src={booking.image} alt={booking.title} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black tracking-[-0.04em] text-[#001a43]">{booking.title}</h3>

                <div className="mt-3 flex items-start gap-2 text-[0.95rem] text-[#3d4455]">
                  <span className="mt-0.5 text-[#4f586e]">
                    <svg {...iconProps}>
                      <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span>{booking.address}</span>
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#dfe7f5] bg-[#f4f8ff] px-3 py-2 text-sm font-semibold text-[#0d4abe] transition hover:bg-[#e8f0ff]"
                >
                  <svg {...iconProps}>
                    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
                    <path d="M9 4v14M15 6v14" />
                  </svg>
                  View on Map
                </a>

                <dl className="mt-5 grid gap-3 text-[0.92rem] text-[#3d4455] sm:grid-cols-1">
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Phone</dt>
                    <svg {...iconProps} className="h-4 w-4 stroke-current text-[#4f586e]">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6 6l1.24-1.23a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
                    </svg>
                    <dd>
                      <a href={`tel:${booking.phone.replace(/\s/g, '')}`} className="hover:text-[#0d4abe]">
                        {booking.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Email</dt>
                    <svg {...iconProps} className="h-4 w-4 stroke-current text-[#4f586e]">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    <dd>
                      <a href={`mailto:${booking.email}`} className="hover:text-[#0d4abe]">
                        {booking.email}
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Front desk hotline</dt>
                    <svg {...iconProps} className="h-4 w-4 stroke-current text-[#4f586e]">
                      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                      <rect x="3" y="14" width="4" height="6" rx="1.5" />
                      <rect x="17" y="14" width="4" height="6" rx="1.5" />
                    </svg>
                    <dd>
                      Front Desk:{' '}
                      <a href={`tel:${booking.frontDeskHotline.replace(/\s/g, '')}`} className="hover:text-[#0d4abe]">
                        {booking.frontDeskHotline}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Section>




          <Section title="Stay & Guest Details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Check-in">{booking.checkIn}</Field>
              <Field label="Check-out">{booking.checkOut}</Field>
              <Field label="Total Nights">{pluralize(booking.nights, 'Night')}</Field>
              <Field label="Guests">{guestSummary}</Field>
              <div className="sm:col-span-2">
                <Field label={`Room Details (${pluralize(totalRooms, 'Room')})`}>
                  <ul className="mt-1 space-y-2">
                    {booking.rooms.map((room) => (
                      <li key={room.type} className="flex items-center gap-3 rounded-xl border border-[#e5edf9] bg-[#f8fbff] px-3 py-2">
                        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[#edf4ff] px-2 text-xs font-bold text-[#0f3d9c]">
                          {room.count}x
                        </span>
                        {room.type}
                      </li>
                    ))}
                  </ul>
                </Field>
              </div>
            </div>
          </Section>



          <Section title="Payment & Price">
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Total Amount">
                <span className="text-xl font-black tracking-[-0.03em]">{booking.totalAmount}</span>
              </Field>
              <Field label="Payment Status">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${paymentStyles[booking.paymentStatus]}`}>
                  {booking.paymentStatus}
                </span>
              </Field>
              <Field label="Payment Method">{booking.paymentMethod}</Field>
            </div>
          </Section>

          <Section title="Policies & Notes">
            <Field label="Cancellation Policy">{booking.cancellationPolicy}</Field>
          </Section>
        </div>



        <aside className="h-fit space-y-3 rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:sticky lg:top-6">
          <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">Quick Actions</h2>

          <button
            type="button"
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
          >
            <svg {...iconProps}>
              <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
            </svg>
            Download Invoice (PDF)
          </button>

          <a
            href={`tel:${booking.frontDeskHotline.replace(/\s/g, '')}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe3f0] bg-[#eef3ff] px-4 py-2.5 text-sm font-semibold text-[#003d9b] transition hover:bg-[#e1eaff]"
          >
            <svg {...iconProps}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6 6l1.24-1.23a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z" />
            </svg>
            Contact Hotel
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe3f0] bg-white px-4 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
          >
            <svg {...iconProps}>
              <path d="m3 11 18-8-8 18-2-8-8-2Z" />
            </svg>
            Get Directions
          </a>

          {isUpcoming ? (
            <div className="grid grid-cols-2 gap-3 border-t border-[#e6ecf7] pt-4">
              <button
                type="button"
                className="rounded-xl border border-[#dbe3f0] bg-white px-3 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Modify Booking
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
