import type { ApiLocation } from '@/lib/locations-api';

export type ContributionStatus = 'verified' | 'pending' | 'draft' | 'rejected';
export type ContributionTab = 'All Contributions' | 'Verified / Approved' | 'Pending Review' | 'Rejected' | 'Draft';

export type Contribution = {
  id: string;
  locationId: number;
  location: ApiLocation;
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
  noteTone?: 'amber' | 'neutral' | 'red';
};

export type VerificationStep = {
  title: string;
  description: string;
};

export const contributionTabs: ContributionTab[] = ['All Contributions', 'Verified / Approved', 'Pending Review', 'Rejected', 'Draft'];

export const tabStatus: Record<Exclude<ContributionTab, 'All Contributions'>, ContributionStatus> = {
  'Verified / Approved': 'verified',
  'Pending Review': 'pending',
  Rejected: 'rejected',
  Draft: 'draft',
};

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
