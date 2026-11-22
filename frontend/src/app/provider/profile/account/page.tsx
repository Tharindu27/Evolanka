"use client";

import Link from 'next/link';
import Sidebar from '@/components/provider/common/sidebar';
import { useProfile } from '@/lib/use-profile';

export default function ProviderAccountPage() {
  const state = useProfile('provider');

  if (state.status !== 'ready') {
    return (
      <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
        <div className="mx-auto flex h-full max-w-[1600px]">
          <Sidebar />
          <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
            <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My account</h1>
            {state.status === 'loading' ? <p className="mt-6 text-sm text-[#48566d]">Loading your account…</p> : null}
            {state.status === 'error' ? (
              <p role="alert" className="mt-6 text-sm font-semibold text-red-600">
                {state.message}
              </p>
            ) : null}
            {state.status === 'signed-out' ? (
              <p className="mt-6 text-sm text-[#48566d]">
                Please{' '}
                <Link href="/provider/login" className="font-bold text-[#0d4abe] underline">
                  sign in as a provider
                </Link>{' '}
                to see your account.
              </p>
            ) : null}
          </div>
        </div>
      </main>
    );
  }

  const { profile } = state;
  const profileDetails = [
    { label: 'Full Name', value: profile.name },
    { label: 'Email Address', value: profile.email },
    { label: 'Mobile Number', value: profile.mobileNumber, tag: 'Primary' },
  ];

  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My account</h1>
          <p className="mt-3 text-base text-[#48566d]">
            Manage your EVOLANKA identity, personal details, and account security.
          </p>

          <section className="mt-8 rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(0,26,67,0.06)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8a669] text-2xl font-bold text-white shadow-[0_10px_28px_rgba(0,26,67,0.12)]">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[2rem] font-black tracking-[-0.05em] text-[#001a43]">{profile.name}</h2>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#4d5d79]">
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                        <path d="M4 7h16v10H4z" />
                        <path d="m4 8 8 6 8-6" />
                      </svg>
                      {profile.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                      </svg>
                      {profile.mobileNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-6 shadow-[0_18px_50px_rgba(0,26,67,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-[2rem] font-black tracking-[-0.06em] text-[#001a43]">Personal Information</h3>
                <p className="mt-1 text-[0.96rem] text-[#4f5d76]">Primary personal information and contact details for the provider.</p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-[#001a43] px-6 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,26,67,0.18)] transition hover:-translate-y-0.5"
              >
                Edit
              </button>
            </div>

            <div className="mt-8 space-y-0">
              {profileDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 border-t border-[#edf1f5] py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-[220px] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#67748d]">
                    {item.label}
                  </div>

                  <div className="flex flex-1 items-center justify-start gap-3 text-base font-medium text-[#001a43] md:justify-between">
                    <span className="flex items-center gap-2">
                      {item.value}
                    </span>

                    {item.tag ? (
                      <span className="inline-flex items-center rounded-md border border-[#d8e2ff] bg-[#edf4ff] px-2.5 py-1 text-[11px] font-semibold text-[#1d4f9f]">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
