import { ArrowRightIcon } from '@/components/ui/BrandIcons';

interface HeroProps {
  navigate: (to: string) => void;
}

export const Hero = ({ navigate }: HeroProps) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                Portfolio Builder
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Build a portfolio <br />
              that <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">represents you</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Create a professional portfolio in minutes. Choose from 10 hand-crafted themes, customize every detail, and share your work with the world.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={() => navigate('/builder')}
                className="group w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                Start Building Free
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector('#themes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Browse Themes
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No account needed</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>10 themes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Autosaved</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100/50 to-violet-100/50 rounded-3xl blur-2xl opacity-60" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                    <div className="w-3 h-3 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-medium text-slate-500">folioforge.dev/preview</span>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold">
                      AC
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Alex Chen</h3>
                      <p className="text-sm text-slate-500">Full Stack Engineer</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                    <div className="h-3 bg-slate-100 rounded w-4/6" />
                  </div>
                  <div className="mt-6 flex gap-2">
                    <div className="h-8 w-20 bg-indigo-50 rounded-md border border-indigo-100" />
                    <div className="h-8 w-20 bg-white rounded-md border border-slate-200" />
                    <div className="h-8 w-20 bg-white rounded-md border border-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
