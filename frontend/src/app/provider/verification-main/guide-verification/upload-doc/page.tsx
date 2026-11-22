'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type DragEvent } from 'react';

import {
  GUIDE_REGISTRATION_STORAGE_KEY,
  type GuideRegistrationSummary,
} from '@/lib/guide-registration';

type DocumentConfig = {
  id: string;
  title: string;
  badge: 'Recommended' | 'Required';
  hint: string;
  formats: string;
  accept: string[];
  maxMb: number;
  icon: string;
};

const documents: DocumentConfig[] = [
  {
    id: 'photo',
    title: 'Profile Photo',
    badge: 'Recommended',
    hint: 'A clear, recent photo of your face',
    formats: 'JPG, PNG or WEBP · Max 5 MB',
    accept: ['image/jpeg', 'image/png', 'image/webp'],
    maxMb: 5,
    icon: '🖼',
  },
  {
    id: 'id',
    title: 'NIC / Passport Scan',
    badge: 'Required',
    hint: 'Clear scan or photo of your NIC (both sides) or passport',
    formats: 'JPG, PNG, WEBP or PDF · Max 10 MB',
    accept: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxMb: 10,
    icon: '🪪',
  },
  {
    id: 'license',
    title: 'Tourist Guide Certificate / License',
    badge: 'Required',
    hint: 'Official certificate or license issued by SLTDA or equivalent authority',
    formats: 'JPG, PNG, WEBP or PDF · Max 10 MB',
    accept: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxMb: 10,
    icon: '🛡',
  },
];

const progress = [
  { label: 'Details Saved', state: 'done' },
  { label: 'Upload Docs', state: 'active' },
  { label: 'Complete', state: 'todo' },
] as const;

function UploadCard({
  doc,
  onFileChange,
}: {
  doc: DocumentConfig;
  onFileChange: (id: string, file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selected: File | undefined) => {
    if (!selected) return;

    if (!doc.accept.includes(selected.type)) {
      setError('Unsupported file type.');
      return;
    }
    if (selected.size > doc.maxMb * 1024 * 1024) {
      setError(`File is larger than ${doc.maxMb} MB.`);
      return;
    }

    setError('');
    setFile(selected);
    onFileChange(doc.id, selected);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
    onFileChange(doc.id, null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-5 shadow-[0_18px_50px_rgba(0,26,67,0.06)] md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#e3e8f4] pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">
            {doc.icon}
          </span>
          <h2 className="text-base font-bold text-[#001a43]">{doc.title}</h2>
        </div>
        <span
          className={[
            'rounded-full border px-3 py-1 text-[11px] font-semibold',
            doc.badge === 'Required'
              ? 'border-[#f0c4c4] bg-[#fdf1f1] text-[#b42318]'
              : 'border-[#dce3f1] bg-[#f5f7fc] text-[#4e5568]',
          ].join(' ')}
        >
          {doc.badge}
        </span>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={[
          'rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors',
          isDragging ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#c5cde0] bg-[#f9f9ff]',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept={doc.accept.join(',')}
          onChange={(event) => handleFile(event.target.files?.[0])}
          className="sr-only"
          aria-label={`Upload ${doc.title}`}
        />

        {file ? (
          <div className="mx-auto flex max-w-sm items-center justify-between gap-3 rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-left">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#001a43]">{file.name}</p>
              <p className="text-xs text-[#6c7387]">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button
              type="button"
              onClick={removeFile}
              aria-label={`Remove ${file.name}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm text-[#4e5568] transition-colors hover:bg-[#001a43]/10"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
              {doc.icon}
            </span>
            <p className="text-sm text-[#001a43]">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-bold text-[#b08d1f] hover:underline"
              >
                Click to upload
              </button>{' '}
              or drag &amp; drop
            </p>
            <p className="mt-1 text-xs text-[#4e5568]">{doc.hint}</p>
            <p className="mt-3 text-[11px] text-[#6c7387]">{doc.formats}</p>
          </>
        )}
      </div>

      {error && <p className="mt-3 text-xs font-medium text-[#b42318]">{error}</p>}
    </section>
  );
}

export default function GuideUploadDocumentsPage() {
  const router = useRouter();
  const [files, setFiles] = useState<Record<string, File | null>>({});

  const handleFileChange = (id: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [id]: file }));
  };

  const handleSubmit = () => {
    const summary: GuideRegistrationSummary = {
      reference: `EVO-TG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      documents: documents.flatMap((doc) => {
        const file = files[doc.id];
        return file ? [{ id: doc.id, name: file.name, size: file.size }] : [];
      }),
    };

    sessionStorage.setItem(GUIDE_REGISTRATION_STORAGE_KEY, JSON.stringify(summary));
    router.push('/provider/verification-main/guide-verification/complete');
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
              Host Portal
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[720px] px-4 pb-12 pt-8 md:px-8">
        <div className="mb-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d9a8] bg-[#fbf6e4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d1f]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#b08d1f]" />
            Document Upload
          </div>
        </div>

        <div className="text-center">
          <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">
            Upload Your Documents
          </h1>
          <p className="brand-page-subtitle mx-auto mt-3 max-w-md text-sm md:text-base">
            Your registration details have been saved. Upload your documents to complete the application.
          </p>
        </div>

        <ol className="mx-auto mt-8 flex max-w-md items-start justify-between">
          {progress.map((item, index) => (
            <li key={item.label} className="relative flex flex-1 flex-col items-center">
              {index > 0 && (
                <span
                  className={[
                    'absolute right-1/2 top-4 h-0.5 w-full',
                    item.state === 'todo' ? 'bg-[#dce3f1]' : 'bg-[#001a43]',
                  ].join(' ')}
                />
              )}
              <span
                className={[
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold',
                  item.state === 'done' && 'border-[#001a43] bg-[#001a43] text-white',
                  item.state === 'active' && 'border-[#b08d1f] bg-[#b08d1f] text-white',
                  item.state === 'todo' && 'border-[#dce3f1] bg-white text-[#8a93a8]',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                ✓
              </span>
              <span
                className={[
                  'mt-2 text-xs font-medium',
                  item.state === 'todo' ? 'text-[#8a93a8]' : 'text-[#001a43]',
                ].join(' ')}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-5">
          {documents.map((doc) => (
            <UploadCard key={doc.id} doc={doc} onFileChange={handleFileChange} />
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold shadow-lg shadow-[#001a43]/15 transition hover:-translate-y-0.5"
        >
          <span>✓</span>
          Submit Registration
        </button>

        <p className="mt-4 text-center text-sm text-[#4e5568]">
          You can submit without documents and upload them later from your dashboard.
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-[#6c7387]">
          <span>🔒</span>
          Your documents are encrypted and only used for identity verification.
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/provider/verification-main/guide-verification/agreement"
            className="text-sm font-semibold text-[#4e5568] transition-colors hover:text-[#001a43]"
          >
            ← Back
          </Link>
        </div>
      </div>

      <footer className="relative z-10 border-t border-[#e3e8f4] bg-white/80">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 text-xs text-[#6c7387] md:flex-row md:items-center md:justify-between">
          <div>EVOLANKA HOST OPERATING SYSTEM © 2025</div>
          <div className="flex flex-wrap gap-4">
            <span>Privacy Policy</span>
            <span>Host Guidelines</span>
            <span>Platform Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
