"use client";

import Link from 'next/link';
import Sidebar from '@/components/customer/common/sidebar';
import AvatarUploader from '@/components/common/account/avatar-uploader';
import PersonalInfoEditor from '@/components/common/account/personal-info-editor';
import ProfileSummary from '@/components/customer/account/profile-summary';
import { navigationItems } from '@/data/customer-account-data';
import { updateProfile } from '@/lib/api';
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
                  avatar={
                    <AvatarUploader
                      role="tourist"
                      name={state.profile.name}
                      picture={state.profile.profilePicture}
                      onUploaded={state.setProfile}
                      className="h-20 w-20"
                      fallbackClassName="bg-[radial-gradient(circle_at_30%_30%,#f9d2a1,#d99162_45%,#a85a3d_75%)] text-[2rem] text-[#2b1d16]"
                    />
                  }
                />
                <PersonalInfoEditor
                  variant="customer"
                  subtitle="Primary travel identity and contact details used for trip bookings."
                  onSave={async (changes) => state.setProfile(await updateProfile('tourist', changes))}
                  fields={[
                    { key: 'name', label: 'Full Name', value: state.profile.name, required: true, maxLength: 100 },
                    { key: 'email', label: 'Email Address', value: state.profile.email, locked: true },
                    { key: 'mobileNumber', label: 'Mobile Number', value: state.profile.mobileNumber, tag: 'Primary', required: true, maxLength: 20 },
                    { key: 'gender', label: 'Gender', value: state.profile.gender ?? '', options: ['Male', 'Female', 'Other'], required: true },
                    { key: 'country', label: 'Country / Nationality', value: state.profile.country ?? '', required: true, maxLength: 100 },
                    { key: 'passportNumber', label: 'Passport Number', value: state.profile.passportNumber ?? '', emptyText: 'Not provided', maxLength: 30 },
                    { key: 'nic', label: 'NIC Number', value: state.profile.nic ?? '', emptyText: 'Not provided', maxLength: 30 },
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
