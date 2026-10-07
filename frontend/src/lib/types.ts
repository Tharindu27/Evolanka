export type ListingStatus = "published" | "draft";

export interface Listing {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  status: ListingStatus;
  ratesFrom: number | null;
  capacity: string;
  rating: number | null;
  reviewCount: number;
  completeness: number;
}