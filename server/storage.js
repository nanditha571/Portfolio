import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const DATA_DIR = isProduction ? '/tmp/folioforge-data' : join(process.cwd(), 'server', 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');
const PORTFOLIOS_FILE = join(DATA_DIR, 'portfolios.json');

export const sessions = new Map();

export function loadUsers() {
  try {
    if (!existsSync(USERS_FILE)) {
      writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    return JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function loadPortfolios() {
  try {
    if (!existsSync(PORTFOLIOS_FILE)) {
      writeFileSync(PORTFOLIOS_FILE, JSON.stringify({}, null, 2));
      return {};
    }
    return JSON.parse(readFileSync(PORTFOLIOS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

export function savePortfolios(portfolios) {
  writeFileSync(PORTFOLIOS_FILE, JSON.stringify(portfolios, null, 2));
}
