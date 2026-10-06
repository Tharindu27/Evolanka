import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import {
  ArrowLeftIcon,
  BankIcon,
  CameraIcon,
  FoodIcon,
  LeafIcon,
  MountainIcon,
  PlugIcon,
  SnowflakeIcon,
  StarIcon,
  UsersIcon,
  WifiIcon,
} from '@/components/guides/icons';
import BookingCard from '@/components/tour-guides/booking-card';
import { GuidePhoto } from '@/components/tour-guides/guide-card';
import { guideImages } from '@/data/tour-guide-images';
import { getGuide, type SpecialtyIcon, type VehicleFeatureIcon } from '@/data/tour-guides';
import { busyDatesFor, readFilters, todayKey } from '@/lib/tour-guides';

const specialtyIcons: Record<SpecialtyIcon, typeof BankIcon> = {
  heritage: BankIcon,
  camera: CameraIcon,
  wildlife: LeafIcon,
  hiking: MountainIcon,
  food: FoodIcon,
};

const vehicleIcons: Record<VehicleFeatureIcon, typeof BankIcon> = {
  ac: SnowflakeIcon,
  wifi: WifiIcon,
  seats: UsersIcon,
  charger: PlugIcon,
};

export async function generateMetadata({ params }: PageProps<'/tour-guides/[guideId]'>): Promise<Metadata> {
  const guide = getGuide((await params).guideId);
  if (!guide) return { title: 'Guide not found | EVOLANKA' };
  return { title: `${guide.name} | ${guide.title} - EVOLANKA`, description: guide.about[0] };
}

export default async function TourGuideDetailPage({ params, searchParams }: PageProps<'/tour-guides/[guideId]'>) {
  const guide = getGuide((await params).guideId);
  if (!guide) notFound();

  const today = todayKey();
  const filters = readFilters(await searchParams, today);
  const backQuery = new URLSearchParams();
  if (filters.start && filters.end) {
    backQuery.set('start', filters.start);
    backQuery.set('end', filters.end);
    backQuery.set('guests', filters.guests);
  }
  const backHref = `/tour-guides${backQuery.size ? `?${backQuery}` : ''}`;

  return (
    <div className="bg-[#f9f9ff] text-[#041b3c]">
      <Navbar active="/tour-guides" />

      <main className="pb-24 pt-[73px]">
        <section className="relative h-[450px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={guideImages.profileHero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041b3c]/80 via-[#041b3c]/20 to-transparent" />
          <div className="relative mx-auto flex h-full w-full max-w-[1280px] flex-col justify-end px-6 pb-12">
            <Link
              href={backHref}
              className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/20 p-3 pr-4 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/40 active:scale-95"
            >
              <ArrowLeftIcon />
              Back to Guides
            </Link>

            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-12">
              <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-4 border-[#f9f9ff] shadow-2xl md:h-56 md:w-56">
                <GuidePhoto name={guide.name} src={guide.portrait ?? guide.cardPhoto} textClass="text-6xl" />
              </div>
              <div className="pb-2 text-white">
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{guide.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <span className="text-lg text-[#dae2ff]">{guide.title}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#82f9be]" />
                  <span className="flex items-center gap-1 text-sm font-medium text-[#ffddb3]">
                    <StarIcon width={18} height={18} />
                    {guide.rating.toFixed(1)} ({guide.reviews} Reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-12 grid max-w-[1280px] gap-12 px-6 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section className="rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,82,204,0.08)]">
              <h2 className="mb-6 text-3xl font-semibold">Professional Profile</h2>
              {guide.about.map((paragraph, i) => (
                <p key={i} className={`text-lg leading-relaxed text-[#434654] ${i > 0 ? 'mt-6' : ''}`}>
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#737685]">Languages</h3>
                  <ul className="flex flex-wrap gap-2">
                    {guide.languages.map((l) => (
                      <li
                        key={l}
                        className="rounded-full border border-[#003d9b]/20 bg-[#0052cc]/10 px-4 py-1 text-sm font-medium text-[#003d9b]"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-[#737685]">Specialties</h3>
                  <ul className="flex flex-wrap gap-2">
                    {guide.specialties.map(({ label, icon }) => {
                      const Icon = specialtyIcons[icon];
                      return (
                        <li
                          key={label}
                          className="flex items-center gap-1 rounded-full border border-[#c3c6d6] bg-[#e8edff] px-4 py-1 text-sm font-medium"
                        >
                          <Icon width={18} height={18} /> {label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-3xl font-semibold">Specialized Regions</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {guide.regions.map((region) => (
                  <div key={region.name} className="group relative h-64 overflow-hidden rounded-2xl shadow-sm">
                    {region.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={region.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#003d9b] to-[#4f7be0] transition-transform duration-700 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-6 left-6 text-xl font-semibold text-white">{region.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {guide.vehicle && (
              <section className="rounded-2xl border border-[#c3c6d6]/50 bg-[#f1f3ff] p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-semibold">Transport</h2>
                  <span className="rounded-full bg-[#006844] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#72e9af]">
                    Included
                  </span>
                </div>
                <div className="flex flex-col gap-8 md:flex-row">
                  {guide.vehicle.image && (
                    <div className="h-64 overflow-hidden rounded-xl shadow-inner md:w-1/2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={guide.vehicle.image} alt={guide.vehicle.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className={`flex flex-col justify-center gap-6 ${guide.vehicle.image ? 'md:w-1/2' : 'w-full'}`}>
                    <div>
                      <h3 className="text-xl font-semibold">{guide.vehicle.name}</h3>
                      <p className="text-[#434654]">{guide.vehicle.details}</p>
                    </div>
                    <ul className="grid grid-cols-2 gap-3">
                      {guide.vehicle.features.map(({ label, icon }) => {
                        const Icon = vehicleIcons[icon];
                        return (
                          <li key={label} className="flex items-center gap-3">
                            <Icon className="text-[#003d9b]" />
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-4">
            <BookingCard
              guideName={guide.name}
              pricePerDay={guide.pricePerDay}
              busyDates={busyDatesFor(guide, today)}
              today={today}
              initialStart={filters.start}
              initialEnd={filters.end}
              initialGuests={filters.guests}
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
