"use client";

import Link from "next/link";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import { useAdminData } from "../AdminDataProvider";
import { formatDate, formatLkr, getBookingServiceType } from "../shared/utils";

export default function LatestBookings() {
  const { bookings, providers } = useAdminData();
  const providerTypes = new Map(providers.map((provider) => [provider.name, provider.type]));

  return (
    <Panel
      title="Latest Bookings"
      subtitle="Most recent reservations across the platform"
      action={
        <Link href="/dashboard/admin/bookings" className="text-xs font-bold text-primary hover:underline">
          View all
        </Link>
      }
    >
      <TableShell headers={["Booking", "Tourist", "Provider", "Service type", "Listing name", "Date", "Amount", "Status"]}>
        {bookings.slice(0, 5).map((booking) => (
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
