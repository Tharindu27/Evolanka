'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProviderLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative h-[100dvh] overflow-hidden bg-[#f9f9ff] text-[#041b3c] selection:bg-[#dae2ff] selection:text-[#001848]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="fixed inset-0 z-0">
        <img
          src="/images/provider/auth/provider-log-bg.jpeg"
          alt="Provider travel background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-80" />
      </div>

      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between px-6">
        <Link
          href="/auth-main"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/50"
        >
          <span>Back</span>
        </Link>
      </header>

      <main className="relative z-20 flex h-[100dvh] items-center justify-center overflow-hidden px-4 pb-3 pt-14 md:px-6 md:pb-4 md:pt-20">
        <div className="w-full max-w-[500px] -translate-y-3 md:-translate-y-4">
          <div className="rounded-[1.5rem] border border-white/35 bg-white/30 p-4 shadow-2xl backdrop-blur-xl [@media(max-height:760px)]:scale-[0.94] [@media(max-height:700px)]:scale-[0.88] md:p-7">
            <div className="mb-3 text-center">
              <h1 className="mb-1.5 text-2xl font-bold text-[#003d9b] md:text-3xl">Provider Sign In</h1>
              <p className="text-xs text-slate-700 md:text-sm">Manage your business and connect with travelers.</p>
            </div>

            <div className="my-3.5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-300/80" />
              <div className="h-px flex-1 bg-slate-300/80" />
            </div>

            <form className="mx-auto flex w-full flex-col gap-3.5" action="#" onSubmit={(event) => event.preventDefault()}>
              <div className="flex flex-col gap-0.5">
                <label htmlFor="provider-email" className="pl-1 text-xs font-medium text-white md:text-sm">
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
                    id="provider-email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3.5 pl-10 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="provider-password" className="pl-1 text-xs font-medium text-white md:text-sm">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#003d9b] hover:underline">
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <rect x="4" y="11" width="16" height="9" rx="2" />
                      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                    </svg>
                  </span>
                  <input
                    id="provider-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
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
              </div>

              <label htmlFor="remember-provider" className="mt-0.5 flex cursor-pointer items-center gap-2 text-xs text-white/95 md:text-sm">
                <input
                  id="remember-provider"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-slate-300 bg-white/85 text-[#003d9b] focus:ring-2 focus:ring-[#003d9b]/30"
                />
                <span>Remember this device for 30 days</span>
              </label>

              <button
                type="submit"
                className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#003d9b] px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#0052cc] md:text-sm"
              >
                Sign In to dashboard
                <span aria-hidden="true">&#8594;</span>
              </button>
            </form>

            <div className="mt-3 border-t border-white/40 pt-3 text-center">
              <p className="text-xs text-white/95 md:text-sm">
                Don&apos;t have a provider account?{' '}
                <Link href="/provider/register" className="font-bold text-[#003d9b] hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
