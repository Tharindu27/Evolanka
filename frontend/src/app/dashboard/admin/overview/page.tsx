import type { Metadata } from "next";
import LatestBookings from "@/components/admin-dashboard/overview/LatestBookings";
import OverviewKpis from "@/components/admin-dashboard/overview/OverviewKpis";
import PeakPeriods from "@/components/admin-dashboard/overview/PeakPeriods";
import PendingActions from "@/components/admin-dashboard/overview/PendingActions";
import RevenueChart from "@/components/admin-dashboard/overview/RevenueChart";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Overview | EVOLANKA Admin" };

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Platform overview"
        title="Welcome back, Sarah"
        description="A snapshot of tourists, providers, bookings and revenue across EVOLANKA."
      />
      <OverviewKpis />
      <PendingActions />
      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <RevenueChart />
        <PeakPeriods />
      </div>
      <LatestBookings />
    </div>
  );
}
