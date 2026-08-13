import { cn } from '@/lib/utils';
import type { Portfolio } from '@/types/portfolio';
import { themeRegistry } from '@/data/themeRegistry';

interface ThemeStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function ThemeStep({ data, onChange }: ThemeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Theme</h2>
        <p className="mt-1 text-sm text-slate-600">
          Choose a visual style for your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {themeRegistry.map((theme) => {
          const isSelected = data.theme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange({ theme: theme.id })}
              className={cn(
                'group relative flex flex-col rounded-lg border-2 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white',
                isSelected
                  ? 'border-indigo-600 shadow-lg'
                  : 'border-slate-200 hover:border-slate-400'
              )}
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  'h-24 w-full rounded-t-md bg-cover bg-center',
                  theme.preview
                )}
                aria-hidden="true"
              />

              <div className="flex flex-1 flex-col items-start gap-1 p-3 text-left">
                <span className="text-sm font-medium text-slate-900">{theme.name}</span>
                <span className="text-xs text-slate-500">{theme.category}</span>
              </div>

              {isSelected && (
                <div
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
