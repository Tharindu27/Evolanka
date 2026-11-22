import LocationForm from '@/components/provider/hotel/location-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function LocationPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <LocationForm category={parsePropertyCategory(category)} />;
}
