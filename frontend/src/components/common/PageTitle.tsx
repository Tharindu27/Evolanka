import { cn } from "@/lib/utils";

interface PageTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageTitle({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-base md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <p className="mb-1 font-label-sm text-label-sm text-on-surface-variant">
            {eyebrow}
          </p>
        )}
        <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-2xl font-body-md text-body-md text-on-surface-variant">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 items-center gap-base">{actions}</div>
      )}
    </div>
  );
}