"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ADMIN_SESSION_EXPIRED_EVENT,
  clearAdminSession,
  fetchCurrentAdmin,
  getAdminToken,
  setAdminLoginNotice,
  type AdminAccount,
} from "@/lib/admin-api";

const LOGIN_PATH = "/admin/admin-login";

interface AdminSessionValue {
  admin: AdminAccount;
  /** Ends the session and returns to the sign-in page, optionally with a message. */
  signOut: (notice?: string) => void;
}

const AdminSessionContext = createContext<AdminSessionValue | null>(null);

export function useAdminSession() {
  const value = useContext(AdminSessionContext);
  if (!value) throw new Error("useAdminSession must be used inside AdminSessionProvider");
  return value;
}

// Blocks the dashboard until the stored admin token has been verified with the backend.
export function AdminSessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminAccount | null>(null);

  const signOut = useCallback(
    (notice?: string) => {
      clearAdminSession();
      if (notice) setAdminLoginNotice(notice);
      setAdmin(null);
      router.replace(LOGIN_PATH);
    },
    [router],
  );

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace(LOGIN_PATH);
      return;
    }
    let cancelled = false;
    fetchCurrentAdmin()
      .then((current) => {
        if (!cancelled) setAdmin(current);
      })
      .catch(() => {
        // A 401 is already handled by the expiry listener below; this covers network failures.
        if (!cancelled) signOut("We could not verify your session. Please sign in again.");
      });
    return () => {
      cancelled = true;
    };
  }, [router, signOut]);

  useEffect(() => {
    const onExpired = () => signOut("Your session has expired. Please sign in again.");
    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, onExpired);
  }, [signOut]);

  const value = useMemo(() => (admin ? { admin, signOut } : null), [admin, signOut]);

  if (!value) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a101d] text-sm font-semibold text-[#f8fbff]" role="status">
        Verifying admin session…
      </div>
    );
  }

  return <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>;
}
