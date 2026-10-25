import Sidebar from '@/components/provider/common/sidebar';
import ServiceCard from '@/components/provider/services/service-card';

const serviceCards = [
  {
    title: 'Hotels',
    description: 'List your accommodations, room types, and amenities to attract travelers across Sri Lanka.',
    accent: '#edf4ff',
    icon: '🏨',
    href: '/provider/verification-main/hotel-verification',
  },
  {
    title: 'Tour Guide',
    description: 'Share your routes and local expertise to connect with travelers seeking guided tours.',
    accent: '#effaf5',
    icon: '🧭',
    href: '/provider/verification-main/guide-verification/guide-type',
  },
  {
    title: 'Rental Service',
    description: 'Showcase your vehicle fleet, rental packages, and rates for flexible road trips.',
    accent: '#fff7ed',
    icon: '🚗',
    href: '/provider/verification-main/rental-verification/upload-details',
  },
  {
    title: 'Taxi',
    description: 'Offer quick transfers and transparent rates for airport and city travel bookings.',
    accent: '#f4f0ff',
    icon: '🚕',
    href: '/provider/verification-main/taxi-verification',
  },
];

export default function ProviderServicesPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My Tourism Services</h1>
          <p className="mt-3 max-w-3xl text-base text-[#48566d]">
            Manage your accommodations, licensed tour guides, rental vehicles, and taxi services across Sri Lanka.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {serviceCards.map((card) => (
              <ServiceCard
                key={card.title}
                title={card.title}
                description={card.description}
                accent={card.accent}
                icon={card.icon}
                href={card.href}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
