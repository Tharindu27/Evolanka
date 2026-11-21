import axios from 'axios';
import { api } from './api';
import { buildLocationFormData, type ApiLocation, type LocationInput } from './locations-api';

export type AdminRoleCode = 'SUPER_ADMIN' | 'CONTENT_MODERATOR' | 'SUPPORT_AGENT' | 'FINANCE_MANAGER';

export type AdminAccount = {
  id: number;
  name: string;
  email: string;
  role: AdminRoleCode;
  // True for the built-in first-run account, which is retired once a Super Admin is added.
  isDefaultAccount: boolean;
};

export const adminRoleLabels: Record<AdminRoleCode, string> = {
  SUPER_ADMIN: 'Super Admin',
  CONTENT_MODERATOR: 'Content Moderator',
  SUPPORT_AGENT: 'Support Agent',
  FINANCE_MANAGER: 'Finance Manager',
};

export const adminRoleCodes = Object.keys(adminRoleLabels) as AdminRoleCode[];

const TOKEN_KEY = 'evolanka-token-admin';
const NOTICE_KEY = 'evolanka-admin-login-notice';
export const ADMIN_SESSION_EXPIRED_EVENT = 'evolanka-admin-session-expired';
const LOGIN_PATH = '/admin/auth/login';

// The admin token lives in sessionStorage so it is dropped when the browser tab is closed.
export const getAdminToken = () =>
  typeof window === 'undefined' ? null : sessionStorage.getItem(TOKEN_KEY);

export const clearAdminSession = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

// A one-off message shown on the sign-in page (for example after the default account is retired).
export const setAdminLoginNotice = (message: string) => sessionStorage.setItem(NOTICE_KEY, message);

export const takeAdminLoginNotice = () => {
  const message = sessionStorage.getItem(NOTICE_KEY);
  sessionStorage.removeItem(NOTICE_KEY);
  return message ?? '';
};

const adminApi = axios.create({
  baseURL: api.defaults.baseURL,
  headers: { 'Content-Type': 'application/json' },
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

adminApi.interceptors.response.use(undefined, (error: unknown) => {
  if (
    axios.isAxiosError(error) &&
    error.response?.status === 401 &&
    error.config?.url !== LOGIN_PATH &&
    getAdminToken()
  ) {
    clearAdminSession();
    window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT));
  }
  return Promise.reject(error);
});

export const adminLogin = async (input: { email: string; password: string }) => {
  const { data } = await adminApi.post<{ token: string; admin: AdminAccount }>(LOGIN_PATH, input);
  sessionStorage.setItem(TOKEN_KEY, data.token);
  return data.admin;
};

export const fetchCurrentAdmin = async () => (await adminApi.get<AdminAccount>('/admin/auth/me')).data;

export const changeAdminPassword = async (input: { currentPassword: string; newPassword: string }) =>
  (await adminApi.patch<{ message: string }>('/admin/auth/password', input)).data;

export const fetchAdmins = async () => (await adminApi.get<AdminAccount[]>('/admin/admins')).data;

export const createAdmin = async (input: { email: string; role: AdminRoleCode }) =>
  (await adminApi.post<{ admin: AdminAccount; defaultAccountRetired: boolean }>('/admin/admins', input)).data;

export const updateAdminRole = async (id: number, role: AdminRoleCode) =>
  (await adminApi.patch<AdminAccount>(`/admin/admins/${id}/role`, { role })).data;

export const removeAdmin = async (id: number) => (await adminApi.delete<{ message: string }>(`/admin/admins/${id}`)).data;

export type LocationDecision = { location: ApiLocation; emailSent: boolean | null; recipientEmail: string | null };

export const fetchAdminLocations = async () => (await adminApi.get<ApiLocation[]>('/admin/locations')).data;

// Admin locations go live immediately; the first photo is the cover.
export const createAdminLocation = async (input: LocationInput, photos: File[]) =>
  (
    await adminApi.post<ApiLocation>('/admin/locations', buildLocationFormData(input, photos[0], photos.slice(1)), {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  ).data;

export const approveLocation = async (id: number) =>
  (await adminApi.patch<LocationDecision>(`/admin/locations/${id}/approve`)).data;

export const rejectLocation = async (id: number, reason?: string) =>
  (await adminApi.patch<LocationDecision>(`/admin/locations/${id}/reject`, { reason })).data;

// Undoes an approval so the location goes back to Pending.
export const reviseLocation = async (id: number) =>
  (await adminApi.patch<{ location: ApiLocation }>(`/admin/locations/${id}/revise`)).data;
