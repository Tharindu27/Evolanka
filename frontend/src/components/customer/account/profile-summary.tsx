import type { AccountProfile } from '@/data/customer-account-data';

type ProfileSummaryProps = {
  profile: AccountProfile;
};

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  return (
    <section className="mt-8 rounded-[22px] border border-[#dfe4f2] bg-white/80 p-5 shadow-[0_18px_45px_rgba(0,26,67,0.08)] backdrop-blur-sm">
      <div className="flex items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#eef3ff] shadow-inner ring-4 ring-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f9d2a1,#d99162_45%,#a85a3d_75%)] text-[2rem] text-[#2b1d16]">
            {profile.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#f3f7ff] text-[0.6rem] text-[#001a43]">
            ✓
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-[2.1rem] font-black tracking-[-0.06em] text-[#001a43]">{profile.name}</h2>
            {profile.isVerified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eafaf1] px-2.5 py-1 text-[0.7rem] font-bold text-[#15803d] ring-1 ring-[#86efac]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e]" />
                Verified Account
              </span>
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-[0.95rem] text-[#434654]">
            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-6.5-4.5-9-8.5A5.8 5.8 0 0 1 12 5.3a5.8 5.8 0 0 1 9 7.2c-2.5 4-9 8.5-9 8.5Z" />
                <circle cx="12" cy="10" r="2.8" />
              </svg>
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" />
              </svg>
              {profile.email}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
