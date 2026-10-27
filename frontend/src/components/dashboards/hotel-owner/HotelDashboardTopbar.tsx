"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HotelDashboardTopbarProps {
  hotelId: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function HotelDashboardTopbar({
  hotelId,
  isDark,
  onToggleTheme,
}: HotelDashboardTopbarProps) {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 flex items-center justify-between px-5 border-b border-outline-variant sticky top-0 z-50 backdrop-blur-md bg-surface/90 shadow-[0_4px_20px_rgba(0,26,67,0.03)]">
      {/* ── Left: Brand Logo ── */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="brand-page-title flex items-center gap-2 text-xl font-black uppercase tracking-tight text-on-surface"
        >
          EVOLANKA
          <span
            className="h-2.5 w-2.5 rounded-full bg-[#c9a227]"
            aria-hidden="true"
          />
        </Link>
        <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-[#c9a227]/15 text-[#b08d1f] dark:text-[#ffd977] border border-[#c9a227]/30">
          HOST PORTAL
        </span>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2.5">
        {/* Live Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-on-surface">Live: Open</span>
        </div>

        {/* Dark / Light toggle */}
        <button
          id="dashboard-theme-toggle"
          onClick={onToggleTheme}
          title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all cursor-pointer text-xs font-semibold"
          aria-pressed={isDark}
        >
          {isDark ? (
            <>
              <span className="material-symbols-outlined text-[16px] text-[#ffd977]">
                light_mode
              </span>
              <span className="hidden sm:inline text-[11px] font-bold">Light</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px] text-[#001a43]">
                dark_mode
              </span>
              <span className="hidden sm:inline text-[11px] font-bold">Dark</span>
            </>
          )}
        </button>

        {/* Icon actions */}
        <div className="flex items-center gap-1 border-l border-outline-variant pl-2">
          <button
            id="dashboard-notifications-btn"
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high transition-colors relative"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c9a227]" />
          </button>
          <button
            id="dashboard-help-btn"
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high transition-colors"
            title="Help"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
          <button
            id="dashboard-settings-btn"
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container-high transition-colors"
            title="Settings"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>

        {/* Host avatar */}
        <div
          className="w-8 h-8 rounded-full ring-2 ring-[#c9a227]/40 bg-[#001a43] text-white flex items-center justify-center text-xs font-black select-none shadow-sm cursor-pointer"
          title="Host Profile"
        >
          AP
        </div>
      </div>
    </header>
  );
}
