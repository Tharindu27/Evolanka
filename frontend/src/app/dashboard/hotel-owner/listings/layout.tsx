import type { ReactNode } from "react";
import { ListingsTopBar } from "@/components/dashboards/hotel-owner/ListingsTopBar";

export default function ListingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <ListingsTopBar />
      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}