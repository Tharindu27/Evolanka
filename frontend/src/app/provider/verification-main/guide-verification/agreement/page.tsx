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

const agreements = [
  {
    id: 'safety',
    title: 'Safety Acknowledgement',
    description: 'I acknowledge my responsibility for the safety and well-being of all guests during tours.',
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    description: 'I agree to uphold professional conduct standards and treat all guests with respect.',
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    description: "I have read and agree to the platform's terms and conditions for tour guide partners.",
  },
  {
    id: 'accuracy',
    title: 'Accuracy Confirmation',
    description: 'I confirm that all information provided in this registration is accurate and truthful.',
  },
];

export default function GuideAgreementPage() {
  const [accepted, setAccepted] = useState<string[]>([]);

  const allAccepted = accepted.length === agreements.length;

  const toggleAgreement = (id: string) => {
    setAccepted((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={10}
      stepLabel="Step 11"
      stepTitle="Agreements"
      onBackHref="/provider/verification-main/guide-verification/guide-bank-details"
      onNextHref="/provider/verification-main/guide-verification/upload-doc"
      nextDisabled={!allAccepted}
    >
      <div className="space-y-4">
        <p className="text-sm text-[#4e5568]">
          Please review and accept all agreements to complete your registration.
        </p>

        {agreements.map((agreement) => {
          const isChecked = accepted.includes(agreement.id);
          return (
            <label
              key={agreement.id}
              className={[
                'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
                isChecked ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
              ].join(' ')}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleAgreement(agreement.id)}
                className="peer sr-only"
              />
              <span
                className={[
                  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#001a43]/30',
                  isChecked
                    ? 'border-[#001a43] bg-[#001a43] text-white'
                    : 'border-[#c5cde0] bg-white text-transparent',
                ].join(' ')}
              >
                ✓
              </span>
              <span>
                <span className="block text-sm font-bold text-[#001a43]">{agreement.title}</span>
                <span className="mt-1 block text-sm text-[#4e5568]">{agreement.description}</span>
              </span>
            </label>
          );
        })}

        {allAccepted && (
          <div className="flex items-center gap-3 rounded-xl border border-[#e6d9a8] bg-[#fbf6e4] p-4 text-sm font-semibold text-[#001a43]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b08d1f] text-[11px] text-white">
              ✓
            </span>
            All agreements accepted — click Continue to upload your documents.
          </div>
        )}
      </div>
    </GuideVerificationShell>
  );
}
