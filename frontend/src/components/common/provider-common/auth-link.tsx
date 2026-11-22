"use client";

import Link from 'next/link';
import { useEffect, useState, type ComponentProps } from 'react';
import { getStoredUser } from '@/lib/api';

// Link that only navigates for a signed-in provider; otherwise it shows a notice instead of redirecting.
export default function ProviderAuthLink({ onClick, children, ...props }: ComponentProps<typeof Link>) {
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(false), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  return (
    <>
      <Link
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (!getStoredUser('provider')) {
            event.preventDefault();
            setNotice(true);
          }
        }}
      >
        {children}
      </Link>

      {notice ? (
        <div
          role="alert"
          className="fixed left-1/2 top-24 z-[60] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-start gap-3 rounded-2xl border border-[#e6d9a8] bg-white px-4 py-3 text-left text-sm text-[#001a43] shadow-[0_18px_44px_rgba(0,26,67,0.22)]"
        >
          <p className="flex-1 font-semibold">
            You are not registered as a provider yet. Please click{' '}
            <Link href="/provider/login" className="font-black text-[#0d4abe] underline">
              Sign In
            </Link>{' '}
            and register first.
          </p>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setNotice(false)}
            className="text-lg font-bold leading-none text-[#67748d] hover:text-[#001a43]"
          >
            ×
          </button>
        </div>
      ) : null}
    </>
  );
}
