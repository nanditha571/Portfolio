import { GitHubIcon, LinkedInIcon, XIcon, EmailIcon } from '@/components/ui/BrandIcons';

interface FooterProps {
  navigate: (to: string) => void;
}

const footerLinks = {
  product: [
    { name: 'Themes', href: '#themes' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#' },
    { name: 'Changelog', href: '#' },
  ],
  build: [
    { name: 'Builder', href: '/builder' },
    { name: 'Preview', href: '/preview' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Documentation', href: '#' },
  ],
  connect: [
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'X / Twitter', href: '#' },
    { name: 'Email', href: 'mailto:hello@folioforge.dev' },
  ],
};

export const Footer = ({ navigate }: FooterProps) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 opacity-90" />
                <div className="absolute inset-[2px] rounded-[6px] bg-white" />
                <span className="relative text-xs font-bold text-indigo-700">
                  FF
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Folio<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Forge</span>
              </span>
            </button>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Build stunning portfolios with premium themes and powerful customization tools.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.href.startsWith('#')) {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigate(link.href);
                      }
                    }}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Build</h3>
            <ul className="space-y-3">
              {footerLinks.build.map((link) => (
                <li key={link.name}>
                  <button onClick={() => navigate(link.href)} className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Connect</h3>
            <ul className="space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 flex items-center gap-2">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 FolioForge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
              <GitHubIcon className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors">
              <XIcon className="w-5 h-5" />
            </a>
            <a href="mailto:hello@folioforge.dev" className="text-slate-400 hover:text-slate-600 transition-colors">
              <EmailIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
