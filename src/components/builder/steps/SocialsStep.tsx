import type { Portfolio } from '@/types/portfolio';

interface SocialsStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function SocialsStep({ data, onChange }: SocialsStepProps) {
  const socials = data.socials;

  const update = (field: keyof typeof socials, value: string) => {
    onChange({ socials: { ...socials, [field]: value || undefined } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Social Links</h2>
        <p className="mt-1 text-sm text-slate-600">
          Connect your profiles so visitors can find you everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <SocialField
          label="GitHub"
          value={socials.github || ''}
          onChange={(value) => update('github', value)}
          placeholder="https://github.com/username"
        />
        <SocialField
          label="LinkedIn"
          value={socials.linkedin || ''}
          onChange={(value) => update('linkedin', value)}
          placeholder="https://linkedin.com/in/username"
        />
        <SocialField
          label="Twitter / X"
          value={socials.twitter || ''}
          onChange={(value) => update('twitter', value)}
          placeholder="https://x.com/username"
        />
        <SocialField
          label="Email"
          value={socials.email || ''}
          onChange={(value) => update('email', value)}
          placeholder="you@example.com"
          type="email"
        />
        <SocialField
          label="Website"
          value={socials.website || ''}
          onChange={(value) => update('website', value)}
          placeholder="https://yourwebsite.com"
          type="url"
        />
      </div>
    </div>
  );
}

function SocialField({
  label,
  value,
  onChange,
  placeholder,
  type = 'url',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={label.toLowerCase()} className="text-sm font-medium text-slate-900">
        {label}
      </label>
      <input
        id={label.toLowerCase()}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  );
}
