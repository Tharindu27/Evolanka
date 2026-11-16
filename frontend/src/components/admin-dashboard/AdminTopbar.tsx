"use client";

import Link from "next/link";

interface AdminTopbarProps {
  onOpenMenu: () => void;
}

export default function AdminTopbar({ onOpenMenu }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-surface/90 pr-4 shadow-[0_4px_20px_rgba(0,26,67,0.03)] backdrop-blur-md sm:pr-5">
      <div className="flex h-full w-auto shrink-0 items-center gap-3 border-r border-outline-variant px-4 sm:px-5 lg:w-64">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation"
          className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface lg:hidden"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">menu</span>
        </button>
        <Link href="/" className="flex items-center gap-2 text-xl font-black uppercase tracking-tight text-on-surface">
          EVOLANKA
          <span className="h-2.5 w-2.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
        </Link>
        <span className="hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-wider text-on-surface-variant sm:inline">Admin Portal</span>
      </div>

    </header>
  );
}
