import Link from 'next/link';

import Icon, { type IconName } from './icons';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <span className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#001a43]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#001a43] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-[#475268] md:text-lg">{description}</p> : null}
    </div>
  );
}

export function BenefitCard({ icon, title, description }: { icon: IconName; title: string; description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-[#dfe7f5] bg-white p-7 shadow-[0_18px_54px_rgba(0,26,67,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,26,67,0.12)]">
      <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#c9a227] to-[#ffd977] transition duration-300 group-hover:scale-x-100" />
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#001a43] text-[#ffd977] shadow-[0_10px_24px_rgba(0,26,67,0.2)]">
        <Icon name={icon} />
      </div>
      <h3 className="text-xl font-bold text-[#001a43]">{title}</h3>
      <p className="mt-3 text-base leading-7 text-[#475268]">{description}</p>
    </div>
  );
}

const steps: { icon: IconName; title: string; description: string }[] = [
  { icon: 'user', title: 'Create your account', description: 'Sign up as a provider with your name, email and mobile number in under a minute.' },
  { icon: 'upload', title: 'Get verified', description: 'Submit your details and documents so travelers can trust your listing.' },
  { icon: 'list', title: 'Add your services', description: 'Publish your offering with photos, pricing and availability from your dashboard.' },
  { icon: 'users', title: 'Welcome travelers', description: 'Receive requests and bookings from travelers exploring Sri Lanka.' },
];

export function HowItWorks() {
  return (
    <section className="bg-[#f9f9ff] py-20">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-12">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="From sign up to your first booking in four steps."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[#c9a227]/60 to-transparent lg:block"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#f9f9ff] bg-[#001a43] text-[#ffd977] shadow-[0_12px_28px_rgba(0,26,67,0.25)]">
                <Icon name={step.icon} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a227] text-[11px] font-black text-[#001a43]">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#001a43]">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-[#475268]">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <section className="bg-[#f9f9ff] pb-20">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions providers ask us."
          description="Everything you need to know before you list your services."
        />
        <div className="space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-[#dfe7f5] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(0,26,67,0.04)] open:border-[#c9a227]/50 open:shadow-[0_16px_40px_rgba(0,26,67,0.08)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-[#001a43] [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-[#001a43] transition group-open:rotate-45 group-open:bg-[#001a43] group-open:text-[#ffd977]">
                  <Icon name="plus" className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#475268] md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow,
  title,
  description,
  registerHref,
  loginHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  registerHref: string;
  loginHref: string;
}) {
  return (
    <section className="bg-[#f9f9ff] px-4 pb-24 md:px-8 lg:px-12">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#001a43] via-[#002d6b] to-[#001a43] px-6 py-14 text-center text-white shadow-[0_30px_90px_rgba(0,26,67,0.3)] md:px-16 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c9a227]/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#8cb5ff]/20 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ffd977]">{eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-[-0.05em] md:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">{description}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={registerHref}
              className="btn-secondary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_42px_rgba(176,141,31,0.35)] transition-all hover:-translate-y-0.5 hover:text-white"
            >
              Register now
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href={loginHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
