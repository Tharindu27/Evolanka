export type SuggestedHotel = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
};

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const suggestedHotels: SuggestedHotel[] = [
  {
    id: 'hotel-water-garden',
    name: 'Water Garden Sigiriya',
    image: '/images/landing-page/sigiriya.png',
    rating: 4.9,
    reviews: 184,
    distance: '4.2 km',
    price: '$240',
  },
  {
    id: 'hotel-aliya',
    name: 'Aliya Resort & Spa',
    image: '/images/landing-page/sigiriya.png',
    rating: 4.8,
    reviews: 212,
    distance: '7.8 km',
    price: '$145',
  },
  {
    id: 'hotel-village-chalets',
    name: 'Sigiriya Village Chalets',
    image: '/images/landing-page/sigiriya.png',
    rating: 4.6,
    reviews: 95,
    distance: '3.1 km',
    price: '$68',
  },
];

export const maxGalleryPhotos = 8;
