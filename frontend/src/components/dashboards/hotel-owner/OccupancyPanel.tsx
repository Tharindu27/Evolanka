"use client";

import { useState } from "react";

interface CategoryOccupancy {
  category: string;
  total: number;
  occupied: number;
  percentage: number;
  color: string;
}

const categories: CategoryOccupancy[] = [
  { category: "Presidential Villas", total: 10, occupied: 10, percentage: 100, color: "bg-[#001a43] dark:bg-primary" },
  { category: "Deluxe Ocean Suites", total: 25, occupied: 23, percentage: 92, color: "bg-[#001a43] dark:bg-primary" },
  { category: "Standard King Suites", total: 12, occupied: 9, percentage: 75, color: "bg-[#c9a227] dark:bg-secondary" },
];

export default function OccupancyPanel() {
  const [holding, setHolding] = useState<boolean>(false);
  const [heldSuccess, setHeldSuccess] = useState<boolean>(false);

  const handleQuickHold = () => {
    setHolding(true);
    setTimeout(() => {
      setHolding(false);
      setHeldSuccess(true);
      setTimeout(() => setHeldSuccess(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* ── Room Occupancy Category Breakdown ── */}
      <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-black text-on-surface">Room Occupancy</h3>
            <p className="text-xs text-on-surface-variant font-medium">Live category quotas</p>
          </div>
          <span className="material-symbols-outlined text-[#001a43] dark:text-primary text-[22px]">
            pie_chart
          </span>
        </div>

        <div className="space-y-4">
          {categories.map((c) => (
            <div key={c.category} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface font-semibold">{c.category}</span>
                <span className="text-[#001a43] dark:text-primary font-bold">
                  {c.percentage}% ({c.occupied}/{c.total})
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${c.color}`}
                  style={{ width: `${c.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleQuickHold}
          disabled={holding}
          className={`w-full mt-6 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border cursor-pointer ${
            heldSuccess
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40"
              : "bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-variant"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span>{holding ? "Holding Quota..." : heldSuccess ? "Room Held ✓" : "Quick Block / Hold Room"}</span>
        </button>
      </div>
    </div>
  );
}
