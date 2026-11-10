'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getErrorMessage, registerTourist } from '@/lib/api';
import SocialAuthButtons from '@/components/auth/social-auth-buttons';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', country: '', gender: '', mobileNumber: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await registerTourist({
        name: form.name.trim(),
        country: form.country,
        gender: form.gender,
        mobileNumber: form.mobileNumber.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      router.push('/');
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <div
      className="brand-backdrop relative h-[100dvh] overflow-hidden bg-[#f9f9ff] text-[#041b3c]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/20" />
        <img
          src="/images/Auth/reg-bg.png"
          alt="Sri Lanka landscape"
          className="h-full w-full object-cover"
          style={{ filter: 'saturate(1.08) contrast(0.9) brightness(0.8)' }}
        />
      </div>

      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between px-6">
        <Link href="/auth-main" className="btn-back">
          Back
        </Link>
      </header>


      <main className="relative z-20 flex h-[100dvh] items-center justify-center overflow-hidden px-4 pb-3 pt-14 md:px-6 md:pb-4 md:pt-20">
        <div className="w-full max-w-[460px] -translate-y-6 md:-translate-y-8">
          <div
            className="rounded-[1.5rem] border border-white/35 bg-white/30 p-3 shadow-2xl backdrop-blur-xl [@media(max-height:760px)]:scale-[0.94] [@media(max-height:700px)]:scale-[0.88] md:p-5"
          >
            <div className="mb-3 text-center">
              <h1 className="brand-page-title mb-1.5 text-2xl font-bold md:text-3xl">Join the EVOLANKA Community</h1>
              <p className="brand-page-subtitle text-xs md:text-sm">Start your Sri Lankan adventure today.</p>
            </div>


            <div className="mt-2.5 flex flex-col gap-2">
              <SocialAuthButtons
                buttonClassName="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 md:text-sm"
                iconClassName="h-4 w-4 object-contain"
                onSuccess={() => router.push('/')}
                onError={setError}
              />
            </div>



            <div className="py-2.5">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-300/80" />
                <span className="text-xs font-semibold tracking-[0.12em] text-slate-500">OR</span>
                <div className="h-px flex-1 bg-slate-300/80" />
              </div>
            </div>


            <form className="mx-auto flex w-full flex-col gap-2.5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Country</label>
                <select
                  required
                  value={form.country}
                  onChange={update('country')}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                >
                  <option value="">Select your country</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>


              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                  <label className="pl-1 text-xs font-medium text-white md:text-sm">Gender</label>
                  <select
                    required
                    value={form.gender}
                    onChange={update('gender')}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-0.5">
                  <label className="pl-1 text-xs font-medium text-white md:text-sm">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={form.mobileNumber}
                    onChange={update('mobileNumber')}
                    placeholder="+94 77 123 4567"
                    className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                  />
                </div>
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="email@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
              </div>


              <div className="flex flex-col gap-0.5">
                <label className="pl-1 text-xs font-medium text-white md:text-sm">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={update('password')}
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-300 bg-white/85 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-[#003d9b] md:text-sm"
                />
                <p className="px-1 text-[10px] text-white/90">At least 8 characters with a mix of letters and numbers.</p>
              </div>

              {error ? (
                <p role="alert" className="rounded-lg bg-[#fdecea] px-3 py-2 text-xs font-semibold text-[#d93025]">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-700/20 transition disabled:opacity-60 md:text-sm"
              >
                {submitting ? 'Creating account...' : 'Create My Account'}
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
