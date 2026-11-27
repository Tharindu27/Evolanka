"use client";

import { useEffect, useState, type FormEvent } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";
import { useAdminSession } from "../AdminSessionProvider";
import { getErrorMessage } from "@/lib/api";
import {
  adminRoleCodes,
  adminRoleLabels,
  changeAdminPassword,
  createAdmin,
  fetchAdmins,
  removeAdmin,
  updateAdminRole,
  type AdminAccount,
  type AdminRoleCode,
} from "@/lib/admin-api";

type Notice = { kind: "success" | "error"; text: string } | null;

const noticeClass = (notice: NonNullable<Notice>) =>
  notice.kind === "error" ? "text-rose-400" : "text-emerald-400";

export default function AdminAccess() {
  const { admin: currentAdmin, signOut } = useAdminSession();
  const canManageAdmins = currentAdmin.role === "SUPER_ADMIN";
  // The built-in default account can only be used to create the first Super Admin.
  const roleOptions: AdminRoleCode[] = currentAdmin.isDefaultAccount ? ["SUPER_ADMIN"] : adminRoleCodes;

  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [listNotice, setListNotice] = useState<Notice>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminRoleCode>("CONTENT_MODERATOR");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<number | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState<Notice>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchAdmins()
      .then((list) => {
        if (!cancelled) setAdmins(list);
      })
      .catch((error) => {
        if (!cancelled) setListNotice({ kind: "error", text: getErrorMessage(error) });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const add = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = email.trim();
    if (!target) return;
    const chosenRole = currentAdmin.isDefaultAccount ? "SUPER_ADMIN" : role;
    setAdding(true);
    setListNotice(null);
    try {
      const result = await createAdmin({ email: target, role: chosenRole });
      if (result.defaultAccountRetired) {
        signOut(
          `${result.admin.email} was added as Super Admin and the default account has been retired. Sign in with the login details emailed to ${result.admin.email}.`,
        );
        return;
      }
      setAdmins((items) => [...items, result.admin]);
      setEmail("");
      setListNotice({ kind: "success", text: `Login details were emailed to ${result.admin.email}.` });
    } catch (error) {
      setListNotice({ kind: "error", text: getErrorMessage(error) });
    } finally {
      setAdding(false);
    }
  };

  const changeRole = async (target: AdminAccount, next: AdminRoleCode) => {
    setBusyId(target.id);
    setListNotice(null);
    try {
      const updated = await updateAdminRole(target.id, next);
      setAdmins((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    } catch (error) {
      setListNotice({ kind: "error", text: getErrorMessage(error) });
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (target: AdminAccount) => {
    if (!window.confirm(`Remove ${target.email}? They will lose access immediately.`)) return;
    setBusyId(target.id);
    setListNotice(null);
    try {
      await removeAdmin(target.id);
      setAdmins((items) => items.filter((item) => item.id !== target.id));
    } catch (error) {
      setListNotice({ kind: "error", text: getErrorMessage(error) });
    } finally {
      setBusyId(null);
    }
  };

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ kind: "error", text: "New password and confirmation do not match." });
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordNotice({ kind: "error", text: "Choose a new password different from your current password." });
      return;
    }
    setSavingPassword(true);
    setPasswordNotice(null);
    try {
      await changeAdminPassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordNotice({ kind: "success", text: "Your password has been updated." });
    } catch (error) {
      setPasswordNotice({ kind: "error", text: getErrorMessage(error) });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      <Panel title="Manage Admins" subtitle="Control administrator access across the platform">
        {canManageAdmins ? (
          <div className="border-b border-outline-variant p-5 sm:p-6">
            <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_11rem_auto] sm:items-end">
              <div>
                <label htmlFor="admin-invite-email" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Email</label>
                <input id="admin-invite-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@evolanka.lk" className={inputClass} />
              </div>
              <div>
                <label htmlFor="admin-invite-role" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Role</label>
                <select
                  id="admin-invite-role"
                  value={currentAdmin.isDefaultAccount ? "SUPER_ADMIN" : role}
                  disabled={currentAdmin.isDefaultAccount}
                  onChange={(event) => setRole(event.target.value as AdminRoleCode)}
                  className={inputClass}
                >
                  {roleOptions.map((code) => <option key={code} value={code}>{adminRoleLabels[code]}</option>)}
                </select>
              </div>
              <ActionButton type="submit" disabled={adding} className="py-2.5">{adding ? "Adding…" : "Add admin"}</ActionButton>
            </form>
            <p className="mt-3 text-xs text-on-surface-variant">
              {currentAdmin.isDefaultAccount
                ? "You are using the default account. Add your first Super Admin now: the default account will be retired, you will be signed out, and the new admin signs in with the login details sent to their email."
                : "A random password is generated and emailed to the new admin. Their email address is their username."}
            </p>
          </div>
        ) : null}

        {listNotice ? (
          <p role={listNotice.kind === "error" ? "alert" : "status"} className={`px-5 pt-4 text-sm font-semibold sm:px-6 ${noticeClass(listNotice)}`}>
            {listNotice.text}
          </p>
        ) : null}

        {loading ? (
          <p role="status" className="px-5 py-6 text-sm text-on-surface-variant sm:px-6">Loading admins…</p>
        ) : (
          <ul className="divide-y divide-outline-variant">
            {admins.map((admin) => {
              const isSelf = admin.id === currentAdmin.id;
              const locked = isSelf || admin.isDefaultAccount;
              return (
                <li key={admin.id} className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-xs font-black uppercase text-white">
                    {admin.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold capitalize text-on-surface">
                      {admin.name}
                      {isSelf ? <span className="ml-2 rounded-full bg-[#c9a227]/20 px-2 py-0.5 text-[10px] font-bold normal-case text-[#ffd977]">You</span> : null}
                      {admin.isDefaultAccount ? <span className="ml-2 rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-bold normal-case text-on-surface-variant">Default account</span> : null}
                    </p>
                    <p className="truncate text-xs text-on-surface-variant">{admin.email}</p>
                  </div>
                  {canManageAdmins ? (
                    <select
                      aria-label={`Role for ${admin.name}`}
                      value={admin.role}
                      disabled={locked || busyId === admin.id}
                      onChange={(event) => changeRole(admin, event.target.value as AdminRoleCode)}
                      className="rounded-lg border border-outline-variant bg-surface px-2.5 py-2 text-xs font-semibold text-on-surface outline-none focus:border-[#315b96] disabled:opacity-60"
                    >
                      {adminRoleCodes.map((code) => <option key={code} value={code}>{adminRoleLabels[code]}</option>)}
                    </select>
                  ) : (
                    <span className="rounded-lg border border-outline-variant px-2.5 py-2 text-xs font-semibold text-on-surface-variant">{adminRoleLabels[admin.role]}</span>
                  )}
                  {canManageAdmins && !locked ? (
                    <ActionButton variant="danger" disabled={busyId === admin.id} onClick={() => remove(admin)}>
                      Remove
                    </ActionButton>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </Panel>

      <Panel title="Change Password" subtitle="Update the password for your administrator account">
        <form onSubmit={changePassword} className="grid gap-4 p-5 sm:max-w-2xl sm:p-6">
          <div>
            <label htmlFor="admin-current-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Current password</label>
            <input id="admin-current-password" type="password" autoComplete="current-password" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="admin-new-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">New password</label>
            <input id="admin-new-password" type="password" autoComplete="new-password" minLength={8} maxLength={72} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="admin-confirm-password" className="mb-1.5 block text-xs font-bold text-on-surface-variant">Confirm new password</label>
            <input id="admin-confirm-password" type="password" autoComplete="new-password" minLength={8} maxLength={72} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={inputClass} />
          </div>
          {passwordNotice ? (
            <p role={passwordNotice.kind === "error" ? "alert" : "status"} className={`text-sm font-semibold ${noticeClass(passwordNotice)}`}>{passwordNotice.text}</p>
          ) : null}
          <div><ActionButton type="submit" disabled={savingPassword}>{savingPassword ? "Updating…" : "Update password"}</ActionButton></div>
        </form>
      </Panel>
    </div>
  );
}
