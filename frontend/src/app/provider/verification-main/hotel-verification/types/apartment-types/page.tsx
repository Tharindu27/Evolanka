import PropertySelectionShell, { type PropertyOption } from '@/components/provider/hotel/property-selection-shell';

const options: PropertyOption[] = [
  {
    id: 'studio',
    icon: '🛋️',
    title: 'Studio Apartment',
    description: 'Single-room unit with kitchenette and bathroom.',
  },
  {
    id: 'multi-room-flat',
    icon: '🏢',
    title: '1BR / 2BR / Multi-room Flat',
    description: 'Fully furnished apartment with bedrooms, living area, and kitchen.',
  },
  {
    id: 'serviced',
    icon: '🛎️',
    title: 'Serviced Apartment',
    description: 'Hotel-style apartments with cleaning and services included.',
  },
  {
    id: 'penthouse',
    icon: '🌆',
    title: 'Penthouse',
    description: 'Top-floor luxury apartment with premium amenities.',
  },
];

export default function ApartmentTypesPage() {
  return (
    <PropertySelectionShell
      title="Select Your Apartment Type"
      subtitle="Choose the category that best describes your accommodation. You can configure individual room setups later."
      options={options}
      ariaLabel="Apartment type"
      backHref="/provider/verification-main/hotel-verification/property-category"
      nextHref="/provider/verification-main/hotel-verification/property-name?category=apartment"
    />
  );
}
