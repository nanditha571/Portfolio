import { useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/BrandIcons';

const faqs = [
  {
    question: 'Do I need to create an account to build a portfolio?',
    answer: 'No, you can start building your portfolio immediately without signing up. Your work is autosaved locally in your browser. Create an account only when you are ready to publish and get a shareable URL.',
  },
  {
    question: 'How many themes are included?',
    answer: 'FolioForge includes 10 professionally designed themes, from minimal and editorial styles to cyberpunk and holographic looks. You can switch themes anytime while building.',
  },
  {
    question: 'Can I use my own domain for the published portfolio?',
    answer: 'Yes. When you publish, you receive a unique FolioForge URL. You can also map a custom domain to your published portfolio from your dashboard settings.',
  },
  {
    question: 'Is my portfolio data stored securely?',
    answer: 'Your portfolio data is stored securely on our servers. Drafts are saved locally in your browser, and published portfolios are stored in our database so they remain accessible from any device.',
  },
  {
    question: 'Can I edit my portfolio after publishing?',
    answer: 'Absolutely. You can update your portfolio anytime and republish. The same public URL will automatically reflect your latest changes.',
  },
  {
    question: 'What happens if I unpublish my portfolio?',
    answer: 'Unpublishing makes your portfolio private while keeping your data saved. You can republish it later, and the same URL will become active again.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Frequently asked <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg">
            Everything you need to know about building and publishing with FolioForge.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '500px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
