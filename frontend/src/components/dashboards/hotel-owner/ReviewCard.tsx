"use client";

import { useState } from "react";

export interface ReviewItem {
  id: string;
  guestName: string;
  guestCountry: string;
  roomName: string;
  stayDate: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  categories: {
    cleanliness: number;
    service: number;
    location: number;
    value: number;
  };
  ownerResponse?: {
    respondedAt: string;
    text: string;
  };
}

interface ReviewCardProps {
  review: ReviewItem;
  onReplySubmit?: (reviewId: string, replyText: string) => void;
}

export default function ReviewCard({ review, onReplySubmit }: ReviewCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [ownerResponse, setOwnerResponse] = useState(review.ownerResponse);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newResponse = {
      respondedAt: "Just now",
      text: replyText.trim(),
    };

    setOwnerResponse(newResponse);
    onReplySubmit?.(review.id, replyText.trim());
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-6 shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-4 hover:border-[#001a43]/30 transition-all">
      {/* ── Review Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#001a43] text-white font-bold text-sm shadow-sm">
            {review.guestName
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-on-surface">{review.guestName}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                Verified Stay
              </span>
            </div>
            <div className="text-xs text-on-surface-variant font-medium">
              {review.guestCountry} · Stayed in {review.roomName} · {review.stayDate}
            </div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <div className="flex text-[#c9a227]">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="material-symbols-outlined text-[18px]"
                style={{
                  fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-xs font-black text-on-surface ml-1">{review.rating}.0</span>
        </div>
      </div>

      {/* ── Review Content ── */}
      <div className="space-y-2">
        <h4 className="text-sm font-black text-on-surface">{review.title}</h4>
        <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{review.comment}</p>
      </div>

      {/* ── Ratings Bar Mini ── */}
      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-on-surface-variant font-medium">
        <span>Cleanliness: <strong className="text-on-surface">{review.categories.cleanliness}</strong></span>
        <span>•</span>
        <span>Service: <strong className="text-on-surface">{review.categories.service}</strong></span>
        <span>•</span>
        <span>Location: <strong className="text-on-surface">{review.categories.location}</strong></span>
        <span>•</span>
        <span>Value: <strong className="text-on-surface">{review.categories.value}</strong></span>
      </div>

      {/* ── Owner Response Box (if exists) ── */}
      {ownerResponse && (
        <div className="mt-3 p-4 rounded-2xl bg-surface-container border border-outline-variant space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#001a43] dark:text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">reply</span>
              Response from Host
            </span>
            <span className="text-[11px] text-on-surface-variant font-medium">{ownerResponse.respondedAt}</span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{ownerResponse.text}</p>
        </div>
      )}

      {/* ── Reply Action Button / Form ── */}
      {!ownerResponse && (
        <div className="pt-2 border-t border-outline-variant">
          {!isReplying ? (
            <button
              onClick={() => setIsReplying(true)}
              className="text-xs font-bold text-[#001a43] dark:text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Reply to Review
            </button>
          ) : (
            <form onSubmit={handleSendReply} className="space-y-3 pt-1">
              <textarea
                rows={3}
                placeholder="Write a gracious and helpful response to your guest..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-xs text-on-surface focus:outline-none focus:border-[#001a43] dark:focus:border-primary"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary shadow-sm cursor-pointer"
                >
                  Post Reply
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
