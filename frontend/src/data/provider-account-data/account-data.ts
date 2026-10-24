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
  { label: 'Home', href: '/provider/profile/home', icon: 'home' },
  { label: 'My account', href: '/provider/profile/account', icon: 'account' },
  { label: 'Services', href: '/provider/profile/services', icon: 'services' },
  { label: 'Listings', href: '/provider/profile/listings', icon: 'listings' },
  { label: 'My Post', href: '/provider/profile/post', icon: 'post' },
  { label: 'Settings', href: '/provider/profile/settings', icon: 'settings' },
];

export const accountProfile: AccountProfile = {
  name: 'Tharindu Dilshan',
  location: 'Colombo, Sri Lanka',
  email: 'tharindudilshan1064@gmail.com',
  isVerified: true,
};

export const profileDetails: ProfileDetail[] = [
  { label: 'Full Name', value: 'Tharindu Dilshan' },
  { label: 'Email Address', value: 'tharindudilshan1064@gmail.com' },
  { label: 'Mobile Number', value: '+94 77 123 4567', tag: 'Primary' },
  { label: 'Gender', value: 'Male'},
  { label: 'Address', value: 'No. 829, Colombo, Sri Lanka' },
  { label: 'Date of Birth', value: '12 October 2003' },
];
