import Link from 'next/link';

import type { RentalBooking } from '@/data/customer-booking-data';

import { Field, iconProps, paymentStyles, Section, statusStyles } from './booking-details-ui';

const phoneIcon =
  'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L8.09 9.69a16 16 0 0 0 6 6l1.24-1.23a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 22 16.92Z';

const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

export default function RentalBookingDetails({ booking }: { booking: RentalBooking }) {
  const isUpcoming = booking.group === 'Upcoming';
  const { driver } = booking;
  const directionsUrl =
    booking.pickupMode === 'Location Pickup'
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(booking.serviceLocation)}`
      : null;

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
          <Section title="Vehicle Details">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="h-[190px] w-full shrink-0 overflow-hidden rounded-[1.15rem] border border-[#e5edf9] bg-[#edf3ff] md:w-[260px]">
                <img src={booking.image} alt={booking.vehicleName} className="h-full w-full object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black tracking-[-0.04em] text-[#001a43]">{booking.vehicleName}</h3>

                <div className="mt-3 inline-flex items-center rounded-lg border-2 border-[#001a43] bg-[#f8fbff] px-3 py-1 text-sm font-black tracking-[0.18em] text-[#001a43]">
                  {booking.plateNumber}
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <Field label="Transmission">{booking.transmission}</Field>
                  <Field label="Fuel Type">{booking.fuelType}</Field>
                  <Field label="Seats">{booking.seats} Seats</Field>
                </div>
              </div>
            </div>
          </Section>

          <Section title="Rental Duration & Location">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Pick-up Date & Time">{booking.pickupDateTime}</Field>
              <Field label="Drop-off Date & Time">{booking.dropoffDateTime}</Field>
              <Field label="Total Duration">{booking.duration}</Field>
              <Field label="Pickup Method">{booking.pickupMode}</Field>
              {booking.pickupMode === 'Doorstep Pickup' ? (
                <>
                  <Field label="Pick-up Location">{booking.pickupLocation}</Field>
                  <Field label="Drop-off Location">{booking.dropoffLocation}</Field>
                </>
              ) : (
                <div className="sm:col-span-2">
                  <Field label="Pick-up & Drop-off (Rental Service)">{booking.serviceLocation}</Field>
                </div>
              )}
            </div>
          </Section>

          <Section title="Driver & Insurance">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Rental Type">{booking.rentalType}</Field>
              <Field label="Insurance Plan">{booking.insurancePlan}</Field>
            </div>

            {driver ? (
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#e5edf9] bg-[#f8fbff] p-4">
                <img src={driver.photo} alt={driver.name} className="h-16 w-16 rounded-full border border-[#dde6f4] object-cover" />
                <div className="min-w-0">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6d7280]">Your Driver</div>
                  <div className="mt-0.5 text-[1.05rem] font-black text-[#001a43]">{driver.name}</div>
                  <a href={telHref(driver.phone)} className="mt-1 flex items-center gap-2 text-sm text-[#3d4455] hover:text-[#0d4abe]">
                    <svg {...iconProps} className="h-4 w-4 stroke-current text-[#4f586e]">
                      <path d={phoneIcon} />
                    </svg>
                    {driver.phone}
                  </a>
                </div>
              </div>
            ) : null}
          </Section>

          <Section title="Pricing & Payment">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Total Rental Amount">
                <span className="text-xl font-black tracking-[-0.03em]">{booking.totalAmount}</span>
              </Field>
              <Field label="Payment Status">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${paymentStyles[booking.paymentStatus]}`}>
                  {booking.paymentStatus}
                </span>
              </Field>
              <Field label="Refundable Deposit">{booking.depositAmount}</Field>
              <Field label="Deposit Status">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${paymentStyles[booking.depositStatus]}`}>
                  {booking.depositStatus}
                </span>
              </Field>
            </div>
          </Section>

          <Section title="Policies & Notes">
            <Field label="Cancellation Policy">{booking.cancellationPolicy}</Field>
          </Section>
        </div>

        <aside className="h-fit space-y-3 rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] lg:sticky lg:top-6">
          <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">Quick Actions</h2>

          <a
            href={telHref(booking.ownerPhone)}
            className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
          >
            <svg {...iconProps}>
              <path d={phoneIcon} />
            </svg>
            Contact Owner
          </a>

          <a
            href={telHref(booking.supportPhone)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe3f0] bg-[#eef3ff] px-4 py-2.5 text-sm font-semibold text-[#003d9b] transition hover:bg-[#e1eaff]"
          >
            <svg {...iconProps}>
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <rect x="3" y="14" width="4" height="6" rx="1.5" />
              <rect x="17" y="14" width="4" height="6" rx="1.5" />
            </svg>
            Contact Support
          </a>

          {directionsUrl ? (
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
          ) : null}

          {isUpcoming ? (
            <div className="grid grid-cols-2 gap-3 border-t border-[#e6ecf7] pt-4">
              <button
                type="button"
                className="rounded-xl border border-[#dbe3f0] bg-white px-3 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Extend Rental
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
