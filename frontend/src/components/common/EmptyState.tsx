import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  variant?: "card" | "dashed";
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  variant = "dashed",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-sm rounded-xl p-lg text-center",
        variant === "dashed"
          ? "border-2 border-dashed border-outline-variant bg-surface-container-low/40"
          : "border border-outline-variant/40 bg-surface-container-lowest",
        className,
      )}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
        <Icon name={icon} size={28} />
      </span>
      <h3 className="font-title-sm text-title-sm font-semibold text-on-surface">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm font-body-md text-body-md text-on-surface-variant">
          {description}
        </p>
      )}
      {action && <div className="mt-sm">{action}</div>}
    </div>
  );
}