'use client';

import { useEffect, useRef, useState } from 'react';

import { genderOptions, type PostPersonalDetails } from '@/data/customer-post-data';

type EditBioModalProps = {
  initialBio: string;
  initialInfo: PostPersonalDetails;
  onClose: () => void;
  onSave: (bio: string, info: PostPersonalDetails) => void;
};

const MAX_LENGTH = 300;

const fieldClass =
  'mt-1.5 block w-full rounded-xl border border-[#dfe7f5] bg-white px-3.5 py-2.5 text-sm text-[#001a43] outline-none transition placeholder:text-[#9aa3b5] focus:border-[#0d4abe] focus:ring-2 focus:ring-[#0d4abe]/15';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6d7280]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-[#c4161c]">{error}</span> : null}
    </label>
  );
}

export default function EditBioModal({ initialBio, initialInfo, onClose, onSave }: EditBioModalProps) {
  const [bio, setBio] = useState(initialBio);
  const [info, setInfo] = useState<PostPersonalDetails>(initialInfo);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const setField = (key: keyof PostPersonalDetails, value: string) => setInfo((current) => ({ ...current, [key]: value }));

  const errors = {
    email: /^\S+@\S+\.\S+$/.test(info.email.trim()) ? '' : 'Enter a valid email address.',
    contact: /^\+?[0-9][0-9\s-]{6,17}$/.test(info.contact.trim()) ? '' : 'Enter a valid phone number.',
    dob: info.dob && new Date(info.dob) <= new Date() ? '' : 'Select a valid date of birth.',
    country: info.country.trim() ? '' : 'Country is required.',
  };
  const valid = Object.values(errors).every((message) => !message);
  const unchanged = bio.trim() === initialBio.trim() && JSON.stringify(info) === JSON.stringify(initialInfo);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-bio-title"
        onSubmit={(event) => {
          event.preventDefault();
          if (!valid) return;

          onSave(bio.trim(), {
            ...info,
            email: info.email.trim(),
            contact: info.contact.trim(),
            country: info.country.trim(),
            nativeLanguage: info.nativeLanguage.trim(),
          });
        }}
        className="flex max-h-[92vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_rgba(0,26,67,0.35)]"
      >
        <div className="overflow-y-auto p-6">
          <h2 id="edit-bio-title" className="brand-page-title text-lg font-black tracking-[-0.03em]">
            Edit Bio &amp; Personal Details
          </h2>
          <p className="brand-page-subtitle mt-1 text-xs">Update how other travelers see you.</p>

          <div className="mt-5">
            <Field label="Bio">
              <textarea
                ref={textareaRef}
                value={bio}
                onChange={(event) => setBio(event.target.value.slice(0, MAX_LENGTH))}
                rows={4}
                placeholder="Write something about yourself..."
                className={`${fieldClass} resize-none`}
              />
            </Field>
            <div className="mt-1 text-right text-xs text-[#6d7280]">
              {bio.length}/{MAX_LENGTH}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="DOB" error={errors.dob}>
              <input type="date" value={info.dob} onChange={(event) => setField('dob', event.target.value)} className={fieldClass} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={info.email} onChange={(event) => setField('email', event.target.value)} className={fieldClass} />
            </Field>
            <Field label="Contact" error={errors.contact}>
              <input type="tel" value={info.contact} onChange={(event) => setField('contact', event.target.value)} className={fieldClass} />
            </Field>
            <Field label="Gender">
              <select value={info.gender} onChange={(event) => setField('gender', event.target.value)} className={fieldClass}>
                {genderOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Country" error={errors.country}>
              <input value={info.country} onChange={(event) => setField('country', event.target.value)} className={fieldClass} />
            </Field>
            <Field label="Native Language">
              <input value={info.nativeLanguage} onChange={(event) => setField('nativeLanguage', event.target.value)} className={fieldClass} />
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#eef2f9] bg-[#f8fbff] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#4f586e] transition hover:bg-[#eef3ff] hover:text-[#001a43]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={unchanged || !valid}
            className="btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
