import type { ReactNode } from 'react';

export const statusStyles: Record<string, string> = {
  Confirmed: 'bg-[#ebf3ff] text-[#0b4fc5]',
  Pending: 'bg-[#fff5dd] text-[#a56a00]',
  'Active / On-Trip': 'bg-[#e0f2fe] text-[#0369a1]',
  Completed: 'bg-[#e6f4ea] text-[#0f9d58]',
  Cancelled: 'bg-[#fdecea] text-[#d93025]',
};

export const paymentStyles: Record<string, string> = {
  Paid: 'bg-[#e6f4ea] text-[#0f9d58]',
  'Pay at Hotel': 'bg-[#fff5dd] text-[#a56a00]',
  'Pay on Arrival': 'bg-[#fff5dd] text-[#a56a00]',
  'Pay on Pickup': 'bg-[#fff5dd] text-[#a56a00]',
  'Partially Paid': 'bg-[#fff5dd] text-[#a56a00]',
  Refunded: 'bg-[#ebf3ff] text-[#0b4fc5]',
};

export const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export function Section({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-[1.5rem] border border-[#dde6f4] bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#6d7280]">{label}</div>
      <div className="mt-1 text-[0.98rem] font-semibold text-[#001a43]">{children}</div>
    </div>
  );
}

export const pluralize = (count: number, singular: string, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
