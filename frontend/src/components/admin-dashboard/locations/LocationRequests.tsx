"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import Tabs from "../shared/Tabs";
import { formatDate } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import { getErrorMessage } from "@/lib/api";
import type { LocationStatusCode } from "@/lib/locations-api";
import { statusLabel, submitterLabel } from "./location-labels";
import LocationReviewModal from "./LocationReviewModal";

type Tab = "All" | Exclude<LocationStatusCode, "DRAFT">;

export default function LocationRequests() {
  const { locations, locationsLoading, locationsError, approveLocation, rejectLocation, reviseLocation } = useAdminData();
  const [tab, setTab] = useState<Tab>("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revisingId, setRevisingId] = useState<number | null>(null);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const selected = locations.find((item) => item.id === selectedId) ?? null;
  const count = (status: LocationStatusCode) => locations.filter((item) => item.status === status).length;
  const rows = locations.filter((item) => tab === "All" || item.status === tab);

  const revise = async (id: number, name: string) => {
    setRevisingId(id);
    setNotice(null);
    try {
      await reviseLocation(id);
      setNotice({ tone: "ok", text: `${name} was moved back to Pending. You can review it again.` });
    } catch (error) {
      setNotice({ tone: "error", text: getErrorMessage(error) });
    } finally {
      setRevisingId(null);
    }
  };

  return (
    <>
      <Panel title="Location Submissions" subtitle="Review location details submitted by tourists, providers and admins">
        <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
          <Tabs<Tab>
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "All", label: "All", count: locations.length },
              { id: "PENDING", label: "Pending", count: count("PENDING") },
              { id: "APPROVED", label: "Approved", count: count("APPROVED") },
              { id: "REJECTED", label: "Rejected", count: count("REJECTED") },
            ]}
          />
        </div>
        {notice ? (
          <p role="status" className={`border-b border-outline-variant px-5 py-3 text-xs font-semibold sm:px-6 ${notice.tone === "ok" ? "text-emerald-400" : "text-rose-400"}`}>{notice.text}</p>
        ) : null}
        {locationsError ? <p role="alert" className="border-b border-outline-variant px-5 py-3 text-xs font-semibold text-rose-400 sm:px-6">{locationsError}</p> : null}
        <TableShell
          headers={["Location name", "Submitted by", "Type", "Status", "Action"]}
          isEmpty={rows.length === 0}
          empty={locationsLoading ? "Loading location submissions…" : "No location submissions in this view."}
        >
          {rows.map((location) => (
            <tr key={location.id}>
              <td>
                <p className="font-bold text-on-surface">{location.name}</p>
                <p className="mt-0.5 text-[11px]">#{location.id} · {formatDate(location.submittedAt)}</p>
              </td>
              <td className="font-semibold text-on-surface">{location.submitterName}</td>
              <td><span className="rounded-full border border-outline-variant bg-surface-container px-2.5 py-1 text-[11px] font-bold">{submitterLabel[location.submitterType]}</span></td>
              <td><StatusBadge status={statusLabel[location.status]} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <ActionButton variant="muted" onClick={() => { setNotice(null); setSelectedId(location.id); }}>Review</ActionButton>
                  {location.status === "APPROVED" ? (
                    <ActionButton variant="gold" disabled={revisingId === location.id} onClick={() => void revise(location.id, location.name)}>
                      {revisingId === location.id ? "Revising…" : "Revised"}
                    </ActionButton>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </TableShell>
      </Panel>
      {selected ? (
        <LocationReviewModal
          location={selected}
          onClose={() => setSelectedId(null)}
          onApprove={approveLocation}
          onReject={rejectLocation}
          onDecided={(text) => setNotice({ tone: "ok", text })}
        />
      ) : null}
    </>
  );
}
