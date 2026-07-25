import { useApp } from '@/context/AppContext';
import { Wifi, Signal, Battery } from 'lucide-react';

export function StatusBar() {
  const { darkMode } = useApp();
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');

  return (
    <div className={`h-7 flex items-center justify-between px-6 text-xs font-semibold shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
      <span>{hours}:{mins}</span>
      <div className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={12} />
      </div>
    </div>
  );
}
