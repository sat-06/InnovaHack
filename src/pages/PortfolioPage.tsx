import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { defaultPortfolio, portfolioPerformance } from '@/data/mockData';
import { fmtCurrency, cn } from '@/lib/utils';
import { Wallet, TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function PortfolioPage() {
  const p = defaultPortfolio;
  const totalValue = p.walletBalance + p.investedAmount + p.totalReturns;

  return (
    <div className="px-4 pt-3 pb-4 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">Portfolio</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Your wealth at a glance</p>
      </motion.div>
      <GlassCard className="bg-gradient-to-br from-blue-600 to-blue-500 border-0 shadow-xl shadow-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Total Portfolio Value</p>
            <p className="text-3xl font-extrabold text-white mt-1"><AnimatedCounter value={totalValue} prefix="₹" duration={1.2} /></p>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1"><ArrowUpRight size={12} /> +{p.returnsPercent}% all time</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"><TrendingUp size={22} className="text-white" /></div>
        </div>
      </GlassCard>
      <div className="grid grid-cols-3 gap-3">
        {[{ label: 'Wallet', value: fmtCurrency(p.walletBalance), icon: <Wallet size={15} />, color: 'text-penny-green-500 bg-penny-green-50 dark:bg-penny-green-900/20' },{ label: 'Invested', value: fmtCurrency(p.investedAmount), icon: <PieChart size={15} />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },{ label: 'Returns', value: fmtCurrency(p.totalReturns), icon: <TrendingUp size={15} />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' }].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
            <GlassCard className="!p-3 text-center">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5', s.color)}>{s.icon}</div>
              <p className="text-sm font-extrabold text-slate-800 dark:text-white">{s.value}</p>
              <p className="text-[10px] text-slate-400 font-medium">{s.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <GlassCard noPad className="overflow-hidden">
        <div className="px-4 pt-4 pb-2"><p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Holdings</p></div>
        <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {p.holdings.map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }} className="px-4 py-3 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: h.color }} />
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{h.name}</p><p className="text-[10px] text-slate-400">{h.type} · {fmtCurrency(h.amount)}</p></div>
              <div className="text-right shrink-0"><p className="text-xs font-bold text-penny-green-500">+{fmtCurrency(h.returns)}</p><p className="text-[10px] text-penny-green-500">+{h.returnsPercent}%</p></div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
      <GlassCard noPad className="overflow-hidden">
        <div className="px-4 pt-4 pb-1"><p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Performance</p></div>
        <div className="h-[160px] px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioPerformance}>
              <defs><linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="100%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} /><YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} formatter={(v: any) => [fmtCurrency(v as number), 'Value']} />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2.5} fill="url(#portGrad)" dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="px-4 pb-3 text-center"><span className="text-[10px] font-semibold text-penny-green-500">+₹18,450 growth since January</span></div>
      </GlassCard>
    </div>
  );
}
