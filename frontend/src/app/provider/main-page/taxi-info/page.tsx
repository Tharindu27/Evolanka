import Link from 'next/link';

import Footer from '@/components/common/footer';
import ProviderNavbar from '@/components/common/provider-common/navbar';

const reasons = [
  {
    title: 'Direct Rider Connections',
    description:
      'Receive direct transfer requests from tourists without relying on expensive middlemen.',
  },
  {
    title: 'Showcase Your Ride',
    description:
      'Display vehicle conditions, AC features, luggage capacity, and driver experience to stand out.',
  },
  {
    title: 'Transparent Earnings',
    description:
      'Keep maximum profits with our flat 12% commission rate and clear pricing structures.',
  },
];

const facilities = [
  {
    title: 'Dedicated ride management',
  },
  {
    title: 'Social Media Cross-Promotion',
  },
  {
    title: 'Smart Booking Request & Schedule Management',
  },
  {
    title: 'Verified Ratings & Driver Badges',
  },
];

export default function TaxiInfoPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#001a43]">
      <ProviderNavbar />

      <section className="relative isolate min-h-[780px] overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#efeae0]">
          <img
            src="/images/provider/Main/taxi.png"
            alt="Taxi and private vehicle transfer in Sri Lanka"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a43]/82 via-[#001a43]/52 to-[#001a43]/30" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-10 md:px-8 lg:px-12">
          <div className="max-w-[680px] pt-10 md:pt-16">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3dd9a] backdrop-blur-sm">
              WELCOME TAXI OWNERS
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-white md:text-6xl">
              Drive Sri Lanka’s tourists with comfort, safety, and reliability.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              Connect with travelers searching for airport transfers, intercity rides, and custom island-wide chauffeur trips.
            </p>

            <div className="mt-20 flex flex-wrap items-center gap-4">
              <Link
                href="/provider/profile/account?backTo=/provider/main-page/taxi-info"
                className="btn-primary inline-flex items-center justify-center rounded-full border-2 border-[#345267] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.28)] transition-all hover:-translate-y-0.5 hover:text-white"
              >
                Go To Your Account
              </Link>
              <Link
                href="/provider/profile/listings?backTo=/provider/main-page/taxi-info"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Manage Your Listings
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section id="overview" className="mx-auto bg-[#f9f9ff] max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
            For Taxi Owners
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.06em] text-[#001a43] md:text-5xl">
            Turn every ride into a premium travel experience.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="rounded-[2rem] border border-[#dfe5f1] bg-white p-7 shadow-[0_18px_54px_rgba(0,26,67,0.06)]">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ff] text-xl text-[#001a43]">
                {reason.title.includes('Direct') ? '↗' : reason.title.includes('Showcase') ? '★' : '₨'}
              </div>
              <h3 className="text-xl font-bold text-[#001a43]">{reason.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#475268]">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="bg-[#edf3ff] py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#d7e0f4] bg-white p-8 shadow-[0_18px_50px_rgba(0,26,67,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#63759e]">Why taxi owners choose us</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.06em] text-[#001a43] md:text-4xl">
              Everything you need to run a better taxi service.
            </h3>

            <ul className="mt-7 space-y-4">
              {facilities.map((item) => (
                <li key={item.title} className="flex items-start gap-3 text-base text-[#33415a]">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#001a43] text-[11px] text-white">
                    ✓
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-[2rem] bg-[#001a43] p-8 text-white shadow-[0_24px_80px_rgba(0,26,67,0.18)] md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7c787]">TAXI SERVICE GROWTH, SIMPLIFIED</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.06em] text-white md:text-5xl">
              Make your transport service feel worth booking before the journey begins.
            </h3>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
              Whether you operate luxury sedans, spacious vans, or private cabs, EVOLANKA helps your service become more visible, more trusted, and easier to book.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/provider/register?backTo=/provider/main-page/taxi-info"
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