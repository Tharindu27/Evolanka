import Footer from '@/components/common/footer';
import GuideBookingCard from '@/components/guides/guide-booking-card';
import Navbar from '@/components/common/navbar';
import { getTourGuide, getTourGuideProfile, guideHeroImage } from '@/data/tour-guides';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TourGuideProfilePage({ params }: PageProps<'/tour-guides/[guideId]'>) {
  const { guideId } = await params;
  const guide = getTourGuide(guideId);
  const profile = getTourGuideProfile(guideId);

  if (!guide || !profile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43]">
      <Navbar />
      <main className="mx-auto max-w-[1240px] px-4 pb-24 pt-28 sm:px-6 md:px-8">
        <section className="guide-profile-hero">
          <div className="guide-profile-hero-image" style={{ backgroundImage: `url("${guideHeroImage}")` }} />
          <div className="guide-profile-hero-overlay" />
          <div className="relative flex min-h-[inherit] flex-col justify-between gap-10 p-6 sm:p-10">
            <Link href="/tour-guides" className="btn-back self-start">
              <span aria-hidden="true" className="mr-2">←</span> Back to guides
            </Link>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-10">
              <div className="guide-profile-avatar" style={{ backgroundImage: `url("${guide.image}")` }} role="img" aria-label={guide.name} />
              <div className="pb-1 text-white">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur">{guide.guideType}</span>
                <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">{guide.name}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
                  <span className="text-[#dbe6ff]">{guide.title}</span>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
                  <span className="text-[#f2d675]">★ {guide.rating.toFixed(1)} ({guide.reviews} reviews)</span>
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" />
                  <span className="text-[#dbe6ff]">{guide.location}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <section className="guide-panel">
              <h2 className="guide-section-title">Professional profile</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-[#59637a]">
                <p className="font-semibold text-[#001a43]">{guide.summary}</p>
                {profile.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="mt-7 grid gap-5 border-t border-[#e4e9f3] pt-6 sm:grid-cols-3">
                <div>
                  <dt className="guide-label">Based in</dt>
                  <dd className="mt-1 font-bold text-[#001a43]">{guide.district}</dd>
                </div>
                <div>
                  <dt className="guide-label">Experience</dt>
                  <dd className="mt-1 font-bold text-[#001a43]">{guide.experience}</dd>
                </div>
                <div>
                  <dt className="guide-label">Guest rating</dt>
                  <dd className="mt-1 font-bold text-[#001a43]">★ {guide.rating.toFixed(1)} · {guide.reviews} reviews</dd>
                </div>
              </dl>
              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="guide-label mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map((language) => (
                      <span key={language} className="guide-chip">{language}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="guide-label mb-3">Specialities</h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.specializations.map((item) => (
                      <span key={item} className="guide-chip guide-chip-gold">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="guide-section-title mb-5">Specialised regions</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {profile.regions.map((region) => (
                  <div key={region.name} className="guide-region-card">
                    <div className="guide-region-image" style={{ backgroundImage: `url("${region.image}")` }} />
                    <span className="guide-region-name">{region.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="guide-panel-muted">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="guide-section-title">Premium transport</h2>
                <span className="rounded-full bg-[#e6f6ee] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#006844]">Included</span>
              </div>
              <div className="gap-6 md:flex">
                {profile.vehicle.image && (
                  <div
                    className="mb-5 h-56 rounded-2xl bg-cover bg-center shadow-inner md:mb-0 md:h-auto md:min-h-56 md:w-1/2"
                    style={{ backgroundImage: `url("${profile.vehicle.image}")` }}
                    role="img"
                    aria-label={profile.vehicle.name}
                  />
                )}
                <div className="md:flex-1">
                  <h3 className="text-lg font-extrabold text-[#001a43]">{profile.vehicle.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#59637a]">{profile.vehicle.details}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {profile.vehicle.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm font-bold text-[#001a43]">
                        <span aria-hidden="true" className="text-[#b08d1f]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <GuideBookingCard guideName={guide.name} pricePerDay={profile.pricePerDay} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
