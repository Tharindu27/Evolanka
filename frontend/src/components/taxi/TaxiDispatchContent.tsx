'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TaxiDispatchContent() {
  const [countdown, setCountdown] = useState(180);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPct = Math.min(100, Math.round(((180 - countdown) / 180) * 100));

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-[#f8fbff]">
      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-[28px] p-6 w-full max-w-md shadow-2xl border border-[#dfe4f2] space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">cancel</span>
            </div>
            <div>
              <h3 className="text-lg font-black text-[#001a43]">Cancel Dispatch Request?</h3>
              <p className="text-xs text-[#6c7387] mt-1">
                Cancellation is 100% free while we search for nearby drivers. No penalties will be charged.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-2xl border border-[#dfe4f2] text-xs font-bold text-[#001a43] hover:bg-[#f8fbff]"
              >
                Keep Searching
              </button>
              <Link
                href="/taxis"
                className="flex-1 py-3 rounded-2xl bg-rose-600 text-white text-xs font-bold text-center hover:bg-rose-700 shadow-sm"
              >
                Confirm Cancel
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="p-4 sm:p-6 gap-6 grid grid-cols-1 lg:grid-cols-12 max-w-[1720px] mx-auto w-full">
        {/* Left Status Console */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white/95 rounded-[28px] p-6 border border-[#dfe4f2] shadow-[0_18px_50px_rgba(0,26,67,0.08)] flex flex-col justify-between min-h-[580px]">
          <div>
            {/* Status Pill matching Evolanka theme */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              DISPATCHING NEARBY DRIVERS
            </div>

            <h1 className="text-2xl font-bold text-[#001a43] tracking-tight leading-snug mb-1.5">
              Finding your nearest driver...
            </h1>
            <p className="text-xs text-[#4e5568] font-normal leading-relaxed mb-6">
              Broadcasting to verified Sri Lankan drivers within 3 km 
            </p>

            {/* Countdown & Signal Active Progress */}
            <div className="bg-[#f8fbff] rounded-2xl p-4 border border-[#dfe4f2] mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#001a43] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#c9a227]">radar</span>
                  Broadcast Signal Active
                </span>
                <span className="font-mono font-semibold text-xs bg-white px-2.5 py-1 rounded-lg border border-[#dfe4f2] text-[#001a43] shadow-2xs">
                  {formatTime(180 - countdown)} / 03:00
                </span>
              </div>

              {/* Progress Track with Brand Gold */}
              <div className="h-2.5 w-full bg-[#e2e8f2] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#b08d1f] via-[#c9a227] to-[#ffd977] rounded-full transition-all duration-1000 relative"
                  style={{ width: `${Math.max(15, progressPct)}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6c7387] mt-2 font-normal">
                <span className="text-[#001a43] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]"></span> Scanning 3 km radius
                </span>
                <span>4 drivers alerted</span>
              </div>
            </div>

            {/* Fleet Connection Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#f8fbff] border border-[#dfe4f2] mb-5">
              <div className="relative w-10 h-10 rounded-full bg-[#001a43] flex items-center justify-center text-[#ffd977] shadow-sm shrink-0">
                <span className="material-symbols-outlined text-[20px]">directions_car</span>
                <span className="absolute -inset-1 rounded-full border border-blue-400/40 animate-ping"></span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[#001a43]">Connecting to Galle Face fleet</div>
                <div className="text-xs text-[#6c7387]">Toyota Prius (WP CAD-8821) reviewing route...</div>
              </div>
              <span className="text-xs font-mono font-semibold text-[#ffd977] bg-[#001a43] px-2 py-0.5 rounded-md">
                98% chance
              </span>
            </div>

            {/* Compact Trip Summary */}
            <div className="rounded-2xl border border-[#dfe4f2] bg-white p-4 shadow-2xs space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8b9cb5] flex items-center justify-between">
                <span>Trip Details</span>
                <span className="text-[#001a43] font-mono font-semibold">34.2 km • 42 mins</span>
              </div>

              <div className="space-y-2 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dfe4f2]">
                <div className="relative">
                  <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#001a43] ring-4 ring-white"></span>
                  <div className="text-xs font-medium text-[#8b9cb5]">Pickup Location</div>
                  <div className="text-xs font-semibold text-[#001a43]">Galle Face Hotel, Colombo 03</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#c9a227] ring-4 ring-white"></span>
                  <div className="text-xs font-medium text-[#8b9cb5]">Drop-off Destination</div>
                  <div className="text-xs font-semibold text-[#001a43]">Bandaranaike Int&apos;l Airport (CMB)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#dfe4f2] flex items-center justify-between">
                <span className="text-xs text-[#6c7387] font-normal">Estimated Fare</span>
                <span className="text-base font-bold text-[#001a43]">LKR 6,400.00</span>
              </div>
            </div>
          </div>

          {/* Cancel Request Footer */}
          <div className="pt-4 border-t border-[#dfe4f2]">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full py-3 px-4 rounded-full border border-[#dfe4f2] text-xs font-bold text-[#4e5568] hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              Cancel Request (Free)
            </button>
            <p className="text-center mt-2 text-[10px] text-[#8b9cb5]">
              Free cancellation guaranteed while dispatching
            </p>
          </div>
        </div>

        {/* Right Radar Visualizer Map Panel */}
        <div className="lg:col-span-7 xl:col-span-8 bg-gradient-to-br from-[#001534] via-[#001a43] to-[#022d6f] rounded-[28px] p-8 relative overflow-hidden min-h-[580px] flex flex-col items-center justify-center text-white shadow-[0_24px_60px_rgba(0,26,67,0.18)]">
          {/* Concentric Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full border border-blue-400/10 animate-ping" style={{ animationDuration: '4s' }} />
            <div className="w-[360px] h-[360px] rounded-full border border-[#c9a227]/25 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="w-[220px] h-[220px] rounded-full border border-blue-300/30 animate-pulse" />
            <div className="w-[100px] h-[100px] rounded-full bg-blue-500/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#c9a227] text-[#001a43] flex items-center justify-center shadow-lg font-bold">
                <span className="material-symbols-outlined text-[22px]">person_pin_circle</span>
              </div>
            </div>
          </div>

          {/* Floating Driver Candidate Cards */}
          <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#c9a227] text-[#001a43] mx-auto flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[32px]">local_taxi</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Kasun Perera (Sedan)</h3>
              <p className="text-xs text-white/70 mt-0.5">Toyota Prius Pearl White • 4.9 ★ (1,420+ trips)</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Incoming Response: 98% Match
            </div>
            <div className="pt-2">
              <Link
                href="/taxis/tracking"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-[#001a43] text-xs font-bold shadow-lg hover:bg-[#f8fbff] transition-all"
              >
                <span>Simulate Driver Match &amp; Go to Live Tracking</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
