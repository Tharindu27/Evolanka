'use client';

import { useState, type ReactNode } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import { propertyCategoryHeading, type PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

type GroupKey =
  | 'access'
  | 'room'
  | 'bathroom'
  | 'property'
  | 'food'
  | 'services'
  | 'safety'
  | 'payment';

const optionGroups: Record<GroupKey, string[]> = {
  access: ['Car park', 'Front desk (24-hour)', 'Keyless access', 'Private check-in/out'],
  room: [
    'Air Conditioning',
    'Coffee / Tea Maker',
    'Electric Kettle',
    'Free Wi-Fi',
    'Heating',
    'Iron & Ironing Board',
    'Mini Bar',
    'Refrigerator',
    'Safe Deposit Box',
    'Soundproofing',
    'Telephone',
    'Television',
    'Wardrobe / Closet',
    'Work Desk',
  ],
  bathroom: [
    'Bathrobes',
    'Bathtub',
    'Bidet',
    'Free Toiletries',
    'Hair Dryer',
    'Hot Water',
    'Private Bathroom',
    'Shower',
    'Slippers',
    'Towels',
  ],
  property: [
    'Elevator / Lift',
    'EV Charging Station',
    'Fitness Center',
    'Garden',
    'Kids Pool',
    'Parking',
    'Sauna',
    'Spa & Wellness Center',
    'Steam Room',
    'Swimming Pool',
    'Terrace',
  ],
  food: [
    'Bar / Lounge',
    'BBQ Facilities',
    'Breakfast Included',
    'Buffet Breakfast',
    'Coffee Shop',
    'Restaurant',
    'Room Service',
  ],
  services: [
    '24-Hour Front Desk',
    'Airport Shuttle',
    'Car Rental',
    'Concierge Service',
    'Currency Exchange',
    'Dry Cleaning',
    'Housekeeping',
    'Laundry Service',
    'Luggage Storage',
    'Tour Desk',
  ],
  safety: ['24-Hour Security', 'CCTV', 'Fire Extinguishers', 'In-room Safety', 'Security Alarm', 'Smoke Detectors'],
  payment: ['American Express', 'Cash', 'MasterCard', 'UnionPay', 'Visa'],
};

const refundPolicies = [
  {
    id: 'refund-1-day',
    title: 'Refundable up to 1 day before check-in date',
    description:
      'Guest can cancel up until 1 day (24 hours) before the check-in date. Cancellation within 24 hours of check-in date pays 100% of booking as penalty.',
  },
  {
    id: 'refund-2-days',
    title: 'Refundable up to 2 days before check-in date',
    description:
      'Guest can cancel up until 2 days (48 hours) before the check-in date. Cancellation within 48 hours of check-in date pays 100% of booking as penalty.',
    recommended: true,
  },
  {
    id: 'refund-3-days',
    title: 'Refundable up to 3 days before check-in date',
    description:
      'Guest can cancel up until 3 days (72 hours) before the check-in date. Cancellation within 72 hours of check-in date pays 100% of booking as penalty.',
  },
  {
    id: 'non-refundable',
    title: 'Non-refundable',
    description: 'No free cancellation. A 100% penalty applies to all cancellations.',
  },
];

const cardClass =
  'rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8';

const timeInputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

function GroupHeader({
  icon,
  title,
  hint,
  required = true,
}: {
  icon: string;
  title: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0f4ff] text-sm">{icon}</span>
        <h2 className="text-base font-bold text-[#001a43]">
          {title} {required && <span className="text-[#b08d1f]">*</span>}
        </h2>
      </div>
      {hint && <span className="text-xs text-[#6c7387]">{hint}</span>}
    </div>
  );
}

function Divider() {
  return <div className="my-7 border-t border-[#e3e8f4]" />;
}

function CheckGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            role="checkbox"
            aria-checked={isSelected}
            onClick={() => onToggle(option)}
            className={[
              'flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
              isSelected
                ? 'border-[#001a43] bg-[#f0f4ff] text-[#001a43]'
                : 'border-[#dce3f1] bg-white text-[#4e5568] hover:border-[#001a43]/50',
            ].join(' ')}
          >
            <span
              className={[
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] font-bold',
                isSelected
                  ? 'border-[#b08d1f] bg-[#b08d1f] text-white'
                  : 'border-[#c5cde0] bg-white text-transparent',
              ].join(' ')}
            >
              ✓
            </span>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function FacilitiesForm({ category }: { category: PropertyCategory }) {
  const heading = propertyCategoryHeading[category];

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selections, setSelections] = useState<Record<GroupKey, string[]>>({
    access: [],
    room: [],
    bathroom: [],
    property: [],
    food: [],
    services: [],
    safety: [],
    payment: [],
  });
  const [refundPolicy, setRefundPolicy] = useState<string | null>(null);

  const toggle = (group: GroupKey) => (option: string) => {
    setSelections((prev) => ({
      ...prev,
      [group]: prev[group].includes(option) ? prev[group].filter((item) => item !== option) : [...prev[group], option],
    }));
  };

  const renderGroup = (group: GroupKey, icon: string, title: string, hint?: string): ReactNode => (
    <div>
      <GroupHeader icon={icon} title={title} hint={hint} />
      <CheckGrid options={optionGroups[group]} selected={selections[group]} onToggle={toggle(group)} />
    </div>
  );

  const isValid =
    Boolean(checkIn && checkOut && refundPolicy) &&
    (Object.keys(selections) as GroupKey[]).every((group) => selections[group].length > 0);

  return (
    <HostSetupLayout
      backHref={`${base}/location?category=${category}`}
      nextHref={`${base}/room-pricing?category=${category}`}
      nextDisabled={!isValid}
      helpText="Need assistance configuring property facilities?"
    >
      <div className="mb-5 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d9a8] bg-[#fbf6e4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d1f]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#b08d1f]" />
          Final Property Configurations
        </div>
      </div>

      <div className="mx-auto max-w-[680px] text-center">
        <h1 className="brand-page-title text-3xl font-black tracking-[-0.06em] md:text-5xl">
          {heading} Facilities, Policies &amp; Payout
        </h1>
        <p className="brand-page-subtitle mt-4 text-sm md:text-base">
          Specify your operating hours, guest services, safety gear, accepted payments, and cancellation terms to
          publish your EVOLANKA listing.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[800px] space-y-6">
        <section className={cardClass}>
          <GroupHeader icon="🕑" title="Check-in / check-out time" hint="24-hour format" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]">
                Check-in time
              </span>
              <input
                type="time"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className={timeInputClass}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]">
                Check-out time
              </span>
              <input
                type="time"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className={timeInputClass}
              />
            </label>
          </div>

          <Divider />
          {renderGroup('access', '🔑', 'Access')}
        </section>

        <section className={cardClass}>
          {renderGroup('room', '🛏️', 'Room Amenities', 'Select all that apply')}
          <Divider />
          {renderGroup('bathroom', '🛁', 'Bathroom Amenities', 'Hygiene & Essentials')}
        </section>

        <section className={cardClass}>
          {renderGroup('property', '🏢', 'Property / Facility Amenities', 'Common & Resort infrastructure')}
          <Divider />
          {renderGroup('food', '🍽️', 'Food and Beverage')}
          <Divider />
          {renderGroup('services', '🛎️', 'Services and Convenience')}
          <Divider />
          {renderGroup('safety', '🛡️', 'Safety and Security')}
        </section>

        <section className={cardClass}>
          {renderGroup('payment', '💳', 'Payment information', 'Accepted guest payment methods')}
          <Divider />

          <GroupHeader icon="↩" title="Refund Policy" hint="Choose one primary cancellation rule" />
          <div role="radiogroup" aria-label="Refund policy" className="space-y-3">
            {refundPolicies.map((policy) => {
              const isSelected = refundPolicy === policy.id;
              return (
                <button
                  key={policy.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setRefundPolicy(policy.id)}
                  className={[
                    'flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors',
                    isSelected
                      ? 'border-[#001a43] bg-[#f0f4ff]'
                      : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                      isSelected ? 'border-[#b08d1f] bg-[#b08d1f]' : 'border-[#c5cde0] bg-white',
                    ].join(' ')}
                  >
                    {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#001a43]">
                      {policy.title}
                      {policy.recommended && (
                        <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b08d1f]">
                          Recommended
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-[#6c7387]">{policy.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-semibold text-[#001a43]">
            <a href="#" className="underline underline-offset-2">
              View Cancellation Policy
            </a>
            <a href="#" className="underline underline-offset-2">
              View Refund Policy
            </a>
          </div>
        </section>
      </div>
    </HostSetupLayout>
  );
}
