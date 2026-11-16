"use client";

import Modal from "../shared/Modal";
import StatusBadge from "../shared/StatusBadge";
import type { LocationRequest } from "@/data/admin-data/types";

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div><dt className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{label}</dt><dd className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-on-surface">{value}</dd></div>;
}

function ListDetail({ label, values }: { label: string; values?: string[] }) {
  if (!values?.length) return null;
  return <div><dt className="text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">{label}</dt><dd className="mt-1"><ul className="list-inside list-disc space-y-1 text-xs text-on-surface">{values.map((value) => <li key={value}>{value}</li>)}</ul></dd></div>;
}

export default function LocationReviewModal({ request, onClose }: { request: LocationRequest; onClose: () => void }) {
  return (
    <Modal title={request.name} subtitle={`${request.id} · submitted by ${request.submittedBy}`} onClose={onClose}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={request.status} />
          <span className="rounded-full border border-outline-variant px-2.5 py-1 text-[11px] font-bold text-on-surface-variant">{request.type} submission</span>
        </div>
        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Basic location information</h3>
          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Province" value={request.province} /><Detail label="District" value={request.district} />
            <Detail label="Nearest city / town" value={request.nearestTown} /><Detail label="Address / landmark" value={request.address} />
            <Detail label="Latitude" value={request.latitude} /><Detail label="Longitude" value={request.longitude} />
          </dl>
          <ListDetail label="Categories & themes" values={request.categories} />
        </section>
        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Description & highlights</h3>
          <div className="space-y-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Overview" value={request.description} />
            <ListDetail label="Highlights" values={request.highlights} />
          </div>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Visit details & ticket pricing</h3>
          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-outline-variant bg-surface-container p-4">
            <Detail label="Best time to visit" value={request.bestTime} /><Detail label="Opening days / hours" value={request.openingDays} />
            <Detail label="Local adult (LKR)" value={request.localAdultPrice} /><Detail label="Local child (LKR)" value={request.localChildPrice} />
            <Detail label="Foreign adult (LKR)" value={request.foreignAdultPrice} /><Detail label="Foreign child (LKR)" value={request.foreignChildPrice} />
          </dl>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-extrabold text-on-surface">Nearby stays & travel advice</h3>
          <div className="grid gap-3 rounded-xl border border-outline-variant bg-surface-container p-4 sm:grid-cols-2">
            <ListDetail label="Nearby stays" values={request.nearbyStays} /><ListDetail label="Travel tips" values={request.travelTips} />
          </div>
        </section>
        {request.photos?.length ? (
          <section>
            <h3 className="mb-3 text-sm font-extrabold text-on-surface">Submitted photos ({request.photos.length})</h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{request.photos.map((photo, index) => <img key={`${index}-${photo.slice(0, 20)}`} src={photo} alt={`${request.name} photo ${index + 1}`} className="h-28 w-full rounded-xl object-cover" />)}</div>
          </section>
        ) : null}
      </div>
    </Modal>
  );
}
