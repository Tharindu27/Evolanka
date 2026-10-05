import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/landing-page/landing-hero.png")',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-5xl font-black text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] md:text-7xl">
          Sri Lanka is Yours to Explore
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl font-bold text-white drop-shadow-md md:text-2xl">
          Experience the intersection of soulful adventure and premium service in Sri Lanka.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/social-feed"
            className="w-full rounded-xl bg-[#003d9b] px-10 py-4 text-xl font-bold text-white shadow-xl transition-transform hover:scale-105 sm:w-auto"
          >
            Share Experience
          </Link>
          <Link
            href="/trip-plan"
            className="w-full rounded-xl border border-white/40 bg-white/20 px-10 py-4 text-xl font-bold text-white backdrop-blur-md transition-colors hover:bg-white/30 sm:w-auto"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
}
