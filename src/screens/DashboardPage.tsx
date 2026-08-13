import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRightIcon, SparklesIcon } from '@/components/ui/BrandIcons';
import { useAuth } from '@/context/AuthContext';

interface DashboardPageProps {
  navigate: (to: string) => void;
}

type Mode = 'choose' | 'signup' | 'login';

export default function DashboardPage({ navigate }: DashboardPageProps) {
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>('choose');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const getAuthErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
      if (err.message === 'Username already taken') {
        return 'An account with this username already exists. Please log in.';
      }
      if (err.message === 'Invalid username or password') {
        return 'Invalid username or password. Please try again.';
      }
      return err.message;
    }
    return 'Something went wrong';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(username.trim(), password);
      navigate('/builder');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
      navigate('/builder');
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">FolioForge</span>
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">@{user.username}</span>
              <button onClick={() => navigate('/builder')} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">
                Open Builder
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Welcome back, @{user.username}</h1>
            <p className="text-slate-600 max-w-xl mx-auto">
              Continue building your portfolio or create a new one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Continue Building</h2>
              </div>
              <p className="text-sm text-slate-600 mb-6">Pick up where you left off. Your portfolio is saved and ready.</p>
              <button onClick={() => navigate('/builder')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Open Builder
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-200 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Publish Portfolio</h2>
              </div>
              <p className="text-sm text-slate-600 mb-6">Share your portfolio with the world via a public URL.</p>
              <button onClick={() => navigate('/builder')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                Go to Builder
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (mode === 'signup') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-600 mb-6">Sign up to save and publish your portfolio.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                className={cn(
                  'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
                  'placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={cn(
                  'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
                  'placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                )}
              />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm">
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600 text-center">
            Already have an account?{' '}
            <button onClick={() => { resetForm(); setMode('login'); }} className="text-indigo-600 hover:text-indigo-700 font-medium">
              Log in
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (mode === 'login') {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-600 mb-6">Log in to access your portfolio.</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                className={cn(
                  'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
                  'placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={cn(
                  'flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm',
                  'placeholder:text-slate-400',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                )}
              />
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="mt-4 text-sm text-slate-600 text-center">
            Don't have an account?{' '}
            <button onClick={() => { resetForm(); setMode('signup'); }} className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="text-lg font-bold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">FolioForge</span>
          </button>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/builder')} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">
              New Portfolio
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Your Portfolio Dashboard</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Sign in or create an account to save and publish your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Create New Portfolio</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">Start from scratch with a fresh portfolio and pick a theme.</p>
            <button onClick={() => navigate('/builder')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Open Builder
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-200 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-violet-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Sign Up to Publish</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">Create an account to publish your portfolio and get a shareable URL.</p>
            <button onClick={() => setMode('signup')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
              Get Started
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
