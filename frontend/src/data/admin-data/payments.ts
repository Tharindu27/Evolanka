import type { Payout, Transaction } from "./types";

export const transactions: Transaction[] = [
  { id: "TX-76312", bookingId: "BK-8920", method: "Visa •• 4082", gateway: "PayHere", amount: 84000, date: "2026-11-12", status: "Paid" },
  { id: "TX-76311", bookingId: "BK-8917", method: "Mastercard •• 2091", gateway: "Stripe", amount: 66000, date: "2026-11-12", status: "Paid" },
  { id: "TX-76310", bookingId: "BK-8921", method: "Visa •• 6230", gateway: "PayHere", amount: 18500, date: "2026-11-11", status: "Pending" },
  { id: "TX-76309", bookingId: "BK-8918", method: "Visa •• 1190", gateway: "PayHere", amount: 9500, date: "2026-11-11", status: "Paid" },
  { id: "TX-76308", bookingId: "BK-8915", method: "Mastercard •• 7741", gateway: "Stripe", amount: 11000, date: "2026-11-08", status: "Refunded" },
  { id: "TX-76307", bookingId: "BK-8913", method: "Visa •• 3382", gateway: "PayHere", amount: 15000, date: "2026-11-07", status: "Failed" },
];

export const payouts: Payout[] = [
  { id: "PO-512", provider: "Ceylon Ridge Villas", period: "Nov 1 – Nov 12", gross: 642000, method: "Bank •• 8291", status: "Pending" },
  { id: "PO-511", provider: "Island Trail Guides", period: "Nov 1 – Nov 12", gross: 388500, method: "Bank •• 1104", status: "Pending" },
  { id: "PO-510", provider: "Kandy Heritage Stay", period: "Oct 16 – Oct 31", gross: 274000, method: "Bank •• 4377", status: "Paid" },
  { id: "PO-509", provider: "Lanka Ride Co.", period: "Oct 16 – Oct 31", gross: 198000, method: "Bank •• 6620", status: "Paid" },
];
