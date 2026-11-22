import PropertySelectionShell, { type PropertyOption } from '@/components/provider/hotel/property-selection-shell';

const options: PropertyOption[] = [
  {
    id: 'hotel',
    icon: '🏨',
    title: 'Hotel',
    description: 'Standard lodging with multiple room types & services.',
  },
  {
    id: 'resort',
    icon: '🏝️',
    title: 'Resort',
    description: 'Full-service property with leisure facilities (pool, spa, activities).',
  },
  {
    id: 'guest-house',
    icon: '🏠',
    title: 'Guest House',
    description: 'Small, stylish hotels with personalized experiences.',
  },
  {
    id: 'hostel',
    icon: '🛏️',
    title: 'Hostel',
    description: 'Budget stays with shared dormitories and common areas.',
  },
  {
    id: 'boutique-hotel',
    icon: '✨',
    title: 'Boutique Hotel',
    description: 'Unique design-focused small hotels with personalized service.',
  },
  {
    id: 'bed-and-breakfast',
    icon: '🥐',
    title: 'Bed & Breakfast',
    description: 'Overnight stay with breakfast included.',
  },
];

export default function HotelTypesPage() {
  return (
    <PropertySelectionShell
      title="Select your hotel type"
      subtitle="Choose the category that best describes your accommodation. You can configure individual room setups later."
      options={options}
      ariaLabel="Hotel type"
      backHref="/provider/verification-main/hotel-verification/property-category"
      nextHref="/provider/verification-main/hotel-verification/property-name?category=hotel"
    />
  );
}
