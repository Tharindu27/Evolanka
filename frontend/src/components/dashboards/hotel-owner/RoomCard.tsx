"use client";

import { useState } from "react";
import {
  type HotelRoom,
  type MealKey,
  mealPlans,
  occupancyLabel,
  getStartingPrice,
  getFormattedBedSummary,
  getTotalBedCapacity,
} from "@/lib/hotel-rooms-logic";

interface RoomCardProps {
  room: HotelRoom;
  onStatusChange?: (id: number, newStatus: HotelRoom["status"]) => void;
  onEdit?: (room: HotelRoom) => void;
  onDelete?: (id: number) => void;
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

export default function RoomCard({ room, onStatusChange, onEdit, onDelete }: RoomCardProps) {
  const [showRatesModal, setShowRatesModal] = useState(false);
  const cfg = statusBadgeConfig[room.status];
  const startingPrice = getStartingPrice(room);
  const bedSummary = getFormattedBedSummary(room.beds);
  const guestCapacity = getTotalBedCapacity(room.beds);
  const coverPhoto = room.photos[0]?.url || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80";

  const handleToggleStatus = () => {
    const nextStatus = room.status === "available" ? "maintenance" : "available";
    onStatusChange?.(room.id, nextStatus);
  };

  return (
    <>
      <div className="rounded-[22px] border border-outline-variant bg-surface-container-low overflow-hidden hover:border-[#001a43]/30 hover:shadow-[0_14px_40px_rgba(0,26,67,0.08)] transition-all duration-300 flex flex-col justify-between group">
        {/* ── Photo Header with Badges ── */}
        <div className="relative h-44 w-full bg-surface-container overflow-hidden">
          <img
            src={coverPhoto}
            alt={room.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/15">
              {room.roomType}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#001a43] text-white border border-white/20">
              {room.quantity} {parseInt(room.quantity, 10) > 1 ? "Units" : "Unit"}
            </span>
          </div>

          {/* Status Pill */}
          <div className="absolute top-2.5 right-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border ${cfg.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
            <div className="truncate pr-2">
              <h4 className="font-black text-sm leading-tight drop-shadow-sm truncate">{room.name}</h4>
              <p className="text-[11px] text-white/80 font-medium mt-0.5">
                {room.size} m² • {room.bathrooms} {parseInt(room.bathrooms, 10) > 1 ? "Baths" : "Bath"}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs font-black text-[#c9a227] dark:text-[#ffd977] block leading-tight">
                {startingPrice}
              </span>
              <span className="text-[9px] text-white/80 block">/ night</span>
            </div>
          </div>
        </div>

        {/* ── Content & Features ── */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          {/* Key Specs */}
          <div className="space-y-1.5 text-xs text-on-surface-variant font-medium">
            <div className="flex items-center gap-1.5 text-on-surface truncate">
              <span className="material-symbols-outlined text-[16px] text-[#001a43] dark:text-primary shrink-0">
                bed
              </span>
              <span className="truncate">{bedSummary}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">group</span>
                <span>Max {guestCapacity} Guests</span>
              </span>
              <button
                type="button"
                onClick={() => setShowRatesModal(true)}
                className="text-[11px] font-bold text-[#001a43] dark:text-primary hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>View Meal Rates</span>
                <span className="material-symbols-outlined text-[13px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Amenities Chips */}
          {room.amenities && room.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant border border-outline-variant/60"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="text-[10px] font-bold text-on-surface-variant px-1 py-0.5">
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>
          )}

          {/* ── Actions ── */}
          <div className="pt-2 border-t border-outline-variant/70 flex items-center justify-between gap-2">
            <button
              onClick={handleToggleStatus}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                room.status === "available"
                  ? "border border-outline-variant text-on-surface-variant hover:bg-surface-container"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              }`}
            >
              {room.status === "available" ? "Hold / Block" : "Release Unit"}
            </button>

            <div className="flex items-center gap-1">
              {onEdit && (
                <button
                  onClick={() => onEdit(room)}
                  className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                  title="Edit Room"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(room.id)}
                  className="p-1.5 text-on-surface-variant hover:text-red-600 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete Room"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Meal Rates Detail Modal (HCI: Progressive Disclosure) ── */}
      {showRatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-2xl border border-outline-variant bg-surface-container-low p-5 shadow-xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <div>
                <h3 className="text-base font-black text-on-surface">{room.name}</h3>
                <p className="text-xs text-on-surface-variant font-medium">
                  Configured pricing across guest occupancy tiers and meal plans (in LKR)
                </p>
              </div>
              <button
                onClick={() => setShowRatesModal(false)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {room.rates.map((rate) => (
                <div
                  key={rate.id}
                  className="p-3.5 rounded-xl border border-outline-variant bg-surface-container/40 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#001a43] dark:text-primary">
                        person
                      </span>
                      <span>
                        {rate.adults} Adult{rate.adults > 1 ? "s" : ""}
                      </span>
                      <span className="text-on-surface-variant text-[11px] font-medium">
                        ({occupancyLabel(rate.adults)})
                      </span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {mealPlans.map((meal) => {
                      const price = rate.prices[meal.key];
                      return (
                        <div
                          key={meal.key}
                          className="p-2 rounded-lg bg-surface-container border border-outline-variant/60"
                        >
                          <span className="text-[10px] text-on-surface-variant font-medium block">
                            {meal.label}
                          </span>
                          <span className="font-bold text-on-surface text-xs mt-0.5 block">
                            {price ? `LKR ${parseInt(price, 10).toLocaleString()}` : "Not Offered"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-outline-variant flex justify-end">
              <button
                onClick={() => setShowRatesModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#001a43] text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
