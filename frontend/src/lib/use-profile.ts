"use client";

import { useEffect, useState } from 'react';
import { fetchMe, getErrorMessage, getStoredUser, type AuthProfile, type AuthRole } from '@/lib/api';

type ProfileState =
  | { status: 'loading' }
  | { status: 'signed-out' }
  | { status: 'error'; message: string }
  | { status: 'ready'; profile: AuthProfile };

// Loads the signed-in account's registration details; a session of the other role counts as signed out.
export function useProfile(role: AuthRole): ProfileState {
  const [state, setState] = useState<ProfileState>({ status: 'loading' });

  useEffect(() => {
    if (!getStoredUser(role)) {
      setState({ status: 'signed-out' });
      return;
    }

    let cancelled = false;
    fetchMe(role)
      .then((profile) => {
        if (!cancelled) setState({ status: 'ready', profile });
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', message: getErrorMessage(error) });
      });

    return () => {
      cancelled = true;
    };
  }, [role]);

  return state;
}
