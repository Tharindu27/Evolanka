'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import ContributionCard from '@/components/customer/contribution/contribution-card';
import {
  contributionTabs,
  tabStatus,
  verificationSteps,
  type Contribution,
  type ContributionTab,
} from '@/data/customer-contribution-data';
import { getErrorMessage, type AuthRole } from '@/lib/api';
import { deleteMyLocation, fetchMyLocations, withdrawLocation, type ApiLocation } from '@/lib/locations-api';

const addIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

type ContributionDashboardProps = { newLocationHref: string; role?: AuthRole };

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Turns a stored location into what the contribution cards display.
const toContribution = (location: ApiLocation): Contribution => {
  const base = {
    id: String(location.id),
    locationId: location.id,
    location,
    title: location.name,
    image: (location.photos.find((photo) => photo.isCover) ?? location.photos[0])?.url,
    province: location.province ?? 'Province not set',
    district: location.district ?? 'District not set',
    category: location.categories.slice(0, 2).join(' & ') || 'Uncategorised',
    submittedAt: location.submittedAt,
  };

  switch (location.status) {
    case 'APPROVED':
      return {
        ...base,
        status: 'verified',
        statusLabel: 'Approved & Live',
        submittedLabel: `Submitted on ${formatDate(location.submittedAt)}`,
        note: location.reviewedAt ? `Approved by the EVOLANKA team on ${formatDate(location.reviewedAt)}.` : undefined,
        noteTone: 'neutral',
      };
    case 'PENDING':
      return {
        ...base,
        status: 'pending',
        statusLabel: 'Pending Review',
        submittedLabel: `Submitted on ${formatDate(location.submittedAt)}`,
        note: 'Our travel curation team is currently reviewing your photos and coordinates.',
        noteTone: 'amber',
      };
    case 'REJECTED':
      return {
        ...base,
        status: 'rejected',
        statusLabel: 'Rejected',
        submittedLabel: `Submitted on ${formatDate(location.submittedAt)}`,
        note: location.rejectionReason ? `Not approved: ${location.rejectionReason}` : 'This location was not approved by the EVOLANKA team.',
        noteTone: 'red',
      };
    default:
      return {
        ...base,
        status: 'draft',
        statusLabel: 'Draft',
        submittedLabel: `Saved on ${formatDate(location.submittedAt)}`,
      };
  }
};

export default function ContributionDashboard({ newLocationHref, role = 'tourist' }: ContributionDashboardProps) {
  const [items, setItems] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<ContributionTab>('All Contributions');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setItems((await fetchMyLocations(role)).map(toContribution));
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    void load();
  }, [load]);

  const countFor = (tab: ContributionTab) =>
    tab === 'All Contributions' ? items.length : items.filter((item) => item.status === tabStatus[tab]).length;

  const visibleItems = items.filter((item) => activeTab === 'All Contributions' || item.status === tabStatus[activeTab]);

  const withdraw = async (id: string) => {
    try {
      await withdrawLocation(role, Number(id));
      await load();
    } catch (actionError) {
      setError(getErrorMessage(actionError));
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteMyLocation(role, Number(id));
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (actionError) {
      setError(getErrorMessage(actionError));
    }
  };

  return (
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
            href={newLocationHref}
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

        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <ContributionCard key={item.id} item={item} onWithdraw={withdraw} onDelete={remove} />
          ))}

          {error ? (
            <div role="alert" className="col-span-full rounded-2xl border border-[#f1b8bb] bg-[#fff1f1] px-5 py-4 text-sm font-medium text-[#c4161c]">
              {error}
            </div>
          ) : null}

          {loading ? (
            <p className="col-span-full text-sm font-semibold text-[#566277]" role="status">Loading your contributions…</p>
          ) : null}

          {!loading && visibleItems.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-[1.5rem] border border-[#e3eaf6] bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <h2 className="brand-page-title text-lg font-black tracking-[-0.03em]">No contributions found</h2>
              <p className="brand-page-subtitle mt-2 text-sm">
                {items.length === 0 ? 'Add a location to see it here and track its review.' : 'Try a different filter.'}
              </p>
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
  );
}
