'use client';

import { Fragment, useEffect, useState, type ReactNode } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import { updateHotelListing } from '@/lib/guide-registration';
import type { PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

type ContractSection = {
  id: string;
  title: string;
  intro?: string;
  bullets?: string[];
  outro?: string;
};

// Wrap text in **double asterisks** to render it bold.
const contractSections: ContractSection[] = [
  {
    id: 'purpose',
    title: 'Purpose',
    intro:
      'This Agreement enables the Partner to list, market, and sell accommodation and related services through the EVOLANKA digital platform, operated by the Company.',
  },
  {
    id: 'partner-responsibilities',
    title: "Partner's Responsibilities",
    intro: 'The Partner agrees to:',
    bullets: [
      'Provide accurate and updated details of the property, rates, photos, and amenities.',
      'Honour all confirmed bookings transmitted through the EVOLANKA platform.',
      'Maintain required business, tourism, and health licences.',
      "Ensure guests' safety and provide services in accordance with accepted hospitality standards.",
      "Update room availability promptly and maintain communication with EVOLANKA's operations team.",
      'Avoid overbooking or misrepresentation of facilities.',
      'Handle any customer complaints or refunds arising from on-site service issues.',
    ],
  },
  {
    id: 'company-responsibilities',
    title: "Company's Responsibilities",
    intro: 'EVOLANKA shall:',
    bullets: [
      "Publish Partner's listings on its website and mobile app.",
      'Process and transmit bookings securely.',
      'Manage payment processing and customer support for online reservations.',
      'Maintain and update the platform in accordance with applicable Sri Lankan digital laws.',
    ],
  },
  {
    id: 'commission',
    title: 'Commission, Payment and Taxes',
    bullets: [
      'The Partner shall pay a commission to the Company for every completed booking, as per the rate mutually agreed in writing.',
      'Payments will be made to the Partner monthly in LKR via bank transfer.',
      'A commission of **twelve percent (12%)** shall be applicable on all relevant transactions. This rate is subject to revision upon prior notice.',
      'A charge of **3.7% (inclusive of VAT)** shall be applied and must be expressly stated in this Agreement. The Company may withhold payment where fraud or material breach is suspected.',
      'Payments due to hoteliers shall be settled on a rolling basis every **three (03) days**.',
      "In the event of non-payment of any due commission or charges, the hotelier's account shall be suspended or blocked until full settlement is made.",
      'These terms shall apply exclusively to **"Pay at Property"** hotel bookings.',
      'All transactions under this Agreement shall be conducted in **Sri Lankan Rupees (LKR)** only.',
      'In the event of continued non-payment, the Company reserves the right to initiate legal proceedings.',
      'Cancellation policies shall apply only to bookings made via card payments unless otherwise agreed.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    bullets: [
      'All copyrights, logos, trade names, and software related to the EVOLANKA platform remain the sole property of EVOLANKA.',
      'The Partner is granted a limited, non-exclusive licence to use such materials solely to fulfil this Agreement.',
      'The Partner may not use EVOLANKA trademarks in any misleading or unauthorized way.',
    ],
  },
  {
    id: 'data-protection',
    title: 'Data Protection and Privacy',
    bullets: [
      'Both parties shall comply with the Personal Data Protection Act No. 9 of 2022.',
      'Personal data of customers shall be processed only for booking and service delivery purposes.',
      'Both parties shall implement reasonable technical and organizational measures to secure personal data.',
      'Disclosure to third parties shall be restricted except where required by law.',
    ],
  },
  {
    id: 'confidentiality',
    title: 'Confidentiality',
    intro:
      'All non-public, commercial, and operational information exchanged shall remain confidential during and after this Agreement. Disclosure is permitted only with prior written consent or where required by law.',
  },
  {
    id: 'indemnity',
    title: 'Indemnity and Liability',
    bullets: [
      'Each party shall indemnify the other against claims, damages, or losses caused by its own negligence or breach.',
      "EVOLANKA shall not be liable for loss, injury, or damage occurring within the Partner's premises.",
      'Liability of the Company shall not exceed the total commission paid to the Partner in the preceding 12 months.',
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance',
    intro: 'Both parties shall comply with all applicable laws of Sri Lanka, including:',
    bullets: [
      'Bribery Act No. 11 of 1954',
      'Financial Transactions Reporting Act No. 6 of 2006',
      'Prevention of Money Laundering Act No. 5 of 2006',
      'Consumer Affairs Authority Act No. 9 of 2003',
    ],
    outro:
      'Any act of corruption, fraud, or money laundering shall constitute a material breach entitling immediate termination.',
  },
  {
    id: 'force-majeure',
    title: 'Force Majeure',
    intro:
      'Neither party shall be liable for failure to perform obligations due to events beyond control, including natural disasters, war, terrorism, civil unrest, or pandemics.',
  },
  {
    id: 'termination',
    title: 'Term and Termination',
    bullets: [
      "This Agreement continues until terminated by either party with thirty (30) days' written notice.",
      'Either party may terminate immediately upon material breach.',
      'Upon termination, Partner shall remove all EVOLANKA materials and discontinue use of the Partner Centre.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law and Dispute Resolution',
    intro:
      'This Agreement shall be governed by the laws of Sri Lanka, and any dispute shall be subject to the exclusive jurisdiction of the courts of Colombo.',
  },
];

const navItems = [
  ...contractSections.map(({ id, title }) => ({ id, title })),
  { id: 'acceptance', title: 'Acceptance' },
];

const navLabels: Record<string, string> = {
  commission: 'Commission, Payment and Taxes',
  'governing-law': 'Governing Law and Dispute',
};

function renderRich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-bold text-[#001a43]">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

export default function AgreementForm({ category }: { category: PropertyCategory }) {
  const [accepted, setAccepted] = useState(false);
  const [activeId, setActiveId] = useState(navItems[0].id);

  useEffect(() => {
    const targets = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <HostSetupLayout
      backHref={`${base}/account-details?category=${category}`}
      nextHref={`${base}/complete?category=${category}`}
      nextDisabled={!accepted}
      nextLabel="Accept & Submit ✓"
      onNext={() =>
        updateHotelListing({
          sessionId: String(Math.floor(10000 + Math.random() * 90000)),
          partnerId: String(Math.floor(100 + Math.random() * 900)),
          submittedAt: new Date().toISOString(),
        })
      }
      helpText="Need assistance? Consult the"
      helpLinkText="Partner Support Desk"
    >
      <div className="text-center">
        <h1 className="brand-page-title text-3xl font-black tracking-[-0.06em] md:text-4xl">Sign your contract</h1>
        <p className="brand-page-subtitle mt-2 text-sm">Please review and accept the terms to continue.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <nav
            aria-label="On this page"
            className="sticky top-6 rounded-xl border border-[#e3e8f4] bg-white p-4 shadow-[0_8px_24px_rgba(0,26,67,0.06)]"
          >
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#6c7387]">
              <span>On this page</span>
              <span className="font-medium normal-case tracking-normal">{contractSections.length} sections</span>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.id)}
                      className={[
                        'w-full rounded-lg px-3 py-2 text-left text-xs transition-colors',
                        isActive
                          ? 'bg-[#001a43] font-semibold text-white'
                          : 'text-[#4e5568] hover:bg-[#f0f4ff] hover:text-[#001a43]',
                      ].join(' ')}
                    >
                      {navLabels[item.id] ?? item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <article className="rounded-[1.3rem] border border-[#e3e8f4] border-t-[3px] border-t-[#b08d1f] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <p className="text-sm leading-relaxed text-[#4e5568]">
            This Agreement is made between <strong className="font-bold text-[#001a43]"> EVOLANKA (PRIVATE) LIMITED</strong>,
            a company duly incorporated under the Companies Act No. 7 of 2007 of the Democratic Socialist Republic of Sri Lanka 
          </p>
          <p className="my-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b08d1f]">And</p>
          <p className="text-sm leading-relaxed text-[#4e5568]">
            <strong className="font-bold text-[#001a43]">Ceylon Hotel</strong>, of 230, Galle Road, Colombo, Sri Lanka
          </p>

          {contractSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mt-7 scroll-mt-6 border-t border-[#e3e8f4] pt-6"
            >
              <h2 className="text-lg font-bold tracking-[-0.02em] text-[#001a43]">{section.title}</h2>
              {section.intro && <p className="mt-3 text-sm leading-relaxed text-[#4e5568]">{section.intro}</p>}
              {section.bullets && (
                <ul className="mt-3 space-y-2.5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-[#4e5568]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b08d1f]" />
                      <span>{renderRich(bullet)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.outro && <p className="mt-4 text-sm leading-relaxed text-[#4e5568]">{section.outro}</p>}
              {section.id === 'governing-law' && (
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a93a8]">
                  In witness whereof, the parties hereto have executed this agreement on the date above written.
                </p>
              )}
            </section>
          ))}

          <section id="acceptance" className="mt-7 scroll-mt-6 border-t border-[#e3e8f4] pt-6">
            <button
              type="button"
              role="checkbox"
              aria-checked={accepted}
              onClick={() => setAccepted((prev) => !prev)}
              className={[
                'flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition-colors',
                accepted ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#dce3f1] bg-white hover:border-[#001a43]/50',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[11px] font-bold',
                  accepted ? 'border-[#b08d1f] bg-[#b08d1f] text-white' : 'border-[#c5cde0] bg-white text-transparent',
                ].join(' ')}
              >
                ✓
              </span>
              <span className="text-sm font-medium text-[#001a43]">
                I have read and agree to the terms and conditions of the EVOLANKA Hotel Partner Agreement.
              </span>
            </button>
          </section>
        </article>
      </div>

      <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a93a8]">
        EVOLANKA Host Platform • All system assets compliant • Secure cloud storage
      </p>
    </HostSetupLayout>
  );
}
