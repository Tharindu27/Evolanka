import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export type AuthRole = 'tourist' | 'provider';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: AuthRole;
  // Undefined until the profile has been fetched once; null means no picture.
  profilePicture?: string | null;
};

type AuthResponse = { token: string; user: AuthUser };

// Registration details; gender, country, passportNumber and nic exist for tourists only.
export type AuthProfile = AuthUser & {
  mobileNumber: string;
  profilePicture: string | null;
  gender?: string;
  country?: string;
  passportNumber?: string | null;
  nic?: string | null;
};

const tokenKey = (role: AuthRole) => `evolanka-token-${role}`;
const userKey = (role: AuthRole) => `evolanka-user-${role}`;

export const getToken = (role: AuthRole) =>
  typeof window === 'undefined' ? null : localStorage.getItem(tokenKey(role));

export const getStoredUser = (role: AuthRole): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem(userKey(role)) ?? 'null');
  } catch {
    return null;
  }
};

export const AUTH_CHANGE_EVENT = 'evolanka-auth-change';

export const logout = (role: AuthRole) => {
  localStorage.removeItem(tokenKey(role));
  localStorage.removeItem(userKey(role));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

const saveSession = ({ token, user }: AuthResponse) => {
  localStorage.setItem(tokenKey(user.role), token);
  localStorage.setItem(userKey(user.role), JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  return user;
};

// Turns a failed request into a message that is safe to show in the UI.
export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Cannot reach the server. Please try again.';
    const message = error.response.data?.message;
    if (Array.isArray(message)) return message[0];
    if (typeof message === 'string') return message;
  }
  return 'Something went wrong. Please try again.';
};

export type TouristRegisterInput = {
  name: string;
  email: string;
  gender: string;
  country: string;
  mobileNumber: string;
  password: string;
};

export type ProviderRegisterInput = {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
};

export type LoginInput = { email: string; password: string };

export const registerTourist = async (input: TouristRegisterInput) =>
  saveSession((await api.post<AuthResponse>('/auth/tourist/register', input)).data);

export const registerProvider = async (input: ProviderRegisterInput) =>
  saveSession((await api.post<AuthResponse>('/auth/provider/register', input)).data);

export const loginTourist = async (input: LoginInput) =>
  saveSession((await api.post<AuthResponse>('/auth/tourist/login', input)).data);

export const loginProvider = async (input: LoginInput) =>
  saveSession((await api.post<AuthResponse>('/auth/provider/login', input)).data);

export const loginTouristWithGoogle = async (accessToken: string) =>
  saveSession((await api.post<AuthResponse>('/auth/tourist/google', { accessToken })).data);

export const loginTouristWithApple = async (input: { idToken: string; name?: string }) =>
  saveSession((await api.post<AuthResponse>('/auth/tourist/apple', input)).data);

// Keeps the cached name and picture (used by navbars) in step with the saved profile.
const syncStoredUser = (role: AuthRole, profile: AuthProfile) => {
  const stored = getStoredUser(role);
  if (!stored || (stored.name === profile.name && stored.profilePicture === profile.profilePicture)) return;
  localStorage.setItem(
    userKey(role),
    JSON.stringify({ ...stored, name: profile.name, profilePicture: profile.profilePicture }),
  );
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const fetchMe = async (role: AuthRole) => {
  const { data } = await api.get<AuthProfile>('/auth/me', { headers: { Authorization: `Bearer ${getToken(role)}` } });
  syncStoredUser(role, data);
  return data;
};

export const changePassword = async (role: AuthRole, input: { currentPassword: string; newPassword: string }) =>
  (await api.patch<{ message: string }>('/auth/password', input, { headers: { Authorization: `Bearer ${getToken(role)}` } })).data;

// Email is intentionally missing: it cannot be changed. gender, country, passportNumber and nic are tourist-only.
export type ProfileUpdate = Partial<{
  name: string;
  mobileNumber: string;
  gender: string;
  country: string;
  passportNumber: string;
  nic: string;
}>;

export const updateProfile = async (role: AuthRole, input: ProfileUpdate) => {
  const { data } = await api.patch<AuthProfile>(`/auth/${role}/profile`, input, {
    headers: { Authorization: `Bearer ${getToken(role)}` },
  });
  syncStoredUser(role, data);
  return data;
};

// The backend stores the image on Cloudinary and saves its URL as the profile picture.
export const uploadProfilePicture = async (role: AuthRole, file: File) => {
  const body = new FormData();
  body.append('file', file);
  const { data } = await api.post<AuthProfile>('/auth/profile/picture', body, {
    headers: { Authorization: `Bearer ${getToken(role)}`, 'Content-Type': 'multipart/form-data' },
  });
  syncStoredUser(role, data);
  return data;
};