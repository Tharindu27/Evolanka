"use client";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    label: string;
  };
  icon: string;
  accentColor?: "primary" | "secondary" | "tertiary" | "emerald";
  progress?: number;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  accentColor = "primary",
}: KpiCardProps) {
  const accentMap = {
    primary: {
      bg: "bg-[#001a43]/8 text-[#001a43] border-[#001a43]/15 dark:bg-primary/10 dark:text-primary dark:border-primary/20",
    },
    secondary: {
      bg: "bg-[#b08d1f]/12 text-[#b08d1f] border-[#b08d1f]/20 dark:bg-secondary/15 dark:text-[#ffd977] dark:border-secondary/25",
    },
    tertiary: {
      bg: "bg-[#003d9b]/10 text-[#003d9b] border-[#003d9b]/20 dark:bg-tertiary/10 dark:text-tertiary dark:border-tertiary/20",
    },
    emerald: {
      bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
  };

  const style = accentMap[accentColor];

  return (
    <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-5 shadow-[0_10px_30px_rgba(0,26,67,0.04)] hover:shadow-[0_16px_40px_rgba(0,26,67,0.08)] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          {title}
        </p>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${style.bg}`}
        >
          <span className="material-symbols-outlined text-[22px]">
            {icon}
          </span>
        </div>
      </div>

      <div className="my-2">
        <h3 className="text-3xl font-black tracking-tight text-on-surface">
          {value}
        </h3>
      </div>

      {(trend || subtitle) && (
        <div className="flex items-center gap-1.5 text-xs">
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-bold ${
                trend.direction === "up"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : trend.direction === "down"
                  ? "text-error"
                  : "text-[#001a43] dark:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {trend.direction === "up"
                  ? "trending_up"
                  : trend.direction === "down"
                  ? "trending_down"
                  : "arrow_forward"}
              </span>
              {trend.label}
            </span>
          )}
          {subtitle && (
            <span className="text-on-surface-variant font-medium text-[11px] truncate">
              {trend ? `· ${subtitle}` : subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
