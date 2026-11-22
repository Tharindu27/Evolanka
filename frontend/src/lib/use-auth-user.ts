"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AUTH_CHANGE_EVENT, fetchMe, getStoredUser, getToken, logout, type AuthRole, type AuthUser } from '@/lib/api';

const checkedRoles = new Set<AuthRole>();

export function useAuthUser(role: AuthRole) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => {
      setUser(getStoredUser(role));
      setReady(true);
    };

    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);

    // Drop a stale or expired token once per page load.
    if (!checkedRoles.has(role) && getToken(role)) {
      checkedRoles.add(role);
      fetchMe(role).catch((error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) logout(role);
      });
    }

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [role]);

  return { user, ready };
}
