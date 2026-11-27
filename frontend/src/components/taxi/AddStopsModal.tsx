'use client';

import React, { useState } from 'react';
import { SRI_LANKA_LOCATIONS, type SriLankaLocation } from '@/data/sri-lanka-locations';

interface AddStopsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickup: SriLankaLocation;
  currentStops: SriLankaLocation[];
  onConfirmStops: (newStops: SriLankaLocation[]) => void;
}

export default function AddStopsModal({
  isOpen,
  onClose,
  pickup,
  currentStops,
  onConfirmStops,
}: AddStopsModalProps) {
  const [stop1, setStop1] = useState<SriLankaLocation | null>(currentStops[0] || null);
  const [stop2, setStop2] = useState<SriLankaLocation | null>(currentStops[1] || null);
  const [stop3, setStop3] = useState<SriLankaLocation | null>(currentStops[2] || null);

  const [activeStopIndex, setActiveStopIndex] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  const handleSelectLocation = (loc: SriLankaLocation) => {
    if (activeStopIndex === 1) setStop1(loc);
    else if (activeStopIndex === 2) setStop2(loc);
    else if (activeStopIndex === 3) setStop3(loc);
    setActiveStopIndex(null);
    setSearchFilter('');
  };

  const handleDone = () => {
    const validStops = [stop1, stop2, stop3].filter(Boolean) as SriLankaLocation[];
    onConfirmStops(validStops);
    onClose();
  };

  const filteredLocations = SRI_LANKA_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchFilter.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-[28px] shadow-[0_24px_60px_rgba(0,26,67,0.18)] border border-[#dfe4f2] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#dfe4f2] bg-[#f8fbff] flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#001a43] hover:bg-[#e8effc] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <h2 className="text-base font-bold text-[#001a43]">Add Stops</h2>
        </div>

        {/* Stops Form Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="relative pl-6 space-y-4 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-0.5 before:border-l-2 before:border-dotted before:border-[#cbd5e1]">
            {/* Pickup Node */}
            <div className="relative">
              <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-[#003d9b] ring-4 ring-blue-100" />
              <p className="text-xs font-semibold text-[#003d9b]">
                PICKUP
              </p>
              <p className="text-sm font-semibold text-[#001a43] mt-0.5">
                {pickup.name || 'Location fetched'}
              </p>
              <p className="text-xs text-[#6c7387]">{pickup.address}</p>
            </div>

            {/* Stop 1 */}
            <div className="relative pt-2">
              <div className="absolute -left-[27px] top-4 w-6 h-6 rounded-full bg-[#c9a227] text-[#001a43] text-xs font-bold flex items-center justify-center shadow-2xs">
                1
              </div>
              <div
                onClick={() => setActiveStopIndex(1)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeStopIndex === 1
                    ? 'border-[#c9a227] bg-[#fffaf0] ring-2 ring-[#c9a227]/20'
                    : 'border-[#dfe4f2] bg-[#f8fbff] hover:bg-white'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#001a43]">
                    {stop1 ? stop1.name : 'Add stop 1'}
                  </p>
                  {stop1 && <p className="text-xs text-[#6c7387]">{stop1.address}</p>}
                </div>
                {stop1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStop1(null);
                    }}
                    className="text-[#8b9cb5] hover:text-[#001a43]"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stop 2 */}
            <div className="relative pt-2">
              <div className="absolute -left-[27px] top-4 w-6 h-6 rounded-full bg-[#c9a227] text-[#001a43] text-xs font-bold flex items-center justify-center shadow-2xs">
                2
              </div>
              <div
                onClick={() => setActiveStopIndex(2)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeStopIndex === 2
                    ? 'border-[#c9a227] bg-[#fffaf0] ring-2 ring-[#c9a227]/20'
                    : 'border-[#dfe4f2] bg-[#f8fbff] hover:bg-white'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#001a43]">
                    {stop2 ? stop2.name : 'Add stop 2'}
                  </p>
                  {stop2 && <p className="text-xs text-[#6c7387]">{stop2.address}</p>}
                </div>
                {stop2 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStop2(null);
                    }}
                    className="text-[#8b9cb5] hover:text-[#001a43]"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Stop 3 */}
            <div className="relative pt-2">
              <div className="absolute -left-[27px] top-4 w-6 h-6 rounded-full bg-[#c9a227] text-[#001a43] text-xs font-bold flex items-center justify-center shadow-2xs">
                3
              </div>
              <div
                onClick={() => setActiveStopIndex(3)}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  activeStopIndex === 3
                    ? 'border-[#c9a227] bg-[#fffaf0] ring-2 ring-[#c9a227]/20'
                    : 'border-[#dfe4f2] bg-[#f8fbff] hover:bg-white'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#001a43]">
                    {stop3 ? stop3.name : 'Add stop 3'}
                  </p>
                  {stop3 && <p className="text-xs text-[#6c7387]">{stop3.address}</p>}
                </div>
                {stop3 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setStop3(null);
                    }}
                    className="text-[#8b9cb5] hover:text-[#001a43]"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Location picker dropdown */}
          {activeStopIndex !== null && (
            <div className="mt-4 p-3 bg-[#f8fbff] rounded-2xl border border-[#dfe4f2] space-y-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-[#dfe4f2]">
                <span className="material-symbols-outlined text-[18px] text-[#8b9cb5]">search</span>
                <input
                  type="text"
                  placeholder={`Search place for stop ${activeStopIndex}...`}
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full text-xs bg-transparent text-[#001a43] focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredLocations.slice(0, 6).map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className="p-2 rounded-xl hover:bg-[#e8effc] cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#001a43]">{loc.name}</p>
                      <p className="text-[10px] text-[#6c7387]">{loc.city}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#003d9b]">Select</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Policy Notice & Done Button */}
        <div className="p-5 border-t border-[#dfe4f2] bg-[#f8fbff] space-y-3">
          <div className="flex items-start gap-2.5 text-[#6c7387] text-[11px] leading-relaxed">
            <span className="material-symbols-outlined text-[16px] text-[#003d9b] mt-0.5">info</span>
            <p>
              You can spend up to <strong className="text-[#001a43]">2 min</strong> at your stop.*
              If exceeded, standard waiting charges will be applied.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDone}
            className="w-full py-3.5 rounded-full bg-[#001a43] hover:bg-[#002d6b] text-white text-sm font-bold shadow-[0_10px_26px_rgba(0,26,67,0.15)] active:scale-98 transition-all"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}
