"use client";

import { useState, useMemo } from "react";

export interface BookingDetail {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestCountry: string;
  roomName: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsCount: number;
  status: "confirmed" | "checked_in" | "departing" | "pending" | "cancelled";
  paymentStatus: "paid" | "partial" | "pay_at_property";
  totalAmount: string;
  specialRequests?: string;
}

const mockBookingsData: BookingDetail[] = [
  {
    id: "EVO-8921",
    guestName: "Alexander Wright",
    guestEmail: "a.wright@londontech.uk",
    guestPhone: "+44 7911 123456",
    guestCountry: "United Kingdom",
    roomName: "Ocean Villa 102",
    roomNumber: "102",
    roomType: "Private Pool Villa",
    checkIn: "2026-10-24",
    checkOut: "2026-10-28",
    nights: 4,
    guestsCount: 2,
    status: "checked_in",
    paymentStatus: "paid",
    totalAmount: "LKR 280,000",
    specialRequests: "Airport transfer from BIA requested; vegan breakfast preference.",
  },
  {
    id: "EVO-8922",
    guestName: "Elena Rostova",
    guestEmail: "elena.r@nordicmail.se",
    guestPhone: "+46 8 123 4567",
    guestCountry: "Sweden",
    roomName: "Deluxe Suite 304",
    roomNumber: "304",
    roomType: "Ocean Deluxe Suite",
    checkIn: "2026-10-24",
    checkOut: "2026-10-27",
    nights: 3,
    guestsCount: 2,
    status: "checked_in",
    paymentStatus: "paid",
    totalAmount: "LKR 165,000",
    specialRequests: "High floor quiet room; celebrating anniversary.",
  },
  {
    id: "EVO-8925",
    guestName: "Samantha Jayawardena",
    guestEmail: "samantha.j@colombocorp.lk",
    guestPhone: "+94 77 987 6543",
    guestCountry: "Sri Lanka",
    roomName: "Penthouse 501",
    roomNumber: "501",
    roomType: "Presidential Sky Suite",
    checkIn: "2026-10-25",
    checkOut: "2026-10-30",
    nights: 5,
    guestsCount: 4,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: "LKR 450,000",
    specialRequests: "Late check-in expected around 8:00 PM.",
  },
  {
    id: "EVO-8928",
    guestName: "Marcus Lindqvist",
    guestEmail: "marcus.l@stockholm.se",
    guestPhone: "+46 70 890 1234",
    guestCountry: "Sweden",
    roomName: "Garden Villa 108",
    roomNumber: "108",
    roomType: "Garden Villa",
    checkIn: "2026-10-20",
    checkOut: "2026-10-24",
    nights: 4,
    guestsCount: 2,
    status: "departing",
    paymentStatus: "paid",
    totalAmount: "LKR 300,000",
    specialRequests: "Express check-out and taxi to Colombo Fort station.",
  },
  {
    id: "EVO-8931",
    guestName: "Niroshan Perera",
    guestEmail: "niro.perera@gmail.com",
    guestPhone: "+94 71 234 5678",
    guestCountry: "Sri Lanka",
    roomName: "Heritage Suite 201",
    roomNumber: "201",
    roomType: "Ceylon Heritage Double",
    checkIn: "2026-10-26",
    checkOut: "2026-10-28",
    nights: 2,
    guestsCount: 2,
    status: "pending",
    paymentStatus: "pay_at_property",
    totalAmount: "LKR 76,000",
    specialRequests: "Early check-in request if room is vacated.",
  },
  {
    id: "EVO-8934",
    guestName: "Claire Dumont",
    guestEmail: "c.dumont@paris.fr",
    guestPhone: "+33 6 12 34 56 78",
    guestCountry: "France",
    roomName: "Lagoon Villa 104",
    roomNumber: "104",
    roomType: "Private Pool Villa",
    checkIn: "2026-11-01",
    checkOut: "2026-11-06",
    nights: 5,
    guestsCount: 2,
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: "LKR 475,000",
  },
];

const statusStyles = {
  confirmed: {
    label: "Confirmed",
    pill: "bg-[#001a43]/10 text-[#001a43] dark:bg-primary/20 dark:text-primary border-[#001a43]/20",
    dot: "bg-[#001a43] dark:bg-primary",
  },
  checked_in: {
    label: "Checked In",
    pill: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  departing: {
    label: "Departing Today",
    pill: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    dot: "bg-amber-500",
  },
  pending: {
    label: "Pending",
    pill: "bg-[#c9a227]/15 text-[#b08d1f] dark:text-[#ffd977] border-[#c9a227]/30",
    dot: "bg-[#c9a227]",
  },
  cancelled: {
    label: "Cancelled",
    pill: "bg-red-500/10 text-red-500 border-red-500/20",
    dot: "bg-red-500",
  },
};

const paymentStyles = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  partial: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  pay_at_property: "bg-surface-container text-on-surface-variant border-outline-variant",
};

interface BookingsManagerProps {
  hotelId?: string;
}

export default function BookingsManager({ hotelId }: BookingsManagerProps) {
  const [bookings, setBookings] = useState<BookingDetail[]>(mockBookingsData);
  const [search, setSearch] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<BookingDetail | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = search.toLowerCase();
      const matchesSearch =
        b.guestName.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.roomName.toLowerCase().includes(q) ||
        b.roomNumber.includes(q);

      const matchesStatus = filterStatus === "all" || b.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, filterStatus]);

  const stats = useMemo(() => {
    return {
      total: bookings.length,
      active: bookings.filter((b) => b.status === "checked_in").length,
      arriving: bookings.filter((b) => b.status === "confirmed").length,
      pending: bookings.filter((b) => b.status === "pending").length,
    };
  }, [bookings]);

  const updateBookingStatus = (id: string, newStatus: BookingDetail["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Total Bookings</div>
          <div className="text-2xl font-black text-on-surface mt-1">{stats.total}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">This billing cycle</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Checked In Now</div>
          <div className="text-2xl font-black text-[#001a43] dark:text-primary mt-1">{stats.active}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">In-house guests</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Upcoming Confirmed</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.arriving}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Arriving next 7 days</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Pending Approvals</div>
          <div className="text-2xl font-black text-amber-500 dark:text-amber-400 mt-1">{stats.pending}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Awaiting host review</div>
        </div>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-[0_10px_30px_rgba(0,26,67,0.04)]">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by guest name, reservation ID, or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container border border-outline-variant text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-[#001a43] dark:focus:border-primary transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container rounded-full border border-outline-variant">
          {["all", "checked_in", "confirmed", "departing", "pending", "cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                filterStatus === st
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {st === "all" ? "All Bookings" : st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* ── Bookings Data Table ── */}
      <div className="rounded-[24px] border border-outline-variant bg-surface-container-low overflow-hidden shadow-[0_10px_30px_rgba(0,26,67,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container/60 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                <th className="py-3 px-4">Booking ID</th>
                <th className="py-3 px-4">Guest Info</th>
                <th className="py-3 px-4">Room &amp; Type</th>
                <th className="py-3 px-4">Stay Dates</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl block mb-2 text-on-surface-variant">
                      event_busy
                    </span>
                    No reservations matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const st = statusStyles[b.status];
                  return (
                    <tr
                      key={b.id}
                      className="group hover:bg-surface-container/60 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#001a43] dark:text-primary">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-on-surface">{b.guestName}</div>
                        <div className="text-[11px] text-on-surface-variant">{b.guestCountry}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-on-surface">Room {b.roomNumber}</div>
                        <div className="text-[11px] text-on-surface-variant">{b.roomType}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-xs text-on-surface font-semibold">
                          {b.checkIn} → {b.checkOut}
                        </div>
                        <div className="text-[11px] text-on-surface-variant font-medium">
                          {b.nights} nights · {b.guestsCount} guests
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${st.pill}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} />
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${paymentStyles[b.paymentStatus]}`}
                        >
                          {b.paymentStatus.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-on-surface">
                        {b.totalAmount}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedBooking(b)}
                            className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                            title="View Booking Details"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              visibility
                            </span>
                          </button>
                          {b.status === "confirmed" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "checked_in")}
                              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#001a43] text-white hover:bg-[#002766] transition-colors dark:bg-primary dark:text-on-primary cursor-pointer"
                            >
                              Check In
                            </button>
                          )}
                          {b.status === "checked_in" && (
                            <button
                              onClick={() => updateBookingStatus(b.id, "departing")}
                              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#c9a227] text-[#001a43] hover:bg-[#d8b030] transition-colors cursor-pointer"
                            >
                              Check Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Detail Modal Drawer ── */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-[26px] border border-outline-variant bg-surface-container-low p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-outline-variant pb-4">
              <div>
                <span className="text-xs font-mono text-[#001a43] dark:text-primary font-bold">
                  {selectedBooking.id}
                </span>
                <h3 className="text-lg font-black text-on-surface mt-0.5">Reservation Details</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl bg-surface-container p-3.5 border border-outline-variant">
                <span className="text-on-surface-variant uppercase text-[10px] font-bold">Guest Name</span>
                <div className="font-bold text-on-surface text-sm mt-0.5">
                  {selectedBooking.guestName}
                </div>
                <div className="text-on-surface-variant mt-0.5">{selectedBooking.guestEmail}</div>
                <div className="text-on-surface-variant">{selectedBooking.guestPhone}</div>
              </div>

              <div className="rounded-2xl bg-surface-container p-3.5 border border-outline-variant">
                <span className="text-on-surface-variant uppercase text-[10px] font-bold">Room Allocated</span>
                <div className="font-bold text-on-surface text-sm mt-0.5">
                  Room {selectedBooking.roomNumber}
                </div>
                <div className="text-on-surface-variant mt-0.5">{selectedBooking.roomName}</div>
                <div className="text-on-surface-variant">{selectedBooking.roomType}</div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-container p-3.5 border border-outline-variant text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Stay Period:</span>
                <span className="font-semibold text-on-surface">
                  {selectedBooking.checkIn} to {selectedBooking.checkOut} ({selectedBooking.nights}{" "}
                  nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Guests:</span>
                <span className="font-semibold text-on-surface">
                  {selectedBooking.guestsCount} Persons
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Total Bill:</span>
                <span className="font-black text-on-surface text-sm">
                  {selectedBooking.totalAmount}
                </span>
              </div>
            </div>

            {selectedBooking.specialRequests && (
              <div className="rounded-2xl bg-surface-container p-3.5 border border-outline-variant text-xs">
                <span className="font-bold text-[#001a43] dark:text-primary block mb-1">Guest Special Requests:</span>
                <p className="text-on-surface-variant italic">{selectedBooking.specialRequests}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-outline-variant text-on-surface hover:bg-surface-container cursor-pointer"
              >
                Close
              </button>
              {selectedBooking.status === "confirmed" && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, "checked_in")}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary shadow-sm cursor-pointer"
                >
                  Confirm Check In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
