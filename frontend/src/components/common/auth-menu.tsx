"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { logout, type AuthRole } from '@/lib/api';
import { useAuthUser } from '@/lib/use-auth-user';

type AuthMenuProps = {
  role: AuthRole;
  signInHref: string;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
};

const profileHref = {
  tourist: '/customer/profile/account',
  provider: '/provider/profile/account',
} as const;

const signOutHref = {
  tourist: '/',
  provider: '/provider/main-page/home',
} as const;

const serviceLinks = [
  { label: 'Property', href: '/provider/main-page/hotel-info' },
  { label: 'Guiding', href: '/provider/main-page/guide-info' },
  { label: 'Rental Service', href: '/provider/main-page/rental-info' },
  { label: 'Taxi Service', href: '/provider/main-page/taxi-info' },
] as const;

export default function AuthMenu({ role, signInHref, variant = 'desktop', onNavigate }: AuthMenuProps) {
  const router = useRouter();
  const { user, ready } = useAuthUser(role);
  const isMobile = variant === 'mobile';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!ready) {
    return isMobile ? null : <span className="h-10 w-24" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <div className={isMobile ? 'grid gap-2' : 'flex items-center gap-3'}>
        {role === 'tourist' ? (
          <div ref={isMobile ? undefined : menuRef} className={isMobile ? 'grid gap-1' : 'relative'}>
            <button
              type="button"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={
                isMobile
                  ? 'inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-[#001a43] transition-colors hover:bg-[#f1f5ff]'
                  : 'inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[#001a43] transition-colors hover:underline'
              }
            >
              List Your Services
              <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-current stroke-2 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen ? (
              <div
                className={
                  isMobile
                    ? 'overflow-hidden rounded-xl border border-[#dce3f1] bg-white shadow-sm'
                    : 'absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-[#dce3f1] bg-white shadow-[0_12px_32px_rgba(0,26,67,0.15)]'
                }
              >
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => {
                      setDropdownOpen(false);
                      onNavigate?.();
                    }}
                    className="block w-full border-b border-[#dce3f1] px-4 py-2.5 text-left text-sm font-semibold text-[#001a43] last:border-b-0 hover:bg-[#f1f5ff]"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        <Link
          href={signInHref}
          onClick={onNavigate}
          className={
            isMobile
              ? 'btn-primary inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all hover:text-white'
              : 'btn-primary rounded-full px-6 py-2 text-sm font-bold text-white transition-all hover:text-white'
          }
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleSignOut = () => {
    logout(role);
    setDropdownOpen(false);
    onNavigate?.();
    router.push(signOutHref[role]);
  };

  const firstName = user.name.split(' ')[0];

  if (isMobile) {
    return (
      <div className="grid gap-2">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 rounded-xl bg-[#f8fbff] px-3 py-2 text-sm font-semibold text-[#001a43]"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#001a43] text-sm font-bold uppercase text-white"
          >
            {user.name.charAt(0)}
          </span>
          <span className="max-w-[120px] truncate">{firstName}</span>
        </button>

        {dropdownOpen ? (
          <div className="rounded-xl bg-white border border-[#dce3f1] shadow-sm overflow-hidden">
            <Link
              href={profileHref[user.role]}
              onClick={() => {
                setDropdownOpen(false);
                onNavigate?.();
              }}
              className="block w-full px-4 py-2.5 text-sm font-semibold text-[#001a43] text-left hover:bg-[#f1f5ff] border-b border-[#dce3f1]"
            >
              My account
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full px-4 py-2.5 text-sm font-bold text-[#001a43] text-left hover:bg-[#f1f5ff] transition-colors"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 rounded-full border border-[#dce3f1] bg-white py-1 pl-1 pr-4 text-sm font-semibold text-[#001a43] shadow-sm transition-colors hover:bg-[#f1f5ff]"
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#001a43] text-sm font-bold uppercase text-white"
        >
          {user.name.charAt(0)}
        </span>
        <span className="max-w-[120px] truncate">{firstName}</span>
      </button>

      {dropdownOpen ? (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#dce3f1] bg-white shadow-[0_12px_32px_rgba(0,26,67,0.15)] overflow-hidden z-50">
          <Link
            href={profileHref[user.role]}
            onClick={() => {
              setDropdownOpen(false);
              onNavigate?.();
            }}
            className="block w-full px-4 py-2.5 text-sm font-semibold text-[#001a43] text-left hover:bg-[#f1f5ff] border-b border-[#dce3f1]"
          >
            My account
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full px-4 py-2.5 text-sm font-bold text-[#001a43] text-left hover:bg-[#f1f5ff] transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
