import { useState, useEffect, useCallback } from 'react';
import HomePage from './screens/HomePage';
import BuilderPage from './screens/BuilderPage';
import PreviewPage from './screens/PreviewPage';
import DashboardPage from './screens/DashboardPage';
import PublishPage from './screens/PublishPage';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider, useAuth } from './context/AuthContext';

type Route = '/' | '/builder' | '/preview' | '/dashboard' | string;

function parseRoute(hash: string): { route: Route; theme: string | null } | null {
  const cleanHash = hash.replace('#', '');
  if (!cleanHash.startsWith('/')) {
    return null;
  }
  const [path, queryString] = cleanHash.split('?');
  const params = new URLSearchParams(queryString);
  const theme = params.get('theme');

  if (path.startsWith('/p/')) {
    return { route: path as Route, theme };
  }
  if (path === '/builder' || path.startsWith('/builder')) {
    return { route: '/builder', theme };
  }
  if (path === '/preview' || path.startsWith('/preview')) {
    return { route: '/preview', theme };
  }
  if (path === '/dashboard' || path.startsWith('/dashboard')) {
    return { route: '/dashboard', theme };
  }
  return { route: '/', theme };
}

function getInitialRoute(): { route: Route; theme: string | null } {
  const hash = window.location.hash;
  if (hash) {
    const parsed = parseRoute(hash);
    if (parsed) return parsed;
  }
  const pathname = window.location.pathname;
  if (pathname.startsWith('/p/')) {
    return { route: pathname as Route, theme: null };
  }
  if (pathname === '/builder' || pathname.startsWith('/builder')) {
    return { route: '/builder', theme: null };
  }
  if (pathname === '/preview' || pathname.startsWith('/preview')) {
    return { route: '/preview', theme: null };
  }
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) {
    return { route: '/dashboard', theme: null };
  }
  return { route: '/', theme: null };
}

function useAppRouter() {
  const [routeState, setRouteState] = useState(getInitialRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseRoute(window.location.hash);
      if (parsed) {
        setRouteState(parsed);
      }
    };

    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/p/')) {
        setRouteState({ route: pathname as Route, theme: null });
      } else {
        const parsed = parseRoute(window.location.hash);
        if (parsed) {
          setRouteState(parsed);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return { routeState, navigate };
}

function AppContent() {
  const { routeState, navigate } = useAppRouter();
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const { route, theme } = routeState;

  if (route === '/builder') return <BuilderPage navigate={navigate} initialTheme={theme} />;
  if (route === '/preview') return <PreviewPage navigate={navigate} initialTheme={theme} />;
  if (route === '/dashboard') return <DashboardPage navigate={navigate} />;
  if (route.startsWith('/p/')) return <PublishPage username={route.slice(3)} navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
