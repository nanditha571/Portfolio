const steps = [
  {
    number: '01',
    title: 'Add Details',
    description:
      'Fill in your personal information, skills, projects, and experience. Our guided form makes it effortless.',
  },
  {
    number: '02',
    title: 'Choose Theme',
    description:
      'Browse our collection of 10 stunning themes. Pick one that matches your personality and brand.',
  },
  {
    number: '03',
    title: 'Customize & Preview',
    description:
      'Fine-tune colors, layout, and content. See real-time changes with our live preview feature.',
  },
  {
    number: '04',
    title: 'Publish',
    description:
      'Export or share your portfolio instantly. Get a unique URL to showcase your work to the world.',
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            How it <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">works</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Create your professional portfolio in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step }: { step: typeof steps[0] }) => {
  return (
    <div className="relative">
      <div className="h-full bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:border-indigo-200 hover:shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100">
            <span className="text-lg font-bold text-indigo-700">
              {step.number}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};
