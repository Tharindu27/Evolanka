"use client";

import { useState } from "react";
import Link from "next/link";

export interface BookingRow {
  id: string;
  guestName: string;
  guestAvatar: string;
  roomName: string;
  roomType: string;
  dates: string;
  nights: string;
  status: "checked_in" | "confirmed" | "pending";
  paymentAmount: string;
  paymentType: "paid_online" | "pay_at_property";
}

const bookingsData: BookingRow[] = [
  {
    id: "#EVO-8821",
    guestName: "Kavinda Fernando",
    guestAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    roomName: "Presidential Ocean Villa",
    roomType: "Villa 04 · King Bed",
    dates: "Oct 14 - Oct 18, 2026",
    nights: "4 Nights",
    status: "checked_in",
    paymentAmount: "LKR 184,000",
    paymentType: "paid_online",
  },
  {
    id: "#EVO-8822",
    guestName: "Sophie Montgomery",
    guestAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    roomName: "Deluxe King Suite",
    roomType: "Suite 512 · Sea View",
    dates: "Oct 14 - Oct 17, 2026",
    nights: "3 Nights",
    status: "confirmed",
    paymentAmount: "LKR 96,500",
    paymentType: "paid_online",
  },
  {
    id: "#EVO-8824",
    guestName: "Hiroshi Tanaka",
    guestAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    roomName: "Executive Premier Room",
    roomType: "Room 304 · City Skyline",
    dates: "Oct 14 - Oct 20, 2026",
    nights: "6 Nights",
    status: "pending",
    paymentAmount: "LKR 142,000",
    paymentType: "pay_at_property",
  },
  {
    id: "#EVO-8827",
    guestName: "Ananya & Rohan Mehta",
    guestAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    roomName: "Presidential Ocean Villa",
    roomType: "Villa 02 · Private Plunge",
    dates: "Oct 14 - Oct 19, 2026",
    nights: "5 Nights",
    status: "checked_in",
    paymentAmount: "LKR 230,000",
    paymentType: "paid_online",
  },
  {
    id: "#EVO-8830",
    guestName: "Claire Beaumont",
    guestAvatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
    roomName: "Deluxe King Suite",
    roomType: "Suite 408 · Garden Balcony",
    dates: "Oct 14 - Oct 16, 2026",
    nights: "2 Nights",
    status: "confirmed",
    paymentAmount: "LKR 64,000",
    paymentType: "paid_online",
  },
];

interface BookingsTableProps {
  hotelId: string;
}

export default function BookingsTable({ hotelId }: BookingsTableProps) {
  const [filter, setFilter] = useState<"all" | "arriving" | "in_house">("all");
  const [items, setItems] = useState<BookingRow[]>(bookingsData);

  const filteredItems = items.filter((b) => {
    if (filter === "arriving") return b.status === "confirmed";
    if (filter === "in_house") return b.status === "checked_in";
    return true;
  });

  const handleCheckIn = (id: string) => {
    setItems((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "checked_in" } : b))
    );
  };

  return (
    <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-on-surface">Live Bookings &amp; Recent Arrivals</h2>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            Manage today&apos;s guest check-ins and verified reservation lifecycle
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-surface-container rounded-full border border-outline-variant">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            All (38)
          </button>
          <button
            onClick={() => setFilter("arriving")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === "arriving"
                ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            Arriving Today (14)
          </button>
          <button
            onClick={() => setFilter("in_house")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === "in_house"
                ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
            }`}
          >
            In-House (24)
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              <th className="py-2.5 px-3">Guest &amp; Ref</th>
              <th className="py-2.5 px-3">Room Type</th>
              <th className="py-2.5 px-3">Dates</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Payment</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((b) => (
              <tr
                key={b.id}
                className="bg-surface-container/50 hover:bg-surface-container transition-colors rounded-xl"
              >
                <td className="py-3 px-3 rounded-l-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={b.guestAvatar}
                      alt={b.guestName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-outline-variant"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-on-surface text-xs truncate">
                        {b.guestName}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-mono">{b.id}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-col">
                    <span className="text-on-surface text-xs font-bold">{b.roomName}</span>
                    <span className="text-[11px] text-on-surface-variant">{b.roomType}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="text-[11px] text-on-surface-variant block leading-relaxed">
                    {b.dates}
                    <br />
                    <strong className="text-on-surface font-bold">{b.nights}</strong>
                  </span>
                </td>
                <td className="py-3 px-3">
                  {b.status === "checked_in" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Checked-in
                    </span>
                  )}
                  {b.status === "confirmed" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-[#001a43]/10 text-[#001a43] dark:bg-primary/20 dark:text-primary border border-[#001a43]/20 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#001a43] dark:bg-primary" />
                      Confirmed
                    </span>
                  )}
                  {b.status === "pending" && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-[#c9a227]/15 text-[#b08d1f] dark:text-[#ffd977] border border-[#c9a227]/30 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-on-surface">
                      {b.paymentAmount}
                    </span>
                    {b.paymentType === "paid_online" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#001a43] dark:text-primary font-bold">
                        <span className="material-symbols-outlined text-[13px]">check_circle</span>
                        Paid (Online)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-500 dark:text-amber-400 font-bold">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        Pay at Property
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-3 rounded-r-xl text-right">
                  {b.status === "confirmed" ? (
                    <button
                      onClick={() => handleCheckIn(b.id)}
                      className="px-3.5 py-1.5 rounded-full bg-[#001a43] text-white text-xs font-bold hover:bg-[#002766] transition-all shadow-sm dark:bg-primary dark:text-on-primary cursor-pointer"
                    >
                      Check In
                    </button>
                  ) : (
                    <button
                      className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                      title="Options"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-outline-variant text-xs">
        <span className="text-on-surface-variant font-medium">
          Displaying {filteredItems.length} of 38 Active Reservations
        </span>
        <Link
          href={`/dashboard/hotel-owner/${hotelId}/bookings`}
          className="text-[#001a43] dark:text-primary hover:underline inline-flex items-center gap-1 font-bold"
        >
          View All Reservations
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
