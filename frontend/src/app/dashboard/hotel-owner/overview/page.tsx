import PageHeader from "@/components/dashboards/hotel-owner/PageHeader";

export default function Page() {
  return (
    <div className="pt-20 px-6 pb-12 max-w-7xl mx-auto w-full">
      <PageHeader
        title="Overview"
        description="A snapshot of your property performance."
      />
    </div>
  );
}