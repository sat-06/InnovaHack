import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  noPad?: boolean;
}

export function GlassCard({ children, className, onClick, delay = 0, noPad }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        'bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-700/50',
        'shadow-sm hover:shadow-md transition-shadow duration-300',
        onClick && 'cursor-pointer active:scale-[0.98]',
        !noPad && 'p-4',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
