'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationItems as defaultNavigationItems, type NavigationItem } from '@/data/provider-account-data';

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
    case 'services':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M7 6h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
          <path d="M9 10h6M9 14h6" />
        </svg>
      );
    case 'listings':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    case 'post':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 19V6.5A1.5 1.5 0 0 1 6.5 5h11A1.5 1.5 0 0 1 19 6.5V19" />
          <path d="M8 9h8M8 13h8M8 17h5" />
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
    <aside className="sticky top-0 h-screen w-full max-w-[278px] shrink-0 overflow-hidden border-r border-[#dfe5f0] bg-[#f7f9fc] px-5 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001a43] text-white shadow-[0_10px_25px_rgba(0,26,67,0.2)]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
            <circle cx="12" cy="12" r="7.2" />
            <path d="M12 3.8a8.2 8.2 0 0 1 0 16.4" />
            <path d="M4.4 12h15.2" />
          </svg>
        </div>
        <div>
          <div className="text-[1.05rem] font-black uppercase tracking-[-0.05em] text-[#001a43]">EVOLANKA</div>
          <div className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#6d7280]">Provider Portal</div>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={[
                'flex items-center gap-3 rounded-xl px-3 py-3 text-[0.98rem] font-medium transition-all',
                isActive ? 'bg-[#001a43] text-white shadow-[0_12px_24px_rgba(0,26,67,0.18)]' : 'text-[#273447] hover:bg-[#eef3ff] hover:text-[#001a43]',
              ].join(' ')}
            >
              <span className={isActive ? 'text-white' : 'text-[#475467]'}>
                <Icon type={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 border-t border-[#e1e6f1] pt-5">
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-[0.98rem] font-medium text-[#d24d50] transition-colors hover:bg-[#fff1f1]"
        >
          <span className="text-[#d24d50]">
            <Icon type="signout" />
          </span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
