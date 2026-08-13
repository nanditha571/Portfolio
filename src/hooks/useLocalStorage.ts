import type { Portfolio } from '@/types/portfolio';

const STORAGE_KEY = 'folioforge_portfolio';

export function loadPortfolio(): Portfolio | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Portfolio;
  } catch {
    return null;
  }
}

export function savePortfolio(data: Portfolio): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, updatedAt: new Date().toISOString() }));
  } catch {
    // ignore storage errors
  }
}

export function clearPortfolio(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
