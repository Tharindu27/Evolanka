import Link from 'next/link';

import Footer from '@/components/common/footer';
import ProviderAuthLink from '@/components/common/provider-common/auth-link';
import ProviderNavbar from '@/components/common/provider-common/navbar';
import type { RoleLandingContent } from '@/data/provider-landing-data';

import Icon from './icons';
import { BenefitCard, CtaBand, Faq, HowItWorks, SectionHeading } from './sections';

export default function RoleLanding({ content }: { content: RoleLandingContent }) {
  const backTo = `/provider/main-page/${content.slug}`;

  return (
    <main className="bg-[#f9f9ff] text-[#001a43]">
      <ProviderNavbar />

      <section className="relative isolate overflow-hidden pt-28 md:pt-32">
        <div className="absolute inset-0 -z-20 bg-[#001a43]">
          <img src={content.image} alt={content.imageAlt} className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001a43]/90 via-[#001a43]/60 to-[#001a43]/25" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#001a43]/70 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1440px] px-4 pb-40 pt-12 md:px-8 md:pb-48 md:pt-20 lg:px-12">
          <div className="max-w-[720px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3dd9a] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
              {content.eyebrow}
            </span>

            <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-[-0.05em] text-white md:text-6xl">
              {content.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-white/80 md:text-lg">{content.subtitle}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ProviderAuthLink
                href={`/provider/profile/account?backTo=${backTo}`}
                className="btn-primary inline-flex items-center justify-center rounded-full border-2 border-[#345267] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.28)] transition-all hover:-translate-y-0.5 hover:text-white"
              >
                Go To Your Account
              </ProviderAuthLink>
              <ProviderAuthLink
                href={`/provider/profile/services?backTo=${backTo}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Add Your Services
                <Icon name="arrow" className="h-4 w-4" />
              </ProviderAuthLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {content.audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-4 md:-mt-28 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-[#dfe7f5] bg-[#dfe7f5] shadow-[0_24px_80px_rgba(0,26,67,0.16)] lg:grid-cols-4">
          {content.stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-7 text-center">
              <div className="text-3xl font-black tracking-[-0.05em] text-[#001a43] md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9a227]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section id="overview" className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow={content.benefitsEyebrow}
          title={content.benefitsTitle}
          description={content.benefitsDescription}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </section>

      <section className="bg-[#eef3ff] py-20">
        <div className="mx-auto grid max-w-[1440px] items-stretch gap-8 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div className="rounded-[2rem] border border-[#d7e0f4] bg-white p-8 shadow-[0_18px_50px_rgba(0,26,67,0.06)] md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#63759e]">{content.featuresEyebrow}</p>
            <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-[#001a43] md:text-4xl">
              {content.featuresTitle}
            </h3>

            <ul className="mt-8 space-y-5">
              {content.features.map((feature) => (
                <li key={feature.title} className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#001a43] text-[#ffd977]">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-base font-bold text-[#001a43]">{feature.title}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#475268]">{feature.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#001a43] via-[#002d6b] to-[#001a43] p-8 text-white shadow-[0_24px_80px_rgba(0,26,67,0.22)] md:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c9a227]/25 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#d7c787]">Why it pays to partner</p>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-7xl font-black tracking-[-0.06em] text-[#ffd977] md:text-8xl">{content.highlight.value}</span>
                <span className="text-lg font-semibold text-white/85">{content.highlight.label}</span>
              </div>
              <p className="mt-5 max-w-md text-base leading-8 text-white/75">{content.highlight.text}</p>
            </div>

            <div className="relative mt-10 flex flex-wrap gap-3">
              <Link
                href={`/provider/register?backTo=${backTo}`}
                className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(176,141,31,0.3)] transition-all hover:-translate-y-0.5 hover:text-white"
              >
                Register now
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href={`/provider/login?backTo=${backTo}`}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Faq items={content.faqs} />
      <CtaBand
        eyebrow="Ready when you are"
        title={content.ctaTitle}
        description={content.ctaDescription}
        registerHref={`/provider/register?backTo=${backTo}`}
        loginHref={`/provider/login?backTo=${backTo}`}
      />

      <Footer />
    </main>
  );
}
