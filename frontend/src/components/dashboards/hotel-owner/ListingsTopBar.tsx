"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EvolankaWordmark } from "@/components/common/EvolankaLogo";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { SystemStatusPill } from "./SystemStatusPill";
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";

const TOP_NAV = [
  { href: "/dashboard/hotel-owner/listings", label: "Properties", id: "properties" },
  { href: "/dashboard/hotel-owner/listings/all", label: "Listings", id: "listings" },
  { href: "/dashboard/hotel-owner/listings/insights", label: "Insights", id: "insights" },
];

export function ListingsTopBar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-4 border-b border-outline-variant/40 bg-surface-container-lowest px-4 lg:px-8">
      <Link href="/dashboard/hotel-owner/listings" className="shrink-0">
        <EvolankaWordmark size="sm" />
      </Link>

      <div className="hidden h-6 w-px bg-outline-variant/60 md:block" />

      <nav className="hidden items-center gap-1 md:flex">
        {TOP_NAV.map((item) => {
          const active =
            item.id === "properties"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-1.5 font-label-md text-label-md transition-colors",
                active
                  ? "bg-surface-container text-on-surface"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-1 justify-center px-2">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search listings..."
          className="hidden w-full max-w-sm lg:flex"
        />
      </div>

      <div className="flex items-center gap-3">
        <SystemStatusPill />
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}