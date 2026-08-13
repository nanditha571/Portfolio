import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MenuIcon, XMarkIcon } from '@/components/ui/BrandIcons';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  navigate: (to: string) => void;
}

const navLinks = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Themes', href: '#themes' },
  { name: 'Features', href: '#features' },
  { name: 'FAQ', href: '#faq' },
];

export const Navbar = ({ navigate }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm'
          : 'bg-white/60 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[2px] rounded-[6px] bg-white" />
              <span className="relative text-xs font-bold text-indigo-700">
                FF
              </span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Folio<span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Forge</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.href.startsWith('#')) {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(link.href);
                  }
                }}
                className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 group-hover:w-full transition-all duration-200 rounded-full" />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-slate-600">@{user.username}</span>
                <button
                  onClick={() => navigate('/builder')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  My Portfolio
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/builder')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 shadow-sm"
                >
                  Create Portfolio
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  setMobileOpen(false);
                  if (link.href.startsWith('#')) {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate(link.href);
                  }
                }}
                className="block w-full text-left text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2.5"
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <>
                <span className="block text-sm text-slate-500 py-2.5">@{user.username}</span>
                <button onClick={() => { setMobileOpen(false); navigate('/builder'); }} className="block w-full text-left text-sm font-semibold text-indigo-600 py-2.5">My Portfolio</button>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="block w-full text-left text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2.5">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { setMobileOpen(false); navigate('/dashboard'); }} className="block w-full text-left text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2.5">Login</button>
                <button onClick={() => { setMobileOpen(false); navigate('/builder'); }} className="block w-full text-left text-sm font-semibold text-indigo-600 py-2.5">Create Portfolio</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
