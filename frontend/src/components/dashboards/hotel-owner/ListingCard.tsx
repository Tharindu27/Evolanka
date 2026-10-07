import type { Listing } from "@/lib/types";

export default function ListingCard({ listing }: { listing: Listing }) {
  const isDraft = listing.status === "draft";

  const completenessColor = isDraft
    ? "text-secondary"
    : listing.completeness === 100
    ? "text-tertiary"
    : "text-primary";

  const barColor = isDraft
    ? "bg-secondary-container"
    : listing.completeness === 100
    ? "bg-tertiary"
    : "bg-primary";

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group">
      {/* Media */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.image}
          alt={listing.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            isDraft ? "opacity-90" : ""
          }`}
        />

        <span className="absolute top-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-sm">
          {listing.category}
        </span>

        {isDraft ? (
          <span className="absolute top-3 right-3 bg-surface-container-highest/95 backdrop-blur-md text-on-surface-variant font-label-sm text-label-sm font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
            Draft
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md text-tertiary font-label-sm text-label-sm font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            Published
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-md flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="font-title-sm text-title-sm text-on-surface font-bold leading-snug group-hover:text-primary transition-colors">
              {listing.title}
            </h2>
            <button
              type="button"
              aria-label="Listing options"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-title-sm">
                more_vert
              </span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-on-surface-variant mb-base">
            <span className="material-symbols-outlined text-primary text-body-md">
              location_on
            </span>
            <span className="font-label-sm text-label-sm">
              {listing.location}
            </span>
          </div>

          {/* Metrics */}
          <div className="bg-surface-container-low rounded-lg p-sm flex items-center justify-between text-on-surface mb-base">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {isDraft ? "Rates" : "Rates from"}
              </p>
              {listing.ratesFrom === null ? (
                <p className="font-label-md text-label-md font-semibold text-outline italic">
                  Not Set
                </p>
              ) : (
                <p className="font-label-md text-label-md font-bold text-primary">
                  LKR {listing.ratesFrom.toLocaleString("en-LK")}{" "}
                  <span className="font-normal text-on-surface-variant">
                    / nt
                  </span>
                </p>
              )}
            </div>

            <div className="h-8 w-px bg-outline-variant/50" />

            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Capacity
              </p>
              <p className="font-label-md text-label-md font-semibold">
                {listing.capacity}
              </p>
            </div>

            <div className="h-8 w-px bg-outline-variant/50" />

            {isDraft ? (
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Mode
                </p>
                <p className="font-label-md text-label-md font-semibold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-body-md">
                    pending
                  </span>
                  Setup
                </p>
              </div>
            ) : (
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Rating
                </p>
                <p className="font-label-md text-label-md font-semibold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-secondary-container text-body-md fill-1">
                    star
                  </span>
                  {listing.rating?.toFixed(1)}{" "}
                  <span className="text-on-surface-variant text-label-sm">
                    ({listing.reviewCount})
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Completeness bar */}
          <div className="space-y-1 mb-base">
            <div className="flex justify-between items-center text-label-sm font-label-sm">
              <span className="text-on-surface font-medium">Completeness</span>
              <span className={`font-bold ${completenessColor}`}>
                {listing.completeness}%
              </span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div
                className={`${barColor} h-full rounded-full transition-all duration-500`}
                style={{ width: `${listing.completeness}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-sm mt-sm flex items-center justify-between">
          {isDraft ? (
            <>
              <a
                href="#"
                className="bg-primary/10 hover:bg-primary-container hover:text-on-primary text-primary px-3 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-body-md">
                  draw
                </span>
                <span>Continue Editing</span>
              </a>
              <button
                type="button"
                title="Discard Draft"
                className="text-error hover:bg-error-container/40 p-1.5 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-body-md">
                  delete
                </span>
              </button>
            </>
          ) : (
            <>
              <a
                href="#"
                className="font-label-md text-label-md text-primary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-body-md">
                  edit
                </span>
                <span>Edit Details</span>
              </a>
              <a
                href="#"
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface inline-flex items-center gap-1 transition-colors"
              >
                <span>View Live</span>
                <span className="material-symbols-outlined text-body-md">
                  open_in_new
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}