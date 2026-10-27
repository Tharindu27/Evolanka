"use client";

import { useState, useMemo } from "react";
import RoomCard, { RoomItem } from "./RoomCard";

const mockRooms: RoomItem[] = [
  {
    id: "r1",
    number: "301",
    name: "Ocean Deluxe Suite",
    category: "Suite",
    floor: 3,
    capacity: 2,
    bedType: "King Bed",
    pricePerNight: "LKR 55,000",
    status: "occupied",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    amenities: ["Ocean View", "Balcony", "Jacuzzi", "High-speed WiFi", "Espresso Bar"],
  },
  {
    id: "r2",
    number: "102",
    name: "Private Pool Lagoon Villa",
    category: "Villa",
    floor: 1,
    capacity: 4,
    bedType: "2 King Beds",
    pricePerNight: "LKR 95,000",
    status: "occupied",
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Pool", "Lagoon Access", "Outdoor Shower", "Butler Service"],
  },
  {
    id: "r3",
    number: "304",
    name: "Azure Horizon Suite",
    category: "Suite",
    floor: 3,
    capacity: 2,
    bedType: "King Bed",
    pricePerNight: "LKR 62,000",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    amenities: ["Sunset View", "Mini Bar", "Bathtub", "Smart TV 65\"", "Breakfast Included"],
  },
  {
    id: "r4",
    number: "501",
    name: "Presidential Sky Penthouse",
    category: "Penthouse",
    floor: 5,
    capacity: 6,
    bedType: "3 Master Kings",
    pricePerNight: "LKR 180,000",
    status: "occupied",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
    amenities: ["Panoramic Rooftop", "Private Chef Kitchen", "Infinity Plunge Pool", "Chauffeur"],
  },
  {
    id: "r5",
    number: "201",
    name: "Ceylon Heritage Double",
    category: "Heritage",
    floor: 2,
    capacity: 2,
    bedType: "Queen Bed",
    pricePerNight: "LKR 38,000",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    amenities: ["Antique Teak Furnishing", "Courtyard View", "Ensuite Bath", "Organic Tea Bar"],
  },
  {
    id: "r6",
    number: "105",
    name: "Royal Garden Villa",
    category: "Villa",
    floor: 1,
    capacity: 4,
    bedType: "King + 2 Twins",
    pricePerNight: "LKR 88,000",
    status: "cleaning",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Garden", "Plunge Pool", "Sun Deck", "Barbecue Pavilion"],
  },
  {
    id: "r7",
    number: "204",
    name: "Colonial Garden Suite",
    category: "Heritage",
    floor: 2,
    capacity: 2,
    bedType: "King Bed",
    pricePerNight: "LKR 42,000",
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
    amenities: ["Garden Terrace", "Rain Shower", "Work Desk", "Espresso Machine"],
  },
  {
    id: "r8",
    number: "305",
    name: "Sunset Panorama Suite",
    category: "Suite",
    floor: 3,
    capacity: 2,
    bedType: "King Bed",
    pricePerNight: "LKR 58,000",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80",
    amenities: ["West Coast View", "Balcony", "Sound System", "Pillow Menu"],
  },
];

interface RoomsPageClientProps {
  hotelId: string;
}

export default function RoomsPageClient({ hotelId }: RoomsPageClientProps) {
  const [rooms, setRooms] = useState<RoomItem[]>(mockRooms);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const matchCat = selectedCategory === "All" || r.category === selectedCategory;
      const matchStatus = selectedStatus === "All" || r.status === selectedStatus.toLowerCase();
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.number.includes(search) ||
        r.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [rooms, selectedCategory, selectedStatus, search]);

  const stats = useMemo(() => {
    return {
      total: rooms.length,
      available: rooms.filter((r) => r.status === "available").length,
      occupied: rooms.filter((r) => r.status === "occupied").length,
      maintenance: rooms.filter((r) => r.status === "maintenance" || r.status === "cleaning").length,
    };
  }, [rooms]);

  const handleStatusChange = (id: string, newStatus: RoomItem["status"]) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Room Inventory &amp; Units
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Real-time control over room availability, pricing tiers, and maintenance schedules
          </p>
        </div>
      </div>

      {/* ── Summary Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Total Rooms</div>
          <div className="text-2xl font-black text-on-surface mt-1">{stats.total}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">32 total property units</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Available Today</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.available}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Ready for instant book</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Occupied</div>
          <div className="text-2xl font-black text-[#001a43] dark:text-primary mt-1">{stats.occupied}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Active guest stays</div>
        </div>
        <div className="rounded-[22px] border border-outline-variant bg-surface-container-low p-4 shadow-[0_8px_24px_rgba(0,26,67,0.03)]">
          <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Cleaning / Maint.</div>
          <div className="text-2xl font-black text-amber-500 dark:text-amber-400 mt-1">{stats.maintenance}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Turnover in progress</div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-[0_10px_30px_rgba(0,26,67,0.04)]">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search room by number or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-surface-container border border-outline-variant text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-[#001a43] dark:focus:border-primary transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container rounded-full border border-outline-variant">
          {["All", "Suite", "Villa", "Heritage", "Penthouse"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>

        {/* Status Dropdown/Pills */}
        <div className="flex items-center gap-1 p-1 bg-surface-container rounded-full border border-outline-variant">
          {["All", "Available", "Occupied", "Cleaning", "Maintenance"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? "bg-[#c9a227] text-[#001a43] shadow-sm font-black"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ── Rooms Grid ── */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-12 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl block mb-2 text-on-surface-variant">
            meeting_room
          </span>
          No rooms match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}
