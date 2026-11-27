import type { Metadata } from "next";
import CommissionSettings from "@/components/admin-dashboard/payments/CommissionSettings";
import PaymentsSummary from "@/components/admin-dashboard/payments/PaymentsSummary";
import ProviderPayouts from "@/components/admin-dashboard/payments/ProviderPayouts";
import TransactionLogs from "@/components/admin-dashboard/payments/TransactionLogs";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Payments & Commission | EVOLANKA Admin" };

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Finance"
        title="Payments & Commission"
        description="Review gateway transactions, set the platform commission and settle provider earnings."
      />
      <PaymentsSummary />
      <div className="grid gap-6 xl:grid-cols-[1fr_2fr]">
        <CommissionSettings />
        <TransactionLogs />
      </div>
      <ProviderPayouts />
    </div>
  );
}
