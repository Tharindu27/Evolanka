import { cn } from "@/lib/utils";
import type { IconName } from "@/lib/icons";

export type { IconName };

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