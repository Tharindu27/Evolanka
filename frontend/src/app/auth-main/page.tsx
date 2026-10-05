import Link from 'next/link';

export default function AuthMainPage() {
	return (
		<div
			className="relative min-h-screen overflow-x-hidden text-white antialiased"
			style={{ fontFamily: 'Inter, sans-serif' }}
		>
			<div className="fixed inset-0 -z-10 h-full w-full">
				<div className="absolute inset-0 z-[1] bg-black/30" />
				<img
					alt="Sigiriya Lion Rock at sunrise"
					className="h-full w-full object-cover"
					src="/images/landing-page/sigiriya.png"
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

			<main className="relative z-10 flex min-h-[calc(100vh-180px)] flex-col items-center justify-center px-4">
				<section className="mb-12 text-center" data-purpose="hero-titles">
					<h1 className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl">EVOLANKA</h1>
					<p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white opacity-90 md:text-xl">
						The intersection of world-class adventure and seamless professional service.
					</p>
				</section>

				<section className="grid w-full max-w-4xl gap-8 md:grid-cols-2" data-purpose="user-pathway-cards">
					<div className="rounded-[40px] border border-white/30 bg-white/45 p-10 text-center backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 md:p-14">
						<div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100/50">
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
						<h2 className="mb-6 text-3xl font-bold text-blue-900">Start Your Journey</h2>
						<p className="mx-auto mb-10 max-w-xs text-lg leading-relaxed text-blue-900/80">
							Discover hidden gems, book unique stays, and connect with a global community of travelers. Your next
							adventure is just a tap away.
						</p>
						<div className="mt-auto w-full">
							<Link
								href="/auth/register"
								className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0047AB] py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-800"
							>
								Sign Up as Traveler <span className="text-lg">→</span>
							</Link>
							<p className="text-sm text-blue-900/70">
								Already have an account?{' '}
								<Link href="/auth/login" className="font-bold text-blue-900 underline underline-offset-2">
									Log In
								</Link>
							</p>
						</div>
					</div>

					<div className="rounded-[40px] border border-white/30 bg-white/45 p-10 text-center backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/50 md:p-14">
						<div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100/50">
							<svg className="h-7 w-7 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								/>
							</svg>
						</div>
						<h2 className="mb-6 text-3xl font-bold text-emerald-900">Grow Your Business</h2>
						<p className="mx-auto mb-10 max-w-xs text-lg leading-relaxed text-emerald-900/80">
							Access powerful tools to manage bookings, analyze performance, and reach thousands of explorers waiting
							for your expertise.
						</p>
						<div className="mt-auto w-full">
							<Link
								href="/provider/register"
								className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFA500] py-4 font-semibold text-white shadow-lg shadow-orange-500/20 transition-colors duration-300 hover:bg-orange-500"
							>
								Become a Provider <span className="text-lg">🚀</span>
							</Link>
							<p className="text-sm text-emerald-900/70">
								Manage your hub?{' '}
								<Link href="/provider/login" className="font-bold text-emerald-900 underline underline-offset-2">
									Provider Login
								</Link>
							</p>
						</div>
					</div>
				</section>
			</main>

			<footer className="relative z-10 w-full px-8 pb-10 pt-4">
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

