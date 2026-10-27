import UploadImageForm from '@/components/provider/hotel/upload-image-form';
import { parsePropertyCategory } from '@/lib/hotel-setup';

export default async function UploadImagePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return <UploadImageForm category={parsePropertyCategory(category)} />;
}
