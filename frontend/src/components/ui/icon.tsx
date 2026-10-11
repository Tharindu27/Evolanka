import { cn } from "@/lib/utils";

export type IconName =
  | "explore" | "travel_explore" | "dashboard" | "holiday_village"
  | "pool" | "inventory_2" | "event_available" | "payments"
  | "rate_review" | "settings" | "search" | "notifications"
  | "person" | "expand_more" | "arrow_forward" | "arrow_back"
  | "more_vert" | "location_on" | "add" | "add_business"
  | "rocket_launch" | "file_download" | "edit_document" | "delete"
  | "verified" | "schedule" | "check" | "close" | "chevron_left"
  | "chevron_right" | "sort" | "calendar_today" | "bed"
  | "door_front" | "build" | "star" | "photo_camera" | "share"
  | "bolt" | "logout" | "help" | "home" | "grid_view" | "view_list"
  | "filter_list" | "download" | "upload" | "edit" | "visibility"
  | "trending_up" | "trending_down" | "account_balance"
  | "credit_card" | "lightbulb" | "verified_user" | "receipt_long"
  | "cloud_upload" | "image" | "videocam" | "play_circle"
  | "shield" | "info" | "warning" | "error" | "check_circle"
  | "expand_less" | "expand_more" | "sync";

interface IconProps {
  name: IconName;
  filled?: boolean;
  className?: string;
  size?: number;
  "aria-label"?: string;
}

export function Icon({
  name,
  filled = false,
  className,
  size,
  "aria-label": ariaLabel,
}: IconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined select-none inline-flex items-center justify-center",
        filled && "fill-1",
        className,
      )}
      style={size ? { fontSize: size } : undefined}
      aria-hidden={!ariaLabel}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {name}
    </span>
  );
}