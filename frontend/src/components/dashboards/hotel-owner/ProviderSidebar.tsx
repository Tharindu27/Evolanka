"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { PropertySwitcher } from "./PropertySwitcher";

interface ProviderSidebarProps {
  propertyId: string;
  propertyName: string;
  propertyLocation?: string;
}

interface NavItem {
  path: string;
  label: string;
  icon: IconName;
  badge?: number;
}

const NAV: NavItem[] = [
  { path: "overview", label: "Overview", icon: "dashboard" },
  { path: "rooms", label: "Rooms", icon: "bed" },
  { path: "bookings", label: "Bookings", icon: "event_available", badge: 3 },
  { path: "packages", label: "Packages", icon: "inventory_2" },
  { path: "facilities", label: "Facilities", icon: "pool" },
  { path: "reviews", label: "Reviews", icon: "rate_review", badge: 12 },
  { path: "earnings", label: "Earnings", icon: "payments" },
];

export function ProviderSidebar({
  propertyId,
  propertyName,
  propertyLocation,
}: ProviderSidebarProps) {
  const pathname = usePathname();
  const base = `/dashboard/hotel-owner/${propertyId}`;

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-64 flex-col border-r border-outline-variant/50 bg-surface-container-low lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-outline-variant/40 px-4">
        <Link
          href="/dashboard/hotel-owner/listings"
          className="flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-primary text-[22px]">
            travel_explore
          </span>
          <span className="font-title-sm text-title-sm font-bold tracking-tight text-primary">
            EVOLANKA
          </span>
        </Link>
      </div>

      {/* Back to All Properties */}
      <div className="px-4 pt-4">
        <Link
          href="/dashboard/hotel-owner/listings"
          className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name="arrow_back" size={16} />
          All Properties
        </Link>
      </div>

      {/* Property switcher */}
      <div className="px-3 pt-3">
        <PropertySwitcher
          currentPropertyId={propertyId}
          currentPropertyName={propertyName}
          currentLocation={propertyLocation}
        />
      </div>

      {/* Section label */}
      <div className="px-4 pt-5 pb-2">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
          Provider Hub
        </span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV.map((item) => {
          const href = `${base}/${item.path}`;
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={item.path}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                isActive
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
              )}
            >
              <Icon name={item.icon} size={20} />
              <span className="flex-1 font-label-md text-label-md">
                {item.label}
              </span>
              {item.badge ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-label-sm text-label-sm",
                    isActive
                      ? "bg-on-primary/20 text-on-primary"
                      : "bg-error-container text-on-error-container",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}

        <div className="!mt-4 h-px bg-outline-variant/40" />

        <Link
          href={`${base}/settings`}
          aria-current={pathname.startsWith(`${base}/settings`) ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
            pathname.startsWith(`${base}/settings`)
              ? "bg-primary text-on-primary"
              : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
          )}
        >
          <Icon name="settings" size={20} />
          <span className="font-label-md text-label-md">Settings</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-outline-variant/40 p-3">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
        >
          <Icon name="help" size={20} />
          Help Center
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-label-md text-label-md text-error transition-colors hover:bg-error-container/40"
        >
          <Icon name="logout" size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}