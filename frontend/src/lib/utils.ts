import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicts.
 * Usage: cn("px-4", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency consistently across the app.
 * Defaults to LKR (base currency for EVOLANKA providers).
 */
export function formatCurrency(
  amount: number | null | undefined,
  currency: "LKR" | "USD" = "LKR",
  options: { compact?: boolean } = {},
): string {
  if (amount == null) return "—";

  if (options.compact) {
    if (currency === "LKR") {
      if (amount >= 1_000_000) return `LKR ${(amount / 1_000_000).toFixed(1)}M`;
      if (amount >= 1_000) return `LKR ${(amount / 1_000).toFixed(0)}k`;
      return `LKR ${amount}`;
    }
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}k`;
    return `$${amount}`;
  }

  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount);
}