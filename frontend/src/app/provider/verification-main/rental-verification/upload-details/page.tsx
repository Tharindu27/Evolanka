'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';

import { provinceDistricts } from '@/data/provider-verification-data/sri-lanka-regions';
import {
  RENTAL_REGISTRATION_STORAGE_KEY,
  type GuideRegistrationSummary,
} from '@/lib/guide-registration';

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10 disabled:cursor-not-allowed disabled:bg-[#f5f7fc] disabled:text-[#8a93a8]';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-[#e3e8f4] pt-7 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">{icon}</span>
        <div>
          <h2 className="text-lg font-bold text-[#001a43]">{title}</h2>
          {subtitle && <p className="text-xs text-[#6c7387]">{subtitle}</p>}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  className = '',
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label} {required && <span className="text-[#b08d1f]">*</span>}
      </span>
      {children}
    </label>
  );
}

function FileButton({
  file,
  accept,
  label,
  onChange,
}: {
  file: File | null;
  accept: string;
  label: string;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-3">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        aria-label={label}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm font-semibold text-[#001a43] transition-colors hover:border-[#001a43]"
      >
        <span>⇪</span>
        <span className="truncate">{file ? file.name : label}</span>
      </button>
      {file && (
        <button
          type="button"
          onClick={() => {
            onChange(null);
            if (inputRef.current) inputRef.current.value = '';
          }}
          aria-label={`Remove ${file.name}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-[#4e5568] transition-colors hover:bg-[#001a43]/10"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default function RentalVerificationPage() {
  const router = useRouter();
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);

  const districts = province ? provinceDistricts[province] : [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uploads = [
      { id: 'logo', file: logo },
      { id: 'registration', file: registrationDoc },
    ];
    const summary: GuideRegistrationSummary = {
      reference: `EVO-TR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      documents: uploads.flatMap(({ id, file }) => (file ? [{ id, name: file.name, size: file.size }] : [])),
    };

    sessionStorage.setItem(RENTAL_REGISTRATION_STORAGE_KEY, JSON.stringify(summary));
    router.push('/provider/verification-main/rental-verification/complete');
  };

  return (
    <main
      className="brand-backdrop relative min-h-screen bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <header className="relative z-10 border-b border-[#e3e8f4] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-[1.05rem] font-black uppercase tracking-[-0.05em] text-[#001a43]">EVOLANKA</div>
            <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08d1f]">
              Partner Portal
            </span>
          </div>

          <Link
            href="/provider/profile/services"
            className="inline-flex items-center gap-2 rounded-full border border-[#dce3f1] bg-white px-4 py-2 text-sm font-semibold text-[#001a43] transition-colors hover:border-[#001a43]"
          >
            <span>⌂</span>
            Home
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[800px] px-4 pb-12 pt-8 md:px-8">
        <h1 className="brand-page-title text-3xl font-black tracking-[-0.06em] md:text-4xl">
          Transport Partner Registration
        </h1>
        <p className="brand-page-subtitle mt-2 text-sm md:text-base">
          Tell us about your transport business to get started.
        </p>
        <p className="mt-4 text-xs text-[#6c7387]">
          Fields marked <span className="text-[#b08d1f]">*</span> are required.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-7 rounded-[1.3rem] border border-[#e3e8f4] bg-white p-5 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8"
        >
          <Section icon="👤" title="Personal Details">
            <Field label="Full Name" required>
              <input type="text" required placeholder="Enter your full name" className={inputClass} />
            </Field>
            <Field label="NIC / Passport / BR Number">
              <input type="text" placeholder="NIC, Passport or BR number" className={inputClass} />
            </Field>
            <Field label="Email" required>
              <input type="email" required placeholder="you@example.com" className={inputClass} />
            </Field>
            <Field label="Mobile Number" required>
              <input type="tel" required placeholder="+94 7X XXX XXXX" className={inputClass} />
            </Field>
            <Field label="WhatsApp Number">
              <input type="tel" placeholder="+94 7X XXX XXXX" className={inputClass} />
            </Field>
          </Section>

          <Section icon="🏢" title="Company Details">
            <Field label="Company Name" required>
              <input type="text" required placeholder="Enter company name" className={inputClass} />
            </Field>
            <Field label="Director / Owner Details">
              <input type="text" placeholder="Director or owner name/details" className={inputClass} />
            </Field>
            <Field label="Company Address" className="md:col-span-2">
              <input type="text" placeholder="Enter company address" className={inputClass} />
            </Field>
            <div className="md:col-span-2">
              <span className={labelClass}>Company Logo</span>
              <div className="max-w-xs">
                <FileButton file={logo} accept="image/*" label="Upload logo" onChange={setLogo} />
              </div>
            </div>
          </Section>

          <Section icon="📍" title="Address & Location">
            <Field label="Address" required>
              <input type="text" required placeholder="Enter your address" className={inputClass} />
            </Field>
            <Field label="Province" required>
              <select
                required
                value={province}
                onChange={(event) => {
                  setProvince(event.target.value);
                  setDistrict('');
                }}
                className={`${inputClass} ${province ? '' : 'text-[#8a93a8]'}`}
              >
                <option value="">Select province</option>
                {Object.keys(provinceDistricts).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="District" required>
              <select
                required
                disabled={!province}
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className={`${inputClass} ${district ? '' : 'text-[#8a93a8]'}`}
              >
                <option value="">{province ? 'Select district' : 'Select a province first'}</option>
                {districts.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="City" required>
              <input
                type="text"
                required
                disabled={!district}
                placeholder={district ? 'Enter city' : 'Select a district first'}
                className={inputClass}
              />
            </Field>
          </Section>

          <Section icon="📞" title="Emergency Contact" subtitle="Someone we can reach if we can't reach you.">
            <Field label="Contact Name">
              <input type="text" placeholder="Emergency contact name" className={inputClass} />
            </Field>
            <Field label="Contact Number">
              <input type="tel" placeholder="Emergency contact number" className={inputClass} />
            </Field>
          </Section>

          <Section icon="🏦" title="Bank Details" subtitle="Used for payouts. Kept private and secure.">
            <Field label="Bank Name">
              <input type="text" placeholder="Bank name" className={inputClass} />
            </Field>
            <Field label="Bank Branch">
              <input type="text" placeholder="Branch name" className={inputClass} />
            </Field>
            <Field label="Account Holder Name">
              <input type="text" placeholder="Account holder name" className={inputClass} />
            </Field>
            <Field label="Account Number">
              <input type="text" inputMode="numeric" placeholder="Account number" className={inputClass} />
            </Field>
          </Section>

          <Section icon="🛡" title="SLTDA Registration">
            <Field label="Registration Number">
              <input type="text" placeholder="SLTDA registration number" className={inputClass} />
            </Field>
            <div>
              <span className={labelClass}>Registration Document</span>
              <FileButton
                file={registrationDoc}
                accept="image/*,application/pdf"
                label="Upload document"
                onChange={setRegistrationDoc}
              />
            </div>
          </Section>

          <div>
            <button
              type="submit"
              className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition hover:-translate-y-0.5"
            >
              Submit
              <span>→</span>
            </button>
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[#6c7387]">
              <span>🔒</span>
              Your information is secure and encrypted in compliance with SLTDA standards.
            </p>
          </div>
        </form>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-xs text-[#6c7387] md:flex-row md:items-center md:justify-between">
          <div>© 2025 EVOLANKA Platforms Ltd. All rights reserved.</div>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>Partner Terms</span>
            <span>Help &amp; Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
