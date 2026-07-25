import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { fmtCurrency, fmtShortDate, cn } from '@/lib/utils';
import type { Expense } from '@/data/mockData';
import { Search, Plus, SlidersHorizontal, X, Trash2 } from 'lucide-react';

const categories = ['All', 'Food & Dining', 'Groceries', 'Entertainment', 'Transport', 'Shopping', 'Bills & Utilities', 'Healthcare', 'Subscriptions', 'Rent', 'Education'];

export function ExpensesPage() {
  const { expenses, addExpense, deleteExpense } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ amount: '', merchant: '', category: 'Food & Dining', paymentMode: 'UPI', note: '' });

  const filtered = useMemo(() => {
    let list = expenses;
    if (selectedCat !== 'All') list = list.filter(e => e.category === selectedCat);
    if (search) list = list.filter(e => e.merchant.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [expenses, selectedCat, search]);

  const totalFiltered = filtered.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!newExpense.amount || !newExpense.merchant) return;
    const e: Expense = {
      id: 'e' + Date.now(),
      amount: Number(newExpense.amount),
      merchant: newExpense.merchant,
      category: newExpense.category,
      categoryIcon: getIcon(newExpense.category),
      date: new Date().toISOString().split('T')[0],
      paymentMode: newExpense.paymentMode,
      status: 'completed',
      note: newExpense.note || undefined,
    };
    addExpense(e);
    setNewExpense({ amount: '', merchant: '', category: 'Food & Dining', paymentMode: 'UPI', note: '' });
    setShowForm(false);
  };

  return (
    <div className="px-4 pt-3 pb-4 space-y-4">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">Expenses</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{filtered.length} transactions · {fmtCurrency(totalFiltered)}</p>
        </div>
      </motion.div>

      {/* Search + Filter */}
      <GlassCard delay={0.05} className="!p-3">
        <div className="flex gap-2 items-center">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              type="text" placeholder="Search merchant or category..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-transparent text-sm w-full outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
            />
            {search && <button onClick={() => setSearch('')}><X size={14} className="text-slate-400" /></button>}
          </div>
          <button onClick={() => setShowForm(!showForm)} className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors', showForm ? 'bg-penny-green-500 text-white' : 'bg-penny-green-50 dark:bg-penny-green-900/20 text-penny-green-500')}>
            <Plus size={20} />
          </button>
        </div>

        {/* Category chips */}
        <div className="flex gap-1.5 mt-3 overflow-x-auto scrollbar-hide">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all',
                selectedCat === c ? 'bg-penny-green-500 text-white shadow-md shadow-penny-green-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Add Expense Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <GlassCard className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase">Amount (₹)</label>
                  <input type="number" placeholder="0" value={newExpense.amount} onChange={e => setNewExpense(p => ({ ...p, amount: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm outline-none border border-slate-100 dark:border-slate-700 focus:border-penny-green-500 transition-colors" />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase">Merchant</label>
                  <input type="text" placeholder="Starbucks" value={newExpense.merchant} onChange={e => setNewExpense(p => ({ ...p, merchant: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm outline-none border border-slate-100 dark:border-slate-700 focus:border-penny-green-500 transition-colors" />
                </div>
              </div>
              <div className="flex gap-3">
                <select value={newExpense.category} onChange={e => setNewExpense(p => ({ ...p, category: e.target.value }))}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm outline-none border border-slate-100 dark:border-slate-700">
                  {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={newExpense.paymentMode} onChange={e => setNewExpense(p => ({ ...p, paymentMode: e.target.value }))}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm outline-none border border-slate-100 dark:border-slate-700">
                  {['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <button onClick={handleAdd} className="w-full py-2.5 bg-penny-green-500 text-white rounded-xl text-sm font-bold active:scale-[0.98] transition-transform">
                Add Expense
              </button>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expense List */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 bg-white dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-100 dark:border-slate-700/50"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg shrink-0">
                {exp.categoryIcon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{exp.merchant}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{fmtShortDate(exp.date)} · {exp.paymentMode}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">-{fmtCurrency(exp.amount)}</p>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{exp.category}</span>
              </div>
              <button onClick={() => deleteExpense(exp.id)} className="p-1.5 text-slate-300 hover:text-red-400 transition-colors">
                <Trash2 size={15} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 dark:text-slate-500 text-sm">No expenses found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getIcon(cat: string): string {
  const map: Record<string, string> = { 'Food & Dining': '🍽️', Groceries: '🛒', Entertainment: '🎬', Transport: '🚗', Shopping: '🛍️', 'Bills & Utilities': '⚡', Healthcare: '💊', Subscriptions: '📱', Rent: '🏠', Education: '📚' };
  return map[cat] || '💳';
}
