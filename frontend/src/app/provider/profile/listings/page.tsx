'use client';

import Link from 'next/link';
import Sidebar from '@/components/provider/common/sidebar';

type ListingCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  accent: string;
};

function HotelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#001a43" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 6h16M4 6v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6M4 6l2-2h12l2 2M8 10v4M12 10v4M16 10v4" />
    </svg>
  );
}

function GuideIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#001a43" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3c3.866 0 7 2.239 7 5v6c0 2.761-3.134 5-7 5s-7-2.239-7-5V8c0-2.761 3.134-5 7-5Z" />
      <path d="M12 14v3M8 19h8M5 19c0 1.105 1.791 2 4 2h6c2.209 0 4-.895 4-2" />
    </svg>
  );
}

function RentalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#001a43" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 11c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-8Z" />
      <circle cx="7" cy="16" r="1.5" />
      <circle cx="17" cy="16" r="1.5" />
      <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M8 5l-1-2M16 5l1-2" />
    </svg>
  );
}

function TaxiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#001a43" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 14h18M3 14L5 6h14l2 8M3 14v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2M7 16v3M17 16v3M8 7h8" />
      <circle cx="7" cy="19" r="1.5" />
      <circle cx="17" cy="19" r="1.5" />
    </svg>
  );
}

export default function ListingsPage() {
  const listings: ListingCard[] = [
    {
      id: 'hotels',
      title: 'Hotels',
      description: 'View all the hotels and properties you have listed on EVOLANKA, check their details, and manage bookings from one place.',
      icon: <HotelIcon />,
      href: '/provider/profile/listings/hotel-listings',
      accent: '#edf4ff',
    },
    {
      id: 'guides',
      title: 'Tour Guides',
      description: 'View your tour guide profile on EVOLANKA, review your tours and ratings, and manage your guide bookings.',
      icon: <GuideIcon />,
      href: '/provider/profile/listings/tour-guide-listings',
      accent: '#effaf5',
    },
    {
      id: 'rentals',
      title: 'Rental Service',
      description: 'View all the rental vehicles you have listed on EVOLANKA, check availability and daily rates, and manage rental requests.',
      icon: <RentalIcon />,
      href: '/provider/profile/listings/rental-listings',
      accent: '#fff7ed',
    },
    {
      id: 'taxi',
      title: 'Taxi Service',
      description: 'View all the taxi vehicles you have listed on EVOLANKA, check their rates and details, and manage ride bookings.',
      icon: <TaxiIcon />,
      href: '/provider/profile/listings/taxi-listings',
      accent: '#f4f0ff',
    },
  ];

  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My Listings</h1>
          <p className="mt-3 text-base text-[#48566d]">
            Manage all your service listings and view analytics across different business categories.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={listing.href}
                className="group flex h-full min-h-[240px] max-w-[1000px] flex-col justify-between rounded-[1.75rem] border border-[#dfe8f4] bg-white p-6 text-left shadow-[0_16px_42px_rgba(0,26,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_62px_rgba(0,26,67,0.12)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_12px_24px_rgba(0,26,67,0.12)]"
                    style={{ backgroundColor: listing.accent }}
                  >
                    {listing.icon}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-[1.8rem] font-black tracking-[-0.06em] text-[#001a43]">{listing.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#4f5d76]">{listing.description}</p>
                </div>

                <div className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#001a43]">
                  <span> + View Listings</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
