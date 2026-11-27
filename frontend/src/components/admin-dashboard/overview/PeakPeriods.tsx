import Panel from "../shared/Panel";
import { peakPeriods } from "@/data/admin-data/overview";

export default function PeakPeriods() {
  return (
    <Panel title="Peak Booking Periods" subtitle="Share of yearly bookings by season">
      <ul className="space-y-4 px-5 py-5 sm:px-6">
        {peakPeriods.map((period, index) => (
          <li key={period.label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-semibold text-on-surface">{period.label}</span>
              <span className="font-bold text-on-surface-variant">{period.share}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-container">
              <div
                className={`h-full rounded-full ${index === 0 ? "bg-[#c9a227]" : "bg-primary/70"}`}
                style={{ width: `${period.share}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
