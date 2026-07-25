import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { fmtCurrency } from '@/lib/utils';
import { Target, Calendar, PiggyBank, Sparkles } from 'lucide-react';

export function GoalsPage() {
  const { goals } = useApp();
  return (
    <div className="px-4 pt-3 pb-4 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}><h1 className="text-xl font-extrabold text-slate-800 dark:text-white">Savings Goals</h1><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Track your financial targets</p></motion.div>
      <GlassCard className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 shadow-xl shadow-amber-500/20"><div className="flex items-center justify-between"><div><p className="text-xs font-medium text-white/70 uppercase tracking-wider">Total Goal Progress</p><p className="text-2xl font-extrabold text-white mt-0.5">{fmtCurrency(goals.reduce((s: number, g: any) => s + g.saved, 0))}<span className="text-sm font-medium text-white/60"> / {fmtCurrency(goals.reduce((s: number, g: any) => s + g.target, 0))}</span></p></div><div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><Target size={22} className="text-white" /></div></div></GlassCard>
      <div className="space-y-4">{goals.map((goal, i) => { const percent = Math.round((goal.saved / goal.target) * 100); const remaining = goal.target - goal.saved; const monthsLeft = Math.ceil(remaining / goal.monthlyContribution); const deadline = new Date(goal.deadline); const monthsTotal = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30));
        return (<motion.div key={goal.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}><GlassCard className="overflow-hidden"><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: goal.color + '18' }}>{goal.emoji}</div><div className="flex-1"><h3 className="text-sm font-extrabold text-slate-800 dark:text-white">{goal.name}</h3><p className="text-[10px] text-slate-400 dark:text-slate-500">{goal.description}</p></div><span className="text-lg font-extrabold" style={{ color: goal.color }}>{percent}%</span></div>
          <ProgressBar value={goal.saved} max={goal.target} color={goal.color} height="lg" className="mb-3" />
          <div className="grid grid-cols-3 gap-2 mt-2"><div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><p className="text-[10px] text-slate-400 font-medium">Target</p><p className="text-xs font-bold text-slate-700 dark:text-slate-200">{fmtCurrency(goal.target)}</p></div><div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><p className="text-[10px] text-slate-400 font-medium">Saved</p><p className="text-xs font-bold" style={{ color: goal.color }}>{fmtCurrency(goal.saved)}</p></div><div className="text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><p className="text-[10px] text-slate-400 font-medium">Remaining</p><p className="text-xs font-bold text-slate-700 dark:text-slate-200">{fmtCurrency(remaining)}</p></div></div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50"><div className="flex items-center gap-1.5 text-[10px] text-slate-400"><Calendar size={12} /><span>ETA: {deadline.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span></div><div className="flex items-center gap-1.5 text-[10px] text-slate-400"><PiggyBank size={12} /><span>{fmtCurrency(goal.monthlyContribution)}/month</span></div></div>
          <div className="flex items-start gap-2 mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20"><Sparkles size={12} className="text-amber-500 shrink-0 mt-0.5" /><p className="text-[10px] text-amber-700 dark:text-amber-400 leading-relaxed">{monthsLeft <= monthsTotal ? "On track! You'll reach this goal in " + monthsLeft + " months — right on schedule." : "You're " + (monthsLeft - monthsTotal) + " months behind."}</p></div></GlassCard></motion.div>);
      })}</div>
    </div>
  );
}
