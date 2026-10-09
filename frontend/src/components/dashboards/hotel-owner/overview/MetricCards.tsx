import { MetricCard } from "./MetricCard";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 gap-sm md:grid-cols-3">
      <MetricCard label="Today&apos;s Check-ins" icon="login" value="14">
        <p className="mt-2 flex items-center gap-1 font-label-sm text-label-sm text-tertiary-container">
          <span className="material-symbols-outlined text-[14px]">
            trending_up
          </span>
          24% from yesterday
        </p>
      </MetricCard>

      <MetricCard label="Current Occupancy" icon="bed" value="82%">
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div className="h-full w-[82%] rounded-full bg-primary" />
        </div>
      </MetricCard>

      <MetricCard label="Total Revenue" icon="payments" value="LKR 24.2M">
        <p className="mt-2 font-label-sm text-label-sm text-on-surface-variant">
          This Month •{" "}
          <span className="font-bold text-tertiary-container">+12%</span>
        </p>
      </MetricCard>
    </div>
  );
}