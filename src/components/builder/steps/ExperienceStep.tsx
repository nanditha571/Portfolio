import type { Portfolio, Experience } from '@/types/portfolio';

interface ExperienceStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const experience = data.experience;

  const updateItem = (index: number, field: keyof Experience, value: string | boolean) => {
    const updated = experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ experience: updated });
  };

  const addItem = () => {
    const updated = [
      ...experience,
      {
        id: crypto.randomUUID(),
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      },
    ];
    onChange({ experience: updated });
  };

  const removeItem = (index: number) => {
    const updated = experience.filter((_, i) => i !== index);
    onChange({ experience: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Experience</h2>
        <p className="mt-1 text-sm text-slate-600">
          Document your professional journey and achievements.
        </p>
      </div>

      <div className="space-y-6">
        {experience.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-900">
                Position {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm text-red-700 hover:bg-red-50 transition-colors"
                aria-label={`Remove position ${index + 1}`}
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Company</label>
                <input
                  type="text"
                  value={item.company}
                  onChange={(e) => updateItem(index, 'company', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="TechCorp"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Role</label>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => updateItem(index, 'role', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Senior Frontend Engineer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Start Date</label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => updateItem(index, 'startDate', e.target.value)}
                  placeholder="2022-03"
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">End Date</label>
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => updateItem(index, 'endDate', e.target.value)}
                  placeholder="Leave blank if current"
                  disabled={item.current}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id={`current-${item.id}`}
                type="checkbox"
                checked={item.current}
                onChange={(e) => updateItem(index, 'current', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
              />
              <label htmlFor={`current-${item.id}`} className="text-sm text-slate-900">
                I currently work here
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Description</label>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(index, 'description', e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex h-10 items-center justify-center rounded-md border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
      >
        + Add Experience
      </button>
    </div>
  );
}
