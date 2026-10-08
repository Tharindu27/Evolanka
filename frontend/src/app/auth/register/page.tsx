'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div
      className="relative h-[100dvh] overflow-hidden bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/20" />
        <img
          src="/images/Auth/reg-bg.png"
          alt="Sri Lanka landscape"
          className="h-full w-full object-cover"
        />
      </div>

      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between px-6">
        <Link
          href="/auth-main"
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/50"
        >
          Back
        </Link>
      </header>


      <main className="relative z-20 flex h-[100dvh] items-center justify-center overflow-hidden px-4 pb-3 pt-14 md:px-6 md:pb-4 md:pt-20">
        <div className="w-full max-w-[500px] -translate-y-6 md:-translate-y-8">
          <div
            className="rounded-[1.5rem] border border-white/35 bg-white/30 p-4 shadow-2xl backdrop-blur-xl [@media(max-height:760px)]:scale-[0.94] [@media(max-height:700px)]:scale-[0.88] md:p-7"
          >
            <div className="mb-3 text-center">
              <h1 className="mb-1.5 text-2xl font-bold text-[#003d9b] md:text-3xl">Join the EVOLANKA Community</h1>
              <p className="text-xs text-slate-700 md:text-sm">Start your Sri Lankan adventure today.</p>
            </div>


            <div className="mt-3 flex flex-col gap-2.5">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 md:text-sm"
              >
                <img src="/images/Auth/google.png" alt="Google" className="h-4 w-4 object-contain" />
                Continue with Google
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 md:text-sm"
              >
                <img src="/images/Auth/apple.png" alt="Apple" className="h-4 w-4 object-contain" />
                Continue with Apple
              </button>
            </div>



            <div className="py-3.5">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-300/80" />
                <span className="text-xs font-semibold tracking-[0.12em] text-slate-500">OR</span>
                <div className="h-px flex-1 bg-slate-300/80" />
              </div>
            </div>


            <form className="mx-auto flex w-full flex-col gap-3" action="#">
              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Country</label>
                <select className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm">
                  <option value="">Select your country</option>
                  <option value="lk">Sri Lanka</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                </select>
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Email Address</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-3 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
                <p className="px-1 text-[10px] text-white/90">At least 8 characters with a mix of letters and numbers.</p>
              </div>
              

              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#003d9b] px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-[#0052cc] md:text-sm"
              >
                Create My Account
              </button>
            </form>

            <div className="mt-3 border-t border-white/40 pt-3 text-center">
              <p className="text-xs text-white/95 md:text-sm">
                Already have an account?
                <Link href="/auth/login" className="ml-2 font-bold text-[#003d9b] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <p className="mt-2 text-center text-[10px] text-white/80 md:text-xs">
            By signing up, you agree to our{' '}
            <a href="#" className="underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>

      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-white/80 backdrop-blur-md">
          <span className="text-sm">Sigiriya Fortress, Sri Lanka</span>
        </div>
      </div>
    </div>
  );
}
