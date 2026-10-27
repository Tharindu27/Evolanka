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

const availabilityOptions = ['Weekdays', 'Weekends', 'Seasonal'];

const cancellationPolicies = [
  {
    id: 'Flexible',
    recommended: false,
    rules: [
      { when: 'More than 24 hours before tour', refund: '100% refund' },
      { when: '12–24 hours before tour', refund: '50% refund' },
      { when: 'Less than 12 hours before tour', refund: '0% refund' },
    ],
  },
  {
    id: 'Moderate',
    recommended: true,
    rules: [
      { when: 'More than 48 hours before tour', refund: '100% refund' },
      { when: '24–48 hours before tour', refund: '50% refund' },
      { when: 'Less than 24 hours before tour', refund: '0% refund' },
    ],
  },
  {
    id: 'Strict',
    recommended: false,
    rules: [
      { when: 'More than 7 days before tour', refund: '100% refund' },
      { when: '3–7 days before tour', refund: '50% refund' },
      { when: 'Less than 3 days before tour', refund: '0% refund' },
    ],
  },
];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

const hintClass = 'mt-2 text-xs text-[#6c7387]';

const chipClass = (isSelected: boolean) =>
  [
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
    isSelected
      ? 'border-[#001a43] bg-[#001a43] text-white'
      : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50 hover:text-[#001a43]',
  ].join(' ');

export default function GuidePricingPage() {
  const [availability, setAvailability] = useState<string[]>([]);
  const [advanceDays, setAdvanceDays] = useState('');
  const [policyId, setPolicyId] = useState('');

  const selectedPolicy = cancellationPolicies.find((policy) => policy.id === policyId);

  const toggleAvailability = (option: string) => {
    setAvailability((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={6}
      stepLabel="Step 7"
      stepTitle="Pricing & Availability"
      onBackHref="/provider/verification-main/guide-verification/guide-services"
      onNextHref="/provider/verification-main/guide-verification/guide-vehicle"
    >
      <div className="space-y-7">
        <div>
          <p className={`${labelClass} mb-3`}>Availability</p>
          <div className="flex flex-wrap gap-2.5">
            {availabilityOptions.map((option) => {
              const isSelected = availability.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleAvailability(option)}
                  className={chipClass(isSelected)}
                >
                  {isSelected && <span className="text-[#e6c65a]">✓</span>}
                  {option}
                </button>
              );
            })}
          </div>
          <p className={hintClass}>Select all work intervals when you are ready to accept tour inquiries.</p>
        </div>

        <div>
          <label htmlFor="advance-days" className={`${labelClass} mb-3`}>
            Advance Booking Required (days) <span className="text-[#b08d1f]">*</span>
          </label>
          <div className="relative">
            <input
              id="advance-days"
              type="number"
              min={0}
              value={advanceDays}
              onChange={(event) => setAdvanceDays(event.target.value)}
              placeholder="0"
              className={`${inputClass} pr-36`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#6c7387]">
              days prior to tour
            </span>
          </div>
          <p className={hintClass}>
            Minimum notice period requested before a traveler can schedule your service.
          </p>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <label htmlFor="cancellation-policy" className={labelClass}>
              Cancellation Policy <span className="text-[#b08d1f]">*</span>
            </label>
            <span className="text-xs font-medium text-[#b08d1f]">Standard Guide Terms</span>
          </div>

          <select
            id="cancellation-policy"
            value={policyId}
            onChange={(event) => setPolicyId(event.target.value)}
            className={`${inputClass} ${policyId ? '' : 'text-[#8a93a8]'}`}
          >
            <option value="">Select policy</option>
            {cancellationPolicies.map((policy) => (
              <option key={policy.id} value={policy.id}>
                {policy.id}
              </option>
            ))}
          </select>

          {selectedPolicy && (
            <div className="mt-4 rounded-xl border border-[#dce3f1] bg-[#f5f7fc] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#001a43]">
                  <span className="h-2 w-2 rounded-full bg-[#b08d1f]" />
                  {selectedPolicy.id} Policy
                </div>
                {selectedPolicy.recommended && (
                  <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b08d1f]">
                    Recommended
                  </span>
                )}
              </div>

              <ul className="space-y-2">
                {selectedPolicy.rules.map((rule) => (
                  <li key={rule.when} className="flex items-center gap-2 text-sm text-[#4e5568]">
                    <span className="h-1 w-1 rounded-full bg-[#001a43]" />
                    <span>
                      {rule.when} → <strong className="font-bold text-[#001a43]">{rule.refund}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </GuideVerificationShell>
  );
}
