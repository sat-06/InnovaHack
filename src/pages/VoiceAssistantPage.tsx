import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { voiceDemoTranscript } from '@/data/mockData';
import { fmtCurrency } from '@/lib/utils';
import type { Expense } from '@/data/mockData';
import { Mic, CheckCircle, Sparkles, Zap, Wallet, Store, Calendar, CreditCard, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VoiceAssistantPage() {
  const { addExpense } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extracted, setExtracted] = useState<any>(null);
  const [step, setStep] = useState<'idle' | 'listening' | 'processing' | 'done' | 'saved'>('idle');

  const startListening = useCallback(() => {
    setStep('listening'); setIsListening(true); setTranscript(''); setExtracted(null);
    setTimeout(() => {
      const words = voiceDemoTranscript.raw.split(' ');
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < words.length) { setTranscript(prev => (prev ? prev + ' ' : '') + words[idx]); idx++; }
        else { clearInterval(interval); setIsListening(false); setStep('processing');
          setTimeout(() => { setExtracted(voiceDemoTranscript.extracted); setStep('done'); }, 1500); }
      }, 120);
    }, 800);
  }, []);

  const handleSave = () => {
    if (!extracted) return;
    const exp: Expense = { id: 'v' + Date.now(), amount: extracted.amount, merchant: extracted.merchant, category: extracted.category, categoryIcon: '🛒', date: extracted.date, paymentMode: extracted.paymentMode, status: 'completed', note: 'Voice entry: ' + voiceDemoTranscript.raw };
    addExpense(exp); setStep('saved');
  };

  const handleReset = () => { setStep('idle'); setIsListening(false); setTranscript(''); setExtracted(null); };

  return (
    <div className="px-4 pt-3 pb-4 space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">Voice Assistant</h1>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Speak your expense naturally</p>
      </motion.div>
      <GlassCard className="flex flex-col items-center py-8 space-y-5">
        <AnimatePresence mode="wait">
          {step === 'listening' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 h-16">{Array.from({ length: 12 }).map((_, i) => (<motion.div key={i} className="w-1 bg-penny-green-400 rounded-full" animate={{ height: [8, Math.random() * 40 + 10, 8] }} transition={{ duration: 0.6 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.06 }} />))}</motion.div>)}
          {step === 'processing' && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-penny-green-500"><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Sparkles size={20} /></motion.div><span className="text-sm font-semibold">AI is processing...</span></motion.div>)}
          {step === 'saved' && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2"><motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }} className="w-16 h-16 rounded-full bg-penny-green-100 dark:bg-penny-green-900/30 flex items-center justify-center"><CheckCircle size={32} className="text-penny-green-500" /></motion.div><span className="text-sm font-bold text-penny-green-500">Expense Saved!</span></motion.div>)}
        </AnimatePresence>
        {step !== 'saved' && (<motion.button onClick={step === 'idle' ? startListening : undefined} disabled={step === 'listening' || step === 'processing'} whileTap={{ scale: 0.95 }} className={cn('relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300', step === 'listening' ? 'bg-red-500 shadow-lg shadow-red-500/30' : 'bg-penny-green-500 shadow-lg shadow-penny-green-500/30', step === 'idle' && 'hover:shadow-xl hover:scale-105')}>
          {step === 'listening' && (<><motion.div className="absolute inset-0 rounded-full bg-red-400/30" animate={{ scale: [1, 1.8], opacity: [0.5, 0] }} transition={{ duration: 1.2, repeat: Infinity }} /><motion.div className="absolute inset-0 rounded-full bg-red-400/20" animate={{ scale: [1, 1.5], opacity: [0.4, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} /></>)}<Mic size={28} className="text-white" /></motion.button>)}
        {step === 'idle' && <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Tap the mic and speak</p>}
        {step === 'listening' && <p className="text-sm text-red-400 font-semibold animate-pulse">Listening...</p>}
        {step === 'saved' && (<div className="flex gap-3"><button onClick={handleReset} className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold">New Entry</button></div>)}
      </GlassCard>
      <AnimatePresence>
        {transcript && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><GlassCard><p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-2">Transcript</p><p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed">"{transcript}"</p></GlassCard></motion.div>)}
        {(step === 'done' || step === 'saved') && extracted && (<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3"><GlassCard><div className="flex items-center justify-between mb-4"><p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Extracted Details</p><span className="text-[10px] font-semibold text-penny-green-500 bg-penny-green-50 dark:bg-penny-green-900/20 px-2 py-0.5 rounded-full">{voiceDemoTranscript.confidence}% confidence</span></div><div className="grid grid-cols-2 gap-3">{[{ icon: <Wallet size={15} />, label: 'Amount', value: fmtCurrency(extracted.amount) },{ icon: <Store size={15} />, label: 'Merchant', value: extracted.merchant },{ icon: <FolderOpen size={15} />, label: 'Category', value: extracted.category },{ icon: <CreditCard size={15} />, label: 'Payment', value: extracted.paymentMode },{ icon: <Calendar size={15} />, label: 'Date', value: extracted.date }].map(f => (<div key={f.label} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50"><div className="text-slate-400">{f.icon}</div><div><p className="text-[9px] text-slate-400 uppercase font-semibold">{f.label}</p><p className="text-xs font-bold text-slate-700 dark:text-slate-200">{f.value}</p></div></div>))}</div>{step === 'done' && <button onClick={handleSave} className="w-full mt-4 py-3 bg-penny-green-500 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2"><CheckCircle size={16} /> Save Expense</button>}</GlassCard></motion.div>)}
      </AnimatePresence>
      {(step === 'done' || step === 'saved') && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center"><p className="text-[10px] text-slate-400 flex items-center justify-center gap-1"><Zap size={10} className="text-amber-400" /> Processed in {voiceDemoTranscript.processingTime}</p></motion.div>}
    </div>
  );
}
