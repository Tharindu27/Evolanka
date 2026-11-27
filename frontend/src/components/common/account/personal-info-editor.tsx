"use client";

import { useState, type FormEvent } from 'react';
import { getErrorMessage } from '@/lib/api';

export type EditorField = {
  key: string;
  label: string;
  value: string;
  // Locked fields (the email) are shown but never sent to the server.
  locked?: boolean;
  required?: boolean;
  options?: string[];
  tag?: string;
  emptyText?: string;
  maxLength?: number;
};

type PersonalInfoEditorProps = {
  variant: 'customer' | 'provider';
  subtitle: string;
  fields: EditorField[];
  onSave: (changes: Record<string, string>) => Promise<void>;
};

const styles = {
  customer: {
    section: 'mt-8 rounded-[22px] border border-[#dfe4f2] bg-white/80 p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)]',
    title: 'text-[1.06rem] font-black text-[#001a43]',
    subtitle: 'mt-1 text-sm text-[#6d7280]',
    primary: 'btn-primary rounded-full px-6 py-2.5 text-sm font-bold shadow-[0_12px_26px_rgba(0,61,155,0.2)]',
    label: 'text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#6d7280]',
    value: 'text-[1.03rem] font-bold text-[#001a43]',
    divider: 'divide-[#e6ebf4]',
    tag: 'border-[#dfe7f7] bg-[#f3f7ff] text-[#003d9b]',
  },
  provider: {
    section: 'mt-8 rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-6 shadow-[0_18px_50px_rgba(0,26,67,0.05)]',
    title: 'text-[2rem] font-black tracking-[-0.06em] text-[#001a43]',
    subtitle: 'mt-1 text-[0.96rem] text-[#4f5d76]',
    primary: 'rounded-full bg-[#001a43] px-6 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,26,67,0.18)]',
    label: 'text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#67748d]',
    value: 'text-base font-medium text-[#001a43]',
    divider: 'divide-[#edf1f5]',
    tag: 'border-[#d8e2ff] bg-[#edf4ff] text-[#1d4f9f]',
  },
};

const inputClass =
  'w-full rounded-xl border border-[#dfe7f5] bg-[#f3f6fc] px-4 py-2.5 text-sm text-[#001a43] outline-none transition focus:border-[#0d4abe]/40 focus:bg-white focus:ring-4 focus:ring-[#0d4abe]/10';

export default function PersonalInfoEditor({ variant, subtitle, fields, onSave }: PersonalInfoEditorProps) {
  const s = styles[variant];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const startEditing = () => {
    setDraft(Object.fromEntries(fields.map((field) => [field.key, field.value])));
    setError('');
    setEditing(true);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const changes: Record<string, string> = {};
    for (const field of fields) {
      if (field.locked) continue;
      const value = (draft[field.key] ?? '').trim();
      // Social sign-ups start with some required details blank; those may stay blank until filled.
      if (field.required && !value && field.value.trim()) return setError(`${field.label} is required.`);
      if (value !== field.value.trim()) changes[field.key] = value;
    }

    if (Object.keys(changes).length === 0) {
      setEditing(false);
      return;
    }

    setSaving(true);
    setError('');
    try {
      await onSave(changes);
      setEditing(false);
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className={s.section}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className={s.title}>Personal Information</h3>
          <p className={s.subtitle}>{subtitle}</p>
        </div>

        {editing ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={saving}
              className="rounded-full border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
            >
              Cancel
            </button>
            <button type="submit" disabled={saving} className={`${s.primary} disabled:cursor-not-allowed disabled:opacity-60`}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        ) : (
          <button type="button" onClick={startEditing} className={s.primary}>
            Edit
          </button>
        )}
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-xl border border-[#f3c6c8] bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#c4161c]">
          {error}
        </p>
      ) : null}

      <div className={`mt-8 divide-y ${s.divider}`}>
        {fields.map((field) => {
          const editable = editing && !field.locked;
          return (
            <div key={field.key} className="grid items-center gap-2 py-4 md:grid-cols-[220px_1fr] md:gap-4">
              <label htmlFor={`field-${field.key}`} className={s.label}>
                {field.label}
              </label>

              <div className="flex items-center gap-2">
                {editable && field.options ? (
                  <select
                    id={`field-${field.key}`}
                    value={draft[field.key] ?? ''}
                    onChange={(event) => setDraft((current) => ({ ...current, [field.key]: event.target.value }))}
                    className={inputClass}
                  >
                    {field.value === '' ? <option value="">Select…</option> : null}
                    {(field.options.includes(field.value) || field.value === '' ? field.options : [field.value, ...field.options]).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : editable ? (
                  <input
                    id={`field-${field.key}`}
                    value={draft[field.key] ?? ''}
                    maxLength={field.maxLength}
                    onChange={(event) => setDraft((current) => ({ ...current, [field.key]: event.target.value }))}
                    placeholder={field.emptyText}
                    className={inputClass}
                  />
                ) : (
                  <span id={`field-${field.key}`} className={s.value}>
                    {field.value || field.emptyText || '—'}
                  </span>
                )}

                {field.locked && editing ? (
                  <span className="whitespace-nowrap text-xs font-medium text-[#6d7280]">Cannot be changed</span>
                ) : null}
                {field.tag && !editing ? (
                  <span className={`ml-2 inline-flex items-center rounded-md border px-2.5 py-1 text-[0.7rem] font-semibold ${s.tag}`}>
                    {field.tag}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
