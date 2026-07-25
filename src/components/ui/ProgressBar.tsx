import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, color = '#22c55e', height = 'md', showLabel = false, label, animated = true, className }: ProgressBarProps) {
  const percent = Math.min(Math.round((value / max) * 100), 100);
  const h = height === 'sm' ? 'h-1.5' : height === 'md' ? 'h-2.5' : 'h-3.5';
  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-500 font-medium">{label}</span>}
          {showLabel && <span className="text-xs font-semibold text-slate-700">{percent}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-100 rounded-full overflow-hidden', h)}>
        <div className={cn(h, 'rounded-full', animated && 'animate-pulse-slow')} style={{ width: `${percent}%`, backgroundColor: color, transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </div>
    </div>
  );
}
