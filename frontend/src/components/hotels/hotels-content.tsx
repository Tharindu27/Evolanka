"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  mockHotelsList,
  type HotelListItem,
  getHotelRatingSentiment,
} from "@/lib/hotel-detail-logic";

const popularDestinations = [
  "All Sri Lanka",
  "Galle",
  "Kandy",
  "Colombo",
  "Ella",
  "Yala",
];

const categories = [
  "All Stays",
  "Luxury Resorts",
  "Villa/Bungalow",
  "Guest House",
  "Apartment",
  "Hostel",
  "Camping",
];

const filterGroups = [
  {
    title: "General Amenities",
    items: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Heating",
      "Television",
      "Mini Bar",
      "Refrigerator",
      "Electric Kettle",
      "Safe Deposit Box",
    ],
  },
  {
    title: "Property & Wellness",
    items: [
      "Swimming Pool",
      "Kids Pool",
      "Fitness Center",
      "Spa & Wellness Center",
      "Sauna",
      "Garden",
      "Terrace",
    ],
  },
  {
    title: "Food & Dining",
    items: [
      "Restaurant",
      "Bar / Lounge",
      "Coffee Shop",
      "Room Service",
      "Breakfast Included",
      "Buffet Breakfast",
    ],
  },
  {
    title: "Room Features",
    items: [
      "Private Bathroom",
      "Shower",
      "Bathtub",
      "Hot Water",
      "Towels",
      "Bathrobes",
      "Hair Dryer",
    ],
  },
  {
    title: "Services & Access",
    items: [
      "24-Hour Front Desk",
      "Concierge Service",
      "Luggage Storage",
      "Laundry Service",
      "Airport Shuttle",
      "Car Rental",
      "24-Hour Security",
    ],
  },
];

export default function HotelsContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Stays");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const guestPickerRef = useRef<HTMLDivElement>(null);

  // Price Range
  const [minPrice, setMinPrice] = useState<number>(30000);
  const [maxPrice, setMaxPrice] = useState<number>(180000);

  // Star Rating filter
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  // Amenities
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "General Amenities": true,
    "Property & Wellness": true,
  });

  // Sorting
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");

  // Wishlist state
  const [savedHotelIds, setSavedHotelIds] = useState<string[]>([]);

  // Close guest popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (guestPickerRef.current && !guestPickerRef.current.contains(event.target as Node)) {
        setIsGuestPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleWishlist = (hotelId: string) => {
    setSavedHotelIds((prev) =>
      prev.includes(hotelId) ? prev.filter((id) => id !== hotelId) : [...prev, hotelId]
    );
  };

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("All Stays");
    setDestinationSearch("");
    setCheckInDate("");
    setCheckOutDate("");
    setMinPrice(30000);
    setMaxPrice(180000);
    setSelectedStars([]);
    setSelectedAmenities([]);
    setSortBy("recommended");
  };

  const hasActiveFilters =
    selectedCategory !== "All Stays" ||
    destinationSearch.trim().length > 0 ||
    selectedAmenities.length > 0 ||
    selectedStars.length > 0 ||
    minPrice > 30000 ||
    maxPrice < 180000;

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    let list = mockHotelsList.filter((hotel) => {
      // Category match
      if (selectedCategory !== "All Stays" && hotel.type !== selectedCategory) {
        return false;
      }

      // Destination match
      if (destinationSearch.trim()) {
        const q = destinationSearch.toLowerCase();
        const matchName = hotel.name.toLowerCase().includes(q);
        const matchLoc = hotel.location.toLowerCase().includes(q);
        const matchDist = hotel.district.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDist) return false;
      }

      // Price match
      if (hotel.priceNum < minPrice || hotel.priceNum > maxPrice) {
        return false;
      }

      // Star rating match
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.starRating)) {
        return false;
      }

      // Amenities match
      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllSelected) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.priceNum - b.priceNum);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.priceNum - a.priceNum);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, destinationSearch, minPrice, maxPrice, selectedStars, selectedAmenities, sortBy]);

  // Amenity counts
  const amenityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const h of mockHotelsList) {
      for (const a of h.amenities) {
        counts[a] = (counts[a] || 0) + 1;
      }
    }
    return counts;
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ── Hero Banner: Human Crafted, Elegant & Warm ── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#001534] via-[#001a43] to-[#022d6f] text-white shadow-xl p-8 sm:p-12 md:p-14 border border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1800&q=80"
            alt="Sri Lanka scenic hill country landscape"
            className="w-full h-full object-cover opacity-30 saturate-120"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001534]/95 via-[#001a43]/80 to-transparent" />
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#c9a227]/15 blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[#ffe28c] text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffe28c]" />
            Explore With Confidence
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Find your perfect stay.
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed font-normal">
            Discover a handpicked collection of verified luxury hotels, heritage villas, and scenic resorts across Sri Lanka.
          </p>
        </div>
      </section>

      {/* ── Floating Search Bar Widget: Refined, Responsive & Human ── */}
      <section className="relative z-20 -mt-6 sm:-mt-12 mx-auto max-w-5xl px-2 sm:px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,26,67,0.10)] border border-[#dce3f1] flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Destination */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px] shrink-0">
              location_on
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Destination / Hotel
              </span>
              <input
                type="text"
                placeholder="Where in Sri Lanka?"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-normal text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {destinationSearch && (
              <button
                onClick={() => setDestinationSearch("")}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear destination"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Check-in */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px] shrink-0">
              calendar_today
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Check-in
              </span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-normal text-slate-900 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 flex items-center gap-3 px-3.5 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px] shrink-0">
              event_busy
            </span>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Check-out
              </span>
              <input
                type="date"
                min={checkInDate || undefined}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-normal text-slate-900 focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Popover */}
          <div className="relative flex-1" ref={guestPickerRef}>
            <button
              type="button"
              onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-left cursor-pointer hover:bg-slate-50/60 rounded-xl transition"
            >
              <span className="material-symbols-outlined text-[#001a43] text-[22px] shrink-0">
                group
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Guests & Rooms
                </span>
                <span className="text-sm font-normal text-slate-900 truncate">
                  {adults} Adult{adults > 1 ? "s" : ""}, {rooms} Room{rooms > 1 ? "s" : ""}
                  {children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""}
                </span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-sm">
                expand_more
              </span>
            </button>

            {/* Guest Popover Dropdown */}
            {isGuestPickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl p-4 shadow-2xl border border-[#dce3f1] z-50 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Adults</p>
                    <p className="text-[11px] text-slate-500">Age 13 or above</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={adults >= 10}
                      onClick={() => setAdults((a) => Math.min(10, a + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Children</p>
                    <p className="text-[11px] text-slate-500">Ages 0 - 12</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{children}</span>
                    <button
                      type="button"
                      disabled={children >= 6}
                      onClick={() => setChildren((c) => Math.min(6, c + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">Rooms</p>
                    <p className="text-[11px] text-slate-500">Number of rooms</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms((r) => Math.max(1, r - 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{rooms}</span>
                    <button
                      type="button"
                      disabled={rooms >= 5}
                      onClick={() => setRooms((r) => Math.min(5, r + 1))}
                      className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-40 hover:bg-slate-100 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestPickerOpen(false)}
                  className="w-full mt-2 py-2 rounded-xl bg-[#001a43] text-white text-xs font-semibold hover:bg-[#003d9b] transition cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="px-8 py-3.5 rounded-2xl bg-[#001a43] hover:bg-[#003d9b] text-white font-semibold text-xs sm:text-sm transition shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>Search</span>
          </button>
        </div>

        {/* Quick Destination Suggestions */}
        <div className="flex items-center gap-2 mt-3 px-3 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
            Popular in Sri Lanka:
          </span>
          {popularDestinations.map((dest) => {
            const isAll = dest === "All Sri Lanka";
            const isMatch = isAll ? !destinationSearch : destinationSearch.toLowerCase() === dest.toLowerCase();
            return (
              <button
                key={dest}
                type="button"
                onClick={() => setDestinationSearch(isAll ? "" : dest)}
                className={`text-xs px-3 py-1 rounded-full border transition whitespace-nowrap cursor-pointer ${
                  isMatch
                    ? "bg-[#001a43]/10 border-[#001a43] text-[#001a43] font-semibold"
                    : "bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 font-normal"
                }`}
              >
                {dest}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Category Filter Pills: Clean, Understated & Natural ── */}
      <section className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-medium transition whitespace-nowrap cursor-pointer text-xs ${
              selectedCategory === cat
                ? "bg-[#001a43] text-white shadow-xs font-semibold"
                : "bg-white text-slate-600 hover:text-[#001a43] border border-[#dce3f1]"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* ── Main Content: Sidebar Filters + Hotel Cards Grid ── */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className="w-full md:w-72 shrink-0 bg-white border border-[#dce3f1] rounded-2xl p-5 shadow-xs space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#dce3f1]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#001a43] text-[20px]">
                tune
              </span>
              <h2 className="font-bold text-sm text-[#001a43] tracking-wide">
                Filters
              </h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#b08d1f] hover:text-[#8c6f13] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pb-4 border-b border-[#dce3f1]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#001a43] uppercase tracking-wider">
                Price per night
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                Up to LKR {maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="180000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#001a43] cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-normal">
              <span>LKR 30,000</span>
              <span>LKR 180,000+</span>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="space-y-2.5 pb-4 border-b border-[#dce3f1]">
            <span className="text-xs font-semibold text-[#001a43] uppercase tracking-wider block">
              Star Rating
            </span>
            <div className="flex items-center gap-2">
              {[5, 4, 3].map((star) => {
                const isSelected = selectedStars.includes(star);
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => toggleStar(star)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-[#001a43] text-white border-[#001a43] font-semibold"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                    }`}
                  >
                    <span>{star}</span>
                    <span
                      className="material-symbols-outlined text-[14px] text-amber-400"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion Amenity Groups */}
          <div className="space-y-4 text-xs">
            {filterGroups.map((group) => {
              const isExpanded = Boolean(expandedSections[group.title]);

              return (
                <div key={group.title} className="border-b border-[#dce3f1]/60 pb-3 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.title)}
                    className="flex items-center justify-between w-full py-1 text-left font-semibold text-[#001a43] cursor-pointer"
                  >
                    <span className="text-xs tracking-wide">{group.title}</span>
                    <span className="material-symbols-outlined text-[16px] text-slate-400">
                      {isExpanded ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 pt-2.5">
                      {group.items.map((item) => {
                        const isChecked = selectedAmenities.includes(item);
                        const count = amenityCounts[item] ?? 0;
                        return (
                          <label
                            key={item}
                            className="flex items-center justify-between cursor-pointer text-slate-600 hover:text-slate-900 transition select-none group"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleAmenity(item)}
                                className="w-4 h-4 rounded border-slate-300 text-[#001a43] focus:ring-[#001a43]/20 accent-[#001a43]"
                              />
                              <span className={`text-xs ${isChecked ? "font-semibold text-[#001a43]" : "font-normal"}`}>
                                {item}
                              </span>
                            </div>
                            {count > 0 && (
                              <span className="text-[10px] text-slate-400 font-normal">
                                {count}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Hotel Results Area */}
        <div className="flex-1 space-y-4 w-full">
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-[#dce3f1] rounded-2xl px-5 py-3 shadow-xs">
            <div className="text-xs text-slate-600 font-medium">
              Showing <strong className="text-[#001a43] font-bold">{filteredHotels.length}</strong> verified properties in Sri Lanka
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-normal">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-1.5 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#001a43] cursor-pointer"
              >
                <option value="recommended">Recommended Stays</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Guest Rating</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] text-slate-500 font-medium">Active:</span>
              {selectedCategory !== "All Stays" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("All Stays")} className="hover:text-red-500 cursor-pointer">
                    ×
                  </button>
                </span>
              )}
              {destinationSearch && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                  Location: {destinationSearch}
                  <button onClick={() => setDestinationSearch("")} className="hover:text-red-500 cursor-pointer">
                    ×
                  </button>
                </span>
              )}
              {selectedStars.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                  {s} Stars
                  <button onClick={() => toggleStar(s)} className="hover:text-red-500 cursor-pointer">
                    ×
                  </button>
                </span>
              ))}
              {selectedAmenities.map((a) => (
                <span key={a} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-medium">
                  {a}
                  <button onClick={() => toggleAmenity(a)} className="hover:text-red-500 cursor-pointer">
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-[#b08d1f] hover:underline cursor-pointer ml-1"
              >
                Reset all
              </button>
            </div>
          )}

          {/* Hotel Grid */}
          {filteredHotels.length === 0 ? (
            <div className="bg-white border border-[#dce3f1] rounded-2xl p-12 text-center text-slate-600 space-y-3">
              <span className="material-symbols-outlined text-4xl text-slate-400">hotel</span>
              <h3 className="font-bold text-base text-[#001a43]">No properties found</h3>
              <p className="text-xs max-w-sm mx-auto font-normal text-slate-500">
                No hotels match all your selected filters. Try broadening your budget or clearing some amenities.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 rounded-xl bg-[#001a43] text-white text-xs font-semibold mt-2 hover:bg-[#003d9b] transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => {
                const isSaved = savedHotelIds.includes(hotel.id);
                const sentiment = getHotelRatingSentiment(hotel.rating);

                return (
                  <div
                    key={hotel.id}
                    className="bg-white border border-[#dce3f1] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#b8c9ea] transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Photo Header */}
                    <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      {/* Top Badges & Actions */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                        {/* Wishlist Heart */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(hotel.id)}
                          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-red-500 shadow-sm transition active:scale-95 cursor-pointer"
                          aria-label="Save to favorites"
                        >
                          <span
                            className={`material-symbols-outlined text-[18px] ${
                              isSaved ? "text-red-500 fill-current" : ""
                            }`}
                            style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                          >
                            favorite
                          </span>
                        </button>

                        {/* Property Badge */}
                        {hotel.badge && (
                          <div className="bg-[#001a43]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-white">
                              {hotel.badge}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Location text on image */}
                      <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-normal drop-shadow">
                        <span className="material-symbols-outlined text-[16px] text-[#ffd977]">
                          location_on
                        </span>
                        <span>{hotel.location}</span>
                      </div>

                      {/* Photo count indicator */}
                      <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-md font-normal flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                        <span>{hotel.images?.length || 5}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Title & Rating */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                              {hotel.type}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-[#001a43] group-hover:text-[#003d9b] transition leading-snug">
                              {hotel.name}
                            </h3>
                          </div>

                          <div className="flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-1 text-[#735600] font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                              <span
                                className="material-symbols-outlined text-[15px] text-[#c9a227]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              <span>{hotel.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-normal mt-0.5">
                              {sentiment} ({hotel.reviewCount})
                            </span>
                          </div>
                        </div>

                        {/* Amenities Chips */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hotel.amenities.slice(0, 4).map((a) => (
                            <span
                              key={a}
                              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#f4f7fc] text-slate-600 border border-[#e2e8f0]"
                            >
                              {a}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-[11px] font-medium text-slate-500 px-1.5 py-0.5">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Price & Button */}
                      <div className="pt-3.5 border-t border-[#dce3f1] flex items-end justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 font-normal block">
                            Starting from
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-[#001a43]">
                              {hotel.pricePerNight}
                            </span>
                            <span className="text-[11px] text-slate-500 font-normal">/ night</span>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium block">
                            Includes taxes & fees
                          </span>
                        </div>

                        <Link
                          href={`/hotels/${hotel.id}`}
                          className="px-5 py-2.5 rounded-xl bg-[#001a43] hover:bg-[#003d9b] text-white font-semibold text-xs shadow-xs hover:shadow-md transition active:scale-98 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Details</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
