import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { defaultScenarios, defaultRoundUps } from '@/data/mockData';
import { fmtCurrency, cn } from '@/lib/utils';
import { Sparkles, TrendingUp, Clock, Shield, Zap, Target, Lightbulb } from 'lucide-react';

export function FinancialTwinPage() {
  const [activeScenario, setActiveScenario] = useState<string>('s2');
  const scenario = defaultScenarios.find(s => s.id === activeScenario)!;

  return (
    <div className="px-4 pt-3 pb-4 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">AI Financial Twin</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Simulate your financial future</p>
      </motion.div>
      <GlassCard className="bg-gradient-to-br from-purple-500 via-blue-500 to-penny-green-500 border-0 shadow-xl shadow-purple-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="relative z-10 flex items-center gap-4">
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">🤖</motion.div>
          <div><p className="text-sm font-bold text-white">Your AI Twin is Ready</p><p className="text-xs text-white/70 mt-0.5">Analyzed 847 transactions across 6 months</p></div>
        </div>
        <div className="relative z-10 mt-4 flex gap-2">
          <span className="text-[10px] font-semibold text-white/80 bg-white/15 px-2 py-1 rounded-full"><Sparkles size={10} className="inline mr-1" /> 3 scenarios</span>
          <span className="text-[10px] font-semibold text-white/80 bg-white/15 px-2 py-1 rounded-full"><TrendingUp size={10} className="inline mr-1" /> 97% accuracy</span>
        </div>
      </GlassCard>
      <div className="flex gap-2 overflow-x-auto" style={{scrollbarWidth:'none'}}>
        {defaultScenarios.map(s => (
          <motion.button key={s.id} whileTap={{ scale: 0.96 }} onClick={() => setActiveScenario(s.id)}
            className={cn('shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all', activeScenario === s.id ? 'text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700')}
            style={activeScenario === s.id ? { backgroundColor: s.color } : {}}>
            <span className="text-sm">{s.emoji}</span> {s.name}
          </motion.button>
        ))}
      </div>
      <motion.div key={scenario.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
        <GlassCard><p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">{scenario.name} — Stats</p><div className="grid grid-cols-2 gap-3">
          {[{ icon: <Clock size={16} />, label: 'Goal ETA', value: scenario.completionMonths + ' months', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },{ icon: <TrendingUp size={16} />, label: 'Monthly Savings', value: fmtCurrency(scenario.monthlySavings), color: 'text-penny-green-500 bg-penny-green-50 dark:bg-penny-green-900/20' },{ icon: <Target size={16} />, label: 'Expected Corpus', value: fmtCurrency(scenario.expectedSavings), color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },{ icon: <Zap size={16} />, label: 'Returns', value: scenario.investmentReturn + '% CAGR', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' }].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={cn('p-3 rounded-xl', s.color)}><div className="text-current opacity-60 mb-1">{s.icon}</div><p className="text-xs font-bold">{s.value}</p><p className="text-[10px] opacity-70">{s.label}</p></motion.div>
          ))}</div></GlassCard>
        <GlassCard><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-1.5"><Shield size={14} className={cn(scenario.riskLevel === 'low' ? 'text-green-500' : scenario.riskLevel === 'moderate' ? 'text-amber-500' : 'text-red-500')} /><span className="text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">{scenario.riskLevel} Risk</span></div><span className="text-[10px] font-semibold text-slate-400">{scenario.completionMonths} months</span></div><ProgressBar value={24 - scenario.completionMonths} max={24} color={scenario.color} height="lg" /></GlassCard>
        <GlassCard><div className="flex items-center gap-2 mb-3"><Lightbulb size={16} className="text-amber-400" /><p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">AI Recommendations</p></div><div className="space-y-2.5">{scenario.recommendations.map((rec, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"><span className="text-sm shrink-0 mt-0.5">💡</span><p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rec}</p></motion.div>))}</div></GlassCard>
      </motion.div>
      <div><div className="flex items-center justify-between mb-3"><p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Smart Round-Ups</p><span className="text-[10px] font-semibold text-penny-green-500">{defaultRoundUps.filter(r => r.confidence > 90).length} high-confidence</span></div>
        <div className="flex gap-3 overflow-x-auto pb-1" style={{scrollbarWidth:'none'}}>{defaultRoundUps.slice(0, 3).map((ru, i) => (<GlassCard key={ru.id} delay={0.3 + i * 0.06} className="shrink-0 w-[240px]"><div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold text-slate-400 uppercase">{ru.expense}</span><span className="text-[10px] font-bold text-penny-green-500 bg-penny-green-50 dark:bg-penny-green-900/20 px-1.5 py-0.5 rounded-full">{ru.confidence}%</span></div><div className="text-center py-2"><p className="text-2xl font-extrabold text-slate-800 dark:text-white"><span className="text-sm text-slate-400 line-through mr-1">{fmtCurrency(ru.amount)}</span>{fmtCurrency(ru.roundedAmount)}</p><p className="text-xs text-penny-green-500 font-bold mt-1">+{fmtCurrency(ru.roundUp)} to invest</p></div><p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed line-clamp-2">{ru.aiExplanation}</p></GlassCard>))}</div></div>
    </div>
  );
}
