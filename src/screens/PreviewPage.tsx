import { usePortfolioContext } from '@/context/PortfolioContext';
import { getThemeById } from '@/data/themeRegistry';
import { samplePortfolio } from '@/data/samplePortfolio';

interface PreviewPageProps {
  navigate: (to: string) => void;
  initialTheme?: string | null;
}

export default function PreviewPage({ navigate, initialTheme }: PreviewPageProps) {
  const { data } = usePortfolioContext();
  const theme = getThemeById(initialTheme || data.theme) || getThemeById(samplePortfolio.theme);
  const ThemeComponent = theme?.Component;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">FolioForge</span>
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/builder')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Edit</button>
            <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</button>
          </div>
        </div>
      </header>
      <div className="bg-white">
        {ThemeComponent ? (
          <ThemeComponent data={data} />
        ) : (
          <div className="flex items-center justify-center h-[60vh] text-slate-500 text-sm">No theme selected</div>
        )}
      </div>
    </div>
  );
}
