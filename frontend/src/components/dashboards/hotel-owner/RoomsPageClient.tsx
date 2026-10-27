"use client";

import { useState, useMemo, useRef } from "react";
import RoomCard from "./RoomCard";
import {
  type HotelRoom,
  type Bed,
  type PaxRate,
  type Photo,
  roomTypes,
  bedTypes,
  mealPlans,
  emptyPrices,
  occupancyLabel,
  getInitialHotelRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatus,
  calculateRoomStats,
  MAX_GUESTS,
} from "@/lib/hotel-rooms-logic";

interface RoomsPageClientProps {
  hotelId?: string;
}

export default function RoomsPageClient({ hotelId }: RoomsPageClientProps) {
  const [rooms, setRooms] = useState<HotelRoom[]>(() => getInitialHotelRooms(hotelId));
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  // Modal states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);

  // Form states for Add/Edit
  const [formRoomType, setFormRoomType] = useState<string>(roomTypes[0]);
  const [formName, setFormName] = useState<string>("");
  const [formBeds, setFormBeds] = useState<Bed[]>([{ type: "King bed", count: 1 }]);
  const [formSize, setFormSize] = useState<string>("35");
  const [formBathrooms, setFormBathrooms] = useState<string>("1");
  const [formQuantity, setFormQuantity] = useState<string>("4");
  const [formFloor, setFormFloor] = useState<number>(2);
  const [formRates, setFormRates] = useState<PaxRate[]>([
    {
      id: 1,
      adults: 1,
      prices: {
        roomOnly: "35000",
        bedBreakfast: "42000",
        halfBoard: "48000",
        breakfastLunch: "45000",
        fullBoard: "54000",
      },
    },
    {
      id: 2,
      adults: 2,
      prices: {
        roomOnly: "42000",
        bedBreakfast: "50000",
        halfBoard: "58000",
        breakfastLunch: "55000",
        fullBoard: "66000",
      },
    },
  ]);
  const [formPhotos, setFormPhotos] = useState<Photo[]>([
    {
      id: "p-def",
      name: "room-view.jpg",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Computed stats from domain logic
  const stats = useMemo(() => calculateRoomStats(rooms), [rooms]);

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      const matchCat = selectedCategory === "All" || r.roomType === selectedCategory;
      const matchStatus = selectedStatus === "All" || r.status === selectedStatus.toLowerCase();
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.roomType.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    });
  }, [rooms, selectedCategory, selectedStatus, search]);

  // Status handler
  const handleStatusChange = (id: number, newStatus: HotelRoom["status"]) => {
    setRooms((prev) => updateRoomStatus(prev, id, newStatus));
  };

  // Open editor for new room
  const handleOpenCreate = () => {
    setEditingRoomId(null);
    setFormRoomType(roomTypes[5]); // Deluxe Room
    setFormName("Deluxe Pool View");
    setFormBeds([{ type: "King bed", count: 1 }]);
    setFormSize("38");
    setFormBathrooms("1");
    setFormQuantity("4");
    setFormFloor(2);
    setFormRates([
      {
        id: 1,
        adults: 1,
        prices: {
          roomOnly: "38000",
          bedBreakfast: "44000",
          halfBoard: "50000",
          breakfastLunch: "48000",
          fullBoard: "58000",
        },
      },
      {
        id: 2,
        adults: 2,
        prices: {
          roomOnly: "46000",
          bedBreakfast: "54000",
          halfBoard: "64000",
          breakfastLunch: "60000",
          fullBoard: "74000",
        },
      },
    ]);
    setFormPhotos([
      {
        id: `p-${Date.now()}`,
        name: "room.jpg",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      },
    ]);
    setIsEditorOpen(true);
  };

  // Open editor for existing room
  const handleOpenEdit = (room: HotelRoom) => {
    setEditingRoomId(room.id);
    setFormRoomType(room.roomType);
    setFormName(room.name);
    setFormBeds(room.beds);
    setFormSize(room.size);
    setFormBathrooms(room.bathrooms);
    setFormQuantity(room.quantity);
    setFormFloor(room.floor || 1);
    setFormRates(room.rates);
    setFormPhotos(room.photos);
    setIsEditorOpen(true);
  };

  // Delete room
  const handleDeleteRoom = (id: number) => {
    if (confirm("Are you sure you want to remove this room listing?")) {
      setRooms((prev) => deleteRoom(prev, id));
    }
  };

  // Save room form
  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingRoomId !== null) {
      setRooms((prev) =>
        updateRoom(prev, editingRoomId, {
          roomType: formRoomType,
          name: formName.trim(),
          beds: formBeds,
          size: formSize,
          bathrooms: formBathrooms,
          quantity: formQuantity,
          floor: formFloor,
          rates: formRates,
          photos: formPhotos,
        })
      );
    } else {
      const newRoom: HotelRoom = {
        id: Date.now(),
        roomType: formRoomType,
        name: formName.trim(),
        beds: formBeds,
        size: formSize,
        bathrooms: formBathrooms,
        quantity: formQuantity,
        floor: formFloor,
        rates: formRates,
        photos: formPhotos,
        status: "available",
        amenities: ["Free Wi-Fi", "Air Conditioning", "Ensuite Bathroom"],
      };
      setRooms((prev) => addRoom(prev, newRoom));
    }

    setIsEditorOpen(false);
  };

  // Bed helpers
  const handleAddBedType = (type: string) => {
    if (!type) return;
    if (formBeds.some((b) => b.type === type)) return;
    setFormBeds((prev) => [...prev, { type, count: 1 }]);
  };

  const handleUpdateBedCount = (type: string, delta: number) => {
    setFormBeds((prev) =>
      prev
        .map((b) => {
          if (b.type !== type) return b;
          const nextCount = b.count + delta;
          return nextCount > 0 ? { ...b, count: nextCount } : b;
        })
        .filter((b) => b.count > 0)
    );
  };

  const handleRemoveBed = (type: string) => {
    setFormBeds((prev) => prev.filter((b) => b.type !== type));
  };

  // Rate helpers
  const handleAddRate = () => {
    if (formRates.length >= MAX_GUESTS) return;
    const nextAdults = Math.max(0, ...formRates.map((r) => r.adults)) + 1;
    setFormRates((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        adults: nextAdults,
        prices: emptyPrices(),
      },
    ]);
  };

  const handleRemoveRate = (id: number) => {
    if (formRates.length <= 1) return;
    setFormRates((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateMealPrice = (rateId: number, mealKey: string, price: string) => {
    setFormRates((prev) =>
      prev.map((r) =>
        r.id === rateId ? { ...r, prices: { ...r.prices, [mealKey]: price } } : r
      )
    );
  };

  // Photo uploads
  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      setFormPhotos((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, name: file.name, url }]);
    });
  };

  const handleRemovePhoto = (id: string) => {
    setFormPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const availableBedTypes = bedTypes.filter((t) => !formBeds.some((b) => b.type === t));

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-16">
      {/* ── Simple Clean Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Room Inventory &amp; Listings
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
            Manage your room units, occupancy pricing in LKR, and live booking availability.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#001a43] hover:bg-[#002766] text-white text-xs font-bold transition shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Add Room Type</span>
        </button>
      </div>

      {/* ── Summary Stats Row (Simple & Clean) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Room Categories
          </div>
          <div className="text-2xl font-black text-on-surface mt-1">{stats.totalTypes}</div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">
            {stats.totalUnits} total physical units
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Available Now
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {stats.available}
          </div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">
            Ready for instant check-in
          </div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Occupied
          </div>
          <div className="text-2xl font-black text-[#001a43] dark:text-primary mt-1">
            {stats.occupied}
          </div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Active guest stays</div>
        </div>

        <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-4 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Maintenance / Turn
          </div>
          <div className="text-2xl font-black text-amber-500 mt-1">
            {stats.cleaning + stats.maintenance}
          </div>
          <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">Sanitizing &amp; repairs</div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search room name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-[#001a43]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
              selectedCategory === "All"
                ? "bg-[#001a43] text-white"
                : "bg-surface-container text-on-surface-variant hover:text-on-surface"
            }`}
          >
            All Types
          </button>
          {roomTypes.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#001a43] text-white"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Rooms Grid ── */}
      {filteredRooms.length === 0 ? (
        <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-12 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl block mb-2">meeting_room</span>
          No rooms match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onStatusChange={handleStatusChange}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteRoom}
            />
          ))}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────── */}
      {/* ── ADD / EDIT ROOM MODAL (Multi-Pax Rates & Inventory)    ── */}
      {/* ──────────────────────────────────────────────────────────── */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-outline-variant bg-surface-container-low shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
              <div>
                <h3 className="text-base font-black text-on-surface">
                  {editingRoomId !== null ? "Edit Room Details & Pricing" : "Add New Room Listing"}
                </h3>
                <p className="text-xs text-on-surface-variant font-medium">
                  Configure room specifications, bed layouts, and occupancy meal rates in LKR.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveRoom} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
              {/* Basic Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Room Type *
                  </label>
                  <select
                    value={formRoomType}
                    onChange={(e) => setFormRoomType(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs font-bold"
                  >
                    {roomTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Room Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deluxe Ocean View Suite"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                    Room Size (sqm) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      value={formSize}
                      onChange={(e) => setFormSize(e.target.value)}
                      className="w-full p-2.5 pr-8 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-on-surface-variant">
                      m²
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formBathrooms}
                      onChange={(e) => setFormBathrooms(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-on-surface-variant uppercase tracking-wider">
                      Units Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-surface-container border border-outline-variant text-on-surface text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Beds in Room */}
              <div className="space-y-2 pt-2 border-t border-outline-variant">
                <span className="font-bold text-on-surface-variant uppercase tracking-wider block">
                  Beds in This Room
                </span>
                <div className="space-y-1.5">
                  {formBeds.map((bed) => (
                    <div
                      key={bed.type}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container border border-outline-variant"
                    >
                      <span className="font-bold text-on-surface">{bed.type}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateBedCount(bed.type, -1)}
                          disabled={bed.count <= 1}
                          className="w-6 h-6 rounded-lg bg-surface-container-high border border-outline-variant text-on-surface flex items-center justify-center font-bold disabled:opacity-30 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-5 text-center font-black text-on-surface">{bed.count}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateBedCount(bed.type, 1)}
                          className="w-6 h-6 rounded-lg bg-surface-container-high border border-outline-variant text-on-surface flex items-center justify-center font-bold cursor-pointer"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveBed(bed.type)}
                          className="ml-2 text-on-surface-variant hover:text-red-600 font-bold cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {availableBedTypes.length > 0 && (
                  <select
                    value=""
                    onChange={(e) => handleAddBedType(e.target.value)}
                    className="w-full p-2 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface-variant"
                  >
                    <option value="">+ Add a bed type...</option>
                    {availableBedTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Pricing by Guest Count (Pax Rates) */}
              <div className="space-y-3 pt-2 border-t border-outline-variant">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-on-surface-variant uppercase tracking-wider block">
                      Pricing by Guest Count (LKR) *
                    </span>
                    <p className="text-[11px] text-on-surface-variant">
                      Set rates per adult occupancy across meal plans.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddRate}
                    disabled={formRates.length >= MAX_GUESTS}
                    className="text-xs font-bold text-[#001a43] dark:text-primary hover:underline cursor-pointer"
                  >
                    + Add Pax
                  </button>
                </div>

                <div className="space-y-3">
                  {formRates.map((rate) => (
                    <div
                      key={rate.id}
                      className="p-3.5 rounded-xl bg-surface-container border border-outline-variant space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-on-surface text-xs flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#001a43] dark:bg-primary" />
                          <span>
                            {rate.adults} Adult{rate.adults > 1 ? "s" : ""}
                          </span>
                          <span className="text-on-surface-variant font-medium text-[11px]">
                            ({occupancyLabel(rate.adults)})
                          </span>
                        </span>
                        {formRates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveRate(rate.id)}
                            className="text-xs text-red-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {mealPlans.map((meal) => (
                          <div key={meal.key} className="space-y-1">
                            <label className="text-[10px] font-bold text-on-surface-variant block truncate">
                              {meal.label}
                            </label>
                            <input
                              type="number"
                              min="0"
                              placeholder="e.g. 45000"
                              value={rate.prices[meal.key] || ""}
                              onChange={(e) =>
                                handleUpdateMealPrice(rate.id, meal.key, e.target.value)
                              }
                              className="w-full p-1.5 rounded-lg bg-surface-container-low border border-outline-variant text-xs text-on-surface font-bold"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div className="space-y-2 pt-2 border-t border-outline-variant">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface-variant uppercase tracking-wider block">
                    Room Photos
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-[#001a43] dark:text-primary hover:underline cursor-pointer"
                  >
                    + Upload Photo
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />

                <div className="flex flex-wrap gap-2">
                  {formPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative w-20 h-16 rounded-lg overflow-hidden border border-outline-variant group"
                    >
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px] cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] cursor-pointer shadow-sm"
                >
                  {editingRoomId !== null ? "Update Room" : "Publish Room Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
