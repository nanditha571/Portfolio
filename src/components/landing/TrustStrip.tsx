import { CheckCircleIcon } from '@/components/ui/BrandIcons';

export const TrustStrip = () => {
  return (
    <section className="relative py-10 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-indigo-600" />
            <span>No account needed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-indigo-600" />
            <span>10 themes</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-indigo-600" />
            <span>Autosaved locally</span>
          </div>
        </div>
      </div>
    </section>
  );
};
