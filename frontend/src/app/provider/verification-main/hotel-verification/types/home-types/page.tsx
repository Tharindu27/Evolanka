import PropertySelectionShell, { type PropertyOption } from '@/components/provider/hotel/property-selection-shell';

const options: PropertyOption[] = [
  {
    id: 'entire-house',
    icon: '🏠',
    title: 'Entire House',
    description: 'Fully private house with a separate entrance.',
  },
  {
    id: 'villa',
    icon: '🏡',
    title: 'Villa',
    description: 'Luxury vacation home with stylish decor and local character.',
  },
  {
    id: 'bungalow',
    icon: '🌴',
    title: 'Bungalow',
    description: 'Freestanding unit, often tropical or countryside.',
  },
  {
    id: 'cottage',
    icon: '🛖',
    title: 'Cottage',
    description: 'Small, cozy vacation home, often rural or traditional.',
  },
];

export default function HomeTypesPage() {
  return (
    <PropertySelectionShell
      title="Select Your Home Type"
      subtitle="Choose the category that best describes your accommodation. You can configure individual room setups later."
      options={options}
      ariaLabel="Home type"
      backHref="/provider/verification-main/hotel-verification/property-category"
      nextHref="/provider/verification-main/hotel-verification/property-name?category=home"
    />
  );
}
