import ReviewsPageClient from "@/components/dashboards/hotel-owner/ReviewsPageClient";

interface ReviewsPageProps {
  params: Promise<{ hotelId: string }>;
}

export default async function HotelOwnerReviewsPage({ params }: ReviewsPageProps) {
  const { hotelId } = await params;
  return <ReviewsPageClient hotelId={hotelId} />;
}
