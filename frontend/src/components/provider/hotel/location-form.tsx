'use client';

import { useState, type MouseEvent, type ReactNode } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import { provinceDistricts } from '@/data/provider-verification-data/sri-lanka-regions';
import { propertyCategoryHeading, type PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10 disabled:cursor-not-allowed disabled:bg-[#f5f7fc] disabled:text-[#8a93a8]';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

// Map viewport covers a small area around Colombo.
const MAP_NORTH = 6.98;
const MAP_WEST = 79.82;
const MAP_SPAN = 0.08;

type Pin = { x: number; y: number };

function Field({
  label,
  required,
  optional,
  className = '',
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label} {required && <span className="text-[#b08d1f]">*</span>}
        {optional && <span className="font-normal normal-case tracking-normal text-[#8a93a8]">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

export default function LocationForm({ category }: { category: PropertyCategory }) {
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [search, setSearch] = useState('');
  const [pin, setPin] = useState<Pin | null>(null);

  const districts = province ? provinceDistricts[province] : [];
  const heading = propertyCategoryHeading[category];

  const isValid = Boolean(
    province && district && city.trim() && addressLine1.trim() && postalCode.trim() && pin,
  );

  const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPin({
      x: Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1),
      y: Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1),
    });
  };

  const latitude = pin ? MAP_NORTH - pin.y * MAP_SPAN : null;
  const longitude = pin ? MAP_WEST + pin.x * MAP_SPAN : null;

  return (
    <HostSetupLayout
      backHref={`${base}/property-name?category=${category}`}
      nextHref={`${base}/facilities?category=${category}`}
      nextDisabled={!isValid}
      helpText="Need help setting up your location?"
    >
      <div className="mx-auto max-w-[640px] text-center">
        <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">
          Where is your {heading}?
        </h1>
        <p className="brand-page-subtitle mt-4 text-sm md:text-base">
          Provide your property&apos;s exact address and pinpoint the pin on the map for traveler bookings.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[800px] space-y-6">
        <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-[#e3e8f4] pb-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">📍</span>
            <div>
              <h2 className="text-lg font-bold text-[#001a43]">Address</h2>
              <p className="text-xs text-[#6c7387]">Official registered location of your premises</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Province" required className="md:col-span-2">
              <div className="relative">
                <select
                  value={province}
                  onChange={(event) => {
                    setProvince(event.target.value);
                    setDistrict('');
                  }}
                  className={`${inputClass} ${province ? '' : 'text-[#8a93a8]'}`}
                >
                  <option value="">Select province</option>
                  {Object.keys(provinceDistricts).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {province && (
                  <span className="pointer-events-none absolute right-9 top-1/2 -translate-y-1/2 rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b08d1f]">
                    Selected
                  </span>
                )}
              </div>
            </Field>

            <Field label="District" required>
              <select
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                disabled={!province}
                className={`${inputClass} ${district ? '' : 'text-[#8a93a8]'}`}
              >
                <option value="">{province ? 'Select district' : 'Select a province first'}</option>
                {districts.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="City" required>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="e.g. Colombo 02"
                className={inputClass}
              />
            </Field>

            <Field label="Address line 1" required>
              <input
                type="text"
                value={addressLine1}
                onChange={(event) => setAddressLine1(event.target.value)}
                placeholder="Street address"
                className={inputClass}
              />
            </Field>

            <Field label="Address line 2" optional>
              <input
                type="text"
                value={addressLine2}
                onChange={(event) => setAddressLine2(event.target.value)}
                placeholder="Area / sector"
                className={inputClass}
              />
            </Field>

            <Field label="ZIP / Postal code" required>
              <input
                type="text"
                inputMode="numeric"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                placeholder="e.g. 00200"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <h2 className="text-lg font-bold text-[#001a43]">Confirm location on map</h2>
          <p className="mt-1 text-sm text-[#6c7387]">Click anywhere on the map to select your property location.</p>

          <div
            role="application"
            aria-label="Property location map"
            onClick={handleMapClick}
            className="relative mt-5 h-[340px] cursor-crosshair overflow-hidden rounded-xl border border-[#dce3f1] bg-[#eef2fb]"
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 340" preserveAspectRatio="none" aria-hidden>
              <rect width="600" height="340" fill="#eef2fb" />
              <path d="M0 230 Q90 200 150 260 T170 340 L0 340 Z" fill="#d6e4f7" />
              <path d="M350 0 L360 340" stroke="#c5cde0" strokeWidth="6" fill="none" />
              <path d="M60 90 Q300 160 560 150" stroke="#d2d9ea" strokeWidth="5" fill="none" />
              <path d="M120 150 L420 340" stroke="#d2d9ea" strokeWidth="4" fill="none" />
              <path d="M230 40 L340 140" stroke="#dce3f1" strokeWidth="3" fill="none" />
              <path d="M420 60 L590 250" stroke="#dce3f1" strokeWidth="3" fill="none" />
              <path d="M0 40 L240 60" stroke="#dce3f1" strokeWidth="3" fill="none" />
              <circle cx="300" cy="250" r="34" fill="#dcead6" />
            </svg>

            <span className="pointer-events-none absolute left-[62%] top-[22%] text-[10px] font-bold uppercase tracking-widest text-[#8a93a8]">
              Maradana
            </span>
            <span className="pointer-events-none absolute left-[48%] top-[78%] text-[10px] font-bold uppercase tracking-widest text-[#8a93a8]">
              Wekanda
            </span>

            <div
              className="absolute left-4 top-4 flex w-[min(100%-2rem,20rem)] items-center gap-2 rounded-lg border border-[#dce3f1] bg-white px-3 py-2 shadow-sm"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="text-sm text-[#8a93a8]">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search area"
                aria-label="Search area"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#001a43] outline-none placeholder:text-[#8a93a8]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="text-sm text-[#6c7387] hover:text-[#001a43]"
                >
                  ×
                </button>
              )}
            </div>

            {pin && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${pin.x * 100}%`, top: `${pin.y * 100}%` }}
              >
                <div className="mb-1 whitespace-nowrap rounded-md bg-[#001a43] px-2.5 py-1 text-[11px] font-bold text-white shadow">
                  {heading} Exact Location
                </div>
                <div className="text-center text-2xl leading-none text-[#d64545]">📍</div>
              </div>
            )}

            <div className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg border border-[#dce3f1] bg-white/95 px-3 py-2 text-[11px] text-[#4e5568] shadow-sm">
              <span className={`h-2 w-2 rounded-full ${pin ? 'bg-[#2f9e6b]' : 'bg-[#c5cde0]'}`} />
              {latitude !== null && longitude !== null
                ? `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E | Sri Lanka`
                : 'No location selected yet'}
            </div>
          </div>
        </section>
      </div>
    </HostSetupLayout>
  );
}
