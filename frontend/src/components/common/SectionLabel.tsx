import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h2" | "div";
}

export function SectionLabel({
  children,
  className,
  as: Tag = "span",
}: SectionLabelProps) {
  return (
    <Tag
      className={cn(
        "font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant",
        className,
      )}
    >
      {children}
    </Tag>
  );
}