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
  getHotelRatingSentiment,
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
  const [form, setForm] = useState<BookingFormState>(() => {
    const defaultState = createDefaultBooking();
    return {
      ...defaultState,
      roomId: hotel.rooms[0]?.id ?? "",
    };
  });

  const [errors, setErrors] = useState<BookingError[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [confirmedBooking, setConfirmedBooking] = useState<{
    reference: string;
    room: RoomOption;
    nights: number;
    breakdown: ReturnType<typeof calcBookingBreakdown>;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    mealPlanLabel: string;
  } | null>(null);

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

  function handleRoomSelect(roomId: string) {
    set("roomId", roomId);
    bookingWidgetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  }

  function openCheckoutDrawer() {
    const validationErrors = validateBooking(form, hotel.rooms);
    // Filter only dates & room errors for opening the modal
    const initialErrors = validationErrors.filter((e) =>
      ["checkIn", "checkOut", "adults", "roomId", "mealPlan"].includes(e.field)
    );

    if (initialErrors.length > 0) {
      setErrors(initialErrors);
      bookingWidgetRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors([]);
    setIsCheckoutModalOpen(true);
  }

  function handleFinalBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const effectiveForm: BookingFormState = {
      ...form,
      roomId: form.roomId || hotel.rooms[0]?.id || "",
    };

    const validationErrors = validateBooking(effectiveForm, hotel.rooms);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
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
      guestName: effectiveForm.guestName,
      guestEmail: effectiveForm.guestEmail,
      guestPhone: effectiveForm.guestPhone,
      mealPlanLabel: mealPlanLabels[effectiveForm.mealPlan as MealKey] ?? "Bed & Breakfast",
    });

    setIsCheckoutModalOpen(false);
  }

  const sentiment = getHotelRatingSentiment(hotel.rating);
  const galleryImages = hotel.images.length >= 5 ? hotel.images : [
    ...hotel.images,
    "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  ].slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ── Top Bar with Small Back Button ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Small Back Button */}
        <Link
          href="/hotels"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#001a43] text-xs font-medium transition cursor-pointer shadow-xs group w-fit"
        >
          <span className="material-symbols-outlined text-[16px] transition-transform group-hover:-translate-x-0.5 text-slate-500 group-hover:text-[#001a43]">
            arrow_back
          </span>
          <span>Back to Hotels</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {copiedLink && (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 animate-in fade-in">
              Link copied!
            </span>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer shadow-xs ${
              isSaved
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>

      {/* ── Property Header ── */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {hotel.badge && (
            <span className="px-3 py-1 rounded-full bg-[#001a43] text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs">
              {hotel.badge}
            </span>
          )}
          <span className="px-3 py-1 rounded-full bg-amber-50 text-[#8c6f13] border border-[#c9a227]/30 text-[10px] font-semibold uppercase tracking-wider">
            {hotel.type}
          </span>
          {hotel.establishedYear && (
            <span className="text-xs text-slate-500 font-medium">
              Est. {hotel.establishedYear}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#001a43] tracking-tight leading-tight">
          {hotel.name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-slate-600 font-normal">
            <span className="material-symbols-outlined text-[#001a43] text-base">
              location_on
            </span>
            <span>{hotel.location}</span>
          </div>

          <span className="text-slate-300">•</span>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-amber-400 text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <strong className="font-bold text-[#001a43]">{hotel.rating.toFixed(1)}</strong>
            <span className="text-slate-500 font-normal">
              · {sentiment} ({hotel.reviewCount} verified reviews)
            </span>
          </div>
        </div>
      </div>

      {/* ── Luxury 5-Photo Mosaic Grid ── */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-[#dce3f1]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[420px] md:h-[460px]">
          {/* Master Large Photo (Left 2 cols) */}
          <div
            onClick={() => {
              setActivePhotoIndex(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-2 relative h-full overflow-hidden cursor-pointer group bg-slate-100"
          >
            <img
              src={galleryImages[0]}
              alt={`${hotel.name} featured`}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>

          {/* Complementary Photos (Right 2 cols: 2x2 grid) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {galleryImages.slice(1, 5).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePhotoIndex(idx + 1);
                  setLightboxOpen(true);
                }}
                className="relative h-full overflow-hidden cursor-pointer group bg-slate-100"
              >
                <img
                  src={imgUrl}
                  alt={`${hotel.name} detail ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                {/* Show All Photos Button on the 4th thumbnail */}
                {idx === 3 && (
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-2 group-hover:bg-black/45 transition">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-[#001a43] text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-white transition"
                    >
                      <span className="material-symbols-outlined text-base">photo_library</span>
                      <span>Show all photos</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View Photos trigger */}
        <button
          type="button"
          onClick={() => {
            setActivePhotoIndex(0);
            setLightboxOpen(true);
          }}
          className="md:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-[#001a43] text-xs font-semibold shadow-md flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">photo_library</span>
          <span>View all photos ({hotel.images.length})</span>
        </button>
      </section>

      {/* ── Photo Lightbox Modal ── */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition z-10 cursor-pointer"
            aria-label="Close gallery"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <button
            onClick={() => setActivePhotoIndex((p) => Math.max(0, p - 1))}
            disabled={activePhotoIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition disabled:opacity-30 z-10 cursor-pointer"
            aria-label="Previous photo"
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={galleryImages[activePhotoIndex]}
              alt={`${hotel.name} slide`}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-white/80 text-xs font-medium mt-3">
              Photo {activePhotoIndex + 1} of {galleryImages.length}
            </p>
          </div>

          <button
            onClick={() => setActivePhotoIndex((p) => Math.min(galleryImages.length - 1, p + 1))}
            disabled={activePhotoIndex === galleryImages.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition disabled:opacity-30 z-10 cursor-pointer"
            aria-label="Next photo"
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>
      )}

      {/* ── Core Two-Column Layout (Content Left, Sticky Booking Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left Column: Story, Amenities, Rooms, Policies */}
        <div className="lg:col-span-8 space-y-10">
          {/* Heritage Story & Highlights */}
          <section className="bg-white rounded-3xl border border-[#dce3f1] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b08d1f]">
                {hotel.siteCategory ?? "Living Heritage"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001a43] leading-snug">
                {hotel.storyHeading ?? "About This Stay"}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {(hotel.storyParagraphs ?? [hotel.description]).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Key highlights checklist */}
            {hotel.highlights && hotel.highlights.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Property Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {hotel.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-medium text-slate-800">
                      <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Signature Facilities */}
          {hotel.signatureFacilities && (
            <section className="bg-white rounded-3xl border border-[#dce3f1] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b08d1f]">
                  Exceptional Experiences
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#001a43]">
                  World-Class Facilities
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hotel.signatureFacilities.map((fac) => (
                  <div
                    key={fac.title}
                    className="bg-[#f8fbff] rounded-2xl border border-[#dce3f1] p-5 flex flex-col items-center text-center space-y-2.5 hover:border-[#001a43]/30 transition group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#001a43]/5 flex items-center justify-center text-[#001a43] group-hover:bg-[#001a43] group-hover:text-white transition">
                      <span className="material-symbols-outlined text-2xl">{fac.icon}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#001a43]">{fac.title}</h3>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
                      {fac.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Room Selection & Accommodations */}
          <section className="space-y-6" id="rooms-section">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#b08d1f]">
                Rooms & Suites
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#001a43]">
                Select Your Accommodation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Choose your desired room and select a verified meal plan with live price updates.
              </p>
            </div>

            <div className="space-y-5">
              {hotel.rooms.map((room) => {
                const isSelected = form.roomId === room.id;
                const currentMealKey = form.mealPlan || "bedBreakfast";
                const activePrice = room.mealPrices[currentMealKey] ?? room.basePriceLKR;

                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md flex flex-col sm:flex-row ${
                      isSelected
                        ? "border-[#001a43] ring-2 ring-[#001a43]/15"
                        : "border-[#dce3f1] hover:border-slate-300"
                    }`}
                  >
                    {/* Room Image */}
                    <div className="sm:w-64 relative h-52 sm:h-auto overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      {room.popular && (
                        <div className="absolute top-3 left-3 bg-[#c9a227] text-[#001a43] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          Popular
                        </div>
                      )}
                    </div>

                    {/* Room Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b08d1f]">
                              {room.roomType}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-[#001a43]">
                              {room.name}
                            </h3>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-base font-bold text-[#001a43] block">
                              {formatLKR(activePrice)}
                            </span>
                            <span className="text-[10px] text-slate-500 font-normal">
                              / night ({mealPlanLabels[currentMealKey]})
                            </span>
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium mt-2">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#001a43]">bed</span>
                            <span>{room.bedSummary}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#001a43]">square_foot</span>
                            <span>{room.size} sqm</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px] text-[#001a43]">group</span>
                            <span>Max {room.maxGuests} guests</span>
                          </span>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {room.amenities.map((a) => (
                            <span
                              key={a}
                              className="text-[11px] font-normal px-2.5 py-0.5 rounded-md bg-[#f4f7fc] text-slate-600 border border-[#e2e8f0]"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-emerald-700 font-medium">
                          ✓ Free cancellation available
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRoomSelect(room.id)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            isSelected
                              ? "bg-[#001a43] text-white shadow-xs"
                              : "bg-slate-100 hover:bg-[#001a43] text-slate-800 hover:text-white"
                          }`}
                        >
                          {isSelected ? "Selected Room ✓" : "Select Room"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Categorized Amenities */}
          {hotel.categorizedAmenities && (
            <section className="bg-white rounded-3xl border border-[#dce3f1] p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#001a43]">
                Property Amenities & Inclusions
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {hotel.categorizedAmenities.map((group) => (
                  <div key={group.category} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <span className="material-symbols-outlined text-[#001a43] text-base">
                        {group.icon}
                      </span>
                      <h3 className="font-semibold text-xs text-[#001a43] uppercase tracking-wider">
                        {group.category}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 font-normal">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[15px] text-[#001a43]">
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

          {/* Hotel Policies */}
          <section className="bg-white rounded-3xl border border-[#dce3f1] p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-[#001a43]">
              Policies & House Rules
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#001a43]">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  <span>Check-in & Check-out</span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Check-in from {hotel.checkIn || "14:00"}. Check-out by {hotel.checkOut || "12:00"}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#001a43]">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Cancellation Terms</span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {hotel.refundPolicy || "Free cancellation up to 48 hours prior to arrival."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-4 sticky top-28" ref={bookingWidgetRef}>
          <div className="bg-white rounded-3xl border border-[#dce3f1] p-6 sm:p-7 shadow-xl space-y-6">
            {/* Header: Price per night */}
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] text-slate-500 font-normal block">
                Price for selected stay
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-extrabold text-[#001a43]">
                  {formatLKR(priceBreakdown.nightlyRate)}
                </span>
                <span className="text-xs text-slate-500 font-normal">/ night</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                ✓ Best Rate Guarantee · Instant Confirmation
              </span>
            </div>

            {/* Selected Room Badge */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-[#b08d1f] block tracking-wider">
                  Room Choice
                </span>
                <span className="text-xs font-bold text-[#001a43] truncate block">
                  {selectedRoom?.name}
                </span>
              </div>
              <a
                href="#rooms-section"
                className="text-xs font-semibold text-[#003d9b] hover:underline shrink-0"
              >
                Change
              </a>
            </div>

            {/* Dates & Guests */}
            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Check-in *
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={form.checkIn}
                    onChange={(e) => set("checkIn", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                  />
                  {fieldError("checkIn") && (
                    <span className="text-[10px] text-red-500 font-medium block mt-1">
                      {fieldError("checkIn")}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Check-out *
                  </label>
                  <input
                    type="date"
                    min={form.checkIn || todayStr}
                    value={form.checkOut}
                    onChange={(e) => set("checkOut", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                  />
                  {fieldError("checkOut") && (
                    <span className="text-[10px] text-red-500 font-medium block mt-1">
                      {fieldError("checkOut")}
                    </span>
                  )}
                </div>
              </div>

              {/* Guests Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Guests
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <select
                    value={form.adults}
                    onChange={(e) => set("adults", Number(e.target.value))}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>

                  <select
                    value={form.children}
                    onChange={(e) => set("children", Number(e.target.value))}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Child" : "Children"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Meal Plan Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Meal Plan
                </label>
                <select
                  value={form.mealPlan}
                  onChange={(e) => set("mealPlan", e.target.value as MealKey)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-normal text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                >
                  {mealPlans.map((mp) => (
                    <option key={mp.key} value={mp.key}>
                      {mp.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600 font-normal">
                <span>
                  {formatLKR(priceBreakdown.nightlyRate)} × {nights > 0 ? nights : 1} night{nights > 1 ? "s" : ""}
                </span>
                <span>{formatLKR(priceBreakdown.baseTotal || priceBreakdown.nightlyRate)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-normal">
                <span>10% Service Charge</span>
                <span>{formatLKR(priceBreakdown.serviceCharge)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-normal">
                <span>2.5% Tourism Development Levy</span>
                <span>{formatLKR(priceBreakdown.tax)}</span>
              </div>

              <div className="flex items-center justify-between text-sm font-bold text-[#001a43] pt-2 border-t border-slate-200">
                <span>Total Amount (LKR)</span>
                <span>{formatLKR(priceBreakdown.total || priceBreakdown.nightlyRate)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={openCheckoutDrawer}
              className="w-full py-3.5 rounded-2xl bg-[#001a43] hover:bg-[#003d9b] text-white font-semibold text-sm transition shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Reserve Your Stay</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>

            <p className="text-[10px] text-center text-slate-500 font-normal">
              You won&apos;t be charged immediately · Pay securely at check-in or online.
            </p>
          </div>
        </div>
      </div>

      {/* ── Guest Details Checkout Modal ── */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b08d1f] block">
                  Step 2 of 2
                </span>
                <h3 className="text-xl font-bold text-[#001a43]">
                  Guest Contact Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleFinalBookingSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Isuranga Fernando"
                  value={form.guestName}
                  onChange={(e) => set("guestName", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-normal text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                />
                {fieldError("guestName") && (
                  <span className="text-[10px] text-red-500 font-medium block mt-1">
                    {fieldError("guestName")}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="isuranga@example.com"
                  value={form.guestEmail}
                  onChange={(e) => set("guestEmail", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-normal text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                />
                {fieldError("guestEmail") && (
                  <span className="text-[10px] text-red-500 font-medium block mt-1">
                    {fieldError("guestEmail")}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+94 77 123 4567"
                  value={form.guestPhone}
                  onChange={(e) => set("guestPhone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-normal text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                />
                {fieldError("guestPhone") && (
                  <span className="text-[10px] text-red-500 font-medium block mt-1">
                    {fieldError("guestPhone")}
                  </span>
                )}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Late check-in, high floor, quiet room, dietary requests..."
                  value={form.specialRequests}
                  onChange={(e) => set("specialRequests", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-normal text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#001a43]"
                />
              </div>

              {/* Summary recap */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                <p className="font-semibold text-[#001a43]">
                  {hotel.name} · {selectedRoom?.name}
                </p>
                <p className="text-slate-500 font-normal">
                  {form.checkIn} to {form.checkOut} ({nights} night{nights > 1 ? "s" : ""}) · {form.adults} Adults
                </p>
                <p className="text-[#001a43] font-bold pt-1">
                  Total: {formatLKR(priceBreakdown.total)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#001a43] hover:bg-[#003d9b] text-white text-xs font-semibold shadow-md transition cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Booking Confirmation Voucher Modal ── */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-bold text-[#001a43] pt-1">
                You&apos;re All Set!
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Confirmation details have been sent to <strong>{confirmedBooking.guestEmail}</strong>.
              </p>
            </div>

            {/* Voucher Ticket Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-normal">Booking Reference:</span>
                <span className="font-mono font-bold text-[#001a43]">
                  {confirmedBooking.reference}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Hotel:</span>
                <span className="font-semibold text-[#001a43]">{hotel.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Room:</span>
                <span className="font-medium text-slate-800">{confirmedBooking.room.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Meal Plan:</span>
                <span className="font-medium text-slate-800">{confirmedBooking.mealPlanLabel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-normal">Duration:</span>
                <span className="font-medium text-slate-800">{confirmedBooking.nights} Night{confirmedBooking.nights > 1 ? "s" : ""}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 font-bold text-[#001a43]">
                <span>Total Amount:</span>
                <span>{formatLKR(confirmedBooking.breakdown.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Print Voucher
              </button>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#001a43] text-white text-xs font-semibold hover:bg-[#003d9b] transition cursor-pointer"
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
