"use client";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(current: number, total: number, sibling: number) {
  const totalNumbers = sibling * 2 + 5;
  if (total <= totalNumbers) return range(1, total);

  const left = Math.max(current - sibling, 2);
  const right = Math.min(current + sibling, total - 1);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;

  return [
    1,
    ...(showLeftEllipsis ? ["…"] : []),
    ...range(left, right),
    ...(showRightEllipsis ? ["…"] : []),
    total,
  ];
}

export function Pagination({
  current,
  total,
  onChange,
  className,
  siblingCount = 1,
}: PaginationProps) {
  if (total <= 1) return null;
  const pages = getPages(current, total, siblingCount);

  const btnBase =
    "flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-label-md text-label-md transition-colors";

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
    >
      <button
        type="button"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        aria-label="Previous page"
        className={cn(
          btnBase,
          "text-on-surface-variant hover:bg-surface-container disabled:opacity-40",
        )}
      >
        <Icon name="chevron_left" size={18} />
      </button>

      {pages.map((p, i) =>
        typeof p === "number" ? (
          <button
            key={`${p}-${i}`}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === current ? "page" : undefined}
            className={cn(
              btnBase,
              p === current
                ? "bg-primary text-on-primary"
                : "text-on-surface-variant hover:bg-surface-container",
            )}
          >
            {p}
          </button>
        ) : (
          <span
            key={`ellipsis-${i}`}
            className="px-1 text-on-surface-variant"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        aria-label="Next page"
        className={cn(
          btnBase,
          "text-on-surface-variant hover:bg-surface-container disabled:opacity-40",
        )}
      >
        <Icon name="chevron_right" size={18} />
      </button>
    </nav>
  );
}