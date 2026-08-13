import { cn } from '@/lib/utils';

interface SaveIndicatorProps {
  status: 'saved' | 'saving' | 'unsaved';
}

export default function SaveIndicator({ status }: SaveIndicatorProps) {
  const config = {
    saved: { label: 'Saved', className: 'text-emerald-700' },
    saving: { label: 'Saving...', className: 'text-amber-700' },
    unsaved: { label: 'Unsaved changes', className: 'text-slate-600' },
  }[status];

  return (
    <div className={cn('flex items-center gap-2 text-xs', config.className)}>
      <span
        className={cn(
          'inline-block h-2 w-2 rounded-full',
          status === 'saving' && 'animate-pulse bg-amber-500',
          status === 'saved' && 'bg-emerald-500',
          status === 'unsaved' && 'bg-slate-400'
        )}
        aria-hidden="true"
      />
      <span>{config.label}</span>
    </div>
  );
}
