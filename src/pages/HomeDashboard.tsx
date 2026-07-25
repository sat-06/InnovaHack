import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { dashboardStats, recentTransactions, categorySpending, monthlySpending, savingsGrowth, aiInsights } from '@/data/mockData';
import { getGreeting, fmtCurrency, fmtCompact, fmtShortDate, cn } from '@/lib/utils';
import { Wallet, TrendingDown, TrendingUp, PiggyBank, Plus, Mic, RefreshCw, Bot, Zap, ArrowUpRight, ArrowDownLeft, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

export function HomeDashboard() {
  const { userName, setActiveTab, darkMode, walletBalance } = useApp();
  const ds = dashboardStats;

  return (
    <div className="px-4 pt-3 pb-4 space-y-5">
      {/* ── Header ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{getGreeting()}</p>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
            {userName} <span className="text-base">👋</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Goals shortcut */}
          <button onClick={() => setActiveTab('goals')} className="w-9 h-9 rounded-full bg-penny-green-50 dark:bg-penny-green-900/20 flex items-center justify-center">
            <Target size={18} className="text-penny-green-500" />
          </button>
        </div>
      </motion.div>

      {/* ── Wallet Balance ────────────────── */}
      <GlassCard className="bg-gradient-to-br from-penny-green-500 to-penny-green-600 border-0 shadow-lg shadow-penny-green-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/70">Wallet Balance</p>
            <p className="text-3xl font-extrabold text-white mt-0.5">
              <AnimatedCounter value={walletBalance} prefix="₹" duration={1} />
            </p>
            <p className="text-xs text-white/60 mt-1">+₹2,450 this week</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Wallet size={22} className="text-white" />
          </div>
        </div>
      </GlassCard>

      {/* ── Quick Stats Grid ──────────────── */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Monthly Spending', val: fmtCurrency(ds.totalSpending), change: `${ds.spendingChange}%`, icon: <TrendingDown size={16} />, color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20', positive: false },
          { label: 'Monthly Savings', val: fmtCurrency(ds.monthlySavings), change: `+${ds.savingsChange}%`, icon: <PiggyBank size={16} />, color: 'text-penny-green-500 bg-penny-green-50 dark:bg-penny-green-900/20', positive: true },
          { label: 'Investment Growth', val: `${ds.investmentGrowth}%`, change: `+${ds.growthChange}%`, icon: <TrendingUp size={16} />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20', positive: true },
          { label: "Today's Spending", val: fmtCurrency(ds.todaySpending), change: `${ds.todayChange}%`, icon: <Zap size={16} />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20', positive: false },
        ].map((s, i) => (
          <GlassCard key={s.label} delay={i * 0.08} className="!p-3.5">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', s.color)}>{s.icon}</div>
            <p className="text-lg font-extrabold text-slate-800 dark:text-white">{s.val}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{s.label}</p>
            <span className={cn('text-[10px] font-bold mt-1 inline-block', s.positive ? 'text-penny-green-500' : 'text-rose-500')}>{s.change}</span>
          </GlassCard>
        ))}
      </div>

      {/* ── Quick Actions ─────────────────── */}
      <div>
        <SectionHeader title="Quick Actions" />
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { icon: <Plus size={18} />, label: 'Add Expense', action: () => setActiveTab('expenses'), bg: 'bg-penny-green-500' },
            { icon: <Mic size={18} />, label: 'Voice Entry', action: () => setActiveTab('voice'), bg: 'bg-blue-500' },
            { icon: <RefreshCw size={18} />, label: 'Round-Up', action: () => setActiveTab('expenses'), bg: 'bg-purple-500' },
            { icon: <Bot size={18} />, label: 'AI Twin', action: () => setActiveTab('twin'), bg: 'bg-amber-500' },
          ].map((a, i) => (
            <motion.button
              key={a.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              onClick={a.action}
              className={cn('shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-xs font-semibold shadow-md active:scale-95 transition-transform', a.bg)}
            >
              {a.icon} {a.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Category Pie Chart ────────────── */}
      <GlassCard noPad className="overflow-hidden">
        <div className="px-4 pt-4 pb-1">
          <SectionHeader title="Spending Breakdown" />
        </div>
        <div className="flex items-center">
          <div className="w-[55%] h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categorySpending} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                  {categorySpending.map((c, i) => (
                    <Cell key={c.name} fill={c.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} formatter={(v: any) => fmtCurrency(v as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-[45%] space-y-1.5 pr-4">
            {categorySpending.slice(0, 5).map(c => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{c.name}</span>
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 ml-auto">{fmtCompact(c.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── Monthly Spending Chart ────────── */}
      <GlassCard noPad className="overflow-hidden">
        <div className="px-4 pt-4 pb-1">
          <SectionHeader title="Monthly Spending Trend" />
        </div>
        <div className="h-[140px] px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlySpending}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} formatter={(v: any) => [fmtCurrency(v as number), 'Spending']} />
              <Area type="monotone" dataKey="spending" stroke="#22c55e" strokeWidth={2.5} fill="url(#spendGrad)" dot={{ r: 3, fill: '#22c55e', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#22c55e' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* ── Savings Growth ────────────────── */}
      <GlassCard noPad className="overflow-hidden">
        <div className="px-4 pt-4 pb-1">
          <SectionHeader title="Savings & Investments" />
        </div>
        <div className="h-[140px] px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsGrowth} barGap={0}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis hide />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} formatter={(v: any) => fmtCurrency(v as number)} />
              <Bar dataKey="savings" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="investments" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 pb-3 pt-1">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-penny-green-500" /><span className="text-[10px] text-slate-500 font-medium">Savings</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /><span className="text-[10px] text-slate-500 font-medium">Investments</span></div>
        </div>
      </GlassCard>

      {/* ── AI Insights ───────────────────── */}
      <div>
        <SectionHeader title="AI Insights" />
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          {aiInsights.slice(0, 4).map((insight, i) => (
            <GlassCard key={insight.id} delay={0.5 + i * 0.06} className={cn('shrink-0 w-[260px] border', insight.color)}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{insight.icon}</span>
                <div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">{insight.message}</p>
                  {insight.detail && <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">{insight.detail}</p>}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* ── Recent Transactions ───────────── */}
      <div>
        <SectionHeader title="Recent Transactions" action="View All" onAction={() => setActiveTab('expenses')} />
        <GlassCard noPad className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {recentTransactions.slice(0, 5).map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0',
                tx.type === 'credit' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-slate-100 dark:bg-slate-800'
              )}>
                {tx.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{tx.merchant}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{tx.date} · {tx.time}</p>
              </div>
              <div className="text-right">
                <p className={cn('text-sm font-bold', tx.type === 'credit' ? 'text-penny-green-500' : 'text-slate-800 dark:text-slate-200')}>
                  {tx.type === 'credit' ? '+' : '-'}{fmtCurrency(tx.amount)}
                </p>
                <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', tx.type === 'credit' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400')}>
                  {tx.category}
                </span>
              </div>
            </motion.div>
          ))}
        </GlassCard>
      </div>
    </div>
  );
}


