'use client';

import Sidebar from '@/components/customer/common/sidebar';
import ContributionDashboard from '@/components/customer/contribution/contribution-dashboard';
import { navigationItems } from '@/data/customer-account-data';

export default function CustomerContributionsPage() {
  return (
    <div className="brand-backdrop h-screen overflow-hidden bg-[#f2f5fa] text-[#001a43]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="relative mx-auto flex h-full max-w-[1600px]">
        <Sidebar items={navigationItems} />
        <ContributionDashboard newLocationHref="/customer/profile/contributions/new" />
      </div>
    </div>
  );
}
