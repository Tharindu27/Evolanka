'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import {
  PRESET_SAVED_LOCATIONS,
  type SriLankaLocation,
} from '@/data/sri-lanka-locations';
import {
  SRI_LANKAN_FLEET,
  calculateDistanceKm,
  type VehicleOption,
} from '@/lib/taxi-fare-calculator';
import LocationSearchModal from './LocationSearchModal';
import AddStopsModal from './AddStopsModal';
import VehicleSelectorDrawer from './VehicleSelectorDrawer';
import type { SriLankaRealMapProps } from './SriLankaRealMap';

// Dynamically import Leaflet map with SSR turned off
const SriLankaRealMap = dynamic<SriLankaRealMapProps>(() => import('./SriLankaRealMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] bg-[#f8fbff] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-3 border-[#001a43] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-semibold text-[#001a43]">Loading Sri Lanka Street Map...</span>
    </div>
  ),
});

export default function TaxiBookingContent() {
  const router = useRouter();

  // Location states
  const [pickup, setPickup] = useState<SriLankaLocation>({
    id: 'galle-face',
    name: 'Galle Face Hotel, Colombo 03',
    address: '2 Galle Road, Colombo 03',
    city: 'Colombo',
    district: 'Colombo',
    lat: 6.9205,
    lng: 79.8458,
    type: 'hotel',
  });

  const [drop, setDrop] = useState<SriLankaLocation | null>({
    id: 'cmb-airport',
    name: "Bandaranaike Int'l Airport (CMB)",
    address: 'Canada Friendship Road, Katunayake',
    city: 'Katunayake',
    district: 'Gampaha',
    lat: 7.1808,
    lng: 79.8841,
    type: 'airport',
  });

  const [stops, setStops] = useState<SriLankaLocation[]>([]);
  const [isReturnTrip, setIsReturnTrip] = useState<boolean>(false);

  // Modals & Mode states
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeSearchField, setActiveSearchField] = useState<'pickup' | 'drop'>('drop');
  const [isAddStopsOpen, setIsAddStopsOpen] = useState(false);
  const [isOnMapPickerActive, setIsOnMapPickerActive] = useState(false);

  // Selected vehicle (default Tuk for authentic Sri Lankan feel, or Flex/Sedan)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption>(
    SRI_LANKAN_FLEET[0]
  );

  // Calculate route distance across pickup -> stops -> drop
  const totalDistanceKm = useMemo(() => {
    if (!drop) return 5.0;
    let dist = 0;
    let prev = pickup;

    stops.forEach((s) => {
      dist += calculateDistanceKm(prev.lat, prev.lng, s.lat, s.lng);
      prev = s;
    });

    dist += calculateDistanceKm(prev.lat, prev.lng, drop.lat, drop.lng);
    return Number(dist.toFixed(1));
  }, [pickup, drop, stops]);

  const handleOpenSearch = (field: 'pickup' | 'drop') => {
    setActiveSearchField(field);
    setIsSearchModalOpen(true);
  };

  const handleSelectLocation = (field: 'pickup' | 'drop', loc: SriLankaLocation) => {
    if (field === 'pickup') {
      setPickup(loc);
    } else {
      setDrop(loc);
    }
  };

  const handleConfirmOnMap = (loc: { lat: number; lng: number; address: string }) => {
    const newLoc: SriLankaLocation = {
      id: `custom-map-${Date.now()}`,
      name: loc.address,
      address: `Selected GPS Point (${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)})`,
      city: 'Sri Lanka',
      district: 'Western',
      lat: loc.lat,
      lng: loc.lng,
      type: 'recent',
    };

    if (activeSearchField === 'pickup') {
      setPickup(newLoc);
    } else {
      setDrop(newLoc);
    }

    setIsOnMapPickerActive(false);
  };

  const handleFetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPickup({
            id: 'current-gps',
            name: 'Current Location (GPS)',
            address: `Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`,
            city: 'Colombo',
            district: 'Colombo',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            type: 'recent',
          });
        },
        () => {
          setPickup({
            id: 'galle-face',
            name: 'Galle Face Hotel, Colombo 03',
            address: '2 Galle Road, Colombo 03',
            city: 'Colombo',
            district: 'Colombo',
            lat: 6.9205,
            lng: 79.8458,
            type: 'hotel',
          });
        }
      );
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col lg:flex-row overflow-hidden bg-[#f8fbff]">
      {/* Search Modal */}
      <LocationSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        activeField={activeSearchField}
        pickup={pickup}
        drop={drop}
        isReturnTrip={isReturnTrip}
        onSelectLocation={handleSelectLocation}
        onSetOnMapClick={() => {
          setIsSearchModalOpen(false);
          setIsOnMapPickerActive(true);
        }}
        onAddStopsClick={() => {
          setIsSearchModalOpen(false);
          setIsAddStopsOpen(true);
        }}
        onToggleReturnTrip={(isReturn) => setIsReturnTrip(isReturn)}
      />

      {/* Multi-Stop Modal */}
      <AddStopsModal
        isOpen={isAddStopsOpen}
        onClose={() => setIsAddStopsOpen(false)}
        pickup={pickup}
        currentStops={stops}
        onConfirmStops={(newStops) => setStops(newStops)}
      />

      {/* LEFT FLOATING BOOKING CARD: Human-Designed Clean Panel */}
      <div className="w-full lg:w-[420px] h-full z-10 shrink-0 p-3 sm:p-4 lg:p-5 flex flex-col pointer-events-auto">
        <aside className="w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,26,67,0.08)] border border-slate-200/80 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header: Human, warm & clear */}
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-[#001a43]">
                  Request a Ride
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-[#4e5568]">
                  Sri Lanka
                </span>
              </div>
              <p className="text-xs text-[#6c7387]">
                Instant pickups &amp; transfers across all districts
              </p>
            </div>

            {/* Segmented Mode: One-way vs Round-trip */}
            <div className="px-5 pb-3">
              <div className="flex p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIsReturnTrip(false)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    !isReturnTrip
                      ? 'bg-white text-[#001a43] shadow-xs'
                      : 'text-[#6c7387] hover:text-[#001a43]'
                  }`}
                >
                  One-way
                </button>
                <button
                  type="button"
                  onClick={() => setIsReturnTrip(true)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isReturnTrip
                      ? 'bg-white text-[#001a43] shadow-xs'
                      : 'text-[#6c7387] hover:text-[#001a43]'
                  }`}
                >
                  Round-trip
                </button>
              </div>
            </div>

            {/* Unified Route Card (Uber/PickMe style) */}
            <div className="px-5 pb-3">
              <div className="relative rounded-2xl border border-slate-200/90 bg-[#f8fbff] p-3 space-y-2">
                {/* Visual Route Connector Track */}
                <div className="absolute left-[23px] top-[26px] bottom-[26px] w-0.5 bg-slate-300" />

                {/* Pickup Row */}
                <div className="relative flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#001a43] ring-4 ring-white shrink-0 z-10 ml-0.5" />
                  <div
                    onClick={() => handleOpenSearch('pickup')}
                    className="flex-1 min-w-0 cursor-pointer group"
                  >
                    <span className="block text-[10px] font-semibold text-[#003d9b] uppercase tracking-wider">
                      Pickup location
                    </span>
                    <span className="block text-sm font-medium text-[#001a43] truncate group-hover:text-[#003d9b] transition-colors">
                      {pickup.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFetchCurrentLocation}
                    title="Use current GPS"
                    className="w-8 h-8 rounded-full text-[#6c7387] hover:text-[#001a43] hover:bg-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">my_location</span>
                  </button>
                </div>

                {/* Intermediate Stops list */}
                {stops.length > 0 && (
                  <div className="pl-6 space-y-1.5 py-1">
                    {stops.map((st, i) => (
                      <div
                        key={st.id}
                        className="flex items-center justify-between bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-4 h-4 rounded-full bg-[#c9a227] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="truncate font-medium text-[#001a43]">{st.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStops(stops.filter((_, idx) => idx !== i))}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="h-px bg-slate-200/80 ml-6" />

                {/* Drop Row */}
                <div className="relative flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-xs bg-[#c9a227] ring-4 ring-white shrink-0 z-10 ml-0.5" />
                  <div
                    onClick={() => handleOpenSearch('drop')}
                    className="flex-1 min-w-0 cursor-pointer group"
                  >
                    <span className="block text-[10px] font-semibold text-[#b08d1f] uppercase tracking-wider">
                      {isReturnTrip ? 'Intermediate destination' : 'Where are you going?'}
                    </span>
                    <span
                      className={`block text-sm truncate transition-colors ${
                        drop
                          ? 'font-medium text-[#001a43] group-hover:text-[#c9a227]'
                          : 'text-slate-400 font-normal'
                      }`}
                    >
                      {drop ? drop.name : 'Search drop-off destination'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddStopsOpen(true)}
                    title="Add a stop along the way"
                    className="w-8 h-8 rounded-full text-[#6c7387] hover:text-[#001a43] hover:bg-white flex items-center justify-center transition-colors shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Location Shortcuts: Clean horizontal chips */}
            <div className="px-5 pb-3 flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
              <button
                type="button"
                onClick={() => setDrop(PRESET_SAVED_LOCATIONS[0])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-[#001a43] hover:bg-slate-100 transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-[#c9a227]">home</span>
                <span>Home (Galle)</span>
              </button>
              <button
                type="button"
                onClick={() => setDrop(PRESET_SAVED_LOCATIONS[1])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-[#001a43] hover:bg-slate-100 transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-[#003d9b]">work</span>
                <span>Work (Colombo)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setIsOnMapPickerActive(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-[#001a43] hover:bg-slate-100 transition-colors shrink-0"
              >
                <span className="material-symbols-outlined text-[15px] text-emerald-600">pin_drop</span>
                <span>Set on Map</span>
              </button>
            </div>
          </div>

          {/* Vehicle Selection & Booking Action */}
          <div className="px-5 pb-5 pt-2 border-t border-slate-100">
            <VehicleSelectorDrawer
              distanceKm={totalDistanceKm}
              isReturnTrip={isReturnTrip}
              stopsCount={stops.length}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={(v) => setSelectedVehicle(v)}
              onBookNow={() => {
                router.push('/taxis/dispatch');
              }}
              onLaterSchedule={() => {
                alert('Schedule Ride: Your ride booking can be reserved for any future date/time.');
              }}
            />
          </div>
        </aside>
      </div>

      {/* RIGHT AREA: Real Interactive Sri Lanka Map */}
      <main className="flex-1 h-full relative overflow-hidden select-none">
        <SriLankaRealMap
          pickup={pickup}
          drop={drop}
          stops={stops}
          isOnMapPickerActive={isOnMapPickerActive}
          onMapPickerConfirm={handleConfirmOnMap}
          onMapPickerCancel={() => setIsOnMapPickerActive(false)}
          onCurrentLocationClick={handleFetchCurrentLocation}
        />
      </main>
    </div>
  );
}
