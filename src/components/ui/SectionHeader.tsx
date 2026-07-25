import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
  className?: string;
}

export function SectionHeader({ title, action, onAction, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-center justify-between mb-3', className)}
    >
      <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-penny-green-500 hover:text-penny-green-600 transition-colors">
          {action}
        </button>
      )}
    </motion.div>
  );
}
