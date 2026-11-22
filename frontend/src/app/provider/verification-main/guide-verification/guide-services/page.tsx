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

const defaultTourTypes = [
  'Day Tour',
  'Multi-Day Tours',
  'Private Tours',
  'Group Tours',
  'Cultural Tour',
  'Wildlife Tour',
  'Adventure Tour',
  'Pilgrimage Tour',
  'Culinary Tour',
];

const regions = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-3 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

const chipClass = (isSelected: boolean) =>
  [
    'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors',
    isSelected
      ? 'border-[#001a43] bg-[#001a43] text-white'
      : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50 hover:text-[#001a43]',
  ].join(' ');

const toggleItem = (list: string[], item: string) =>
  list.includes(item) ? list.filter((value) => value !== item) : [...list, item];

export default function GuideServicesPage() {
  const [tourTypes, setTourTypes] = useState<string[]>(defaultTourTypes);
  const [selectedTourTypes, setSelectedTourTypes] = useState<string[]>([]);
  const [customTourType, setCustomTourType] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [customToursAvailable, setCustomToursAvailable] = useState(false);

  const addCustomTourType = () => {
    const value = customTourType.trim();
    if (!value) return;

    const existing = tourTypes.find((type) => type.toLowerCase() === value.toLowerCase());
    if (existing) {
      setSelectedTourTypes((prev) => (prev.includes(existing) ? prev : [...prev, existing]));
    } else {
      setTourTypes((prev) => [...prev, value]);
      setSelectedTourTypes((prev) => [...prev, value]);
    }
    setCustomTourType('');
  };

  const removeTourType = (type: string) => {
    setTourTypes((prev) => prev.filter((item) => item !== type));
    setSelectedTourTypes((prev) => prev.filter((item) => item !== type));
  };

  return (
    <GuideVerificationShell
      title="Become a Tour Guide"
      subtitle="Complete all steps to get verified as a licensed tour guide."
      steps={steps}
      currentStep={5}
      stepLabel="Step 6"
      stepTitle="Services"
      onBackHref="/provider/verification-main/guide-verification/guide-qualification"
      onNextHref="/provider/verification-main/guide-verification/guide-pricing"
    >
      <div className="space-y-7">
        <div>
          <p className={labelClass}>
            Tour Types <span className="text-[#b08d1f]">*</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {tourTypes.map((type) => {
              const isSelected = selectedTourTypes.includes(type);
              return (
                <span key={type} className={`${chipClass(isSelected)} gap-2 py-0 pr-2`}>
                  <button
                    type="button"
                    onClick={() => setSelectedTourTypes((prev) => toggleItem(prev, type))}
                    className="py-2"
                  >
                    {type}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeTourType(type)}
                    aria-label={`Remove ${type}`}
                    className={[
                      'flex h-5 w-5 items-center justify-center rounded-full text-xs leading-none transition-colors',
                      isSelected ? 'hover:bg-white/20' : 'hover:bg-[#001a43]/10',
                    ].join(' ')}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-3">
            <input
              type="text"
              value={customTourType}
              onChange={(event) => setCustomTourType(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addCustomTourType();
                }
              }}
              placeholder="Type a custom tour type and press Enter or Add"
              className={inputClass}
            />
            <button
              type="button"
              onClick={addCustomTourType}
              className="btn-primary shrink-0 rounded-xl px-6 py-3 text-sm font-bold"
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <p className={labelClass}>
            Regions Covered <span className="text-[#b08d1f]">*</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegions((prev) => toggleItem(prev, region))}
                className={chipClass(selectedRegions.includes(region))}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={customToursAvailable}
          onClick={() => setCustomToursAvailable((prev) => !prev)}
          className={[
            'flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors',
            customToursAvailable
              ? 'border-[#001a43] bg-[#f0f4ff]'
              : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
          ].join(' ')}
        >
          <span
            className={[
              'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
              customToursAvailable ? 'bg-[#001a43]' : 'bg-[#c5cde0]',
            ].join(' ')}
          >
            <span
              className={[
                'inline-block h-5 w-5 rounded-full bg-white shadow transition-transform',
                customToursAvailable ? 'translate-x-5' : 'translate-x-0.5',
              ].join(' ')}
            />
          </span>
          <span className="text-sm font-medium text-[#001a43]">Custom tours available on request</span>
        </button>
      </div>
    </GuideVerificationShell>
  );
}
