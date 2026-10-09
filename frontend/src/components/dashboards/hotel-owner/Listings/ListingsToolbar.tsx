"use client";

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  publishedCount: number;
  draftCount: number;
}

export default function ListingsToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  publishedCount,
  draftCount,
}: Props) {
  return (
    <div className="bg-surface-container-lowest p-sm rounded-xl shadow-sm mb-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-sm items-center">
        {/* Search */}
        <div className="md:col-span-5 relative flex items-center bg-surface-container-low rounded-lg px-sm py-2">
          <span className="material-symbols-outlined text-outline text-title-sm mr-2 shrink-0">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search listings by title, province, or amenity..."
            className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
          />
          {query && (
            <button
              type="button"
              title="Clear search"
              onClick={() => onQueryChange("")}
              className="text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-body-md">
                cancel
              </span>
            </button>
          )}
        </div>

        {/* Category */}
        <div className="md:col-span-3 relative">
          <label htmlFor="categoryFilter" className="sr-only">
            Category
          </label>
          <div className="relative flex items-center bg-surface-container-low rounded-lg px-sm py-2">
            <span className="material-symbols-outlined text-outline text-body-md mr-2 shrink-0">
              category
            </span>
            <select
              id="categoryFilter"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full bg-transparent font-label-md text-label-md text-on-surface appearance-none focus:outline-none pr-6 cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="hotels">Hotels &amp; Resorts</option>
              <option value="villas">Villas</option>
              <option value="bungalows">Bungalows</option>
            </select>
            <span className="material-symbols-outlined text-outline text-body-md absolute right-3 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="md:col-span-2 relative">
          <label htmlFor="statusFilter" className="sr-only">
            Status
          </label>
          <div className="relative flex items-center bg-surface-container-low rounded-lg px-sm py-2">
            <span className="material-symbols-outlined text-outline text-body-md mr-2 shrink-0">
              tune
            </span>
            <select
              id="statusFilter"
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full bg-transparent font-label-md text-label-md text-on-surface appearance-none focus:outline-none pr-6 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published ({publishedCount})</option>
              <option value="draft">Draft ({draftCount})</option>
            </select>
            <span className="material-symbols-outlined text-outline text-body-md absolute right-3 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Sort */}
        <div className="md:col-span-2 relative">
          <label htmlFor="sortFilter" className="sr-only">
            Sort by
          </label>
          <div className="relative flex items-center bg-surface-container-low rounded-lg px-sm py-2">
            <span className="material-symbols-outlined text-outline text-body-md mr-2 shrink-0">
              sort
            </span>
            <select
              id="sortFilter"
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-transparent font-label-md text-label-md text-on-surface appearance-none focus:outline-none pr-6 cursor-pointer"
            >
              <option value="recent">Recently Updated</option>
              <option value="highest_rev">Highest Revenue</option>
              <option value="rating">Top Rated</option>
              <option value="completion">Completion %</option>
            </select>
            <span className="material-symbols-outlined text-outline text-body-md absolute right-3 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}