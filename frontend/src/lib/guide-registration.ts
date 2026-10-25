export const GUIDE_REGISTRATION_STORAGE_KEY = 'evolanka-guide-registration';
export const RENTAL_REGISTRATION_STORAGE_KEY = 'evolanka-rental-registration';

export type UploadedDocumentSummary = {
  id: string;
  name: string;
  size: number;
};

export type GuideRegistrationSummary = {
  reference: string;
  documents: UploadedDocumentSummary[];
};
