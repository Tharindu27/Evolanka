'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type GuideVerificationShellProps = {
  title: string;
  subtitle: string;
  steps: string[];
  currentStep: number;
  stepLabel: string;
  stepTitle: string;
  onBackHref?: string;
  onNextHref?: string;
  nextDisabled?: boolean;
  children: ReactNode;
};

export default function GuideVerificationShell({
  title,
  subtitle,
  steps,
  currentStep,
  stepLabel,
  stepTitle,
  onBackHref = '#',
  onNextHref = '#',
  nextDisabled = false,
  children,
}: GuideVerificationShellProps) {
  return (
    <main
      className="brand-backdrop relative min-h-screen bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <header className="relative z-10 border-b border-[#e3e8f4] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-[1.05rem] font-black uppercase tracking-[-0.05em] text-[#001a43]">EVOLANKA</div>
            <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08d1f]">
              Partner Portal
            </span>
          </div>
          <Link
            href="/provider/profile/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#dce3f1] bg-white px-4 py-2 text-sm font-semibold text-[#001a43] transition-colors hover:border-[#001a43]"
          >
            <span>⌂</span>
            Save &amp; Exit
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 pb-10 pt-8 md:px-8">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-5 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d9a8] bg-[#fbf6e4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d1f]">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#b08d1f]" />
              Partner Registration
            </div>
          </div>

          <div className="text-center">
            <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">{title}</h1>
            <p className="brand-page-subtitle mt-2 text-sm md:text-base">{subtitle}</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.3rem] border border-[#e3e8f4] bg-white shadow-[0_18px_50px_rgba(0,26,67,0.08)]">
            <div className="overflow-x-auto border-b border-[#e3e8f4] bg-[#f5f7fc] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center gap-2 px-4 py-3 md:px-6">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  return (
                    <button
                      key={step}
                      type="button"
                      className={[
                        'inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors md:text-sm',
                        isActive
                          ? 'border-[#001a43] bg-[#001a43] text-white'
                          : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43] hover:text-[#001a43]',
                      ].join(' ')}
                    >
                      <span className={isActive ? 'text-[#e6c65a]' : 'text-[#8a93a8]'}>{index + 1}</span>
                      {step}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="px-5 pb-5 pt-6 md:px-7 md:pb-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#001a43] text-lg text-white">
                  👤
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#b08d1f]">{stepLabel}</div>
                  <div className="brand-page-title mt-1 text-2xl font-black tracking-[-0.06em]">{stepTitle}</div>
                </div>
              </div>

              {children}

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#e3e8f4] pt-6">
                <Link
                  href={onBackHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#dce3f1] bg-white px-5 py-3 text-sm font-semibold text-[#4e5568] transition-colors hover:border-[#001a43] hover:text-[#001a43]"
                >
                  <span>←</span>
                  Back
                </Link>

                <Link
                  href={onNextHref}
                  aria-disabled={nextDisabled}
                  tabIndex={nextDisabled ? -1 : undefined}
                  onClick={(event) => {
                    if (nextDisabled) event.preventDefault();
                  }}
                  className={[
                    'btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition',
                    nextDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : 'hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  Continue
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-[#6c7387]">
            <span>🔒</span>
            <span>Your information is secure and will only be used for verification purposes.</span>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-xs text-[#6c7387] md:flex-row md:items-center md:justify-between">
          <div>EVOLANKA HOST OPERATING SYSTEM © 2025</div>
          <div className="flex flex-wrap gap-4">
            <span>Partner Terms</span>
            <span>Privacy Notice</span>
            <span>Guide Standards</span>
            <span>Support Desk</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
