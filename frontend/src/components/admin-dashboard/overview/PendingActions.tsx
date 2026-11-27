"use client";

import Link from "next/link";
import Panel from "../shared/Panel";
import { useAdminData } from "../AdminDataProvider";

export default function PendingActions() {
  const { pending } = useAdminData();
  const total = pending.listings + pending.locations;

  const items = [
    { label: "Listings to review", note: "Packages, villas and vehicles", count: pending.listings, icon: "inventory_2", href: "listings" },
    { label: "Tourist-suggested locations", note: "New places to approve", count: pending.locations, icon: "location_on", href: "locations" },
  ];

  return (
    <Panel
      title="Pending Actions"
      subtitle="Items waiting for admin approval"
      action={
        <span className="rounded-full bg-[#c9a227]/15 px-3 py-1 text-xs font-extrabold text-[#ffd977]">
          {total} pending
        </span>
      }
    >
      <div className="grid divide-y divide-outline-variant md:grid-cols-2 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <Link
            key={item.label}
            href={`/dashboard/admin/${item.href}`}
            className="group flex items-center gap-4 p-5 transition hover:bg-surface-container sm:px-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c9a227]/15 text-[#ffd977]">
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{item.icon}</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-on-surface">{item.label}</span>
              <span className="mt-0.5 block text-xs text-on-surface-variant">{item.note}</span>
            </span>
            <span className="text-2xl font-black text-on-surface">{item.count}</span>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition group-hover:translate-x-1" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        ))}
      </div>
    </Panel>
  );
}
