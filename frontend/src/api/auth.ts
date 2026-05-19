import { api } from "./client";

export type AuthUser = {
  id: number;
  email: string;
  nombre?: string | null;
  apellido?: string | null;
};

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = {
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
};

const LS_TOKEN_KEY = "token";
const LS_USER_KEY  = "authUser";

export function setToken(token: string) {
  localStorage.setItem(LS_TOKEN_KEY, token);
}
export function getToken(): string | null {
  return localStorage.getItem(LS_TOKEN_KEY);
}
export function clearToken() {
  localStorage.removeItem(LS_TOKEN_KEY);
}
export function setStoredUser(u: AuthUser | null) {
  if (!u) localStorage.removeItem(LS_USER_KEY);
  else localStorage.setItem(LS_USER_KEY, JSON.stringify(u));
}
export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(LS_USER_KEY);
  try { return raw ? (JSON.parse(raw) as AuthUser) : null; } catch { return null; }
}

export function decodeToken(token: string): { userId?: number; email?: string } {
  try {
    const [, payloadB64] = token.split(".");
    const json = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch { return {}; }
}

export async function apiLogin(payload: LoginPayload) {
  const { data } = await api.post("/api/auth/login", payload);
  return data as { token: string; user?: AuthUser };
}

export async function apiRegister(payload: RegisterPayload) {
  const { data } = await api.post("/api/auth/register", payload);
  return data as { token: string; user?: AuthUser };
}
