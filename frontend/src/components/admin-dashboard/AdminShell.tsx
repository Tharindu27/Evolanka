"use client";

import { useState } from "react";
import { AdminDataProvider } from "./AdminDataProvider";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AdminDataProvider>
      <div className="flex min-h-screen flex-col bg-[#0a101d] font-sans text-[#f8fbff]">
        <AdminTopbar onOpenMenu={() => setMenuOpen(true)} />
        <div className="flex min-h-0 flex-1">
          <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
          <main className="mx-auto min-w-0 max-w-7xl flex-1 space-y-8 px-4 pb-4 pt-0 sm:px-6 sm:pb-6 sm:pt-0 lg:px-8 lg:pb-8 lg:pt-0">{children}</main>
        </div>
      </div>
    </AdminDataProvider>
  );
}
