import { ThemeIcon, WandIcon, GlobeIcon, SparklesIcon, CodeIcon, CheckCircleIcon } from '@/components/ui/BrandIcons';

const features = [
  { icon: WandIcon, title: 'Live Portfolio Builder', description: 'Build your portfolio with our intuitive drag-and-drop interface in real-time.' },
  { icon: GlobeIcon, title: 'Live Preview', description: 'See changes instantly as you build with our real-time preview panel.' },
  { icon: ThemeIcon, title: '10 Unique Themes', description: 'Choose from a curated collection of premium themes for every style.' },
  { icon: SparklesIcon, title: 'Responsive by Default', description: 'Every portfolio looks perfect on desktop, tablet, and mobile devices.' },
  { icon: CodeIcon, title: 'Resume Support', description: 'Import and showcase your resume with beautiful formatting.' },
  { icon: CheckCircleIcon, title: 'Project Showcase', description: 'Highlight your best work with customizable project galleries.' },
  { icon: GlobeIcon, title: 'Social Links', description: 'Connect your social profiles and professional networks seamlessly.' },
  { icon: SparklesIcon, title: 'Auto Save', description: 'Never lose your work with automatic local saving as you build.' },
  { icon: ThemeIcon, title: 'Shareable Portfolio', description: 'Get a unique URL to share your portfolio anywhere online.' },
  { icon: WandIcon, title: 'Section Toggles', description: 'Show or hide sections to create the perfect portfolio layout.' },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Everything you need to <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">stand out</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Powerful features designed to help you create stunning portfolios effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const Icon = feature.icon;
  return (
    <div
      className="bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            {feature.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};
