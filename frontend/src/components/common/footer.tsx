import Link from 'next/link';

const exploreLinks = [
  { label: 'Explore Sri Lanka', href: '/locations' },
  { label: 'Service Marketplace', href: '/hotels' },
  { label: 'Social Feed', href: '/social-feed' },
  { label: 'Island News', href: '/social-feed' },
];

const providerLinks = [
  { label: 'Partner Programs', href: '/provider/register' },
  { label: 'Merchant Dashboard', href: '/dashboard/hotel-owner' },
  { label: 'Marketing Tools', href: '/dashboard/rental-owner' },
  { label: 'Safety Standards', href: '/provider/pending-verification' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Compliance', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#003d9b] py-24 text-white">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12">
        <div className="mb-20 grid grid-cols-1 gap-16 md:grid-cols-4">
          <div>
            <h3 className="mb-8 text-2xl font-black uppercase tracking-tighter">EVOLANKA</h3>
            <p className="mb-10 leading-relaxed text-white/80">
              Connecting you to the heart of Sri Lanka through soulful travel and reliable services.
            </p>
            <div className="flex gap-6 text-sm text-white/70">
              <span className="rounded-full border border-white/20 p-2">Public</span>
              <span className="rounded-full border border-white/20 p-2">Share</span>
              <span className="rounded-full border border-white/20 p-2">Support</span>
            </div>
          </div>

          <div>
            <h4 className="mb-8 text-lg font-bold">Explore</h4>
            <ul className="space-y-4 text-sm font-medium text-white/70">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-lg font-bold">For Providers</h4>
            <ul className="space-y-4 text-sm font-medium text-white/70">
              {providerLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-lg font-bold">Legal</h4>
            <ul className="space-y-4 text-sm font-medium text-white/70">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 md:flex-row">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">
            © 2026 EVOLANKA Platforms. All rights reserved.
          </p>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-white/60">
            <span>English (US)</span>
            <span>LKR (Rs)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}