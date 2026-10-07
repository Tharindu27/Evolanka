import type { ReactNode } from "react";
import ProviderSidebar from "@/components/dashboards/hotel-owner/ProviderSidebar";
import ProviderHeader from "@/components/dashboards/hotel-owner/ProviderHeader";

export default function HotelOwnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <ProviderSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <ProviderHeader />
        <main className="flex-1 w-full pt-16 bg-surface">{children}</main>
      </div>
    </>
  );
}