"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  type HotelDetail,
  type BookingFormState,
  type BookingError,
  type RoomOption,
  createDefaultBooking,
  validateBooking,
  calcNights,
  calcBookingBreakdown,
  formatLKR,
  generateBookingReference,
  mealPlanLabels,
} from "@/lib/hotel-detail-logic";
import { mealPlans, type MealKey } from "@/lib/hotel-rooms-logic";

// ── Amenity Icon Helper ──────────────────────────────────────────────────────
const amenityIcons: Record<string, string> = {
  "Swimming Pool": "pool",
  "Outdoor Pool": "pool",
  "Spa & Wellness Center": "spa",
  "Spa & Ayurveda": "spa",
  "Free Wi-Fi": "wifi",
  "Air Conditioning": "ac_unit",
  Restaurant: "restaurant",
  "The Verandah (Fine Dining)": "restaurant",
  "Bar / Lounge": "local_bar",
  "The Zaal (High Tea)": "emoji_food_beverage",
  "Poolside Service": "local_bar",
  "24-Hour Front Desk": "schedule",
  "24-hour Front Desk": "schedule",
  Concierge: "concierge",
  "Laundry Service": "local_laundry_service",
  "Breakfast Included": "free_breakfast",
  "Fitness Center": "fitness_center",
  "Yoga Pavilion": "self_improvement",
  "Yoga Studio": "self_improvement",
  "Steam Room": "hot_tub",
  Garden: "park",
  Terrace: "deck",
  "Room Service": "room_service",
  Sauna: "sauna",
  "Hot Water": "hot_tub",
  Bathtub: "bathtub",
  "24-Hour Security": "security",
  "Safari Included": "forest",
  "Ocean View": "water",
};

function getIcon(name: string): string {
  return amenityIcons[name] ?? "check_circle";
}

export default function HotelDetailContent({ hotel }: { hotel: HotelDetail }) {
  const [form, setForm] = useState<BookingFormState>(createDefaultBooking());
  const [errors, setErrors] = useState<BookingError[]>([]);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    room: RoomOption;
    nights: number;
    breakdown: ReturnType<typeof calcBookingBreakdown>;
  } | null>(null);

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const bookingWidgetRef = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const nights = useMemo(
    () => calcNights(form.checkIn, form.checkOut),
    [form.checkIn, form.checkOut]
  );

  const selectedRoom = useMemo(
    () => hotel.rooms.find((r) => r.id === form.roomId) ?? hotel.rooms[0],
    [hotel.rooms, form.roomId]
  );

  const priceBreakdown = useMemo(() => {
    if (!selectedRoom || !form.mealPlan) {
      return calcBookingBreakdown(selectedRoom ?? hotel.rooms[0], "bedBreakfast", 1, form.adults);
    }
    return calcBookingBreakdown(selectedRoom, form.mealPlan, nights > 0 ? nights : 1, form.adults);
  }, [selectedRoom, form.mealPlan, nights, form.adults, hotel.rooms]);

  const fieldError = (field: string) =>
    errors.find((e) => e.field === field)?.message ?? null;

  function set<K extends keyof BookingFormState>(key: K, value: BookingFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => prev.filter((e) => e.field !== key));
  }

  function scrollToBooking(roomId?: string) {
    if (roomId) {
      set("roomId", roomId);
    }
    bookingWidgetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const effectiveForm: BookingFormState = {
      ...form,
      roomId: form.roomId || hotel.rooms[0]?.id || "",
    };

    const validationErrors = validateBooking(effectiveForm, hotel.rooms);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      const firstErr = validationErrors[0];
      if (
        ["checkIn", "checkOut", "adults", "roomId", "mealPlan"].includes(firstErr.field)
      ) {
        bookingWidgetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const roomToBook = hotel.rooms.find((r) => r.id === effectiveForm.roomId) ?? hotel.rooms[0];
    const breakdown = calcBookingBreakdown(
      roomToBook,
      effectiveForm.mealPlan,
      calcNights(effectiveForm.checkIn, effectiveForm.checkOut),
      effectiveForm.adults
    );

    setConfirmedBooking({
      reference: generateBookingReference(),
      room: roomToBook,
      nights: calcNights(effectiveForm.checkIn, effectiveForm.checkOut),
      breakdown,
    });
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* ── Top Bar & Back Navigation ── */}
      <div className="flex items-center justify-between">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#dce3f1] text-[#001a43] hover:text-[#b08d1f] hover:border-[#b08d1f]/40 font-bold text-xs transition shadow-xs group"
        >
          <span className="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span>Back to Hotels</span>
        </Link>

        <div className="flex items-center gap-2">
          {hotel.badge && (
            <span className="px-3 py-1 rounded-full bg-[#001a43] text-white text-[10px] font-black uppercase tracking-widest shadow-xs">
              {hotel.badge}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-[#fdf7e7] text-[#b08d1f] border border-[#c9a227]/30 text-[10px] font-bold uppercase tracking-wider">
            {hotel.type}
          </span>
        </div>
      </div>

      {/* ── Hero Section (Matching Stitch Design) ── */}
      <header className="relative min-h-[500px] md:min-h-[560px] rounded-[32px] overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-14 shadow-xl border border-[#dce3f1]/50">
        <div className="absolute inset-0 z-0">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001534] via-[#001a43]/70 to-black/25" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#ffd977]">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>{hotel.location}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            {hotel.name}
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-medium max-w-2xl leading-relaxed">
            {hotel.description}
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToBooking()}
              className="px-7 py-3.5 rounded-2xl bg-[#c9a227] hover:bg-[#b08d1f] text-[#001a43] font-black text-xs uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Book Your Stay</span>
            </button>

            <button
              onClick={() => {
                setActivePhotoIndex(0);
                setLightboxOpen(true);
              }}
              className="px-6 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">photo_library</span>
              <span>View Photos ({hotel.images.length})</span>
            </button>

            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-white text-xs">
              <span
                className="material-symbols-outlined text-[#ffd977] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <strong className="font-bold">{hotel.rating}</strong>
              <span className="text-white/70">({hotel.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Photo Lightbox Modal ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition z-10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <button
            onClick={() => setActivePhotoIndex((p) => Math.max(0, p - 1))}
            disabled={activePhotoIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition disabled:opacity-30 z-10"
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={hotel.images[activePhotoIndex]}
              alt={`${hotel.name} slide`}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-white/70 text-xs font-semibold mt-3">
              Photo {activePhotoIndex + 1} of {hotel.images.length}
            </p>
          </div>

          <button
            onClick={() => setActivePhotoIndex((p) => Math.min(hotel.images.length - 1, p + 1))}
            disabled={activePhotoIndex === hotel.images.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition disabled:opacity-30 z-10"
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>
      )}

      {/* ── Heritage & Elegance Section (from Stitch) ── */}
      <section className="bg-white rounded-[28px] border border-[#dce3f1] p-8 md:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f4ff] border border-[#001a43]/15 text-[#001a43] text-[10px] font-bold uppercase tracking-widest">
              <span>Living Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-[#001a43] leading-tight">
              {hotel.storyHeading ?? "Heritage & Elegance"}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#4e5568] leading-relaxed">
              {(hotel.storyParagraphs ?? [hotel.description]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Historic milestone chips */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#f8fbff] border border-[#dce3f1] min-w-[140px]">
                <span className="text-2xl sm:text-3xl font-black text-[#001a43] block">
                  {hotel.establishedYear ?? "1684"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                  ESTABLISHED
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#f8fbff] border border-[#dce3f1] min-w-[160px]">
                <span className="text-xl sm:text-2xl font-black text-[#b08d1f] block">
                  UNESCO
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6c7387]">
                  {hotel.siteCategory ?? "SITE LOCATION"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-[#dce3f1] shadow-lg group">
              <img
                src={hotel.storyImage ?? hotel.images[1] ?? hotel.images[0]}
                alt={`${hotel.name} interior`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/40 text-[11px] font-bold text-[#001a43]">
                Historic Architecture & Serene Courtyards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accommodations Section (from Stitch) ── */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b08d1f]">
            Sanctuary & Comfort
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#001a43]">
            Our Accommodations
          </h2>
          <p className="text-xs sm:text-sm text-[#6c7387]">
            Select an accommodation to check pricing with verified multi-meal plans in LKR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotel.rooms.map((room) => {
            const isSelected = form.roomId === room.id;
            return (
              <div
                key={room.id}
                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-lg ${
                  isSelected
                    ? "border-[#001a43] ring-2 ring-[#001a43]/20"
                    : "border-[#dce3f1] hover:border-[#001a43]/40"
                }`}
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#e0e8ff]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                      <span className="text-xs font-black text-[#001a43]">
                        {formatLKR(room.basePriceLKR)}
                      </span>
                      <span className="text-[10px] text-[#6c7387]"> / night</span>
                    </div>

                    {room.popular && (
                      <div className="absolute top-4 right-4 bg-[#c9a227] text-[#001a43] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#b08d1f]">
                        {room.roomType}
                      </span>
                      <h3 className="text-lg font-black text-[#001a43]">{room.name}</h3>
                    </div>

                    <ul className="space-y-2 text-xs font-semibold text-[#4e5568]">
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#001a43]">
                          bed
                        </span>
                        <span>{room.bedSummary}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#001a43]">
                          square_foot
                        </span>
                        <span>{room.size} sqm</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-[#001a43]">
                          group
                        </span>
                        <span>Max {room.maxGuests} guests</span>
                      </li>
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {room.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f5f7fc] text-[#4e5568] border border-[#dce3f1]"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => scrollToBooking(room.id)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs transition cursor-pointer shadow-xs ${
                      isSelected
                        ? "bg-[#001a43] text-white"
                        : "bg-[#f0f4ff] text-[#001a43] hover:bg-[#001a43] hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected Room ✓" : "Check Availability & Book"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Curated Signature Amenities Section (from Stitch) ── */}
      {hotel.signatureFacilities && (
        <section className="bg-white rounded-[28px] border border-[#dce3f1] p-8 md:p-12 space-y-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b08d1f]">
              Exceptional Moments
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001a43]">
              World-Class Facilities
            </h2>
            <p className="text-xs sm:text-sm text-[#6c7387]">
              Immerse yourself in the tranquility of our curated spaces, designed for relaxation and cultural immersion.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {hotel.signatureFacilities.map((fac) => (
              <div
                key={fac.title}
                className="bg-[#f8fbff] rounded-2xl border border-[#dce3f1] p-6 flex flex-col items-center text-center space-y-3 hover:border-[#001a43]/30 transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#001a43]/5 flex items-center justify-center text-[#001a43] group-hover:bg-[#001a43] group-hover:text-white transition">
                  <span className="material-symbols-outlined text-2xl">{fac.icon}</span>
                </div>
                <h3 className="text-sm font-black text-[#001a43]">{fac.title}</h3>
                <p className="text-[11px] text-[#6c7387] leading-relaxed">
                  {fac.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Grouped Amenities Breakdown (from Stitch) ── */}
      {hotel.categorizedAmenities && (
        <section className="bg-white rounded-[28px] border border-[#dce3f1] p-8 md:p-12 space-y-6 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-black text-[#001a43]">
            Hotel Amenities & Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotel.categorizedAmenities.map((group) => (
              <div key={group.category} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#dce3f1]">
                  <span className="material-symbols-outlined text-[#001a43] text-lg">
                    {group.icon}
                  </span>
                  <h3 className="font-bold text-sm text-[#001a43] uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-xs text-[#4e5568] font-medium">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[16px] text-[#001a43]">
                        {getIcon(item)}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Main Booking & Reservation Section (Interactive Logic Layer) ── */}
      <section
        ref={bookingWidgetRef}
        id="booking-section"
        className="bg-white rounded-[32px] border border-[#dce3f1] p-6 sm:p-10 md:p-12 shadow-xl space-y-8"
      >
        <div className="border-b border-[#dce3f1] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b08d1f]">
              <span className="w-2 h-2 rounded-full bg-[#c9a227]" />
              Secure Online Reservation
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001a43] mt-1">
              Book Your Experience at {hotel.name}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#6c7387] font-semibold block">
              Direct Booking Guarantee
            </span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 inline-block mt-0.5">
              Best Rate & Instant Confirmation
            </span>
          </div>
        </div>

        <form onSubmit={handleBookingSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Stay Details & Guest Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Dates & Guests */}
              <div className="bg-[#f8fbff] rounded-2xl p-5 border border-[#dce3f1] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#001a43] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">calendar_today</span>
                  <span>1. Stay Duration & Guests</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Check-in Date *
                    </label>
                    <input
                      type="date"
                      min={todayStr}
                      value={form.checkIn}
                      onChange={(e) => set("checkIn", e.target.value)}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 transition ${
                        fieldError("checkIn")
                          ? "border-red-500 focus:ring-red-100"
                          : "border-[#dce3f1] focus:ring-[#001a43]/10 focus:border-[#001a43]"
                      }`}
                    />
                    {fieldError("checkIn") && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {fieldError("checkIn")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Check-out Date *
                    </label>
                    <input
                      type="date"
                      min={form.checkIn || todayStr}
                      value={form.checkOut}
                      onChange={(e) => set("checkOut", e.target.value)}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 transition ${
                        fieldError("checkOut")
                          ? "border-red-500 focus:ring-red-100"
                          : "border-[#dce3f1] focus:ring-[#001a43]/10 focus:border-[#001a43]"
                      }`}
                    />
                    {fieldError("checkOut") && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {fieldError("checkOut")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Adult Guests *
                    </label>
                    <select
                      value={form.adults}
                      onChange={(e) => set("adults", Number(e.target.value))}
                      className="w-full rounded-xl border border-[#dce3f1] px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 focus:ring-[#001a43]/10 focus:border-[#001a43] transition"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Children (0-12 yrs)
                    </label>
                    <select
                      value={form.children}
                      onChange={(e) => set("children", Number(e.target.value))}
                      className="w-full rounded-xl border border-[#dce3f1] px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 focus:ring-[#001a43]/10 focus:border-[#001a43] transition"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Child" : "Children"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 2: Room Selection */}
              <div className="bg-[#f8fbff] rounded-2xl p-5 border border-[#dce3f1] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#001a43] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-base">hotel</span>
                    <span>2. Select Accommodation *</span>
                  </div>
                  {fieldError("roomId") && (
                    <span className="text-[10px] text-red-500 font-bold">
                      {fieldError("roomId")}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {hotel.rooms.map((room) => {
                    const isSelected = form.roomId === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => set("roomId", room.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                          isSelected
                            ? "bg-white border-[#001a43] shadow-md ring-2 ring-[#001a43]/10"
                            : "bg-white/70 border-[#dce3f1] hover:border-[#001a43]/30"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-black uppercase text-[#001a43]">
                              {room.name}
                            </span>
                            {isSelected && (
                              <span className="material-symbols-outlined text-[#001a43] text-sm">
                                check_circle
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6c7387]">{room.size} sqm · Max {room.maxGuests}pax</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#dce3f1]/60">
                          <span className="text-xs font-black text-[#b08d1f]">
                            {formatLKR(room.basePriceLKR)}
                          </span>
                          <span className="text-[9px] text-[#6c7387]"> / night</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Meal Plan Selection */}
              <div className="bg-[#f8fbff] rounded-2xl p-5 border border-[#dce3f1] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#001a43] uppercase tracking-wider">
                    <span className="material-symbols-outlined text-base">restaurant_menu</span>
                    <span>3. Choose Meal Plan *</span>
                  </div>
                  {fieldError("mealPlan") && (
                    <span className="text-[10px] text-red-500 font-bold">
                      {fieldError("mealPlan")}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mealPlans.map((mp) => {
                    const isChecked = form.mealPlan === mp.key;
                    const price = selectedRoom?.mealPrices[mp.key] ?? selectedRoom?.basePriceLKR ?? 0;
                    return (
                      <label
                        key={mp.key}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition text-xs ${
                          isChecked
                            ? "bg-white border-[#001a43] ring-1 ring-[#001a43]/20 shadow-xs"
                            : "bg-white/60 border-[#dce3f1] hover:border-[#001a43]/30"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="mealPlan"
                            value={mp.key}
                            checked={isChecked}
                            onChange={() => set("mealPlan", mp.key)}
                            className="accent-[#001a43]"
                          />
                          <span className="font-bold text-[#001a43]">{mp.label}</span>
                        </div>
                        <span className="font-black text-[#b08d1f]">
                          {formatLKR(price)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Guest Contact Details */}
              <div className="bg-[#f8fbff] rounded-2xl p-5 border border-[#dce3f1] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#001a43] uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">person</span>
                  <span>4. Primary Guest Contact Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={form.guestName}
                      onChange={(e) => set("guestName", e.target.value)}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 transition ${
                        fieldError("guestName")
                          ? "border-red-500 focus:ring-red-100"
                          : "border-[#dce3f1] focus:ring-[#001a43]/10 focus:border-[#001a43]"
                      }`}
                    />
                    {fieldError("guestName") && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {fieldError("guestName")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="sarah@example.com"
                      value={form.guestEmail}
                      onChange={(e) => set("guestEmail", e.target.value)}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 transition ${
                        fieldError("guestEmail")
                          ? "border-red-500 focus:ring-red-100"
                          : "border-[#dce3f1] focus:ring-[#001a43]/10 focus:border-[#001a43]"
                      }`}
                    />
                    {fieldError("guestEmail") && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {fieldError("guestEmail")}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={form.guestPhone}
                      onChange={(e) => set("guestPhone", e.target.value)}
                      className={`w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-[#001a43] bg-white outline-none focus:ring-2 transition ${
                        fieldError("guestPhone")
                          ? "border-red-500 focus:ring-red-100"
                          : "border-[#dce3f1] focus:ring-[#001a43]/10 focus:border-[#001a43]"
                      }`}
                    />
                    {fieldError("guestPhone") && (
                      <p className="text-[10px] text-red-500 font-semibold mt-1">
                        {fieldError("guestPhone")}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6c7387] mb-1.5">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Airport pickup, dietary preferences, honeymoon setup, late check-in..."
                      value={form.specialRequests}
                      onChange={(e) => set("specialRequests", e.target.value)}
                      className="w-full rounded-xl border border-[#dce3f1] px-3.5 py-2.5 text-xs text-[#001a43] bg-white outline-none focus:ring-2 focus:ring-[#001a43]/10 focus:border-[#001a43] transition resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Sticky Summary Card & Live Price Calculation */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="bg-[#001a43] text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ffd977] block">
                    Reservation Summary
                  </span>
                  <h3 className="text-xl font-black mt-1">{hotel.name}</h3>
                  <p className="text-xs text-white/70">{hotel.location}</p>
                </div>

                {/* Selected Details */}
                <div className="space-y-3 py-4 border-y border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Accommodation</span>
                    <span className="font-bold text-white">{selectedRoom?.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Dates</span>
                    <span className="font-bold text-white">
                      {form.checkIn && form.checkOut
                        ? `${form.checkIn} to ${form.checkOut}`
                        : "Select dates"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Duration</span>
                    <span className="font-bold text-[#ffd977]">
                      {nights > 0 ? `${nights} Night${nights > 1 ? "s" : ""}` : "1 Night (est.)"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Guests</span>
                    <span className="font-bold text-white">
                      {form.adults} Adults{form.children > 0 ? `, ${form.children} Children` : ""}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Meal Plan</span>
                    <span className="font-bold text-white">
                      {form.mealPlan ? mealPlanLabels[form.mealPlan] : "Bed & Breakfast"}
                    </span>
                  </div>
                </div>

                {/* Live Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-white/80">
                    <span>Rate / Night</span>
                    <span>{formatLKR(priceBreakdown.nightlyRate)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Base Total ({priceBreakdown.nights} nights)</span>
                    <span>{formatLKR(priceBreakdown.baseTotal)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>10% Service Charge</span>
                    <span>{formatLKR(priceBreakdown.serviceCharge)}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>2.5% Tourism Development Levy</span>
                    <span>{formatLKR(priceBreakdown.tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-white/20 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-black text-white block">Total Payable</span>
                      <span className="text-[10px] text-white/60">Taxes & fees included</span>
                    </div>
                    <span className="text-2xl font-black text-[#ffd977]">
                      {formatLKR(priceBreakdown.total)}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#c9a227] hover:bg-[#b08d1f] text-[#001a43] font-black text-sm uppercase tracking-wider transition shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Confirm & Complete Booking</span>
                </button>

                <div className="space-y-1 text-center">
                  <p className="text-[11px] text-white/70 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm text-green-400">check</span>
                    <span>No advance fee required today</span>
                  </p>
                  <p className="text-[10px] text-white/50">{hotel.refundPolicy}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* ── Hotel Policies Section (from Stitch) ── */}
      {hotel.policies && (
        <section className="bg-white rounded-[28px] border border-[#dce3f1] p-8 md:p-12 space-y-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b08d1f]">
              Guest Standards
            </span>
            <h2 className="text-2xl font-black text-[#001a43]">Hotel Policies</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotel.policies.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-2xl border border-[#dce3f1] bg-[#f8fbff] space-y-3"
              >
                <div className="flex items-center gap-2.5 text-[#001a43]">
                  <span className="material-symbols-outlined text-xl">{p.icon}</span>
                  <h3 className="font-bold text-sm">{p.title}</h3>
                </div>
                <ul className="text-xs text-[#4e5568] space-y-1.5 font-medium">
                  {p.lines.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Location & Surroundings Section (from Stitch) ── */}
      <section className="bg-white rounded-[28px] border border-[#dce3f1] p-8 md:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] border border-[#dce3f1] shadow-md group">
            <img
              src={
                hotel.mapImage ??
                "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80"
              }
              alt={`${hotel.name} location area`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#dce3f1] flex items-center justify-between shadow-lg">
              <div>
                <p className="font-black text-sm text-[#001a43]">{hotel.location}</p>
                <p className="text-[11px] text-[#6c7387]">{hotel.district} District, Sri Lanka</p>
              </div>
              <span className="material-symbols-outlined text-[#001a43] text-2xl">
                location_on
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b08d1f]">
              Neighbourhood
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#001a43]">
              In the Heart of {hotel.district}
            </h2>
            <p className="text-sm text-[#4e5568] leading-relaxed">
              Situated in an optimal location for exploring historical sites, scenic vistas, and coastal attractions. Wander through cobblestone streets lined with boutiques, cafes, and ocean sunsets.
            </p>

            <ul className="space-y-4">
              {(hotel.locationHighlights ?? [
                {
                  icon: "directions_walk",
                  title: "5 min to Historic Attractions",
                  subtitle: "Easy access to cultural landmarks.",
                },
                {
                  icon: "wb_twilight",
                  title: "Panoramic Sunset Points",
                  subtitle: "Ideal coastal and mountain viewpoints.",
                },
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center shrink-0 text-[#001a43]">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#001a43]">{item.title}</p>
                    <p className="text-xs text-[#6c7387]">{item.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Booking Confirmation Modal ── */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 space-y-6 border border-[#dce3f1]">
            <div className="text-center space-y-3">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-inner">
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#001a43]">Booking Confirmed!</h2>
              <p className="text-xs text-[#6c7387]">
                Your reservation at <strong>{hotel.name}</strong> has been received and confirmed.
              </p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#f8fbff] border border-[#dce3f1] text-[#001a43] font-mono text-xs font-bold">
                Ref: {confirmedBooking.reference}
              </div>
            </div>

            <div className="bg-[#f8fbff] rounded-2xl p-5 border border-[#dce3f1] space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6c7387]">Guest</span>
                <span className="font-bold text-[#001a43]">{form.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6c7387]">Accommodation</span>
                <span className="font-bold text-[#001a43]">{confirmedBooking.room.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6c7387]">Stay</span>
                <span className="font-bold text-[#001a43]">
                  {form.checkIn} → {form.checkOut} ({confirmedBooking.nights} nights)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6c7387]">Party</span>
                <span className="font-bold text-[#001a43]">
                  {form.adults} Adults{form.children > 0 ? `, ${form.children} Children` : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6c7387]">Meal Plan</span>
                <span className="font-bold text-[#001a43]">
                  {mealPlanLabels[form.mealPlan as MealKey]}
                </span>
              </div>
              <div className="pt-2 border-t border-[#dce3f1] flex justify-between items-baseline font-black">
                <span className="text-sm text-[#001a43]">Total Amount</span>
                <span className="text-base text-[#b08d1f]">
                  {formatLKR(confirmedBooking.breakdown.total)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl border border-[#dce3f1] text-[#001a43] font-bold text-xs hover:bg-[#f8fbff] transition cursor-pointer"
              >
                Print Voucher
              </button>
              <button
                onClick={() => {
                  setConfirmedBooking(null);
                  setForm(createDefaultBooking());
                }}
                className="flex-1 py-3 rounded-xl bg-[#001a43] text-white font-bold text-xs hover:bg-[#002766] transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
