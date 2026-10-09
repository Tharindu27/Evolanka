import type { ReactNode } from "react";
import { Card } from "./Card";

export function MetricCard({
  label,
  icon,
  value,
  children,
}: {
  label: string;
  icon: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <Card className="group p-md transition-colors hover:border-primary/30">
      <div className="mb-sm flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface-variant">
          {label}
        </span>
        <span className="material-symbols-outlined text-primary transition-transform group-hover:scale-110">
          {icon}
        </span>
      </div>

      <p className="font-headline-md text-headline-md font-bold text-on-surface">
        {value}
      </p>

      {children}
    </Card>
  );
}