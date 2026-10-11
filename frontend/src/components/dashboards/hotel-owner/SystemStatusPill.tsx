import { cn } from "@/lib/utils";

interface SystemStatusPillProps {
  className?: string;
}

export function SystemStatusPill({ className }: SystemStatusPillProps) {
  return (
    <span
      className={cn(
        "hidden sm:inline-flex items-center gap-1.5 rounded-full bg-tertiary-fixed px-2.5 py-1 font-label-sm text-label-sm text-on-tertiary-fixed",
        className,
      )}
    >
      <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary-container" />
      All Systems Operational
    </span>
  );
}