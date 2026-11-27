"use client";

import Modal from "../shared/Modal";
import StatusBadge from "../shared/StatusBadge";
import { formatDate, formatLkr } from "../shared/utils";
import type { Tourist } from "@/data/admin-data/types";

export default function TouristDetailsModal({ tourist, onClose }: { tourist: Tourist; onClose: () => void }) {
  return (
    <Modal title={tourist.name} subtitle={`${tourist.id} · ${tourist.email}`} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">Booking history</h3>
          {tourist.bookings.length === 0 ? (
            <p className="rounded-xl border border-dashed border-outline-variant p-4 text-center text-xs text-on-surface-variant">No bookings yet.</p>
          ) : (
            <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant">
              {tourist.bookings.map((booking) => (
                <li key={booking.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-on-surface">{booking.service}</p>
                    <p className="text-[11px] text-on-surface-variant">
                      {booking.id} · {formatDate(booking.date)} · {formatLkr(booking.amount)}
                    </p>
                  </div>
                  <StatusBadge status={booking.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">Reviews written</h3>
          {tourist.reviews.length === 0 ? (
            <p className="rounded-xl border border-dashed border-outline-variant p-4 text-center text-xs text-on-surface-variant">No reviews yet.</p>
          ) : (
            <ul className="space-y-3">
              {tourist.reviews.map((review) => (
                <li key={review.service} className="rounded-xl border border-outline-variant p-4">
                  <p className="text-xs font-bold text-on-surface">
                    {review.service} <span className="ml-1 text-[#c9a227]">{"★".repeat(review.rating)}</span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{review.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}
