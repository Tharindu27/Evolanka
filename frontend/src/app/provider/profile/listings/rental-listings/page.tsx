'use client';

import { useMemo, useState } from 'react';
import { ListingItemCard, ListingsShell } from '@/components/provider/listings/listings-shell';

const filters = ['All', 'Top Rated', 'Large Fleet', 'Newly Added'];

const rentals = [
  { id: 'rental-1', name: 'Ceylon Rent A Car', image: '/images/rentals/providers/ceylon-rent-a-car.jpg', location: 'Colombo', types: ['Car', 'SUV'], services: ['With Driver', 'Self Drive'], vehicles: 18, rating: 4.8, reviews: 234, isNew: false },
  { id: 'rental-2', name: 'Hill Country Expeditions', image: '/images/rentals/providers/hill-country-expeditions.jpg', location: 'Kandy', types: ['SUV', 'Van'], services: ['With Driver'], vehicles: 12, rating: 4.7, reviews: 198, isNew: true },
  { id: 'rental-3', name: 'Island Wide Rentals', image: '/images/rentals/providers/island-wide-rentals.jpg', location: 'Galle', types: ['Car', 'Van', 'Motorbike'], services: ['With Driver', 'Self Drive'], vehicles: 25, rating: 4.9, reviews: 267, isNew: false },
  { id: 'rental-4', name: 'Lanka Wheels', image: '/images/rentals/providers/lanka-wheels.jpg', location: 'Negombo', types: ['Car', 'Motorbike'], services: ['Self Drive'], vehicles: 9, rating: 4.6, reviews: 145, isNew: true },
];

const matchesFilter = (rental: (typeof rentals)[number], filter: string) => {
  if (filter === 'Top Rated') return rental.rating >= 4.8;
  if (filter === 'Large Fleet') return rental.vehicles >= 15;
  if (filter === 'Newly Added') return rental.isNew;
  return true;
};

export default function RentalListingsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rentals.filter(
      (rental) =>
        matchesFilter(rental, filter) &&
        (!query || `${rental.name} ${rental.location}`.toLowerCase().includes(query)),
    );
  }, [search, filter]);

  return (
    <ListingsShell
      title="Rental Listings"
      description="Every rental company you have listed on EVOLANKA, filtered by rating, fleet size, and newly added."
      searchPlaceholder="Search by company name or location"
      search={search}
      onSearchChange={setSearch}
      filters={filters}
      activeFilter={filter}
      onFilterChange={setFilter}
      isEmpty={visible.length === 0}
    >
      {visible.map((rental) => (
        <ListingItemCard
          key={rental.id}
          href="/dashboard/rental"
          image={rental.image}
          title={rental.name}
          badge={rental.location}
          meta={rental.types.join(' · ')}
          rating={rental.rating}
          reviews={rental.reviews}
          footer={`${rental.vehicles} vehicles`}
        />
      ))}
    </ListingsShell>
  );
}
