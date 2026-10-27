import FacilitiesForm from '@/components/provider/hotel/facilities-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function FacilitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <FacilitiesForm category={parsePropertyCategory(category)} />;
}
