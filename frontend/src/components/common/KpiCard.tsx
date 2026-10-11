import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type DeltaVariant = "positive" | "negative" | "warning" | "info";

const DELTA_CLASSES: Record<DeltaVariant, string> = {
  positive: "bg-tertiary-fixed text-on-tertiary-fixed",
  negative: "bg-error-container text-on-error-container",
  warning:  "bg-secondary-fixed text-on-secondary-fixed",
  info:     "bg-primary-fixed text-on-primary-fixed",
};

interface KpiCardProps {
  icon: IconName;
  label: string;
  value: string | number;
  meta?: string;
  delta?: { label: string; variant: DeltaVariant };
  footer?: React.ReactNode;
  className?: string;
}

export function KpiCard({
  icon,
  label,
  value,
  meta,
  delta,
  footer,
  className,
}: KpiCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-md",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed text-primary">
          <Icon name={icon} size={20} />
        </span>
        {delta && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 font-label-sm text-label-sm",
              DELTA_CLASSES[delta.variant],
            )}
          >
            {delta.label}
          </span>
        )}
      </div>

      <p className="mt-md font-label-md text-label-md text-on-surface-variant">
        {label}
      </p>
      <p className="mt-1 font-headline-md text-headline-md font-bold tabular-nums text-on-surface">
        {value}
      </p>
      {meta && (
        <p className="mt-1 font-label-sm text-label-sm text-on-surface-variant">
          {meta}
        </p>
      )}

      {footer && <div className="mt-sm">{footer}</div>}
    </div>
  );
}