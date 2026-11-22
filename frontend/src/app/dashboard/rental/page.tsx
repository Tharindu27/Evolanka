import type { Metadata } from 'next';
import RentalProviderDashboard from '@/components/dashboards/rental-provider-dashboard';

export const metadata: Metadata = {
  title: 'Rental Provider Dashboard | EVOLANKA',
  description: 'Preview rental fleet, operations, financials, and safety tools for EVOLANKA providers.',
};

export default function RentalProviderDashboardPage() {
  return <RentalProviderDashboard />;
}
