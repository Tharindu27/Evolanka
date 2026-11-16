"use client";

import Link from 'next/link';
import { useState, type SyntheticEvent } from 'react';

export default function AdminLoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [notice, setNotice] = useState('');

	const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNotice('Admin sign-in is not connected yet. Please contact your system administrator.');
	};

	return (
		<main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f7fc] px-4 py-10 text-[#001a43] sm:px-6">
			<div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_10%,rgba(0,61,155,0.12),transparent_35%),radial-gradient(ellipse_at_90%_90%,rgba(201,162,39,0.13),transparent_38%)]" />
				<div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full border border-[#001a43]/[0.07]" />
				<div className="absolute -left-12 top-[calc(25%+3rem)] h-48 w-48 rounded-full border border-[#001a43]/[0.07]" />
				<div className="absolute -right-28 -top-24 h-[28rem] w-[28rem] rotate-12 rounded-[5rem] border border-[#c9a227]/20" />
				<div className="absolute -bottom-36 -right-20 h-[30rem] w-[30rem] rotate-12 rounded-[6rem] border border-[#001a43]/[0.06]" />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(0,26,67,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,26,67,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
			</div>

			<section className="w-full max-w-[460px]">
				<Link href="/" className="mx-auto mb-7 flex w-fit items-center gap-2 text-xl font-black tracking-[0.18em] text-[#001a43]">
					EVOLANKA
					<span className="h-2.5 w-2.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
				</Link>

				<div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_28px_90px_rgba(0,26,67,0.14)] backdrop-blur-xl">
					<div className="h-1.5 bg-gradient-to-r from-[#001a43] via-[#174783] to-[#c9a227]" />
					<div className="p-7 sm:p-10">
						<div className="mb-8">
							<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#001a43] text-[#ffd977] shadow-[0_8px_20px_rgba(0,26,67,0.2)]">
								<svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-[1.7]">
									<path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
									<rect x="9" y="10.5" width="6" height="5" rx="1" />
									<path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5" />
								</svg>
							</div>
							<p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#9a7611]">Secure access</p>
							<h1 className="text-3xl font-black tracking-tight text-[#001a43]">Admin sign in</h1>
							<p className="mt-2 text-sm leading-6 text-slate-600">Sign in to manage the EVOLANKA platform.</p>
						</div>

						<form className="space-y-5" onSubmit={handleSubmit}>
							<div className="space-y-2">
								<label htmlFor="admin-email" className="block text-sm font-semibold text-[#183354]">Email address</label>
								<div className="relative">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[#718096] stroke-[1.7]">
										<rect x="3.5" y="5" width="17" height="14" rx="2" />
										<path d="m4.5 7 7.5 5.5L19.5 7" />
									</svg>
									<input
										id="admin-email"
										name="email"
										type="email"
										autoComplete="username"
										required
										placeholder="admin@example.com"
										className="w-full rounded-xl border border-[#d8e0ec] bg-[#f9fbfe] py-3.5 pl-11 pr-4 text-sm text-[#001a43] outline-none transition placeholder:text-slate-400 focus:border-[#315b96] focus:bg-white focus:ring-4 focus:ring-[#315b96]/10"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<label htmlFor="admin-password" className="text-sm font-semibold text-[#183354]">Password</label>
								</div>
								<div className="relative">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[#718096] stroke-[1.7]">
										<rect x="4" y="10" width="16" height="11" rx="2" />
										<path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
									</svg>
									<input
										id="admin-password"
										name="password"
										type={showPassword ? 'text' : 'password'}
										autoComplete="current-password"
										required
										placeholder="Enter your password"
										className="w-full rounded-xl border border-[#d8e0ec] bg-[#f9fbfe] py-3.5 pl-11 pr-12 text-sm text-[#001a43] outline-none transition placeholder:text-slate-400 focus:border-[#315b96] focus:bg-white focus:ring-4 focus:ring-[#315b96]/10"
									/>
									<button
										type="button"
										onClick={() => setShowPassword((visible) => !visible)}
										aria-label={showPassword ? 'Hide password' : 'Show password'}
										className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:text-[#001a43] focus:outline-none focus:ring-2 focus:ring-[#315b96]/30"
									>
										{showPassword ? (
											<svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a15.7 15.7 0 0 1-3.1 3.8M6.2 6.2A16.3 16.3 0 0 0 2.5 12s3.5 7 9.5 7a10.5 10.5 0 0 0 4-.8" /></svg>
										) : (
											<svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.7]"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" /><circle cx="12" cy="12" r="3" /></svg>
										)}
									</button>
								</div>
							</div>

							{notice ? (
								<p role="alert" className="rounded-xl border border-[#eadcae] bg-[#fff9e8] px-4 py-3 text-sm leading-5 text-[#6b5310]">
									{notice}
								</p>
							) : null}

							<button
								type="submit"
								className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#001a43] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,26,67,0.2)] transition hover:-translate-y-0.5 hover:bg-[#082b5f] focus:outline-none focus:ring-4 focus:ring-[#315b96]/25"
							>
								Sign in to admin
								<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform group-hover:translate-x-1"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
							</button>
						</form>

						<div className="mt-7 flex items-center justify-center gap-2 border-t border-[#e7edf5] pt-5 text-xs text-slate-500">
							<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-[#9a7611] stroke-[1.7]"><path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
							Protected access for authorized administrators
						</div>
					</div>
				</div>

				<p className="mt-6 text-center text-xs text-[#66758b]">© {new Date().getFullYear()} EVOLANKA · Platform administration</p>
			</section>
		</main>
	);
}
