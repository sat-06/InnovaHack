import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Receipt, Mic, Users, PieChart, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'expenses', icon: Receipt, label: 'Expenses' },
  { id: 'voice', icon: Mic, label: 'Voice' },
  { id: 'twin', icon: Users, label: 'AI Twin' },
  { id: 'portfolio', icon: PieChart, label: 'Money' },
];

export function BottomNav() {
  const { activeTab, setActiveTab, darkMode } = useApp();

  return (
    <nav className={cn(
      'absolute bottom-0 left-0 right-0 h-16 px-4 pb-2 flex items-end z-50',
      'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl',
      'border-t border-slate-100 dark:border-slate-800'
    )}>
      <div className="w-full flex items-center justify-around">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center gap-0.5 py-1 px-3 -mt-1"
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-penny-green-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: active ? 1.1 : 1, y: active ? -2 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={cn(
                    'transition-colors duration-200',
                    active ? 'text-penny-green-500' : darkMode ? 'text-slate-500' : 'text-slate-400'
                  )}
                />
              </motion.div>
              <span className={cn(
                'text-[10px] font-semibold transition-colors duration-200',
                active ? 'text-penny-green-500' : darkMode ? 'text-slate-500' : 'text-slate-400'
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
