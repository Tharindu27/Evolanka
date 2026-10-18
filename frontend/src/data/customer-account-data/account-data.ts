export type NavigationItem = {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
  badge?: number;
};

export type ProfileDetail = {
  label: string;
  value: string;
  tag?: string;
  flag?: string;
};

export type AccountProfile = {
  name: string;
  location: string;
  email: string;
  isVerified: boolean;
};

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'My account', href: '/customer/profile/account', icon: 'account' },
  { label: 'Bookings', href: '/customer/profile/bookings', icon: 'bookings' },
  { label: 'Wishlist', href: '/customer/profile/wishlist', icon: 'wishlist' },
  { label: 'My Post', href: '/customer/profile/my-post', icon: 'post' },
  { label: 'My Itinerary', href: '/customer/profile/itinerary', icon: 'itinerary' },
  { label: 'My Contributions', href: '/customer/profile/contributions', icon: 'contribution' },
  { label: 'Settings', href: '/customer/profile/settings', icon: 'settings' },
];

export const accountProfile: AccountProfile = {
  name: 'Tharindu Dilshan',
  location: 'Colombo, Sri Lanka',
  email: 'tharindudilshan1064@gmail.com',
  isVerified: true,
};

export const profileDetails: ProfileDetail[] = [
  { label: 'First Name', value: 'Tharindu' },
  { label: 'Last Name', value: 'Dilshan' },
  { label: 'Email Address', value: 'tharindudilshan1064@gmail.com' },
  { label: 'Mobile Number', value: '+94 77 123 4567', tag: 'Primary' },
  { label: 'Country / Nationality', value: 'Sri Lanka', flag: '🇱🇰' },
  { label: 'Passport / NIC Number', value: 'N8291042' },
  { label: 'Date of Birth', value: '12 October 2003' },
  { label: 'Preferred Language', value: 'English (US), Sinhala' },
];
