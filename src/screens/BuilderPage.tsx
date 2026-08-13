import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePortfolioContext } from '@/context/PortfolioContext';
import { useAuth } from '@/context/AuthContext';
import { getThemeById, themeRegistry } from '@/data/themeRegistry';
import { publishPortfolio, updatePublishedPortfolio, unpublishPortfolio } from '@/lib/api';
import SaveNavigation from '@/components/builder/steps/SaveNavigation';
import SaveIndicator from '@/components/builder/steps/SaveIndicator';
import PersonalStep from '@/components/builder/steps/PersonalStep';
import AboutStep from '@/components/builder/steps/AboutStep';
import SkillsStep from '@/components/builder/steps/SkillsStep';
import ProjectsStep from '@/components/builder/steps/ProjectsStep';
import ExperienceStep from '@/components/builder/steps/ExperienceStep';
import EducationStep from '@/components/builder/steps/EducationStep';
import CertificationsStep from '@/components/builder/steps/CertificationsStep';
import SocialsStep from '@/components/builder/steps/SocialsStep';
import ResumeStep from '@/components/builder/steps/ResumeStep';
import ThemeStep from '@/components/builder/steps/ThemeStep';
import type { BuilderStep } from '@/types/portfolio';
import { CheckCircleIcon, ShareIcon, LinkedInIcon, MessageIcon } from '@/components/ui/BrandIcons';

interface BuilderPageProps {
  navigate: (to: string) => void;
  initialTheme?: string | null;
}

const STEPS: BuilderStep[] = [
  { id: 'personal', label: 'Personal' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'socials', label: 'Socials' },
  { id: 'resume', label: 'Resume' },
  { id: 'theme', label: 'Theme' },
];

function BuilderContent({ navigate, initialTheme }: BuilderPageProps) {
  const { data, updateData } = usePortfolioContext();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [previewTheme, setPreviewTheme] = useState(initialTheme || data.theme);
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
  const [publishError, setPublishError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    setSaveStatus('saving');
    const timeout = setTimeout(() => {
      setSaveStatus('saved');
    }, 600);
    return () => clearTimeout(timeout);
  }, [data]);

  const handleChange = useCallback((updates: Partial<typeof data>) => {
    updateData(updates);
  }, [updateData]);

  const handlePrev = () => setCurrentStep((s) => Math.max(0, s - 1));
  const handleNext = () => setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1));

  const ActiveThemeComponent = useMemo(() => {
    const theme = getThemeById(previewTheme || data.theme);
    return theme?.Component || null;
  }, [previewTheme, data.theme]);

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalStep data={data} onChange={handleChange} />;
      case 1: return <AboutStep data={data} onChange={handleChange} />;
      case 2: return <SkillsStep data={data} onChange={handleChange} />;
      case 3: return <ProjectsStep data={data} onChange={handleChange} />;
      case 4: return <ExperienceStep data={data} onChange={handleChange} />;
      case 5: return <EducationStep data={data} onChange={handleChange} />;
      case 6: return <CertificationsStep data={data} onChange={handleChange} />;
      case 7: return <SocialsStep data={data} onChange={handleChange} />;
      case 8: return <ResumeStep data={data} onChange={handleChange} />;
      case 9: return <ThemeStep data={data} onChange={(u) => { handleChange(u); setPreviewTheme((u as any).theme || previewTheme); }} />;
      default: return null;
    }
  };

  const getPublicUrl = () => {
    if (!publishedUrl || !user) return '';
    if (publishedUrl.startsWith('http')) return publishedUrl;
    return `${window.location.origin}${publishedUrl}`;
  };

  const handlePublish = async () => {
    if (!user) {
      navigate('/dashboard');
      return;
    }

    setPublishing(true);
    setPublishError('');
    try {
      const portfolioData = {
        ...data,
        username: user.username,
        publishedAt: new Date().toISOString(),
      };
      let url: string;
      if (isPublished) {
        url = await updatePublishedPortfolio(user.username, portfolioData);
      } else {
        url = await publishPortfolio(portfolioData);
      }
      setPublishedUrl(url);
      setIsPublished(true);
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Failed to publish');
    } finally {
      setPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    if (!user) return;
    setPublishing(true);
    setPublishError('');
    try {
      await unpublishPortfolio(user.username);
      setIsPublished(false);
      setPublishedUrl(null);
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Failed to unpublish');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopyLink = async () => {
    const url = getPublicUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    const url = getPublicUrl();
    if (!url) return;

    const shareData = {
      title: `${data.personal.firstName} ${data.personal.lastName} - Portfolio`,
      text: `Check out ${data.personal.firstName}'s portfolio: ${data.personal.role}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  const handleShareLinkedIn = () => {
    const url = getPublicUrl();
    if (!url) return;
    const text = encodeURIComponent(`Check out ${data.personal.firstName} ${data.personal.lastName}'s portfolio - ${data.personal.role}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const url = getPublicUrl();
    if (!url) return;
    const text = encodeURIComponent(`Check out ${data.personal.firstName} ${data.personal.lastName}'s portfolio: ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const publicUrl = getPublicUrl();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-lg font-bold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">FolioForge</span>
            </button>
            <span className="hidden sm:inline text-xs text-slate-500 border border-slate-200 rounded-full px-2 py-0.5">Builder</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/preview')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Preview</button>
            <button onClick={() => navigate('/dashboard')} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</button>
            <SaveIndicator status={saveStatus} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <SaveNavigation
                steps={STEPS}
                currentStepIndex={currentStep}
                onPrev={handlePrev}
                onNext={handleNext}
                isFirstStep={currentStep === 0}
                isLastStep={currentStep === STEPS.length - 1}
              />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 min-h-[400px]">
              {renderStep()}
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Publish Portfolio</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {user ? `Publishing as @${user.username}` : 'Sign in to publish your portfolio'}
                    </p>
                  </div>
                  <button
                    onClick={handlePublish}
                    disabled={publishing}
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    {publishing ? 'Publishing...' : isPublished ? 'Update' : 'Publish'}
                  </button>
                </div>

                {publishError && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {publishError}
                  </div>
                )}

                {isPublished && publicUrl && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Portfolio Published!</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-3 break-all">{publicUrl}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={handleCopyLink} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={() => navigate(`/p/${user?.username}`)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Open Portfolio
                      </button>
                      <button onClick={handleShare} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <ShareIcon className="w-4 h-4" />
                        Share
                      </button>
                      <button onClick={handleShareLinkedIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <LinkedInIcon className="w-4 h-4" />
                        LinkedIn
                      </button>
                      <button onClick={handleShareWhatsApp} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        <MessageIcon className="w-4 h-4" />
                        WhatsApp
                      </button>
                      <button onClick={handleUnpublish} disabled={publishing} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50">
                        Unpublish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Live Preview</span>
                <select
                  value={previewTheme}
                  onChange={(e) => setPreviewTheme(e.target.value)}
                  className="bg-transparent text-xs text-slate-600 border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {themeRegistry.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white">{t.name}</option>
                  ))}
                </select>
              </div>
              <div className="h-[calc(100vh-180px)] overflow-auto bg-slate-50 p-4">
                <div className="builder-live-preview mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white shadow-sm">
                  {ActiveThemeComponent ? (
                    <ActiveThemeComponent data={data} />
                  ) : (
                    <div className="flex items-center justify-center h-[50vh] text-slate-500 text-sm">Select a theme to preview</div>
                  )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage({ navigate, initialTheme }: BuilderPageProps) {
  return (
    <BuilderContent navigate={navigate} initialTheme={initialTheme} />
  );
}
