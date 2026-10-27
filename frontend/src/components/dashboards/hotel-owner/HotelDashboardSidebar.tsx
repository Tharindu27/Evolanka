"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "overview", label: "Overview", icon: "dashboard", href: "overview" },
  { id: "rooms", label: "Room Listings", icon: "bed", href: "rooms", badge: null },
  {
    id: "bookings",
    label: "Bookings",
    icon: "calendar_month",
    href: "bookings",
    badge: "14",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: "star",
    href: "reviews",
    rating: "4.9",
  },
  {
    id: "facilities",
    label: "Facilities & Amenities",
    icon: "pool",
    href: "facilities",
  },
  {
    id: "financials",
    label: "Financials & Payouts",
    icon: "payments",
    href: "financials",
  },
  {
    id: "packages",
    label: "Packages & Offers",
    icon: "inventory_2",
    href: "packages",
    badge: "5",
  },
  {
    id: "settings",
    label: "Property Settings",
    icon: "settings",
    href: "settings",
  },
];

const footerItems = [
  { id: "docs", label: "Documentation", icon: "menu_book", href: "#" },
  { id: "switch", label: "Switch Property", icon: "swap_horiz", href: "/dashboard" },
];

interface HotelDashboardSidebarProps {
  hotelId: string;
  hotelName?: string;
}

function MatIcon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <span
      className="material-symbols-outlined select-none shrink-0"
      style={{ fontSize: size }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default function HotelDashboardSidebar({
  hotelId,
  hotelName = "Grand Azure Villa",
}: HotelDashboardSidebarProps) {
  const pathname = usePathname();
  const base = `/dashboard/hotel-owner/${hotelId}`;

  const isActive = (href: string) => pathname === `${base}/${href}`;

  return (
    <aside
      id="hotel-dashboard-sidebar"
      className="w-64 flex-shrink-0 flex flex-col justify-between p-4 bg-surface-container-lowest border-r border-outline-variant sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-30"
    >
      {/* ── Top section ── */}
      <div className="space-y-4">
        {/* Property badge */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-surface-container border border-outline-variant shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-[#001a43] text-[#c9a227] flex items-center justify-center shrink-0 shadow-sm">
            <MatIcon name="hotel_class" size={18} />
          </div>
          <div className="flex flex-col overflow-hidden min-w-0">
            <span className="text-xs font-bold text-on-surface truncate">
              EVOLANKA Host
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              {hotelName} · Colombo
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1" aria-label="Hotel dashboard navigation">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                id={`sidebar-${item.id}`}
                href={`${base}/${item.href}`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-[#001a43] text-white shadow-md shadow-[#001a43]/15 dark:bg-primary-container dark:text-on-primary-container"
                    : "text-on-surface-variant hover:bg-[#f1f5ff] hover:text-[#001a43] dark:hover:bg-surface-container-high dark:hover:text-on-surface"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 truncate">
                  <MatIcon name={item.icon} size={20} />
                  <span className="truncate">{item.label}</span>
                </div>
                {/* Badge / rating indicator */}
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  {item.badge && (
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                        active
                          ? "bg-white/20 text-[#ffd977]"
                          : "bg-[#001a43]/10 text-[#001a43] dark:bg-primary/20 dark:text-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.rating && (
                    <span
                      className={`text-[11px] font-bold flex items-center gap-0.5 ${
                        active ? "text-[#ffd977]" : "text-[#c9a227]"
                      }`}
                    >
                      ★ {item.rating}
                    </span>
                  )}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Footer section ── */}
      <div className="pt-4 border-t border-outline-variant space-y-1">
        {footerItems.map((item) => (
          <Link
            key={item.id}
            id={`sidebar-footer-${item.id}`}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-[#f1f5ff] hover:text-[#001a43] dark:hover:bg-surface-container-high dark:hover:text-on-surface transition-all"
          >
            <MatIcon name={item.icon} size={18} />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          id="sidebar-logout-btn"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#dc2626] hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <MatIcon name="logout" size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
