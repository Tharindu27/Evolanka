import { cn } from "@/lib/utils";

export type StatusVariant =
  | "success"   // Confirmed · Available · Published · Active
  | "warning"   // Pending · Maintenance · Draft
  | "danger"    // Cancelled · Out of Order · Critical
  | "info"      // New · Best Seller
  | "neutral";  // N/A · Optional

const VARIANT_CLASSES: Record<StatusVariant, { bg: string; dot: string; text: string }> = {
  success: { bg: "bg-tertiary-fixed",        dot: "bg-tertiary",         text: "text-on-tertiary-fixed" },
  warning: { bg: "bg-secondary-fixed",       dot: "bg-secondary-container", text: "text-on-secondary-fixed" },
  danger:  { bg: "bg-error-container",       dot: "bg-error",            text: "text-on-error-container" },
  info:    { bg: "bg-primary-fixed",         dot: "bg-primary-container", text: "text-on-primary-fixed" },
  neutral: { bg: "bg-surface-container-high", dot: "bg-outline",         text: "text-on-surface-variant" },
};

interface StatusChipProps {
  label: string;
  variant: StatusVariant;
  className?: string;
  withDot?: boolean;
}

export function StatusChip({
  label,
  variant,
  className,
  withDot = true,
}: StatusChipProps) {
  const v = VARIANT_CLASSES[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-label-sm text-label-sm",
        v.bg,
        v.text,
        className,
      )}
    >
      {withDot && <span className={cn("h-1.5 w-1.5 rounded-full", v.dot)} />}
      {label}
    </span>
  );
}