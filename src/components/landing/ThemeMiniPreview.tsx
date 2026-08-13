import { normalizePortfolio, samplePortfolio } from '@/data/samplePortfolio';

// Always provide a complete, valid portfolio object so the preview never
// receives undefined, null, {} or an incomplete object. This is intentionally
// decoupled from the user's own portfolio — theme cards always show the same
// sample preview.
const previewData = normalizePortfolio(samplePortfolio);

interface ThemeMiniPreviewProps {
  themeId?: string;
  className?: string;
  colors?: string[];
}

/**
 * Lightweight, theme-specific visual preview used on the landing / theme
 * selection page. Each variant mirrors the actual theme's design language
 * (background colors, gradients, typography, layout, accents) so the card
 * visually communicates what the real full-page theme looks like — without
 * mounting the heavy full-page component inside every card.
 */
export const ThemeMiniPreview = ({ themeId, className }: ThemeMiniPreviewProps) => {
  const { personal, about } = previewData;
  const initials = `${personal.firstName[0]}${personal.lastName[0]}`;
  const fullName = `${personal.firstName} ${personal.lastName}`;
  const role = personal.role;
  const tagline = about.tagline;

  const base = `relative w-full aspect-[4/3] overflow-hidden ${className || ''}`;

  switch (themeId) {
    case 'neon-circuit':
      return (
        <div className={`${base} bg-black text-cyan-100`}>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.2),transparent_60%)]" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="px-2 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[9px] font-medium tracking-widest uppercase mb-2">
              {role}
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              {fullName}
            </div>
            <div className="text-[9px] text-cyan-200/70 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500 text-black text-[8px] font-bold uppercase">View Work</span>
              <span className="px-2 py-0.5 rounded border border-cyan-500/50 text-cyan-300 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'monochrome':
      return (
        <div className={`${base} bg-white text-neutral-900 font-serif`}>
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold mb-2">
              {initials}
            </div>
            <div className="text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-1">{role}</div>
            <div className="text-base sm:text-lg font-bold tracking-tight">
              {personal.firstName} <span className="text-neutral-400">{personal.lastName}</span>
            </div>
            <div className="text-[9px] text-neutral-600 font-sans mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 bg-neutral-900 text-white text-[8px] font-sans font-semibold uppercase">Portfolio</span>
              <span className="px-2 py-0.5 border border-neutral-300 text-neutral-900 text-[8px] font-sans font-semibold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'quantum-mind':
      return (
        <div className={`${base} bg-[#0a0a0f] text-slate-300`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.4),#0a0a0f_70%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #a78bfa 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[9px] font-mono mb-2">
              <span className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
              AI / Research
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              {fullName}
            </div>
            <div className="text-[9px] text-slate-400 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500 text-white text-[8px] font-bold uppercase">View Work</span>
              <span className="px-2 py-0.5 rounded border border-indigo-500/40 text-indigo-300 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'pixelverse':
      return (
        <div className={`${base} bg-[#0f0c29] text-white`}>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-500/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -right-6 w-28 h-28 bg-yellow-400/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-black text-[9px] font-bold tracking-widest uppercase mb-2">
              {role}
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(255,107,157,0.4)]">
              {fullName}
            </div>
            <div className="text-[9px] text-purple-200/70 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-gradient-to-r from-pink-500 to-yellow-400 text-black text-[8px] font-bold uppercase">View Work</span>
              <span className="px-2 py-0.5 rounded border border-pink-400/50 text-pink-200 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'ecocode':
      return (
        <div className={`${base} bg-[#022c22] text-emerald-50`}>
          <div className="absolute -top-10 left-1/4 w-32 h-32 bg-emerald-500/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 right-1/4 w-28 h-28 bg-teal-500/30 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[9px] font-mono mb-2">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
              Sustainability & Tech
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              {fullName}
            </div>
            <div className="text-[9px] text-emerald-200/70 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[8px] font-bold uppercase">View Work</span>
              <span className="px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-300 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'orbit':
      return (
        <div className={`${base} bg-slate-950 text-slate-200`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.3),#020617_70%)]" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.7) 0.5px, transparent 0.5px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '7px 7px',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-[9px] font-mono mb-2">
              <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
              Space Portfolio
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-blue-300 via-slate-200 to-blue-300 bg-clip-text text-transparent">
              {fullName}
            </div>
            <div className="text-[9px] text-slate-400 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[8px] font-bold uppercase">Explore</span>
              <span className="px-2 py-0.5 rounded border border-blue-500/40 text-blue-300 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'prism':
      return (
        <div className={`${base} bg-[#0f0b2e] text-white`}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20" />
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-purple-500/30 to-transparent rounded-full blur-3xl rotate-45" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="relative px-2 py-0.5 rounded-full border border-purple-400/30 bg-white/5 text-purple-200 text-[9px] font-medium tracking-widest uppercase backdrop-blur-sm mb-2">
              {role}
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {fullName}
            </div>
            <div className="text-[9px] text-purple-200/70 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-[8px] font-bold uppercase">View Work</span>
              <span className="px-2 py-0.5 rounded border border-purple-400/40 text-purple-200 text-[8px] font-bold uppercase">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'root-access':
      return (
        <div className={`${base} bg-black text-green-400 font-mono`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.3),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="relative z-10 flex flex-col items-start justify-center h-full px-4">
            <div className="text-[9px] text-green-500/60 mb-1">{'>'} initializing portfolio...</div>
            <div className="text-[9px] text-green-500/60 mb-2">
              {'>'} loading {personal.firstName}_{personal.lastName}.profile
            </div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-green-300" style={{ textShadow: '0 0 10px rgba(34,197,94,0.5)' }}>
              {fullName}
            </div>
            <div className="text-[9px] text-green-500/80 mt-1">
              <span className="text-green-600">$</span> cat role.txt
            </div>
            <div className="text-[9px] text-green-300 mb-2">{role}</div>
            <div className="flex gap-1.5 mt-1">
              <span className="px-2 py-0.5 rounded bg-green-500 text-black text-[8px] font-bold uppercase">./projects</span>
              <span className="px-2 py-0.5 rounded border border-green-500/40 text-green-300 text-[8px] font-bold uppercase">./contact</span>
            </div>
          </div>
        </div>
      );

    case 'aether':
      return (
        <div className={`${base} bg-white text-neutral-900`}>
          <div className="relative z-10 flex flex-col justify-center h-full px-5">
            <div className="text-[10px] text-neutral-500 font-medium tracking-wide mb-1">{role}</div>
            <div className="text-base sm:text-lg font-semibold tracking-tight leading-tight">
              {personal.firstName} <span className="text-neutral-400">{personal.lastName}</span>
            </div>
            <div className="text-[9px] text-neutral-600 leading-relaxed mt-1 max-w-[90%] hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-3">
              <span className="px-2.5 py-1 bg-neutral-900 text-white text-[8px] font-medium rounded-full">View Projects</span>
              <span className="px-2.5 py-1 border border-neutral-200 text-neutral-900 text-[8px] font-medium rounded-full">Contact</span>
            </div>
          </div>
        </div>
      );

    case 'nexus':
      return (
        <div className={`${base} bg-[#050b14] text-cyan-100`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.2),#050b14_70%)]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[9px] font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
              ONLINE — COMMAND CENTER
            </span>
            <div className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(6,182,212,0.4)]">
              {fullName}
            </div>
            <div className="text-[9px] text-cyan-200/70 mt-1 hidden sm:block">{tagline}</div>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded bg-cyan-500 text-white text-[8px] font-bold uppercase">Access Projects</span>
              <span className="px-2 py-0.5 rounded border border-cyan-500/40 text-cyan-300 text-[8px] font-bold uppercase">Init Contact</span>
            </div>
            <div className="mt-2 relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-1.5 rounded-full border border-cyan-500/20 animate-[spin_8s_linear_infinite_reverse]" />
              <div className="absolute inset-3 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-[10px] font-black text-cyan-300">
                {initials}
              </div>
            </div>
          </div>
        </div>
      );

    // Fallback — never render a blank/white area.
    default:
      return (
        <div className={`${base} bg-slate-100 text-slate-500 flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1">Theme Preview</div>
            <div className="text-[9px] text-slate-400">Loading theme preview...</div>
          </div>
        </div>
      );
  }
};