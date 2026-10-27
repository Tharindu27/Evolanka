"use client";

import { useState, useMemo } from "react";
import {
  type GroupKey,
  type FacilityItem,
  categoryMetaList,
  masterOptionGroups,
  masterRefundPolicies,
  amenityIcons,
  getInitialHotelFacilities,
  toggleAmenityInState,
  updateFacilityStatusInState,
  addNewFacilityToState,
  updateScheduleAndPolicy,
  getAvailableAmenitiesCount,
  computeFacilitiesHealth,
} from "@/lib/hotel-facilities-logic";

interface FacilitiesManagerProps {
  hotelId?: string;
}

export default function FacilitiesManager({ hotelId }: FacilitiesManagerProps) {
  // Logic state
  const [hotelState, setHotelState] = useState(() => getInitialHotelFacilities(hotelId));

  // Active view tab: "facilities" | "amenities" | "policies"
  const [activeTab, setActiveTab] = useState<"facilities" | "amenities" | "policies">("facilities");

  // Facility filter
  const [facilityFilter, setFacilityFilter] = useState<"all" | "active" | "maintenance">("all");

  // Amenity filters
  const [amenitySearch, setAmenitySearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | GroupKey>("all");

  // Modals
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);
  const [showManageAmenitiesModal, setShowManageAmenitiesModal] = useState(false);
  const [showEditPoliciesModal, setShowEditPoliciesModal] = useState(false);

  // New facility form
  const [facName, setFacName] = useState("");
  const [facCategory, setFacCategory] = useState<FacilityItem["category"]>("Pool");
  const [facLocation, setFacLocation] = useState("");
  const [facHours, setFacHours] = useState("08:00 - 22:00");
  const [facImage, setFacImage] = useState(
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
  );

  // Policy form
  const [tempCheckIn, setTempCheckIn] = useState(hotelState.checkIn);
  const [tempCheckOut, setTempCheckOut] = useState(hotelState.checkOut);
  const [tempRefundId, setTempRefundId] = useState(hotelState.refundPolicyId);

  // Metrics from logic layer
  const health = useMemo(() => computeFacilitiesHealth(hotelState), [hotelState]);
  const totalAmenities = useMemo(() => getAvailableAmenitiesCount(hotelState), [hotelState]);

  // Current refund policy
  const activePolicy = useMemo(() => {
    return (
      masterRefundPolicies.find((p) => p.id === hotelState.refundPolicyId) ||
      masterRefundPolicies[1]
    );
  }, [hotelState.refundPolicyId]);

  // Filtered facilities
  const filteredFacilities = useMemo(() => {
    return hotelState.facilities.filter((f) => {
      if (facilityFilter === "all") return true;
      return f.status === facilityFilter;
    });
  }, [hotelState.facilities, facilityFilter]);

  // Amenity categories (excluding payment)
  const amenityCategories = categoryMetaList.filter((c) => c.key !== "payment");

  // Handlers
  const handleToggleStatus = (id: string, current: "active" | "maintenance") => {
    const next = current === "active" ? "maintenance" : "active";
    setHotelState((prev) => updateFacilityStatusInState(prev, id, next));
  };

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facName.trim()) return;

    setHotelState((prev) =>
      addNewFacilityToState(prev, {
        name: facName.trim(),
        category: facCategory,
        location: facLocation.trim() || "Main Building",
        status: "active",
        description: "Hotel amenity available to in-house guests.",
        hours: facHours.trim() || "08:00 - 22:00",
        metricLabel: "Status",
        metricValue: "Operational",
        occupancyPercent: 10,
        image: facImage,
      })
    );

    setFacName("");
    setFacLocation("");
    setShowAddFacilityModal(false);
  };

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault();
    setHotelState((prev) => updateScheduleAndPolicy(prev, tempCheckIn, tempCheckOut, tempRefundId));
    setShowEditPoliciesModal(false);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      {/* ── Simple Clean Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-on-surface">
            Facilities &amp; Amenities
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
            Manage your hotel's available facilities, room amenities, and guest policies.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowManageAmenitiesModal(true)}
            className="px-3.5 py-2 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span>Customize</span>
          </button>
          <button
            onClick={() => setShowAddFacilityModal(true)}
            className="px-4 py-2 rounded-xl bg-[#001a43] hover:bg-[#002766] text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add Facility</span>
          </button>
        </div>
      </div>

      {/* ── Segmented Navigation Tabs (HCI: Low Cognitive Load) ── */}
      <div className="flex items-center justify-between gap-4 border-b border-outline-variant pb-2">
        <div className="inline-flex p-1 rounded-2xl bg-surface-container border border-outline-variant">
          <button
            onClick={() => setActiveTab("facilities")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "facilities"
                ? "bg-white dark:bg-surface-container-high text-[#001a43] dark:text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">domain</span>
            <span>Resort Facilities ({hotelState.facilities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("amenities")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "amenities"
                ? "bg-white dark:bg-surface-container-high text-[#001a43] dark:text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">hotel_class</span>
            <span>Available Amenities ({totalAmenities - hotelState.availableAmenities.payment.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("policies")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "policies"
                ? "bg-white dark:bg-surface-container-high text-[#001a43] dark:text-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">policy</span>
            <span>Policies &amp; Payments</span>
          </button>
        </div>

        {/* Quick summary note on right */}
        <div className="hidden md:flex items-center gap-2 text-xs text-on-surface-variant font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{health.healthPercent}% Operational</span>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── TAB 1: RESORT FACILITIES                               ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeTab === "facilities" && (
        <div className="space-y-4">
          {/* Simple Filter Strip */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFacilityFilter("all")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  facilityFilter === "all"
                    ? "bg-[#001a43] text-white"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                All ({hotelState.facilities.length})
              </button>
              <button
                onClick={() => setFacilityFilter("active")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  facilityFilter === "active"
                    ? "bg-emerald-600 text-white"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                Active ({health.active})
              </button>
              <button
                onClick={() => setFacilityFilter("maintenance")}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  facilityFilter === "maintenance"
                    ? "bg-amber-600 text-white"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                Maintenance ({health.maintenance})
              </button>
            </div>

            <span className="text-on-surface-variant font-medium">
              Showing {filteredFacilities.length} facilities
            </span>
          </div>

          {/* Simple Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFacilities.map((fac) => {
              const isActive = fac.status === "active";

              return (
                <div
                  key={fac.id}
                  className="rounded-2xl border border-outline-variant bg-surface-container-low overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
                >
                  {/* Photo Header */}
                  <div className="relative h-40 w-full overflow-hidden bg-surface-container">
                    <img
                      src={fac.image}
                      alt={fac.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Status Pill */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md ${
                          isActive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                          }`}
                        />
                        {isActive ? "OPEN" : "MAINTENANCE"}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-2.5 left-3 text-white/90 text-xs font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-[#ffd977]">
                        location_on
                      </span>
                      <span>{fac.location}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm text-on-surface truncate">{fac.name}</h3>
                        <span className="px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[10px] font-bold shrink-0">
                          {fac.category}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">
                        {fac.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant font-medium flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">schedule</span>
                        {fac.hours}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(fac.id, fac.status)}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer transition ${
                          isActive
                            ? "border-outline-variant text-on-surface-variant hover:text-amber-600 hover:border-amber-500"
                            : "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {isActive ? "Set Maintenance" : "Set Active"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Simple Add Facility Card */}
            <button
              onClick={() => setShowAddFacilityModal(true)}
              className="rounded-2xl border-2 border-dashed border-outline-variant hover:border-[#001a43] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition group min-h-[220px]"
            >
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-[#001a43] mb-2">
                <span className="material-symbols-outlined text-2xl">add</span>
              </div>
              <span className="text-xs font-bold text-on-surface group-hover:text-[#001a43]">
                Add Another Facility
              </span>
              <span className="text-[11px] text-on-surface-variant mt-0.5">
                Pool, Spa, Gym, Lounge, or Dining
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── TAB 2: AVAILABLE AMENITIES (CLEAN TAGS)                ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeTab === "amenities" && (
        <div className="space-y-5">
          {/* Search + Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search amenities (e.g. Wi-Fi, Air Conditioning, Breakfast)..."
                value={amenitySearch}
                onChange={(e) => setAmenitySearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-[#001a43]"
              />
              {amenitySearch && (
                <button
                  onClick={() => setAmenitySearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#001a43] text-white"
                    : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                }`}
              >
                All
              </button>
              {amenityCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-[#001a43] text-white"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {cat.title} ({hotelState.availableAmenities[cat.key]?.length || 0})
                </button>
              ))}
            </div>
          </div>

          {/* Simple Clean Categorized Tags */}
          <div className="space-y-4">
            {amenityCategories
              .filter((cat) => selectedCategory === "all" || selectedCategory === cat.key)
              .map((cat) => {
                const list = hotelState.availableAmenities[cat.key] || [];
                const filtered = amenitySearch.trim()
                  ? list.filter((item) => item.toLowerCase().includes(amenitySearch.toLowerCase()))
                  : list;

                if (filtered.length === 0) return null;

                return (
                  <div
                    key={cat.key}
                    className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-[#001a43] dark:text-primary">
                          {cat.icon}
                        </span>
                        <h3 className="text-xs font-black uppercase tracking-wider text-on-surface">
                          {cat.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold text-on-surface-variant">
                        {filtered.length} available
                      </span>
                    </div>

                    {/* Simple Tags */}
                    <div className="flex flex-wrap gap-2">
                      {filtered.map((item) => {
                        const icon = amenityIcons[item] || "check";
                        return (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold text-on-surface border border-outline-variant/70"
                          >
                            <span className="material-symbols-outlined text-[15px] text-[#001a43] dark:text-primary">
                              {icon}
                            </span>
                            <span>{item}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── TAB 3: POLICIES & PAYMENTS (CLEAN & SIMPLE)            ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {activeTab === "policies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Check-in Schedule Card */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">
                  Daily Guest Schedule
                </span>
                <span className="material-symbols-outlined text-[18px] text-sky-600">
                  schedule
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-on-surface">{hotelState.checkIn}</span>
                <span className="text-xs text-on-surface-variant font-bold">Check-in</span>
                <span className="text-on-surface-variant/40 mx-2">•</span>
                <span className="text-2xl font-black text-on-surface">{hotelState.checkOut}</span>
                <span className="text-xs text-on-surface-variant font-bold">Check-out</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Standard daily guest arrival and departure turnover window.
              </p>
            </div>

            <button
              onClick={() => {
                setTempCheckIn(hotelState.checkIn);
                setTempCheckOut(hotelState.checkOut);
                setTempRefundId(hotelState.refundPolicyId);
                setShowEditPoliciesModal(true);
              }}
              className="text-xs font-bold text-[#001a43] dark:text-primary hover:underline text-left cursor-pointer"
            >
              Change Hours →
            </button>
          </div>

          {/* Cancellation Policy Card */}
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-on-surface">
                  Cancellation Rule
                </span>
                {activePolicy.recommended && (
                  <span className="px-2 py-0.5 rounded bg-[#fbf6e4] text-[#b08d1f] text-[10px] font-black border border-[#e6d9a8]">
                    RECOMMENDED
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-on-surface">{activePolicy.title}</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {activePolicy.description}
              </p>
            </div>

            <button
              onClick={() => {
                setTempCheckIn(hotelState.checkIn);
                setTempCheckOut(hotelState.checkOut);
                setTempRefundId(hotelState.refundPolicyId);
                setShowEditPoliciesModal(true);
              }}
              className="text-xs font-bold text-[#001a43] dark:text-primary hover:underline text-left cursor-pointer"
            >
              Change Policy →
            </button>
          </div>

          {/* Accepted Payments Card (Full Width) */}
          <div className="md:col-span-2 p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-on-surface block">
              Accepted Payment Methods
            </span>
            <div className="flex flex-wrap gap-2">
              {hotelState.availableAmenities.payment.map((pay) => (
                <span
                  key={pay}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container border border-outline-variant text-xs font-bold text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">
                    {pay === "Cash" ? "payments" : "credit_card"}
                  </span>
                  <span>{pay}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── MODAL: CUSTOMIZE AVAILABLE AMENITIES                   ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {showManageAmenitiesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl border border-outline-variant bg-surface-container-low shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
              <div>
                <h3 className="text-base font-bold text-on-surface">Manage Available Amenities</h3>
                <p className="text-xs text-on-surface-variant">Toggle features available at your property.</p>
              </div>
              <button
                onClick={() => setShowManageAmenitiesModal(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {categoryMetaList.map((cat) => {
                const options = masterOptionGroups[cat.key];
                const activeList = hotelState.availableAmenities[cat.key] || [];

                return (
                  <div key={cat.key} className="space-y-2 pb-3 border-b border-outline-variant/50 last:border-0">
                    <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                      <span>{cat.title}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {options.map((opt) => {
                        const isSelected = activeList.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setHotelState((prev) => toggleAmenityInState(prev, cat.key, opt))
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                              isSelected
                                ? "bg-[#001a43] text-white border-[#001a43] dark:bg-primary dark:text-on-primary"
                                : "bg-surface-container text-on-surface-variant border-outline-variant hover:border-on-surface-variant"
                            }`}
                          >
                            {isSelected ? "✓ " : "+ "}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-outline-variant flex justify-end">
              <button
                onClick={() => setShowManageAmenitiesModal(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#001a43] text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── MODAL: ADD FACILITY                                    ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {showAddFacilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-low p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="text-base font-bold text-on-surface">Add Facility</h3>
              <button
                onClick={() => setShowAddFacilityModal(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddFacility} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Facility Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infinity Horizon Pool"
                  value={facName}
                  onChange={(e) => setFacName(e.target.value)}
                  className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Category</label>
                  <select
                    value={facCategory}
                    onChange={(e) => setFacCategory(e.target.value as FacilityItem["category"])}
                    className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface"
                  >
                    <option value="Pool">Pool</option>
                    <option value="Spa">Spa</option>
                    <option value="Dining">Dining</option>
                    <option value="Gym">Gym</option>
                    <option value="Ballroom">Ballroom</option>
                    <option value="Lounge">Lounge</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Hours</label>
                  <input
                    type="text"
                    value={facHours}
                    onChange={(e) => setFacHours(e.target.value)}
                    className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-on-surface-variant">Location</label>
                <input
                  type="text"
                  placeholder="e.g. 5th Floor Deck"
                  value={facLocation}
                  onChange={(e) => setFacLocation(e.target.value)}
                  className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowAddFacilityModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] cursor-pointer"
                >
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── MODAL: EDIT POLICIES                                   ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {showEditPoliciesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-outline-variant bg-surface-container-low p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <h3 className="text-base font-bold text-on-surface">Edit Check-in &amp; Policies</h3>
              <button
                onClick={() => setShowEditPoliciesModal(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSavePolicies} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Check-in Time</label>
                  <input
                    type="time"
                    value={tempCheckIn}
                    onChange={(e) => setTempCheckIn(e.target.value)}
                    className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant">Check-out Time</label>
                  <input
                    type="time"
                    value={tempCheckOut}
                    onChange={(e) => setTempCheckOut(e.target.value)}
                    className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-on-surface-variant">Cancellation Policy</label>
                <div className="space-y-1.5">
                  {masterRefundPolicies.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setTempRefundId(p.id)}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer ${
                        tempRefundId === p.id
                          ? "border-[#001a43] bg-[#f0f4ff] text-[#001a43] font-bold dark:border-primary dark:bg-primary/20 dark:text-on-surface"
                          : "border-outline-variant text-on-surface-variant hover:border-on-surface-variant"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{p.title}</span>
                        {p.recommended && (
                          <span className="text-[9px] font-black uppercase text-[#b08d1f]">Rec</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowEditPoliciesModal(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
