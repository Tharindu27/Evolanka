"use client";

import { useState, type FormEvent } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";
import { admins as initialAdmins } from "@/data/admin-data/admins";
import type { AdminRole } from "@/data/admin-data/types";

const roles: AdminRole[] = ["Super Admin", "Content Moderator", "Support Agent", "Finance Manager"];

export default function AdminAccess() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Content Moderator");

  const add = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || admins.some((item) => item.email === trimmed)) return;
    const name = trimmed.split("@")[0].replace(/[._-]+/g, " ");
    setAdmins((items) => [...items, { id: `AD-${String(items.length + 1).padStart(2, "0")}`, name, email: trimmed, role }]);
    setEmail("");
  };

  const changeRole = (id: string, next: AdminRole) =>
    setAdmins((items) => items.map((item) => (item.id === id ? { ...item, role: next } : item)));

  return (
    <Panel title="Manage Admins" subtitle="Add sub-admins and control what they can access">
      <form onSubmit={add} className="grid gap-3 border-b border-outline-variant p-5 sm:grid-cols-[1fr_11rem_auto] sm:items-end sm:p-6">
        <div>
          <label htmlFor="admin-invite-email" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Email</label>
          <input id="admin-invite-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@evolanka.lk" className={inputClass} />
        </div>
        <div>
          <label htmlFor="admin-invite-role" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Role</label>
          <select id="admin-invite-role" value={role} onChange={(event) => setRole(event.target.value as AdminRole)} className={inputClass}>
            {roles.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <ActionButton type="submit" className="py-2.5">Add admin</ActionButton>
      </form>

      <ul className="divide-y divide-outline-variant">
        {admins.map((admin, index) => (
          <li key={admin.id} className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-xs font-black uppercase text-white">
              {admin.name.slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold capitalize text-on-surface">{admin.name}</p>
              <p className="truncate text-xs text-on-surface-variant">{admin.email}</p>
            </div>
            <select
              aria-label={`Role for ${admin.name}`}
              value={admin.role}
              disabled={index === 0}
              onChange={(event) => changeRole(admin.id, event.target.value as AdminRole)}
              className="rounded-lg border border-outline-variant bg-surface px-2.5 py-2 text-xs font-semibold text-on-surface outline-none focus:border-[#315b96] disabled:opacity-60"
            >
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
            {index > 0 ? (
              <ActionButton variant="danger" onClick={() => setAdmins((items) => items.filter((item) => item.id !== admin.id))}>
                Remove
              </ActionButton>
            ) : null}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
