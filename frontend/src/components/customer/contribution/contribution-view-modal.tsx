'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import type { ApiLocation } from '@/lib/locations-api';

type ContributionViewModalProps = {
  location: ApiLocation;
  statusLabel: string;
  onClose: () => void;
};

const formatPrice = (value: string | null) => (value && /^[\d,.]+$/.test(value) ? `LKR ${value}` : value);

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-[#6d7280]">{label}</dt>
      <dd className="mt-1 whitespace-pre-line text-sm leading-relaxed text-[#001a43]">{value}</dd>
    </div>
  );
}

function List({ label, values }: { label: string; values: string[] }) {
  if (values.length === 0) return null;
  return (
    <div>
      <dt className="text-[0.68rem] font-bold uppercase tracking-[0.06em] text-[#6d7280]">{label}</dt>
      <dd className="mt-1">
        <ul className="list-inside list-disc space-y-1 text-sm text-[#001a43]">
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

export default function ContributionViewModal({ location, statusLabel, onClose }: ContributionViewModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const cover = location.photos.find((photo) => photo.isCover) ?? location.photos[0];
  const others = location.photos.filter((photo) => photo.id !== cover?.id);
  const prices: [string, string | null][] = location.freeEntry
    ? [['Entry', 'Free entry']]
    : [
        ['Local adults', formatPrice(location.localAdultPrice)],
        ['Local children', formatPrice(location.localChildPrice)],
        ['Foreign adults', formatPrice(location.foreignAdultPrice)],
        ['Foreign children', formatPrice(location.foreignChildPrice)],
      ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={location.name} className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_rgba(0,26,67,0.35)]">
        <header className="flex items-start justify-between gap-4 border-b border-[#e3eaf6] px-6 py-4">
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">{location.name}</h2>
            <p className="mt-1 text-xs font-semibold text-[#6d7280]">{statusLabel}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-[#4f586e] transition hover:bg-[#eef3ff]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="space-y-6 overflow-y-auto px-6 py-5">
          {location.status === 'REJECTED' && location.rejectionReason ? (
            <p className="rounded-xl border border-[#f1b8bb] bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#c4161c]">Not approved: {location.rejectionReason}</p>
          ) : null}

          {cover ? (
            <div>
              <img src={cover.url} alt={`${location.name} cover`} className="h-56 w-full rounded-xl object-cover" />
              {others.length > 0 ? (
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {others.map((photo, index) => (
                    <img key={photo.id} src={photo.url} alt={`${location.name} photo ${index + 2}`} className="h-20 w-full rounded-lg object-cover" />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[#e3eaf6] bg-[#f8fafd] p-4">
            <Row label="Province" value={location.province} />
            <Row label="District" value={location.district} />
            <Row label="Nearest city / town" value={location.nearestTown} />
            <Row label="Address / landmark" value={location.address} />
            <Row label="Latitude" value={location.latitude?.toString()} />
            <Row label="Longitude" value={location.longitude?.toString()} />
            <div className="col-span-2"><List label="Categories" values={location.categories} /></div>
          </dl>

          <dl className="space-y-4">
            <Row label="Overview" value={location.description} />
            <List label="Highlights" values={location.highlights} />
          </dl>

          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[#e3eaf6] bg-[#f8fafd] p-4">
            <Row label="Best time to visit" value={location.bestTime} />
            <Row label="Opening days / hours" value={location.openingDays} />
            {prices.map(([label, value]) => <Row key={label} label={label} value={value} />)}
            <div className="col-span-2"><Row label="Ticket note" value={location.ticketNote} /></div>
          </dl>

          <dl><List label="Travel tips" values={location.travelTips} /></dl>
        </div>

        <footer className="flex justify-end gap-3 border-t border-[#e3eaf6] bg-[#f8fafd] px-6 py-3.5">
          {location.status === 'APPROVED' ? (
            <Link href={`/locations/place/${location.id}`} className="rounded-xl bg-[#001a43] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#234576] hover:text-white">
              View live page
            </Link>
          ) : null}
          <button type="button" onClick={onClose} className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]">
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
