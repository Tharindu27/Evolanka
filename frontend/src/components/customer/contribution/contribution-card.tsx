'use client';

import { useEffect, useRef, useState } from 'react';

import type { Contribution } from '@/data/customer-contribution-data';

type ContributionCardProps = {
  item: Contribution;
  onWithdraw: (id: string) => void;
  onDelete: (id: string) => void;
};

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-3.5 w-3.5 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const outlineButton =
  'rounded-lg border border-[#dfe7f5] bg-white px-4 py-2 text-xs font-bold text-[#001a43] transition hover:bg-[#f4f8ff]';
const softButton = 'rounded-lg bg-[#eef3ff] px-4 py-2 text-xs font-bold text-[#0d4abe] transition hover:bg-[#e1eaff]';

function formatCount(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(value);
}

function StatusBadge({ item }: { item: Contribution }) {
  if (item.status === 'verified') {
    return (
      <span className="flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[0.68rem] font-bold text-[#001a43] shadow-sm">
        <svg {...iconProps} className="h-3.5 w-3.5 stroke-[#0f9d58]">
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
        </svg>
        {item.statusLabel}
      </span>
    );
  }

  if (item.status === 'pending') {
    return (
      <span className="flex items-center gap-1.5 rounded-md bg-[#ffffff] px-2.5 py-1 text-[0.68rem] font-bold text-[#8a5a00] shadow-sm">
        <svg {...iconProps} className="h-3.5 w-3.5 stroke-[#8a5a00]">
          <path d="M7 3h10M7 21h10M8 3v4l4 5-4 5v4M16 3v4l-4 5 4 5v4" />
        </svg>
        {item.statusLabel}
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[0.68rem] font-bold text-[#4f586e] shadow-sm">
      <svg {...iconProps} className="h-3.5 w-3.5 stroke-current">
        <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
      </svg>
      {item.statusLabel}
    </span>
  );
}

export default function ContributionCard({ item, onWithdraw, onDelete }: ContributionCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen && !confirmOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (menuOpen && !menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setConfirmOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, confirmOpen]);

  const underInspection = item.status === 'pending' && item.noteTone === 'amber';

  return (
    <article
      className={[
        'flex flex-col overflow-hidden rounded-[1.25rem] border bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]',
        underInspection ? 'border-[#f3c66b]' : 'border-[#e3eaf6]',
      ].join(' ')}
    >
      <div className="relative h-[130px] w-full overflow-hidden bg-gradient-to-br from-[#dfe9ff] to-[#f3f7ff]">
        {item.image ? (
          <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#9fb3d9]">
            <svg viewBox="0 0 24 24" className="h-9 w-9 stroke-current" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="m21 16-5-5-8 8" />
            </svg>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <StatusBadge item={item} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[0.72rem] font-medium leading-snug text-[#6d7280]">{item.submittedLabel}</span>
          <span className="shrink-0 rounded-md bg-[#eef3ff] px-2 py-1 text-center text-[0.68rem] font-semibold leading-tight text-[#0d4abe]">
            {item.category}
          </span>
        </div>

        <h3 className="mt-2 text-[1.12rem] font-black leading-snug tracking-[-0.03em] text-[#001a43]">{item.title}</h3>

        <p className="mt-2 flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#3d4455]">
          <svg {...iconProps}>
            <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {item.province} &middot; {item.district}
        </p>

        {item.status === 'verified' ? (
          <div className="mt-3 flex items-center gap-5 border-t border-[#eef2f9] pt-3 text-[0.72rem] font-medium text-[#3d4455]">
            <span className="flex items-center gap-1.5">
              <svg {...iconProps}>
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {formatCount(item.views ?? 0)} views
            </span>
            <span className="flex items-center gap-1.5">
              <svg {...iconProps}>
                <path d="M6 4h12v17l-6-4-6 4V4Z" />
              </svg>
              {formatCount(item.bookmarks ?? 0)} bookmarks
            </span>
          </div>
        ) : null}

        {item.note ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#f3c66b] bg-[#ffffff] px-3 py-2.5 text-[0.72rem] font-medium leading-snug text-[#8a5a00]">
              <svg {...iconProps} className="mt-0.5 h-3.5 w-3.5 shrink-0 stroke-current">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16.5v.01" />
              </svg>
              {item.note}
            </p>
        ) : null}

        <div className="mt-auto flex items-center gap-2 pt-4">
          {item.status === 'verified' ? (
            <>
              <button type="button" className={`rounded-lg border border-[#001a43] bg-[#001a43] px-4 py-2 text-xs font-bold text-[#ffffff] transition hover:bg-[#234576]`}>
                View Live Post
              </button>
              <button type="button" className={outlineButton}>
                Edit Details
              </button>
            </>
          ) : null}

          {item.status === 'pending' ? (
            <>
              <button type="button" className={`rounded-lg border border-[#001a43] bg-[#001a43] px-4 py-2 text-xs font-bold text-[#ffffff] transition hover:bg-[#234576]`}>
                View Submission
              </button>
            </>
          ) : null}

          {item.status === 'draft' ? (
            <>
              <button type="button" className={`rounded-lg border border-[#001a43] bg-[#001a43] px-4 py-2 text-xs font-bold text-[#ffffff] transition hover:bg-[#234576]`}>
                Continue Editing
              </button>
              <button type="button" className={outlineButton}>
                Preview
              </button>
            </>
          ) : null}

          {item.status !== 'pending' ? (
            <div ref={menuRef} className="relative ml-auto">
              <button
                type="button"
                aria-label="More options"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className={['rounded-full p-2 text-[#4f586e] transition hover:bg-[#eef3ff]', menuOpen ? 'bg-[#eef3ff]' : ''].join(' ')}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <circle cx="12" cy="5" r="1.6" />
                  <circle cx="12" cy="12" r="1.6" />
                  <circle cx="12" cy="19" r="1.6" />
                </svg>
              </button>

              {menuOpen ? (
                <div
                  role="menu"
                  className="absolute bottom-full right-0 z-20 mb-1 w-48 overflow-hidden rounded-xl border border-[#dfe4f2] bg-white py-1 shadow-[0_18px_40px_rgba(0,26,67,0.16)]"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setConfirmOpen(true);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#c4161c] transition hover:bg-[#fff1f1]"
                  >
                    <svg {...iconProps} className="h-4 w-4 stroke-current">
                      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                    </svg>
                    Delete Contribution
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmOpen(false);
          }}
        >
          <div role="alertdialog" aria-modal="true" className="w-full max-w-sm rounded-[22px] bg-white p-6 shadow-[0_30px_80px_rgba(0,26,67,0.35)]">
            <h3 className="text-lg font-black tracking-[-0.03em] text-[#001a43]">Delete this contribution?</h3>
            <p className="mt-2 text-sm text-[#566277]">
              {item.status === 'verified'
                ? 'This live location will be removed from EVOLANKA. This action cannot be undone.'
                : 'This draft will be permanently removed. This action cannot be undone.'}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="rounded-xl bg-[#c4161c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a31217]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}
