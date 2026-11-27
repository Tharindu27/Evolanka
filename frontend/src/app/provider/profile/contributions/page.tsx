'use client';

import ContributionDashboard from '@/components/customer/contribution/contribution-dashboard';
import Sidebar from '@/components/provider/common/sidebar';
import { navigationItems } from '@/data/provider-account-data';

export default function ProviderContributionsPage() {
  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />
        <ContributionDashboard newLocationHref="/provider/profile/contributions/new" role="provider" />
      </div>
    </div>
  );
}
