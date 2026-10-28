"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface HotelItem {
  id: string;
  name: string;
  type: string;
  location: string;
  district: string;
  pricePerNight: string;
  priceNum: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  amenities: string[];
}

const mockHotels: HotelItem[] = [
  {
    id: "h1",
    name: "Amangalla Galle Fort",
    type: "Luxury Resorts",
    location: "Galle Fort, Galle",
    district: "Galle",
    pricePerNight: "LKR 145,000",
    priceNum: 145000,
    rating: 4.9,
    reviewCount: 120,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badge: "PREMIUM",
    amenities: [
      "Swimming Pool",
      "Spa & Wellness Center",
      "Free Wi-Fi",
      "Air Conditioning",
      "Breakfast Included",
      "Restaurant",
      "24-Hour Front Desk",
    ],
  },
  {
    id: "h2",
    name: "98 Acres Resort & Spa",
    type: "Luxury Resorts",
    location: "Ella, Badulla District",
    district: "Badulla",
    pricePerNight: "LKR 65,000",
    priceNum: 65000,
    rating: 4.8,
    reviewCount: 350,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    badge: "SCENIC VIEW",
    amenities: [
      "Swimming Pool",
      "Spa & Wellness Center",
      "Free Wi-Fi",
      "Restaurant",
      "Terrace",
      "Garden",
      "Room Service",
    ],
  },
  {
    id: "h3",
    name: "Santani Wellness Resort",
    type: "Villa/Bungalow",
    location: "Werapitiya, Kandy",
    district: "Kandy",
    pricePerNight: "LKR 82,000",
    priceNum: 82000,
    rating: 4.9,
    reviewCount: 95,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    badge: "WELLNESS",
    amenities: [
      "Spa & Wellness Center",
      "Sauna",
      "Steam Room",
      "Free Wi-Fi",
      "Restaurant",
      "Garden",
      "Hot Water",
    ],
  },
  {
    id: "h4",
    name: "Chena Huts by Uga Escapes",
    type: "Luxury Resorts",
    location: "Yala National Park, Yala",
    district: "Hambantota",
    pricePerNight: "LKR 120,000",
    priceNum: 120000,
    rating: 5.0,
    reviewCount: 50,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    badge: "WILDLIFE",
    amenities: [
      "Swimming Pool",
      "Private Bathroom",
      "Bathtub",
      "Air Conditioning",
      "Free Wi-Fi",
      "Bar / Lounge",
      "24-Hour Security",
    ],
  },
  {
    id: "h5",
    name: "The Fortress Resort & Spa",
    type: "Luxury Resorts",
    location: "Koggala, Southern Province",
    district: "Galle",
    pricePerNight: "LKR 45,000",
    priceNum: 45000,
    rating: 4.7,
    reviewCount: 210,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    badge: "BEACHFRONT",
    amenities: [
      "Swimming Pool",
      "Kids Pool",
      "Fitness Center",
      "Restaurant",
      "Free Wi-Fi",
      "Air Conditioning",
      "Housekeeping",
    ],
  },
  {
    id: "h6",
    name: "Wild Coast Tented Lodge",
    type: "Villa/Bungalow",
    location: "Yala, Southern Province",
    district: "Hambantota",
    pricePerNight: "LKR 135,000",
    priceNum: 135000,
    rating: 4.9,
    reviewCount: 88,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    badge: "ECO-LUXURY",
    amenities: [
      "Swimming Pool",
      "Free Wi-Fi",
      "Bar / Lounge",
      "Restaurant",
      "Air Conditioning",
      "24-Hour Front Desk",
    ],
  },
  {
    id: "grand-azure",
    name: "Grand Azure Villa Colombo",
    type: "Villa/Bungalow",
    location: "Kollupitiya, Colombo 03",
    district: "Colombo",
    pricePerNight: "LKR 55,000",
    priceNum: 55000,
    rating: 4.9,
    reviewCount: 342,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    badge: "VERIFIED HOST",
    amenities: [
      "Swimming Pool",
      "Free Wi-Fi",
      "Air Conditioning",
      "Spa & Wellness Center",
      "Breakfast Included",
      "Bathtub",
      "24-Hour Security",
    ],
  },
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
  const [guestCount, setGuestCount] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "General Amenities": true,
    "Property & Wellness": true,
  });

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
    setGuestCount("");
    setSelectedAmenities([]);
  };

  const filteredHotels = useMemo(() => {
    return mockHotels.filter((hotel) => {
      // Category match
      if (selectedCategory !== "All Stays" && hotel.type !== selectedCategory) {
        return false;
      }

      // Destination search
      if (destinationSearch.trim()) {
        const q = destinationSearch.toLowerCase();
        const matchName = hotel.name.toLowerCase().includes(q);
        const matchLoc = hotel.location.toLowerCase().includes(q);
        const matchDist = hotel.district.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDist) return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllSelected = selectedAmenities.every((amenity) =>
          hotel.amenities.includes(amenity)
        );
        if (!hasAllSelected) return false;
      }

      return true;
    });
  }, [selectedCategory, destinationSearch, selectedAmenities]);

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      {/* ── Hero Banner (Matching Tourist Layout from Screenshot) ── */}
      <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#001534] via-[#001a43] to-[#022d6f] text-white shadow-xl p-8 md:p-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1800&q=80"
            alt="Sri Lanka scenic train and hill country"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001534]/95 via-[#001a43]/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#c9a227]/40 bg-white/10 backdrop-blur-md text-[#ffd977] text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd977]" />
            Explore With Confidence
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Find your perfect stay.
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-lg leading-relaxed">
            Discover a handpicked collection of verified luxury hotels, heritage villas, and scenic resorts across Sri Lanka.
          </p>
        </div>
      </section>

      {/* ── Search Bar Widget (Floating Card) ── */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mx-auto max-w-5xl px-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_18px_50px_rgba(0,26,67,0.12)] border border-[#dce3f1] flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Destination */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px]">
              location_on
            </span>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                Destination / Hotel
              </span>
              <input
                type="text"
                placeholder="Where in Sri Lanka?"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-[#001a43] placeholder:text-[#8a93a8] focus:outline-none"
              />
            </div>
          </div>

          {/* Check-in */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px]">
              calendar_today
            </span>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                Check-in
              </span>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-[#001a43] focus:outline-none"
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-[#dce3f1]">
            <span className="material-symbols-outlined text-[#001a43] text-[22px]">
              event_busy
            </span>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                Check-out
              </span>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-[#001a43] focus:outline-none"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 flex items-center gap-3 px-4 py-2">
            <span className="material-symbols-outlined text-[#001a43] text-[22px]">
              group
            </span>
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                Guests
              </span>
              <input
                type="text"
                placeholder="2 Adults, 1 Room"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="bg-transparent border-none p-0 text-xs sm:text-sm font-bold text-[#001a43] placeholder:text-[#8a93a8] focus:outline-none"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="px-8 py-3.5 rounded-2xl bg-[#001a43] text-white hover:bg-[#002766] font-bold text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>Search</span>
          </button>
        </div>
      </section>

      {/* ── Category Filter Pills ── */}
      <section className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-bold transition whitespace-nowrap cursor-pointer uppercase tracking-wider text-[11px] ${
              selectedCategory === cat
                ? "bg-[#001a43] text-white shadow-sm"
                : "bg-white text-[#4e5568] hover:text-[#001a43] border border-[#dce3f1]"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* ── Main Content: Sidebar Filters + Hotel Cards Grid ── */}
      <section className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className="w-full md:w-72 shrink-0 bg-white border border-[#dce3f1] rounded-2xl p-5 shadow-sm space-y-5 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#dce3f1]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#001a43] text-[18px]">
                filter_list
              </span>
              <h2 className="font-bold text-sm text-[#001a43] uppercase tracking-wider">
                Filters
              </h2>
            </div>
            {(selectedAmenities.length > 0 || destinationSearch || selectedCategory !== "All Stays") && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#b08d1f] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filter Categories (Accordion) */}
          <div className="space-y-4 text-xs">
            {filterGroups.map((group) => {
              const isExpanded = Boolean(expandedSections[group.title]);

              return (
                <div key={group.title} className="border-b border-[#dce3f1]/60 pb-3 last:border-0">
                  <button
                    type="button"
                    onClick={() => toggleSection(group.title)}
                    className="flex items-center justify-between w-full py-1 text-left font-bold text-[#001a43] cursor-pointer"
                  >
                    <span className="uppercase tracking-wider text-[11px]">{group.title}</span>
                    <span className="material-symbols-outlined text-[16px] text-[#6c7387]">
                      {isExpanded ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="space-y-2 pt-2.5">
                      {group.items.map((item) => {
                        const isChecked = selectedAmenities.includes(item);
                        return (
                          <label
                            key={item}
                            className="flex items-center gap-2.5 cursor-pointer text-[#4e5568] hover:text-[#001a43] transition select-none"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAmenity(item)}
                              className="w-4 h-4 rounded border-[#c5cde0] text-[#001a43] focus:ring-[#001a43]/20"
                            />
                            <span className={`text-xs ${isChecked ? "font-bold text-[#001a43]" : "font-medium"}`}>
                              {item}
                            </span>
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

        {/* Right Hotel Results Grid */}
        <div className="flex-1 space-y-4 w-full">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-[#6c7387] font-medium">
            <span>
              Showing <strong className="text-[#001a43]">{filteredHotels.length}</strong> verified properties
            </span>
            {selectedAmenities.length > 0 && (
              <span className="text-[#001a43] font-bold">
                Filtered by {selectedAmenities.length} amenities
              </span>
            )}
          </div>

          {filteredHotels.length === 0 ? (
            <div className="bg-white border border-[#dce3f1] rounded-2xl p-12 text-center text-[#6c7387] space-y-3">
              <span className="material-symbols-outlined text-4xl text-[#8a93a8]">hotel</span>
              <h3 className="font-bold text-base text-[#001a43]">No properties found</h3>
              <p className="text-xs max-w-sm mx-auto">
                No hotels match all your selected filters. Try clearing some amenities or searching for another location.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-xl bg-[#001a43] text-white text-xs font-bold mt-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white border border-[#dce3f1] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-[#001a43]/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Photo Header */}
                  <div className="relative h-60 w-full overflow-hidden bg-[#e0e8ff]">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Top Badge */}
                    {hotel.badge && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#dce3f1]">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#001a43]">
                          {hotel.badge}
                        </span>
                      </div>
                    )}

                    {/* Location on image */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-medium">
                      <span className="material-symbols-outlined text-[16px] text-[#ffd977]">
                        location_on
                      </span>
                      <span>{hotel.location}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-base font-black text-[#001a43] group-hover:text-[#002766] transition">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center gap-1 text-[#b08d1f] shrink-0 font-bold text-xs">
                          <span
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span>{hotel.rating}</span>
                          <span className="text-[#6c7387] font-normal text-[11px]">
                            ({hotel.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {hotel.amenities.slice(0, 4).map((a) => (
                          <span
                            key={a}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f5f7fc] text-[#4e5568] border border-[#dce3f1]"
                          >
                            {a}
                          </span>
                        ))}
                        {hotel.amenities.length > 4 && (
                          <span className="text-[10px] font-bold text-[#6c7387] px-1 py-0.5">
                            +{hotel.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Price & Booking Button */}
                    <div className="pt-3 border-t border-[#dce3f1] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#6c7387] font-medium block">
                          Starting from
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base font-black text-[#001a43]">
                            {hotel.pricePerNight}
                          </span>
                          <span className="text-[11px] text-[#6c7387]">/ night</span>
                        </div>
                      </div>

                      <Link
                        href={`/hotels/${hotel.id}`}
                        className="px-5 py-2.5 rounded-xl bg-[#001a43] hover:bg-[#002766] text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
                      >
                        View Hotel
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


