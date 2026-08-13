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
  return data.portfolio;
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
