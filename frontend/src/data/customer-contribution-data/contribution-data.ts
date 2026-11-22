export type ContributionStatus = 'verified' | 'pending' | 'draft';
export type ContributionTab = 'All Contributions' | 'Verified / Approved' | 'Pending Review' | 'Draft';

export type Contribution = {
  id: string;
  title: string;
  image?: string;
  province: string;
  district: string;
  category: string;
  status: ContributionStatus;
  statusLabel: string;
  submittedLabel: string;
  submittedAt: string;
  views?: number;
  bookmarks?: number;
  note?: string;
  noteTone?: 'amber' | 'neutral';
};

export type VerificationStep = {
  title: string;
  description: string;
};

export const contributionTabs: ContributionTab[] = ['All Contributions', 'Verified / Approved', 'Pending Review', 'Draft'];

export const tabStatus: Record<Exclude<ContributionTab, 'All Contributions'>, ContributionStatus> = {
  'Verified / Approved': 'verified',
  'Pending Review': 'pending',
  Draft: 'draft',
};

export const contributions: Contribution[] = [
  {
    id: 'contribution-1',
    title: 'Pidurangala Sunrise Rock Sanctuary',
    image: '/images/landing-page/sigiriya.png',
    province: 'Central Province',
    district: 'Matale District',
    category: 'Heritage & Scenic View',
    status: 'verified',
    statusLabel: 'Verified & Live',
    submittedLabel: 'Submitted on 12 Sep 2025',
    submittedAt: '2025-09-12',
    views: 2400,
    bookmarks: 142,
  },
  {
    id: 'contribution-2',
    title: 'Ella Secret Waterfall & Nine Arch Viewpoint',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    province: 'Uva Province',
    district: 'Badulla District',
    category: 'Nature & Adventure',
    status: 'verified',
    statusLabel: 'Verified & Live',
    submittedLabel: 'Submitted on 28 Aug 2025',
    submittedAt: '2025-08-28',
    views: 5100,
    bookmarks: 380,
  },
  {
    id: 'contribution-3',
    title: 'Coconut Tree Hill Sunset Cove',
    image: '/images/landing-page/mirissabeach.png',
    province: 'Southern Province',
    district: 'Matara District',
    category: 'Beach & Coastal View',
    status: 'pending',
    statusLabel: 'Pending Review',
    submittedLabel: 'Submitted yesterday, 14 Oct 2025',
    submittedAt: '2025-10-14',
    note: 'Our travel curation team is currently reviewing your photos and coordinates.',
    noteTone: 'amber',
  },
  {
    id: 'contribution-4',
    title: "Haputale Lipton's Seat High Ridge",
    province: 'Uva Province',
    district: 'Badulla District',
    category: 'Scenic & Hill Country',
    status: 'pending',
    statusLabel: 'Pending Review',
    submittedLabel: 'Submitted on 11 Oct 2025',
    submittedAt: '2025-10-11',
    note: 'Our travel curation team is currently reviewing your photos and coordinates',
    noteTone: 'neutral',
  },
  {
    id: 'contribution-5',
    title: 'Galle Dutch Ramparts Sunset Bastion',
    image: '/images/landing-page/gallefort.png',
    province: 'Southern Province',
    district: 'Galle District',
    category: 'Heritage & History',
    status: 'verified',
    statusLabel: 'Verified & Live',
    submittedLabel: 'Submitted on 15 Jul 2025',
    submittedAt: '2025-07-15',
    views: 8900,
    bookmarks: 620,
  },
  {
    id: 'contribution-6',
    title: 'Adam’s Peak Night Trail Rest Stop',
    province: 'Sabaragamuwa Province',
    district: 'Ratnapura District',
    category: 'Pilgrimage & Hiking',
    status: 'draft',
    statusLabel: 'Draft',
    submittedLabel: 'Saved on 16 Oct 2025',
    submittedAt: '2025-10-16',
  },
];

export const verificationSteps: VerificationStep[] = [
  {
    title: 'Submit Coordinates & Photos',
    description: 'Provide GPS pins, road accessibility notes, parking availability, and original photography.',
  },
  {
    title: 'Admin Review (24-48h)',
    description: 'Our local scouts verify land permissions, cultural safety, environmental impact, and photo rights.',
  },
  {
    title: 'Goes Live Globally',
    description: 'Your gem is published on EVOLANKA Discover Locations, credited permanently to your profile.',
  },
];
