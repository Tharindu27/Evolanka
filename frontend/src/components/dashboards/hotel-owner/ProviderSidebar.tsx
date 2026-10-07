"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { path: "overview",   label: "Overview",   icon: "dashboard" },
  { path: "",           label: "My Listings", icon: "holiday_village" },
  { path: "facilities", label: "Facilities", icon: "pool" },
  { path: "packages",   label: "Packages",   icon: "inventory_2" },
  { path: "bookings",   label: "Bookings",   icon: "event_available" },
  { path: "earnings",   label: "Earnings",   icon: "payments" },
  { path: "reviews",    label: "Reviews",    icon: "rate_review" },
  { path: "settings",   label: "Settings",   icon: "settings" },
];

const BASE = "/dashboard/hotel-owner";

export default function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col bg-surface-container-low border-r border-outline-variant z-50">
      {/* Logo */}
      <div className="h-16 px-md flex items-center border-b border-outline-variant">
        <Link href={BASE} className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary text-headline-md">
            explore
          </span>
          <span className="font-title-sm text-title-sm text-primary tracking-tight font-bold">
            EVOLANKA
          </span>
        </Link>
      </div>

      <div className="px-md py-sm">
        <span className="font-label-sm text-label-sm uppercase text-outline tracking-wider">
          Provider Hub
        </span>
      </div>

      <nav className="flex-1 px-sm space-y-xs overflow-y-auto">
        {NAV.map(({ path, label, icon }) => {
          const href = path ? `${BASE}/${path}` : BASE;
          const isActive = path
            ? pathname.startsWith(href)
            : pathname === BASE;

          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "flex items-center gap-sm px-sm py-base transition-colors bg-primary-container text-on-primary font-label-md rounded-lg"
                  : "flex items-center gap-sm px-sm py-base rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              }
            >
              <span className="material-symbols-outlined">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-sm border-t border-outline-variant">
        <div className="bg-surface-container p-sm rounded-lg flex items-center gap-sm">
          <span className="material-symbols-outlined text-tertiary">
            verified
          </span>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">
              Verified Partner
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Super Host
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}