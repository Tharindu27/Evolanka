export type DiscoveryCard = {
  id: string;
  title: string;
  district: string;
  description: string;
  image: string;
};

export const discoveryCards: DiscoveryCard[] = [
  {
    id: 'sigiriya-lion-rock',
    title: 'Sigiriya Lion Rock',
    district: 'Matale',
    description: 'Ancient rock fortress and palace ruins surrounded by gardens and reservoirs.',
    image: '/images/landing-page/sigiriya.png',
  },
  {
    id: 'mirissa-beach',
    title: 'Mirissa Beach',
    district: 'Matara',
    description: 'Pristine beaches, whale watching, and vibrant sunset views on the southern coast.',
    image: '/images/landing-page/mirissabeach.png',
  },
  {
    id: 'galle-fort',
    title: 'Galle Fort',
    district: 'Galle',
    description: 'UNESCO World Heritage site featuring colonial architecture and ocean views.',
    image: '/images/landing-page/gallefort.png',
  },
];
