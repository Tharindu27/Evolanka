import type { Metadata } from 'next';
import GuideProviderDashboard from '../../../components/dashboards/guide-provider-dashboard';

export const metadata: Metadata = {
  title: 'Guide Provider Dashboard | EVOLANKA',
  description: 'Preview the EVOLANKA tour guide provider dashboard.',
};

export default function GuideProviderDashboardPage() {
  return <GuideProviderDashboard />;
}
