import Link from 'next/link';
import type { ReactNode } from 'react';

type HostSetupLayoutProps = {
  backHref: string;
  nextHref: string;
  nextDisabled?: boolean;
  helpText?: string;
  helpLinkText?: string;
  nextLabel?: string;
  onNext?: () => void;
  children: ReactNode;
};

export default function HostSetupLayout({
  backHref,
  nextHref,
  nextDisabled = false,
  helpText = 'Need help choosing a category?',
  helpLinkText = 'Consult the EVOLANKA Listing Guidelines',
  nextLabel = 'Continue',
  onNext,
  children,
}: HostSetupLayoutProps) {
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
              Partner Portal
            </span>
          </div>
          <Link
            href="/provider/profile/services"
            className="inline-flex items-center rounded-lg border border-[#dce3f1] bg-white px-4 py-2 text-sm font-semibold text-[#001a43] transition-colors hover:border-[#001a43]"
          >
            Save &amp; Exit
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-[1000px] flex-1 px-4 pb-10 pt-10 md:px-8">
        {children}

        <p className="mt-10 text-center text-xs text-[#6c7387]">
          {helpText}{' '}
          <Link href="#" className="font-semibold text-[#001a43] underline underline-offset-2">
            {helpLinkText}
          </Link>
          .
        </p>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dce3f1] bg-white px-5 py-3 text-sm font-semibold text-[#4e5568] transition-colors hover:border-[#001a43] hover:text-[#001a43]"
          >
            <span>←</span>
            Previous
          </Link>

          <Link
            href={nextHref}
            aria-disabled={nextDisabled}
            tabIndex={nextDisabled ? -1 : undefined}
            onClick={(event) => {
              if (nextDisabled) event.preventDefault();
              else onNext?.();
            }}
            className={[
              'btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition',
              nextDisabled ? 'pointer-events-none cursor-not-allowed opacity-50' : 'hover:-translate-y-0.5',
            ].join(' ')}
          >
            {nextLabel}
            <span>→</span>
          </Link>
        </div>
      </footer>
    </main>
  );
}
