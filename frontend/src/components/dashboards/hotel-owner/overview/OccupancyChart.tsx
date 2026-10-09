"use client";

import { useState } from "react";
import { Card } from "./Card";
import { bars } from "./constants";

export function OccupancyChart() {
  const [range, setRange] = useState<"7 Days" | "30 Days">("7 Days");

  return (
    <Card className="p-md">
      <div className="mb-lg flex items-center justify-between">
        <h2 className="font-title-sm text-title-sm text-on-surface">
          Occupancy Trends
        </h2>

        <div className="flex gap-2">
          {(["7 Days", "30 Days"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              className={`rounded-full border border-outline-variant px-3 py-1.5 font-label-sm text-label-sm transition-colors ${
                range === option
                  ? "bg-surface-container-high text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex h-64 items-end justify-between gap-2 px-4">
        {bars.map(([day, height]) => (
          <div
            key={day}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className={`w-full rounded-t-lg transition-colors hover:bg-primary-container ${
                day === "Fri" ? "bg-primary" : "bg-primary-fixed-dim"
              }`}
              style={{ height: `${height}%` }}
            />
            <span
              className={`font-label-sm text-[10px] ${
                day === "Fri"
                  ? "font-bold text-primary"
                  : "text-on-surface-variant"
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}