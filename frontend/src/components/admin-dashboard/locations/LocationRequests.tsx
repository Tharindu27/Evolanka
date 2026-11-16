"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import Tabs from "../shared/Tabs";
import { formatDate } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import type { LocationRequest, LocationRequestStatus } from "@/data/admin-data/types";
import LocationReviewModal from "./LocationReviewModal";

type Tab = "All" | LocationRequestStatus;

export default function LocationRequests() {
  const { locationRequests, reviewLocationRequest } = useAdminData();
  const [tab, setTab] = useState<Tab>("All");
  const [selectedRequest, setSelectedRequest] = useState<LocationRequest | null>(null);

  const count = (status: LocationRequestStatus) => locationRequests.filter((item) => item.status === status).length;
  const rows = locationRequests.filter((item) => tab === "All" || item.status === tab);

  return (
    <>
      <Panel title="Location Submissions" subtitle="Review location details submitted by tourists, providers and admins">
        <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
          <Tabs<Tab>
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "All", label: "All", count: locationRequests.length },
              { id: "Pending", label: "Pending", count: count("Pending") },
              { id: "Approved", label: "Approved", count: count("Approved") },
              { id: "Rejected", label: "Rejected", count: count("Rejected") },
            ]}
          />
        </div>
        <TableShell headers={["Location name", "Submitted by", "Type", "Status", "Action"]} isEmpty={rows.length === 0} empty="No location submissions in this view.">
          {rows.map((request) => (
            <tr key={request.id}>
              <td>
                <p className="font-bold text-on-surface">{request.name}</p>
                <p className="mt-0.5 text-[11px]">{request.id} · {formatDate(request.submittedOn)}</p>
              </td>
              <td className="font-semibold text-on-surface">{request.submittedBy}</td>
              <td><span className="rounded-full border border-outline-variant bg-surface-container px-2.5 py-1 text-[11px] font-bold">{request.type}</span></td>
              <td><StatusBadge status={request.status} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <ActionButton variant="muted" onClick={() => setSelectedRequest(request)}>Review</ActionButton>
                  {request.status === "Pending" ? (
                    <>
                      <ActionButton onClick={() => reviewLocationRequest(request.id, "Approved")}>Approve</ActionButton>
                      <ActionButton variant="danger" onClick={() => reviewLocationRequest(request.id, "Rejected")}>Reject</ActionButton>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </TableShell>
      </Panel>
      {selectedRequest ? <LocationReviewModal request={selectedRequest} onClose={() => setSelectedRequest(null)} /> : null}
    </>
  );
}
