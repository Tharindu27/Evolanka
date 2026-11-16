import Panel from "../shared/Panel";
import { monthlyRevenue } from "@/data/admin-data/overview";

export default function RevenueChart() {
  const peak = Math.max(...monthlyRevenue.map((item) => item.value));

  return (
    <Panel title="Monthly Revenue Growth" subtitle="Platform commission earned per month, 2026 (LKR millions)">
      <div className="px-5 pb-5 pt-6 sm:px-6">
        <div className="flex h-52 items-end gap-2 sm:gap-3" role="img" aria-label="Bar chart of monthly commission revenue">
          {monthlyRevenue.map((item) => (
            <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[10px] font-bold text-on-surface-variant">{item.value > 0 ? item.value.toFixed(1) : "–"}</span>
              <div className="flex w-full flex-1 items-end overflow-hidden rounded-t-lg bg-surface-container">
                <div
                  className={`w-full rounded-t-lg ${item.value === peak ? "bg-[#c9a227]" : "bg-primary/70"}`}
                  style={{ height: `${(item.value / peak) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-on-surface-variant">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
