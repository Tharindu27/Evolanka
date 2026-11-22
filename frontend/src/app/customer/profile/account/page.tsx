"use client";

import Link from 'next/link';
import Sidebar from '@/components/customer/common/sidebar';
import PersonalInformationCard from '@/components/customer/account/personal-information-card';
import ProfileSummary from '@/components/customer/account/profile-summary';
import { navigationItems } from '@/data/customer-account-data';
import { useProfile } from '@/lib/use-profile';

export default function CustomerAccountPage() {
  const state = useProfile('tourist');

  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" />
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">My account</h1>
            <p className="brand-page-subtitle mt-2 text-base">Manage your EVOLANKA identity, personal details, and account security.</p>

            {state.status === 'loading' ? <p className="mt-8 text-sm text-[#6d7280]">Loading your account…</p> : null}

            {state.status === 'error' ? (
              <p role="alert" className="mt-8 text-sm font-semibold text-red-600">
                {state.message}
              </p>
            ) : null}

            {state.status === 'signed-out' ? (
              <p className="mt-8 text-sm text-[#434654]">
                Please{' '}
                <Link href="/auth/login" className="font-bold text-[#0d4abe] underline">
                  sign in as a tourist
                </Link>{' '}
                to see your account.
              </p>
            ) : null}

            {state.status === 'ready' ? (
              <>
                <ProfileSummary
                  profile={{
                    name: state.profile.name,
                    location: state.profile.country ?? '',
                    email: state.profile.email,
                    isVerified: false,
                  }}
                />
                <PersonalInformationCard
                  details={[
                    { label: 'Full Name', value: state.profile.name },
                    { label: 'Email Address', value: state.profile.email },
                    { label: 'Mobile Number', value: state.profile.mobileNumber, tag: 'Primary' },
                    { label: 'Gender', value: state.profile.gender ?? '' },
                    { label: 'Country / Nationality', value: state.profile.country ?? '' },
                    { label: 'Passport Number', value: state.profile.passportNumber || 'Not provided' },
                    { label: 'NIC Number', value: state.profile.nic || 'Not provided' },
                  ]}
                />
              </>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
