import Link from 'next/link';

import Footer from '@/components/common/footer';
import ProviderAuthLink from '@/components/common/provider-common/auth-link';
import ProviderNavbar from '@/components/common/provider-common/navbar';
import Icon, { type IconName } from '@/components/provider/landing/icons';
import { BenefitCard, CtaBand, Faq, HowItWorks, SectionHeading } from '@/components/provider/landing/sections';

const trustStats = [
  { value: '2.4K+', label: 'Monthly views' },
  { value: '1.4K', label: 'Bookmarks saved' },
  { value: '96%', label: 'Repeat travelers' },
  { value: '24/7', label: 'Support coverage' },
];

const roles: { icon: IconName; title: string; description: string; href: string; image: string }[] = [
  {
    icon: 'bed',
    title: 'Hotel Owner',
    description: 'Fill more rooms with villas, resorts and stays travelers love.',
    href: '/provider/main-page/hotel-info',
    image: '/images/provider/Main/hotel.png',
  },
  {
    icon: 'map',
    title: 'Tour Guide',
    description: 'Share your local expertise and lead unforgettable journeys.',
    href: '/provider/main-page/guide-info',
    image: '/images/provider/Main/tour-guide.png',
  },
  {
    icon: 'key',
    title: 'Rental Owner',
    description: 'Put your scooters, bikes and cars on the road.',
    href: '/provider/main-page/rental-info',
    image: '/images/provider/Main/rental.png',
  },
  {
    icon: 'car',
    title: 'Taxi Owner',
    description: 'Take airport transfers, intercity rides and chauffeur trips.',
    href: '/provider/main-page/taxi-info',
    image: '/images/provider/Main/taxi.png',
  },
];

const benefits: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'users',
    title: 'Reach verified travelers',
    description:
      'Showcase your services to guests actively searching for thoughtful stays and unforgettable experiences across Sri Lanka.',
  },
  {
    icon: 'chart',
    title: 'Manage your business, simply',
    description:
      'Track availability, update pricing and keep your listing fresh from one elegant workspace built for providers.',
  },
  {
    icon: 'shield',
    title: 'Grow with local trust',
    description:
      'Build credibility with real guest feedback, polished storytelling and high-converting place discovery tools.',
  },
];

const highlightPoints = [
  'Dedicated provider dashboard',
  'Flexible listings for hotels, guides, taxis and rentals',
  'Built-in marketing visibility for premium Sri Lankan experiences',
];

export default function ProviderMainPage() {
  return (
    <main className="bg-[#f9f9ff] text-[#001a43]">
      <ProviderNavbar />

      <section className="relative isolate overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#001a43]">
          <img
            src="/images/provider/Main/provider-home.png"
            alt="Luxury villa property in Sri Lanka"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#001a43]/80 via-[#001a43]/60 to-[#001a43]/85" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pb-44 pt-12 text-center md:px-8 md:pb-52 md:pt-20 lg:px-12">
          <div className="mx-auto max-w-[960px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#f5e6b8] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
              Partner with EVOLANKA
            </span>

            <h1 className="mt-7 text-4xl font-black leading-[1.03] tracking-[-0.05em] text-white md:text-6xl lg:text-[5rem]">
              Welcome to EVOLANKA
              <span className="mt-2 block bg-gradient-to-r from-[#ffd977] to-[#c9a227] bg-clip-text text-transparent">
                Provider Portal
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#edf3ff] md:text-lg">
              Connect with travelers seeking authentic stays, unforgettable experiences and trusted local hospitality across the island.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <ProviderAuthLink
                href="/provider/profile/account"
                className="btn-primary inline-flex items-center justify-center rounded-full border-2 border-[#345267] px-6 py-3 text-sm font-bold text-white shadow-[0_20px_48px_rgba(0,26,67,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
              >
                Go To Your Account
              </ProviderAuthLink>
              <ProviderAuthLink
                href="/provider/profile/services?backTo=/provider/main-page/home"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Add Your Services
                <Icon name="arrow" className="h-4 w-4" />
              </ProviderAuthLink>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-4 md:-mt-28 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-[#dfe7f5] bg-[#dfe7f5] shadow-[0_24px_80px_rgba(0,26,67,0.16)] lg:grid-cols-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-7 text-center">
              <div className="text-3xl font-black tracking-[-0.05em] text-[#001a43] md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9a227]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="roles" className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">
        <SectionHeading
          align="center"
          eyebrow="Choose your path"
          title="One portal for every kind of Sri Lankan host."
          description="Pick the service you offer and see exactly how EVOLANKA helps you reach more travelers."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              className="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[2rem] bg-[#001a43] p-6 text-white shadow-[0_18px_54px_rgba(0,26,67,0.14)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(0,26,67,0.26)]"
            >
              <img
                src={role.image}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#001a43] via-[#001a43]/50 to-[#001a43]/5" />

              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-[#ffd977] backdrop-blur-sm">
                <Icon name={role.icon} />
              </span>
              <h3 className="text-2xl font-black tracking-[-0.03em]">{role.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{role.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#ffd977]">
                Learn more
                <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="overview" className="bg-[#eef3ff] py-20">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Why providers choose us"
            title="Built to help your business feel premium from the first click."
            description="From boutique villas to guided tours and vehicle rentals, EVOLANKA gives local providers a refined place to stand out, connect with travelers and build lasting bookings."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="partners" className="pb-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#d7e1f8] bg-white p-8 shadow-[0_18px_50px_rgba(0,26,67,0.06)] md:p-10">
            <span className="inline-flex rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
              Provider dashboard
            </span>
            <h3 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#001a43]">
              Everything you need to attract more travelers.
            </h3>

            <ul className="mt-7 space-y-4">
              {highlightPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-base text-[#33415a]">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-[#ffd977]">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#001a43] via-[#002d6b] to-[#001a43] p-8 text-white shadow-[0_24px_80px_rgba(0,26,67,0.2)] md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c9a227]/25 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7c787]">Your growth, our platform</p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">
                Join the next chapter of Sri Lanka’s travel story.
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/75">
                Whether you manage a boutique stay, a tour operation or a fleet of vehicles, EVOLANKA helps your brand reach travelers who value thoughtful, local experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Faq
        items={[
          {
            question: 'Who can become an EVOLANKA provider?',
            answer: 'Hotel owners, tour guides, rental owners and taxi owners operating in Sri Lanka can register as providers.',
          },
          {
            question: 'How do I get started?',
            answer: 'Register a provider account, sign in, then use "Add Your Services" to publish your first listing.',
          },
          {
            question: 'Do I need to be verified?',
            answer: 'Yes. Providers submit their details and supporting documents, and our team reviews them so travelers can book with confidence.',
          },
          {
            question: 'How do travelers find my services?',
            answer: 'Your listings appear in EVOLANKA’s marketplace, and you can share posts and offers through the social feed to reach even more travelers.',
          },
        ]}
      />

      <CtaBand
        eyebrow="Ready when you are"
        title="Start growing your business with EVOLANKA today."
        description="Create your provider account and put your services in front of travelers exploring Sri Lanka."
        registerHref="/provider/register"
        loginHref="/provider/login"
      />

      <Footer />
    </main>
  );
}
