"use client";

import { useState, useMemo } from "react";
import ReviewCard, { ReviewItem } from "./ReviewCard";

const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    guestName: "Charlotte & William Campbell",
    guestCountry: "United Kingdom",
    roomName: "Ocean Villa 102",
    stayDate: "Oct 18 – Oct 22, 2026",
    rating: 5,
    title: "An ethereal Sri Lankan coastal paradise",
    comment:
      "The private infinity pool overlooking the Bentota lagoon was truly magical. Staff went above and beyond to arrange our private candlelit dinner under the stars! The seafood platter was the freshest we've ever tasted.",
    categories: { cleanliness: 5.0, service: 5.0, location: 5.0, value: 4.8 },
    ownerResponse: {
      respondedAt: "Yesterday at 9:15 AM",
      text: "Dear Charlotte & William, thank you dearly for your heartwarming words! Chef Ruwan and the entire team were thrilled to host your anniversary celebration. We hope to welcome you back next season!",
    },
  },
  {
    id: "rev-2",
    guestName: "Dr. Kanishka Weerasinghe",
    guestCountry: "Australia",
    roomName: "Presidential Sky Penthouse 501",
    stayDate: "Oct 12 – Oct 16, 2026",
    rating: 5,
    title: "Unmatched hospitality and breathtaking views",
    comment:
      "Stayed with family for my parents' 50th wedding anniversary. The penthouse rooftop gives a 360-degree panorama of the Indian Ocean. The butler service was discreet and attentive. Absolute 5-star experience.",
    categories: { cleanliness: 4.9, service: 5.0, location: 5.0, value: 4.7 },
  },
  {
    id: "rev-3",
    guestName: "Sophie Leclerc",
    guestCountry: "France",
    roomName: "Azure Horizon Suite 304",
    stayDate: "Oct 8 – Oct 11, 2026",
    rating: 4,
    title: "Beautiful property, minor delay during check-in",
    comment:
      "The architecture and decor are stunning, and the spa massage was world class. We had to wait about 20 minutes for our room keys at 2 PM as the room was still being sanitized, but the welcome king coconut made up for it.",
    categories: { cleanliness: 5.0, service: 4.2, location: 4.9, value: 4.5 },
  },
  {
    id: "rev-4",
    guestName: "Hidenori Takahashi",
    guestCountry: "Japan",
    roomName: "Ceylon Heritage Double 201",
    stayDate: "Oct 2 – Oct 6, 2026",
    rating: 5,
    title: "Perfect blend of colonial charm and modern comfort",
    comment:
      "Quiet, peaceful, and immaculate. The antique wooden fittings and high ceilings gave the room a regal feeling. The Ceylon tea pairing menu served every afternoon at the garden veranda was unforgettable.",
    categories: { cleanliness: 5.0, service: 5.0, location: 4.8, value: 5.0 },
    ownerResponse: {
      respondedAt: "Oct 7, 2026",
      text: "Arigato Takahashi-san! We are honoured by your review and glad you appreciated our heritage tea rituals.",
    },
  },
];

const categoryRatings = [
  { name: "Cleanliness", score: 4.9, icon: "cleaning_services" },
  { name: "Staff & Hospitality", score: 5.0, icon: "handshake" },
  { name: "Location & Panorama", score: 4.9, icon: "pin_drop" },
  { name: "Value for Money", score: 4.8, icon: "payments" },
  { name: "Room Comfort", score: 4.9, icon: "hotel" },
  { name: "Spa & Facilities", score: 4.8, icon: "pool" },
];

const starDistribution = [
  { star: 5, count: 128, percentage: 90 },
  { star: 4, count: 11, percentage: 8 },
  { star: 3, count: 2, percentage: 1.5 },
  { star: 2, count: 1, percentage: 0.5 },
  { star: 1, count: 0, percentage: 0 },
];

interface ReviewsPageClientProps {
  hotelId: string;
}

export default function ReviewsPageClient({ hotelId }: ReviewsPageClientProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [activeTab, setActiveTab] = useState<"all" | "5star" | "needs_reply" | "replied">("all");

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (activeTab === "5star") return r.rating === 5;
      if (activeTab === "needs_reply") return !r.ownerResponse;
      if (activeTab === "replied") return !!r.ownerResponse;
      return true;
    });
  }, [reviews, activeTab]);

  const handleReplySubmit = (reviewId: string, replyText: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              ownerResponse: {
                respondedAt: "Just now",
                text: replyText,
              },
            }
          : r
      )
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Guest Reviews &amp; Reputation
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Monitor guest satisfaction, respond to traveler feedback, and maintain Superhost standing
          </p>
        </div>
      </div>

      {/* ── Rating Summary Hero & Star Distribution ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Overall Score Box */}
        <div className="lg:col-span-5 rounded-[24px] border border-outline-variant bg-surface-container-low p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
              Overall Host Rating
            </span>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-5xl sm:text-6xl font-black text-on-surface">4.9</span>
              <span className="text-base text-on-surface-variant font-medium">/ 5.0</span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-[#c9a227]">
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>

            <p className="mt-3 text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
              Based on <strong>142 verified stays</strong>. Rated in the top 2% of luxury coastal
              stays in Sri Lanka.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="material-symbols-outlined text-sm">verified</span>
              EVOLANKA Certified Host
            </span>
            <span className="text-on-surface-variant font-medium">Updated today</span>
          </div>
        </div>

        {/* 5-Star Distribution Breakdown */}
        <div className="lg:col-span-7 rounded-[24px] border border-outline-variant bg-surface-container-low p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-on-surface mb-3">Rating Distribution</h3>
            <div className="space-y-2.5">
              {starDistribution.map((row) => (
                <div key={row.star} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 w-14 text-on-surface-variant font-bold">
                    <span>{row.star}</span>
                    <span className="material-symbols-outlined text-[14px] text-[#c9a227]">
                      star
                    </span>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-[#c9a227] rounded-full transition-all duration-500"
                      style={{ width: `${row.percentage}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-on-surface-variant text-[11px] font-semibold">
                    {row.count} ({row.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Category Scores */}
          <div className="mt-6 pt-4 border-t border-outline-variant grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {categoryRatings.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl bg-surface-container p-2.5 border border-outline-variant flex items-center justify-between"
              >
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                    {cat.icon}
                  </span>
                  <span className="text-[11px] text-on-surface-variant truncate font-medium">{cat.name}</span>
                </div>
                <span className="text-xs font-black text-on-surface ml-1">{cat.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-surface-container rounded-full border border-outline-variant w-fit">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          All Reviews (142)
        </button>
        <button
          onClick={() => setActiveTab("5star")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "5star"
              ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          ★ 5-Star Reviews (128)
        </button>
        <button
          onClick={() => setActiveTab("needs_reply")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "needs_reply"
              ? "bg-[#c9a227] text-[#001a43] shadow-sm font-black"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Awaiting Host Reply (2)
        </button>
        <button
          onClick={() => setActiveTab("replied")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === "replied"
              ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          Replied (140)
        </button>
      </div>

      {/* ── Reviews Feed ── */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-12 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl block mb-2 text-on-surface-variant">
              rate_review
            </span>
            No reviews match this filter.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} onReplySubmit={handleReplySubmit} />
          ))
        )}
      </div>
    </div>
  );
}
