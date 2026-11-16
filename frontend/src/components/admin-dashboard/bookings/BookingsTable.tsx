"use client";

import { useState } from "react";
import Panel from "../shared/Panel";
import SearchInput from "../shared/SearchInput";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import Tabs from "../shared/Tabs";
import { formatDate, formatLkr, getBookingServiceType } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import type { BookingStatus } from "@/data/admin-data/types";

type Tab = "all" | BookingStatus;

export default function BookingsTable() {
  const { bookings, providers } = useAdminData();
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const count = (status: BookingStatus) => bookings.filter((item) => item.status === status).length;
  const providerTypes = new Map(providers.map((provider) => [provider.name, provider.type]));
  const rows = bookings
    .filter((item) => tab === "all" || item.status === tab)
    .filter((item) => `${item.id} ${item.tourist} ${item.provider} ${item.service}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <Panel
      title="All Bookings"
      subtitle="Track every reservation by status"
      action={<SearchInput value={query} onChange={setQuery} placeholder="Search bookings" />}
    >
      <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
        <Tabs<Tab>
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "all", label: "All", count: bookings.length },
            { id: "Pending", label: "Pending", count: count("Pending") },
            { id: "Confirmed", label: "Confirmed", count: count("Confirmed") },
            { id: "Completed", label: "Completed", count: count("Completed") },
            { id: "Cancelled", label: "Cancelled", count: count("Cancelled") },
            { id: "Refunded", label: "Refunded", count: count("Refunded") },
          ]}
        />
      </div>
      <TableShell headers={["Booking", "Tourist", "Provider", "Service type", "Listing name", "Date", "Amount", "Status"]} isEmpty={rows.length === 0} empty="No bookings in this view.">
        {rows.map((booking) => (
          <tr key={booking.id}>
            <td className="font-bold text-on-surface">{booking.id}</td>
            <td>{booking.tourist}</td>
            <td>{booking.provider}</td>
            <td>{getBookingServiceType(booking.provider, booking.service, providerTypes)}</td>
            <td className="font-semibold text-on-surface">{booking.service}</td>
            <td>{formatDate(booking.date)}</td>
            <td className="font-bold text-on-surface">{formatLkr(booking.amount)}</td>
            <td><StatusBadge status={booking.status} /></td>
          </tr>
        ))}
      </TableShell>
    </Panel>
  );
}
