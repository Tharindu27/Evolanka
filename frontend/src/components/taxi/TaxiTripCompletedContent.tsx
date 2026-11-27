'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TaxiTripCompletedContent() {
  const [rating, setRating] = useState(5);
  const [selectedChips, setSelectedChips] = useState<string[]>([
    'Clean Vehicle',
    'Safe Driving',
    'Fluent English',
  ]);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingLabels: Record<number, string> = {
    1: 'Needs Improvement',
    2: 'Fair Experience',
    3: 'Good Ride',
    4: 'Very Good!',
    5: 'Excellent Service!',
  };

  const complimentOptions = [
    'Clean Vehicle',
    'Safe Driving',
    'Fluent English',
    'Polite & Helpful',
    'Smooth Ride',
    'Great Route Choice',
  ];

  const toggleChip = (chip: string) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4">
      {/* Main Card Shell */}
      <div className="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,26,67,0.08)] border border-[#dfe4f2] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Summary & Route */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#001534] via-[#001a43] to-[#022d6f] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 flex flex-col">
            {/* Arrival Status Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/20 text-emerald-400">
                <span className="material-symbols-outlined text-[24px]">check_circle</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold block">
                  Ride Concluded
                </span>
                <span className="text-xs text-white/80">Today, 10:48 AM • #EV-8921-LK</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">You&apos;ve Arrived!</h1>

            <div className="flex items-start gap-2 mt-2 text-white/85">
              <span className="material-symbols-outlined text-[#ffd977] text-[20px] mt-0.5">
                flight_takeoff
              </span>
              <div>
                <p className="text-sm font-bold text-white">Bandaranaike Int&apos;l Airport (CMB)</p>
                <p className="text-xs text-white/70">Terminal 1 International Departures</p>
              </div>
            </div>

            {/* Route & Trip Metrics */}
            <div className="my-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/90 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Galle Face Hotel, Colombo 03
                </span>
                <span className="text-[#ffd977] font-bold">Start</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/90 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#c9a227]" />
                  CMB Katunayake Airport
                </span>
                <span className="text-[#ffd977] font-bold">End</span>
              </div>

              <div className="pt-2 border-t border-white/15 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-base font-bold text-white">34.6</p>
                  <p className="text-[10px] uppercase text-white/70 font-semibold">Km</p>
                </div>
                <div>
                  <p className="text-base font-bold text-white">44</p>
                  <p className="text-[10px] uppercase text-white/70 font-semibold">Minutes</p>
                </div>
                <div>
                  <p className="text-base font-bold text-[#ffd977]">Sedan</p>
                  <p className="text-[10px] uppercase text-white/70 font-semibold">WP CAB-4821</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card Confirmation */}
          <div className="relative z-10 pt-4 border-t border-white/15">
            <div className="flex items-center justify-between bg-emerald-500/20 border border-emerald-500/30 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">credit_card</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Paid via Visa •••• 4242</p>
                  <p className="text-[10px] text-emerald-300">Card debited automatically</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-emerald-400 text-[20px]">check</span>
            </div>

            <button
              type="button"
              onClick={() => alert('Official PDF Tax Invoice downloaded.')}
              className="w-full flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-[#ffd977] hover:text-[#c9a227] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Official PDF Tax Receipt</span>
            </button>
          </div>
        </div>

        {/* Right Column: Fare Breakdown & Driver Review */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white flex flex-col justify-between">
          <div>
            {/* Fare Breakdown Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#4e5568]">
                <span className="material-symbols-outlined text-[18px] text-[#001a43]">receipt_long</span>
                <span>Fare Breakdown</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold uppercase tracking-wider border border-emerald-200">
                Expressway Toll Settled
              </span>
            </div>

            {/* Fare Line Items */}
            <div className="space-y-2 py-1 border-b border-[#dfe4f2]">
              <div className="flex justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#001a43]">Base Fare</p>
                  <p className="text-[11px] text-[#6c7387]">Standard pickup charge in Colombo zone</p>
                </div>
                <span className="font-bold text-[#001a43]">LKR 350.00</span>
              </div>

              <div className="flex justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#001a43]">Distance Charge</p>
                  <p className="text-[11px] text-[#6c7387]">34.6 km at standard LKR 169.07 / km</p>
                </div>
                <span className="font-bold text-[#001a43]">LKR 5,850.00</span>
              </div>

              <div className="flex justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#001a43]">Katunayake Expressway Toll (E03)</p>
                  <p className="text-[11px] text-[#6c7387]">Peliyagoda Interchange clearance fee</p>
                </div>
                <span className="font-bold text-[#001a43]">LKR 300.00</span>
              </div>
            </div>

            {/* Total Paid Card */}
            <div className="mt-3 p-3.5 rounded-2xl bg-[#f8fbff] border border-[#dfe4f2] flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-[#001a43]">Total Paid</span>
                <span className="block text-[10px] text-[#6c7387]">Inclusive of all local transit taxes &amp; tolls</span>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-[#001a43]">LKR 6,500.00</span>
                <span className="block text-[10px] text-[#6c7387] font-medium">Approx. $21.50 USD</span>
              </div>
            </div>

            {/* Driver Review & Rating */}
            <div className="mt-6 pt-5 border-t border-[#dfe4f2]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#001a43] text-[#ffd977] flex items-center justify-center font-bold text-base shadow-sm">
                    KP
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-[#001a43]">Kasun Perera</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#fffaf0] border border-[#fbd38d] text-[#745400] text-[9px] font-semibold uppercase">
                        SLTDA Certified
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6c7387]">Toyota Prius Pearl White • 4.9 ★ (1,420+ trips)</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-[#b08d1f] hidden sm:inline-block">
                  {ratingLabels[rating]}
                </span>
              </div>

              {/* Star Rating Selector */}
              <div className="flex items-center gap-1.5 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-[#c9a227] hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span
                      className="material-symbols-outlined text-[32px]"
                      style={{
                        fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>

              {/* Compliment Chips */}
              <div className="mt-3">
                <label className="text-[10px] font-bold text-[#6c7387] uppercase tracking-wider block mb-1.5">
                  What made the ride great?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {complimentOptions.map((opt) => {
                    const isSelected = selectedChips.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleChip(opt)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#001a43] text-white shadow-xs'
                            : 'bg-[#f4f7fb] text-[#001a43] border border-[#dfe4f2] hover:bg-[#e8effc]'
                        }`}
                      >
                        {isSelected ? `✓ ${opt}` : `+ ${opt}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback Note Textarea */}
              <div className="mt-3 relative">
                <textarea
                  rows={2}
                  maxLength={250}
                  placeholder="Write a note of appreciation or feedback for Kasun (optional)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#dfe4f2] bg-[#f8fbff] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43] text-[#001a43] resize-none"
                />
                <span className="absolute bottom-2 right-2 text-[9px] text-[#6c7387]">
                  {note.length} / 250
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 pt-2 flex flex-col gap-3">
            <button
              type="button"
              disabled={isSubmitted}
              onClick={() => {
                setIsSubmitted(true);
                alert('Thank you! Your rating and feedback have been recorded.');
              }}
              className={`w-full py-3.5 rounded-full text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all ${
                isSubmitted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#001a43] text-white hover:bg-[#002d6b]'
              }`}
            >
              <span>{isSubmitted ? 'Feedback Recorded! Thank You' : 'Submit Rating & Finish'}</span>
              <span className="material-symbols-outlined text-[18px]">
                {isSubmitted ? 'check' : 'arrow_forward'}
              </span>
            </button>

            <div className="flex items-center justify-between text-xs font-semibold pt-1">
              <Link
                href="/taxis"
                className="text-[#001a43] hover:text-[#c9a227] flex items-center gap-1 font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                <span>Book Return Trip from CMB</span>
              </Link>

              <button
                type="button"
                onClick={() => alert('Support ticket raised for Trip #EV-8921-LK.')}
                className="text-[#6c7387] hover:text-[#001a43] flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">help_outline</span>
                <span>Need Help with this Trip?</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
