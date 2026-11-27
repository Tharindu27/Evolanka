import RoleLanding from '@/components/provider/landing/role-landing';
import { roleLandingContent } from '@/data/provider-landing-data';

export default function TaxiInfoPage() {
  return <RoleLanding content={roleLandingContent['taxi-info']} />;
}
