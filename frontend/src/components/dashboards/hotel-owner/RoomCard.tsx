"use client";

import { useState } from "react";

export interface RoomItem {
  id: string;
  number: string;
  name: string;
  category: "Suite" | "Villa" | "Heritage" | "Penthouse";
  floor: number;
  capacity: number;
  bedType: string;
  pricePerNight: string;
  status: "available" | "occupied" | "cleaning" | "maintenance";
  image: string;
  amenities: string[];
}

interface RoomCardProps {
  room: RoomItem;
  onStatusChange?: (id: string, newStatus: RoomItem["status"]) => void;
}

const statusBadgeConfig = {
  available: {
    label: "Available",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  occupied: {
    label: "Occupied",
    badge: "bg-[#001a43]/80 text-white border-white/20",
    dot: "bg-[#ffd977]",
  },
  cleaning: {
    label: "Cleaning",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
  },
  maintenance: {
    label: "Maintenance",
    badge: "bg-red-500/20 text-red-300 border-red-500/30",
    dot: "bg-red-400",
  },
};

export default function RoomCard({ room, onStatusChange }: RoomCardProps) {
  const [currentStatus, setCurrentStatus] = useState<RoomItem["status"]>(room.status);
  const cfg = statusBadgeConfig[currentStatus];

  const handleToggle = () => {
    const nextStatus = currentStatus === "available" ? "maintenance" : "available";
    setCurrentStatus(nextStatus);
    onStatusChange?.(room.id, nextStatus);
  };

  return (
    <div className="rounded-[24px] border border-outline-variant bg-surface-container-low overflow-hidden hover:border-[#001a43]/30 hover:shadow-[0_18px_50px_rgba(0,26,67,0.11)] transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* ── Image Header with Badge ── */}
      <div className="relative h-48 w-full bg-surface-container-high overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/90 via-black/25 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/15">
            Room {room.number}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#001a43] text-white border border-white/20">
            {room.category}
          </span>
        </div>

        {/* Status Pill */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border ${cfg.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        </div>

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h4 className="font-black text-base leading-tight drop-shadow-sm">{room.name}</h4>
            <p className="text-[11px] text-white/80 font-medium">Floor {room.floor} · {room.bedType}</p>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-[#c9a227] dark:text-[#ffd977]">{room.pricePerNight}</span>
            <span className="text-[10px] text-white/80 block">/ night</span>
          </div>
        </div>
      </div>

      {/* ── Content & Features ── */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
            Up to {room.capacity} Guests
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">king_bed</span>
            {room.bedType}
          </span>
        </div>

        {/* Amenities Chips */}
        <div className="flex flex-wrap gap-1.5">
          {room.amenities.map((amenity) => (
            <span
              key={amenity}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* ── Actions ── */}
        <div className="pt-3 border-t border-outline-variant flex items-center justify-between gap-2">
          <button
            onClick={handleToggle}
            className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              currentStatus === "available"
                ? "border border-outline-variant text-on-surface-variant hover:bg-[#001a43] hover:text-white dark:hover:bg-primary dark:hover:text-on-primary"
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
            }`}
          >
            {currentStatus === "available" ? "Hold / Block" : "Release Room"}
          </button>

          <div className="flex items-center gap-1">
            <button
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              title="Edit Room Specifications"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button
              className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
              title="Calendar View"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
