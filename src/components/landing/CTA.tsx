import { ArrowRightIcon } from '@/components/ui/BrandIcons';

interface CTAProps {
  navigate: (to: string) => void;
}

export const CTA = ({ navigate }: CTAProps) => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/30" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
          <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
            Get Started Today
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          Ready to build your <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">portfolio</span>?
        </h2>

        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg mb-10 leading-relaxed">
          Join thousands of creators who have already built stunning portfolios with FolioForge. Start for free, no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/builder')}
            className="group w-full sm:w-auto px-8 py-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            Start Building Now
            <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => {
              const el = document.querySelector('#how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
