import PropertyNameForm from '@/components/provider/hotel/property-name-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function PropertyNamePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const resolved = parsePropertyCategory(category);

  return <PropertyNameForm category={resolved} />;
}
