"use client";

import { useState } from "react";
import { statusLabel, submitterLabel } from "./location-labels";
import ActionButton from "../shared/ActionButton";
import Modal from "../shared/Modal";
import StatusBadge from "../shared/StatusBadge";
import { formatDate, inputClass } from "../shared/utils";
import { getErrorMessage } from "@/lib/api";
import type { LocationDecision } from "@/lib/admin-api";
import type { ApiLocation } from "@/lib/locations-api";

function Detail({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return <div><dt className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-on-surface">{value}</dd></div>;
}

function ListDetail({ label, values }: { label: string; values?: string[] }) {
  if (!values?.length) return null;
  return <div><dt className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{label}</dt><dd className="mt-1"><ul className="list-inside list-disc space-y-1 text-xs text-on-surface">{values.map((value) => <li key={value}>{value}</li>)}</ul></dd></div>;
}

interface LocationReviewModalProps {
  location: ApiLocation;
  onClose: () => void;
  onApprove: (id: number) => Promise<LocationDecision>;
  onReject: (id: number, reason?: string) => Promise<LocationDecision>;
  /** Called after a decision so the page can show what happened (including the email result). */
  onDecided: (message: string) => void;
}

const emailNote = (decision: LocationDecision) => {
  if (decision.emailSent === null) return "";
  return decision.emailSent
    ? ` An email was sent to ${decision.recipientEmail}.`
    : ` The email to ${decision.recipientEmail} could not be sent.`;
};

export default function LocationReviewModal({ location, onClose, onApprove, onReject, onDecided }: LocationReviewModalProps) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const cover = location.photos.find((photo) => photo.isCover) ?? location.photos[0];
  const others = location.photos.filter((photo) => photo.id !== cover?.id);
  const prices = [
    ["Local adult (LKR)", location.localAdultPrice],
    ["Local child (LKR)", location.localChildPrice],
    ["Foreign adult (LKR)", location.foreignAdultPrice],
    ["Foreign child (LKR)", location.foreignChildPrice],
  ] as const;

  const decide = async (approve: boolean) => {
    setBusy(true);
    setError("");
    try {
      const decision = approve ? await onApprove(location.id) : await onReject(location.id, reason.trim() || undefined);
      onDecided(`${location.name} was ${approve ? "approved" : "rejected"}.${emailNote(decision)}`);
      onClose();
    } catch (decisionError) {
      setError(getErrorMessage(decisionError));
      setBusy(false);
    }
  };

  const footer =
    location.status === "PENDING" ? (
      rejecting ? (
        <>
          <ActionButton variant="muted" disabled={busy} onClick={() => { setRejecting(false); setError(""); }}>Back</ActionButton>
          <ActionButton variant="danger" disabled={busy} onClick={() => void decide(false)}>{busy ? "Rejecting…" : "Confirm rejection"}</ActionButton>
        </>
      ) : (
        <>
          <ActionButton variant="danger" disabled={busy} onClick={() => setRejecting(true)}>Reject</ActionButton>
          <ActionButton disabled={busy} onClick={() => void decide(true)}>{busy ? "Approving…" : "Approve"}</ActionButton>
        </>
      )
    ) : (
      <ActionButton variant="muted" onClick={onClose}>Close</ActionButton>
    );

  return (
    <Modal title={location.name} subtitle={`#${location.id} · submitted by ${location.submitterName} on ${formatDate(location.submittedAt)}`} onClose={onClose} footer={footer}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={statusLabel[location.status]} />
          <span className="rounded-full border border-outline-variant px-2.5 py-1 text-[11px] font-bold text-on-surface-variant">{submitterLabel[location.submitterType]} submission</span>
        </div>

        {location.status === "REJECTED" && location.rejectionReason ? (
          <p className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-xs text-rose-300"><strong>Rejection reason:</strong> {location.rejectionReason}</p>
        ) : null}

        {location.photos.length ? (
          <section>
            <h3 className="mb-3 text-sm font-extrabold text-on-surface">Photos ({location.photos.length})</h3>
            {cover ? <a href={cover.url} target="_blank" rel="noreferrer"><img src={cover.url} alt={`${location.name} cover`} className="h-56 w-full rounded-xl object-cover" /></a> : null}
            {others.length ? (
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {others.map((photo, index) => <a key={photo.id} href={photo.url} target="_blank" rel="noreferrer"><img src={photo.url} alt={`${location.name} photo ${index + 2}`} className="h-20 w-full rounded-lg object-cover" /></a>)}
              </div>
            ) : null}
          </section>
        ) : (
          <p className="rounded-xl border border-outline-variant bg-surface-container px-4 py-3 text-xs text-on-surface-variant">No photos were uploaded.</p>
        )}

        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Basic location information</h3>
          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Province" value={location.province} /><Detail label="District" value={location.district} />
            <Detail label="Nearest city / town" value={location.nearestTown} /><Detail label="Address / landmark" value={location.address} />
            <Detail label="Latitude" value={location.latitude} /><Detail label="Longitude" value={location.longitude} />
          </dl>
          <div className="mt-3"><ListDetail label="Categories & themes" values={location.categories} /></div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Description & highlights</h3>
          <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Overview" value={location.description} />
            <ListDetail label="Highlights" values={location.highlights} />
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Visit details & ticket pricing</h3>
          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Best time to visit" value={location.bestTime} /><Detail label="Opening days / hours" value={location.openingDays} />
            {location.freeEntry ? <Detail label="Entry" value="Free entry" /> : prices.map(([label, value]) => <Detail key={label} label={label} value={value} />)}
            <Detail label="Ticket note" value={location.ticketNote} />
          </dl>
        </section>

        {location.travelTips.length ? (
          <section>
            <h3 className="mb-3 text-sm font-extrabold text-on-surface">Travel tips</h3>
            <div className="rounded-xl border border-outline-variant bg-surface-container p-4"><ListDetail label="Tips" values={location.travelTips} /></div>
          </section>
        ) : null}

        {rejecting ? (
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-bold text-on-surface-variant">Reason for rejection (included in the email, optional)</span>
            <textarea aria-label="Reason for rejection" value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} rows={3} placeholder="e.g. The photos are too blurry. Please upload clearer images." className={inputClass} />
          </label>
        ) : null}

        {error ? <p role="alert" className="text-xs font-semibold text-rose-400">{error}</p> : null}
      </div>
    </Modal>
  );
}
