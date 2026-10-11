"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  value: "grid" | "list";
  onChange: (value: "grid" | "list") => void;
  className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-outline-variant bg-surface-container-lowest p-0.5",
        className,
      )}
    >
      {(["grid", "list"] as const).map((v) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            aria-label={`${v} view`}
            aria-pressed={active}
            onClick={() => onChange(v)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
              active
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container",
            )}
          >
            <Icon name={v === "grid" ? "grid_view" : "view_list"} size={18} />
          </button>
        );
      })}
    </div>
  );
}