import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProviderSidebar } from "@/components/dashboards/hotel-owner/ProviderSidebar";
import { ProviderHeader } from "@/components/dashboards/hotel-owner/ProviderHeader";
import { hotelOwnerListings } from "@/data/hotelOwnerListings";
import { findProperty } from "@/lib/property";

export default async function PropertyDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  const property = findProperty(hotelOwnerListings, propertyId);

  if (!property) notFound();

  return (
    <>
      <ProviderSidebar
        propertyId={property.id}
        propertyName={property.title}
        propertyLocation={property.location}
      />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <ProviderHeader
          breadcrumb={[
            {
              label: "My Listings",
              href: "/dashboard/hotel-owner/listings",
            },
            { label: property.title },
          ]}
        />
        <main className="flex-1 w-full bg-surface pt-16">{children}</main>
      </div>
    </>
  );
}