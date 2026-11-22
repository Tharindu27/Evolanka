'use client';

import React, { useState, useMemo } from 'react';
import {
  SRI_LANKA_LOCATIONS,
  PRESET_SAVED_LOCATIONS,
  type SriLankaLocation,
} from '@/data/sri-lanka-locations';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeField: 'pickup' | 'drop';
  pickup: SriLankaLocation;
  drop: SriLankaLocation | null;
  isReturnTrip: boolean;
  onSelectLocation: (field: 'pickup' | 'drop', loc: SriLankaLocation) => void;
  onSetOnMapClick: () => void;
  onAddStopsClick: () => void;
  onToggleReturnTrip: (isReturn: boolean) => void;
}

export default function LocationSearchModal({
  isOpen,
  onClose,
  activeField,
  pickup,
  drop,
  isReturnTrip,
  onSelectLocation,
  onSetOnMapClick,
  onAddStopsClick,
  onToggleReturnTrip,
}: LocationSearchModalProps) {
  const [currentField, setCurrentField] = useState<'pickup' | 'drop'>(activeField);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'airport' | 'hotel' | 'transit' | 'attraction'>('all');
  const [bookForFriend, setBookForFriend] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [showFriendModal, setShowFriendModal] = useState(false);

  React.useEffect(() => {
    setCurrentField(activeField);
  }, [activeField, isOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let baseList = q ? SRI_LANKA_LOCATIONS : PRESET_SAVED_LOCATIONS;

    if (categoryFilter !== 'all') {
      baseList = SRI_LANKA_LOCATIONS.filter((loc) => {
        if (categoryFilter === 'airport') return loc.type === 'airport';
        if (categoryFilter === 'hotel') return loc.type === 'hotel';
        if (categoryFilter === 'transit') return loc.type === 'transit';
        if (categoryFilter === 'attraction') return loc.type === 'landmark';
        return true;
      });
    }

    if (!q) return baseList;

    return baseList.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q)
    );
  }, [searchQuery, categoryFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-3xl shadow-[0_24px_60px_rgba(0,26,67,0.14)] border border-slate-200/90 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#001a43] hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Book for a friend Pill Button */}
          <button
            type="button"
            onClick={() => setShowFriendModal(!showFriendModal)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs ${
              bookForFriend
                ? 'bg-[#001a43] text-white'
                : 'bg-slate-100 text-[#001a43] hover:bg-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">person</span>
            <span>{bookForFriend ? `For ${friendName || 'Friend'}` : 'Book for a friend'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-[#6c7387] hover:text-[#001a43] px-2 py-1"
          >
            Done
          </button>
        </div>

        {/* Optional Friend Details Input Row */}
        {showFriendModal && (
          <div className="px-5 py-3 bg-[#f8fbff] border-b border-slate-100 flex flex-col gap-2">
            <p className="text-xs font-semibold text-[#001a43]">
              Passenger Contact Information
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Friend's Full Name"
                value={friendName}
                onChange={(e) => {
                  setFriendName(e.target.value);
                  setBookForFriend(true);
                }}
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003d9b] text-[#001a43]"
              />
              <input
                type="tel"
                placeholder="+94 7X XXX XXXX"
                value={friendPhone}
                onChange={(e) => setFriendPhone(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003d9b] text-[#001a43]"
              />
            </div>
          </div>
        )}

        {/* Input Fields Box (Pickup & Drop) */}
        <div className="px-5 py-3">
          <div className="bg-[#f8fbff] rounded-2xl p-3 border border-slate-200/90 space-y-2 relative">
            <div className="absolute left-[24px] top-[30px] bottom-[30px] w-0.5 bg-slate-300 pointer-events-none" />

            {/* PICKUP Field */}
            <div
              onClick={() => setCurrentField('pickup')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                currentField === 'pickup'
                  ? 'bg-white border-[#003d9b] ring-1.5 ring-[#003d9b]/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:bg-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#001a43] shrink-0 ml-0.5" />
              <span className="text-xs font-semibold text-[#003d9b] w-12 shrink-0">
                Pickup
              </span>
              <input
                type="text"
                value={
                  currentField === 'pickup'
                    ? searchQuery
                    : pickup.name || 'Location fetched'
                }
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where to pick you up?"
                className="w-full text-xs font-medium text-[#001a43] bg-transparent focus:outline-none"
                autoFocus={currentField === 'pickup'}
              />
              {pickup.name && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery('');
                  }}
                  className="text-slate-400 hover:text-[#001a43]"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* DROP Field */}
            <div
              onClick={() => setCurrentField('drop')}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                currentField === 'drop'
                  ? 'bg-white border-[#c9a227] ring-1.5 ring-[#c9a227]/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:bg-white'
              }`}
            >
              <span className="w-2 h-2 rounded-xs bg-[#c9a227] shrink-0 ml-0.5" />
              <span className="text-xs font-semibold text-[#b08d1f] w-12 shrink-0">
                {isReturnTrip ? 'Stop' : 'Drop'}
              </span>
              <input
                type="text"
                value={
                  currentField === 'drop'
                    ? searchQuery
                    : drop?.name || ''
                }
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isReturnTrip ? 'Where are you stopping?' : 'Where are you going?'}
                className="w-full text-xs font-medium text-[#001a43] bg-transparent focus:outline-none"
                autoFocus={currentField === 'drop'}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddStopsClick();
                }}
                title="Add stops"
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-[#001a43] hover:text-white flex items-center justify-center text-[#001a43] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Filter Categories (Airports, Railway, Hotels, Attractions) */}
        <div className="px-5 pb-2 flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {[
            { id: 'all', label: 'All Places' },
            { id: 'airport', label: 'Airports (CMB/HRI)' },
            { id: 'transit', label: 'Train & Bus Stations' },
            { id: 'hotel', label: 'Top Hotels' },
            { id: 'attraction', label: 'Attractions' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-[#001a43] text-white'
                  : 'bg-slate-100 text-[#4e5568] hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Action Buttons (Saved Addresses & Set on Map) */}
        <div className="px-5 py-2 flex items-center justify-between border-y border-slate-100">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSetOnMapClick();
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#001a43] hover:text-[#003d9b]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#003d9b]">pin_drop</span>
            <span>Pinpoint Location on Map</span>
          </button>

          <span className="text-xs text-[#6c7387]">
            {searchResults.length} places available
          </span>
        </div>

        {/* Suggested Locations List */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-1 [scrollbar-width:thin]">
          {searchResults.map((loc) => (
            <div
              key={loc.id}
              onClick={() => {
                onSelectLocation(currentField, loc);
                onClose();
              }}
              className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#f8fbff] border border-transparent hover:border-slate-200 transition-colors cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 text-[#001a43] group-hover:bg-[#e8effc] group-hover:text-[#003d9b] flex items-center justify-center shrink-0 transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  {loc.type === 'home'
                    ? 'home'
                    : loc.type === 'work'
                    ? 'work'
                    : loc.type === 'airport'
                    ? 'flight'
                    : loc.type === 'hotel'
                    ? 'hotel'
                    : loc.type === 'university'
                    ? 'school'
                    : 'location_on'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#001a43] truncate group-hover:text-[#003d9b] transition-colors">
                  {loc.name}
                </p>
                <p className="text-[11px] text-[#6c7387] truncate">{loc.address}</p>
              </div>
              <span className="text-[10px] font-medium text-[#4e5568] bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                {loc.district}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
