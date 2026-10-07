"use client";

import { useMemo, useState } from "react";
import type { Listing } from "@/lib/types";
import PageHeader from "@/components/dashboards/hotel-owner/PageHeader";
import ListingsToolbar from "@/components/dashboards/hotel-owner/ListingsToolbar";
import ListingCard from "@/components/dashboards/hotel-owner/ListingCard";
import AddPropertyCard from "@/components/dashboards/hotel-owner/AddPropertyCard";
import ListingOnboardingForm from "@/components/dashboards/hotel-owner/ListingOnboardingForm";

const CATEGORY_MAP: Record<string, string[]> = {
  hotels: ["Resort & Spa", "Heritage Hotel"],
  villas: ["Boutique Villa", "Luxury Villas"],
  bungalows: ["Bungalow"],
};

export default function MyListingsClient({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("recent");
  const [isOnboarding, setIsOnboarding] = useState(false);

  const publishedCount = listings.filter((l) => l.status === "published").length;
  const draftCount = listings.filter((l) => l.status === "draft").length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = listings.filter((l) => {
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q);
      const matchesCategory =
        category === "all" ||
        (CATEGORY_MAP[category]?.includes(l.category) ?? false);
      const matchesStatus = status === "all" || l.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });

    return [...result].sort((a, b) => {
      switch (sort) {
        case "highest_rev":
          return (b.ratesFrom ?? 0) - (a.ratesFrom ?? 0);
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "completion":
          return b.completeness - a.completeness;
        default:
          return 0;
      }
    });
  }, [listings, query, category, status, sort]);

  if (isOnboarding) {
    return <ListingOnboardingForm onCancel={() => setIsOnboarding(false)} />;
  }

  return (
    <div className="pt-20 px-6 pb-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col w-full">
        {/* Header + actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-base mb-lg">
          <PageHeader
            title="My Listings"
            description="Manage, update, and monitor your listed properties across Sri Lanka"
          />

          <div className="flex items-center gap-sm shrink-0">
            <button
              type="button"
              onClick={() => setIsOnboarding(true)}
              className="inline-flex items-center gap-xs bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md px-4 py-2.5 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-body-lg">
                file_download
              </span>
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-lg transition-all active:scale-95 shadow-sm shadow-primary/20"
            >
              <span className="material-symbols-outlined text-body-lg">
                add
              </span>
              <span>+ Add New Listing</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <ListingsToolbar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
          sort={sort}
          onSortChange={setSort}
          publishedCount={publishedCount}
          draftCount={draftCount}
        />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
          <AddPropertyCard onStart={() => setIsOnboarding(true)} />
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-on-surface-variant font-body-md mt-lg">
            No listings match your filters.
          </p>
        )}
      </div>
    </div>
  );
}