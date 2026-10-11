"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { SystemStatusPill } from "./SystemStatusPill";
import { NotificationBell } from "./NotificationBell";
import { UserMenu } from "./UserMenu";

interface ProviderHeaderProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function ProviderHeader({ breadcrumb }: ProviderHeaderProps) {
  const [query, setQuery] = useState("");

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center gap-4 border-b border-outline-variant/40 bg-surface/80 px-4 backdrop-blur-md lg:w-[calc(100%-16rem)] lg:px-8">
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search rooms, bookings, guests..."
        className="hidden max-w-md flex-1 md:flex"
      />

      <div className="flex flex-1 items-center md:hidden">
        <Icon name="search" size={22} className="text-outline" />
      </div>

      <div className="flex items-center gap-3">
        <SystemStatusPill />
        <NotificationBell />
        <UserMenu />
      </div>

      {breadcrumb && breadcrumb.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="absolute left-8 top-full mt-2 hidden items-center gap-2 font-label-sm text-label-sm text-on-surface-variant lg:flex"
        >
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className={cn(
                    "transition-colors hover:text-primary",
                    i === breadcrumb.length - 1 && "text-primary",
                  )}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={cn(i === breadcrumb.length - 1 && "text-primary")}
                >
                  {crumb.label}
                </span>
              )}
              {i < breadcrumb.length - 1 && (
                <span className="text-outline/60 gap-2">{'>'}</span>
              )}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}

export default ProviderHeader;