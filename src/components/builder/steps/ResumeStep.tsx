import type { Portfolio } from '@/types/portfolio';

interface ResumeStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function ResumeStep({ data, onChange }: ResumeStepProps) {
  const resume = data.resume;

  const update = (field: keyof typeof resume, value: string) => {
    onChange({ resume: { ...resume, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Resume</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add a downloadable resume for recruiters and visitors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label htmlFor="resumeUrl" className="text-sm font-medium text-slate-900">
            Resume URL
          </label>
          <input
            id="resumeUrl"
            type="url"
            value={resume.url}
            onChange={(e) => update('url', e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fileName" className="text-sm font-medium text-slate-900">
            File Name
          </label>
          <input
            id="fileName"
            type="text"
            value={resume.fileName}
            onChange={(e) => update('fileName', e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Alex_Chen_Resume.pdf"
          />
          <p className="text-xs text-slate-500">
            This is the filename shown to users when they download your resume.
          </p>
        </div>

        {resume.url && (
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600 mb-2">Preview</p>
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-700 underline underline-offset-4 hover:text-indigo-800"
            >
              Download {resume.fileName || 'resume'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
