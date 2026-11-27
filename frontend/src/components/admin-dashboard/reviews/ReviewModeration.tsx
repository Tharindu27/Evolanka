"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import Tabs from "../shared/Tabs";
import { formatDate } from "../shared/utils";
import { reviews as initialReviews } from "@/data/admin-data/reviews";
import type { ReviewVisibility } from "@/data/admin-data/types";

type Tab = "all" | ReviewVisibility;

export default function ReviewModeration() {
  const [reviews, setReviews] = useState(initialReviews);
  const [tab, setTab] = useState<Tab>("all");

  const setVisibility = (id: string, visibility: ReviewVisibility) =>
    setReviews((items) => items.map((item) => (item.id === id ? { ...item, visibility } : item)));
  const remove = (id: string) => setReviews((items) => items.filter((item) => item.id !== id));
  const count = (visibility: ReviewVisibility) => reviews.filter((item) => item.visibility === visibility).length;
  const rows = reviews.filter((item) => tab === "all" || item.visibility === tab);

  return (
    <Panel title="Review Moderation" subtitle="Hide or delete fake and inappropriate reviews">
      <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
        <Tabs<Tab>
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "all", label: "All", count: reviews.length },
            { id: "Flagged", label: "Flagged", count: count("Flagged") },
            { id: "Visible", label: "Visible", count: count("Visible") },
            { id: "Hidden", label: "Hidden", count: count("Hidden") },
          ]}
        />
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-on-surface-variant">No reviews in this view.</p>
      ) : (
        <ul className="divide-y divide-outline-variant">
          {rows.map((review) => (
            <li key={review.id} className="space-y-3 p-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-on-surface">
                    {review.tourist} <span className="font-medium text-on-surface-variant">on {review.provider}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-on-surface-variant">
                    <span className="text-[#c9a227]">{"★".repeat(review.rating)}</span>
                    <span className="opacity-30">{"★".repeat(5 - review.rating)}</span> · {review.id} · {formatDate(review.date)}
                  </p>
                </div>
                <StatusBadge status={review.visibility} />
              </div>
              <p className="text-sm leading-relaxed text-on-surface-variant">“{review.comment}”</p>
              <div className="flex flex-wrap gap-2">
                {review.visibility === "Hidden" ? (
                  <ActionButton variant="muted" onClick={() => setVisibility(review.id, "Visible")}>Show again</ActionButton>
                ) : (
                  <ActionButton variant="muted" onClick={() => setVisibility(review.id, "Hidden")}>Hide</ActionButton>
                )}
                {review.visibility === "Flagged" ? (
                  <ActionButton onClick={() => setVisibility(review.id, "Visible")}>Keep review</ActionButton>
                ) : null}
                <ActionButton variant="danger" onClick={() => remove(review.id)}>Delete</ActionButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
