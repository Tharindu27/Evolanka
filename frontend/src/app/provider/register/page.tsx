'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProviderRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative h-[100dvh] overflow-hidden bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="fixed inset-0 z-0">
        <img
          src="/images/provider/auth/provider-reg-bg.jpeg"
          alt="Sri Lankan provider journey background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-80" />
      </div>

      <main className="relative z-20 flex h-[100dvh] items-center justify-center overflow-hidden px-4 pb-3 pt-14 md:px-6 md:pb-4 md:pt-20">
        <Link
          href="/auth-main"
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/50 md:left-8 md:top-8"
        >
          <span>Back</span>
        </Link>

        <div className="w-full max-w-[500px] -translate-y-3 md:-translate-y-4">
          <div
            className="rounded-[1.5rem] border border-white/35 bg-white/30 p-4 shadow-2xl backdrop-blur-xl [@media(max-height:760px)]:scale-[0.94] [@media(max-height:700px)]:scale-[0.88] md:p-7"
          >
            <div className="mb-3 text-center">
              <h2 className="mb-1.5 text-2xl font-bold text-[#003d9b] md:text-3xl">Become an EVOLANKA Provider</h2>
              <p className="text-xs text-slate-700 md:text-sm">Join Sri Lanka&apos;s leading tourism network and grow your business.</p>
            </div>

            <form className="mx-auto flex w-full flex-col gap-3.5" action="#">
              <div className="flex flex-col gap-0.5">
                <label htmlFor="fullname" className="pl-1 text-xs font-medium text-white md:text-sm">
                  Full Name
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c1.8-3.5 4.8-5 8-5s6.2 1.5 8 5" />
                    </svg>
                  </span>
                  <input
                    id="fullname"
                    type="text"
                    required
                    placeholder="John Perera"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3.5 pl-10 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="email" className="pl-1 text-xs font-medium text-white md:text-sm">
                  Email Address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M4 6h16v12H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="business@example.com"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3.5 pl-10 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="mobile" className="pl-1 text-xs font-medium text-white md:text-sm">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <rect x="7" y="2" width="10" height="20" rx="2" />
                      <path d="M11 18h2" />
                    </svg>
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    placeholder="+94 XX XXX XXXX"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3.5 pl-10 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="password" className="pl-1 text-xs font-medium text-white md:text-sm">
                  Password
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <rect x="4" y="11" width="16" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                    </svg>
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3.5 pl-10 pr-12 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-[#003d9b]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M3 3l18 18" />
                        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                        <path d="M9.4 5.1A10.8 10.8 0 0 1 12 4c6 0 9.8 8 9.8 8a16.1 16.1 0 0 1-3.1 3.9" />
                        <path d="M6.2 6.2A16.2 16.2 0 0 0 2.2 12s3.8 8 9.8 8a10.8 10.8 0 0 0 4.1-.8" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                        <path d="M2.2 12S6 4 12 4s9.8 8 9.8 8-3.8 8-9.8 8-9.8-8-9.8-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="px-1 text-[10px] text-white/90">At least 8 characters with a mix of letters and numbers.</p>
              </div>

              <div className="py-1.5">
                <label className="flex items-start gap-2 text-xs leading-relaxed text-white/95 md:text-sm" htmlFor="provider-terms">
                  <input
                    id="provider-terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border border-slate-300 bg-white/85 text-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/30"
                  />
                  <span>
                    By signing up, you agree to our{' '}
                    <a href="#" className="font-bold text-[#003d9b] hover:underline">
                      Provider Terms &amp; Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-bold text-[#003d9b] hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#003d9b] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#0052cc] md:text-sm"
              >
                <span>Create Provider Account</span>
                <span aria-hidden="true">&#8594;</span>
              </button>
            </form>

            <div className="mt-3 border-t border-white/40 pt-3 text-center">
              <p className="text-xs text-white/95 md:text-sm">
                Already have a provider account?{' '}
                <Link href="/provider/login" className="font-bold text-[#003d9b] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
