"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { logout, type AuthRole, type AuthUser } from '@/lib/api';
import { getInitials } from '@/lib/initials';
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

// Closes a dropdown when the user clicks anywhere outside of it.
function useDismissOnOutsideClick(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return ref;
}

// Profile picture, or two initials when the user has not uploaded one.
function Avatar({ user }: { user: AuthUser }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#001a43] text-sm font-bold text-white"
    >
      {user.profilePicture ? (
        // Remote Cloudinary image; next/image would need the host whitelisted.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.profilePicture} alt="" className="h-full w-full object-cover" />
      ) : (
        getInitials(user.name)
      )}
    </span>
  );
}

function ServicesMenu({ isMobile, onNavigate }: { isMobile: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useDismissOnOutsideClick(open, () => setOpen(false));

  return (
    <div ref={isMobile ? undefined : menuRef} className={isMobile ? 'grid gap-1' : 'relative'}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={
          isMobile
            ? 'inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-[#001a43] transition-colors hover:bg-[#f1f5ff]'
            : 'inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-bold text-[#001a43] transition-colors hover:underline'
        }
      >
        List Your Services
        <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-current stroke-2 transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
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
                setOpen(false);
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
  );
}

export default function AuthMenu({ role, signInHref, variant = 'desktop', onNavigate }: AuthMenuProps) {
  const router = useRouter();
  const { user, ready } = useAuthUser(role);
  const isMobile = variant === 'mobile';
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useDismissOnOutsideClick(accountOpen, () => setAccountOpen(false));

  if (!ready) {
    return isMobile ? null : <span className="h-10 w-24" aria-hidden="true" />;
  }

  // Tourists keep the provider sign-up links in the navbar whether signed in or not.
  const servicesMenu = role === 'tourist' ? <ServicesMenu isMobile={isMobile} onNavigate={onNavigate} /> : null;

  if (!user) {
    return (
      <div className={isMobile ? 'grid gap-2' : 'flex items-center gap-3'}>
        {servicesMenu}
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
    setAccountOpen(false);
    onNavigate?.();
    router.push(signOutHref[role]);
  };

  const accountLinks = (
    <>
      <Link
        href={profileHref[user.role]}
        onClick={() => {
          setAccountOpen(false);
          onNavigate?.();
        }}
        className="block w-full border-b border-[#dce3f1] px-4 py-2.5 text-left text-sm font-semibold text-[#001a43] hover:bg-[#f1f5ff]"
      >
        My account
      </Link>
      <button
        type="button"
        onClick={handleSignOut}
        className="w-full px-4 py-2.5 text-left text-sm font-bold text-[#001a43] transition-colors hover:bg-[#f1f5ff]"
      >
        Sign out
      </button>
    </>
  );

  if (isMobile) {
    return (
      <div className="grid gap-2">
        {servicesMenu}
        <button
          type="button"
          aria-label="Account menu"
          aria-expanded={accountOpen}
          onClick={() => setAccountOpen(!accountOpen)}
          className="flex items-center justify-center gap-3 rounded-xl bg-[#f8fbff] px-3 py-2 text-sm font-semibold text-[#001a43]"
        >
          <Avatar user={user} />
          Account
        </button>

        {accountOpen ? <div className="overflow-hidden rounded-xl border border-[#dce3f1] bg-white shadow-sm">{accountLinks}</div> : null}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {servicesMenu}
      <div ref={accountRef} className="relative">
        <button
          type="button"
          aria-label="Account menu"
          aria-expanded={accountOpen}
          onClick={() => setAccountOpen(!accountOpen)}
          className="rounded-full ring-2 ring-[#dce3f1] transition hover:ring-[#001a43]/40"
        >
          <Avatar user={user} />
        </button>

        {accountOpen ? (
          <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-[#dce3f1] bg-white shadow-[0_12px_32px_rgba(0,26,67,0.15)]">
            {accountLinks}
          </div>
        ) : null}
      </div>
    </div>
  );
}
