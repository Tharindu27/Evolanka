import type { AccountProfile, ProfileDetail } from '@/data/customer-account-data';

type PostPersonalInfoProps = {
  account: AccountProfile;
  details: ProfileDetail[];
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

export default function PostPersonalInfo({ account, details }: PostPersonalInfoProps) {
  const detail = (label: string) => details.find((item) => item.label === label)?.value;

  // Gender and native language are not in the account data yet.
  const items = [
    { label: 'DOB', value: detail('Date of Birth') },
    { label: 'Email', value: account.email },
    { label: 'Contact', value: detail('Mobile Number') },
    { label: 'Gender', value: 'Male' },
    { label: 'Country', value: detail('Country / Nationality') },
    { label: 'Native Language', value: 'Sinhala' },
  ];

  return (
    <section className="mt-6 rounded-[22px] border border-[#dfe4f2] bg-white p-6 shadow-[0_18px_45px_rgba(0,26,67,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">Personal Details</h2>

        <button
          type="button"
          className="btn-primary inline-flex items-center gap-2 rounded-xl border border-[#dfe7f5] bg-white px-4 py-2 text-xs font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
        >
          <svg {...iconProps}>
            <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
          </svg>
          Edit Bio
        </button>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        {items.map((item) =>
          item.value ? (
            <div key={item.label} className="flex gap-2">
              <dt className="w-36 shrink-0 text-[#6d7280]">{item.label}:</dt>
              <dd className="font-semibold text-[#001a43]">{item.value}</dd>
            </div>
          ) : null,
        )}
      </dl>
    </section>
  );
}
