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

const districts = [
  'Ampara',
  'Anuradhapura',
  'Badulla',
  'Batticaloa',
  'Colombo',
  'Galle',
  'Gampaha',
  'Hambantota',
  'Jaffna',
  'Kalutara',
  'Kandy',
  'Kegalle',
  'Kilinochchi',
  'Kurunegala',
  'Mannar',
  'Matale',
  'Matara',
  'Monaragala',
  'Mullaitivu',
  'Nuwara Eliya',
  'Polonnaruwa',
  'Puttalam',
  'Ratnapura',
  'Trincomalee',
  'Vavuniya',
];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

const hintClass = 'mt-2 text-xs text-[#6c7387]';

export default function GuideContactPage() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={2}
      stepLabel="Step 3"
      stepTitle="Contact"
      onBackHref="/provider/verification-main/guide-verification/guide-profile"
      onNextHref="/provider/verification-main/guide-verification/guide-registration"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="guide-mobile" className={labelClass}>
            Mobile Number <span className="text-[#b08d1f]">*</span>
          </label>
          <div className="flex items-center rounded-xl border border-[#dce3f1] bg-white transition focus-within:border-[#001a43] focus-within:ring-2 focus-within:ring-[#001a43]/10">
            <span className="border-r border-[#dce3f1] px-4 text-sm font-semibold text-[#001a43]">+94</span>
            <input
              id="guide-mobile"
              type="tel"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              placeholder="77 123 4567"
              className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-[#001a43] outline-none placeholder:text-[#8a93a8]"
            />
          </div>
          <p className={hintClass}>Used for official booking notifications and SMS verifications.</p>
        </div>

        <div>
          <label htmlFor="guide-email" className={labelClass}>
            Email Address <span className="text-[#b08d1f]">*</span>
          </label>
          <input
            id="guide-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="guide@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="guide-district" className={labelClass}>
            Operating District <span className="text-[#b08d1f]">*</span>
          </label>
          <select
            id="guide-district"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className={`${inputClass} ${district ? '' : 'text-[#8a93a8]'}`}
          >
            <option value="">Select district</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p className={hintClass}>
            Primary area where you conduct the majority of your guided tours.
          </p>
        </div>
      </div>
    </GuideVerificationShell>
  );
}
