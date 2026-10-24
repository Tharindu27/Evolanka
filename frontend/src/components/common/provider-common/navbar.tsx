"use client";

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'home', href: '/provider/main-page/home' },
  { label: 'Hotel Owner', href: '/provider/main-page/hotel-info' },
  { label: 'Tour Guide', href: '/provider/main-page/guide-info' },
  { label: 'Rental Owner', href: '/provider/main-page/rental-info' },
  { label: 'Taxi Owner', href: '/provider/main-page/taxi-info' },
];

export default function ProviderNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#dfe4f0]/80 bg-[#f8fbff]/85 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-3 md:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black uppercase tracking-tight text-[#001a43]">
            EVOLANKA
            <span className="h-2.5 w-2.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-[#dce3f1] bg-white/90 p-1 shadow-[0_10px_26px_rgba(0,26,67,0.07)] md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#4e5568] transition-colors hover:bg-[#edf3ff] hover:text-[#001a43]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/provider/login?backTo=/provider/main-page/home"
              className="btn-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:text-white"
            >
              Sign in
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dce3f1] bg-white text-[#001a43] shadow-sm transition-colors hover:bg-[#f1f5ff] md:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
              {mobileMenuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mt-3 rounded-2xl border border-[#dce3f1] bg-white p-3 shadow-[0_14px_34px_rgba(0,26,67,0.12)] md:hidden">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-[#f8fbff] px-3 py-2 text-sm font-semibold text-[#344055] transition-colors hover:bg-[#edf3ff] hover:text-[#001a43]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid gap-2">
              <Link
                href="/provider/login?backTo=/provider/main-page/home"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all hover:text-white"
              >
                Sign in
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
