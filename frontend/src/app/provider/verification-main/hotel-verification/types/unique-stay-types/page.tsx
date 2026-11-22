import PropertySelectionShell, { type PropertyOption } from '@/components/provider/hotel/property-selection-shell';

const options: PropertyOption[] = [
  {
    id: 'treehouse',
    icon: '🌳',
    title: 'Treehouse',
    description: 'Elevated stays in a forest or nature setting.',
  },
  {
    id: 'houseboat',
    icon: '⛵',
    title: 'Houseboat',
    description: 'Floating accommodation on rivers or lakes.',
  },
  {
    id: 'luxury-tent',
    icon: '⛺',
    title: 'Luxury Tent / Glamping',
    description: 'Stylish tented stays with modern comforts.',
  },
  {
    id: 'cabin-chalet',
    icon: '🏔️',
    title: 'Cabin / Chalet',
    description: 'Rustic or mountain lodge-style homes.',
  },
  {
    id: 'farm-stay',
    icon: '🌾',
    title: 'Farm Stay',
    description: 'On agricultural land with local experiences.',
  },
];

export default function UniqueStayTypesPage() {
  return (
    <PropertySelectionShell
      title="Select Your Unique Stay Type"
      subtitle="Choose the category that best describes your accommodation. You can configure individual room setups later."
      options={options}
      ariaLabel="Unique stay type"
      backHref="/provider/verification-main/hotel-verification/property-category"
      nextHref="/provider/verification-main/hotel-verification/property-name?category=unique-stay"
    />
  );
}
