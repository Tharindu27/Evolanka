export type Story = {
  name: string;
  user: string;
  location: string;
  caption: string;
  time: string;
  profileImage: string;
  postImage: string;
};

export const travelerStories: Story[] = [
  {
    name: 'Esha Perera',
    user: '@ella_explorer',
    location: 'Ella, Sri Lanka',
    caption:
      "Waking up to this view at the Nine Arch Bridge was a dream come true. The mist rolling over the tea plantations is something I'll never forget.",
    time: '2 hours ago',
    profileImage: 'https://i.pravatar.cc/120?img=32',
    postImage: '/images/landing-page/sigiriya.png',
  },
  {
    name: 'Sahan Jayasinghe',
    user: '@sun_lover_99',
    location: 'Mirissa Beach',
    caption:
      "Golden hour in Mirissa. The waves are perfect and the vibes are even better. If you haven't been to the south coast yet, what are you waiting for?",
    time: '5 hours ago',
    profileImage: 'https://i.pravatar.cc/120?img=12',
    postImage: '/images/landing-page/mirissabeach.png',
  },
  {
    name: 'Ahan Fernando',
    user: '@ancient_hunter',
    location: 'Sigiriya',
    caption:
      "Conquered the Lion Rock this morning. 1,200 steps later and the view is absolutely worth it. Sri Lanka's history is mind-blowing.",
    time: 'Yesterday',
    profileImage: 'https://i.pravatar.cc/120?img=15',
    postImage: '/images/landing-page/sigiriya.png',
  },
];
