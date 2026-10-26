'use client';

import { useState } from 'react';
import Sidebar from '@/components/provider/common/sidebar';
import ServiceCard from '@/components/provider/services/service-card';

const serviceCards = [
  {
    id: 'hotel',
    prompt: 'If you have a property',
    action: 'Add your property',
    title: 'Hotels',
    description: 'List your accommodations, room types, and amenities to attract travelers across Sri Lanka.',
    accent: '#edf4ff',
    icon: '🏨',
    href: '/provider/verification-main/hotel-verification/property-category',
  },
  {
    id: 'guide',
    prompt: 'If you are a tour guide',
    action: 'Become a tour guide',
    title: 'Tour Guide',
    description: 'Share your routes and local expertise to connect with travelers seeking guided tours.',
    accent: '#effaf5',
    icon: '🧭',
    href: '/provider/verification-main/guide-verification/guide-type',
  },
  {
    id: 'rental',
    prompt: 'If you have a rental service',
    action: 'Add your company',
    title: 'Rental Service',
    description: 'Showcase your vehicle fleet, rental packages, and rates for flexible road trips.',
    accent: '#fff7ed',
    icon: '🚗',
    href: '/provider/verification-main/rental-verification/upload-details',
  },
  {
    id: 'taxi',
    prompt: 'If you have a taxi',
    action: 'Add your taxi',
    title: 'Taxi',
    description: 'Offer quick transfers and transparent rates for airport and city travel bookings.',
    accent: '#f4f0ff',
    icon: '🚕',
    href: '/provider/verification-main/taxi-verification',
  },
];

export default function ProviderServicesPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const addCard = (id: string) => {
    setSelectedIds((current) => (current.includes(id) ? current : [...current, id]));
    setOpen(false);
  };

  const removeCard = (id: string) => {
    setSelectedIds((current) => current.filter((item) => item !== id));
  };

  const selectedCards = serviceCards.filter((card) => selectedIds.includes(card.id));

  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My Tourism Services</h1>
          <p className="mt-3 max-w-3xl text-base text-[#48566d]">
            Manage your accommodations, licensed tour guides, rental vehicles, and taxi services across Sri Lanka.
          </p>

          <div className="relative mt-8 w-full max-w-3xl">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              className="flex w-full items-center justify-between rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-5 text-left shadow-[0_16px_42px_rgba(0,26,67,0.06)] transition hover:border-[#001a43]"
            >
              <span>
                <span className="block text-xl font-black tracking-[-0.04em] text-[#001a43]">Add a service</span>
                <span className="mt-1 block text-sm text-[#48566d]">Choose what you offer to start listing it on EVOLANKA.</span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 shrink-0 fill-none stroke-[#001a43] stroke-[2.2] transition-transform ${open ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {open ? (
              <ul className="absolute left-0 right-0 z-10 mt-3 overflow-hidden rounded-[1.5rem] border border-[#dfe8f4] bg-white shadow-[0_24px_62px_rgba(0,26,67,0.14)]">
                {serviceCards.map((card) => {
                  const added = selectedIds.includes(card.id);
                  return (
                    <li key={card.id} className="border-b border-[#edf1f5] last:border-b-0">
                      <button
                        type="button"
                        onClick={() => addCard(card.id)}
                        disabled={added}
                        className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-[#f7f9fc] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl"
                          style={{ backgroundColor: card.accent }}
                        >
                          {card.icon}
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm text-[#67748d]">{card.prompt}</span>
                          <span className="block text-lg font-bold tracking-[-0.03em] text-[#001a43]">{card.action}</span>
                        </span>
                        {added ? <span className="text-xs font-bold text-[#a28116]">ADDED</span> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>

          {selectedCards.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {selectedCards.map((card) => (
                <div key={card.id} className="relative h-full">
                  <ServiceCard
                    title={card.title}
                    description={card.description}
                    accent={card.accent}
                    icon={card.icon}
                    href={card.href}
                  />
                  <button
                    type="button"
                    onClick={() => removeCard(card.id)}
                    aria-label={`Remove ${card.title}`}
                    className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe8f4] bg-white text-[#001a43] shadow-sm transition hover:bg-[#001a43] hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.2]" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
