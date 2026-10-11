import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface NotificationBellProps {
  hasUnread?: boolean;
  className?: string;
}

export function NotificationBell({
  hasUnread = true,
  className,
}: NotificationBellProps) {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className={cn(
        "relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface",
        className,
      )}
    >
      <Icon name="notifications" size={22} />
      {hasUnread && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary-container" />
      )}
    </button>
  );
}