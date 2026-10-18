import Link from 'next/link';

import type { BookingItem } from '@/data/customer-booking-data';

type BookingCardProps = {
  booking: BookingItem;
};

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#dde6f4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ring-1 ring-white/80">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[1.15rem] border border-[#e5edf9] bg-[#edf3ff] md:w-[220px]">
          <img src={booking.image} alt={booking.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#071a34]/40 to-transparent" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-[#49536b]">
              <span className="inline-flex items-center rounded-full bg-[#edf4ff] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#0f3d9c]">
                {booking.category}
              </span>
              <span
                className={[
                  'inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-semibold',
                    booking.tagTone === 'blue' ? 'bg-[#ebf3ff] text-[#0b4fc5]' : booking.tagTone === 'green' ? 'bg-[#e6f4ea] text-[#0f9d58]'  : booking.tagTone === 'red' ? 'bg-[#fdecea] text-[#d93025]' : '',
                ].join(' ')}
              >
                {booking.status}
              </span>
              <span className="text-[0.76rem] font-medium tracking-[0.08em] text-[#6d7280] uppercase">
                #{booking.reference}
              </span>
            </div>

            <h3 className="text-[1.1rem] font-black tracking-[-0.04em] text-[#001a43] md:text-[1.55rem]">
              {booking.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.92rem] text-[#3d4455]">
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current text-[#4f586e]" fill="none" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 3v4M16 3v4M3 10h18" />
                </svg>
                {booking.dateRange}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="text-left lg:text-right">
              <div className=" text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#6d7280]">Total Amount</div>
              <div className="brand-page-title mt-1 text-[1.15rem] font-extrabold text-[#001a43] md:text-[1.45rem]">{booking.totalAmount}</div>
              {booking.cancellationText ? (
                <div className="mt-2 inline-flex items-center gap-1.5  px-2.5 py-1.5 text-[0.68rem] font-semibold text-[#b08d1f]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 21c4.97-2.73 8-6.18 8-10A4 4 0 0 0 16 7a4.8 4.8 0 0 0-4 2 4.8 4.8 0 0 0-4-2 4 4 0 0 0-4 4c0 3.82 3.03 7.27 8 10Z" />
                  </svg>
                  {booking.cancellationText}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {booking.category === 'Hotel' || booking.category === 'Tour Guide' ? (
                <Link
                  href={`/customer/profile/bookings/${booking.id}`}
                  className="btn-primary  rounded-xl  px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition hover:bg-[#083d9d]"
                >
                  View Details
                </Link>
              ) : (
                <button className="btn-primary  rounded-xl  px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition hover:bg-[#083d9d]">
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
