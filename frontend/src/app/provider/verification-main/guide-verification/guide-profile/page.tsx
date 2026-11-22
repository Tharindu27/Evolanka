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

export default function GuideProfilePage() {
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={1}
      stepLabel="Step 2"
      stepTitle="Profile"
      onBackHref="/provider/verification-main/guide-verification/guide-type"
      onNextHref="/provider/verification-main/guide-verification/guide-contact"
    >
      <div className="space-y-5">
        <label className="block">
          <span className={labelClass}>Full Name</span>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>NIC or Passport Number</span>
          <input
            type="text"
            value={idNumber}
            onChange={(event) => setIdNumber(event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Date of Birth</span>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Nationality</span>
          <input
            type="text"
            value={nationality}
            onChange={(event) => setNationality(event.target.value)}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Residential Address</span>
          <textarea
            rows={4}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Full residential address"
            className={`${inputClass} resize-none`}
          />
        </label>
      </div>
    </GuideVerificationShell>
  );
}
