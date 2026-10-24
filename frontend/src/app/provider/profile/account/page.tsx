import Sidebar from '@/components/provider/common/sidebar';
import { accountProfile, profileDetails } from '@/data/provider-account-data';

export default function ProviderAccountPage() {
  return (
    <main className="h-screen overflow-hidden bg-[#edf1f5] text-[#001a43]">
      <div className="mx-auto flex h-full max-w-[1600px] gap-0 px-0 py-0">
        <Sidebar />

        <div className="flex-1 overflow-y-auto px-10 py-8 md:px-12 lg:px-16">
          <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43]">My account</h1>
          <p className="mt-3 text-base text-[#48566d]">
            Manage your EVOLANKA identity, personal details, and account security.
          </p>

          <section className="mt-8 rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-5 shadow-[0_18px_50px_rgba(0,26,67,0.06)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d8a669] text-2xl font-bold text-white shadow-[0_10px_28px_rgba(0,26,67,0.12)]">
                  T
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[2rem] font-black tracking-[-0.05em] text-[#001a43]">{accountProfile.name}</h2>
                    {accountProfile.isVerified ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e9f7ef] px-2.5 py-1 text-[11px] font-semibold text-[#1e8f5a]">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1e8f5a]" />
                        Hotel Owner
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#4d5d79]">
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                        <path d="M12 21s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10Z" />
                        <circle cx="12" cy="11" r="2.5" />
                      </svg>
                      {accountProfile.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
                        <path d="M4 7h16v10H4z" />
                        <path d="m4 8 8 6 8-6" />
                      </svg>
                      {accountProfile.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[1.5rem] border border-[#dfe8f4] bg-white px-6 py-6 shadow-[0_18px_50px_rgba(0,26,67,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-[2rem] font-black tracking-[-0.06em] text-[#001a43]">Personal Information</h3>
                <p className="mt-1 text-[0.96rem] text-[#4f5d76]">Primary personal information and contact details for the provider.</p>
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-[#001a43] px-6 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,26,67,0.18)] transition hover:-translate-y-0.5"
              >
                Edit
              </button>
            </div>

            <div className="mt-8 space-y-0">
              {profileDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 border-t border-[#edf1f5] py-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-[220px] text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#67748d]">
                    {item.label}
                  </div>

                  <div className="flex flex-1 items-center justify-start gap-3 text-base font-medium text-[#001a43] md:justify-between">
                    <span className="flex items-center gap-2">
                      {item.flag ? <span>{item.flag}</span> : null}
                      {item.value}
                    </span>

                    {item.tag ? (
                      <span className="inline-flex items-center rounded-md border border-[#d8e2ff] bg-[#edf4ff] px-2.5 py-1 text-[11px] font-semibold text-[#1d4f9f]">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
