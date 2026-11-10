"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type MouseEvent } from 'react';
import { logout, type AuthRole } from '@/lib/api';
import { useAuthUser } from '@/lib/use-auth-user';

const roleLabel = { tourist: 'Traveler', provider: 'Provider' } as const;

const dashboardHref = { tourist: '/', provider: '/provider/main-page/home' } as const;

export default function AuthMainPage() {
	const router = useRouter();
	const tourist = useAuthUser('tourist');
	const provider = useAuthUser('provider');
	const [pending, setPending] = useState<{ role: AuthRole; href: string } | null>(null);

	const users = { tourist: tourist.user, provider: provider.user };
	const pendingUser = pending ? users[pending.role] : null;

	// Ask before opening login/register when that role is already signed in.
	const guard = (role: AuthRole, href: string) => (event: MouseEvent) => {
		if (!users[role]) return;
		event.preventDefault();
		setPending({ role, href });
	};

	const confirmLogout = () => {
		if (!pending) return;
		logout(pending.role);
		router.push(pending.href);
	};

	const cancel = () => {
		if (!pending) return;
		router.push(dashboardHref[pending.role]);
	};

	return (
		<div
			className="brand-backdrop relative flex h-[100dvh] flex-col overflow-hidden text-white antialiased"
			style={{ fontFamily: 'Inter, sans-serif' }}
		>
			{pending && pendingUser ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" role="dialog" aria-modal="true">
					<div className="w-full max-w-md rounded-2xl bg-white p-6 text-center text-[#001a43] shadow-2xl">
						<h3 className="text-lg font-extrabold">Already signed in</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-700">
							You are currently logged in as <strong>{pendingUser.name}</strong> ({roleLabel[pending.role]}). Do you want to log
							out and continue with a different account?
						</p>
						<div className="mt-5 flex flex-col gap-2 sm:flex-row">
							<button
								type="button"
								onClick={confirmLogout}
								className="flex-1 rounded-xl bg-[#001a43] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#020f2d]"
							>
								Continue / Logout
							</button>
							<button
								type="button"
								onClick={cancel}
								className="flex-1 rounded-xl border border-[#dce3f1] px-4 py-2.5 text-sm font-bold text-[#001a43] transition-colors hover:bg-[#f1f5ff]"
							>
								{pending.role === 'provider' ? 'Cancel & Go to Dashboard' : 'Cancel & Go to Home'}
							</button>
						</div>
					</div>
				</div>
			) : null}

			<div className="fixed inset-0 -z-10 h-full w-full">
				<div className="absolute inset-0 z-[1] bg-black/30" />
				<img
					alt="Sigiriya Lion Rock at sunrise"
					className="h-full w-full object-cover"
					src="/images/landing-page/sigiriya.png"
					style={{ filter: 'saturate(1.08) contrast(0.8) brightness(0.8)' }}
				/>
			</div>

			<header className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-12">
				<Link
					href="/"
					className="cursor-pointer text-2xl font-bold uppercase tracking-widest text-white transition-all hover:opacity-80"
				>
					EVOLANKA
				</Link>
			</header>

			<main className="relative z-10 flex min-h-0 flex-1 -translate-y-4 flex-col items-center justify-center overflow-hidden px-4 pb-2 md:-translate-y-8">
				<section className="mb-6 text-center" data-purpose="hero-titles">
					<h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-6xl">EVOLANKA</h1>
					<p className="mx-auto max-w-xl text-base font-light leading-relaxed text-white opacity-90 md:text-lg">
						The intersection of world-class adventure and seamless professional service.
					</p>
				</section>

				<section className="grid w-full max-w-[54rem] items-stretch gap-6 md:grid-cols-2" data-purpose="user-pathway-cards">
					<div className="flex h-full flex-col rounded-[34px] border border-white/55 bg-gradient-to-b from-white/52 via-white/43 to-white/34 p-9 text-center backdrop-blur-xl shadow-[0_24px_70px_-28px_rgba(0,0,0,0.62)] transition-all duration-300 hover:scale-[1.02] hover:from-white/58 hover:via-white/49 hover:to-white/40 md:p-10">
						<div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/75">
							<svg className="h-7 w-7 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
								<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							</svg>
						</div>
						<h2 className="mb-3 flex min-h-[4.25rem] items-center justify-center text-center text-2xl font-extrabold leading-tight text-[#08245b] md:min-h-[4.75rem] md:text-3xl">
							Start Your Journey
						</h2>
						<p className="mx-auto mb-5 min-h-[7.5rem] max-w-[15.5rem] text-base leading-relaxed text-slate-950 md:min-h-[8rem] md:max-w-sm">
							Discover hidden gems, book unique stays, and connect with a global community of travelers. Your next
							adventure is just a tap away.
						</p>
						<div className="mt-auto flex w-full flex-col gap-3">
							<Link
								href="/auth/login"
								onClick={guard('tourist', '/auth/login')}
								className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl bg-[#041b3c] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-950/30 transition-colors duration-300 hover:bg-[#020f2d]"
							>
								Sign In as Traveler
							</Link>
							<p className="text-sm text-slate-900/95">
								Don't have an account?{' '}
								<Link href="/auth/register" onClick={guard('tourist', '/auth/register')} className="font-bold text-[#0b357f] underline underline-offset-2 transition-colors duration-200 hover:text-[#072455]">
									Sign Up
								</Link>
							</p>
						</div>
					</div>

					<div className="flex h-full flex-col rounded-[34px] border border-white/55 bg-gradient-to-b from-white/52 via-white/43 to-white/34 p-9 text-center backdrop-blur-xl shadow-[0_24px_70px_-28px_rgba(0,0,0,0.62)] transition-all duration-300 hover:scale-[1.02] hover:from-white/58 hover:via-white/49 hover:to-white/40 md:p-10">
						<div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/75">
							<svg className="h-7 w-7 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</div>
						<h2 className="mb-3 flex min-h-[4.25rem] items-center justify-center text-center text-2xl font-extrabold leading-tight text-[#0a4b39] md:min-h-[4.75rem] md:text-3xl">
							Grow Your Business
						</h2>
						<p className="mx-auto mb-5 min-h-[7.5rem] max-w-[15.5rem] text-base leading-relaxed text-slate-950 md:min-h-[8rem] md:max-w-sm">
							Access powerful tools to manage bookings, analyze performance, and reach thousands of explorers waiting
							for your expertise.
						</p>
						<div className="mt-auto flex w-full flex-col gap-3">
							<Link
								href="/provider/login"
								onClick={guard('provider', '/provider/login')}
								className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl bg-[#b08d1f] px-4 py-3 text-base font-semibold text-white shadow-lg shadow-amber-700/25 transition-colors duration-300 hover:bg-[#b08d1f]"
							>
								Become a Provider
							</Link>
							<p className="text-sm text-slate-900/95">
								Don't have an account?{' '}
								<Link href="/provider/register" onClick={guard('provider', '/provider/register')} className="font-bold text-[#844700] underline underline-offset-2 transition-colors duration-200 hover:text-[#5e3200]">
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>

			<footer className="relative z-10 w-full px-8 pb-6 pt-2">
				<div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-12 md:flex-row md:gap-24">
					<div className="text-center">
						<p className="text-2xl font-bold text-white">25</p>
						<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Districts</p>
					</div>
					<div className="hidden h-10 w-[1px] bg-white/30 md:block" />
					<div className="text-center">
						<p className="text-2xl font-bold text-white">24/7</p>
						<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Support</p>
					</div>
					<div className="hidden h-10 w-[1px] bg-white/30 md:block" />
					<div className="text-center">
						<p className="text-2xl font-bold text-white">100%</p>
						<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Secure</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

