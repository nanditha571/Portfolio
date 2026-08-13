import type { Portfolio } from '@/types/portfolio';

interface AboutStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function AboutStep({ data, onChange }: AboutStepProps) {
  const about = data.about;

  const update = (field: keyof typeof about, value: string) => {
    onChange({ about: { ...about, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">About You</h2>
        <p className="mt-1 text-sm text-slate-600">
          Share your story with the world.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="tagline" className="text-sm font-medium text-slate-900">
          Tagline
        </label>
        <input
          id="tagline"
          type="text"
          value={about.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Full stack. Engineer."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-slate-900">
          Bio
        </label>
        <textarea
          id="bio"
          value={about.bio}
          onChange={(e) => update('bio', e.target.value)}
          className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Tell visitors about yourself..."
        />
        <p className="text-xs text-slate-500">
          This will appear on your portfolio homepage.
        </p>
      </div>
    </div>
  );
}
