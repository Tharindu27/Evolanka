export type FeedRole = 'tourist' | 'provider';
export type ProviderType = 'Hotel' | 'Rental Vehicle' | 'Tour Guide';

export type FeedAuthor = {
  id: string;
  name: string;
  role: FeedRole;
  providerType?: ProviderType;
  avatar?: string;
  country?: string;
};

export type FeedPost = {
  id: string;
  authorId: string;
  createdAt: string;
  postedAgo: string;
  isNew?: boolean;
  location: string;
  caption: string;
  images: string[];
  tags: string[];
  featuredService?: string;
  likes: number;
  comments: number;
};

export type StoryFrame = {
  image: string;
  caption: string;
  postedAgo: string;
};

export type FeedStory = {
  id: string;
  authorId: string;
  frames: StoryFrame[];
};

export const feedTabs: { value: FeedRole; label: string; placeholder: string }[] = [
  { value: 'tourist', label: 'Tourists', placeholder: 'Search tourist posts, places or tags' },
  { value: 'provider', label: 'Service Providers', placeholder: 'Search hotels, rentals, guides or places' },
];

export const feedAuthors: FeedAuthor[] = [
  { id: 'amaya', name: 'Amaya Perera', role: 'tourist', country: 'Sri Lanka' },
  { id: 'liam', name: 'Liam Carter', role: 'tourist', country: 'United Kingdom' },
  { id: 'sofia', name: 'Sofia Rossi', role: 'tourist', country: 'Italy' },
  { id: 'kenji', name: 'Kenji Tanaka', role: 'tourist', country: 'Japan' },
  { id: 'hiruni', name: 'Hiruni Jayasuriya', role: 'tourist', country: 'Sri Lanka' },
  { id: 'lanka-wheels', name: 'Lanka Wheels', role: 'provider', providerType: 'Rental Vehicle', avatar: '/images/rentals/providers/lanka-wheels.jpg' },
  { id: 'hill-country', name: 'Hill Country Expeditions', role: 'provider', providerType: 'Tour Guide', avatar: '/images/rentals/providers/hill-country-expeditions.jpg' },
  { id: 'kasun', name: 'Kasun Wijesinghe', role: 'provider', providerType: 'Tour Guide', avatar: '/images/guides/kasun-wijesinghe.jpg' },
  { id: 'ishani', name: 'Ishani De Silva', role: 'provider', providerType: 'Tour Guide', avatar: '/images/guides/ishani-de-silva.jpg' },
  { id: 'ella-villa', name: 'Ella Cloud Villa', role: 'provider', providerType: 'Hotel' },
  { id: 'ceylon-rent', name: 'Ceylon Rent a Car', role: 'provider', providerType: 'Rental Vehicle', avatar: '/images/rentals/providers/ceylon-rent-a-car.jpg' },
];

export const feedPosts: FeedPost[] = [
  {
    id: 'p1',
    authorId: 'lanka-wheels',
    createdAt: '2026-10-27T09:40:00',
    postedAgo: '20 min ago',
    isNew: true,
    location: 'Colombo',
    caption: 'Just added two brand new Toyota Aqua hybrids to our fleet. Airport pickup and island-wide drop-off now available.',
    images: ['/images/rentals/vehicles/lanka-wheels-toyota-aqua.jpg', '/images/rentals/vehicles/toyota-prius.jpg'],
    tags: ['VehicleRental', 'TravelAdvice'],
    featuredService: 'Toyota Aqua - Colombo',
    likes: 42,
    comments: 6,
  },
  {
    id: 'p2',
    authorId: 'amaya',
    createdAt: '2026-10-27T08:55:00',
    postedAgo: '1 hr ago',
    isNew: true,
    location: 'Sigiriya',
    caption: 'Climbed Lion Rock at sunrise and it was absolutely worth the early alarm. Go before 7am to beat the crowd and the heat.',
    images: ['/images/landing-page/sigiriya.png'],
    tags: ['Hiking', 'Culture'],
    likes: 128,
    comments: 14,
  },
  {
    id: 'p3',
    authorId: 'ella-villa',
    createdAt: '2026-10-27T07:30:00',
    postedAgo: '2 hrs ago',
    isNew: true,
    location: 'Ella',
    caption: 'Misty mornings with a view of Nine Arch Bridge from the terrace. Three rooms free this weekend.',
    images: ['/images/landing-page/sigiriya.png', '/images/landing-page/gallefort.png'],
    tags: ['HotelReview'],
    featuredService: 'Ella Cloud Villa',
    likes: 87,
    comments: 9,
  },
  {
    id: 'p4',
    authorId: 'liam',
    createdAt: '2026-10-26T18:10:00',
    postedAgo: '15 hrs ago',
    location: 'Mirissa Beach',
    caption: 'Whale watching out of Mirissa, saw two blue whales in under an hour! Book the early boat if you can.',
    images: ['/images/landing-page/mirissabeach.png'],
    tags: ['Wildlife', 'Beach'],
    likes: 214,
    comments: 31,
  },
  {
    id: 'p5',
    authorId: 'kasun',
    createdAt: '2026-10-26T12:00:00',
    postedAgo: '21 hrs ago',
    location: 'Galle Fort',
    caption: 'Walking tour through Galle Fort ramparts at golden hour. History, street food and the best sunset spot in the south.',
    images: ['/images/landing-page/gallefort.png'],
    tags: ['Culture', 'FoodTrail'],
    featuredService: 'Kasun Wijesinghe',
    likes: 96,
    comments: 12,
  },
  {
    id: 'p6',
    authorId: 'sofia',
    createdAt: '2026-10-25T16:20:00',
    postedAgo: '1 day ago',
    location: 'Galle Fort',
    caption: 'Coffee, colonial streets and the sea breeze. Galle Fort is the calm I needed after Colombo.',
    images: ['/images/landing-page/gallefort.png', '/images/landing-page/mirissabeach.png'],
    tags: ['Photography', 'Culture'],
    likes: 154,
    comments: 18,
  },
  {
    id: 'p7',
    authorId: 'ceylon-rent',
    createdAt: '2026-10-25T10:00:00',
    postedAgo: '1 day ago',
    location: 'Kandy',
    caption: 'Hill country ready: Mitsubishi Montero with a driver for the Kandy to Nuwara Eliya road. Weekly rates on request.',
    images: ['/images/rentals/vehicles/mitsubishi-montero.jpg'],
    tags: ['VehicleRental'],
    featuredService: 'Mitsubishi Montero',
    likes: 61,
    comments: 5,
  },
  {
    id: 'p8',
    authorId: 'kenji',
    createdAt: '2026-10-24T14:45:00',
    postedAgo: '3 days ago',
    location: 'Yala National Park',
    caption: 'Leopard sighting at Yala just before sunset. Our tracker knew exactly where to wait, patience paid off.',
    images: ['/images/landing-page/mirissabeach.png'],
    tags: ['Wildlife', 'Photography'],
    likes: 302,
    comments: 40,
  },
  {
    id: 'p9',
    authorId: 'hill-country',
    createdAt: '2026-10-23T09:00:00',
    postedAgo: '4 days ago',
    location: 'Nuwara Eliya',
    caption: 'Tea country trails with a local guide: Pedro Estate, Lover\'s Leap and the best scones in the hills.',
    images: ['/images/landing-page/sigiriya.png'],
    tags: ['Hiking', 'TravelAdvice'],
    featuredService: 'Hill Country Expeditions',
    likes: 73,
    comments: 8,
  },
  {
    id: 'p10',
    authorId: 'hiruni',
    createdAt: '2026-10-22T19:30:00',
    postedAgo: '5 days ago',
    location: 'Ella',
    caption: 'Nine Arch Bridge, a train at 9:30 and the whole valley in green. Take the Kandy to Ella train for the views.',
    images: ['/images/landing-page/sigiriya.png'],
    tags: ['Photography', 'TravelAdvice'],
    likes: 189,
    comments: 22,
  },
];

export const feedStories: FeedStory[] = [
  {
    id: 's-lanka-wheels',
    authorId: 'lanka-wheels',
    frames: [
      { image: '/images/rentals/vehicles/lanka-wheels-toyota-aqua.jpg', caption: 'New hybrids on the road today', postedAgo: '1 hr ago' },
      { image: '/images/rentals/vehicles/suzuki-swift.jpg', caption: 'Compact and perfect for city trips', postedAgo: '1 hr ago' },
    ],
  },
  {
    id: 's-amaya',
    authorId: 'amaya',
    frames: [
      { image: '/images/landing-page/sigiriya.png', caption: 'Sunrise at Sigiriya', postedAgo: '2 hrs ago' },
    ],
  },
  {
    id: 's-ella-villa',
    authorId: 'ella-villa',
    frames: [
      { image: '/images/landing-page/gallefort.png', caption: 'Breakfast with a view', postedAgo: '3 hrs ago' },
      { image: '/images/landing-page/sigiriya.png', caption: 'Rooms free this weekend', postedAgo: '3 hrs ago' },
    ],
  },
  {
    id: 's-liam',
    authorId: 'liam',
    frames: [
      { image: '/images/landing-page/mirissabeach.png', caption: 'Blue whales off Mirissa', postedAgo: '14 hrs ago' },
    ],
  },
  {
    id: 's-kasun',
    authorId: 'kasun',
    frames: [
      { image: '/images/landing-page/gallefort.png', caption: 'Galle Fort walking tour', postedAgo: '20 hrs ago' },
    ],
  },
  {
    id: 's-sofia',
    authorId: 'sofia',
    frames: [
      { image: '/images/landing-page/gallefort.png', caption: 'Coffee break in the fort', postedAgo: '22 hrs ago' },
      { image: '/images/landing-page/mirissabeach.png', caption: 'Sea breeze, finally', postedAgo: '22 hrs ago' },
    ],
  },
  {
    id: 's-ishani',
    authorId: 'ishani',
    frames: [
      { image: '/images/landing-page/sigiriya.png', caption: 'Custom cultural triangle tours', postedAgo: '1 day ago' },
    ],
  },
  {
    id: 's-kenji',
    authorId: 'kenji',
    frames: [
      { image: '/images/landing-page/mirissabeach.png', caption: 'Yala safari day', postedAgo: '1 day ago' },
    ],
  },
  {
    id: 's-hiruni',
    authorId: 'hiruni',
    frames: [
      { image: '/images/landing-page/gallefort.png', caption: 'Sunset walk on the ramparts', postedAgo: '1 day ago' },
    ],
  },
  {
    id: 's-ceylon-rent',
    authorId: 'ceylon-rent',
    frames: [
      { image: '/images/rentals/vehicles/suzuki-swift.jpg', caption: 'Weekend deals on compact cars', postedAgo: '1 day ago' },
    ],
  },
  {
    id: 's-hill-country',
    authorId: 'hill-country',
    frames: [
      { image: '/images/landing-page/sigiriya.png', caption: 'Hill country trek this Saturday', postedAgo: '2 days ago' },
    ],
  },
];

export const getFeedAuthor = (id: string) => feedAuthors.find((author) => author.id === id);
