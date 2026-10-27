import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-10">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/landing-page/landing-hero.png")',
            filter: 'saturate(1.08) contrast(1.00) brightness(0.6)',
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,12,35,0.34)_10%,rgba(7,49,96,0.24)_45%,rgba(10,29,60,0.3)_72%,rgba(0,12,35,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(242,196,86,0.2),transparent_24%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04),transparent_42%)]" />
      </div>

      <div className="pointer-events-none absolute left-8 top-28 hidden h-36 w-36 animate-[location-float_12s_ease-in-out_infinite] rounded-full border border-white/25 bg-white/10 backdrop-blur md:block" />
      <div className="pointer-events-none absolute right-8 top-1/2 hidden h-24 w-24 animate-[location-float_14s_ease-in-out_infinite] rounded-full border border-[#c9a227]/35 bg-[#c9a227]/15 backdrop-blur md:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[30px] border border-white/15 bg-white/[0.08] p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-10 lg:p-12">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffd977]">
              Discover Sri Lanka
            </span>

            <h1 className="text-4xl font-black leading-[1.06] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl">
              Sri Lanka is Yours to Explore
            </h1>

            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/88 sm:text-lg lg:text-xl">
              Experience the intersection of soulful adventure and premium service in Sri Lanka.
            </p>

            <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/social-feed"
                className="inline-flex items-center justify-center rounded-xl bg-[#c9a227] px-8 py-3.5 text-base font-bold text-[#001a43] shadow-[0_10px_30px_rgba(201,162,39,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Share Experience
              </Link>
              <Link
                href="/trip-plan"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20"
              >
                Plan Your Trip
              </Link>
            </div>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd977]">Now Open for Providers</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-white/88 sm:text-base">
                  Hotels, guides, rentals, and transport partners can now join and grow through Evolanka.
                </p>
                <Link
                  href="/provider/main-page/home"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/35 bg-[#001a43]/70 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#c9a227] hover:text-[#001a43]"
                >
                  Join as Provider
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-[0_14px_34px_rgba(0,0,0,0.25)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd977]">Destinations</p>
              <p className="mt-3 text-3xl font-black">100+</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-[0_14px_34px_rgba(0,0,0,0.25)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd977]">Verified Services</p>
              <p className="mt-3 text-3xl font-black">24/7</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-[0_14px_34px_rgba(0,0,0,0.25)] backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd977]">Trusted by Travelers</p>
              <p className="mt-3 text-lg leading-relaxed text-white/90">
                Curated stays, seamless transport, and authentic local experiences in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
