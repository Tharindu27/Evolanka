import PropertySelectionShell, { type PropertyOption } from '@/components/provider/hotel/property-selection-shell';

const base = '/provider/verification-main/hotel-verification';

const categories: PropertyOption[] = [
  {
    id: 'homes',
    icon: '🏡',
    title: 'Homes',
    description: 'Vacation homes, villas, and entire houses.',
    href: `${base}/types/home-types`,
  },
  {
    id: 'apartment',
    icon: '🏢',
    title: 'Apartment',
    description: 'Furnished apartments and flats rented as a whole unit.',
    href: `${base}/types/apartment-types`,
  },
  {
    id: 'hotels',
    icon: '🏨',
    title: 'Hotels',
    description: 'Hotels, B&Bs, guest houses, hostels, and resorts.',
    href: `${base}/types/hotels-types`,
  },
  {
    id: 'unique-places',
    icon: '🌲',
    title: 'Unique Places',
    description: 'Treehouses, cottages, boats, luxury tents, and more.',
    href: `${base}/types/unique-stay-types`,
  },
];

export default function PropertyCategoryPage() {
  return (
    <PropertySelectionShell
      title="What type of property are you listing?"
      subtitle="Choose the category that best describes your accommodation. You can configure individual room setups later."
      options={categories}
      ariaLabel="Property category"
      backHref="/provider/profile/services"
    />
  );
}
