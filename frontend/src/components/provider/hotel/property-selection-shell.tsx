'use client';

import { useState } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';

export type PropertyOption = {
  id: string;
  icon: string;
  title: string;
  description: string;
  href?: string;
};

type PropertySelectionShellProps = {
  title: string;
  subtitle: string;
  options: PropertyOption[];
  ariaLabel: string;
  backHref: string;
  nextHref?: string;
};

export default function PropertySelectionShell({
  title,
  subtitle,
  options,
  ariaLabel,
  backHref,
  nextHref = '#',
}: PropertySelectionShellProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedOption = options.find((option) => option.id === selected);
  const continueHref = selectedOption?.href ?? nextHref;

  return (
    <HostSetupLayout backHref={backHref} nextHref={continueHref} nextDisabled={!selected}>
      <div className="mb-5 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e6d9a8] bg-[#fbf6e4] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b08d1f]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#b08d1f]" />
          Property Setup
        </div>
      </div>

      <div className="mx-auto max-w-[640px] text-center">
        <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">{title}</h1>
        <p className="brand-page-subtitle mt-4 text-sm md:text-base">{subtitle}</p>
      </div>

      <div role="radiogroup" aria-label={ariaLabel} className="mt-10 grid gap-4 md:grid-cols-3">
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(option.id)}
              className={[
                'relative flex flex-col items-center rounded-[1rem] border px-6 py-8 text-center transition-all',
                isSelected
                  ? 'border-[#001a43] bg-[#f0f4ff] shadow-[0_8px_24px_rgba(0,26,67,0.08)]'
                  : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
              ].join(' ')}
            >
              <span
                className={[
                  'absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border',
                  isSelected ? 'border-[#b08d1f] bg-[#b08d1f]' : 'border-[#c5cde0] bg-white',
                ].join(' ')}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>

              <div
                className={[
                  'flex h-12 w-12 items-center justify-center rounded-xl text-2xl',
                  isSelected ? 'bg-[#001a43]' : 'bg-[#f5f7fc]',
                ].join(' ')}
              >
                {option.icon}
              </div>
              <div className="mt-5 text-lg font-bold text-[#001a43]">{option.title}</div>
              <div className="mt-2 text-sm text-[#4e5568]">{option.description}</div>
            </button>
          );
        })}
      </div>
    </HostSetupLayout>
  );
}
