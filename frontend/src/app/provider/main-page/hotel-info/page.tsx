import RoleLanding from '@/components/provider/landing/role-landing';
import { roleLandingContent } from '@/data/provider-landing-data';

export default function HotelInfoPage() {
  return <RoleLanding content={roleLandingContent['hotel-info']} />;
}
