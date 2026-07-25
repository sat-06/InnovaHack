import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { BottomNav } from './BottomNav';
import { StatusBar } from './StatusBar';

export function MobileLayout({ children }: { children: ReactNode }) {
  const { activeTab } = useApp();

  return (
    <div className="w-full max-w-[430px] h-screen max-h-screen bg-white dark:bg-slate-900 flex flex-col relative overflow-hidden shadow-2xl mx-auto">
      <StatusBar />
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}
