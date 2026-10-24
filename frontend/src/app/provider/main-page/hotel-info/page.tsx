import Link from 'next/link';

import Footer from '@/components/common/footer';
import ProviderNavbar from '@/components/common/provider-common/navbar';

const benefits = [
  {
    title: 'Transparent & Fair Pricing',
    description:
      'Enjoy a low, fixed Flat 12% Commission on successful bookings. Zero listing fees, zero setup costs, and no hidden charges ever.',
  },
  {
    title: 'Promote to Everyone via Social Media',
    description:
      'Seamlessly share your property posts, special package deals, and stories across EVOLANKA’s social media channels and external networks to reach a wider global audience.',
  },
  {
    title: 'Reach Verified Travelers',
    description:
      'Showcase your hotel to guests actively searching for premium stays, curated experiences, and memorable Sri Lankan escapes.',
  },
];

const servicePillars = [
  'Dedicated hotel listing management',
  'High-visibility exposure to travelers',
  'Easy booking support and guest communication',
  'Brand visibility through trusted social channels',
];

export default function HotelInfoPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#001a43]">
      <ProviderNavbar />

      <section className="relative isolate min-h-[780px] overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#f3efe9]">
          <img
            src="/images/provider/Main/hotel.png"
            alt="Luxury hotel and villa property in Sri Lanka"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a43]/82 via-[#001a43]/52 to-[#001a43]/30" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-10 md:px-8 lg:px-12">
          <div className="max-w-[680px] pt-10 md:pt-16">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3dd9a] backdrop-blur-sm">
              Welcome hotel owners
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-white md:text-6xl">
              Hotel growth starts with a premium digital presence.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Give your property the visibility it deserves and connect with travelers who value quality stays, warm hospitality, and unforgettable Sri Lankan experiences.
            </p>

            <div className="mt-20 flex flex-wrap items-center gap-4">
              <Link
                href="/provider/profile/account?backTo=/provider/main-page/hotel-info"
                className="btn-primary inline-flex items-center justify-center rounded-full border-2 border-[#345267] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.28)] transition-all hover:-translate-y-0.5 hover:text-white"
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
        </div>
      </section>

      <section id="overview" className="mx-auto bg-[#f9f9ff] max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
              For hotel owners
            </span>
         <h2 className="mt-5 text-3xl font-black tracking-[-0.06em] text-[#001a43] md:text-5xl">
            Built to help your hotel business feel premium from the first click.
          </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-[2rem] border border-[#dfe5f1] bg-white p-7 shadow-[0_18px_54px_rgba(0,26,67,0.06)]">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-xl text-[#001a43]">
                {benefit.title.includes('Commission') ? '₨' : benefit.title.includes('Social') ? '◎' : '★'}
              </div>
              <h3 className="text-xl font-bold text-[#001a43]">{benefit.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#475268]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#edf3ff] py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#d7e0f4] bg-white p-8 shadow-[0_18px_50px_rgba(0,26,67,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#63759e]">Why hotel owners choose us</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.06em] text-[#001a43] md:text-4xl">
              A cleaner way to grow your property business.
            </h3>

            <ul className="mt-7 space-y-4">
              {servicePillars.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-[#33415a]">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#001a43] text-[11px] text-white">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] bg-[#001a43] p-8 text-white shadow-[0_24px_80px_rgba(0,26,67,0.18)] md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7c787]">Hotel growth, simplified</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white md:text-5xl">
              Make your property feel worth booking before the first guest arrives.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
              Whether you manage a boutique villa, a premium resort, or a city stay, EVOLANKA helps your brand become more visible, more trusted, and easier to book.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/provider/register?backTo=/provider/main-page/hotel-info"
                className="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(176,141,31,0.3)] transition-all hover:-translate-y-0.5 hover:text-white"
              >
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
