'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { SriLankaLocation } from '@/data/sri-lanka-locations';

export interface SriLankaRealMapProps {
  pickup: SriLankaLocation;
  drop: SriLankaLocation | null;
  stops: SriLankaLocation[];
  isOnMapPickerActive: boolean;
  onMapPickerConfirm: (loc: { lat: number; lng: number; address: string }) => void;
  onMapPickerCancel: () => void;
  onCurrentLocationClick?: () => void;
}

export default function SriLankaRealMap({
  pickup,
  drop,
  stops,
  isOnMapPickerActive,
  onMapPickerConfirm,
  onMapPickerCancel,
  onCurrentLocationClick,
}: SriLankaRealMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const [centerCoords, setCenterCoords] = useState<{ lat: number; lng: number }>({
    lat: pickup.lat,
    lng: pickup.lng,
  });
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    let isMounted = true;

    async function initLeaflet() {
      const L = (await import('leaflet')).default;

      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      if (!isMounted || !mapContainerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [pickup.lat || 6.9271, pickup.lng || 79.8612],
        zoom: 13,
        zoomControl: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;

      map.on('move', () => {
        const c = map.getCenter();
        setCenterCoords({ lat: c.lat, lng: c.lng });
      });

      setMapLoaded(true);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !markersLayerRef.current) return;

    async function updateMarkers() {
      const L = (await import('leaflet')).default;
      const map = mapInstanceRef.current;
      const markersLayer = markersLayerRef.current;

      markersLayer.clearLayers();

      const routePoints: [number, number][] = [];

      // 1. Pickup Marker (Navy circle + Gold icon)
      if (pickup.lat && pickup.lng) {
        routePoints.push([pickup.lat, pickup.lng]);
        const pickupIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="absolute -inset-2 bg-[#003d9b]/25 rounded-full animate-ping"></div>
              <div class="w-8 h-8 rounded-full bg-[#001a43] border-2 border-white shadow-lg flex items-center justify-center text-white">
                <span class="material-symbols-outlined text-[18px] text-[#ffd977]">person_pin_circle</span>
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        const pMarker = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon }).addTo(
          markersLayer
        );
        pMarker.bindPopup(`<b>Pickup:</b> ${pickup.name}<br/><span style="font-size:11px;color:#4e5568">${pickup.address}</span>`);
      }

      // 2. Intermediate Stops
      stops.forEach((stop, index) => {
        if (stop.lat && stop.lng) {
          routePoints.push([stop.lat, stop.lng]);
          const stopIcon = L.divIcon({
            className: 'custom-map-icon',
            html: `
              <div class="w-7 h-7 rounded-full bg-[#c9a227] border-2 border-white shadow-md flex items-center justify-center text-[#001a43] text-xs font-black">
                ${index + 1}
              </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
          });

          const sMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon }).addTo(
            markersLayer
          );
          sMarker.bindPopup(`<b>Stop ${index + 1}:</b> ${stop.name}<br/><span style="font-size:11px;color:#4e5568">${stop.address}</span>`);
        }
      });

      // 3. Drop-off Marker
      if (drop && drop.lat && drop.lng) {
        routePoints.push([drop.lat, drop.lng]);
        const dropIcon = L.divIcon({
          className: 'custom-map-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="w-9 h-9 rounded-full bg-[#c9a227] border-2 border-[#001a43] shadow-xl flex items-center justify-center text-[#001a43]">
                <span class="material-symbols-outlined text-[20px]">location_on</span>
              </div>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });

        const dMarker = L.marker([drop.lat, drop.lng], { icon: dropIcon }).addTo(
          markersLayer
        );
        dMarker.bindPopup(`<b>Drop:</b> ${drop.name}<br/><span style="font-size:11px;color:#4e5568">${drop.address}</span>`);
      }

      // 4. Simulated Nearby Vehicles
      if (pickup.lat && pickup.lng) {
        const nearbyOffsets = [
          { dLat: 0.0035, dLng: 0.0042, type: 'tuk', label: 'Tuk • 1m away' },
          { dLat: -0.0045, dLng: -0.0038, type: 'car', label: 'Flex • 2m away' },
          { dLat: 0.0055, dLng: -0.0052, type: 'bike', label: 'Bike • 1m away' },
          { dLat: -0.0032, dLng: 0.0065, type: 'van', label: 'Van • 4m away' },
        ];

        nearbyOffsets.forEach((v) => {
          const vLat = pickup.lat + v.dLat;
          const vLng = pickup.lng + v.dLng;

          const vehicleIcon = L.divIcon({
            className: 'custom-map-icon',
            html: `
              <div class="group relative flex flex-col items-center cursor-pointer">
                <span class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 px-2 py-0.5 rounded text-[10px] font-bold text-[#001a43] shadow border border-[#dfe4f2] whitespace-nowrap mb-1">
                  ${v.label}
                </span>
                <div class="w-7 h-7 rounded-full bg-white border border-[#dfe4f2] shadow-md flex items-center justify-center text-[#001a43]">
                  <span class="material-symbols-outlined text-[16px] ${v.type === 'tuk' ? 'text-[#c9a227]' : 'text-[#001a43]'}">
                    ${v.type === 'tuk' ? 'electric_rickshaw' : v.type === 'bike' ? 'two_wheeler' : v.type === 'van' ? 'airport_shuttle' : 'directions_car'}
                  </span>
                </div>
              </div>
            `,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });

          L.marker([vLat, vLng], { icon: vehicleIcon }).addTo(markersLayer);
        });
      }

      // 5. Route Polyline
      if (polylineRef.current) {
        polylineRef.current.remove();
        polylineRef.current = null;
      }

      if (routePoints.length >= 2) {
        const routeLine = L.polyline(routePoints, {
          color: '#001a43',
          weight: 5,
          opacity: 0.85,
          smoothFactor: 1,
        }).addTo(map);

        const glowLine = L.polyline(routePoints, {
          color: '#c9a227',
          weight: 9,
          opacity: 0.35,
          smoothFactor: 1,
        }).addTo(map);

        polylineRef.current = L.layerGroup([glowLine, routeLine]);

        const bounds = L.latLngBounds(routePoints);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
      } else if (pickup.lat && pickup.lng) {
        map.setView([pickup.lat, pickup.lng], 14, { animate: true });
      }
    }

    updateMarkers();
  }, [mapLoaded, pickup, drop, stops]);

  const handleGPSClick = () => {
    if (onCurrentLocationClick) {
      onCurrentLocationClick();
    } else if (navigator.geolocation && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
        },
        () => {
          mapInstanceRef.current.setView([6.9271, 79.8612], 14, { animate: true });
        }
      );
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#f8fbff] overflow-hidden select-none">
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Crosshair Target Pin when "Set Location on Map" is active */}
      {isOnMapPickerActive && (
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
          <div className="relative -mt-8 flex flex-col items-center">
            <div className="bg-[#001a43] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg mb-1 animate-bounce">
              Move map to pinpoint location
            </div>
            <div className="relative">
              <span className="material-symbols-outlined text-[40px] text-[#c9a227] drop-shadow-md">
                location_on
              </span>
              <div className="w-2.5 h-2.5 bg-[#001a43] rounded-full mx-auto -mt-1 shadow"></div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Controls on Top-Right */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,26,67,0.08)] border border-[#dfe4f2] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-[#001a43]">
            Sri Lanka • Live Map
          </span>
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-2xs text-xs text-[#4e5568] flex items-center gap-1.5 border border-[#dfe4f2]">
          <span className="material-symbols-outlined text-[14px] text-emerald-600">traffic</span>
          <span className="text-xs font-medium text-[#001a43]">Smooth Traffic</span>
        </div>
      </div>

      {/* Floating Navigation Controls on Bottom-Right */}
      <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          type="button"
          onClick={handleGPSClick}
          title="Current Location"
          className="w-11 h-11 rounded-full bg-white text-[#001a43] shadow-[0_4px_20px_rgba(0,26,67,0.12)] border border-[#dfe4f2] flex items-center justify-center hover:bg-[#f8fbff] transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px] text-[#003d9b]">my_location</span>
        </button>

        <div className="flex flex-col bg-white rounded-full shadow-[0_4px_20px_rgba(0,26,67,0.12)] border border-[#dfe4f2] overflow-hidden">
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-11 h-10 flex items-center justify-center text-[#001a43] hover:bg-[#f8fbff] transition-colors border-b border-[#dfe4f2] font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-11 h-10 flex items-center justify-center text-[#001a43] hover:bg-[#f8fbff] transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar when "Set Location on Map" is active */}
      {isOnMapPickerActive && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-md pointer-events-auto">
          <div className="bg-white rounded-3xl p-4 shadow-[0_24px_60px_rgba(0,26,67,0.18)] border border-[#dfe4f2] flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c9a227] text-[22px]">pin_drop</span>
              <div className="flex-1 truncate">
                <p className="text-xs font-medium text-[#8b9cb5]">
                  Selected Coordinates
                </p>
                <p className="text-xs font-semibold text-[#001a43]">
                  {centerCoords.lat.toFixed(4)}° N, {centerCoords.lng.toFixed(4)}° E (Sri Lanka)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onMapPickerCancel}
                className="flex-1 py-2.5 rounded-xl border border-[#dfe4f2] text-xs font-semibold text-[#4e5568] hover:bg-[#f8fbff] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  onMapPickerConfirm({
                    lat: centerCoords.lat,
                    lng: centerCoords.lng,
                    address: `Pinpoint on Map (${centerCoords.lat.toFixed(4)}, ${centerCoords.lng.toFixed(4)})`,
                  })
                }
                className="flex-1 py-2.5 rounded-xl bg-[#001a43] hover:bg-[#002d6b] text-white text-xs font-bold transition-colors shadow-md flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffd977]">check</span>
                Confirm Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
