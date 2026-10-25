import AgreementForm from '@/components/provider/hotel/agreement-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function AgreementPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <AgreementForm category={parsePropertyCategory(category)} />;
}
