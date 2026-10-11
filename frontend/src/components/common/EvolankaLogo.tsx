import { cn } from "@/lib/utils";

interface EvolankaLogoProps {
  size?: number;
  className?: string;
}

/**
 * EVOLANKA brand mark.
 * NOTE: This is a placeholder SVG approximating the brand mark.
 * Replace the <svg> contents with your real .svg asset when available.
 */
export function EvolankaLogo({ size = 28, className }: EvolankaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0 text-primary", className)}
      aria-label="EVOLANKA"
      role="img"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 20.5 L16 11 L22 20.5 L16 16.5 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface EvolankaWordmarkProps {
  size?: "sm" | "md";
  className?: string;
}

/** Logo + wordmark lockup — for top bars and sidebar */
export function EvolankaWordmark({
  size = "md",
  className,
}: EvolankaWordmarkProps) {
  const iconSize = size === "sm" ? 22 : 28;
  const textClass =
    size === "sm"
      ? "font-title-sm text-title-sm"
      : "font-headline-md text-title-sm";

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <EvolankaLogo size={iconSize} />
      <span
        className={cn(
          "font-bold tracking-tight text-primary leading-none",
          textClass,
        )}
      >
        EVOLANKA
      </span>
    </span>
  );
}