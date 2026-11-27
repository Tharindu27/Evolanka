import RoleLanding from '@/components/provider/landing/role-landing';
import { roleLandingContent } from '@/data/provider-landing-data';

export default function RentalInfoPage() {
  return <RoleLanding content={roleLandingContent['rental-info']} />;
}
