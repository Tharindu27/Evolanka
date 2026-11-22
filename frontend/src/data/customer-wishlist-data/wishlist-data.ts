export type WishlistCategory = 'Hotels & Resorts' | 'Tour Guides' | 'Rentals';
export type WishlistTab = 'All Saved' | WishlistCategory;

export type WishlistItem = {
  id: string;
  category: WishlistCategory;
  title: string;
  subtitle: string;
  image: string;
  tag: string;
  tagTone: 'dark' | 'green';
  rating: number;
  reviewCount: number;
  meta: string;
  metaIcon: 'location' | 'verified' | 'boat';
};

export const wishlistTabs: WishlistTab[] = ['All Saved', 'Hotels & Resorts', 'Tour Guides', 'Rentals'];

export const wishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    category: 'Hotels & Resorts',
    title: 'Amangalla Resort',
    subtitle: 'Southern Province, Sri Lanka',
    image: '/images/landing-page/gallefort.png',
    tag: 'Heritage Luxury',
    tagTone: 'dark',
    rating: 4.9,
    reviewCount: 128,
    meta: 'Galle Fort',
    metaIcon: 'location',
  },
  {
    id: 'wish-2',
    category: 'Hotels & Resorts',
    title: '98 Acres Resort & Spa',
    subtitle: 'Uva Province, Sri Lanka',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    tag: 'Luxury Eco-Resort',
    tagTone: 'dark',
    rating: 4.9,
    reviewCount: 310,
    meta: 'Ella',
    metaIcon: 'location',
  },
  {
    id: 'wish-3',
    category: 'Tour Guides',
    title: 'Chaminda Perera',
    subtitle: 'Sigiriya & Kandy Cultural Triangle',
    image: '/images/landing-page/sigiriya.png',
    tag: 'SLTDA Certified Guide',
    tagTone: 'green',
    rating: 5.0,
    reviewCount: 94,
    meta: 'Verified Pro',
    metaIcon: 'verified',
  },
  {
    id: 'wish-4',
    category: 'Rentals',
    title: 'Mirissa Whale Watching',
    subtitle: 'Mirissa Harbor, Southern Province',
    image: '/images/landing-page/mirissabeach.png',
    tag: 'Maritime Adventure',
    tagTone: 'dark',
    rating: 4.8,
    reviewCount: 88,
    meta: 'Mirissa',
    metaIcon: 'boat',
  },
];
