import { themeRegistry } from '@/data/themeRegistry';
import { ThemeMiniPreview } from '@/components/landing/ThemeMiniPreview';

interface ThemeInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: string[];
}

const themes: ThemeInfo[] = themeRegistry.map((t) => ({
  id: t.id,
  name: t.name,
  category: t.category,
  description: t.description,
  colors: [t.accent],
}));

interface ThemeShowcaseProps {
  navigate: (to: string) => void;
}

export const ThemeShowcase = ({ navigate }: ThemeShowcaseProps) => {
  return (
    <section id="themes" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Choose your <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">theme</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            From minimal to maximal, we have the perfect style for your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {themes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ThemeCard = ({ theme, navigate }: { theme: ThemeInfo; navigate: (to: string) => void }) => {
  return (
    <div className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <ThemeMiniPreview themeId={theme.id} />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-block px-2 py-1 rounded-md bg-white/80 border border-slate-200 text-[10px] font-semibold text-slate-700">
            {theme.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-indigo-700 transition-colors">
          {theme.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {theme.description}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(`/builder?theme=${theme.id}`)}
            className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            Use Theme
          </button>
          <button
            type="button"
            onClick={() => navigate(`/preview?theme=${theme.id}`)}
            className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};
