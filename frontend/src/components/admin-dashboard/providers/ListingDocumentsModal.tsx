"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Modal from "../shared/Modal";
import type { Listing, Provider } from "@/data/admin-data/types";

interface ListingDocumentsModalProps {
  listing: Listing;
  provider: Provider;
  onClose: () => void;
  onApprove: () => void;
}

export default function ListingDocumentsModal({ listing, provider, onClose, onApprove }: ListingDocumentsModalProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const allChecked = provider.documents.length > 0 && checked.length === provider.documents.length;

  const toggle = (label: string) => {
    setChecked((items) => items.includes(label) ? items.filter((item) => item !== label) : [...items, label]);
  };

  return (
    <Modal
      title="Review submitted documents"
      subtitle={`${listing.title} · ${provider.name}`}
      onClose={onClose}
      footer={
        <>
          <ActionButton variant="muted" onClick={onClose}>Close</ActionButton>
          <ActionButton disabled={!allChecked} onClick={onApprove}>Approve listing</ActionButton>
        </>
      }
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-outline-variant bg-surface-container p-4">
          <p className="text-xs font-bold text-on-surface">Listing information</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
            <div><dt className="text-on-surface-variant">Listing name</dt><dd className="mt-1 font-semibold text-on-surface">{listing.title}</dd></div>
            <div><dt className="text-on-surface-variant">Service type</dt><dd className="mt-1 font-semibold text-on-surface">{provider.type}</dd></div>
            <div><dt className="text-on-surface-variant">Provider</dt><dd className="mt-1 font-semibold text-on-surface">{provider.name}</dd></div>
            <div><dt className="text-on-surface-variant">Status</dt><dd className="mt-1 font-semibold text-on-surface">{listing.status}</dd></div>
          </dl>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">Uploaded provider documents</h3>
          <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant">
            {provider.documents.map((document) => (
              <li key={document.label} className="flex items-center gap-3 px-4 py-3">
                <input
                  type="checkbox"
                  id={`listing-doc-${listing.id}-${document.label}`}
                  checked={checked.includes(document.label)}
                  onChange={() => toggle(document.label)}
                  className="h-4 w-4 accent-[#c9a227]"
                />
                <label htmlFor={`listing-doc-${listing.id}-${document.label}`} className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-on-surface">{document.label}</span>
                  <span className="block text-[11px] text-on-surface-variant">Reference: {document.reference}</span>
                </label>
                <span className="material-symbols-outlined text-[18px] text-primary" aria-label="Document record">description</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-on-surface-variant">Check each submitted document after reviewing it. All documents must be checked before approval.</p>
        </div>
      </div>
    </Modal>
  );
}
