'use client';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import { tourGuides, type TourGuide } from '@/data/tour-guides';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const guideTypes = ['All Types', 'National Guide', 'Chauffeur Guide', 'Site Specialist'];
const specializations = ['Any Speciality', 'Culture', 'Wildlife', 'Adventure', 'Food', 'History'];
const languages = ['Any Language', 'English', 'German', 'French', 'Sinhala', 'Mandarin'];
const districts = ['All Districts', 'Colombo', 'Kandy', 'Galle', 'Matara', 'Anuradhapura', 'Badulla'];

function matchesGuide(guide: TourGuide, query: string, guideType: string, specialization: string, language: string, district: string) {
  const searchableGuide = [
    guide.name,
    guide.title,
    guide.location,
    guide.guideType,
    guide.district,
    ...guide.specializations,
    ...guide.languages,
  ]
    .join(' ')
    .toLowerCase();

  const normalizedSpecialization = specialization === 'Culture' ? 'local culture' : specialization.toLowerCase();

  return (
    searchableGuide.includes(query.trim().toLowerCase()) &&
    (guideType === 'All Types' || guide.guideType === guideType) &&
    (specialization === 'Any Speciality' || guide.specializations.some((item) => item.toLowerCase() === normalizedSpecialization)) &&
    (language === 'Any Language' || guide.languages.includes(language)) &&
    (district === 'All Districts' || guide.district === district)
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="tour-guides-filter-label">{label}</span>
      <select className="tour-guides-control" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default function TourGuidesPage() {
  const [search, setSearch] = useState('');
  const [guideType, setGuideType] = useState(guideTypes[0]);
  const [specialization, setSpecialization] = useState(specializations[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [district, setDistrict] = useState(districts[0]);
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredGuides = useMemo(
    () => tourGuides.filter((guide) => matchesGuide(guide, search, guideType, specialization, language, district)),
    [search, guideType, specialization, language, district],
  );

  const resetFilters = () => {
    setSearch('');
    setGuideType(guideTypes[0]);
    setSpecialization(specializations[0]);
    setLanguage(languages[0]);
    setDistrict(districts[0]);
    setVisibleCount(3);
  };

  const updateFilter = (update: () => void) => {
    update();
    setVisibleCount(3);
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43]">
      <Navbar />

      <main className="mx-auto max-w-[1440px] px-4 pb-24 pt-24 sm:px-6 md:px-8 lg:px-12">
        <section className="tour-guides-hero">
          <div className="tour-guides-hero-image" />
          <div className="tour-guides-hero-overlay" />
          <div className="relative z-10 max-w-2xl p-7 sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#ffe28c] backdrop-blur">
              Explore with confidence
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">Find your local expert.</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Discover Sri Lanka through the insight of vetted local guides, from ancient cities and wild coastlines to the hill country.
            </p>
          </div>
        </section>

        <section className="tour-guides-filter-panel" aria-label="Find a tour guide">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="tour-guides-filter-label">Start date</span>
              <input className="tour-guides-control" type="date" aria-label="Trip start date" />
            </label>
            <label className="block">
              <span className="tour-guides-filter-label">End date</span>
              <input className="tour-guides-control" type="date" aria-label="Trip end date" />
            </label>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.55fr_repeat(4,minmax(0,1fr))]">
            <label className="block">
              <span className="tour-guides-filter-label">Search guides</span>
              <span className="relative block">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[#657089] stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  className="tour-guides-control tour-guides-control-search"
                  type="search"
                  value={search}
                  onChange={(event) => updateFilter(() => setSearch(event.target.value))}
                  placeholder="Name, destination, or interest"
                />
              </span>
            </label>
            <FilterSelect label="Guide type" value={guideType} onChange={(value) => updateFilter(() => setGuideType(value))} options={guideTypes} />
            <FilterSelect label="Specialization" value={specialization} onChange={(value) => updateFilter(() => setSpecialization(value))} options={specializations} />
            <FilterSelect label="Language" value={language} onChange={(value) => updateFilter(() => setLanguage(value))} options={languages} />
            <FilterSelect label="District" value={district} onChange={(value) => updateFilter(() => setDistrict(value))} options={districts} />
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#dce3f1] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#59637a]">
              {filteredGuides.length} {filteredGuides.length === 1 ? 'guide' : 'guides'} matched your search
            </p>
            <button type="button" className="text-sm font-bold text-[#001a43] underline decoration-[#c9a227] decoration-2 underline-offset-4 hover:text-[#c9a227]" onClick={resetFilters}>
              Clear filters
            </button>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="guide-results-heading">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b08d1f]">Vetted local knowledge</p>
              <h2 id="guide-results-heading" className="mt-2 text-3xl font-black tracking-tight text-[#001a43] sm:text-4xl">
                Meet your guide
              </h2>
            </div>
            <p className="text-sm text-[#59637a]">Profiles curated for memorable, responsible travel.</p>
          </div>

          {filteredGuides.length > 0 ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredGuides.slice(0, visibleCount).map((guide) => (
                  <article key={guide.id} className="tour-guide-card group">
                    <div className="relative h-64 overflow-hidden">
                      <div className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${guide.image}")` }} />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#001a43]/70 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-[#001a43] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                        {guide.guideType}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-black tracking-tight text-[#001a43]">{guide.name}</h3>
                          <p className="mt-1 text-sm font-semibold text-[#b08d1f]">{guide.title}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#fff7dc] px-2.5 py-1 text-sm font-bold text-[#735600]">
                          <span aria-hidden="true">★</span> {guide.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#4e5568]">
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-[#c9a227]">
                          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 10.25A3.25 3.25 0 1 1 12 5.75a3.25 3.25 0 0 1 0 6.5Z" />
                        </svg>
                        {guide.location}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-[#59637a]">{guide.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {[...guide.languages, ...guide.specializations].map((tag) => (
                          <span key={tag} className="rounded-full bg-[#edf3ff] px-3 py-1.5 text-xs font-bold text-[#40506f]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/tour-guides/${guide.id}`} className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-[#001a43] px-5 py-3 text-sm font-bold text-[#001a43] transition-colors hover:bg-[#001a43] hover:text-white">
                        View profile
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              {visibleCount < filteredGuides.length ? (
                <div className="mt-10 text-center">
                  <button type="button" className="btn-primary rounded-xl px-7 py-3 text-sm font-bold shadow-[0_10px_24px_rgba(0,26,67,0.18)] transition-transform hover:-translate-y-0.5" onClick={() => setVisibleCount((count) => count + 3)}>
                    Explore more guides
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#bdc9dd] bg-white px-6 py-16 text-center shadow-[0_14px_38px_rgba(0,26,67,0.06)]">
              <h3 className="text-xl font-black text-[#001a43]">No guides found just yet.</h3>
              <p className="mt-2 text-[#59637a]">Try clearing a filter or search for another destination.</p>
              <button type="button" onClick={resetFilters} className="btn-primary mt-6 rounded-xl px-5 py-3 text-sm font-bold">
                Reset search
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
