import Link from "next/link";
import KpiCard from "@/components/dashboards/hotel-owner/KpiCard";
import BookingsTable from "@/components/dashboards/hotel-owner/BookingsTable";
import OccupancyPanel from "@/components/dashboards/hotel-owner/OccupancyPanel";
import BottomWidgets from "@/components/dashboards/hotel-owner/BottomWidgets";

interface OverviewPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerOverviewPage({ params }: OverviewPageProps) {
  const { hotelId } = await params;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Welcome Banner matching Evolanka Brand ── */}
      <section className="brand-backdrop relative overflow-hidden rounded-[26px] p-6 md:p-8 bg-gradient-to-r from-[#001534] via-[#001a43] to-[#022d6f] text-white shadow-[0_20px_60px_rgba(0,26,67,0.18)]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-12 top-4 h-44 w-44 rounded-full bg-[#003d9b]/25 blur-3xl" />
          <div className="absolute -right-14 bottom-0 h-52 w-52 rounded-full bg-[#c9a227]/25 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Welcome back, Grand Azure Host!
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-[#ffd977] border border-white/20 backdrop-blur">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Verified Partner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/85 max-w-2xl leading-relaxed">
              Grand Azure Luxury Villa is performing exceptionally today — Occupancy is up{" "}
              <span className="text-[#ffd977] font-bold">+5.2%</span> and 14 new guest check-ins are scheduled.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              Preview Live Listing
            </Link>
            <Link
              href={`/dashboard/hotel-owner/${hotelId}/rooms`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#c9a227] text-[#001a43] hover:bg-[#d8b030] transition-all shadow-[0_4px_16px_rgba(201,162,39,0.35)]"
            >
              <span className="material-symbols-outlined text-[18px]">bed</span>
              Manage Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* ── KPI Row (Simplified 4 Cards) ── */}
      <section aria-label="Key Performance Indicators">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard
            title="Today's Occupancy"
            value="84%"
            trend={{ direction: "up", label: "+5.2% vs last week" }}
            icon="hotel"
            accentColor="primary"
          />
          <KpiCard
            title="Active Bookings"
            value="38"
            trend={{ direction: "up", label: "+8 this week" }}
            icon="calendar_month"
            accentColor="emerald"
          />
          <KpiCard
            title="Monthly Net Revenue"
            value="LKR 2.84M"
            trend={{ direction: "up", label: "+18.4% MoM" }}
            icon="payments"
            accentColor="secondary"
          />
          <KpiCard
            title="Overall Guest Rating"
            value="4.9 / 5"
            trend={{ direction: "neutral", label: "Top 2% in Colombo" }}
            icon="star"
            accentColor="tertiary"
          />
        </div>
      </section>

      {/* ── Main Grid: Bookings Table (8 cols) + Occupancy Panel (4 cols) ── */}
      <section aria-label="Live Operations">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <BookingsTable hotelId={hotelId} />
          </div>
          <div className="lg:col-span-4">
            <OccupancyPanel />
          </div>
        </div>
      </section>

      {/* ── Bottom Operational Widgets Row ── */}
      <section aria-label="Reviews and Financial Overview">
        <BottomWidgets hotelId={hotelId} />
      </section>
    </div>
  );
}
