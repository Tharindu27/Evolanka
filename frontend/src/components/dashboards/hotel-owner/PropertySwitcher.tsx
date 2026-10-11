"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { hotelOwnerListings } from "@/data/hotelOwnerListings";
import { cn } from "@/lib/utils";
import { propertyHref } from "@/lib/property";

interface PropertySwitcherProps {
  currentPropertyId: string;
  currentPropertyName: string;
  currentLocation?: string;
  className?: string;
}

export function PropertySwitcher({
  currentPropertyId,
  currentPropertyName,
  currentLocation,
  className,
}: PropertySwitcherProps) {
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-2 text-left transition-colors hover:bg-surface-container-low",
            className,
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-primary">
            <Icon name="domain" size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-label-md text-label-md font-semibold text-on-surface">
              {currentPropertyName}
            </span>
            {currentLocation && (
              <span className="block truncate font-label-sm text-label-sm text-on-surface-variant">
                {currentLocation}
              </span>
            )}
          </span>
          <Icon name="expand_more" size={18} className="text-outline" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="start"
          className="z-50 w-[260px] rounded-xl border border-outline-variant/50 bg-surface-container-lowest p-1 shadow-lg"
        >
          <DropdownMenu.Label className="px-3 py-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Switch Property
          </DropdownMenu.Label>

          {hotelOwnerListings.map((listing) => {
            const isCurrent = listing.id === currentPropertyId;
            return (
              <DropdownMenu.Item
                key={listing.id}
                onSelect={() => {
                  if (!isCurrent) router.push(propertyHref(listing.id, "overview"));
                }}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 outline-none",
                  isCurrent
                    ? "bg-primary-fixed/40 text-primary"
                    : "text-on-surface hover:bg-surface-container-low",
                )}
              >
                <Icon
                  name={isCurrent ? "check" : "domain"}
                  size={16}
                  className={isCurrent ? "text-primary" : "text-outline"}
                />
                <span className="min-w-0 flex-1 truncate font-label-md text-label-md">
                  {listing.title}
                </span>
              </DropdownMenu.Item>
            );
          })}

          <DropdownMenu.Separator className="my-1 h-px bg-outline-variant/40" />

          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/hotel-owner/listings"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-label-md text-label-md text-primary outline-none hover:bg-surface-container-low"
            >
              <Icon name="arrow_back" size={16} />
              All Properties
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}