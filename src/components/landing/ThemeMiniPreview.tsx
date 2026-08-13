import { useState } from 'react';

interface ThemeMiniPreviewProps {
  themeId?: string;
  className?: string;
  colors?: string[];
}

export const ThemeMiniPreview = ({ themeId: _themeId, className, colors = ['#6366f1', '#a855f7', '#ec4899'] }: ThemeMiniPreviewProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 transition-all duration-700 bg-slate-50"
        style={{
          background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}22, ${colors[2]}22)`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full blur-[40px] transition-all duration-700"
            style={{
              backgroundColor: colors[0],
              transform: isHovered ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
            }}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 via-transparent to-transparent" />

      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {colors.map((color, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: color,
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
