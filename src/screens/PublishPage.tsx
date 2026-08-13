import { useState, useEffect } from 'react';
import { usePortfolioContext } from '@/context/PortfolioContext';
import { getThemeById } from '@/data/themeRegistry';
import { samplePortfolio } from '@/data/samplePortfolio';
import { fetchPublishedPortfolio } from '@/lib/api';
import { Loader2 } from '@/components/ui/BrandIcons';

interface PublishPageProps {
  username: string;
  navigate: (to: string) => void;
}

export default function PublishPage({ username, navigate }: PublishPageProps) {
  const { data } = usePortfolioContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const result = await fetchPublishedPortfolio(username);
        if (!cancelled) {
          setPortfolio(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Portfolio not found');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, [username]);

  const theme = getThemeById(portfolio?.theme || data.theme) || getThemeById(samplePortfolio.theme);
  const ThemeComponent = theme?.Component;

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Portfolio Not Found</h1>
          <p className="text-slate-600 mb-6">{error || 'This portfolio does not exist or has been removed.'}</p>
          <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {ThemeComponent ? (
        <ThemeComponent data={portfolio} />
      ) : (
        <div className="flex items-center justify-center h-[60vh] text-slate-500 text-sm">No theme selected</div>
      )}
    </div>
  );
}
