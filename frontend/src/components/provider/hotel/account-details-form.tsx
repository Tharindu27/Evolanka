'use client';

import { useState, type ReactNode } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import type { PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

const languages = ['English', 'Sinhala', 'Tamil'];

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-xs font-semibold text-[#4e5568]';

type FormState = {
  firstName: string;
  lastName: string;
  nationality: string;
  phone: string;
  language: string;
  address1: string;
  address2: string;
  province: string;
  city: string;
  postalCode: string;
  country: string;
  accountHolder: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  swift: string;
};

const initialState: FormState = {
  firstName: '',
  lastName: '',
  nationality: '',
  phone: '',
  language: '',
  address1: '',
  address2: '',
  province: '',
  city: '',
  postalCode: '',
  country: '',
  accountHolder: '',
  bankName: '',
  branchName: '',
  accountNumber: '',
  swift: '',
};

function Section({
  icon,
  title,
  subtitle,
  badge,
  children,
}: {
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
      <div className="mb-6 flex items-start justify-between gap-3 border-b border-[#e3e8f4] pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">{icon}</span>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[#001a43]">{title}</h2>
            <p className="text-xs text-[#6c7387]">{subtitle}</p>
          </div>
        </div>
        {badge && (
          <span className="rounded-md border border-[#dce3f1] bg-[#f5f7fc] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4e5568]">
            {badge}
          </span>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  className = '',
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label} {required && <span className="text-[#b08d1f]">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-[#8a93a8]">{hint}</span>}
    </label>
  );
}

export default function AccountDetailsForm({ category }: { category: PropertyCategory }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [bankTransfer, setBankTransfer] = useState(false);

  const bind = (key: keyof FormState) => ({
    value: form[key],
    onChange: (event: { target: { value: string } }) => {
      const { value } = event.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    },
  });

  const required: (keyof FormState)[] = [
    'firstName',
    'lastName',
    'nationality',
    'phone',
    'address1',
    'province',
    'city',
    'country',
    'accountHolder',
    'bankName',
    'branchName',
    'accountNumber',
  ];
  const isValid = required.every((key) => form[key].trim()) && bankTransfer;

  return (
    <HostSetupLayout
      backHref={`${base}/upload-image?category=${category}`}
      nextHref={`${base}/agreement?category=${category}`}
      nextDisabled={!isValid}
      helpText="Need assistance setting up bank payouts?"
      helpLinkText="Contact EVOLANKA Host Financial Support ↗"
    >
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08d1f]">
          <span>🛡️</span>
          Verification &amp; Disbursement
        </div>
        <h1 className="brand-page-title mt-3 text-4xl font-black tracking-[-0.06em] md:text-5xl">Account details</h1>
        <p className="brand-page-subtitle mt-3 max-w-[620px] text-sm md:text-base">
          Complete your personal verification, registered billing address, and bank payout information to receive
          traveler booking earnings directly into your local account.
        </p>

        <div className="mt-8 space-y-6">
          <Section icon="👤" title="General Information" subtitle="Primary account holder legal entity data">
            <Field label="First name" required>
              <input type="text" placeholder="First name" className={inputClass} {...bind('firstName')} />
            </Field>
            <Field label="Last name" required>
              <input type="text" placeholder="Last name" className={inputClass} {...bind('lastName')} />
            </Field>
            <Field label="Nationality" required className="md:col-span-2">
              <input type="text" placeholder="e.g. Sri Lankan" className={inputClass} {...bind('nationality')} />
            </Field>
          </Section>

          <Section
            icon="📞"
            title="Contact Information"
            subtitle="Channels for dispatch notifications and SMS verification"
          >
            <Field label="Phone number" required className="md:col-span-2">
              <input
                type="tel"
                inputMode="tel"
                placeholder="77 894 1205"
                className={inputClass}
                {...bind('phone')}
              />
            </Field>
            <Field label="Language preference" className="md:col-span-2">
              <select
                className={`${inputClass} ${form.language ? '' : 'text-[#8a93a8]'}`}
                {...bind('language')}
              >
                <option value="">Select language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </Field>
          </Section>

          <Section
            icon="📍"
            title="Address Information"
            subtitle="Tax registration & permanent postal residence"
          >
            <Field label="Address 1" required className="md:col-span-2">
              <input type="text" placeholder="Address line 1" className={inputClass} {...bind('address1')} />
            </Field>
            <Field label="Address 2" className="md:col-span-2">
              <input type="text" placeholder="Address line 2" className={inputClass} {...bind('address2')} />
            </Field>
            <Field label="State / Province" required>
              <input type="text" placeholder="e.g. Western" className={inputClass} {...bind('province')} />
            </Field>
            <Field label="City" required>
              <input type="text" placeholder="e.g. Colombo" className={inputClass} {...bind('city')} />
            </Field>
            <Field label="Zip / Postal Code">
              <input type="text" placeholder="e.g. 00100" className={inputClass} {...bind('postalCode')} />
            </Field>
            <Field label="Country" required>
              <input type="text" placeholder="e.g. Sri Lanka" className={inputClass} {...bind('country')} />
            </Field>
          </Section>

          <Section
            icon="🏦"
            title="Bank Information"
            subtitle="Direct depository details for payout settlements"
            badge="🔒 256-bit encrypted"
          >
            <Field label="Account holder name" required className="md:col-span-2">
              <input type="text" placeholder="Name as on bank account" className={inputClass} {...bind('accountHolder')} />
            </Field>
            <Field label="Bank name" required>
              <input type="text" placeholder="e.g. Sampath Bank" className={inputClass} {...bind('bankName')} />
            </Field>
            <Field label="Branch name" required>
              <input type="text" placeholder="e.g. Colombo Main" className={inputClass} {...bind('branchName')} />
            </Field>
            <Field label="Account number" required className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Account number"
                  className={`${inputClass} pr-28`}
                  {...bind('accountNumber')}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#dce3f1] bg-[#f5f7fc] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4e5568]">
                  LKR Primary
                </span>
              </div>
            </Field>
            <Field
              label="SWIFT/BIC Code"
              className="md:col-span-2"
              hint="Optional - Format: BANK+COUNTRY+LOCATION (8 chars) or +BRANCH (11 chars)"
            >
              <input type="text" placeholder="e.g. BSAMLKLX" className={inputClass} {...bind('swift')} />
            </Field>
          </Section>

          <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
            <div className="mb-6 flex items-center gap-3 border-b border-[#e3e8f4] pb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">💵</span>
              <div>
                <h2 className="text-xl font-bold tracking-[-0.03em] text-[#001a43]">Payout Method</h2>
                <p className="text-xs text-[#6c7387]">Default remittance distribution engine</p>
              </div>
            </div>

            <button
              type="button"
              role="checkbox"
              aria-checked={bankTransfer}
              onClick={() => setBankTransfer((prev) => !prev)}
              className={[
                'flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors',
                bankTransfer
                  ? 'border-[#001a43] bg-[#f0f4ff]'
                  : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold',
                  bankTransfer
                    ? 'border-[#b08d1f] bg-[#b08d1f] text-white'
                    : 'border-[#c5cde0] bg-white text-transparent',
                ].join(' ')}
              >
                ✓
              </span>
              <span>
                <span className="block text-sm font-bold text-[#001a43]">Bank transfer</span>
                <span className="mt-1 block text-xs leading-relaxed text-[#6c7387]">
                  Receive payment directly to your bank account for groups of bookings. Bookings will qualify for
                  payment 30 days after departure.
                </span>
              </span>
            </button>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#dce3f1] bg-[#f5f7fc] px-4 py-3 text-xs leading-relaxed text-[#4e5568]">
              <span>🛡️</span>
              <span>
                All banking credentials are sent through a cryptographic vault. EVOLANKA adheres strictly to Central
                Bank of Sri Lanka electronic transfer standards.
              </span>
            </div>
          </section>
        </div>

        <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a93a8]">
          EVOLANKA Merchant Services • System version 2.4.0
        </p>
      </div>
    </HostSetupLayout>
  );
}
