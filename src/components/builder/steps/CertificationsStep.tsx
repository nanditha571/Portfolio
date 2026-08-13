import type { Portfolio, Certification } from '@/types/portfolio';

interface CertificationsStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function CertificationsStep({ data, onChange }: CertificationsStepProps) {
  const certifications = data.certifications;

  const updateItem = (index: number, field: keyof Certification, value: string | undefined) => {
    const updated = certifications.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange({ certifications: updated });
  };

  const addItem = () => {
    const updated = [
      ...certifications,
      {
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        date: '',
        url: '',
      },
    ];
    onChange({ certifications: updated });
  };

  const removeItem = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    onChange({ certifications: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Certifications</h2>
        <p className="mt-1 text-sm text-slate-600">
          List your professional certifications and credentials.
        </p>
      </div>

      <div className="space-y-6">
        {certifications.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-900">
                Certification {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm text-red-700 hover:bg-red-50 transition-colors"
                aria-label={`Remove certification ${index + 1}`}
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="AWS Solutions Architect"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Issuer</label>
                <input
                  type="text"
                  value={item.issuer}
                  onChange={(e) => updateItem(index, 'issuer', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Amazon Web Services"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Date</label>
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => updateItem(index, 'date', e.target.value)}
                  placeholder="2023-01"
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">URL</label>
                <input
                  type="url"
                  value={item.url || ''}
                  onChange={(e) => updateItem(index, 'url', e.target.value || undefined)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://aws.amazon.com"
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
        + Add Certification
      </button>
    </div>
  );
}
