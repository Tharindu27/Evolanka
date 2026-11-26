import RoleLanding from '@/components/provider/landing/role-landing';
import { roleLandingContent } from '@/data/provider-landing-data';

export default function GuideInfoPage() {
  return <RoleLanding content={roleLandingContent['guide-info']} />;
}
