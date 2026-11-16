"use client";

import { useMemo, useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import SearchInput from "../shared/SearchInput";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import { useAdminData } from "../AdminDataProvider";
import type { Listing, ListingStatus, Provider } from "@/data/admin-data/types";
import ListingDocumentsModal from "../providers/ListingDocumentsModal";

const selectClass = "rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:border-primary";

function displayType(provider: Provider | undefined, listing: Listing) {
  if (provider) return provider.type === "Vehicle Rental" ? "Rental" : provider.type;
  if (listing.type === "Tour Package") return "Tour Guide";
  if (listing.type === "Room" || listing.type === "Villa") return "Hotel";
  return "Rental";
}

export default function ListingsManager() {
  const { listings, providers, setListingStatus, setProviderStatus } = useAdminData();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const selectedListing = listings.find((item) => item.id === selectedListingId) ?? null;
  const selectedProvider = selectedListing ? providers.find((item) => item.name === selectedListing.provider) : undefined;
  const rows = useMemo(() => listings.filter((item) => {
    const provider = providers.find((entry) => entry.name === item.provider);
    const matchesQuery = `${item.title} ${item.provider} ${item.location} ${displayType(provider, item)}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesType = typeFilter === "All" || displayType(provider, item) === typeFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesQuery && matchesType && matchesStatus;
  }), [listings, providers, query, typeFilter, statusFilter]);
  const featuredCount = listings.filter((item) => item.featured).length;

  const changeStatus = (listing: Listing, status: ListingStatus) => {
    setListingStatus(listing.id, status);
    if (status === "Active") {
      const provider = providers.find((item) => item.name === listing.provider);
      if (provider?.status === "Pending") setProviderStatus(provider.id, "Active");
    }
  };

  return (
    <Panel
      title="Listing Moderation"
      subtitle={`${featuredCount} listings are featured on the home page`}
      action={<SearchInput value={query} onChange={setQuery} placeholder="Search listings" />}
    >
      <div className="grid gap-3 border-b border-outline-variant px-5 py-4 sm:grid-cols-2 sm:px-6">
        <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
          Type
          <select aria-label="Filter listings by type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className={`w-full ${selectClass}`}>
            <option>All</option><option>Hotel</option><option>Tour Guide</option><option>Rental</option><option>Taxi</option>
          </select>
        </label>
        <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
          Status
          <select aria-label="Filter listings by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className={`w-full ${selectClass}`}>
            <option>All</option><option>Pending</option><option>Active</option><option>Restricted</option><option>Banned</option>
          </select>
        </label>
      </div>
      <TableShell headers={["Listing name", "Type", "Provider name", "Status", "Action"]} isEmpty={rows.length === 0} empty="No listings match these filters.">
        {rows.map((listing) => (
          <tr key={listing.id}>
            <td>
              <p className="font-bold text-on-surface">{listing.title}</p>
              <p className="mt-0.5 text-[11px]">{listing.id} · {listing.location}</p>
            </td>
            <td>{displayType(providers.find((item) => item.name === listing.provider), listing)}</td>
            <td>{listing.provider}</td>
            <td><StatusBadge status={listing.status} /></td>
            <td>
              <div className="flex flex-wrap gap-2">
                <ActionButton variant="muted" onClick={() => setSelectedListingId(listing.id)}>Review documents</ActionButton>
                {listing.status === "Restricted" ? (
                  <ActionButton variant="gold" onClick={() => changeStatus(listing, "Active")}>Unrestrict</ActionButton>
                ) : (
                  <ActionButton variant="muted" onClick={() => changeStatus(listing, "Restricted")}>Restrict</ActionButton>
                )}
                {listing.status === "Banned" ? (
                  <ActionButton variant="gold" onClick={() => changeStatus(listing, "Active")}>Unban</ActionButton>
                ) : (
                  <ActionButton variant="danger" onClick={() => changeStatus(listing, "Banned")}>Ban</ActionButton>
                )}
              </div>
            </td>
          </tr>
        ))}
      </TableShell>
      {selectedListing && selectedProvider ? (
        <ListingDocumentsModal
          key={selectedListing.id}
          listing={selectedListing}
          provider={selectedProvider}
          onClose={() => setSelectedListingId(null)}
          onApprove={() => {
            changeStatus(selectedListing, "Active");
            setSelectedListingId(null);
          }}
        />
      ) : null}
    </Panel>
  );
}
