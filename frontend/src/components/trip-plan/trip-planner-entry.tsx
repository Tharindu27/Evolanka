'use client';

import dynamic from 'next/dynamic';

// Saved itineraries live in localStorage, so the planner only renders in the browser.
const TripPlanner = dynamic(() => import('@/components/trip-plan/trip-planner'), {
  ssr: false,
  loading: () => <p className="py-20 text-center text-sm text-[#6d7280]">Loading planner…</p>,
});

export default function TripPlannerEntry({ editId }: { editId?: string }) {
  return <TripPlanner editId={editId} />;
}
