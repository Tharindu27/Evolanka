'use client';

import { useState } from 'react';

import Sidebar from '@/components/customer/common/sidebar';
import BookingCard from '@/components/customer/booking';
import { bookingFilters, bookingTabs, bookings } from '@/data/customer-booking-data';
import { navigationItems } from '@/data/customer-account-data';

export default function CustomerBookingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof bookingTabs)[number]>('Hotel Bookings');
  const [activeFilter, setActiveFilter] = useState<(typeof bookingFilters)[number]>('Upcoming');

  const visibleBookings = bookings.filter(
    (booking) => booking.tab === activeTab && booking.group === activeFilter,
  );

  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">Bookings</h1>
            <p className="brand-page-subtitle mt-2 text-base">
              Manage and track your verified accommodation, safari guides, and transport reservations.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 border-b border-[#dfe7f5] pb-3">
              {bookingTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={[
                      'rounded-t-lg px-4 py-2 text-sm font-semibold transition-all',
                      isActive ? 'border-b-2 border-[#0d4abe] text-[#0d4abe]' : 'text-[#4e5568] hover:text-[#001a43]',
                    ].join(' ')}
                  >
                    {tab}
                    <span className="ml-2 text-[#0d4abe]">
                      {bookings.filter((booking) => booking.tab === tab).length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="inline-flex rounded-xl bg-[#edf2fa] p-1.5 shadow-inner">
                {bookingFilters.map((filter) => {
                  const isActive = activeFilter === filter;

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={[
                        'rounded-lg px-4 py-2 text-sm font-semibold transition-all',
                        isActive ? 'bg-white text-[#001a43] shadow-[0_6px_18px_rgba(15,23,42,0.08)]' : 'text-[#4e5568] hover:text-[#001a43]',
                      ].join(' ')}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-[#dfe7f5] bg-white px-3 py-2 text-sm font-medium text-[#4e5568]">
                <span>Currency:</span>
                <span className="font-semibold text-[#001a43]">LKR</span>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {visibleBookings.length > 0 ? (
                visibleBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[#dfe7f5] bg-white/60 px-6 py-12 text-center text-[#566277]">
                  No {activeFilter.toLowerCase()} bookings found.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
