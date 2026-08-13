import type { Portfolio, Project } from '@/types/portfolio';

interface ProjectsStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

export default function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const projects = data.projects;

  const updateProject = (index: number, field: keyof Project, value: string | boolean | string[] | undefined) => {
    const updated = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onChange({ projects: updated });
  };

  const addProject = () => {
    const updated = [
      ...projects,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        image: '',
        stack: [],
        featured: false,
      },
    ];
    onChange({ projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange({ projects: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Projects</h2>
        <p className="mt-1 text-sm text-slate-600">
          Highlight your best work with details, links, and tech stacks.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-900">
                Project {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="inline-flex h-8 items-center justify-center rounded-md px-3 text-sm text-red-700 hover:bg-red-50 transition-colors"
                aria-label={`Remove project ${index + 1}`}
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Neural Canvas"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Image URL</label>
                <input
                  type="url"
                  value={project.image}
                  onChange={(e) => updateProject(index, 'image', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                placeholder="Describe what this project does and your impact..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Stack (comma separated)</label>
              <input
                type="text"
                value={project.stack.join(', ')}
                onChange={(e) =>
                  updateProject(
                    index,
                    'stack',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="React, TypeScript, Tailwind"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Repository URL</label>
                <input
                  type="url"
                  value={project.repoUrl || ''}
                  onChange={(e) => updateProject(index, 'repoUrl', e.target.value || undefined)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Demo URL</label>
                <input
                  type="url"
                  value={project.demoUrl || ''}
                  onChange={(e) => updateProject(index, 'demoUrl', e.target.value || undefined)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://demo.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addProject}
        className="inline-flex h-10 items-center justify-center rounded-md border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
      >
        + Add Project
      </button>
    </div>
  );
}
