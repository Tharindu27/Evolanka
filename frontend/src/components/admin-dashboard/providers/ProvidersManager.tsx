"use client";

import { useMemo, useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import { useAdminData } from "../AdminDataProvider";
import ProviderListingsView from "./ProviderListingsView";
import { formatDate } from "../shared/utils";

const selectClass = "rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:border-primary";
const inputClass = "rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-xs text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary";

function displayType(type: string) {
  return type === "Vehicle Rental" ? "Rental" : type;
}

export default function ProvidersManager() {
  const { providers, setProviderStatus } = useAdminData();
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [listingProviderId, setListingProviderId] = useState<string | null>(null);
  const listingProvider = providers.find((item) => item.id === listingProviderId) ?? null;

  const rows = useMemo(() => providers.filter((provider) => {
    const matchesName = `${provider.name} ${provider.email}`.toLowerCase().includes(nameFilter.trim().toLowerCase());
    const matchesType = typeFilter === "All" || displayType(provider.type) === typeFilter;
    const matchesStatus = statusFilter === "All" || provider.status === statusFilter;
    return matchesName && matchesType && matchesStatus;
  }), [providers, nameFilter, typeFilter, statusFilter]);

  if (listingProvider) {
    return <ProviderListingsView initialProvider={listingProvider} onBack={() => setListingProviderId(null)} />;
  }

  return (
    <Panel title="Service Providers" subtitle={`${rows.length} providers match the selected filters`}>
      <div className="grid gap-3 border-b border-outline-variant p-4 sm:grid-cols-3">
        <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
          Provider name
          <input aria-label="Filter by provider name" value={nameFilter} onChange={(event) => setNameFilter(event.target.value)} placeholder="Search provider or email" className={`w-full ${inputClass}`} />
        </label>
        <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
          Type
          <select aria-label="Filter providers by type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className={`w-full ${selectClass}`}>
            <option>All</option><option>Hotel</option><option>Tour Guide</option><option>Rental</option><option>Taxi</option>
          </select>
        </label>
        <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
          Status
          <select aria-label="Filter providers by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={`w-full ${selectClass}`}>
            <option>All</option><option>Pending</option><option>Active</option><option>Restricted</option><option>Banned</option>
          </select>
        </label>
      </div>
      <TableShell headers={["Provider name", "Email", "Joined", "Status", "Action"]} isEmpty={rows.length === 0} empty="No providers match these filters.">
        {rows.map((provider) => {
          const currentStatus = provider.status;
          return (
            <tr key={provider.id}>
              <td><p className="font-bold text-on-surface">{provider.name}</p><p className="mt-0.5 text-[11px]">{provider.id}</p></td>
              <td className="text-on-surface">{provider.email}</td>
              <td>{formatDate(provider.registeredOn)}</td>
              <td><StatusBadge status={currentStatus} /></td>
              <td>
                <div className="flex flex-wrap gap-2">
                  {currentStatus === "Restricted" ? (
                    <ActionButton variant="gold" onClick={() => setProviderStatus(provider.id, "Active")}>Unrestrict</ActionButton>
                  ) : (
                    <ActionButton variant="muted" onClick={() => setProviderStatus(provider.id, "Restricted")}>Restrict</ActionButton>
                  )}
                  {currentStatus === "Banned" ? (
                    <ActionButton variant="gold" onClick={() => setProviderStatus(provider.id, "Active")}>Unban</ActionButton>
                  ) : (
                    <ActionButton variant="danger" onClick={() => setProviderStatus(provider.id, "Banned")}>Ban</ActionButton>
                  )}
                  <ActionButton onClick={() => setListingProviderId(provider.id)}>Listings</ActionButton>
                </div>
              </td>
            </tr>
          );
        })}
      </TableShell>
    </Panel>
  );
}
