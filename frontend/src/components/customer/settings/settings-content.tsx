'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';

import {  minPasswordLength } from '@/data/customer-settings-data';

const cardClass = 'rounded-[22px] border border-[#dfe4f2] bg-white shadow-[0_18px_45px_rgba(0,26,67,0.06)]';
const inputClass =
  'w-full rounded-xl border border-[#dfe7f5] bg-[#f3f6fc] px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#9aa3b5] focus:border-[#0d4abe]/40 focus:bg-white focus:ring-4 focus:ring-[#0d4abe]/10';
const labelClass = 'mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.04em] text-[#4e5568]';
const sectionLabel = 'text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#6d7280]';

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-5 w-5 stroke-[#001a43]',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={['relative h-6 w-11 shrink-0 rounded-full transition-colors', checked ? 'bg-[#0d4abe]' : 'bg-[#d9e2f5]'].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
          checked ? 'left-[22px]' : 'left-0.5',
        ].join(' ')}
      />
    </button>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  withToggle,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete: string;
  withToggle?: boolean;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <span className="relative block">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={withToggle ? `${inputClass} pr-11` : inputClass}
        />
        {withToggle ? (
          <button
            type="button"
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6d7280] transition hover:text-[#001a43]"
          >
            <svg {...iconProps} className="h-[18px] w-[18px] stroke-current">
              {visible ? (
                <>
                  <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              ) : (
                <>
                  <path d="M3 3l18 18M10.6 6.1A9.8 9.8 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 7.6A16.6 16.6 0 0 0 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4-.9" />
                  <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                </>
              )}
            </svg>
          </button>
        ) : null}
      </span>
      {error ? <span className="mt-1 block text-xs font-medium text-[#c4161c]">{error}</span> : null}
    </label>
  );
}

export default function SettingsContent() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<'current' | 'next' | 'confirm', string>>>({});
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    if (!deleteOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDeleteOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [deleteOpen]);

  const resetPasswordForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  const updatePassword = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};

    if (!currentPassword) next.current = 'Enter your current password.';
    if (newPassword.length < minPasswordLength) next.next = `Use at least ${minPasswordLength} characters.`;
    else if (newPassword === currentPassword) next.next = 'New password must differ from the current one.';
    if (confirmPassword !== newPassword) next.confirm = 'Passwords do not match.';

    setErrors(next);
    if (Object.keys(next).length > 0) {
      setPasswordUpdated(false);
      return;
    }

    resetPasswordForm();
    setPasswordUpdated(true);
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setDeleteConfirmText('');
  };

  return (
    <div className="mt-8 space-y-8">
      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className={sectionLabel}>Security &amp; Credentials</h2>
        </div>

        <form onSubmit={updatePassword} noValidate className={`${cardClass} mt-3 p-6`}>
          <div className="flex items-start justify-between gap-4 border-b border-[#eef2f9] pb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff]">
                <svg {...iconProps}>
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </div>
              <div>
                <h3 className="text-[1.15rem] font-black tracking-[-0.02em] text-[#001a43]">Security &amp; Password</h3>
                <p className="mt-0.5 text-sm text-[#6d7280]">Manage your credentials, password updates, and account authentication.</p>
              </div>
            </div>
          </div>

          {passwordUpdated ? (
            <p role="status" className="mt-5 rounded-xl border border-[#bfe5cf] bg-[#effaf3] px-4 py-3 text-sm font-medium text-[#0b6b3a]">
              Password updated successfully.
            </p>
          ) : null}

          <div className="mt-5 space-y-4">
            <PasswordField
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
              placeholder="Enter current password"
              withToggle
              error={errors.current}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                autoComplete="new-password"
                placeholder={`Min. ${minPasswordLength} characters`}
                error={errors.next}
              />
              <PasswordField
                label="Confirm New Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                autoComplete="new-password"
                placeholder="Repeat new password"
                error={errors.confirm}
              />
            </div>

            <p className="flex items-center gap-2 text-xs text-[#6d7280]">
              <svg {...iconProps} className="h-3.5 w-3.5 stroke-[#001a43]">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16.5v.01" />
              </svg>
              Include numbers, capital letters, and symbols for high security.
            </p>
          </div>

          <div className="mt-5 flex justify-end gap-3 border-t border-[#eef2f9] pt-5">
            <button
              type="button"
              onClick={() => {
                resetPasswordForm();
                setPasswordUpdated(false);
              }}
              className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition hover:text-white"
            >
              <svg {...iconProps} className="h-4 w-4 stroke-white">
                <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />
              </svg>
              Update Password
            </button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#c4161c]">Danger Zone</h2>

        <div className={`${cardClass} mt-3 flex flex-wrap items-center justify-between gap-5 p-6`}>
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fde9ea]">
              <svg {...iconProps} className="h-5 w-5 stroke-[#c4161c]">
                <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-black text-[#001a43]">Delete account</h3>
              <p className="mt-0.5 max-w-[420px] text-sm text-[#566277]">
                Permanently remove your account and all associated data. This cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f3b4b6] bg-white px-5 py-2.5 text-sm font-semibold text-[#c4161c] transition hover:bg-[#fff1f1]"
          >
            <svg {...iconProps} className="h-4 w-4 stroke-[#c4161c]">
              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
            </svg>
            Delete Account
          </button>
        </div>
      </section>

      {deleteOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDelete();
          }}
        >
          <div role="alertdialog" aria-modal="true" className="w-full max-w-sm rounded-[22px] bg-white p-6 shadow-[0_30px_80px_rgba(0,26,67,0.35)]">
            <h3 className="text-lg font-black tracking-[-0.03em] text-[#001a43]">Delete your account?</h3>
            <p className="mt-2 text-sm text-[#566277]">
              All bookings, posts, and contributions will be permanently removed. Type <strong className="text-[#001a43]">DELETE</strong> to confirm.
            </p>
            <input
              value={deleteConfirmText}
              onChange={(event) => setDeleteConfirmText(event.target.value)}
              placeholder="DELETE"
              className={`${inputClass} mt-4`}
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDelete}
                className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText !== 'DELETE'}
                onClick={() => router.push('/')}
                className="rounded-xl bg-[#c4161c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a31217] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
