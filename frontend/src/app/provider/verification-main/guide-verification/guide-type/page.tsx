'use client';

import GuideVerificationShell from '@/components/provider/guide/guide-verification-shell';
import { useState } from 'react';

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

const guideOptionsData = [
  {
    id: 'individual-guide',
    title: 'Individual Guide',
    description: 'Solo certified professional tourist guide',
  },
  {
    id: 'company-agency',
    title: 'Company / Agency',
    description: 'Registered travel agency or guide fleet operator',
  },
];

const accountTypesData = ['Individual Guide', 'Agency (Inbound)', 'Agency (Outbound)'];

const expertiseAreasData = [
  'Adventure & Outdoors',
  'Culture & Heritage',
  'Wildlife & Nature',
  'City Tours',
  'Culinary & Local Life',
  'Religious & Pilgrimage',
];

export default function GuideTypePage() {
  const [selectedGuideTypes, setSelectedGuideTypes] = useState<string[]>([]);
  const [selectedAccountTypes, setSelectedAccountTypes] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);

  const toggleGuideType = (id: string) => {
    setSelectedGuideTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAccountType = (type: string) => {
    setSelectedAccountTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
    );
  };

  const toggleExpertise = (area: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(area) ? prev.filter((item) => item !== area) : [...prev, area]
    );
  };

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={0}
      stepLabel="Step 1"
      stepTitle="Guide Type"
      onBackHref="/provider/profile/services"
      onNextHref="/provider/verification-main/guide-verification/guide-profile"
    >
      <div className="space-y-6">
        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#6c7387]">
            Guide Type (select all that apply)
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {guideOptionsData.map((option) => {
              const isSelected = selectedGuideTypes.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleGuideType(option.id)}
                  className={[
                    'flex w-full items-center justify-between rounded-[1rem] border p-4 text-left transition-all',
                    isSelected
                      ? 'border-[#001a43] bg-[#f0f4ff] shadow-[0_8px_24px_rgba(0,26,67,0.08)]'
                      : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={[
                        'flex h-10 w-10 items-center justify-center rounded-xl text-lg',
                        isSelected ? 'bg-[#001a43] text-white' : 'bg-[#f5f7fc] text-[#001a43]',
                      ].join(' ')}
                    >
                      {option.id === 'individual-guide' ? '👤' : '🏢'}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#001a43]">{option.title}</div>
                      <div className="mt-1 text-sm text-[#4e5568]">{option.description}</div>
                    </div>
                  </div>

                  <span
                    className={[
                      'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold',
                      isSelected
                        ? 'border-[#b08d1f] bg-[#b08d1f] text-white'
                        : 'border-[#c5cde0] bg-transparent text-transparent',
                    ].join(' ')}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#6c7387]">
            Account Type (select all that apply)
          </p>

          <div className="flex flex-wrap gap-3">
            {accountTypesData.map((type) => {
              const isSelected = selectedAccountTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleAccountType(type)}
                  className={[
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all',
                    isSelected
                      ? 'border-[#001a43] bg-[#001a43] text-white'
                      : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50 hover:text-[#001a43]',
                  ].join(' ')}
                >
                  <span className={isSelected ? 'text-[#e6c65a]' : 'text-[#8a93a8]'}>✓</span>
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#6c7387]">
            Areas of expertise
          </p>

          <div className="flex flex-wrap gap-3">
            {expertiseAreasData.map((area) => {
              const isSelected = selectedExpertise.includes(area);
              return (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleExpertise(area)}
                  className={[
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors',
                    isSelected
                      ? 'border-[#001a43] bg-[#001a43] text-white'
                      : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50 hover:text-[#001a43]',
                  ].join(' ')}
                >
                  <span className={isSelected ? 'text-[#e6c65a]' : 'text-[#b08d1f]'}>✦</span>
                  {area}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </GuideVerificationShell>
  );
}
