import type { AccountProfile } from '@/data/customer-account-data';
import type { PostProfile } from '@/data/customer-post-data';

type PostProfileHeaderProps = {
  account: AccountProfile;
  profile: PostProfile;
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

export default function PostProfileHeader({ account, profile }: PostProfileHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[22px] border border-[#dfe4f2] bg-white shadow-[0_18px_45px_rgba(0,26,67,0.08)]">
      <div className="relative h-[200px] w-full bg-[#edf3ff]">
        <img src={profile.coverImage} alt="Profile cover" className="h-full w-full object-cover" />
        <button
          type="button"
          className="btn-primary absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#001a43] shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          <svg {...iconProps}>
            <rect x="3" y="6" width="18" height="14" rx="2" />
            <path d="M8 6l1.5-2h5L16 6" />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
          Edit Cover
        </button>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative -mt-12 flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] shadow-inner ring-4 ring-white">
              <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f9d2a1,#d99162_45%,#a85a3d_75%)] text-[2.2rem] text-[#2b1d16]">
                {account.name.charAt(0)}
              </div>
              <button
                type="button"
                aria-label="Change profile photo"
                className="absolute -bottom-0.5 right-0.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#001a43] text-white"
              >
                <svg {...iconProps} className="h-3.5 w-3.5 stroke-current">
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <circle cx="12" cy="13" r="3.2" />
                </svg>
              </button>
            </div>

            <div className="pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[1.7rem] font-black tracking-[-0.05em] text-[#001a43]">{account.name}</h2>
                {account.isVerified ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eafaf1] px-2.5 py-1 text-[0.7rem] font-bold text-[#15803d] ring-1 ring-[#86efac]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e]" />
                    Verified Explorer
                  </span>
                ) : null}
              </div>
              <p className="brand-page-subtitle mt-1 text-xs">
                Traveler Member &middot; Registered on EVOLANKA since {profile.memberSince}
              </p>
              <div className="mt-2 flex items-center gap-5 text-xs text-[#6d7280]">
                <span>
                  <span className="text-sm font-black text-[#001a43]">{profile.followers}</span> Followers
                </span>
                <span>
                  <span className="text-sm font-black text-[#001a43]">{profile.following}</span> Following
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="brand-page-subtitle mt-5 whitespace-pre-line text-sm leading-relaxed">{profile.bio}</p>

        <div className="mt-5 grid grid-cols-2 gap-y-4 rounded-4xl border border-[#001a43] bg-[#ffffff] py-4 sm:grid-cols-3">
          {profile.stats.map((stat, index) => (
            <div key={stat.label} className={['text-center', index > 0 ? 'sm:border-l sm:border-[#d6e0f3]' : ''].join(' ')}>
              <div className={['text-lg font-black tracking-[-0.03em]', stat.highlight ? 'brand-secondary-text' : 'text-[#001a43]'].join(' ')}>
                {stat.value}
              </div>
              <div className="mt-0.5 text-[0.68rem] font-medium text-[#6d7280]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
