'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import { toPlace, type Place, type PublicLocation } from '@/lib/places';

// Shared by every component on the page so the list is fetched once per load.
let pending: Promise<Place[]> | null = null;

const load = () => {
  pending ??= api
    .get<PublicLocation[]>('/public/locations')
    .then((response) => {
      // Short-lived so newly approved locations show up soon.
      setTimeout(() => (pending = null), 30_000);
      return response.data.map(toPlace);
    })
    .catch((error) => {
      pending = null;
      throw error;
    });
  return pending;
};

export function usePlaces() {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    load().then(
      (items) => active && setPlaces(items),
      () => active && setFailed(true),
    );
    return () => {
      active = false;
    };
  }, []);

  return { places, failed, loading: places === null && !failed };
}
