import { redirect } from "next/navigation";

export default async function PropertyIndexPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  redirect(`/dashboard/hotel-owner/${propertyId}/overview`);
}