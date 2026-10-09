"use client";



import { FloatingCheckIn } from "@/components/dashboards/hotel-owner/overview/FloatingCheckIn";
import { MetricCards } from "@/components/dashboards/hotel-owner/overview/MetricCards";
import { OccupancyChart } from "@/components/dashboards/hotel-owner/overview/OccupancyChart";
import { PremiumPromo } from "@/components/dashboards/hotel-owner/overview/PremiumPromo";
import { ProfileHeader } from "@/components/dashboards/hotel-owner/overview/ProfileHeader";
import { QuickActions } from "@/components/dashboards/hotel-owner/overview/QuickActions";
import { RecentBookings } from "@/components/dashboards/hotel-owner/overview/RecentBookings";
import { UpcomingEvents } from "@/components/dashboards/hotel-owner/overview/UpcomingEvents";


export default function OverviewClient() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
      <ProfileHeader />

      <div className="grid grid-cols-1 gap-md lg:grid-cols-12">
        <div className="space-y-md lg:col-span-8">
          <MetricCards />
          <OccupancyChart />
          <RecentBookings />
        </div>

        <aside className="space-y-md lg:col-span-4">
          <QuickActions />
          <UpcomingEvents />
          <PremiumPromo />
        </aside>
      </div>

      <div className="h-xl" />
      <FloatingCheckIn />
    </div>
  );
}