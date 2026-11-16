"use client";

import Panel from "../shared/Panel";
import { useAdminData } from "../AdminDataProvider";

export default function DestinationDirectory() {
  const { destinations } = useAdminData();

  return (
    <Panel title="Destination Directory" subtitle={`${destinations.length} live destinations`}>
      <ul className="flex flex-wrap gap-2 p-5 sm:p-6">
        {destinations.map((destination) => (
          <li
            key={destination.name}
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface px-3.5 py-2 text-xs font-semibold text-on-surface"
          >
            <span className="material-symbols-outlined text-[15px] text-[#c9a227]" aria-hidden="true">location_on</span>
            {destination.name}
            <span className="text-on-surface-variant">· {destination.district}</span>
            {destination.source === "Tourist" ? (
              <span className="rounded-full bg-[#c9a227]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#ffd977]">Tourist</span>
            ) : null}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
