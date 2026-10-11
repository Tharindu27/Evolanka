"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  name?: string;
  role?: string;
  className?: string;
}

export function UserMenu({
  name = "Ceylon Horizons",
  role = "Provider",
  className,
}: UserMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-surface-container-low",
            className,
          )}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary">
            <Icon name="person" size={18} />
          </span>
          <span className="hidden flex-col text-left leading-none xl:flex">
            <span className="font-label-md text-label-md text-on-surface">
              {name}
            </span>
            <span className="mt-0.5 font-label-sm text-label-sm text-on-surface-variant">
              {role}
            </span>
          </span>
          <Icon name="expand_more" size={18} className="text-outline" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className="z-50 w-56 rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-1 shadow-lg"
        >
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/hotel-owner/listings/settings"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface outline-none hover:bg-surface-container-low"
            >
              <Icon name="settings" size={18} />
              Provider Settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/help"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface outline-none hover:bg-surface-container-low"
            >
              <Icon name="help" size={18} />
              Help Center
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-outline-variant/40" />
          <DropdownMenu.Item asChild>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-label-md text-label-md text-error outline-none hover:bg-error-container/40"
            >
              <Icon name="logout" size={18} />
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}