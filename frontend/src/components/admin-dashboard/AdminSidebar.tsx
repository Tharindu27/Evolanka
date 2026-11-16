"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminData } from "./AdminDataProvider";

const BASE = "/dashboard/admin";

const navItems = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "providers", label: "Service Providers", icon: "storefront", badge: "providers" },
  { id: "tourists", label: "Tourists", icon: "groups" },
  { id: "listings", label: "Listings", icon: "inventory_2", badge: "listings" },
  { id: "bookings", label: "Bookings", icon: "calendar_month" },
  { id: "payments", label: "Payments & Commission", icon: "payments" },
  { id: "reviews", label: "Reviews & Support", icon: "rate_review" },
  { id: "locations", label: "Locations", icon: "location_on", badge: "locations" },
  { id: "settings", label: "Admins & Settings", icon: "settings" },
] as const;

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { pending } = useAdminData();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 top-16 z-30 bg-[#001a43]/40 lg:hidden"
        />
      ) : null}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-64 flex-col justify-between overflow-y-auto border-r border-outline-variant bg-surface-container-lowest p-4 pt-2 transition-transform duration-200 lg:sticky lg:z-30 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-4">
          <nav className="space-y-1" aria-label="Admin dashboard navigation">
            {navItems.map((item) => {
              const href = `${BASE}/${item.id}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              const count = "badge" in item ? pending[item.badge] : 0;
              return (
                <Link
                  key={item.id}
                  href={href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                    active
                      ? "bg-primary-container text-white shadow-md shadow-black/20"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="material-symbols-outlined shrink-0 text-[20px]" aria-hidden="true">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </span>
                  {count > 0 ? (
                    <span
                      className={`ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                        active ? "bg-white/20 text-[#ffd977]" : "bg-[#c9a227]/20 text-[#ffd977]"
                      }`}
                    >
                      {count}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6 space-y-3 border-t border-outline-variant pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container-high hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">travel_explore</span>
            View public site
          </Link>
          <details className="group relative border-t border-outline-variant pt-3">
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface-container-high [&::-webkit-details-marker]:hidden">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-xs font-black text-white ring-2 ring-[#c9a227]/40">SF</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-on-surface">Sarah Fernando</span>
                <span className="mt-0.5 block text-[10px] text-on-surface-variant">Super Admin</span>
              </span>
              <span className="material-symbols-outlined text-base text-on-surface-variant transition group-open:rotate-180" aria-hidden="true">expand_more</span>
            </summary>
            <div className="mt-1 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-1.5">
              <Link href="/admin/admin-login" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/10">
                <span className="material-symbols-outlined text-base" aria-hidden="true">logout</span>
                Log Out
              </Link>
            </div>
          </details>
        </div>
      </aside>
    </>
  );
}
