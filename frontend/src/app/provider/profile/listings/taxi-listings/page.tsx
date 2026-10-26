'use client';

import { useMemo, useState } from 'react';
import { ListingItemCard, ListingsShell } from '@/components/provider/listings/listings-shell';

const filters = ['All', 'Hatchback', 'Sedan', 'Van'];

const taxis = [
  { id: 'taxi-1', name: 'Toyota Aqua', image: '/images/rentals/vehicles/lanka-wheels-toyota-aqua.jpg', type: 'Hatchback', plate: 'WP CAB-0001', rating: 4.9, reviews: 312, perKm: 90 },
  { id: 'taxi-2', name: 'Suzuki Swift', image: '/images/rentals/vehicles/suzuki-swift.jpg', type: 'Hatchback', plate: 'WP CAB-0002', rating: 4.7, reviews: 278, perKm: 85 },
  { id: 'taxi-3', name: 'Toyota Prius', image: '/images/rentals/vehicles/toyota-prius.jpg', type: 'Sedan', plate: 'WP CAB-0003', rating: 4.8, reviews: 295, perKm: 110 },
  { id: 'taxi-4', name: 'Toyota Hiace', image: '/images/rentals/vehicles/toyota-hiace.jpg', type: 'Van', plate: 'WP CAB-0004', rating: 4.6, reviews: 201, perKm: 150 },
];

export default function TaxiListingsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return taxis.filter(
      (taxi) =>
        (filter === 'All' || taxi.type === filter) &&
        (!query || `${taxi.name} ${taxi.plate}`.toLowerCase().includes(query)),
    );
  }, [search, filter]);

  return (
    <ListingsShell
      title="Taxi Service Listings"
      description="Every taxi vehicle you have listed on EVOLANKA, filtered by vehicle type."
      searchPlaceholder="Search by vehicle name or plate number"
      search={search}
      onSearchChange={setSearch}
      filters={filters}
      activeFilter={filter}
      onFilterChange={setFilter}
      isEmpty={visible.length === 0}
    >
      {visible.map((taxi) => (
        <ListingItemCard
          key={taxi.id}
          href="/dashboard/taxi"
          image={taxi.image}
          title={taxi.name}
          badge={taxi.type}
          meta={taxi.plate}
          rating={taxi.rating}
          reviews={taxi.reviews}
          footer={`LKR ${taxi.perKm} / km`}
        />
      ))}
    </ListingsShell>
  );
}
