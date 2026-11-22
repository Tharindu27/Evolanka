import RoomPricingForm from '@/components/provider/hotel/room-pricing-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function RoomPricingPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <RoomPricingForm category={parsePropertyCategory(category)} />;
}
