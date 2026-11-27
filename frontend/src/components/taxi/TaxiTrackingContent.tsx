'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { SriLankaRealMapProps } from './SriLankaRealMap';

const SriLankaRealMap = dynamic<SriLankaRealMapProps>(() => import('./SriLankaRealMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] bg-[#f8fbff] flex items-center justify-center">
      <span className="text-xs font-bold text-[#001a43]">Loading Live Telemetry Map...</span>
    </div>
  ),
});

export default function TaxiTrackingContent() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('change_plans');

  const pickupLocation = {
    id: 'galle-face',
    name: 'Galle Face Hotel, Colombo 03',
    address: '2 Galle Road, Colombo 03',
    city: 'Colombo',
    district: 'Colombo',
    lat: 6.9205,
    lng: 79.8458,
    type: 'hotel' as const,
  };

  const dropLocation = {
    id: 'cmb-airport',
    name: "Bandaranaike Int'l Airport (CMB)",
    address: 'Canada Friendship Road, Katunayake',
    city: 'Katunayake',
    district: 'Gampaha',
    lat: 7.1808,
    lng: 79.8841,
    type: 'airport' as const,
  };

  const isFeeWaived = cancelReason === 'driver_asked';

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4 bg-[#f8fbff]">
      {/* Cancellation Policy Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] p-6 w-full max-w-lg shadow-2xl border border-[#dfe4f2] space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black text-[#001a43]">Cancel This Trip?</h3>
                <p className="text-xs text-[#6c7387] mt-0.5">Ride #EV-8921-LK • Assigned Driver En Route</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-8 h-8 rounded-full bg-[#f4f7fb] flex items-center justify-center text-[#4e5568] hover:text-[#001a43]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Policy Notice Box */}
            <div className="p-3.5 rounded-2xl bg-[#fffaf0] border border-[#fbd38d]/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#745400]">
                <span className="material-symbols-outlined text-[16px] text-[#c9a227]">warning</span>
                <span>Policy Notice: Driver En Route for 4+ mins</span>
              </div>
              <p className="text-xs text-[#745400]">
                Cancelling after the standard 2-minute free grace window incurs a driver compensation fee:
              </p>
              <p className="text-base font-black text-rose-600">
                {isFeeWaived ? 'LKR 0.00 (Fee Waived - GPS Verified)' : 'LKR 250.00 (~$0.82 USD)'}
              </p>
            </div>

            {/* Cancellation Reason Radio Options */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#8b9cb5] uppercase tracking-wider block">
                Select Reason for Cancellation
              </label>

              {[
                { id: 'not_moving', label: 'Driver is not moving toward pickup', desc: 'No vehicular progress for >3 mins' },
                { id: 'driver_asked', label: 'Driver asked me to cancel', desc: 'GPS route divergence confirms drop • Fee Waived' },
                { id: 'change_plans', label: 'Change of plans', desc: 'Rescheduled flight, hotel extension, or itinerary change' },
                { id: 'booked_mistake', label: 'Booked by mistake / duplicate order', desc: 'Accidental order or companion already booked' },
              ].map((reason) => (
                <label
                  key={reason.id}
                  className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-colors ${
                    cancelReason === reason.id
                      ? 'border-[#001a43] bg-[#f8fbff]'
                      : 'border-[#dfe4f2] hover:bg-[#f8fbff]'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={reason.id}
                    checked={cancelReason === reason.id}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mt-0.5 accent-[#001a43]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#001a43]">{reason.label}</p>
                    <p className="text-[11px] text-[#6c7387]">{reason.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-3.5 rounded-2xl bg-[#001a43] hover:bg-[#002d6b] text-white text-xs font-bold shadow-sm"
              >
                Keep My Ride (Arriving in 3m)
              </button>
              <Link
                href="/taxis"
                className="w-full py-2.5 rounded-2xl text-rose-600 hover:bg-rose-50 text-xs font-bold text-center transition-colors"
              >
                Confirm Cancellation ({isFeeWaived ? 'Free' : 'LKR 250'})
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Top Breadcrumb & Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Link href="/taxis" className="text-xs font-semibold text-[#4e5568] hover:text-[#001a43]">
            Taxis &amp; Transfers
          </Link>
          <span className="text-[#8b9cb5]">/</span>
          <span className="text-xs font-semibold text-[#001a43]">Ride #EV-8921-LK</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Live Dispatch
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white border border-[#dfe4f2] rounded-full shadow-2xs text-xs font-semibold text-[#001a43]">
            <span className="material-symbols-outlined text-[16px] text-[#c9a227]">shield</span>
            <span>SLTDA Tourist Safety Guarantee</span>
          </div>

          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="flex items-center gap-1 text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">cancel</span>
            <span>Manage Cancellation</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Driver Dossier Column */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white/95 rounded-[28px] shadow-[0_18px_50px_rgba(0,26,67,0.08)] border border-[#dfe4f2] p-5 flex flex-col gap-4">
            {/* Dark Navy ETA Banner with PIN */}
            <div className="bg-[#001a43] text-white rounded-2xl p-4 shadow-md relative overflow-hidden">
              <div className="flex items-start justify-between gap-2 relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-sm font-bold text-white">Driver arriving in 3 mins</span>
                  </div>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">near_me</span>
                    Approx. 450m away • Galle Face Center Rd
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#ffd977] font-semibold block">
                    Boarding PIN
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c9a227] text-[#001a43] text-sm font-bold tracking-wider inline-block mt-0.5">
                    4829
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-white/20 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#c9a227] to-emerald-400 h-full rounded-full w-4/5" />
              </div>
            </div>

            {/* Driver Profile */}
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#001a43] text-[#ffd977] flex items-center justify-center font-bold text-base border-2 border-white shadow-md shrink-0">
                KP
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-[#001a43] truncate">Kasun Perera</h2>
                  <span className="material-symbols-outlined text-[18px] text-emerald-500">verified</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#4e5568] mt-0.5">
                  <span className="text-[#b08d1f] font-semibold">★ 4.9</span>
                  <span>• 1,240 trips</span>
                </div>
                <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Verified Tourist Driver (SLTDA)
                </span>
              </div>
            </div>

            {/* Vehicle Card */}
            <div className="p-3 bg-[#f8fbff] rounded-2xl border border-[#dfe4f2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001a43] text-[22px]">local_taxi</span>
                <div>
                  <p className="text-xs font-bold text-[#001a43]">Toyota Prius • Pearl White (AC)</p>
                  <p className="text-[11px] text-[#6c7387]">Clean interior • 4 seats • Large trunk</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white border border-[#dfe4f2] rounded-lg text-xs font-mono font-bold text-[#001a43] shadow-2xs">
                WP CAB-4821
              </span>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={() => alert('Calling driver Kasun Perera (+94 77 123 4567)...')}
                className="p-2.5 rounded-xl border border-[#dfe4f2] hover:bg-[#f8fbff] flex flex-col items-center gap-1 text-xs font-bold text-[#001a43]"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>Call</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Live Chat with Kasun Perera initialized.')}
                className="p-2.5 rounded-xl border border-[#dfe4f2] hover:bg-[#f8fbff] flex flex-col items-center gap-1 text-xs font-bold text-[#001a43] relative"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-3" />
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Chat</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Trip tracking link copied to clipboard!')}
                className="p-2.5 rounded-xl border border-[#dfe4f2] hover:bg-[#f8fbff] flex flex-col items-center gap-1 text-xs font-bold text-[#001a43]"
              >
                <span className="material-symbols-outlined text-[18px]">share_location</span>
                <span>Share</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Emergency SOS Alert sent to Tourist Police hotline 1912.')}
                className="p-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 flex flex-col items-center gap-1 text-xs font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">e911_emergency</span>
                <span>SOS</span>
              </button>
            </div>

            {/* Route Summary */}
            <div className="p-3.5 bg-[#f8fbff] rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-semibold text-[#8b9cb5]">
                Route Preview
              </div>
              <div className="text-xs font-medium text-[#001a43] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#001a43]" />
                <span className="truncate">Galle Face Hotel, Colombo 03</span>
              </div>
              <div className="text-xs font-medium text-[#001a43] flex items-center gap-2">
                <span className="w-2 h-2 rounded-xs bg-[#c9a227]" />
                <span className="truncate">Bandaranaike Int&apos;l Airport (CMB)</span>
              </div>
            </div>

            {/* Complete Ride Simulation Link to Screen 4 */}
            <div className="pt-2">
              <Link
                href="/taxis/trip-completed"
                className="w-full py-3.5 rounded-full bg-[#c9a227] hover:bg-[#b08d1f] text-[#001a43] text-xs font-bold shadow-[0_10px_26px_rgba(201,162,39,0.3)] flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Simulate Trip Completion &amp; Go to Payment</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Live Real Map Panel */}
        <section className="lg:col-span-8 h-[600px] rounded-[28px] overflow-hidden border border-[#dfe4f2] shadow-[0_18px_50px_rgba(0,26,67,0.08)] relative">
          <SriLankaRealMap
            pickup={pickupLocation}
            drop={dropLocation}
            stops={[]}
            isOnMapPickerActive={false}
            onMapPickerConfirm={() => {}}
            onMapPickerCancel={() => {}}
          />
        </section>
      </div>
    </div>
  );
}
