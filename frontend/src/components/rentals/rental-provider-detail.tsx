'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import { VehicleIcon } from '@/components/rentals/rental-directory';
import type {
  RentalDeliveryOption,
  RentalDriverOption,
  RentalFleetIcon,
  RentalProvider,
  RentalTransmission,
  RentalVehicle,
  RentalVehicleCategory,
} from '@/data/rentals';

type RentalFilters = {
  categories: RentalVehicleCategory[];
  transmissions: RentalTransmission[];
  deliveryOptions: RentalDeliveryOption[];
  driverOptions: RentalDriverOption[];
  pickupDate: string;
  returnDate: string;
};

type RentalProviderDetailProps = {
  provider: RentalProvider;
  vehicles: RentalVehicle[];
};

const emptyFilters: RentalFilters = {
  categories: [],
  transmissions: [],
  deliveryOptions: [],
  driverOptions: [],
  pickupDate: '',
  returnDate: '',
};

const categoryOptions: { label: string; value: RentalVehicleCategory; icon: RentalFleetIcon }[] = [
  { label: 'Cars', value: 'car', icon: 'car' },
  { label: 'Motorbikes / Scooters', value: 'motorbike', icon: 'scooter' },
  { label: 'SUVs / Jeeps', value: 'suv', icon: 'suv' },
  { label: 'Vans', value: 'van', icon: 'van' },
];

const transmissionOptions: RentalTransmission[] = ['Automatic', 'Manual'];
const deliveryOptions: { label: string; value: RentalDeliveryOption }[] = [
  { label: 'Home Delivery', value: 'home' },
  { label: 'Pickup', value: 'pickup' },
];
const driverOptions: { label: string; value: RentalDriverOption }[] = [
  { label: 'Self Drive', value: 'self-drive' },
  { label: 'With Driver', value: 'with-driver' },
];

function toggleOption<T extends string>(options: T[], option: T): T[] {
  return options.includes(option)
    ? options.filter((item) => item !== option)
    : [...options, option];
}

function VehicleCard({ providerId, vehicle }: { providerId: string; vehicle: RentalVehicle }) {
  return (
    <article className="rental-vehicle-card">
      <div className="rental-vehicle-image-wrap">
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="rental-vehicle-image"
        />
        <span className="rental-vehicle-rating" aria-label={`Rated ${vehicle.rating} out of 5`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-star-icon">
            <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" />
          </svg>
          {vehicle.rating.toFixed(1)}
        </span>
        <Link
          href={`/rentals/${providerId}/book/${vehicle.id}`}
          className="rental-vehicle-book-button"
          aria-label={`Book ${vehicle.name}`}
        >
          Book Now
        </Link>
      </div>

      <div className="rental-vehicle-content">
        <h2>{vehicle.name}</h2>
        <div className="rental-vehicle-prices" aria-label={`Rates for ${vehicle.name}`}>
          <p>
            <span>Daily</span>
            <strong>Rs. {vehicle.dailyRate.toLocaleString('en-LK')}</strong>
          </p>
          <p>
            <span>Weekly</span>
            <strong>Rs. {vehicle.weeklyRate.toLocaleString('en-LK')}</strong>
          </p>
          <p>
            <span>Monthly</span>
            <strong>Rs. {vehicle.monthlyRate.toLocaleString('en-LK')}</strong>
          </p>
        </div>
        <ul className="rental-vehicle-features" aria-label={`${vehicle.name} details`}>
          <li>{vehicle.seats} Seats</li>
          <li>{vehicle.transmission}</li>
          <li>{vehicle.fuel}</li>
        </ul>
      </div>
    </article>
  );
}

function ProviderFleetOverview({ provider }: { provider: RentalProvider }) {
  return (
    <div className="rental-detail-layout rental-overview-layout">
      <aside className="rental-overview-provider">
        <div className="rental-overview-image">
          <Image
            src={provider.image}
            alt={`${provider.name} fleet`}
            fill
            sizes="(max-width: 760px) 100vw, 288px"
            className="rental-card-image"
          />
          {provider.badge ? (
            <span className={`rental-provider-badge rental-provider-badge-${provider.badge.tone}`}>
              {provider.badge.label}
            </span>
          ) : null}
        </div>
        <div className="rental-overview-provider-info">
          <span className="rental-provider-rating" aria-label={`Rated ${provider.rating} out of 5`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-star-icon">
              <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" />
            </svg>
            {provider.rating.toFixed(1)}
          </span>
          <p className="rental-provider-location">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-location-icon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
              <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
            {provider.location}
          </p>
        </div>
      </aside>

      <section className="rental-detail-main" aria-labelledby="rental-detail-title">
        <header className="rental-detail-heading">
          <p className="rental-detail-eyebrow">{provider.location}</p>
          <h1 id="rental-detail-title">Fleet of {provider.name}</h1>
          <p>{provider.description}</p>
        </header>

        <div className="rental-detail-results-heading">
          <p>Fleet categories listed by this provider</p>
        </div>

        <div className="rental-overview-fleet-grid">
          {provider.fleet.map((item) => (
            <article className="rental-overview-fleet-card" key={item.label}>
              <VehicleIcon icon={item.icon} />
              <h2>{item.label}</h2>
              <p>Ask the provider for available models and current rates.</p>
            </article>
          ))}
        </div>

        <p className="rental-detail-booking-note">
          Vehicle-specific models, photos, and rates have not been supplied yet. Contact the provider to confirm details and availability.
        </p>
      </section>
    </div>
  );
}

export default function RentalProviderDetail({ provider, vehicles }: RentalProviderDetailProps) {
  const [filters, setFilters] = useState<RentalFilters>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<RentalFilters>(emptyFilters);
  const [filterError, setFilterError] = useState('');

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter((vehicle) => {
        const matchesCategory =
          appliedFilters.categories.length === 0 ||
          appliedFilters.categories.includes(vehicle.category);
        const matchesTransmission =
          appliedFilters.transmissions.length === 0 ||
          appliedFilters.transmissions.includes(vehicle.transmission);
        const matchesDelivery =
          appliedFilters.deliveryOptions.length === 0 ||
          appliedFilters.deliveryOptions.some((option) => vehicle.deliveryOptions.includes(option));
        const matchesDriver =
          appliedFilters.driverOptions.length === 0 ||
          appliedFilters.driverOptions.some((option) => vehicle.driverOptions.includes(option));

        return matchesCategory && matchesTransmission && matchesDelivery && matchesDriver;
      }),
    [appliedFilters, vehicles],
  );

  const handleApplyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasPickupDate = Boolean(filters.pickupDate);
    const hasReturnDate = Boolean(filters.returnDate);

    if (hasPickupDate !== hasReturnDate) {
      setFilterError('Select both pickup and return dates, or leave both blank.');
      return;
    }

    const today = new Date();
    const todayString = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 10);

    if (hasPickupDate && filters.pickupDate < todayString) {
      setFilterError('The pickup date cannot be in the past.');
      return;
    }

    if (hasPickupDate && filters.returnDate <= filters.pickupDate) {
      setFilterError('The return date must be after the pickup date.');
      return;
    }

    setFilterError('');
    setAppliedFilters(filters);
  };

  const clearFilters = () => {
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setFilterError('');
  };

  return (
    <div className="rental-provider-detail">
      <div className="rental-detail-breadcrumb">
        <Link href="/rentals">Rentals</Link>
        <span aria-hidden="true">/</span>
        <span>{provider.name}</span>
      </div>

      {vehicles.length === 0 ? (
        <ProviderFleetOverview provider={provider} />
      ) : (
        <div className="rental-detail-layout">
          <aside className="rental-detail-sidebar" aria-label="Fleet filters">
            <form className="rental-detail-filter-panel" onSubmit={handleApplyFilters}>
              <div>
                <h2>Filters</h2>
                <p>Refine your search</p>
              </div>

              <fieldset className="rental-detail-filter-group">
                <legend>Rental Period</legend>
                <label className="rental-detail-date-field">
                  <span>Pickup Date</span>
                  <input
                    type="date"
                    value={filters.pickupDate}
                    onChange={(event) =>
                      setFilters((current) => ({ ...current, pickupDate: event.target.value }))
                    }
                  />
                </label>
                <label className="rental-detail-date-field">
                  <span>Return Date</span>
                  <input
                    type="date"
                    value={filters.returnDate}
                    onChange={(event) =>
                      setFilters((current) => ({ ...current, returnDate: event.target.value }))
                    }
                  />
                </label>
              </fieldset>

              <fieldset className="rental-detail-filter-group">
                <legend>Vehicle Type</legend>
                <div className="rental-detail-category-list">
                  {categoryOptions.map((option) => (
                    <label
                      className={`rental-detail-category ${filters.categories.includes(option.value) ? 'is-selected' : ''}`}
                      key={option.value}
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(option.value)}
                        onChange={() =>
                          setFilters((current) => ({
                            ...current,
                            categories: toggleOption(current.categories, option.value),
                          }))
                        }
                      />
                      <VehicleIcon icon={option.icon} />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="rental-detail-filter-group">
                <legend>Transmission</legend>
                <div className="rental-detail-toggle-grid">
                  {transmissionOptions.map((option) => {
                    const selected = filters.transmissions.includes(option);

                    return (
                      <button
                        type="button"
                        key={option}
                        className={selected ? 'is-selected' : ''}
                        aria-pressed={selected}
                        onClick={() =>
                          setFilters((current) => ({
                            ...current,
                            transmissions: toggleOption(current.transmissions, option),
                          }))
                        }
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="rental-detail-filter-group">
                <legend>Delivery Option</legend>
                {deliveryOptions.map((option) => (
                  <label className="rental-detail-check-option" key={option.value}>
                    <input
                      type="checkbox"
                      checked={filters.deliveryOptions.includes(option.value)}
                      onChange={() =>
                        setFilters((current) => ({
                          ...current,
                          deliveryOptions: toggleOption(current.deliveryOptions, option.value),
                        }))
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="rental-detail-filter-group">
                <legend>Driver Option</legend>
                {driverOptions.map((option) => (
                  <label className="rental-detail-check-option" key={option.value}>
                    <input
                      type="checkbox"
                      checked={filters.driverOptions.includes(option.value)}
                      onChange={() =>
                        setFilters((current) => ({
                          ...current,
                          driverOptions: toggleOption(current.driverOptions, option.value),
                        }))
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </fieldset>

              {filterError ? (
                <p className="rental-detail-filter-error" role="alert">
                  {filterError}
                </p>
              ) : null}

              <button type="submit" className="rental-detail-apply-button">
                Apply Filters
              </button>
              <button type="button" className="rental-detail-clear-button" onClick={clearFilters}>
                Clear filters
              </button>
            </form>
          </aside>

          <section className="rental-detail-main" aria-labelledby="rental-detail-title">
            <header className="rental-detail-heading">
              <p className="rental-detail-eyebrow">{provider.location}</p>
              <h1 id="rental-detail-title">Fleet of {provider.name}</h1>
              <p>{provider.description}</p>
            </header>

            <div className="rental-detail-results-heading">
              <p aria-live="polite">
                Showing <strong>{filteredVehicles.length}</strong> of <strong>{vehicles.length}</strong> vehicles
              </p>
              <span className="rental-detail-provider-rating" aria-label={`Provider rating ${provider.rating} out of 5`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="rental-star-icon">
                  <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z" />
                </svg>
                {provider.rating.toFixed(1)} provider rating
              </span>
            </div>

            {appliedFilters.pickupDate && appliedFilters.returnDate ? (
              <p className="rental-detail-period-note">
                Preferred dates: {appliedFilters.pickupDate} to {appliedFilters.returnDate}. Confirm availability with the provider.
              </p>
            ) : null}

            {filteredVehicles.length > 0 ? (
              <div className="rental-vehicle-grid">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} providerId={provider.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="rental-detail-empty-state">
                <h2>No vehicles match these filters</h2>
                <p>Try changing your vehicle, transmission, delivery, or driver options.</p>
                <button type="button" className="rental-detail-clear-button" onClick={clearFilters}>
                  Show all vehicles
                </button>
              </div>
            )}

            <p className="rental-detail-booking-note" id="rental-detail-booking-note">
              Online booking is not available yet. Rates and delivery or driver options are indicative; confirm current availability directly with the provider.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
