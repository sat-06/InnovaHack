import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { defaultExpenses, defaultGoals, defaultRoundUps, userProfile, type Expense, type Goal } from '@/data/mockData';

interface AppState {
  expenses: Expense[];
  goals: Goal[];
  darkMode: boolean;
  activeTab: string;
  userName: string;
  walletBalance: number;
  addExpense: (e: Expense) => void;
  deleteExpense: (id: string) => void;
  updateGoal: (id: string, amount: number) => void;
  toggleDarkMode: () => void;
  setActiveTab: (t: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses);
  const [goals] = useState<Goal[]>(defaultGoals);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userName] = useState(userProfile.name);
  const [walletBalance] = useState(userProfile.walletBalance);

  const addExpense = useCallback((e: Expense) => {
    setExpenses(prev => [e, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const updateGoal = useCallback((_id: string, _amount: number) => {}, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  }, []);

  return (
    <AppContext.Provider value={{
      expenses, goals, darkMode, activeTab, userName, walletBalance,
      addExpense, deleteExpense, updateGoal, toggleDarkMode, setActiveTab,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp inside AppProvider');
  return ctx;
}
