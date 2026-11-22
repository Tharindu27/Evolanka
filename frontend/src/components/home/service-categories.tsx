import Link from 'next/link';

const services = [
  {
    title: 'Locations',
    short: 'EXPLORE',
    description: 'Discover the best places, routes, and destinations in Sri Lanka.',
    href: '/locations',
    accent: 'from-[#dfe9ff] to-[#eef4ff]',
  },
  {
    title: 'Hotels',
    short: 'STAY',
    description: 'Find trusted stays and premium places to rest after every journey.',
    href: '/hotels',
    accent: 'from-[#fff1d6] to-[#fffaf0]',
  },
  {
    title: 'Tour Guides',
    short: 'GUIDE',
    description: 'Meet experienced local guides for authentic and memorable trips.',
    href: '/tour-guides',
    accent: 'from-[#e7f7ef] to-[#f4fff9]',
  },
  {
    title: 'Rentals',
    short: 'RIDE',
    description: 'Book reliable vehicles and self-drive options for your travel plans.',
    href: '/rentals',
    accent: 'from-[#efe5ff] to-[#f6f0ff]',
  },
  {
    title: 'Taxis',
    short: 'MOVE',
    description: 'Get quick, easy transport whenever you need to travel around.',
    href: '/taxis',
    accent: 'from-[#dff6ff] to-[#f1fbff]',
  },
];

export default function ServiceCategories() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(201,162,39,0.12),transparent_22%),linear-gradient(180deg,#f8f9ff_0%,#eef3ff_100%)] py-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_center,_rgba(0,50,120,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[#c9a227]/30 bg-[#fffaf0] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.26em] text-[#745400]">
            Featured Services
          </span>
          <h2 className="text-3xl font-black tracking-tight text-[#041b3c] sm:text-4xl lg:text-5xl">
            Everything travelers and providers need in one place
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            From unforgettable stays to trusted local experiences, Evolanka brings travelers, hotels,
            guides, and service providers together on one modern platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#aac2ff] hover:shadow-[0_24px_55px_rgba(0,44,94,0.14)]"
            >
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div
                className={`relative mb-5 flex h-12 w-full items-center justify-center rounded-xl border border-white/40 bg-gradient-to-br ${service.accent} px-3 text-center text-[11px] font-black tracking-[0.28em] text-[#041b3c] shadow-inner`}
              >
                {service.short}
              </div>

              <div className="relative mb-3 flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#041b3c]">{service.title}</h3>
              </div>

              <p className="relative text-sm leading-6 text-slate-600">{service.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-[30px] border border-[#dfe7ff] bg-[#041b3c] p-6 shadow-[0_24px_60px_rgba(4,27,60,0.18)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#ffd977]">
                For service providers
              </p>
              <h3 className="text-2xl font-black text-white sm:text-3xl">
                Grow your business with Evolanka
              </h3>
              <p className="mt-4 text-base leading-relaxed text-slate-200">
                Hotels, tour guides, transport services, and local businesses can join our platform to
                reach travelers who are actively looking for trusted experiences across Sri Lanka.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/provider/main-page/home "
                className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-6 py-3 text-sm font-bold text-[#001a43] shadow-[0_12px_28px_rgba(201,162,39,0.3)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join as Provider
              </Link>
              <Link
                href="/provider/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10"
              >
                Provider Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}