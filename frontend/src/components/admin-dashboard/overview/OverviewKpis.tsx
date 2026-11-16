import KpiCard from "../shared/KpiCard";

export default function OverviewKpis() {
  return (
    <section aria-label="Platform summary" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard title="Total Tourists" value="12,840" icon="groups" accent="blue" trend="+12.8%" note="vs. last 30 days" />
      <KpiCard title="Active Providers" value="486" icon="storefront" accent="gold" trend="+8.2%" note="vs. last 30 days" />
      <KpiCard title="Total Bookings" value="3,294" icon="calendar_month" accent="emerald" trend="+18.4%" note="vs. last 30 days" />
      <KpiCard title="Commission Revenue" value="LKR 8.42M" icon="payments" accent="navy" trend="+14.6%" note="Total earned this month" />
    </section>
  );
}
