'use client';

import React, { useState } from 'react';
import {
  SRI_LANKAN_FLEET,
  calculateTaxiFare,
  type VehicleOption,
} from '@/lib/taxi-fare-calculator';

interface VehicleSelectorDrawerProps {
  distanceKm: number;
  isReturnTrip: boolean;
  stopsCount: number;
  selectedVehicle: VehicleOption;
  onSelectVehicle: (v: VehicleOption) => void;
  onBookNow: () => void;
  onLaterSchedule: () => void;
}

function VehicleIcon({ type, className }: { type: string; className?: string }) {
  if (type === 'tuk') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16h18" />
        <circle cx="6.5" cy="16.5" r="2.5" />
        <circle cx="17.5" cy="16.5" r="2.5" />
        <path d="M5 14l1.5-6h7l3 6H5z" />
        <path d="M8 8v6" />
        <path d="M13 8v6" />
        <path d="M18 10h2l1 4h-3" />
      </svg>
    );
  }
  if (type === 'bike') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="16.5" r="2.5" />
        <circle cx="18.5" cy="16.5" r="2.5" />
        <path d="M12 16.5l3-7H18" />
        <path d="M5.5 16.5L9 9.5h3l3 7" />
        <circle cx="12" cy="7" r="1.5" />
      </svg>
    );
  }
  if (type === 'flex') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14l2.5-5h11l2.5 5v3H3v-3z" />
        <circle cx="7" cy="16.5" r="2" />
        <circle cx="15.5" cy="16.5" r="2" />
        <path d="M6 9l1.5 5h7.5l1.5-5" />
      </svg>
    );
  }
  if (type === 'sedan') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13l2.5-4h13l3.5 4v3.5H2V13z" />
        <circle cx="6.5" cy="16.5" r="2" />
        <circle cx="16.5" cy="16.5" r="2" />
        <path d="M5 9l2 4h8l2-4" />
      </svg>
    );
  }
  // Van
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="18" height="10.5" rx="2" />
      <circle cx="6.5" cy="16.5" r="2" />
      <circle cx="15.5" cy="16.5" r="2" />
      <path d="M5 9.5h4v3H5z" />
      <path d="M11 9.5h4v3h-4z" />
      <path d="M20 11.5l2 2v3h-2" />
    </svg>
  );
}

export default function VehicleSelectorDrawer({
  distanceKm,
  isReturnTrip,
  stopsCount,
  selectedVehicle,
  onSelectVehicle,
  onBookNow,
  onLaterSchedule,
}: VehicleSelectorDrawerProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [noteForDriver, setNoteForDriver] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Category Header */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold text-[#4e5568] tracking-wider uppercase">
          Select Vehicle Category
        </span>
        <button
          type="button"
          onClick={onLaterSchedule}
          className="text-xs font-semibold text-[#001a43] hover:text-[#c9a227] flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[15px] text-[#c9a227]">schedule</span>
          <span>Schedule Later</span>
        </button>
      </div>

      {/* Fleet Cards */}
      <div className="flex flex-col gap-2 max-h-[260px] overflow-y-auto pr-0.5 [scrollbar-width:thin]">
        {SRI_LANKAN_FLEET.map((vehicle) => {
          const isSelected = selectedVehicle.id === vehicle.id;
          const { fareLkr } = calculateTaxiFare(
            vehicle,
            distanceKm,
            isReturnTrip,
            stopsCount,
            distanceKm > 20
          );

          const discountedFare = promoApplied ? Math.round(fareLkr * 0.85) : fareLkr;

          return (
            <div
              key={vehicle.id}
              onClick={() => onSelectVehicle(vehicle)}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'border-[#001a43] bg-[#f8fbff] ring-1.5 ring-[#001a43] shadow-[0_4px_16px_rgba(0,26,67,0.06)]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Vehicle Clean Vector Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#001a43] text-[#ffd977]'
                      : 'bg-slate-100 text-[#001a43]'
                  }`}
                >
                  <VehicleIcon type={vehicle.type} className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-semibold text-[#001a43]">
                      {vehicle.name}
                    </span>
                    <span className="text-xs text-[#6c7387] flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[13px]">person</span>
                      {vehicle.passengers}
                    </span>
                    {vehicle.popular && (
                      <span className="bg-[#001a43] text-white text-[9px] font-semibold px-1.5 py-0.2 rounded-full uppercase tracking-wide">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-emerald-700 font-medium">
                      {vehicle.etaMinutes} min away
                    </span>
                    <span className="text-[11px] text-[#6c7387]">
                      • {vehicle.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="text-right shrink-0">
                <span className="block text-sm sm:text-base font-bold text-[#001a43]">
                  Rs. {discountedFare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-[#6c7387]">
                  Est. total
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment & Extras Strip */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#dfe4f2]">
        <button
          type="button"
          onClick={() => setPaymentMethod(paymentMethod === 'cash' ? 'card' : 'cash')}
          className="p-2.5 rounded-xl border border-[#dfe4f2] bg-white hover:bg-[#f8fbff] flex items-center justify-center gap-1.5 transition-colors text-xs font-semibold text-[#001a43]"
        >
          <span className="material-symbols-outlined text-[17px] text-emerald-600">
            {paymentMethod === 'cash' ? 'payments' : 'credit_card'}
          </span>
          <span className="capitalize">{paymentMethod}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowNoteModal(true)}
          className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors text-xs font-semibold ${
            noteForDriver
              ? 'border-blue-300 bg-blue-50 text-[#003d9b]'
              : 'border-[#dfe4f2] bg-white hover:bg-[#f8fbff] text-[#001a43]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">edit_note</span>
          <span className="truncate">{noteForDriver ? 'Note Added' : 'Add note'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowPromoModal(true)}
          className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-colors text-xs font-semibold ${
            promoApplied
              ? 'border-[#c9a227] bg-[#fffaf0] text-[#745400]'
              : 'border-[#dfe4f2] bg-white hover:bg-[#f8fbff] text-[#001a43]'
          }`}
        >
          <span className="material-symbols-outlined text-[17px] text-[#c9a227]">loyalty</span>
          <span>{promoApplied ? '15% Off' : 'Add Promo'}</span>
        </button>
      </div>

      {/* Driver Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl border border-[#dfe4f2] space-y-3">
            <h3 className="text-sm font-semibold text-[#001a43]">Note for the Driver</h3>
            <textarea
              rows={3}
              placeholder="e.g. Please wait near the main lobby valet..."
              value={noteForDriver}
              onChange={(e) => setNoteForDriver(e.target.value)}
              className="w-full text-xs p-2.5 border border-[#dfe4f2] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#003d9b] text-[#001a43]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="px-3 py-1.5 text-xs font-medium text-[#6c7387] hover:text-[#001a43]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-1.5 text-xs font-semibold bg-[#001a43] hover:bg-[#002d6b] text-white rounded-xl shadow-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Modal */}
      {showPromoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl border border-[#dfe4f2] space-y-3">
            <h3 className="text-sm font-semibold text-[#001a43]">Enter Promo Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="EVO2026 / WELCOME15"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 text-xs px-3 py-2 border border-[#dfe4f2] rounded-xl uppercase font-semibold focus:outline-none text-[#001a43]"
              />
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim().length > 0) {
                    setPromoApplied(true);
                    setShowPromoModal(false);
                  }
                }}
                className="px-4 py-2 text-xs font-semibold bg-[#c9a227] hover:bg-[#b08d1f] text-[#001a43] rounded-xl shadow-xs"
              >
                Apply
              </button>
            </div>
            <p className="text-[11px] text-[#6c7387]">Try &ldquo;WELCOME15&rdquo; for 15% discount</p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                className="text-xs text-[#6c7387] hover:text-[#001a43]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary "Book Now" CTA Button matching Evolanka Brand Button */}
      <button
        type="button"
        onClick={onBookNow}
        className="w-full py-3.5 px-6 rounded-full bg-[#c9a227] hover:bg-[#b08d1f] text-[#001a43] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_10px_26px_rgba(201,162,39,0.3)] active:scale-98 transition-all duration-200 mt-1"
      >
        <span>Book Now • {selectedVehicle.name}</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>

      {/* Compliance / Toll Footer Info */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6c7387]">
        <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
        <span>SLTDA Certified • Fixed Expressway Toll Included</span>
      </div>
    </div>
  );
}
