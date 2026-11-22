'use client';

import Link from 'next/link';
import { useState } from 'react';

import ContributionCard from '@/components/customer/contribution/contribution-card';
import Sidebar from '@/components/customer/common/sidebar';
import { navigationItems } from '@/data/customer-account-data';
import {
  contributionTabs,
  contributions as initialContributions,
  tabStatus,
  verificationSteps,
  type ContributionTab,
} from '@/data/customer-contribution-data';

const addIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export default function CustomerContributionsPage() {
  const [items, setItems] = useState(initialContributions);
  const [activeTab, setActiveTab] = useState<ContributionTab>('All Contributions');

  const countFor = (tab: ContributionTab) =>
    tab === 'All Contributions' ? items.length : items.filter((item) => item.status === tabStatus[tab]).length;

  const visibleItems = items.filter((item) => activeTab === 'All Contributions' || item.status === tabStatus[activeTab]);

  const withdraw = (id: string) =>
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'draft', statusLabel: 'Draft', note: undefined, noteTone: undefined } : item,
      ),
    );

  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));

  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />

        <main className="flex-1 overflow-y-auto bg-[#f3f5fa] px-8 py-8 lg:px-10">
          <div className="max-w-[1120px]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="brand-page-title text-4xl font-black tracking-[-0.05em]">My Contributions</h1>
                <p className="brand-page-subtitle mt-2 text-base">
                  Locations and hidden gems you suggested to the EVOLANKA community.
                </p>
              </div>

              <Link
                href="/customer/profile/contributions/new"
                className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition hover:text-white"
              >
                {addIcon}
                Add New Location
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {contributionTabs.map((tab) => {
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

            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:grid-rows-[repeat(2,minmax(400px,auto))]">
              {visibleItems.map((item) => (
                <ContributionCard key={item.id} item={item} onWithdraw={withdraw} onDelete={remove} />
              ))}

              {visibleItems.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center rounded-[1.5rem] border border-[#e3eaf6] bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                  <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">No contributions found</h2>
                  <p className="brand-page-subtitle mt-2 text-sm">Try a different filter.</p>
                </div>
              ) : null}
            </div>

            <section className="mt-8 rounded-[22px] border border-[#dfe4f2] bg-white p-6 shadow-[0_18px_45px_rgba(0,26,67,0.06)]">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef3ff] text-[#0d4abe]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
                    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-[1.02rem] font-black tracking-[-0.02em] text-[#001a43]">How Verification Works</h2>
                  <p className="mt-0.5 text-sm text-[#6d7280]">
                    Keep Sri Lanka&apos;s travel ecosystem verified, safe, and respectful to local communities.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {verificationSteps.map((step, index) => (
                  <div key={step.title} className="flex items-start gap-3 rounded-xl bg-[#f3f6fc] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-[#001a43]">{step.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#566277]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
