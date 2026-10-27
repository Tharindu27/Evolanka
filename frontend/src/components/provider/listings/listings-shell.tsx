'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Sidebar from '@/components/provider/common/sidebar';

type ListingsShellProps = {
  title: string;
  description: string;
  searchPlaceholder?: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  filters?: string[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  isEmpty?: boolean;
  children: ReactNode;
};

export function ListingsShell({
  title,
  description,
  searchPlaceholder = '',
  search = '',
  onSearchChange,
  filters = [],
  activeFilter = '',
  onFilterChange,
  isEmpty = false,
  children,
}: ListingsShellProps) {
  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">{title}</h1>

            <Link
              href="/provider/profile/listings"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#dfe8f4] bg-white px-4 py-2 text-sm font-bold text-[#001a43] shadow-[0_8px_20px_rgba(0,26,67,0.05)] transition hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#001a43] stroke-[2.2]" aria-hidden="true">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>
          <p className="mt-3 max-w-3xl text-base text-[#48566d]">{description}</p>

          {onSearchChange && onFilterChange ? (
          <div className="mt-8 flex flex-col gap-4">
            <div className="relative max-w-xl">
              <svg
                viewBox="0 0 24 24"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[#67748d] stroke-[1.8]"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full rounded-full border border-[#dfe8f4] bg-white py-3 pl-12 pr-5 text-sm text-[#001a43] shadow-[0_8px_20px_rgba(0,26,67,0.05)] outline-none transition placeholder:text-[#8a96aa] focus:border-[#001a43]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => {
                const active = filter === activeFilter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => onFilterChange(filter)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? 'border-[#001a43] bg-[#001a43] text-white'
                        : 'border-[#dfe8f4] bg-white text-[#001a43] hover:border-[#001a43]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
          ) : null}

          {isEmpty ? (
            <div className="mt-10 rounded-[1.5rem] border border-dashed border-[#c9d5e6] bg-white px-6 py-12 text-center text-[#48566d]">
              No listings match your search.
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
          )}
        </div>
      </div>
    </main>
  );
}

type ListingItemCardProps = {
  href: string;
  image: string;
  title: string;
  badge: string;
  meta: string;
  rating: number;
  reviews: number;
  footer: string;
};

export function ListingItemCard({ href, image, title, badge, meta, rating, reviews, footer }: ListingItemCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#dfe8f4] bg-white shadow-[0_16px_42px_rgba(0,26,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(0,26,67,0.12)]"
    >
      <div className="relative h-48 w-full overflow-hidden bg-[#f0f3f7]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#001a43] shadow-sm">
          {badge}
        </span>
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#001a43] shadow-sm">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#a28116]" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {rating}
          <span className="font-medium text-[#67748d]">({reviews})</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-xl font-black tracking-[-0.04em] text-[#001a43]">{title}</h3>
        <p className="mt-2 line-clamp-1 text-sm text-[#4f5d76]">{meta}</p>

        <div className="mt-auto flex items-center justify-between border-t border-[#edf1f5] pt-4">
          <span className="text-sm font-bold text-[#001a43]">{footer}</span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-[#a28116] transition-all group-hover:gap-2">
            VIEW
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#a28116] stroke-[2.5]" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
