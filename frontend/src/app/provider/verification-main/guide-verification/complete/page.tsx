'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  GUIDE_REGISTRATION_STORAGE_KEY,
  type GuideRegistrationSummary,
} from '@/lib/guide-registration';

const documentLabels: Record<string, { label: string; icon: string }> = {
  photo: { label: 'Profile Photo', icon: '🖼' },
  id: { label: 'NIC / Passport', icon: '🪪' },
  license: { label: 'License', icon: '📄' },
};

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function GuideRegistrationCompletePage() {
  const [summary, setSummary] = useState<GuideRegistrationSummary | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(GUIDE_REGISTRATION_STORAGE_KEY);
    if (stored) setSummary(JSON.parse(stored) as GuideRegistrationSummary);
  }, []);

  const documents = summary?.documents ?? [];

  const downloadSummary = () => {
    const lines = [
      'EVOLANKA - Tour Guide Registration Summary',
      `Application Ref: ${summary?.reference ?? 'N/A'}`,
      `Documents uploaded: ${documents.length}`,
      ...documents.map((doc) => `- ${documentLabels[doc.id]?.label ?? doc.id}: ${doc.name} (${formatSize(doc.size)})`),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registration-summary.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main
      className="brand-backdrop relative flex min-h-screen flex-col bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <header className="relative z-10 border-b border-[#e3e8f4] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="text-[1.05rem] font-black uppercase tracking-[-0.05em] text-[#001a43]">EVOLANKA</div>
            <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b08d1f]">
              Host Portal
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 md:px-8">
        <div className="w-full max-w-[600px] max-h-[700px] rounded-[1.6rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e6d9a8] bg-[#fbf6e4]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b08d1f] text-lg font-bold text-white">
              ✓
            </span>
          </div>

          <h1 className="brand-page-title mt-5 text-center text-3xl font-black tracking-[-0.05em]">
            Registration Complete!
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-[#4e5568]">
            Your tour guide application{documents.length > 0 ? ' and all documents have' : ' has'} been received.
            We&apos;ll review and get back to you within{' '}
            <strong className="font-bold text-[#001a43]">2–3 business days</strong>.
          </p>

          {documents.length > 0 && (
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em]">
                <span className="text-[#6c7387]">Uploaded Documentation ({documents.length})</span>
                <span className="flex items-center gap-1.5 normal-case tracking-normal text-[#b08d1f]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b08d1f]" />
                  Integrity Verified
                </span>
              </div>

              <ul className="space-y-3">
                {documents.map((doc) => {
                  const meta = documentLabels[doc.id];
                  return (
                    <li
                      key={doc.id}
                      className="flex items-center gap-3 rounded-xl border border-[#dce3f1] bg-[#f9f9ff] p-3"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f0f4ff] text-lg">
                        {meta?.icon ?? '📄'}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[#001a43]">{doc.name}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6c7387]">
                          {meta?.label ?? doc.id} · {formatSize(doc.size)}
                        </p>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#e6d9a8] bg-[#fbf6e4] px-3 py-1 text-xs font-semibold text-[#b08d1f]">
                        ✓ Uploaded
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <Link
            href="/provider/profile/listings"
            className="btn-primary mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition hover:-translate-y-0.5"
          >
            Return to Dashboard
            <span>→</span>
          </Link>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-[#6c7387]">
            <span>🔒</span>
            Your documents are encrypted and safely stored in compliance with SLTDA guidelines.
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-[#e3e8f4] pt-4 text-xs">
            <span className="font-semibold uppercase tracking-[0.1em] text-[#6c7387]">
              Application Ref:{' '}
              <span className="font-mono text-[#001a43]">{summary?.reference ?? '—'}</span>
            </span>
            <button
              type="button"
              onClick={downloadSummary}
              className="font-semibold text-[#4e5568] transition-colors hover:text-[#001a43]"
            >
              Download Summary
            </button>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-xs text-[#6c7387] md:flex-row md:items-center md:justify-between">
          <div>EVOLANKA OS · Tourism &amp; Hospitality Provider Infrastructure</div>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>SLTDA Certification Terms</span>
            <span>Security Protocol</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
