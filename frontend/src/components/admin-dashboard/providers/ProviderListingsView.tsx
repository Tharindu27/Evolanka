"use client";

import { useMemo, useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import { useAdminData } from "../AdminDataProvider";
import type { Listing, ListingStatus, Provider } from "@/data/admin-data/types";
import ListingDocumentsModal from "./ListingDocumentsModal";

interface ProviderListingsViewProps {
  initialProvider: Provider;
  onBack: () => void;
}

const selectClass = "min-w-36 rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-xs font-semibold text-on-surface outline-none focus:border-primary";
const inputClass = "min-w-40 rounded-xl border border-outline-variant bg-surface-container px-3 py-2 text-xs text-on-surface outline-none placeholder:text-on-surface-variant focus:border-primary";

function providerType(provider: Provider | undefined) {
  if (!provider) return "Other";
  return provider.type === "Vehicle Rental" ? "Rental" : provider.type;
}

export default function ProviderListingsView({ initialProvider, onBack }: ProviderListingsViewProps) {
  const { listings, providers, setListingStatus, setProviderStatus } = useAdminData();
  const [providerName, setProviderName] = useState(initialProvider.name);
  const [listingName, setListingName] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const selectedListing = listings.find((item) => item.id === selectedListingId) ?? null;
  const selectedProvider = selectedListing ? providers.find((item) => item.name === selectedListing.provider) : undefined;
  const rows = useMemo(() => listings.filter((listing) => {
    const provider = providers.find((item) => item.name === listing.provider);
    const matchesProvider = listing.provider.toLowerCase().includes(providerName.trim().toLowerCase());
    const matchesListing = listing.title.toLowerCase().includes(listingName.trim().toLowerCase());
    const matchesType = type === "All" || providerType(provider) === type;
    const matchesStatus = status === "All" || listing.status === status;
    return matchesProvider && matchesListing && matchesType && matchesStatus;
  }), [listings, providers, providerName, listingName, type, status]);

  const changeStatus = (listing: Listing, nextStatus: ListingStatus) => {
    setListingStatus(listing.id, nextStatus);
    if (nextStatus === "Active") {
      const provider = providers.find((item) => item.name === listing.provider);
      if (provider?.status === "Pending") setProviderStatus(provider.id, "Active");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button type="button" onClick={onBack} className="mb-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>Back to providers
          </button>
          <h1 className="text-2xl font-black tracking-tight text-on-surface">Provider listings</h1>
          <p className="mt-1 text-sm text-on-surface-variant">Review every service listing and its submitted documents.</p>
        </div>
      </div>

      <Panel title="Listings" subtitle={`${rows.length} matching listings`}>
        <div className="grid gap-3 border-b border-outline-variant p-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
            Provider name
            <input aria-label="Filter by provider name" value={providerName} onChange={(event) => setProviderName(event.target.value)} placeholder="All providers" className={`w-full ${inputClass}`} />
          </label>
          <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
            Listing name
            <input aria-label="Filter by listing name" value={listingName} onChange={(event) => setListingName(event.target.value)} placeholder="Search listings" className={`w-full ${inputClass}`} />
          </label>
          <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
            Type
            <select aria-label="Filter by listing type" value={type} onChange={(event) => setType(event.target.value)} className={`w-full ${selectClass}`}>
              <option>All</option><option>Hotel</option><option>Tour Guide</option><option>Rental</option><option>Taxi</option>
            </select>
          </label>
          <label className="space-y-1 text-[11px] font-bold text-on-surface-variant">
            Status
            <select aria-label="Filter by listing status" value={status} onChange={(event) => setStatus(event.target.value)} className={`w-full ${selectClass}`}>
              <option>All</option><option>Pending</option><option>Active</option><option>Restricted</option><option>Banned</option>
            </select>
          </label>
        </div>
        <TableShell headers={["Listing name", "Type", "Provider name", "Status", "Action"]} isEmpty={rows.length === 0} empty="No listings match these filters.">
          {rows.map((listing) => {
            const provider = providers.find((item) => item.name === listing.provider);
            return (
              <tr key={listing.id}>
                <td><p className="font-bold text-on-surface">{listing.title}</p><p className="mt-0.5 text-[11px]">{listing.id} · {listing.location}</p></td>
                <td>{providerType(provider)}</td>
                <td className="font-semibold text-on-surface">{listing.provider}</td>
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
            );
          })}
        </TableShell>
      </Panel>

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
    </div>
  );
}
