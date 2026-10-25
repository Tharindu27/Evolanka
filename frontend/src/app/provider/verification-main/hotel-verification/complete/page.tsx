'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

import { HOTEL_LISTING_STORAGE_KEY, type HotelListingSummary } from '@/lib/guide-registration';

const steps = [
  {
    title: 'Review Process',
    tag: 'Verification Phase',
    description: 'Our team will review your submission within 24-48 hours.',
  },
  {
    title: 'Email Notification',
    tag: 'Automated Dispatch',
    description: "You'll receive an email once your property is approved.",
  },
  {
    title: 'Go Live',
    tag: 'Instant Bookings',
    description: null,
  },
];

const formatTime = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('en-GB', { hour12: false }) : '—';

const subscribe = () => () => {};
const readStoredListing = () => sessionStorage.getItem(HOTEL_LISTING_STORAGE_KEY);
const readServerListing = () => null;

export default function HotelSubmissionCompletePage() {
  const stored = useSyncExternalStore(subscribe, readStoredListing, readServerListing);
  const summary = useMemo(() => (stored ? (JSON.parse(stored) as HotelListingSummary) : null), [stored]);

  const details = [
    { label: 'Session ID', value: summary?.sessionId ?? '—', highlight: true },
    { label: 'Partner ID', value: summary?.partnerId ?? '—', highlight: true },
    { label: 'Property Name', value: summary?.propertyName || '—', highlight: false },
    { label: 'Time', value: formatTime(summary?.submittedAt), highlight: false },
  ];

  return (
    <main
      className="brand-backdrop relative flex min-h-screen flex-col bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <header className="relative z-10 border-b border-[#e3e8f4] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-[1.05rem] font-black uppercase tracking-[-0.05em] text-[#001a43]">EVOLANKA</div>
            <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08d1f]">
              Host Portal
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-[800px] flex-1 space-y-6 px-4 py-10 md:px-8">
        <section className="rounded-[1.3rem] border border-[#e3e8f4] border-t-[3px] border-t-[#b08d1f] bg-white p-6 text-center shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e6d9a8] bg-[#fbf6e4]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b08d1f] text-lg font-bold text-white">
              ✓
            </span>
          </div>

          <h1 className="brand-page-title mt-5 text-3xl font-black tracking-[-0.05em] md:text-4xl">
            Submission Successful!
          </h1>
          <p className="mt-3 text-sm text-[#4e5568]">Your property listing has been successfully submitted for review.</p>

          <dl className="mx-auto mt-6 grid max-w-[520px] gap-x-8 gap-y-3 rounded-xl border border-[#dce3f1] bg-[#f9f9ff] p-5 text-left text-xs sm:grid-cols-2">
            {details.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <dt className="font-mono text-[#6c7387]">{item.label}:</dt>
                <dd
                  className={
                    item.highlight
                      ? 'rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-0.5 font-mono font-bold text-[#b08d1f]'
                      : 'font-mono font-semibold text-[#001a43]'
                  }
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">📈</span>
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[#001a43]">What&apos;s next?</h2>
          </div>

          <ol className="relative space-y-5">
            <span className="absolute bottom-8 left-[17px] top-8 w-px bg-[#dce3f1]" aria-hidden />
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex items-center gap-4">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#001a43] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div className="flex-1 rounded-xl border border-[#dce3f1] bg-[#f9f9ff] px-4 py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#001a43]">{step.title}</span>
                    <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#b08d1f]">
                      {step.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#4e5568]">
                    {step.description ?? (
                      <>
                        Your property will be live on <strong className="font-bold text-[#b08d1f]">EVOLANKA</strong> and
                        ready for bookings.
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Link
          href="/provider/profile/services"
          className="ml-70 btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition hover:-translate-y-0.5"
        >
          Go to Dashboard
          <span>→</span>
        </Link>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-xs text-[#6c7387] md:flex-row md:items-center md:justify-between">
          <div>EVOLANKA • Host Services &amp; Property Verification Portal</div>
          <div>
            Need assistance? Contact{' '}
            <Link href="#" className="font-semibold text-[#001a43] underline underline-offset-2">
              EVOLANKA Partner Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
