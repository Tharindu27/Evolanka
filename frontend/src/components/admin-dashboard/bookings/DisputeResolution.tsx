"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import { formatDate, formatLkr } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import { disputes as initialDisputes } from "@/data/admin-data/bookings";

type Outcome = "Refund issued" | "Booking cancelled";

export default function DisputeResolution() {
  const { bookings, setBookingStatus } = useAdminData();
  const [outcomes, setOutcomes] = useState<Record<string, Outcome>>({});

  const resolve = (disputeId: string, bookingId: string, outcome: Outcome) => {
    setBookingStatus(bookingId, outcome === "Refund issued" ? "Refunded" : "Cancelled");
    setOutcomes((items) => ({ ...items, [disputeId]: outcome }));
  };

  const open = initialDisputes.filter((item) => !outcomes[item.id]).length;

  return (
    <Panel
      title="Dispute Resolution"
      subtitle="Step in when a tourist and provider cannot agree"
      action={
        <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-extrabold text-rose-500">{open} open</span>
      }
    >
      <ul className="divide-y divide-outline-variant">
        {initialDisputes.map((dispute) => {
          const booking = bookings.find((item) => item.id === dispute.bookingId);
          const outcome = outcomes[dispute.id];
          if (!booking) return null;
          return (
            <li key={dispute.id} className="flex flex-col gap-4 p-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 space-y-1.5">
                <p className="text-sm font-bold text-on-surface">
                  {dispute.id} · {booking.service}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {booking.id} · {booking.tourist} vs {booking.provider} · {formatLkr(booking.amount)} · opened {formatDate(dispute.openedOn)}
                </p>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  <span className="font-bold text-on-surface">Raised by {dispute.raisedBy.toLowerCase()}:</span> {dispute.reason}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {outcome ? (
                  <>
                    <StatusBadge status="Resolved" />
                    <span className="text-xs font-semibold text-on-surface-variant">{outcome}</span>
                  </>
                ) : (
                  <>
                    <ActionButton onClick={() => resolve(dispute.id, booking.id, "Refund issued")}>Refund tourist</ActionButton>
                    <ActionButton variant="danger" onClick={() => resolve(dispute.id, booking.id, "Booking cancelled")}>
                      Cancel booking
                    </ActionButton>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
