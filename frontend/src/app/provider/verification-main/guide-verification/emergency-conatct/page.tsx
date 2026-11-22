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

const relationships = ['Spouse', 'Parent', 'Sibling', 'Child', 'Relative', 'Friend', 'Colleague', 'Other'];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

export default function GuideEmergencyContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={8}
      stepLabel="Step 9"
      stepTitle="Emergency Contact"
      onBackHref="/provider/verification-main/guide-verification/guide-vehicle"
      onNextHref="/provider/verification-main/guide-verification/guide-bank-details"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="emergency-name" className={labelClass}>
            Contact Name <span className="text-[#b08d1f]">*</span>
          </label>
          <input
            id="emergency-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="emergency-phone" className={labelClass}>
            Contact Phone Number <span className="text-[#b08d1f]">*</span>
          </label>
          <input
            id="emergency-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={inputClass}
          />
          <p className="mt-2 text-xs text-[#6c7387]">Includes mobile SMS alerts for on-tour emergency dispatch.</p>
        </div>

        <div className="md:max-w-sm">
          <label htmlFor="emergency-relationship" className={labelClass}>
            Relationship <span className="font-medium normal-case tracking-normal">(optional)</span>
          </label>
          <select
            id="emergency-relationship"
            value={relationship}
            onChange={(event) => setRelationship(event.target.value)}
            className={`${inputClass} ${relationship ? '' : 'text-[#8a93a8]'}`}
          >
            <option value="">Select relationship</option>
            {relationships.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </GuideVerificationShell>
  );
}
