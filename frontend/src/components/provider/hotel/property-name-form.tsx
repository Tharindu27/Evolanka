'use client';

import { useState } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import { updateHotelListing } from '@/lib/guide-registration';
import { propertyCategoryHeading, type PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

const categoryContent: Record<PropertyCategory, { noun: string; backHref: string }> = {
  hotel: { noun: 'hotel', backHref: `${base}/types/hotels-types` },
  home: { noun: 'home', backHref: `${base}/types/home-types` },
  apartment: { noun: 'apartment', backHref: `${base}/types/apartment-types` },
  'unique-stay': { noun: 'unique stay', backHref: `${base}/types/unique-stay-types` },
};

const labelClass = 'mb-3 block text-base font-semibold text-[#001a43]';

export default function PropertyNameForm({ category }: { category: PropertyCategory }) {
  const { noun, backHref } = categoryContent[category];
  const heading = propertyCategoryHeading[category];

  const [name, setName] = useState('');
  const [isChain, setIsChain] = useState<'yes' | 'no' | null>(null);
  const [stars, setStars] = useState(0);

  const isValid = name.trim().length > 0 && isChain !== null;

  return (
    <HostSetupLayout backHref={backHref} nextHref={`${base}/location?category=${category}`} nextDisabled={!isValid}>
      <div className="mx-auto max-w-[760px] text-center">
        <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">About your {heading}</h1>
        <p className="brand-page-subtitle mt-4 text-sm md:text-base">
          Provide the primary details about your establishment for guest bookings and verifications.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[650px] space-y-8 rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
        <div>
          <label htmlFor="property-name" className={labelClass}>
            What is the name of your {noun}? <span className="text-[#b08d1f]">*</span>
          </label>
          <input
            id="property-name"
            type="text"
            value={name}
            onChange={(event) => {
              const { value } = event.target;
              setName(value);
              updateHotelListing({ propertyName: value.trim() });
            }}
            placeholder="Guests will see this name."
            className="w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3.5 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10"
          />
        </div>

        <fieldset>
          <legend className={labelClass}>
            Are you a property management company or part of a group or chain?{' '}
            <span className="text-[#b08d1f]">*</span>
          </legend>
          <div className="flex items-center gap-8">
            {(['yes', 'no'] as const).map((value) => (
              <label key={value} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#001a43]">
                <input
                  type="radio"
                  name="is-chain"
                  value={value}
                  checked={isChain === value}
                  onChange={() => setIsChain(value)}
                  className="h-4 w-4 accent-[#001a43]"
                />
                {value === 'yes' ? 'Yes' : 'No'}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className={labelClass}>
            What is the star rating of your {noun}? <span className="text-sm font-normal text-[#6c7387]">(Optional)</span>
          </div>
          <div className="flex items-center gap-2" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} star${value > 1 ? 's' : ''}`}
                aria-pressed={stars === value}
                onClick={() => setStars(stars === value ? 0 : value)}
                className={[
                  'text-4xl leading-none transition-colors hover:text-[#b08d1f]',
                  value <= stars ? 'text-[#b08d1f]' : 'text-[#d3d9e8]',
                ].join(' ')}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    </HostSetupLayout>
  );
}
