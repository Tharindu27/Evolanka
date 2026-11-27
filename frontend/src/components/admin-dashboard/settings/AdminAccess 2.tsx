"use client";

import { useEffect, useState, type FormEvent } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";
import { admins as initialAdmins } from "@/data/admin-data/admins";
import type { AdminRole } from "@/data/admin-data/types";

const roles: AdminRole[] = ["Super Admin", "Content Moderator", "Support Agent", "Finance Manager"];
const ADMIN_SESSION_EMAIL_KEY = "evolanka.admin.email";

export default function AdminAccess() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [currentAdminEmail, setCurrentAdminEmail] = useState(initialAdmins[0]?.email ?? "");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRole>("Content Moderator");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState("");

  useEffect(() => {
    const sessionEmail = window.sessionStorage.getItem(ADMIN_SESSION_EMAIL_KEY)?.toLowerCase();
    if (sessionEmail) setCurrentAdminEmail(sessionEmail);
  }, []);

  const currentAdmin = admins.find((admin) => admin.email === currentAdminEmail);
  const canManageAdmins = currentAdmin?.role === "Super Admin";

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

  const changePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordNotice("New password and confirmation do not match.");
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordNotice("Choose a new password different from your current password.");
      return;
    }
    setPasswordNotice("Admin sign-in is not connected yet, so your password has not been changed.");
  };

  return (
    <div className="space-y-6">
      <Panel title="Manage Admins" subtitle="Control administrator access across the platform">
        {canManageAdmins ? (
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
        ) : null}

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
              disabled={!canManageAdmins || index === 0}
              onChange={(event) => changeRole(admin.id, event.target.value as AdminRole)}
              className="rounded-lg border border-outline-variant bg-surface px-2.5 py-2 text-xs font-semibold text-on-surface outline-none focus:border-[#315b96] disabled:opacity-60"
            >
              {roles.map((item) => <option key={item}>{item}</option>)}
            </select>
            {canManageAdmins && index > 0 ? (
              <ActionButton variant="danger" onClick={() => setAdmins((items) => items.filter((item) => item.id !== admin.id))}>
                Remove
              </ActionButton>
            ) : null}
          </li>
        ))}
        </ul>
      </Panel>

      <Panel title="Change Password" subtitle="Update the password for your administrator account">
        <form onSubmit={changePassword} className="grid gap-4 p-5 sm:max-w-2xl sm:p-6">
          <div>
            <label htmlFor="admin-current-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Current password</label>
            <input id="admin-current-password" type="password" autoComplete="current-password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="admin-new-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">New password</label>
            <input id="admin-new-password" type="password" autoComplete="new-password" minLength={8} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="admin-confirm-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Confirm new password</label>
            <input id="admin-confirm-password" type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={inputClass} />
          </div>
          {passwordNotice ? <p role="status" className="text-sm text-on-surface-variant">{passwordNotice}</p> : null}
          <div><ActionButton type="submit">Update password</ActionButton></div>
        </form>
      </Panel>
    </div>
  );
}
