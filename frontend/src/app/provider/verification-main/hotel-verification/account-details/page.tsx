import AccountDetailsForm from '@/components/provider/hotel/account-details-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function AccountDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <AccountDetailsForm category={parsePropertyCategory(category)} />;
}
