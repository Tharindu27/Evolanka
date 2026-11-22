'use client';

import { useMemo, useState } from 'react';
import { ListingItemCard, ListingsShell } from '@/components/provider/listings/listings-shell';

const filters = ['All', 'Homes', 'Apartment', 'Hotels', 'Unique Places'];

const hotels = [
  { id: 'hotel-1', name: 'Heritance Kandalama', image: '/images/landing-page/sigiriya.png', location: 'Dambulla, Central Province', type: 'Hotels', rating: 4.8, reviews: 324 },
  { id: 'hotel-2', name: 'Fortress Villa', image: '/images/landing-page/gallefort.png', location: 'Galle, Southern Province', type: 'Homes', rating: 4.7, reviews: 198 },
  { id: 'hotel-3', name: 'Mirissa Beach Suites', image: '/images/landing-page/mirissabeach.png', location: 'Mirissa, Southern Province', type: 'Apartment', rating: 4.6, reviews: 142 },
  { id: 'hotel-4', name: 'Sigiriya Treehouse Retreat', image: '/images/landing-page/sigiriya.png', location: 'Sigiriya, Central Province', type: 'Unique Places', rating: 4.9, reviews: 87 },
];

export default function HotelListingsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return hotels.filter(
      (hotel) =>
        (filter === 'All' || hotel.type === filter) &&
        (!query || `${hotel.name} ${hotel.location}`.toLowerCase().includes(query)),
    );
  }, [search, filter]);

  return (
    <ListingsShell
      title="Hotel Listings"
      description="Every property you have listed on EVOLANKA, filtered by property type."
      searchPlaceholder="Search by property name or location"
      search={search}
      onSearchChange={setSearch}
      filters={filters}
      activeFilter={filter}
      onFilterChange={setFilter}
      isEmpty={visible.length === 0}
    >
      {visible.map((hotel) => (
        <ListingItemCard
          key={hotel.id}
          href="/dashboard/hotel-owner"
          image={hotel.image}
          title={hotel.name}
          badge={hotel.type}
          meta={hotel.location}
          rating={hotel.rating}
          reviews={hotel.reviews}
          footer="Manage property"
        />
      ))}
    </ListingsShell>
  );
}
