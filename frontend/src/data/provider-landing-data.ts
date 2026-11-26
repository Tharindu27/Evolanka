import type { IconName } from '@/components/provider/landing/icons';

export type RoleLandingContent = {
  slug: 'hotel-info' | 'guide-info' | 'rental-info' | 'taxi-info';
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  audience: string[];
  stats: { value: string; label: string }[];
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsDescription: string;
  benefits: { icon: IconName; title: string; description: string }[];
  featuresEyebrow: string;
  featuresTitle: string;
  features: { title: string; description: string }[];
  highlight: { value: string; label: string; text: string };
  ctaTitle: string;
  ctaDescription: string;
  faqs: { question: string; answer: string }[];
};

const verificationFaq = {
  question: 'Do I need to be verified?',
  answer:
    'Yes. Providers submit their details and supporting documents, and our team reviews them so travelers can book with confidence.',
};

const startFaq = {
  question: 'How do I get started?',
  answer:
    'Register a provider account, sign in, then use "Add Your Services" to publish your first listing. You can update it any time from your dashboard.',
};

export const roleLandingContent: Record<RoleLandingContent['slug'], RoleLandingContent> = {
  'hotel-info': {
    slug: 'hotel-info',
    eyebrow: 'Welcome hotel owners',
    title: 'Fill more rooms with a premium digital presence.',
    subtitle:
      'Give your property the visibility it deserves and connect with travelers who value quality stays, warm hospitality and unforgettable Sri Lankan experiences.',
    image: '/images/provider/Main/hotel.png',
    imageAlt: 'Luxury hotel and villa property in Sri Lanka',
    audience: ['Boutique villas', 'Resorts', 'City hotels', 'Guesthouses', 'Homestays'],
    stats: [
      { value: '12%', label: 'Flat commission' },
      { value: '0', label: 'Listing or setup fees' },
      { value: 'Verified', label: 'Traveler audience' },
      { value: '24/7', label: 'Support coverage' },
    ],
    benefitsEyebrow: 'For hotel owners',
    benefitsTitle: 'Everything your property needs to feel worth booking.',
    benefitsDescription:
      'Pricing you can predict, reach you cannot buy elsewhere, and tools that keep your listing sharp.',
    benefits: [
      {
        icon: 'wallet',
        title: 'Transparent & fair pricing',
        description:
          'A low, fixed 12% commission on successful bookings. No listing fees, no setup costs and no hidden charges, ever.',
      },
      {
        icon: 'share',
        title: 'Promote via social media',
        description:
          'Share property posts, package deals and stories across EVOLANKA’s social channels and external networks to reach a wider audience.',
      },
      {
        icon: 'users',
        title: 'Reach verified travelers',
        description:
          'Showcase your hotel to guests actively searching for premium stays, curated experiences and memorable escapes.',
      },
    ],
    featuresEyebrow: 'Your hotel toolkit',
    featuresTitle: 'A cleaner way to grow your property business.',
    features: [
      { title: 'Dedicated listing management', description: 'Update rooms, rates, photos and amenities from one workspace.' },
      { title: 'High-visibility exposure', description: 'Be discovered by travelers browsing stays across the island.' },
      { title: 'Booking support & guest communication', description: 'Stay in touch with guests from enquiry to check-in.' },
      { title: 'Brand visibility on trusted channels', description: 'Build recognition through EVOLANKA’s social feed and community.' },
    ],
    highlight: {
      value: '12%',
      label: 'flat commission',
      text: 'You only pay when you earn. Zero listing fees and no surprises on your statements.',
    },
    ctaTitle: 'Make your property worth booking before the first guest arrives.',
    ctaDescription:
      'Whether you run a boutique villa, a premium resort or a city stay, EVOLANKA helps your brand become more visible, more trusted and easier to book.',
    faqs: [
      startFaq,
      {
        question: 'What does it cost to list my hotel?',
        answer: 'Listing is free. EVOLANKA charges a flat 12% commission only on successful bookings, with no setup costs or hidden fees.',
      },
      verificationFaq,
      {
        question: 'Can I promote my offers?',
        answer: 'Yes. You can share posts, special packages and stories through EVOLANKA’s social feed and external networks.',
      },
    ],
  },

  'guide-info': {
    slug: 'guide-info',
    eyebrow: 'Welcome tour guides',
    title: 'Bring your local expertise to travelers who want more than a map.',
    subtitle:
      'Showcase your storytelling, craft unforgettable itineraries and connect with travelers seeking authentic Sri Lankan experiences guided by real local knowledge.',
    image: '/images/provider/Main/tour-guide.png',
    imageAlt: 'Tour guide with travelers in Sri Lanka',
    audience: ['Cultural guides', 'Wildlife guides', 'Hiking guides', 'Heritage experts', 'Multilingual guides'],
    stats: [
      { value: 'Direct', label: 'Traveler connections' },
      { value: '0', label: 'Agency middleman fees' },
      { value: 'Smart', label: 'Availability calendar' },
      { value: '24/7', label: 'Support coverage' },
    ],
    benefitsEyebrow: 'For tour guides',
    benefitsTitle: 'Turn your local knowledge into memorable experiences.',
    benefitsDescription: 'Your stories, languages and routes deserve an audience. We bring the travelers to you.',
    benefits: [
      {
        icon: 'message',
        title: 'Direct traveler connections',
        description:
          'Connect directly with verified international and local tourists without paying middleman agency fees.',
      },
      {
        icon: 'badge',
        title: 'Showcase your expertise',
        description:
          'Build a professional profile highlighting your languages, specialisations and unique local itineraries.',
      },
      {
        icon: 'wallet',
        title: 'Transparent earnings',
        description: 'A fair, predictable commission model with no hidden charges.',
      },
    ],
    featuresEyebrow: 'Your guiding toolkit',
    featuresTitle: 'Everything you need to run a better guiding business.',
    features: [
      { title: 'Booking support & direct communication', description: 'Chat with travelers and confirm plans without third parties.' },
      { title: 'Social media cross-promotion', description: 'Share your tours and travel stories with a wider audience.' },
      { title: 'Smart calendar & availability', description: 'Block dates and manage tours so you are never double-booked.' },
      { title: 'Brand visibility on trusted channels', description: 'Grow your reputation through EVOLANKA’s community.' },
    ],
    highlight: {
      value: '0',
      label: 'agency middleman fees',
      text: 'Keep the relationship, and the earnings, with the travelers you guide.',
    },
    ctaTitle: 'Your island knowledge is worth sharing. Start guiding with EVOLANKA.',
    ctaDescription:
      'Create your guide profile, set your availability and let travelers find the experience only you can offer.',
    faqs: [
      startFaq,
      {
        question: 'Can I list the languages I speak?',
        answer: 'Yes. Your profile highlights your languages, specialisations and the itineraries you offer.',
      },
      verificationFaq,
      {
        question: 'How are payments handled?',
        answer: 'Commission is fixed and transparent, with no hidden charges, so you always know what you will earn.',
      },
    ],
  },

  'rental-info': {
    slug: 'rental-info',
    eyebrow: 'Welcome rental owners',
    title: 'Put your fleet on the road for travelers who value freedom.',
    subtitle:
      'Showcase your scooters, motorbikes and self-drive cars to verified tourists seeking seamless exploration across Sri Lanka.',
    image: '/images/provider/Main/rental.png',
    imageAlt: 'Rental vehicles available to travelers in Sri Lanka',
    audience: ['Scooters', 'Motorbikes', 'Self-drive cars', 'Tuk-tuks', 'Vans & SUVs'],
    stats: [
      { value: 'Direct', label: 'Rental bookings' },
      { value: 'Fixed', label: 'Transparent commission' },
      { value: 'Live', label: 'Fleet availability' },
      { value: '24/7', label: 'Support coverage' },
    ],
    benefitsEyebrow: 'For rental owners',
    benefitsTitle: 'Keep every vehicle earning, season after season.',
    benefitsDescription: 'List your fleet once and let travelers discover, compare and book it with confidence.',
    benefits: [
      {
        icon: 'key',
        title: 'Direct rental bookings',
        description: 'Connect directly with verified travelers without paying heavy agent commissions.',
      },
      {
        icon: 'car',
        title: 'Showcase your fleet',
        description:
          'Highlight vehicle models, insurance options, pickup and delivery choices, and transparent pricing.',
      },
      {
        icon: 'wallet',
        title: 'Transparent earnings',
        description: 'A fixed, fair commission model with zero hidden charges and instant payout tracking.',
      },
    ],
    featuresEyebrow: 'Your fleet toolkit',
    featuresTitle: 'Manage your fleet like a pro.',
    features: [
      { title: 'Dedicated fleet listing management', description: 'Add vehicles, rates, photos and rental terms in one place.' },
      { title: 'Social media cross-promotion', description: 'Promote your vehicles and offers beyond the marketplace.' },
      { title: 'Real-time fleet availability calendar', description: 'See which vehicles are booked, free or in service at a glance.' },
      { title: 'Verified guest reviews & security deposits', description: 'Build trust with ratings and protect your vehicles.' },
    ],
    highlight: {
      value: 'Live',
      label: 'fleet calendar',
      text: 'Always know which vehicles are out on the road and which are ready to rent.',
    },
    ctaTitle: 'Your vehicles are ready. Let travelers find them.',
    ctaDescription:
      'Join EVOLANKA to reach verified tourists looking for scooters, bikes and self-drive cars across the island.',
    faqs: [
      startFaq,
      {
        question: 'Which vehicles can I list?',
        answer: 'Scooters, motorbikes, self-drive cars and other rental vehicles, each with its own pricing and terms.',
      },
      verificationFaq,
      {
        question: 'Can I take a security deposit?',
        answer: 'Yes. You can set your rental terms and security deposit, and guests leave verified reviews after their trip.',
      },
    ],
  },

  'taxi-info': {
    slug: 'taxi-info',
    eyebrow: 'Welcome taxi owners',
    title: 'Get ride requests on demand, the way Sri Lanka’s riders like it.',
    subtitle:
      'Join an app-style taxi service where tourists and locals request a ride in a few taps. Go online, accept nearby requests and drive on your own schedule, all without paying commission.',
    image: '/images/provider/Main/taxi.png',
    imageAlt: 'Taxi and private vehicle transfer in Sri Lanka',
    audience: ['Tuk-tuks', 'Mini cars', 'Sedans', 'Vans', 'Airport transfers', 'Intercity rides'],
    stats: [
      { value: '0%', label: 'Commission taken' },
      { value: 'On-demand', label: 'Ride requests' },
      { value: 'Verified', label: 'Ratings & badges' },
      { value: '24/7', label: 'Support coverage' },
    ],
    benefitsEyebrow: 'For taxi owners & drivers',
    benefitsTitle: 'Ride-hailing convenience, with every fare staying yours.',
    benefitsDescription:
      'Riders book through EVOLANKA, you accept the trips that suit you, and the full fare goes to you.',
    benefits: [
      {
        icon: 'wallet',
        title: 'No commission, full fares',
        description:
          'EVOLANKA does not take a commission from your rides. The fare you agree with the rider is what you keep.',
      },
      {
        icon: 'clock',
        title: 'Go online, get requests',
        description:
          'Switch online when you are ready to drive and receive instant ride requests from riders near you. Go offline whenever you need a break.',
      },
      {
        icon: 'car',
        title: 'Every vehicle type welcome',
        description:
          'List your tuk-tuk, mini car, sedan or van with AC, luggage capacity and seats so riders can pick the right ride.',
      },
    ],
    featuresEyebrow: 'Your driver toolkit',
    featuresTitle: 'Everything you need to run rides smoothly.',
    features: [
      { title: 'Instant ride requests', description: 'See pickup, drop-off and trip details, then accept or decline in a tap.' },
      { title: 'Transparent fares', description: 'Riders see the fare up front, so there are no disputes at the end of the trip.' },
      { title: 'Vehicle & driver profile', description: 'Show your vehicle photos, plate details, AC and luggage space to build rider trust.' },
      { title: 'Ride history & earnings', description: 'Track completed trips and what you have earned in one place.' },
      { title: 'Verified ratings & driver badges', description: 'Earn trust with rider reviews and verified driver status.' },
      { title: 'Social media cross-promotion', description: 'Share your service to reach even more riders.' },
    ],
    highlight: {
      value: '0%',
      label: 'commission',
      text: 'Drive more, keep more. EVOLANKA does not deduct a commission from your taxi fares.',
    },
    ctaTitle: 'Start getting ride requests with EVOLANKA.',
    ctaDescription:
      'Register your vehicle, get verified and start accepting rides from travelers and locals across the island.',
    faqs: [
      startFaq,
      {
        question: 'How do I receive rides?',
        answer: 'Once you are verified, go online and ride requests from nearby riders reach you. Accept the ones that suit you.',
      },
      {
        question: 'Does EVOLANKA take a commission on taxi rides?',
        answer: 'No. EVOLANKA does not take a commission from taxi rides, so the fare stays with you.',
      },
      verificationFaq,
      {
        question: 'What types of vehicles can I register?',
        answer: 'Tuk-tuks, mini cars, sedans, vans and other passenger vehicles, with details such as AC, seats and luggage space.',
      },
    ],
  },
};
