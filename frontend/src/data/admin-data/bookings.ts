import type { Booking, Dispute } from "./types";

export const bookings: Booking[] = [
  { id: "BK-8921", tourist: "Amaya Perera", provider: "Island Trail Guides", service: "Ella Sunrise & Tea Country Tour", date: "2026-11-16", amount: 18500, status: "Pending" },
  { id: "BK-8920", tourist: "Liam Walker", provider: "Ceylon Ridge Villas", service: "The Banyan House · 2 nights", date: "2026-11-17", amount: 84000, status: "Confirmed" },
  { id: "BK-8919", tourist: "Nethmi Silva", provider: "Lanka Ride Co.", service: "Airport transfer · Prius", date: "2026-11-14", amount: 12000, status: "Completed" },
  { id: "BK-8918", tourist: "Oliver James", provider: "Lanka Ride Co.", service: "Colombo to Kandy transfer", date: "2026-11-13", amount: 9500, status: "Pending" },
  { id: "BK-8917", tourist: "Mila Chen", provider: "Kandy Heritage Stay", service: "Deluxe Room · 3 nights", date: "2026-11-20", amount: 66000, status: "Confirmed" },
  { id: "BK-8916", tourist: "Amaya Perera", provider: "Sigiriya Safari Co.", service: "Minneriya Safari Jeep", date: "2026-11-09", amount: 14000, status: "Completed" },
  { id: "BK-8915", tourist: "Liam Walker", provider: "Southern Wave Taxis", service: "Galle day trip", date: "2026-11-08", amount: 11000, status: "Cancelled" },
  { id: "BK-8914", tourist: "Sofia Rossi", provider: "Island Trail Guides", service: "Sigiriya & Dambulla Cultural Tour", date: "2026-11-05", amount: 22500, status: "Completed" },
];

export const disputes: Dispute[] = [
  { id: "DS-210", bookingId: "BK-8918", raisedBy: "Tourist", reason: "Driver did not arrive at the pickup point and could not be reached.", openedOn: "2026-11-13" },
  { id: "DS-209", bookingId: "BK-8920", raisedBy: "Provider", reason: "Guest requested a third night after check-in but refused the revised rate.", openedOn: "2026-11-12" },
];
