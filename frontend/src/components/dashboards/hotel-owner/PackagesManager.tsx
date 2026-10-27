"use client";

import { useState, useMemo } from "react";

export interface PackageOffer {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceUnit: string;
  description: string;
  demandBadge?: string;
  isBestSeller?: boolean;
  status: "active" | "seasonal" | "draft";
  availableCount: string;
  tags: string[];
  image: string;
}

const initialPackages: PackageOffer[] = [
  {
    id: "pkg-1",
    name: "Honeymoon Special & Spa Retreat",
    duration: "3 Nights / 4 Days",
    price: "LKR 390,000",
    priceUnit: "net / couple",
    description:
      "Includes private beach candlelit dinner, daily 90-min Ayur wellness therapy, sunset cruise & airport transfer.",
    demandBadge: "High Demand",
    status: "active",
    availableCount: "12 Available / mo",
    tags: ["Half Board", "Couples Massage", "Ocean Villa"],
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pkg-2",
    name: "Sigiriya Heritage & Safari Explorer",
    duration: "4 Nights / 5 Days",
    price: "LKR 465,000",
    priceUnit: "net / package",
    description:
      "Guided excursion to Sigiriya Lion Rock Fortress, private Minneriya elephant safari in custom 4x4, full daily breakfast.",
    demandBadge: "Popular Choice",
    status: "active",
    availableCount: "8 Available",
    tags: ["Chauffeur Guide", "Entry Permits", "Deluxe Suite"],
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pkg-3",
    name: "Full-Board Deluxe Ocean Sanctuary",
    duration: "2 Nights / 3 Days",
    price: "LKR 285,000",
    priceUnit: "net / 2 guests",
    description:
      "All meals included at Galle Face Fine Dining, 24/7 personal concierge, infinity pool access and high tea.",
    isBestSeller: true,
    status: "active",
    availableCount: "18 Available",
    tags: ["3 Meals Daily", "Free Minibar", "Late Checkout (4 PM)"],
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "pkg-4",
    name: "7-Day Panchakarma & Mindful Detox",
    duration: "5 Nights",
    price: "LKR 620,000",
    priceUnit: "all inclusive",
    description:
      "Comprehensive doctor-prescribed wellness regimen, organic herbal cuisine, twice-daily yoga on oceanfront pavilion.",
    demandBadge: "Wellness Tier",
    status: "seasonal",
    availableCount: "5 Available",
    tags: ["Doctor Consult", "Herbal Baths", "Yoga Sessions"],
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
  },
];

interface PackagesManagerProps {
  hotelId?: string;
}

export default function PackagesManager({ hotelId }: PackagesManagerProps) {
  const [packages, setPackages] = useState<PackageOffer[]>(initialPackages);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newDuration, setNewDuration] = useState("2 Nights / 3 Days");
  const [newPrice, setNewPrice] = useState("LKR 250,000");
  const [newDesc, setNewDesc] = useState("");

  const filteredPackages = useMemo(() => {
    return packages.filter((p) => {
      if (activeFilter === "all") return true;
      return p.status === activeFilter;
    });
  }, [packages, activeFilter]);

  const handleCreatePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPkg: PackageOffer = {
      id: `pkg-${packages.length + 1}`,
      name: newTitle.trim(),
      duration: newDuration.trim(),
      price: newPrice.trim(),
      priceUnit: "net / package",
      description: newDesc.trim() || "Exclusive curated hospitality package on EVOLANKA.",
      status: "active",
      availableCount: "10 Available",
      tags: ["Breakfast Included", "Curated Stay"],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    };

    setPackages((prev) => [newPkg, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Top Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Packages &amp; Special Offers
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Curate experiential bundles, wellness retreats, and seasonal promos for global travelers
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="inline-flex p-1 rounded-full bg-surface-container border border-outline-variant">
            {["all", "active", "seasonal", "draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeFilter === tab
                    ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab === "all" ? "All Offers" : tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c9a227] hover:bg-[#d8b030] text-[#001a43] font-bold text-xs shadow-md shadow-[#c9a227]/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Offer</span>
          </button>
        </div>
      </div>

      {/* ── Packages Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-[24px] border border-outline-variant bg-surface-container-low overflow-hidden shadow-[0_10px_30px_rgba(0,26,67,0.04)] hover:shadow-[0_18px_50px_rgba(0,26,67,0.11)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
          >
            {/* Top Media Banner */}
            <div className="relative h-56 w-full overflow-hidden bg-surface-container-high">
              <img
                src={pkg.image}
                alt={pkg.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/90 via-black/30 to-transparent" />

              {/* Demand / Best Seller Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {pkg.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#c9a227] text-[#001a43] font-black text-[11px] shadow-sm uppercase tracking-wider">
                    ★ Best Seller
                  </span>
                )}
                {pkg.demandBadge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[#ffd977] backdrop-blur-md border border-white/20 font-bold text-[11px]">
                    {pkg.demandBadge}
                  </span>
                )}
              </div>

              {/* Status Pill */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                    pkg.status === "active"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {pkg.status}
                </span>
              </div>

              {/* Price & Duration overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <span className="text-xs text-white/80 font-medium block">{pkg.duration}</span>
                  <h3 className="text-lg font-black leading-tight drop-shadow-sm">{pkg.name}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-black text-[#c9a227] dark:text-[#ffd977]">{pkg.price}</div>
                  <span className="text-[10px] text-white/80 block">{pkg.priceUnit}</span>
                </div>
              </div>
            </div>

            {/* Description & Tags */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                {pkg.description}
              </p>

              <div className="space-y-3 pt-2">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {pkg.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant text-[11px] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-outline-variant">
                  <span className="text-on-surface-variant font-medium">
                    Inventory: <strong className="text-on-surface">{pkg.availableCount}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="px-3.5 py-1.5 rounded-full border border-outline-variant text-on-surface hover:bg-[#001a43] hover:text-white dark:hover:bg-primary dark:hover:text-on-primary text-xs font-bold transition-all cursor-pointer">
                      Edit Offer
                    </button>
                    <button className="px-3.5 py-1.5 rounded-full bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary text-xs font-bold transition-all shadow-sm cursor-pointer">
                      Publish to Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Create Package Modal ── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[26px] border border-outline-variant bg-surface-container-low p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <h3 className="text-lg font-black text-on-surface">Create New Package</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreatePackage} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                  Package Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ella Odyssey Scenic Train & Tea Stay"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs focus:outline-none focus:border-[#001a43] dark:focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Total Price
                  </label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                  Package Inclusions / Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail included meals, excursions, transport, and special perks..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary shadow-sm cursor-pointer"
                >
                  Save &amp; Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
