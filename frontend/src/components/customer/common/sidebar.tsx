'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationItems as defaultNavigationItems, type NavigationItem } from '@/data/customer-account-data';

type SidebarProps = {
  items?: NavigationItem[];
};

function Icon({ type }: { type: string }) {
  const common = 'h-5 w-5 stroke-current';

  switch (type) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
        </svg>
      );
    case 'account':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 19a7 7 0 0 1 14 0" />
          <circle cx="12" cy="8" r="4" />
        </svg>
      );
    case 'bookings':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case 'wishlist':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M12 20.5s-7.5-4.4-9-8.2C1.7 9.4 3.9 5 8.5 5c2 0 3.1 1.1 3.5 2.1.4-1 1.5-2.1 3.5-2.1 4.6 0 6.8 4.4 5.5 7.3-1.5 3.8-9 8.2-9 8.2Z" />
        </svg>
      );
    case 'post':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 19V6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5V19" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    case 'itinerary':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M8 3v3M16 3v3" />
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 11h8M8 15h5" />
        </svg>
      );
    case 'contribution':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 18V8.5A2.5 2.5 0 0 1 9.5 6H18v12" />
          <path d="M7 18h10a2 2 0 0 0 2-2V9.5A2.5 2.5 0 0 0 16.5 7H9.5A2.5 2.5 0 0 0 7 9.5V18Z" />
          <path d="M11 11h6M11 15h6" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="3.25" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .84 1.7 1.7 0 0 0-.2 1.06V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-.2-1.06 1.7 1.7 0 0 0-1-.84 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.84-1 1.7 1.7 0 0 0-1.06-.2H2.6a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.06-.2 1.7 1.7 0 0 0 .84-1A1.7 1.7 0 0 0 4.6 7.09l-.06-.06A2 2 0 1 1 7.37 4.2l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.84 1.7 1.7 0 0 0 .2-1.06V2.6a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 .2 1.06 1.7 1.7 0 0 0 1 .84 1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.3.22.68.32 1.06.2h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.06.2 1.7 1.7 0 0 0-.84 1Z" />
        </svg>
      );
    case 'signout':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Sidebar({ items = defaultNavigationItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[270px] border-r border-[#dfe4f2] bg-[#f9fafc] px-5 py-6">
      <div className="mb-7 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001a43] text-white shadow-[0_10px_28px_rgba(0,26,67,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
            <path d="M12 3a8.5 8.5 0 0 0-8.5 8.5c0 3.5 2.1 6.4 5.1 7.7l.5 2.5 2.3-1.5 2.3 1.5.5-2.5a8.4 8.4 0 0 0 5.1-7.7A8.5 8.5 0 0 0 12 3Z" />
            <circle cx="12" cy="11.5" r="3" />
          </svg>
        </div>
        <div>
          <div className="text-[1.05rem] font-black uppercase tracking-[-0.04em] text-[#001a43]">EVOLANKA</div>
          <div className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#6d7280]">Account Portal</div>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                'flex items-center justify-between rounded-xl px-3 py-3 text-[0.98rem] font-medium transition-all',
                isActive ? 'btn-primary text-white shadow-[0_12px_28px_rgba(0,61,155,0.28)]' : 'text-[#3d4455] hover:bg-[#eef3ff] hover:text-[#001a43]',
              ].join(' ')}
            >
              <span className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-[#4f586e]'}>
                  <Icon type={item.icon} />
                </span>
                {item.label}
              </span>

              {item.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#eef3ff] px-1.5 text-[0.68rem] font-bold text-[#003d9b]">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-[#e1e6f1] pt-5">
        <Link href="#" className="flex items-center gap-3 rounded-xl px-3 py-3 text-[0.98rem] font-medium text-[#d24d50] transition-colors hover:bg-[#fff1f1]">
          <span className="text-[#d24d50]">
            <Icon type="signout" />
          </span>
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
