import { samplePortfolio } from '@/data/samplePortfolio';

const API_BASE = (() => {
  if (typeof window === 'undefined') {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
  }

  const hostname = window.location.hostname;

  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0';

  if (isLocalhost) {
    return 'http://localhost:3001/api';
  }

  return import.meta.env.VITE_API_BASE_URL;
})();

function normalizePortfolio(portfolio: unknown): any {
  if (!portfolio || typeof portfolio !== 'object') {
    return samplePortfolio;
  }

  const p = portfolio as Record<string, unknown>;

  const source = p.data && typeof p.data === 'object' ? (p.data as Record<string, unknown>) : p;

  return {
    ...samplePortfolio,
    ...source,
    personal: source.personal && typeof source.personal === 'object' ? (source.personal as Record<string, unknown>) : samplePortfolio.personal,
    about: source.about && typeof source.about === 'object' ? (source.about as Record<string, unknown>) : samplePortfolio.about,
    skills: Array.isArray(source.skills) ? (source.skills as unknown[]) : samplePortfolio.skills,
    projects: Array.isArray(source.projects) ? (source.projects as unknown[]) : samplePortfolio.projects,
    experience: Array.isArray(source.experience) ? (source.experience as unknown[]) : samplePortfolio.experience,
    education: Array.isArray(source.education) ? (source.education as unknown[]) : samplePortfolio.education,
    certifications: Array.isArray(source.certifications) ? (source.certifications as unknown[]) : samplePortfolio.certifications,
    socials: source.socials && typeof source.socials === 'object' ? { ...samplePortfolio.socials, ...(source.socials as Record<string, unknown>) } : samplePortfolio.socials,
    resume: source.resume && typeof source.resume === 'object' ? { ...samplePortfolio.resume, ...(source.resume as Record<string, unknown>) } : samplePortfolio.resume,
  };
}

export async function publishPortfolio(portfolioData: unknown) {
  const res = await fetch(`${API_BASE}/portfolios/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(portfolioData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to publish');
  }
  return data.url as string;
}

export async function updatePublishedPortfolio(username: string, portfolioData: unknown) {
  const res = await fetch(`${API_BASE}/portfolios/${encodeURIComponent(username)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(portfolioData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update portfolio');
  }
  return data.url as string;
}

export async function unpublishPortfolio(username: string) {
  const res = await fetch(`${API_BASE}/portfolios/unpublish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to unpublish');
  }
  return data.url as string;
}

export async function fetchPublishedPortfolio(username: string) {
  const res = await fetch(`${API_BASE}/portfolios/${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Portfolio not found');
  }
  return normalizePortfolio(data.portfolio);
}

export async function checkUsernameAvailability(username: string) {
  const res = await fetch(`${API_BASE}/auth/check-username?username=${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to check username');
  }
  return data.available as boolean;
}
