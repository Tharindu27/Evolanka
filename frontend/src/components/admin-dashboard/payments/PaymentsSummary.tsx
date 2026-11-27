import KpiCard from "../shared/KpiCard";

export default function PaymentsSummary() {
  return (
    <section aria-label="Payments summary" className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <KpiCard title="Gross Volume" value="LKR 84.2M" icon="account_balance" accent="blue" note="Across 3,294 bookings" />
      <KpiCard title="Commission Earned" value="LKR 8.42M" icon="percent" accent="gold" trend="+14.6%" note="vs. last month" />
      <KpiCard title="Payouts Due" value="LKR 1.03M" icon="schedule" accent="emerald" note="2 providers awaiting settlement" />
    </section>
  );
}
