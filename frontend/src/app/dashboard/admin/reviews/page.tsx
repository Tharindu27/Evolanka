import type { Metadata } from "next";
import ReviewModeration from "@/components/admin-dashboard/reviews/ReviewModeration";
import SupportInbox from "@/components/admin-dashboard/reviews/SupportInbox";
import PageHeader from "@/components/admin-dashboard/shared/PageHeader";

export const metadata: Metadata = { title: "Reviews & Support | EVOLANKA Admin" };

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Trust & safety"
        title="Reviews & Support"
        description="Remove fake reviews and answer complaints sent by users."
      />
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <ReviewModeration />
        <SupportInbox />
      </div>
    </div>
  );
}
