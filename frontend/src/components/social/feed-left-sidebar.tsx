'use client';

import Link from 'next/link';

import { postItems } from '@/data/customer-post-data';
import type { AuthUser } from '@/lib/api';
import { getInitials } from '@/lib/initials';
import { useAuthUser } from '@/lib/use-auth-user';

export type FeedFilter = 'all' | 'tourist' | 'provider' | 'saved';

export const feedTopicTags = ['HillCountry', 'BeachVibes', 'Wildlife', 'BudgetTravel', 'RoadTrip'] as const;

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 shrink-0 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const filterIcons: Record<FeedFilter, React.ReactNode> = {
  all: <path d="M4 5h16M4 12h16M4 19h16" />,
  tourist: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.2-3.6 3.8-5 7-5s5.8 1.4 7 5" />
    </>
  ),
  provider: (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M5 10v9h14v-9M9 19v-5h6v5" />
    </>
  ),
  saved: <path d="M6 4h12v17l-6-4-6 4V4Z" />,
};

const filters: { id: FeedFilter; label: string; hint?: string }[] = [
  { id: 'all', label: 'All Posts' },
  { id: 'tourist', label: 'Tourist Stories & Reviews' },
  { id: 'provider', label: 'Provider Updates & Offers', hint: 'Hotels / Vehicles / Tours' },
  { id: 'saved', label: 'Saved / Bookmarked' },
];

function MiniAvatar({ user }: { user: AuthUser }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#001a43] text-lg font-bold text-white ring-4 ring-[#eef3ff]">
      {user.profilePicture ? (
        // Remote Cloudinary image; next/image would need the host whitelisted.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.profilePicture} alt="" className="h-full w-full object-cover" />
      ) : (
        getInitials(user.name)
      )}
    </span>
  );
}

function MiniProfileCard({ savedCount }: { savedCount: number }) {
  const tourist = useAuthUser('tourist');
  const provider = useAuthUser('provider');
  const user = tourist.user ?? provider.user;
  const isProvider = user?.role === 'provider';

  if (!(tourist.ready && provider.ready)) {
    return <div className="h-[168px] animate-pulse rounded-[1.5rem] border border-[#dde6f4] bg-white" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <div className="rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <p className="text-sm font-black text-[#001a43]">Join the community</p>
        <p className="mt-1 text-xs leading-5 text-[#6d7280]">Sign in to share stories, save posts and follow providers.</p>
        <Link href="/auth-main" className="btn-primary mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-xs font-bold text-white">
          Sign in / Register
        </Link>
      </div>
    );
  }

  const profileHref = isProvider ? '/provider/profile/post' : '/customer/profile/post';

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[#dde6f4] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="h-14 bg-gradient-to-r from-[#001a43] via-[#002d6b] to-[#001a43]" />
      <div className="px-5 pb-5">
        <div className="-mt-7 flex items-end gap-3">
          <MiniAvatar user={user} />
        </div>
        <Link href={profileHref} className="mt-3 block truncate text-base font-black text-[#001a43] hover:underline">
          {user.name}
        </Link>
        <span
          className={[
            'mt-1 inline-flex rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em]',
            isProvider ? 'bg-[#fbf3d9] text-[#8a6d0f]' : 'bg-[#edf4ff] text-[#0f3d9c]',
          ].join(' ')}
        >
          {isProvider ? 'Provider' : 'Tourist'}
        </span>

        <dl className="mt-4 grid grid-cols-2 divide-x divide-[#e6ecf7] rounded-2xl bg-[#f6f9ff] py-3 text-center">
          <div>
            <dd className="text-lg font-black text-[#001a43]">{postItems.length}</dd>
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#6d7280]">Posts</dt>
          </div>
          <div>
            <dd className="text-lg font-black text-[#001a43]">{savedCount}</dd>
            <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#6d7280]">Saved</dt>
          </div>
        </dl>
      </div>
    </div>
  );
}

type FeedLeftSidebarProps = {
  filter: FeedFilter;
  onFilterChange: (filter: FeedFilter) => void;
  counts: Record<FeedFilter, number>;
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  tagCounts: Record<string, number>;
};

export default function FeedLeftSidebar({ filter, onFilterChange, counts, activeTag, onTagChange, tagCounts }: FeedLeftSidebarProps) {
  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:space-y-5 lg:self-start lg:overflow-y-auto lg:pr-1 [scrollbar-width:none]">
      <MiniProfileCard savedCount={counts.saved} />

      <nav aria-label="Feed filters" className="rounded-[1.5rem] border border-[#dde6f4] bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <h2 className="px-3 pb-2 pt-1 text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#6d7280]">Feed</h2>
        <ul className="space-y-1">
          {filters.map((item) => {
            const active = filter === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onFilterChange(item.id)}
                  aria-pressed={active}
                  className={[
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                    active ? 'bg-[#001a43] text-white shadow-[0_10px_24px_rgba(0,26,67,0.2)]' : 'text-[#33415a] hover:bg-[#f1f5ff]',
                  ].join(' ')}
                >
                  <svg {...iconProps} className={['h-4 w-4 shrink-0 stroke-current', active ? 'text-[#ffd977]' : ''].join(' ')}>
                    {filterIcons[item.id]}
                  </svg>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.82rem] font-bold leading-tight">{item.label}</span>
                    {item.hint ? (
                      <span className={['mt-0.5 block text-[0.68rem]', active ? 'text-white/70' : 'text-[#8a93a6]'].join(' ')}>{item.hint}</span>
                    ) : null}
                  </span>
                  <span
                    className={[
                      'rounded-full px-2 py-0.5 text-[0.68rem] font-bold',
                      active ? 'bg-white/15 text-white' : 'bg-[#eef3ff] text-[#0d4abe]',
                    ].join(' ')}
                  >
                    {counts[item.id]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
        <h2 className="text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#6d7280]">Topics</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {feedTopicTags.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagChange(active ? null : tag)}
                aria-pressed={active}
                className={[
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                  active ? 'bg-[#c9a227] text-[#001a43] shadow-[0_8px_18px_rgba(176,141,31,0.3)]' : 'bg-[#eef3ff] text-[#0d4abe] hover:bg-[#dfe9ff]',
                ].join(' ')}
              >
                #{tag}
                <span className="ml-1.5 opacity-60">{tagCounts[tag] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
