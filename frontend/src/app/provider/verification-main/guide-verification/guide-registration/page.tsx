'use client';

import { useState } from 'react';

import GuideVerificationShell from '@/components/provider/guide/guide-verification-shell';

const steps = [
  'Guide Type',
  'Profile',
  'Contact',
  'Registration',
  'Qualifications',
  'Services',
  'Pricing',
  'Vehicle',
  'Emergency contact',
  'Bank Details',
  'Agreement',
  'Upload Documents',
];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

export default function GuideRegistrationPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [guideNo, setGuideNo] = useState('');
  const [issuingAuthority, setIssuingAuthority] = useState('');

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={3}
      stepLabel="Step 4"
      stepTitle="Registration"
      onBackHref="/provider/verification-main/guide-verification/guide-contact"
      onNextHref="/provider/verification-main/guide-verification/guide-qualification"
    >
      <div className="space-y-5">
        <p className="text-sm text-[#4e5568]">
          Enter your SLTDA registration and license details if applicable.
        </p>

        <button
          type="button"
          role="switch"
          aria-checked={isRegistered}
          onClick={() => setIsRegistered((prev) => !prev)}
          className={[
            'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors',
            isRegistered ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
          ].join(' ')}
        >
          <span
            className={[
              'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
              isRegistered ? 'bg-[#001a43]' : 'bg-[#c5cde0]',
            ].join(' ')}
          >
            <span
              className={[
                'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
                isRegistered ? 'translate-x-5' : 'translate-x-0.5',
              ].join(' ')}
            />
          </span>
          <span className="text-sm font-medium text-[#001a43]">
            Registered with Sri Lanka Tourism Development Authority
          </span>
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className={labelClass}>License Number</span>
            <input
              type="text"
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value)}
              placeholder="e.g. TG-2025-001"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Guide No</span>
            <input
              type="text"
              value={guideNo}
              onChange={(event) => setGuideNo(event.target.value)}
              placeholder="e.g. GN-0001"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block">
          <span className={labelClass}>Issuing Authority</span>
          <input
            type="text"
            value={issuingAuthority}
            onChange={(event) => setIssuingAuthority(event.target.value)}
            placeholder="e.g. SLTDA"
            className={inputClass}
          />
        </label>
      </div>
    </GuideVerificationShell>
  );
}
