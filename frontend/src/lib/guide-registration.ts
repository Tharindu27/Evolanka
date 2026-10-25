export const GUIDE_REGISTRATION_STORAGE_KEY = 'evolanka-guide-registration';
export const RENTAL_REGISTRATION_STORAGE_KEY = 'evolanka-rental-registration';
export const HOTEL_LISTING_STORAGE_KEY = 'evolanka-hotel-listing';

export type HotelListingSummary = {
  propertyName?: string;
  sessionId?: string;
  partnerId?: string;
  submittedAt?: string;
};

export function updateHotelListing(patch: HotelListingSummary) {
  const stored = sessionStorage.getItem(HOTEL_LISTING_STORAGE_KEY);
  const current = stored ? (JSON.parse(stored) as HotelListingSummary) : {};
  sessionStorage.setItem(HOTEL_LISTING_STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
}

export type UploadedDocumentSummary = {
  id: string;
  name: string;
  size: number;
};

export type GuideRegistrationSummary = {
  reference: string;
  documents: UploadedDocumentSummary[];
};
