'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#f4f5f7] font-[Inter,sans-serif] text-[#041b3c]">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/Auth/log-bg.png"
          alt="Sri Lankan landscape at sunrise"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-3">
        <Link
          href="/auth-main"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/50"
        >
          <span>Back</span>
        </Link>
      </header>

      <main className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6 py-16">
        <div className="w-full max-w-[520px] rounded-[32px] border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-10">
          <div className="mb-6 text-center">
            <h1 className="mb-1 text-3xl font-semibold text-[#003d9b] md:text-4xl">Sign In to EVOLANKA</h1>
            <p className="text-sm text-slate-700 md:text-base">Welcome back to your next adventure.</p>
          </div>

          <div className="mb-6 flex flex-col gap-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              <img src="/images/Auth/google.png" alt="Google" className="h-5 w-5 object-contain" />
              Continue with Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              <img src="/images/Auth/apple.png" alt="Apple" className="h-5 w-5 object-contain" />
              Continue with Apple
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-300/80" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">OR</span>
            <div className="h-px flex-1 bg-slate-300/80" />
          </div>

          <form action="#" className="flex flex-col gap-4" method="POST">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="px-1 text-sm font-medium text-white">
                Email Address
              </label>
              <div className="group relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#003d9b]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-[#003d9b] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-1">
                <label htmlFor="password" className="text-sm font-medium text-white">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-[#003d9b] hover:underline">
                  Forgot password?
                </a>
              </div>

              <div className="group relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#003d9b]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 py-3 pl-11 pr-11 text-sm text-slate-800 outline-none transition focus:border-[#003d9b] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-800"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.4 5.1A10.8 10.8 0 0 1 12 4c6 0 9.8 8 9.8 8a16.1 16.1 0 0 1-3.1 3.9" />
                      <path d="M6.2 6.2A16.2 16.2 0 0 0 2.2 12s3.8 8 9.8 8a10.8 10.8 0 0 0 4.1-.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M2.2 12S6 4 12 4s9.8 8 9.8 8-3.8 8-9.8 8-9.8-8-9.8-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-xl bg-[#003d9b] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/95">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="font-semibold text-[#003d9b] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
