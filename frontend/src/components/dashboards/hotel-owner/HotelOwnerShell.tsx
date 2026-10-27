"use client";

import { useState, useEffect } from "react";
import HotelDashboardTopbar from "./HotelDashboardTopbar";
import HotelDashboardSidebar from "./HotelDashboardSidebar";

interface HotelOwnerShellProps {
  hotelId: string;
  hotelName?: string;
  children: React.ReactNode;
}

export default function HotelOwnerShell({
  hotelId,
  hotelName = "Grand Azure Villa",
  children,
}: HotelOwnerShellProps) {
  // Theme state: defaults to light mode to match the rest of Evolanka, while supporting dark toggle
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("evolanka_dashboard_theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const handleToggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("evolanka_dashboard_theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        mounted && !isDark
          ? "ds-light bg-[#f8fbff] text-[#001a43]"
          : "bg-[#0a101d] text-[#f8fbff]"
      }`}
    >
      <HotelDashboardTopbar
        hotelId={hotelId}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />
      <div className="flex flex-1 min-h-0">
        <HotelDashboardSidebar hotelId={hotelId} hotelName={hotelName} />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
