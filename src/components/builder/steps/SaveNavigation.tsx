import { cn } from '@/lib/utils';
import type { BuilderStep } from '@/types/portfolio';

interface SaveNavigationProps {
  steps: BuilderStep[];
  currentStepIndex: number;
  onPrev: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function SaveNavigation({
  steps,
  currentStepIndex,
  onPrev,
  onNext,
  isFirstStep,
  isLastStep,
}: SaveNavigationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 overflow-x-auto">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                if (index < currentStepIndex) onPrev();
                else if (index > currentStepIndex) onNext();
              }}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors',
                isActive && 'bg-slate-100 text-slate-900',
                !isActive && 'text-slate-600 hover:text-slate-900',
                isCompleted && 'text-slate-700'
              )}
              aria-current={isActive ? 'step' : undefined}
            >
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border text-xs',
                  isActive && 'border-slate-900 text-slate-900',
                  isCompleted && 'border-emerald-600 text-emerald-700',
                  !isActive && !isCompleted && 'border-slate-300 text-slate-500'
                )}
              >
                {isCompleted ? '✓' : index + 1}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirstStep}
          className={cn(
            'inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700',
            'hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          className={cn(
            'inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm',
            'text-white hover:bg-indigo-700'
          )}
        >
          {isLastStep ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}
