export type PostKind = 'Photos' | 'Videos' | 'Travel Logs';
export type PostTab = 'All Posts' | PostKind;

export type PostVisibility = 'Public' | 'Members Only' | 'Private / Draft';
export type PostServiceType = 'Hotel' | 'Rental Vehicle' | 'Tour Guide';

export type PostService = {
  type: PostServiceType;
  name: string;
};

export type PostItem = {
  id: string;
  kind: PostKind;
  postedAgo: string;
  location: string;
  caption: string;
  image: string;
  gallery?: string[];
  video?: string;
  tags?: string[];
  service?: PostService;
  visibility?: PostVisibility;
  likes: number;
  comments: number;
};

export type PostDraftMedia = {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
};

export type PostDraft = {
  caption: string;
  location: string;
  tags: string[];
  serviceType: PostServiceType;
  serviceName: string;
  visibility: PostVisibility;
  media: PostDraftMedia[];
};

export type PostStat = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type PostProfile = {
  coverImage: string;
  memberSince: string;
  followers: string;
  following: string;
  bio: string;
  stats: PostStat[];
};

export const postTabs: PostTab[] = ['All Posts', 'Photos', 'Videos', 'Travel Logs'];

export const postCategoryTags = [
  'TravelAdvice',
  'HotelReview',
  'Hiking',
  'VehicleRental',
  'Wildlife',
  'Beach',
  'Culture',
  'FoodTrail',
  'Photography',
];

export const postLocationSuggestions = ['Ella, Sri Lanka', 'Mirissa Beach', 'Sigiriya', 'Galle Fort', 'Kandy', 'Nuwara Eliya', 'Yala National Park'];

export const postServiceOptions: Record<PostServiceType, string[]> = {
  Hotel: ['Heritance Kandalama', 'Cinnamon Grand Colombo', 'Jetwing Lighthouse'],
  'Rental Vehicle': ['Toyota Aqua - Colombo', 'Suzuki Wagon R - Kandy', 'Toyota Hiace Van - Galle'],
  'Tour Guide': ['Nuwan Perera', 'Kasun Silva', 'Dilani Fernando'],
};

export const postVisibilityOptions: { value: PostVisibility; description: string }[] = [
  { value: 'Public', description: 'Visible to everyone' },
  { value: 'Members Only', description: 'Registered users only' },
  { value: 'Private / Draft', description: 'Only visible to you' },
];

export const emptyPostDraft: PostDraft = {
  caption: '',
  location: '',
  tags: [],
  serviceType: 'Hotel',
  serviceName: '',
  visibility: 'Public',
  media: [],
};

export const postProfile: PostProfile = {
  coverImage: '/images/landing-page/mirissabeach.png',
  memberSince: 'Oct 2024',
  followers: '1.8k',
  following: '340',
  bio: 'Passionate wildlife photographer and island explorer exploring hidden gems across Sri Lanka. 🇱🇰\n18/25 Districts visited.',
  stats: [
    { label: 'Photos', value: '142' },
    { label: 'Videos', value: '28' },
    { label: 'Expeditions', value: '12', highlight: true },
  ],
};

export const postItems: PostItem[] = [
  {
    id: 'post-1',
    kind: 'Photos',
    postedAgo: '2 days ago',
    location: 'Sigiriya Lion Rock Fortress',
    caption: 'Sunrise climb to Pidurangala with an incredible view of Sigiriya Rock Fortress. Best morning ever in the Central Province!',
    image: '/images/landing-page/sigiriya.png',
    likes: 245,
    comments: 42,
  },
  {
    id: 'post-2',
    kind: 'Photos',
    postedAgo: '1 week ago',
    location: 'Mirissa Beach & Coconut Tree Hill',
    caption: "Golden hour at Mirissa. Coconut trees swaying, calm turquoise waters. Sri Lanka's south coast is pure magic.",
    image: '/images/landing-page/mirissabeach.png',
    likes: 512,
    comments: 76,
  },
  {
    id: 'post-3',
    kind: 'Travel Logs',
    postedAgo: '3 weeks ago',
    location: 'Galle Dutch Fort',
    caption: 'Walking along the ancient ramparts of Galle Fort as dusk sets in. Colonial history meets the Indian Ocean.',
    image: '/images/landing-page/gallefort.png',
    likes: 380,
    comments: 29,
  },
];
