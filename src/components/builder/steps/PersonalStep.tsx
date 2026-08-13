import type { Portfolio } from '@/types/portfolio';

interface PersonalStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function PersonalStep({ data, onChange }: PersonalStepProps) {
  const personal = data.personal;

  const update = (field: keyof typeof personal, value: string) => {
    onChange({ personal: { ...personal, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Personal Information</h2>
        <p className="mt-1 text-sm text-slate-600">
          Basic details that appear across your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-slate-900">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={personal.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Alex"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-slate-900">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={personal.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Chen"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium text-slate-900">
          Role / Title
        </label>
        <input
          id="role"
          type="text"
          value={personal.role}
          onChange={(e) => update('role', e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Full Stack Engineer"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="avatar" className="text-sm font-medium text-slate-900">
          Avatar URL
        </label>
        <input
          id="avatar"
          type="url"
          value={personal.avatar}
          onChange={(e) => update('avatar', e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://example.com/avatar.jpg"
        />
        {personal.avatar && (
          <img
            src={personal.avatar}
            alt="Avatar preview"
            className="mt-2 h-16 w-16 rounded-full object-cover"
          />
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="text-sm font-medium text-slate-900">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={personal.location}
          onChange={(e) => update('location', e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="San Francisco, CA"
        />
      </div>
    </div>
  );
}
