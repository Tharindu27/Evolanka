import { api, getToken, type AuthRole } from './api';

export type LocationStatusCode = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type LocationSubmitterType = 'TOURIST' | 'PROVIDER' | 'ADMIN';

export type ApiLocationPhoto = { id: number; url: string; isCover: boolean };

export type ApiLocation = {
  id: number;
  name: string;
  province: string | null;
  district: string | null;
  nearestTown: string | null;
  categories: string[];
  description: string | null;
  highlights: string[];
  bestTime: string | null;
  openingDays: string | null;
  freeEntry: boolean;
  localAdultPrice: string | null;
  localChildPrice: string | null;
  foreignAdultPrice: string | null;
  foreignChildPrice: string | null;
  ticketNote: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  travelTips: string[];
  status: LocationStatusCode;
  rejectionReason: string | null;
  submitterType: LocationSubmitterType;
  submitterName: string;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedByName: string | null;
  photos: ApiLocationPhoto[];
};

// Everything except the images, which travel as files next to it.
export type LocationInput = {
  name: string;
  province?: string;
  district?: string;
  nearestTown?: string;
  categories?: string[];
  description?: string;
  highlights?: string[];
  bestTime?: string;
  openingDays?: string;
  freeEntry?: boolean;
  localAdultPrice?: string;
  localChildPrice?: string;
  foreignAdultPrice?: string;
  foreignChildPrice?: string;
  ticketNote?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  travelTips?: string[];
  draft?: boolean;
};

export const MAX_GALLERY_PHOTOS = 10;

export const buildLocationFormData = (input: LocationInput, cover: File | null | undefined, gallery: File[]) => {
  const body = new FormData();
  body.append('data', JSON.stringify(input));
  if (cover) body.append('cover', cover);
  gallery.forEach((file) => body.append('gallery', file));
  return body;
};

const authHeaders = (role: AuthRole) => ({ Authorization: `Bearer ${getToken(role)}` });

export const submitLocation = async (role: AuthRole, input: LocationInput, cover: File | null, gallery: File[]) =>
  (
    await api.post<ApiLocation>('/locations', buildLocationFormData(input, cover, gallery), {
      headers: { ...authHeaders(role), 'Content-Type': 'multipart/form-data' },
    })
  ).data;

export const fetchMyLocations = async (role: AuthRole) =>
  (await api.get<ApiLocation[]>('/locations/mine', { headers: authHeaders(role) })).data;

export const withdrawLocation = async (role: AuthRole, id: number) =>
  (await api.patch<ApiLocation>(`/locations/${id}/withdraw`, undefined, { headers: authHeaders(role) })).data;

export const deleteMyLocation = async (role: AuthRole, id: number) =>
  (await api.delete<{ message: string }>(`/locations/${id}`, { headers: authHeaders(role) })).data;
