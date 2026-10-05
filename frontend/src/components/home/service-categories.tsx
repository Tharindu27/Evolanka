import Link from 'next/link';

const services = [
  {
    title: 'Locations',
    description: 'Sri Lankan destination guides and insights.',
    href: '/locations',
  },
  {
    title: 'Hotels',
    description: 'Best Sri Lankan stays for every style.',
    href: '/hotels',
  },
  {
    title: 'Tour Guides',
    description: 'Expert locals for authentic trips.',
    href: '/tour-guides',
  },
  {
    title: 'Rentals',
    description: 'Quality vehicles for your freedom.',
    href: '/rentals',
  },
  {
    title: 'Taxis',
    description: 'Instant on-demand island transport.',
    href: '/taxis',
  },
];

export default function ServiceCategories() {
  return (
    <section className="bg-[#f1f3ff] py-24">
      <div className="mx-auto mb-16 max-w-[1440px] px-8 text-center md:px-12">
        <h2 className="mb-3 text-3xl font-bold text-[#041b3c]">Everything You Need</h2>
        <p className="mx-auto max-w-xl text-lg text-slate-600">
          One centralized dashboard on EVOLANKA to manage your entire Sri Lankan itinerary.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:px-12">
        {services.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#dae2ff] text-[#003d9b] transition-transform group-hover:scale-110">
              <span className="text-2xl font-black">{service.title.charAt(0)}</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-[#041b3c]">{service.title}</h3>
            <p className="text-sm text-slate-600">{service.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}