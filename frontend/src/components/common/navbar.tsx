import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Locations', href: '/locations' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Tour Guides', href: '/tour-guides' },
  { label: 'Rentals', href: '/rentals' },
  { label: 'Taxis', href: '/taxis' },
];

export default function Navbar({ active }: { active?: string }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/60 bg-white shadow-sm">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter text-[#003d9b]">
            EVOLANKA
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active === item.href ? 'page' : undefined}
                className={
                  active === item.href
                    ? 'border-b-2 border-[#003d9b] pb-1 text-sm font-bold text-[#003d9b]'
                    : 'text-sm font-medium text-slate-600 transition-colors hover:text-[#003d9b]'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth-main"
            className="rounded-full border-2 border-[#003d9b] px-6 py-2 text-sm font-bold text-[#003d9b] transition-all hover:bg-[#003d9b]/5"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}