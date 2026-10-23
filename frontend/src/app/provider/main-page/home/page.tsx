import Link from 'next/link';

import Footer from '@/components/common/footer';
import ProviderNavbar from '@/components/common/provider-common/navbar';

const trustStats = [
  { value: '2.4K+', label: 'monthly views' },
  { value: '1.4K', label: 'bookmarks saved' },
  { value: '96%', label: 'repeat travelers' },
  { value: '24/7', label: 'support coverage' },
];

const benefits = [
  {
    title: 'Reach verified travelers',
    description:
      'Showcase your property to guests actively searching for thoughtful stays and unforgettable experiences across Sri Lanka.',
  },
  {
    title: 'Manage your business, simply',
    description:
      'Track availability, update pricing, and keep your listing fresh from one elegant workspace built for providers.',
  },
  {
    title: 'Grow with local trust',
    description:
      'Build credibility with real guest feedback, polished storytelling, and high-converting place discovery tools.',
  },
];

const highlightPoints = [
  'Dedicated provider dashboard',
  'Flexible listings for hotels, guides, tours, and rentals',
  'Built-in marketing visibility for premium Sri Lankan experiences',
];

export default function ProviderMainPage() {
  return (
    <main className="bg-[#f7f6f2] text-[#001a43]">
      <ProviderNavbar />

      <section className="relative isolate overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#f3f0e8]">
          <img
            src="/images/provider/Main/provider-home.png"
            alt="Luxury villa property in Sri Lanka"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a43]/80 via-[#001a43]/40 to-[#001a43]/20" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10 md:px-8 lg:px-12">
          <div className="max-w-[660px] pt-10 md:pt-14">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f5e6b8] backdrop-blur-sm">
              Partner with EVOLANKA
            </span>

            <h1 className="mt-7 max-w-[560px] text-4xl font-black leading-[1.04] tracking-[-0.06em] text-white md:text-6xl">
              Turn your property into a standout Sri Lankan destination.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Connect with travelers seeking authentic stays, unforgettable experiences, and trusted local hospitality across the island.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/provider/profile/account"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.28)] bg-[#001a43] border-2 border-[#345267] transition-all hover:-translate-y-0.5 hover:bg-[#b08d1f]"
              >
                Go To Your Account
              </Link>
              <Link
                href="/provider/profile/account/listings"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Manage Your Listings
              </Link>
            </div>
          </div>
          <div className="mt-40 flex flex-wrap gap-4 md:gap-16">
              {trustStats.map((stat) => (
                <div key={stat.label} className="min-w-[130px] rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-sm">
                  <div className="text-2xl font-black tracking-[-0.05em] text-white">{stat.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
        </div>
      </section>

      <section id="overview" className="mx-auto bg-[#f9f9ff] max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
              Why providers choose us
            </span>
            <h2 className="mt-5 text-3xl font-black tracking-[-0.06em] text-[#001a43] md:text-5xl">
              Built to help your business feel premium from the first click.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-[#dfe7f5] bg-white p-6 shadow-[0_24px_80px_rgba(0,26,67,0.08)]">
            <p className="text-lg leading-8 text-[#475268]">
              From boutique villas to guided tours and rental experiences, EVOLANKA gives local providers a refined place to stand out, connect with travelers, and build lasting bookings.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[2rem] border border-[#dfe7f5] bg-white p-7 shadow-[0_18px_54px_rgba(0,26,67,0.06)]">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-xl text-[#001a43]">
                ✦
              </div>
              <h3 className="text-xl font-bold text-[#001a43]">{benefit.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#475268]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="partners" className="bg-[#eef3ff] py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#d7e1f8] bg-[#f8fbff] p-8 shadow-[0_18px_50px_rgba(0,26,67,0.06)]">
            <span className="inline-flex rounded-full bg-[#e6edff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
              Provider dashboard
            </span>
            <h3 className="mt-5 text-3xl font-black tracking-[-0.06em] text-[#001a43]">
              Everything you need to attract more travelers.
            </h3>

            <ul className="mt-7 space-y-4">
              {highlightPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-[#33415a]">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#001a43] text-[11px] text-white">
                    ✓
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-[#001a43] p-8 text-white shadow-[0_24px_80px_rgba(0,26,67,0.18)] md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7c787]">Your growth, our platform</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white md:text-5xl">
              Join the next chapter of Sri Lanka’s travel story.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
              Whether you manage a boutique stay, a tour operation, or a luxury retreat, EVOLANKA helps your brand reach travelers who value thoughtful, local experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/provider/register" className="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(176,141,31,0.3)] transition-all hover:-translate-y-0.5 hover:text-white">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
