"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Modal from "../shared/Modal";
import StatusBadge from "../shared/StatusBadge";
import { formatDate } from "../shared/utils";
import type { Provider, ProviderStatus } from "@/data/admin-data/types";

interface ProviderDetailsModalProps {
  provider: Provider;
  onClose: () => void;
  onStatusChange: (status: ProviderStatus) => void;
}

export default function ProviderDetailsModal({ provider, onClose, onStatusChange }: ProviderDetailsModalProps) {
  const [verified, setVerified] = useState<string[]>([]);
  const isPending = provider.status === "Pending";
  const allVerified = verified.length === provider.documents.length;

  const toggle = (label: string) =>
    setVerified((items) => (items.includes(label) ? items.filter((item) => item !== label) : [...items, label]));

  const change = (status: ProviderStatus) => {
    onStatusChange(status);
    onClose();
  };

  return (
    <Modal
      title={provider.name}
      subtitle={`${provider.id} · ${provider.type}`}
      onClose={onClose}
      footer={
        isPending ? (
          <>
            <ActionButton variant="danger" onClick={() => change("Rejected")}>Reject</ActionButton>
            <ActionButton disabled={!allVerified} onClick={() => change("Active")}>Approve provider</ActionButton>
          </>
        ) : provider.status === "Active" ? (
          <>
            <ActionButton variant="muted" onClick={() => change("Restricted")}>Restrict</ActionButton>
            <ActionButton variant="danger" onClick={() => change("Banned")}>Ban</ActionButton>
          </>
        ) : provider.status === "Restricted" ? (
          <>
            <ActionButton variant="gold" onClick={() => change("Active")}>Unrestrict</ActionButton>
            <ActionButton variant="danger" onClick={() => change("Banned")}>Ban</ActionButton>
          </>
        ) : provider.status === "Banned" ? (
          <ActionButton variant="gold" onClick={() => change("Active")}>Unban</ActionButton>
        ) : null
      }
    >
      <div className="space-y-5">
        <dl className="grid grid-cols-2 gap-4 text-xs">
          {[
            ["Email", provider.email],
            ["Phone", provider.phone],
            ["District", provider.district],
            ["Registered", formatDate(provider.registeredOn)],
            ["Rating", provider.rating ? `★ ${provider.rating.toFixed(1)}` : "No ratings yet"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-semibold text-on-surface-variant">{label}</dt>
              <dd className="mt-0.5 break-words font-bold text-on-surface">{value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-semibold text-on-surface-variant">Status</dt>
            <dd className="mt-0.5"><StatusBadge status={provider.status} /></dd>
          </div>
        </dl>

        <div>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">Submitted documents</h3>
          <ul className="divide-y divide-outline-variant rounded-xl border border-outline-variant">
            {provider.documents.map((document) => (
              <li key={document.label} className="flex items-center gap-3 px-4 py-3">
                {isPending ? (
                  <input
                    type="checkbox"
                    id={`doc-${document.label}`}
                    checked={verified.includes(document.label)}
                    onChange={() => toggle(document.label)}
                    className="h-4 w-4 accent-[#001a43]"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[18px] text-emerald-600" aria-hidden="true">verified</span>
                )}
                <label htmlFor={`doc-${document.label}`} className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-on-surface">{document.label}</span>
                  <span className="block text-[11px] text-on-surface-variant">{document.reference}</span>
                </label>
              </li>
            ))}
          </ul>
          {isPending ? (
            <p className="mt-2 text-[11px] text-on-surface-variant">Tick each document once checked. All must be verified to approve.</p>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
