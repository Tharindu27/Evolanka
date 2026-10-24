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

      <section className="relative min-h-[620px] isolate overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#f3f0e8]">
          <img
            src="/images/provider/Main/provider-home.png"
            alt="Luxury villa property in Sri Lanka"
            className="h-full w-full scale-[1.02] object-cover object-center transition duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a43]/82 via-[#001a43]/58 to-[#001a43]/28" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),transparent_0%)]" />
        </div>

        <div className="mx-auto flex min-h-[540px] max-w-[1440px] items-center px-4 pb-24 pt-10 md:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-[1000px] text-center md:pt-8">
            <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f5e6b8] shadow-[0_8px_30px_rgba(0,26,67,0.15)] backdrop-blur-sm transition duration-300 hover:bg-white/14">
              Partner with EVOLANKA
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-white md:text-6xl lg:text-[5rem]">
              <span className="block transition duration-500 ease-out">Welcome to EVOLANKA</span>
              <span className="mt-2 block text-[#d7b760] transition duration-500 ease-out md:text-4xl lg:text-[3rem]">
                Provider Portal
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#edf3ff] md:text-lg">
              Connect with travelers seeking authentic stays, unforgettable experiences, and trusted local hospitality across the island.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/provider/profile/account"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#345267] bg-[#001a43] px-6 py-3 text-sm font-bold text-white shadow-[0_20px_48px_rgba(0,26,67,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b2d6d] hover:text-white"
              >
                Go To Your Account
              </Link>
              <Link
                href="/provider/profile/services?backTo=/provider/main-page/home"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Add Your Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-[130px] rounded-2xl border border-white/15 bg-white/8 px-4 py-3 shadow-[0_12px_32px_rgba(0,26,67,0.12)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/12"
                >
                  <div className="text-2xl font-black tracking-[-0.05em] text-white">{stat.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
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
