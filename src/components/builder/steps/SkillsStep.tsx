import { useState } from 'react';
import type { Portfolio, Skill } from '@/types/portfolio';

interface SkillsStepProps {
  data: Portfolio;
  onChange: (updates: Partial<Portfolio>) => void;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function SkillsStep({ data, onChange }: SkillsStepProps) {
  const skills = data.skills;
  const [newCategory, setNewCategory] = useState('');

  const updateSkill = (index: number, field: keyof Skill, value: string | number | undefined) => {
    const updated = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange({ skills: updated });
  };

  const addSkill = () => {
    const updated = [...skills, { id: generateId(), name: '', level: 50, category: newCategory || undefined }];
    onChange({ skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    onChange({ skills: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Skills</h2>
        <p className="mt-1 text-sm text-slate-600">
          Showcase your technical abilities and expertise levels.
        </p>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div
            key={skill.id || index}
            className="rounded-lg border border-slate-200 bg-white p-4 space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
              <div className="sm:col-span-4 space-y-2">
                <label className="text-sm font-medium text-slate-900">Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="React"
                />
              </div>

              <div className="sm:col-span-4 space-y-2">
                <label className="text-sm font-medium text-slate-900">Category</label>
                <input
                  type="text"
                  value={skill.category || ''}
                  onChange={(e) => updateSkill(index, 'category', e.target.value || undefined)}
                  className="flex h-9 w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Frontend"
                />
              </div>

              <div className="sm:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-900">Level: {skill.level ?? 0}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level ?? 0}
                  onChange={(e) => updateSkill(index, 'level', Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="sm:col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="flex h-9 w-full items-center justify-center rounded-md border border-slate-300 text-sm text-red-700 hover:bg-red-50 transition-colors"
                  aria-label={`Remove ${skill.name || 'skill'}`}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={addSkill}
          className="inline-flex h-10 items-center justify-center rounded-md border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
        >
          + Add Skill
        </button>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:w-48"
          placeholder="Category for next skill"
        />
      </div>
    </div>
  );
}
