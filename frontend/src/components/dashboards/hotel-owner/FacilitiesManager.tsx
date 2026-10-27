"use client";

import { useState, useMemo } from "react";

export interface Facility {
  id: string;
  name: string;
  category: "Pool" | "Spa" | "Dining" | "Gym" | "Ballroom";
  location: string;
  status: "active" | "maintenance";
  description: string;
  hours: string;
  metricLabel: string;
  metricValue: string;
  occupancyPercent: number;
  maintenanceNotice?: string;
  image: string;
}

const initialFacilities: Facility[] = [
  {
    id: "f1",
    name: "Infinity Horizon Pool",
    category: "Pool",
    location: "Outdoor • 5th Floor Deck",
    status: "active",
    description: "Temperature-controlled freshwater pool overlooking the Indian Ocean.",
    hours: "06:00 - 22:00",
    metricLabel: "Live Occupancy",
    metricValue: "28 / 40 (70%)",
    occupancyPercent: 70,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f2",
    name: "Ayur Ayurvedic Spa & Wellness",
    category: "Spa",
    location: "Wellness • Ground Floor East Wing",
    status: "active",
    description: "Holistic healing treatments, steam rooms, and certified ayurvedic therapists.",
    hours: "08:00 - 21:00",
    metricLabel: "Treatment Beds",
    metricValue: "12 / 16 (75% Booked)",
    occupancyPercent: 75,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f3",
    name: "Galle Face Fine Dining Restaurant",
    category: "Dining",
    location: "Dining • Mezzanine Level",
    status: "active",
    description: "Signature seafood and authentic Sri Lankan spiced fusion cuisine.",
    hours: "06:30 - 23:00",
    metricLabel: "Dinner Seating",
    metricValue: "85 / 85 (Fully Booked)",
    occupancyPercent: 100,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f4",
    name: "State-of-the-Art Fitness Center",
    category: "Gym",
    location: "Fitness • 3rd Floor",
    status: "active",
    description: "Technogym cardio stations, free weights, and dedicated yoga zone.",
    hours: "24/7 (Keycard Access)",
    metricLabel: "Live Occupancy",
    metricValue: "8 / 25 (32%)",
    occupancyPercent: 32,
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f5",
    name: "Lotus Grand Ballroom & Events",
    category: "Ballroom",
    location: "Conferences • Level 1 Wing",
    status: "maintenance",
    description: "Pillarless banquet hall with full AV equipment, hosting up to 450 guests.",
    hours: "On-Demand Bookings",
    metricLabel: "AV Inspection",
    metricValue: "Undergoing Calibration",
    occupancyPercent: 0,
    maintenanceNotice: "Acoustics & chandelier maintenance until Oct 28",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
  },
];

interface FacilitiesManagerProps {
  hotelId?: string;
}

export default function FacilitiesManager({ hotelId }: FacilitiesManagerProps) {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [filter, setFilter] = useState<"all" | "active" | "maintenance">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);

  // Add form states
  const [newFacilityName, setNewFacilityName] = useState("");
  const [newFacilityCategory, setNewFacilityCategory] = useState<Facility["category"]>("Pool");
  const [newFacilityHours, setNewFacilityHours] = useState("08:00 - 20:00");
  const [newFacilityLocation, setNewFacilityLocation] = useState("");

  const filteredFacilities = useMemo(() => {
    return facilities.filter((f) => {
      if (filter === "all") return true;
      return f.status === filter;
    });
  }, [facilities, filter]);

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFacilityName.trim()) return;

    const newFac: Facility = {
      id: `f${facilities.length + 1}`,
      name: newFacilityName.trim(),
      category: newFacilityCategory,
      location: newFacilityLocation.trim() || "Main Building",
      status: "active",
      description: "Newly added amenity available to registered in-house hotel guests.",
      hours: newFacilityHours.trim() || "08:00 - 22:00",
      metricLabel: "Operational",
      metricValue: "Active Quota",
      occupancyPercent: 0,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    };

    setFacilities((prev) => [...prev, newFac]);
    setNewFacilityName("");
    setNewFacilityLocation("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Facilities &amp; Amenities
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Manage hotel guest amenities, operating hours, capacity quotas, and maintenance status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Grid/List View Switcher */}
          <div className="inline-flex p-1 rounded-full bg-surface-container border border-outline-variant">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
              <span>List</span>
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="inline-flex p-1 rounded-full bg-surface-container border border-outline-variant">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All ({facilities.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "active"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Active ({facilities.filter((f) => f.status === "active").length})
            </button>
            <button
              onClick={() => setFilter("maintenance")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filter === "maintenance"
                  ? "bg-[#c9a227] text-[#001a43] shadow-sm font-black"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Maintenance ({facilities.filter((f) => f.status === "maintenance").length})
            </button>
          </div>

          {/* Add New Facility Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c9a227] hover:bg-[#d8b030] active:scale-95 text-[#001a43] font-bold text-xs shadow-md shadow-[#c9a227]/20 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add New Facility</span>
          </button>
        </div>
      </div>

      {/* ── Facilities Cards (Grid or List View) ── */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className={`rounded-[24px] border bg-surface-container-low shadow-[0_10px_30px_rgba(0,26,67,0.04)] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_18px_50px_rgba(0,26,67,0.11)] hover:-translate-y-1 ${
                fac.status === "maintenance"
                  ? "border-amber-500/40 hover:border-amber-500"
                  : "border-outline-variant hover:border-[#001a43]/30"
              }`}
            >
              {/* Media Header */}
              <div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/90 via-black/25 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {fac.status === "active" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-[11px] font-bold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-[11px] font-bold text-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      MAINTENANCE
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/90 text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#ffd977]">
                    location_on
                  </span>
                  <span>{fac.location}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-black text-on-surface leading-tight">
                      {fac.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant text-[11px] font-bold">
                      {fac.category}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant line-clamp-2 font-medium">
                    {fac.description}
                  </p>

                  {/* Hours & Capacity Box */}
                  <div className="space-y-2.5 bg-surface-container p-3 rounded-2xl border border-outline-variant mt-3">
                    {fac.maintenanceNotice && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20 font-medium">
                        <span className="material-symbols-outlined text-[16px]">build</span>
                        <span className="truncate">{fac.maintenanceNotice}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-[16px] text-[#001a43] dark:text-primary">
                          schedule
                        </span>
                        Operating Hours
                      </span>
                      <span className="font-bold text-on-surface">
                        {fac.hours}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-on-surface-variant font-medium">{fac.metricLabel}</span>
                        <span className="font-bold text-[#001a43] dark:text-primary">{fac.metricValue}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                        <div
                          className="h-full bg-[#001a43] dark:bg-primary rounded-full transition-all duration-700"
                          style={{ width: `${fac.occupancyPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-outline-variant">
                  <button className="flex-1 py-2 px-3 rounded-xl border border-outline-variant text-on-surface hover:bg-[#001a43] hover:text-white dark:hover:bg-primary dark:hover:text-on-primary text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    <span>Edit Detail</span>
                  </button>
                  <button
                    aria-label="Settings"
                    className="p-2 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">settings</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add New Facility Card (Dashed Border) */}
          <div
            onClick={() => setShowAddModal(true)}
            className="border-2 border-dashed border-outline-variant hover:border-[#001a43] dark:hover:border-primary bg-surface-container-low/40 hover:bg-surface-container rounded-[24px] p-8 flex flex-col items-center justify-center text-center cursor-pointer min-h-[380px] transition-all group space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-surface-container group-hover:bg-[#001a43]/10 dark:group-hover:bg-primary/20 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-[#001a43] dark:group-hover:text-primary transition-colors">
                add_circle
              </span>
            </div>
            <h3 className="text-base font-black text-on-surface group-hover:text-[#001a43] dark:group-hover:text-primary transition-colors">
              Add New Facility
            </h3>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed font-medium">
              Register a recreational zone, dining area, or wellness space with capacity limits and operational staff.
            </p>
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container border border-outline-variant group-hover:border-[#001a43]/40 text-on-surface text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Configure Spec</span>
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="rounded-[24px] border border-outline-variant bg-surface-container-low overflow-hidden shadow-[0_10px_30px_rgba(0,26,67,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container/60 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  <th className="py-3 px-4">Facility</th>
                  <th className="py-3 px-4">Category &amp; Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Operating Hours</th>
                  <th className="py-3 px-4">Occupancy / Load</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredFacilities.map((fac) => (
                  <tr key={fac.id} className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-on-surface">{fac.name}</div>
                      <div className="text-xs text-on-surface-variant truncate max-w-xs font-medium">{fac.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container border border-outline-variant text-xs font-bold text-on-surface-variant mr-2">
                        {fac.category}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">{fac.location}</span>
                    </td>
                    <td className="py-3 px-4">
                      {fac.status === "active" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20">
                          Maintenance
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-on-surface">{fac.hours}</td>
                    <td className="py-3 px-4 text-xs text-[#001a43] dark:text-primary font-bold">
                      {fac.metricValue}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="px-3 py-1 rounded-xl border border-outline-variant text-xs font-bold hover:bg-surface-container cursor-pointer">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Bottom KPI Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* KPI 1: Usage Rate */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Facility Usage Rate
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#001a43]/10 dark:bg-primary/10 flex items-center justify-center text-[#001a43] dark:text-primary">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-black text-on-surface">78.5%</span>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +12% vs last mo
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium mb-4">
              Average peak-hour utilization across all 5 operational facilities.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-[#001a43] dark:bg-primary rounded-full" style={{ width: "78.5%" }} />
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
              <span>Target: 70%</span>
              <span>Peak: 92% (19:00)</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Maintenance Health */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Maintenance Health
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">All Clear (94%)</span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium mb-4">
              4 of 5 facilities 100% operational. Next scheduled audit: Oct 28.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full" style={{ width: "94%" }} />
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
              <span>Routine Check: Passed</span>
              <span>Safety Rating: A+</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Direct Guest Revenue */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                Direct Amenity Revenue
              </span>
              <div className="w-9 h-9 rounded-xl bg-[#c9a227]/15 flex items-center justify-center text-[#b08d1f] dark:text-[#ffd977]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-black text-on-surface">LKR 842,000</span>
              <span className="inline-flex items-center gap-0.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +22.4% MoM
              </span>
            </div>
            <p className="text-xs text-on-surface-variant font-medium mb-4">
              Upsell revenue generated from spa therapies, private dining, and pool cabanas.
            </p>
          </div>
          <div className="space-y-1.5">
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-[#c9a227] rounded-full" style={{ width: "84.2%" }} />
            </div>
            <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
              <span>Spa: 58%</span>
              <span>Dining: 42%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Add Facility Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[26px] border border-outline-variant bg-surface-container-low p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-outline-variant pb-3">
              <h3 className="text-lg font-black text-on-surface">Enroll New Facility</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-on-surface-variant hover:text-on-surface rounded-full hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddFacility} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                  Facility Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagoon Water Sports Pavilion"
                  value={newFacilityName}
                  onChange={(e) => setNewFacilityName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs focus:outline-none focus:border-[#001a43] dark:focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    value={newFacilityCategory}
                    onChange={(e) => setNewFacilityCategory(e.target.value as Facility["category"])}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                  >
                    <option value="Pool">Pool</option>
                    <option value="Spa">Spa</option>
                    <option value="Dining">Dining</option>
                    <option value="Gym">Gym</option>
                    <option value="Ballroom">Ballroom</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Operating Hours
                  </label>
                  <input
                    type="text"
                    value={newFacilityHours}
                    onChange={(e) => setNewFacilityHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                  Location within Property
                </label>
                <input
                  type="text"
                  placeholder="e.g. West Wing Beachside"
                  value={newFacilityLocation}
                  onChange={(e) => setNewFacilityLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary shadow-sm cursor-pointer"
                >
                  Create Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
