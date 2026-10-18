'use client';

import Link from 'next/link';
import { useState } from 'react';

import Sidebar from '@/components/customer/common/sidebar';
import WishlistCard from '@/components/customer/wishlist/wishlist-card';
import { navigationItems } from '@/data/customer-account-data';
import { wishlistItems, wishlistTabs, type WishlistTab } from '@/data/customer-wishlist-data';

export default function CustomerWishlistPage() {
  const [savedItems, setSavedItems] = useState(wishlistItems);
  const [activeTab, setActiveTab] = useState<WishlistTab>('All Saved');

  const countFor = (tab: WishlistTab) =>
    tab === 'All Saved' ? savedItems.length : savedItems.filter((item) => item.category === tab).length;

  const visibleItems = activeTab === 'All Saved' ? savedItems : savedItems.filter((item) => item.category === activeTab);

  const removeItem = (id: string) => setSavedItems((items) => items.filter((item) => item.id !== id));

  return (
    <div className="brand-backdrop min-h-screen bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">Wishlist</h1>
            <p className="brand-page-subtitle mt-2 text-base">
              Saved properties, boutique stays, and curated Sri Lankan adventures.
            </p>
           

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {wishlistTabs.map((tab) => {
                const isActive = tab === activeTab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={[
                      'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                      isActive
                        ? 'border-[#001a43] bg-[#001a43] text-white shadow-[0_8px_20px_rgba(13,74,190,0.25)]'
                        : 'border-[#dfe7f5] bg-white text-[#3d4455] hover:text-[#001a43]',
                    ].join(' ')}
                  >
                    {tab} ({countFor(tab)})
                  </button>
                );
              })}
            </div>

            {visibleItems.length > 0 ? (
              <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {visibleItems.map((item) => (
                  <WishlistCard key={item.id} item={item} onRemove={removeItem} />
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-col items-center rounded-[1.5rem] border border-[#e3eaf6] bg-white px-6 py-14 text-center shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8eefc] text-[#0d4abe]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-current" fill="none" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 20.5s-7.5-4.4-9-8.2C1.7 9.4 3.9 5 8.5 5c2 0 3.1 1.1 3.5 2.1.4-1 1.5-2.1 3.5-2.1 4.6 0 6.8 4.4 5.5 7.3-1.5 3.8-9 8.2-9 8.2Z" />
                  </svg>
                </div>
                <h2 className="brand-page-title mt-5 text-lg font-black tracking-[-0.03em]">Your wishlist is empty</h2>
                <p className="brand-page-subtitle mt-2 max-w-md text-sm">
                  Start adding your favorite properties, guided nature hikes, and unforgettable Sri Lankan adventures!
                </p>
                <Link
                  href="/locations"
                  className="btn-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  Explore Properties
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
