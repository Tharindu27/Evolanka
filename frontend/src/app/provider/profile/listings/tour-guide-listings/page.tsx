'use client';

import { ListingItemCard, ListingsShell } from '@/components/provider/listings/listings-shell';

const guide = {
  name: 'Kasun Wijesinghe',
  image: '/images/guides/kasun-wijesinghe.jpg',
  location: 'Colombo',
  type: 'Individual Guide',
  rating: 4.9,
  reviews: 156,
};

export default function TourGuideListingsPage() {
  return (
    <ListingsShell
      title="Tour Guide Listing"
      description="Your tour guide profile on EVOLANKA. Open it to manage your tours, bookings, and traveler reviews."
    >
      <ListingItemCard
        href="/dashboard/guide"
        image={guide.image}
        title={guide.name}
        badge={guide.type}
        meta={guide.location}
        rating={guide.rating}
        reviews={guide.reviews}
        footer="Manage guide profile"
      />
    </ListingsShell>
  );
}
