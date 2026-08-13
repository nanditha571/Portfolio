import type { Portfolio, Education } from '@/types/portfolio';

interface EducationStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function EducationStep({ data, onChange }: EducationStepProps) {
  const education = data.education;

  const updateItem = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ education: updated });
  };

  const addItem = () => {
    const updated = [
      ...education,
      {
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ];
    onChange({ education: updated });
  };

  const removeItem = (index: number) => {
    const updated = education.filter((_, i) => i !== index);
    onChange({ education: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Education</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add your academic background and qualifications.
        </p>
      </div>

      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-900">
                Education {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm text-red-700 hover:bg-red-50 transition-colors"
                aria-label={`Remove education ${index + 1}`}
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Institution</label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => updateItem(index, 'institution', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Stanford University"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Degree</label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => updateItem(index, 'degree', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="B.S."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Field of Study</label>
                <input
                  type="text"
                  value={item.field}
                  onChange={(e) => updateItem(index, 'field', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Computer Science"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Start Date</label>
                <input
                  type="text"
                  value={item.startDate}
                  onChange={(e) => updateItem(index, 'startDate', e.target.value)}
                  placeholder="2015-09"
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">End Date</label>
                <input
                  type="text"
                  value={item.endDate}
                  onChange={(e) => updateItem(index, 'endDate', e.target.value)}
                  placeholder="2019-05"
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Focus, honors, activities..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex h-10 items-center justify-center rounded-md border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
      >
        + Add Education
      </button>
    </div>
  );
}
