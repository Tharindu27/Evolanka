'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { rentalProviders, rentalProvinces, type RentalFleetIcon, type RentalProvider } from '@/data/rentals';

const PAGE_SIZE = 6;
const allDistricts = [...new Set(rentalProviders.map((provider) => provider.district))].sort();

export function VehicleIcon({ icon }: { icon: RentalFleetIcon }) {
  const vehicleShapes: Record<RentalFleetIcon, ReactNode> = {
    car: (
      <>
        <path d="m4 14 1.8-5.1A2 2 0 0 1 7.7 7.5h8.6a2 2 0 0 1 1.9 1.4L20 14v4h-2v-2H6v2H4z" />
        <path d="M4.5 13.5h15M7 11h.01M17 11h.01" />
      </>
    ),
    suv: (
      <>
        <path d="m3.5 14 1.8-5.5A2 2 0 0 1 7.2 7h9.3a2 2 0 0 1 1.9 1.4l2.1 5.6v4h-2v-2H5.5v2h-2z" />
        <path d="M4 13.5h16M7 10h10M7 11h.01M17 11h.01" />
      </>
    ),
    scooter: (
      <>
        <circle cx="7" cy="17" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="M9 17h5l2-6h3l1.5 4M14 17l-2-7H9m5 0h3m-8 0H7" />
      </>
    ),
    van: (
      <>
        <path d="M3 8h13a2 2 0 0 1 2 2v6H3zM18 11h2l2 3v2h-4z" />
        <path d="M6 16h.01M17 16h.01M4 11h12" />
      </>
    ),
    bus: (
      <>
        <path d="M5 5h14a2 2 0 0 1 2 2v10H3V7a2 2 0 0 1 2-2z" />
        <path d="M4 10h16M6 7.5h.01M10 7.5h.01M14 7.5h.01M18 7.5h.01M6 17v2m12-2v2" />
      </>
    ),
    electric: (
      <>
        <path d="m4 14 1.8-5.1A2 2 0 0 1 7.7 7.5h8.6a2 2 0 0 1 1.9 1.4L20 14v4h-2v-2H6v2H4z" />
        <path d="M4.5 13.5h15M13 8.5l-2 3h2l-2 3" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-fleet-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
      {vehicleShapes[icon]}
    </svg>
  );
}

function RentalCard({ provider }: { provider: RentalProvider }) {
  return (
    <article className="rental-provider-card">
      <div className="rental-card-image-wrap">
        <Image
          src={provider.image}
          alt={`${provider.name} rental fleet`}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="rental-card-image"
        />
        {provider.badge ? (
          <span className={`rental-provider-badge rental-provider-badge-${provider.badge.tone}`}>{provider.badge.label}</span>
        ) : null}
      </div>

      <div className="rental-provider-content">
        <div className="rental-provider-heading">
          <h2>{provider.name}</h2>
          <span className="rental-provider-rating" aria-label={`Rated ${provider.rating} out of 5`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-star-icon">
              <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" />
            </svg>
            {provider.rating.toFixed(1)}
          </span>
        </div>

        <p className="rental-provider-location">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-location-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
            <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
            <circle cx="12" cy="10" r="2.2" />
          </svg>
          {provider.location}
        </p>

        <p className="rental-provider-description">{provider.description}</p>

        <ul className="rental-fleet-list" aria-label={`${provider.name} fleet`}>
          {provider.fleet.map((item) => (
            <li key={item.label} className="rental-fleet-item">
              <VehicleIcon icon={item.icon} />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        {provider.profileAvailable ? (
          <Link href={`/rentals/${provider.id}`} className="rental-provider-action">
            View fleet
          </Link>
        ) : (
          <button
            type="button"
            className="rental-provider-action"
            disabled
            title="Provider fleet details are coming soon"
            aria-describedby="rental-booking-note"
          >
            {provider.actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}

export default function RentalDirectory() {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState(rentalProvinces[0]);
  const [district, setDistrict] = useState('All Districts');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [appliedProvince, setAppliedProvince] = useState(rentalProvinces[0]);
  const [appliedDistrict, setAppliedDistrict] = useState('All Districts');
  const [page, setPage] = useState(1);

  const districtOptions = useMemo(() => {
    const districts = province === 'All Provinces'
      ? allDistricts
      : [...new Set(rentalProviders.filter((provider) => provider.province === province).map((provider) => provider.district))].sort();

    return ['All Districts', ...districts];
  }, [province]);

  const filteredProviders = useMemo(() => {
    const normalizedQuery = appliedQuery.trim().toLowerCase();

    return rentalProviders.filter((provider) => {
      const matchesProvince = appliedProvince === 'All Provinces' || provider.province === appliedProvince;
      const matchesDistrict = appliedDistrict === 'All Districts' || provider.district === appliedDistrict;
      const matchesQuery =
        !normalizedQuery ||
        [provider.name, provider.location, provider.description, ...provider.fleet.map((item) => item.label)]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesProvince && matchesDistrict && matchesQuery;
    });
  }, [appliedDistrict, appliedProvince, appliedQuery]);

  const totalPages = Math.ceil(filteredProviders.length / PAGE_SIZE);
  const pageProviders = filteredProviders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const firstResult = filteredProviders.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(page * PAGE_SIZE, filteredProviders.length);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAppliedQuery(query);
    setAppliedProvince(province);
    setAppliedDistrict(district);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setProvince(rentalProvinces[0]);
    setDistrict('All Districts');
    setAppliedQuery('');
    setAppliedProvince(rentalProvinces[0]);
    setAppliedDistrict('All Districts');
    setPage(1);
  };

  return (
    <div className="rental-directory">
      <header className="rental-page-heading">
        <span className="rental-page-eyebrow">Explore Sri Lanka, your way</span>
        <h1>Rental vehicle services in Sri Lanka</h1>
        <p>
          Find a reliable fleet for every journey, from premium SUVs in the hill country to scooters along the coast.
        </p>
      </header>

      <form className="rental-filter-panel" onSubmit={handleSubmit}>
        <label className="rental-filter-field">
          <span className="rental-filter-label">Province</span>
          <select
            className="rental-filter-control"
            value={province}
            onChange={(event) => {
              setProvince(event.target.value);
              setDistrict('All Districts');
            }}
          >
            {rentalProvinces.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="rental-filter-field">
          <span className="rental-filter-label">District</span>
          <select className="rental-filter-control" value={district} onChange={(event) => setDistrict(event.target.value)}>
            {districtOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="rental-filter-field">
          <span className="rental-filter-label">Search by name</span>
          <span className="rental-search-field">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-search-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              className="rental-filter-control rental-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search service providers..."
            />
          </span>
        </label>

        <div className="rental-filter-actions">
          <button type="submit" className="rental-search-button">
            Search providers
          </button>
        </div>
      </form>

      <section className="rental-results-section" aria-label="Rental providers">
        <div className="rental-results-heading">
          <p aria-live="polite">
            Showing <strong>{firstResult}-{lastResult}</strong> of <strong>{filteredProviders.length}</strong>{' '}
            {filteredProviders.length === 1 ? 'provider' : 'providers'}
          </p>
          {appliedQuery || appliedProvince !== 'All Provinces' || appliedDistrict !== 'All Districts' ? (
            <button type="button" className="rental-clear-filters" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>

        {pageProviders.length > 0 ? (
          <div className="rental-provider-grid">
            {pageProviders.map((provider) => (
              <RentalCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="rental-empty-state">
            <span className="rental-empty-icon" aria-hidden="true">⌕</span>
            <h2>No rental providers found</h2>
            <p>Try another province, district, or provider name.</p>
            <button type="button" className="rental-empty-reset" onClick={clearFilters}>
              Show all providers
            </button>
          </div>
        )}

        <p className="rental-booking-note" id="rental-booking-note">
          Online booking and vehicle-level rates are not available yet. Confirm current vehicle details and availability directly with each provider.
        </p>

        {totalPages > 1 ? (
          <nav className="rental-pagination" aria-label="Rental providers pages">
            <button type="button" className="rental-page-arrow" onClick={() => setPage((current) => current - 1)} disabled={page === 1} aria-label="Previous page">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <div className="rental-page-numbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className="rental-page-number"
                  aria-current={page === pageNumber ? 'page' : undefined}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            <button type="button" className="rental-page-arrow" onClick={() => setPage((current) => current + 1)} disabled={page === totalPages} aria-label="Next page">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </nav>
        ) : null}
      </section>
    </div>
  );
}
