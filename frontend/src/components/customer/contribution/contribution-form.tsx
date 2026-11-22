'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type ReactNode } from 'react';

import { categories, provinces } from '@/data/location-data/location-mock-data';
import { maxGalleryPhotos, suggestedHotels, weekDays } from '@/data/customer-contribution-data';

type Photo = { id: string; name: string; url: string };
type Tip = { id: string; type: string; text: string };
type Errors = Partial<Record<'name' | 'provinceId' | 'district' | 'city' | 'summary' | 'coverPhoto' | 'coordinates', string>>;

const tipTypes = ['Safety', 'Etiquette', 'Wildlife', 'Custom Guide Advice'];
const maxPhotoBytes = 10 * 1024 * 1024;
const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];

const inputClass =
  'w-full rounded-xl border border-[#dfe7f5] bg-white px-4 py-2.5 text-sm text-[#001a43] outline-none transition placeholder:text-[#9aa3b5] focus:border-[#0d4abe]/40 focus:ring-4 focus:ring-[#0d4abe]/10 disabled:cursor-not-allowed disabled:bg-[#f3f6fc] disabled:text-[#9aa3b5]';
const outlineButton =
  'rounded-lg border border-[#dfe7f5] bg-white px-4 py-2 text-xs font-bold text-[#001a43] transition hover:bg-[#f4f8ff]';
const softButton = 'rounded-lg bg-[#eef3ff] px-4 py-2 text-xs font-bold text-[#0d4abe] transition hover:bg-[#e1eaff]';

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-5 w-5 stroke-[#001a43]',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function SectionCard({ step, icon, title, subtitle, children }: { step: number; icon: ReactNode; title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="rounded-[22px] border border-[#dfe4f2] bg-white p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)]">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff] text-[#0d4abe]">{icon}</div>
        <div>
          <h2 className="text-[1.02rem] font-black tracking-[-0.02em] text-[#001a43]">
            {step}. {title}
          </h2>
          <p className="mt-0.5 text-sm text-[#6d7280]">{subtitle}</p>
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-[#c4161c]">{error}</span> : null}
    </label>
  );
}

function newId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function ContributionForm() {
  const [name, setName] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  const [summary, setSummary] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState('');

  const [days, setDays] = useState<string[]>([]);
  const [hours, setHours] = useState('');
  const [season, setSeason] = useState('');

  const [freeEntry, setFreeEntry] = useState(false);
  const [prices, setPrices] = useState({ localAdults: '', localChildren: '', foreignAdults: '', foreignChildren: '' });
  const [ticketNote, setTicketNote] = useState('');

  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState('');

  const [linkedHotels, setLinkedHotels] = useState<string[]>([]);
  const [customHotelInput, setCustomHotelInput] = useState('');
  const [customHotels, setCustomHotels] = useState<string[]>([]);

  const [tips, setTips] = useState<Tip[]>([]);
  const [composerOpen, setComposerOpen] = useState(true);
  const [tipType, setTipType] = useState(tipTypes[0]);
  const [tipDraft, setTipDraft] = useState('');

  const [cover, setCover] = useState<Photo | null>(null);
  const [gallery, setGallery] = useState<Photo[]>([]);
  const [dragging, setDragging] = useState(false);
  const [photoError, setPhotoError] = useState('');

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<'draft' | 'review' | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    const urls = urlsRef;
    return () => urls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const province = provinces.find((item) => item.id === provinceId);
  const latNum = Number(lat);
  const lngNum = Number(lng);
  const hasCoordinates = lat.trim() !== '' && lng.trim() !== '' && !Number.isNaN(latNum) && !Number.isNaN(lngNum);
  const insideSriLanka = hasCoordinates && latNum >= 5.8 && latNum <= 9.95 && lngNum >= 79.4 && lngNum <= 82.0;

  const quality = useMemo(() => {
    const checks: [boolean, number][] = [
      [name.trim().length > 2, 10],
      [Boolean(provinceId && district), 10],
      [city.trim().length > 1, 5],
      [categoryIds.length > 0, 10],
      [summary.trim().length >= 80, 20],
      [highlights.length > 0, 10],
      [insideSriLanka, 10],
      [Boolean(cover), 15],
      [tips.length > 0, 5],
      [gallery.length > 0, 5],
    ];
    return checks.reduce((total, [passed, weight]) => total + (passed ? weight : 0), 0);
  }, [name, provinceId, district, city, categoryIds, summary, highlights, insideSriLanka, cover, tips, gallery]);

  const toggle = (list: string[], value: string) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  const addHighlight = () => {
    const value = highlightInput.trim();
    if (!value || highlights.includes(value)) return;
    setHighlights((current) => [...current, value]);
    setHighlightInput('');
  };

  const addCustomHotel = () => {
    const value = customHotelInput.trim();
    if (!value || customHotels.includes(value)) return;
    setCustomHotels((current) => [...current, value]);
    setCustomHotelInput('');
  };

  const saveTip = () => {
    const text = tipDraft.trim();
    if (!text) return;
    setTips((current) => [...current, { id: newId(), type: tipType, text }]);
    setTipDraft('');
    setComposerOpen(false);
  };

  const readPhotos = (files: FileList | File[]) => {
    const accepted: Photo[] = [];
    let message = '';

    Array.from(files).forEach((file) => {
      if (!acceptedTypes.includes(file.type)) {
        message = 'Only PNG, JPG or WebP images are accepted.';
        return;
      }
      if (file.size > maxPhotoBytes) {
        message = 'Each image must be 10MB or smaller.';
        return;
      }
      const url = URL.createObjectURL(file);
      urlsRef.current.push(url);
      accepted.push({ id: newId(), name: file.name, url });
    });

    setPhotoError(message);
    return accepted;
  };

  const handleCover = (files: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    const [photo] = readPhotos([Array.from(files)[0]]);
    if (photo) setCover(photo);
  };

  const handleGallery = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const room = maxGalleryPhotos - gallery.length;
    const photos = readPhotos(Array.from(event.target.files).slice(0, room));
    setGallery((current) => [...current, ...photos]);
    event.target.value = '';
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleCover(event.dataTransfer.files);
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setLocateError('Geolocation is not supported by this browser.');
      return;
    }
    setLocating(true);
    setLocateError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(4));
        setLng(position.coords.longitude.toFixed(4));
        setLocating(false);
      },
      () => {
        setLocateError('Unable to read your location. Enter the coordinates manually.');
        setLocating(false);
      },
    );
  };

  const validate = (kind: 'draft' | 'review') => {
    const next: Errors = {};
    if (!name.trim()) next.name = 'Location name is required.';

    if (kind === 'review') {
      if (!provinceId) next.provinceId = 'Select a province.';
      if (!district) next.district = 'Select a district.';
      if (!city.trim()) next.city = 'Enter the nearest city or town.';
      if (summary.trim().length < 80) next.summary = 'Write at least 80 characters about this destination.';
      if (!insideSriLanka) next.coordinates = 'Enter valid coordinates located within Sri Lanka.';
      if (!cover) next.coverPhoto = 'Upload a primary cover photo.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (kind: 'draft' | 'review') => {
    if (!validate(kind)) {
      setSubmitted(null);
      return;
    }
    setSubmitted(kind);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const photoCount = gallery.length;

  return (
    <div ref={topRef} className="scroll-mt-28">
      <Link
        href="/customer/profile/contributions"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#4e5568] transition hover:text-[#001a43]"
      >
        <svg {...iconProps} className="h-4 w-4 stroke-[#001a43]">
          <path d="m15 6-6 6 6 6" />
        </svg>
        Back to My Contributions
      </Link>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-[640px]">
            <span className="rounded-md bg-[#b08d1f] px-2.5 py-1 text-[0.65rem] font-bold text-[#ffffff]">
              Admin Review &amp; Verification Required
            </span>
          <h1 className="brand-page-title mt-3 text-4xl font-black tracking-[-0.05em]">Contribute to EVOLANKA: Post a New Destination</h1>
          <p className="brand-page-subtitle mt-2 text-base">
            Share a hidden gem or iconic landmark in Sri Lanka with fellow explorers worldwide. Submissions are reviewed and verified by the
            EVOLANKA editorial team before going live.
          </p>
        </div>
      </div>

      {submitted ? (
        <div
          role="status"
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#bfe5cf] bg-[#effaf3] px-5 py-4 text-sm font-medium text-[#0b6b3a]"
        >
          <span>
            {submitted === 'draft'
              ? 'Draft saved. You can continue editing it from My Contributions.'
              : 'Submitted for review. Our editorial team will respond within 24-48 hours.'}
          </span>
          <Link href="/customer/profile/contributions" className="font-bold underline underline-offset-4">
            Go to My Contributions
          </Link>
        </div>
      ) : null}

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          submit('review');
        }}
        className="mt-7 space-y-6"
      >
        <SectionCard
          step={1}
          title="Basic Location Information"
          subtitle="Official identity and regional categorization across the island."
          icon={
            <svg {...iconProps}>
              <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          }
        >
          <div className="space-y-4">
            <Field label="Location Name" required error={errors.name}>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Pidurangala Rock Sanctuary" className={inputClass} />
            </Field>

            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Province" required error={errors.provinceId}>
                <select
                  value={provinceId}
                  onChange={(event) => {
                    setProvinceId(event.target.value);
                    setDistrict('');
                  }}
                  className={inputClass}
                >
                  <option value="">Select province</option>
                  {provinces.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="District" required error={errors.district}>
                <select value={district} onChange={(event) => setDistrict(event.target.value)} disabled={!province} className={inputClass}>
                  <option value="">{province ? 'Select district' : 'Select a province first'}</option>
                  {province?.districts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nearest City / Town" required error={errors.city}>
                <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Sigiriya" className={inputClass} />
              </Field>
            </div>

            <div>
              <span className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">
                Category &amp; Themes <span className="font-medium normal-case tracking-normal text-[#6d7280]">(Select all that apply)</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const active = categoryIds.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategoryIds((current) => toggle(current, category.id))}
                      className={[
                        'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                        active
                          ? 'border-[#001a43] bg-[#001a43] text-white shadow-[0_8px_20px_rgba(13,74,190,0.25)]'
                          : 'border-[#dfe7f5] bg-white text-[#3d4455] hover:text-[#001a43]',
                      ].join(' ')}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          step={2}
          title="Description & Rich Content"
          subtitle="Provide comprehensive visitor narratives, hours, and ticket guidelines."
          icon={
            <svg {...iconProps}>
              <path d="M7 3h7l5 5v13H7V3Z" />
              <path d="M14 3v5h5M10 13h6M10 17h6" />
            </svg>
          }
        >
          <div className="space-y-5">
            <Field label="Quick Overview & Narrative Summary" required error={errors.summary}>
              <textarea
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                rows={5}
                placeholder="Describe what makes this destination special, its history, and what visitors can expect."
                className={`${inputClass} resize-y`}
              />
            </Field>

            <div>
              <span className="mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">Key Highlights &amp; Attractions</span>
              {highlights.length > 0 ? (
                <div className="mb-2 flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-3 py-1.5 text-xs font-semibold text-[#0d4abe]">
                      {item}
                      <button
                        type="button"
                        aria-label={`Remove ${item}`}
                        onClick={() => setHighlights((current) => current.filter((value) => value !== item))}
                        className="text-[#0d4abe]/70 transition hover:text-[#c4161c]"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="flex gap-2">
                <input
                  value={highlightInput}
                  onChange={(event) => setHighlightInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      addHighlight();
                    }
                  }}
                  placeholder="Type highlight and click Add (e.g. Rare endemic bird sightings)"
                  className={inputClass}
                />
                <button type="button" onClick={addHighlight} className={`bg-[#001a43] text-white rounded-lg px-4 py-2 font-bold hover:bg-[#0b3a9a]`}>
                  Add Highlight
                </button>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#e3eaf6] bg-[#f8fbff] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#001a43]">
                    <svg {...iconProps} className="h-4 w-4 stroke-[#001a43]">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    Best Time to Visit
                  </h3>
                  <button
                    type="button"
                    onClick={() => setDays(days.length === weekDays.length ? [] : [...weekDays])}
                    className="text-xs font-bold text-[#001a43] hover:underline"
                  >
                    {days.length === weekDays.length ? 'Clear All' : 'Select All'}
                  </button>
                </div>

                <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">Open Days / Weekly Schedule</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {weekDays.map((day) => {
                    const active = days.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDays((current) => toggle(current, day))}
                        className={[
                          'h-9 w-11 rounded-lg border text-xs font-bold transition',
                          active ? 'border-[#001a43] bg-[#001a43] text-white' : 'border-[#dfe7f5] bg-white text-[#3d4455] hover:text-[#001a43]',
                        ].join(' ')}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <label className="mt-3 flex items-center gap-2 text-xs font-medium text-[#4e5568]">
                  <input
                    type="checkbox"
                    checked={days.length === weekDays.length}
                    onChange={(event) => setDays(event.target.checked ? [...weekDays] : [])}
                    className="h-4 w-4 accent-[#0d4abe]"
                  />
                  Open All Days (Year-round access)
                </label>

                <div className="mt-4 space-y-3">
                  <Field label="Recommended Hours">
                    <input value={hours} onChange={(event) => setHours(event.target.value)} placeholder="e.g. 05:00 AM - 09:00 AM (Sunrise)" className={inputClass} />
                  </Field>
                  <Field label="Ideal Seasonal Window">
                    <input value={season} onChange={(event) => setSeason(event.target.value)} placeholder="e.g. December to April (Dry Season)" className={inputClass} />
                  </Field>
                </div>
              </div>

              <div className="rounded-2xl border border-[#e3eaf6] bg-[#f8fbff] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-sm font-black text-[#001a43]">
                    <svg {...iconProps} className="h-4 w-4 stroke-[#001a43]">
                      <path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3v3Z" />
                      <path d="M14 6v12" strokeDasharray="2 2" />
                    </svg>
                    Ticket &amp; Entry Pricing
                  </h3>
                  <label className="flex items-center gap-2 text-xs font-medium text-[#4e5568]">
                    <input type="checkbox" checked={freeEntry} onChange={(event) => setFreeEntry(event.target.checked)} className="h-4 w-4 accent-[#0d4abe]" />
                    Free Entry
                  </label>
                </div>

                <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">Local Visitors</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Field label="Local Adults (LKR)">
                    <input
                      inputMode="numeric"
                      value={prices.localAdults}
                      onChange={(event) => setPrices({ ...prices, localAdults: event.target.value })}
                      disabled={freeEntry}
                      placeholder="100"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Local Children (LKR)">
                    <input
                      inputMode="numeric"
                      value={prices.localChildren}
                      onChange={(event) => setPrices({ ...prices, localChildren: event.target.value })}
                      disabled={freeEntry}
                      placeholder="50"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">Foreign Visitors</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <Field label="Foreign Adults (LKR / USD)">
                    <input
                      value={prices.foreignAdults}
                      onChange={(event) => setPrices({ ...prices, foreignAdults: event.target.value })}
                      disabled={freeEntry}
                      placeholder="LKR 1,000 (~$3.50)"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Foreign Children (LKR / USD)">
                    <input
                      value={prices.foreignChildren}
                      onChange={(event) => setPrices({ ...prices, foreignChildren: event.target.value })}
                      disabled={freeEntry}
                      placeholder="LKR 500 (~$1.75)"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="mt-4">
                  <Field label="Note">
                    <input value={ticketNote} onChange={(event) => setTicketNote(event.target.value)} placeholder="e.g. Temple donation ticket collected at monastery base" className={inputClass} />
                  </Field>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          step={3}
          title="Interactive Map & Coordinates"
          subtitle="Pin the exact peak, trailhead, or landmark coordinate in Sri Lanka."
          icon={
            <svg {...iconProps}>
              <path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
          }
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Field label="Address / Landmark Query">
                    <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="e.g. Pidurangala Temple Rd, Sigiriya 21120" className={inputClass} />
                  </Field>
                </div>
                <button type="button" onClick={locate} disabled={locating} className="shrink-0 rounded-lg bg-[#001a43] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#00296b] disabled:opacity-60">
                  {locating ? 'Locating...' : 'Live GPS Auto-Locate'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Latitude" error={errors.coordinates}>
                  <input inputMode="decimal" value={lat} onChange={(event) => setLat(event.target.value)} placeholder="7.9658" className={inputClass} />
                </Field>
                <Field label="Longitude">
                  <input inputMode="decimal" value={lng} onChange={(event) => setLng(event.target.value)} placeholder="80.7619" className={inputClass} />
                </Field>
              </div>

              {locateError ? <p className="text-xs font-medium text-[#c4161c]">{locateError}</p> : null}

              {hasCoordinates ? (
                insideSriLanka ? (
                  <div className="flex items-start gap-3 rounded-xl border border-[#bfe5cf] bg-[#effaf3] px-4 py-3">
                    <svg {...iconProps} className="mt-0.5 h-4 w-4 shrink-0 stroke-[#001a43]">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
                    </svg>
                    <div>
                      <p className="text-sm font-black text-[#0b6b3a]">Accurate Geolocation Verified</p>
                      <p className="text-xs text-[#4e5568]">Coordinates fall within Sri Lanka&apos;s mapped boundaries.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 rounded-xl border border-[#f3c66b] bg-[#fff6e5] px-4 py-3">
                    <svg {...iconProps} className="mt-0.5 h-4 w-4 shrink-0 stroke-[#001a43]">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v5M12 16.5v.01" />
                    </svg>
                    <p className="text-xs font-medium text-[#8a5a00]">These coordinates are outside Sri Lanka. Please double-check them.</p>
                  </div>
                )
              ) : null}
            </div>

            <div
              className="relative min-h-[240px] overflow-hidden rounded-2xl border border-[#dfe7f5] bg-[#eef3ff]"
              style={{ backgroundImage: 'radial-gradient(#c4d2f1 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            >
              <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1 text-[0.68rem] font-bold text-[#001a43] shadow-sm">
                {district && province ? `${district} District, Sri Lanka` : 'Sri Lanka'}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-1.5 rounded-full bg-[#001a43] px-3 py-1.5 text-xs font-bold text-white shadow-[0_8px_20px_rgba(0,26,67,0.35)]">
                  <svg {...iconProps} className="h-3.5 w-3.5 stroke-current">
                    <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {name.trim() || 'Pin location'}
                </span>
              </div>
              <span className="absolute bottom-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-[0.68rem] font-medium text-[#4e5568]">
                {hasCoordinates ? `${latNum.toFixed(4)}, ${lngNum.toFixed(4)}` : 'Enter coordinates to place the pin'}
              </span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          step={4}
          title="Connect Nearby Hotels & Stays"
          subtitle="Automated radius association with verified boutique properties and eco-villas."
          icon={
            <svg {...iconProps}>
              <path d="M3 20V8l9-5 9 5v12M3 20h18M9 20v-6h6v6" />
            </svg>
          }
        >
          <div className="flex items-start gap-3 rounded-xl bg-[#ffffff] px-4 py-3 text-xs font-medium leading-relaxed text-[#b08115]">
            <svg {...iconProps} className="mt-0.5 h-4 w-4 shrink-0 stroke-[#001a43]">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v5M12 16.5v.01" />
            </svg>
            Selecting this location will automatically filter and link nearby verified stays from EVOLANKA Hotels within a 15km radius. Explorers browsing this
            destination will see recommended stays directly on the public listing.
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {suggestedHotels.map((hotel) => {
              const linked = linkedHotels.includes(hotel.id);
              return (
                <div
                  key={hotel.id}
                  className={['overflow-hidden rounded-2xl border bg-white', linked ? 'border-[#0d4abe]' : 'border-[#e3eaf6]'].join(' ')}
                >
                  <div className="flex items-start gap-3 p-3">
                    <img src={hotel.image} alt={hotel.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-[#001a43]">{hotel.name}</h3>
                      <p className="mt-0.5 text-[0.72rem] text-[#6d7280]">
                        {hotel.rating} ({hotel.reviews} reviews) &middot; {hotel.distance}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#eef2f9] px-3 py-2.5">
                    <span className="text-[0.72rem] text-[#6d7280]">
                      From <strong className="text-sm font-black text-[#001a43]">{hotel.price}</strong>/night
                    </span>
                    <button
                      type="button"
                      onClick={() => setLinkedHotels((current) => toggle(current, hotel.id))}
                      className={['text-xs font-bold transition', linked ? 'text-[#c4161c]' : 'text-[#001a43] hover:underline'].join(' ')}
                    >
                      {linked ? 'Remove' : '+ Link Hotel'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {customHotels.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {customHotels.map((id) => (
                <span key={id} className="flex items-center gap-1.5 rounded-full bg-[#eef3ff] px-3 py-1.5 text-xs font-semibold text-[#0d4abe]">
                  {id}
                  <button
                    type="button"
                    aria-label={`Remove ${id}`}
                    onClick={() => setCustomHotels((current) => current.filter((value) => value !== id))}
                    className="text-[#0d4abe]/70 transition hover:text-[#c4161c]"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <Link href="/hotels" className="text-sm font-bold text-[#001a43] hover:underline">
              Browse all nearby hotels &rarr;
            </Link>
          </div>
        </SectionCard>

        <SectionCard
          step={5}
          title="Travel Tips & Essential Advice"
          subtitle="Equip travelers with safety, footwear, temple etiquette, and wildlife notes."
          icon={
            <svg {...iconProps}>
              <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
            </svg>
          }
        >
          {tips.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {tips.map((tip) => (
                <div key={tip.id} className="rounded-2xl border border-[#e3eaf6] bg-[#f8fbff] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-[#eef3ff] px-2 py-1 text-[0.68rem] font-semibold text-[#0d4abe]">{tip.type}</span>
                    <button
                      type="button"
                      aria-label="Remove tip"
                      onClick={() => setTips((current) => current.filter((item) => item.id !== tip.id))}
                      className="text-sm text-[#6d7280] transition hover:text-[#c4161c]"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#566277]">{tip.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {composerOpen ? (
            <div className={['rounded-2xl border border-dashed border-[#c4d2f1] bg-[#f8fbff] p-5', tips.length > 0 ? 'mt-4' : ''].join(' ')}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-black text-[#001a43]">Add New Travel Advisory or Etiquette Tip</h3>
                <select value={tipType} onChange={(event) => setTipType(event.target.value)} className={`${inputClass} w-auto py-1.5 text-xs`}>
                  {tipTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <Field label="Tip Description">
                  <textarea
                    value={tipDraft}
                    onChange={(event) => setTipDraft(event.target.value)}
                    rows={3}
                    placeholder="Provide clear, actionable guidance for incoming travelers visiting this spot..."
                    className={`${inputClass} resize-y`}
                  />
                </Field>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setTipDraft('')} className={outlineButton}>
                  Clear
                </button>
                <button type="button" onClick={saveTip} disabled={!tipDraft.trim()} className="btn-primary  text-[#001a43] border-radius-3xl rounded-lg px-4 py-2 text-xs font-bold ">
                  Save Tip Card
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setComposerOpen(true)} className={`${outlineButton} mt-4`}>
              + Add Travel Tip
            </button>
          )}
        </SectionCard>

        <SectionCard
          step={6}
          title="Media & Photography"
          subtitle="Upload high-resolution photography capturing true atmospheric splendor."
          icon={
            <svg {...iconProps}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="m21 16-5-5-8 8" />
            </svg>
          }
        >
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">
            Primary Cover Photo <span className="font-medium normal-case tracking-normal text-[#6d7280]">(Landscape 16:9 recommended, min. 1920x1080)</span>
          </p>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={[
              'mt-2 flex min-h-[220px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed text-center transition',
              dragging ? 'border-[#0d4abe] bg-[#eef3ff]' : 'border-[#c4d2f1] bg-[#f8fbff]',
            ].join(' ')}
          >
            {cover ? (
              <div className="relative h-full w-full">
                <img src={cover.url} alt="Cover preview" className="h-[260px] w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setCover(null)}
                  className="absolute right-3 top-3 rounded-md bg-white/95 px-3 py-1.5 text-xs font-bold text-[#c4161c] shadow-sm transition hover:bg-white"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="px-6 py-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ff] text-[#0d4abe]">
                  <svg {...iconProps} className="h-6 w-6 stroke-[#001a43]">
                    <path d="M12 16V5M7.5 9.5 12 5l4.5 4.5M5 19h14" />
                  </svg>
                </div>
                <p className="mt-3 text-base font-black text-[#001a43]">Drag and drop here landscape image here</p>
                <p className="mt-1 text-xs text-[#6d7280]">PNG, JPG or WebP up to 10MB. Editorial color-grading accepted.</p>
                <label className="btn-primary mt-4 inline-flex cursor-pointer rounded-lg px-5 py-2 text-xs font-bold transition">
                  Browse Files
                  <input
                    type="file"
                    accept={acceptedTypes.join(',')}
                    className="sr-only"
                    onChange={(event) => {
                      handleCover(event.target.files);
                      event.target.value = '';
                    }}
                  />
                </label>
              </div>
            )}
          </div>
          {errors.coverPhoto ? <p className="mt-1 text-xs font-medium text-[#c4161c]">{errors.coverPhoto}</p> : null}
          {photoError ? <p className="mt-1 text-xs font-medium text-[#c4161c]">{photoError}</p> : null}

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]">
              Photo Gallery Preview ({photoCount} of {maxGalleryPhotos} Uploaded)
            </p>
            <span className="text-xs text-[#6d7280]">Remove a photo to make room</span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((photo) => (
              <div key={photo.id} className="group relative h-28 overflow-hidden rounded-xl border border-[#e3eaf6]">
                <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label={`Remove ${photo.name}`}
                  onClick={() => setGallery((current) => current.filter((item) => item.id !== photo.id))}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-[#c4161c] shadow-sm"
                >
                  &times;
                </button>
              </div>
            ))}

            {photoCount < maxGalleryPhotos ? (
              <label className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#c4d2f1] bg-[#f8fbff] text-center transition hover:bg-[#eef3ff]">
                <span className="text-sm font-bold text-[#001a43]">Add more photos</span>
                <span className="text-[0.68rem] text-[#6d7280]">Up to {maxGalleryPhotos - photoCount} more</span>
                <input type="file" accept={acceptedTypes.join(',')} multiple className="sr-only" onChange={handleGallery} />
              </label>
            ) : null}
          </div>
        </SectionCard>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[#dfe4f2] bg-white p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)]">
          <div className="flex max-w-[620px] items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#effaf3] text-[#0f9d58]">
              <svg {...iconProps}>
                <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
                <path d="m8.8 12 2.2 2.2 4.2-4.4" />
              </svg>
            </div>
            <div>
              <h2 className="text-[1.02rem] font-black tracking-[-0.02em] text-[#001a43]">EVOLANKA Community Integrity Guarantee</h2>
              <p className="mt-0.5 text-sm text-[#6d7280]">
                Your submission will be carefully reviewed by EVOLANKA Administrators to ensure authentic info, coordinates, and high-quality photography.
                Once approved, you will receive editorial credits and badge points.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => submit('draft')} className={`${outlineButton} px-5 py-3 text-sm`}>
              Save Draft
            </button>
            <button
              type="submit"
              className="btn-primary rounded-xl px-5 py-3 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
            >
              Submit for Review
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
