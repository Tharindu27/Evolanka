"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AUTH_CHANGE_EVENT, fetchMe, getStoredUser, getToken, logout, type AuthRole, type AuthUser } from '@/lib/api';

const checkedRoles = new Set<AuthRole>();
const loadingRoles = new Set<AuthRole>();

export function useAuthUser(role: AuthRole) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Once per page load this drops a stale token; it also fetches the profile picture
    // for sessions that don't have it cached yet (e.g. right after signing in).
    const verify = () => {
      if (!getToken(role) || loadingRoles.has(role)) return;
      const stored = getStoredUser(role);
      if (checkedRoles.has(role) && stored?.profilePicture !== undefined) return;

      checkedRoles.add(role);
      loadingRoles.add(role);
      fetchMe(role)
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response?.status === 401) logout(role);
        })
        .finally(() => loadingRoles.delete(role));
    };

    const sync = () => {
      setUser(getStoredUser(role));
      setReady(true);
      verify();
    };

    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [role]);

  return { user, ready };
}
