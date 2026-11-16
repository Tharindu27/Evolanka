"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import SearchInput from "../shared/SearchInput";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import Tabs from "../shared/Tabs";
import { formatDate } from "../shared/utils";
import TouristDetailsModal from "./TouristDetailsModal";
import { tourists as initialTourists } from "@/data/admin-data/tourists";
import type { TouristStatus } from "@/data/admin-data/types";

type Tab = "all" | TouristStatus;

export default function TouristsManager() {
  const [tourists, setTourists] = useState(initialTourists);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const setStatus = (id: string, status: TouristStatus) =>
    setTourists((items) => items.map((item) => (item.id === id ? { ...item, status } : item)));
  const count = (status: TouristStatus) => tourists.filter((item) => item.status === status).length;

  const rows = tourists
    .filter((item) => tab === "all" || item.status === tab)
    .filter((item) => `${item.name} ${item.email} ${item.country}`.toLowerCase().includes(query.toLowerCase()));
  const selected = tourists.find((item) => item.id === selectedId) ?? null;

  return (
    <>
      <Panel
        title="Tourist Accounts"
        subtitle="Everyone who registered with Google, Apple or email"
        action={<SearchInput value={query} onChange={setQuery} placeholder="Search tourists" />}
      >
        <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
          <Tabs<Tab>
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "all", label: "All", count: tourists.length },
              { id: "Active", label: "Active", count: count("Active") },
              { id: "Restricted", label: "Restricted", count: count("Restricted") },
              { id: "Banned", label: "Banned", count: count("Banned") },
            ]}
          />
        </div>
        <TableShell headers={["Tourist", "Signed up with", "Joined", "Bookings", "Status", "Actions"]} isEmpty={rows.length === 0} empty="No tourists match.">
          {rows.map((tourist) => (
            <tr key={tourist.id}>
              <td>
                <p className="font-bold text-on-surface">{tourist.name}</p>
                <p className="mt-0.5 text-[11px]">{tourist.email} · {tourist.country}</p>
              </td>
              <td>{tourist.signupMethod}</td>
              <td>{formatDate(tourist.joinedOn)}</td>
              <td className="font-bold text-on-surface">{tourist.bookings.length}</td>
              <td><StatusBadge status={tourist.status} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  <ActionButton variant="muted" onClick={() => setSelectedId(tourist.id)}>History</ActionButton>
                  {tourist.status === "Active" ? (
                    <>
                      <ActionButton variant="gold" onClick={() => setStatus(tourist.id, "Restricted")}>Restrict</ActionButton>
                      <ActionButton variant="danger" onClick={() => setStatus(tourist.id, "Banned")}>Ban</ActionButton>
                    </>
                  ) : (
                    <ActionButton onClick={() => setStatus(tourist.id, "Active")}>Restore</ActionButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </TableShell>
      </Panel>

      {selected ? <TouristDetailsModal key={selected.id} tourist={selected} onClose={() => setSelectedId(null)} /> : null}
    </>
  );
}
