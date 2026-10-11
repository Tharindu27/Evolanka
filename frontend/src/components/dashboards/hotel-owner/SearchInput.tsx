"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex h-10 items-center gap-2 rounded-lg bg-surface-container-low px-3 transition-colors focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary-container",
        className,
      )}
    >
      <Icon name="search" size={20} className="text-outline" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent font-label-md text-label-md text-on-surface outline-none placeholder:text-outline"
      />
    </div>
  );
}