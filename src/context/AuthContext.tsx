import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const API_BASE = (() => {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001/api';
  }

  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';

  if (isLocalhost) {
    return 'http://localhost:3001/api';
  }

  return '/api';
})();

async function apiRequest(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const data = await apiRequest('/auth/me');
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const signup = useCallback(async (username: string, password: string) => {
    const data = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    setUser(data.user);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
