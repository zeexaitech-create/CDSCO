// Lightweight demo auth — no backend. Session persists in localStorage.
// For production, replace with Lovable Cloud auth.

const SESSION_KEY = "cdsco_regai_session";

export type DemoSession = {
  officerId: string;
  name: string;
  designation: string;
  loginAt: string;
};

export const DEMO_CREDENTIALS = {
  officerId: "DC-OFFICER-001",
  password: "cdsco@2024",
};

export function signIn(officerId: string, password: string): DemoSession | null {
  // Accept the documented demo credentials, or any non-empty officer ID + password >= 6 chars
  const isDemo =
    officerId.trim().toUpperCase() === DEMO_CREDENTIALS.officerId &&
    password === DEMO_CREDENTIALS.password;
  const isValidShape = officerId.trim().length >= 4 && password.length >= 6;

  if (!isDemo && !isValidShape) return null;

  const session: DemoSession = {
    officerId: officerId.trim().toUpperCase(),
    name: isDemo ? "Dr. R. Sharma" : "Regulatory Officer",
    designation: "Deputy Drugs Controller",
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): DemoSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
