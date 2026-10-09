import Link from "next/link";
import { Card } from "./Card";

export function RecentBookings() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-outline-variant p-md">
        <h2 className="font-title-sm text-title-sm text-on-surface">
          Recent Bookings
        </h2>
        <Link
          href="/dashboard/hotel-owner/bookings"
          className="font-label-md text-label-md text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="bg-surface-container-low">
              {["Guest", "Room Type", "Dates", "Status"].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-4 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-outline-variant/30">
            <tr className="transition-colors hover:bg-surface-container-low">
              <td className="flex items-center gap-3 px-6 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">
                  JD
                </span>
                <span>
                  <strong className="block font-body-md text-body-md text-on-surface">
                    John Doe
                  </strong>
                  <small className="font-label-sm text-label-sm text-on-surface-variant">
                    UK • 2 Guests
                  </small>
                </span>
              </td>
              <td className="px-6 py-4 font-body-md text-body-md text-on-surface">
                Ocean Deluxe
              </td>
              <td className="px-6 py-4 font-body-md text-body-md text-on-surface">
                Oct 12 - Oct 15
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-tertiary-container/10 px-3 py-1 font-label-sm text-label-sm font-bold text-tertiary-container">
                  Confirmed
                </span>
              </td>
            </tr>

            <tr className="transition-colors hover:bg-surface-container-low">
              <td className="flex items-center gap-3 px-6 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
                  AS
                </span>
                <span>
                  <strong className="block font-body-md text-body-md text-on-surface">
                    Anita Singh
                  </strong>
                  <small className="font-label-sm text-label-sm text-on-surface-variant">
                    IN • 1 Guest
                  </small>
                </span>
              </td>
              <td className="px-6 py-4 font-body-md text-body-md text-on-surface">
                Garden Suite
              </td>
              <td className="px-6 py-4 font-body-md text-body-md text-on-surface">
                Oct 13 - Oct 14
              </td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-secondary-container/10 px-3 py-1 font-label-sm text-label-sm font-bold text-on-secondary-container">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}