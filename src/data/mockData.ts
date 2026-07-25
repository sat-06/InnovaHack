export interface Expense {
  id: string;
  amount: number;
  category: string;
  categoryIcon: string;
  merchant: string;
  date: string;
  paymentMode: string;
  status: 'completed' | 'pending' | 'flagged';
  note?: string;
}

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  target: number;
  saved: number;
  deadline: string;
  monthlyContribution: number;
  color: string;
  description: string;
}

export interface RoundUpItem {
  id: string;
  expense: string;
  amount: number;
  roundedAmount: number;
  roundUp: number;
  recommendation: string;
  aiExplanation: string;
  confidence: number;
  fundName: string;
}

export interface TwinScenario {
  id: string;
  name: string;
  emoji: string;
  description: string;
  monthlySavings: number;
  completionMonths: number;
  expectedSavings: number;
  investmentReturn: number;
  aiRecommendations: string[];
  riskLevel: 'low' | 'moderate' | 'high';
  color: string;
  bgColor: string;
}

export interface PortfolioHolding {
  id: string;
  name: string;
  type: string;
  amount: number;
  returns: number;
  returnsPercent: number;
  color: string;
}

export interface AiInsight {
  id: string;
  type: 'positive' | 'warning' | 'tip' | 'achievement';
  message: string;
  detail?: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  icon: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  date: string;
  time: string;
}

// ── User ────────────────────────────────────────────────────
export const userProfile = {
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  monthlyIncome: 85000,
  walletBalance: 28500,
  currency: 'INR',
  joinedDate: '2026-01-15',
};

// ── Expenses ────────────────────────────────────────────────
export const defaultExpenses: Expense[] = [
  { id: 'e1', amount: 185, category: 'Food & Dining', categoryIcon: '🍽️', merchant: 'Starbucks', date: '2026-07-26', paymentMode: 'UPI', status: 'completed', note: 'Morning latte & croissant' },
  { id: 'e2', amount: 960, category: 'Groceries', categoryIcon: '🛒', merchant: 'D-Mart', date: '2026-07-26', paymentMode: 'Credit Card', status: 'completed', note: 'Weekly groceries' },
  { id: 'e3', amount: 350, category: 'Entertainment', categoryIcon: '🎬', merchant: 'PVR Cinemas', date: '2026-07-25', paymentMode: 'UPI', status: 'completed', note: 'Oppenheimer IMAX' },
  { id: 'e4', amount: 245, category: 'Transport', categoryIcon: '🚗', merchant: 'Uber', date: '2026-07-25', paymentMode: 'UPI', status: 'completed' },
  { id: 'e5', amount: 2499, category: 'Shopping', categoryIcon: '🛍️', merchant: 'Amazon', date: '2026-07-24', paymentMode: 'Credit Card', status: 'completed', note: 'Kindle & books' },
  { id: 'e6', amount: 435, category: 'Food & Dining', categoryIcon: '🍽️', merchant: 'Swiggy', date: '2026-07-24', paymentMode: 'UPI', status: 'completed', note: 'Dinner order' },
  { id: 'e7', amount: 899, category: 'Healthcare', categoryIcon: '💊', merchant: 'Apollo Pharmacy', date: '2026-07-23', paymentMode: 'Debit Card', status: 'completed' },
  { id: 'e8', amount: 3200, category: 'Bills & Utilities', categoryIcon: '⚡', merchant: 'Tata Power', date: '2026-07-23', paymentMode: 'Net Banking', status: 'completed', note: 'Electricity bill' },
  { id: 'e9', amount: 15000, category: 'Rent', categoryIcon: '🏠', merchant: 'Rent Payment', date: '2026-07-22', paymentMode: 'Net Banking', status: 'completed', note: 'Monthly rent' },
  { id: 'e10', amount: 549, category: 'Subscriptions', categoryIcon: '📱', merchant: 'Netflix', date: '2026-07-22', paymentMode: 'Credit Card', status: 'completed' },
  { id: 'e11', amount: 2200, category: 'Shopping', categoryIcon: '🛍️', merchant: 'Myntra', date: '2026-07-21', paymentMode: 'UPI', status: 'completed', note: 'Summer dress' },
  { id: 'e12', amount: 599, category: 'Subscriptions', categoryIcon: '🎵', merchant: 'Spotify', date: '2026-07-20', paymentMode: 'Debit Card', status: 'completed' },
];

// ── Goals ───────────────────────────────────────────────────
export const defaultGoals: Goal[] = [
  { id: 'g1', name: 'MacBook Pro M4', emoji: '💻', target: 249900, saved: 145000, deadline: '2026-12-31', monthlyContribution: 15000, color: '#3b82f6', description: '16" M4 Pro for development work' },
  { id: 'g2', name: 'Emergency Fund', emoji: '🛡️', target: 300000, saved: 210000, deadline: '2027-03-31', monthlyContribution: 20000, color: '#22c55e', description: '6 months safety net' },
  { id: 'g3', name: 'Goa Vacation', emoji: '🏖️', target: 80000, saved: 32000, deadline: '2026-10-15', monthlyContribution: 8000, color: '#f59e0b', description: '5-day luxury trip' },
];

// ── Round-ups ───────────────────────────────────────────────
export const defaultRoundUps: RoundUpItem[] = [
  { id: 'r1', expense: 'Starbucks Coffee', amount: 185, roundedAmount: 200, roundUp: 15, recommendation: 'Invest ₹15 in Nifty 50 Index', aiExplanation: '15 coffee trips/month × ₹15 = ₹225 invested. At 12% CAGR over 5 years, this tiny habit builds ₹21,000.', confidence: 94, fundName: 'UTI Nifty 50 Index Fund' },
  { id: 'r2', expense: 'D-Mart Groceries', amount: 960, roundedAmount: 1000, roundUp: 40, recommendation: 'Invest ₹40 in Flexi Cap Fund', aiExplanation: 'You shop 4-5 times monthly. ₹40 × 4 = ₹160/month. At 14% over 10 years: ₹42,000 from spare grocery change.', confidence: 89, fundName: 'Parag Parikh Flexi Cap Fund' },
  { id: 'r3', expense: 'PVR Movie', amount: 350, roundedAmount: 400, roundUp: 50, recommendation: 'Invest ₹50 in Small Cap Fund', aiExplanation: 'Entertainment round-ups feel invisible. 2 movies/month × ₹50 = ₹100. Aggressive small-cap fund for long-term growth.', confidence: 91, fundName: 'SBI Small Cap Fund' },
  { id: 'r4', expense: 'Uber Ride', amount: 245, roundedAmount: 300, roundUp: 55, recommendation: 'Invest ₹55 in Mid Cap Fund', aiExplanation: 'Daily commute round-ups compound fast. 40 rides/month × ₹55 = ₹2,200/month in mid-cap growth.', confidence: 87, fundName: 'Mirae Asset Mid Cap Fund' },
  { id: 'r5', expense: 'Swiggy Order', amount: 435, roundedAmount: 500, roundUp: 65, recommendation: 'Invest ₹65 in Bluechip Fund', aiExplanation: '10 food orders/month × ₹65 = ₹650. Large-cap stability for guilt-free investing from guilty pleasures.', confidence: 92, fundName: 'Axis Bluechip Fund' },
];

// ── Financial Twin ──────────────────────────────────────────
export const defaultScenarios: TwinScenario[] = [
  {
    id: 's1', name: 'Current Path', emoji: '🚶', description: 'Continue with your current spending and saving patterns',
    monthlySavings: 18000, completionMonths: 21, expectedSavings: 378000, investmentReturn: 8.5,
    aiRecommendations: ['Food delivery is 22% above average for your bracket', 'Savings rate of 21% — not bad, room to grow', 'Switch to annual subscriptions to save ₹2,400/yr'],
    riskLevel: 'low', color: '#3b82f6', bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    id: 's2', name: 'AI Optimized', emoji: '🤖', description: 'AI-powered smart cutbacks with optimized investments',
    monthlySavings: 28000, completionMonths: 14, expectedSavings: 392000, investmentReturn: 12.5,
    aiRecommendations: ['Reduce food delivery by 30% — saves ₹3,500/month', 'Move ₹50K to liquid funds for +2% returns', 'Use UPI cashback — ₹800/month on bills', 'Annual insurance premium saves ₹2,400/yr'],
    riskLevel: 'moderate', color: '#22c55e', bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    id: 's3', name: 'Aggressive FIRE', emoji: '🔥', description: 'Maximum savings mode for early financial independence',
    monthlySavings: 42000, completionMonths: 9, expectedSavings: 378000, investmentReturn: 15.8,
    aiRecommendations: ['Cut all food delivery — meal prep saves ₹6,000', 'Carpool 3x/week — saves ₹2,500/month', 'Cancel overlapping subscriptions', '100% round-ups into growth funds', 'Freelance weekends: +₹10K potential'],
    riskLevel: 'high', color: '#f59e0b', bgColor: 'bg-amber-50 dark:bg-amber-950',
  },
];

// ── Portfolio ───────────────────────────────────────────────
export const defaultPortfolio = {
  walletBalance: 28500,
  investedAmount: 175000,
  totalReturns: 23450,
  returnsPercent: 13.4,
  holdings: [
    { id: 'h1', name: 'Nifty 50 Index', type: 'Large Cap', amount: 65000, returns: 8450, returnsPercent: 14.9, color: '#3b82f6' },
    { id: 'h2', name: 'Parag Parikh Flexi', type: 'Flexi Cap', amount: 45000, returns: 5850, returnsPercent: 14.9, color: '#22c55e' },
    { id: 'h3', name: 'Mirae Emerging', type: 'Mid Cap', amount: 35000, returns: 5600, returnsPercent: 19.0, color: '#f59e0b' },
    { id: 'h4', name: 'SBI Small Cap', type: 'Small Cap', amount: 20000, returns: 2400, returnsPercent: 13.6, color: '#8b5cf6' },
    { id: 'h5', name: 'Axis Bluechip', type: 'Large Cap', amount: 10000, returns: 1150, returnsPercent: 12.9, color: '#06b6d4' },
  ],
};

// ── Dashboard ───────────────────────────────────────────────
export const dashboardStats = {
  totalSpending: 29457, todaySpending: 1140, monthlySavings: 18000,
  investmentGrowth: 13.4, spendingChange: -4.2, savingsChange: 12.5,
  growthChange: 2.1, todayChange: -18.3,
};

// ── Transactions ────────────────────────────────────────────
export const recentTransactions: Transaction[] = [
  { id: 'tx1', merchant: 'Starbucks', icon: '☕', amount: 185, type: 'debit', category: 'Food', date: '2026-07-26', time: '08:30 AM' },
  { id: 'tx2', merchant: 'D-Mart', icon: '🛒', amount: 960, type: 'debit', category: 'Groceries', date: '2026-07-26', time: '02:15 PM' },
  { id: 'tx3', merchant: 'Salary — TechCorp', icon: '💰', amount: 85000, type: 'credit', category: 'Salary', date: '2026-07-25', time: '09:00 AM' },
  { id: 'tx4', merchant: 'PVR Cinemas', icon: '🎬', amount: 350, type: 'debit', category: 'Entertainment', date: '2026-07-25', time: '07:00 PM' },
  { id: 'tx5', merchant: 'Uber', icon: '🚗', amount: 245, type: 'debit', category: 'Transport', date: '2026-07-25', time: '10:30 AM' },
  { id: 'tx6', merchant: 'Amazon', icon: '📦', amount: 2499, type: 'debit', category: 'Shopping', date: '2026-07-24', time: '04:45 PM' },
  { id: 'tx7', merchant: 'Freelance — Upwork', icon: '💼', amount: 25000, type: 'credit', category: 'Freelance', date: '2026-07-23', time: '11:00 AM' },
  { id: 'tx8', merchant: 'Zomato', icon: '🍕', amount: 435, type: 'debit', category: 'Food', date: '2026-07-23', time: '08:30 PM' },
];

// ── Charts ──────────────────────────────────────────────────
export const categorySpending = [
  { name: 'Food', value: 4200, color: '#22c55e' }, { name: 'Groceries', value: 3800, color: '#3b82f6' },
  { name: 'Shopping', value: 4699, color: '#f59e0b' }, { name: 'Transport', value: 3200, color: '#8b5cf6' },
  { name: 'Bills', value: 3200, color: '#ef4444' }, { name: 'Entertainment', value: 1800, color: '#06b6d4' },
  { name: 'Health', value: 899, color: '#ec4899' }, { name: 'Subscriptions', value: 1148, color: '#84cc16' },
];

export const monthlySpending = [
  { month: 'Jan', spending: 32500 }, { month: 'Feb', spending: 29800 }, { month: 'Mar', spending: 34100 },
  { month: 'Apr', spending: 31000 }, { month: 'May', spending: 28000 }, { month: 'Jun', spending: 30500 }, { month: 'Jul', spending: 29457 },
];

export const savingsGrowth = [
  { month: 'Jan', savings: 45000, investments: 80000 }, { month: 'Feb', savings: 63000, investments: 92000 },
  { month: 'Mar', savings: 77000, investments: 105000 }, { month: 'Apr', savings: 97000, investments: 120000 },
  { month: 'May', savings: 119000, investments: 140000 }, { month: 'Jun', savings: 138000, investments: 158000 },
  { month: 'Jul', savings: 156000, investments: 175000 },
];

export const portfolioPerformance = [
  { month: 'Jan', value: 180000 }, { month: 'Feb', value: 185000 }, { month: 'Mar', value: 192000 },
  { month: 'Apr', value: 188000 }, { month: 'May', value: 198000 }, { month: 'Jun', value: 205000 }, { month: 'Jul', value: 198450 },
];

// ── AI Insights ─────────────────────────────────────────────
export const aiInsights: AiInsight[] = [
  { id: 'ai1', type: 'positive', message: 'You spent 18% less on food this week!', detail: 'Saved ~₹1,200 vs last week. Smart choices!', icon: '🎉', color: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800' },
  { id: 'ai2', type: 'tip', message: 'You can invest ₹35 from round-ups today', detail: '3 transactions qualify. Total spare change: ₹35', icon: '💡', color: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800' },
  { id: 'ai3', type: 'achievement', message: 'MacBook goal ahead by 2 months!', detail: 'If you cut food delivery by ₹1,000/month. ETA: Oct 2026', icon: '🏆', color: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800' },
  { id: 'ai4', type: 'warning', message: 'Subscriptions up 12% this month', detail: 'Netflix ₹549 + Spotify ₹599. Review unused ones.', icon: '⚠️', color: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800' },
  { id: 'ai5', type: 'tip', message: 'Move ₹50K to liquid funds → +₹3,200/yr', detail: 'Savings a/c: 3.5% vs Liquid funds: 7% returns', icon: '📈', color: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800' },
  { id: 'ai6', type: 'positive', message: 'Portfolio up 13.4% — beating Nifty 50!', detail: 'Outperforming by 2.1%. Star: Flexi Cap at 14.9%', icon: '🚀', color: 'bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-800' },
];

// ── Voice ───────────────────────────────────────────────────
export const voiceDemoTranscript = {
  raw: 'I spent 420 rupees on groceries at D-Mart yesterday using UPI',
  extracted: { amount: 420, merchant: 'D-Mart', category: 'Groceries', date: '2026-07-26', paymentMode: 'UPI' },
  confidence: 97, processingTime: '1.2s',
};

// Mock-prefixed re-exports for page compatibility
export const mockExpenses = defaultExpenses;
export const mockGoals = defaultGoals;
export const mockRoundUps = defaultRoundUps;
export type FinancialTwinScenario = TwinScenario;
export const mockScenarios = defaultScenarios;
export const mockPortfolio = defaultPortfolio;
export const mockDashboard = dashboardStats;
export const mockTransactions = recentTransactions;
export const mockInsights = aiInsights;
export const mockCategorySpending = categorySpending;
export const mockMonthlySpending = monthlySpending;
export const mockSavingsGrowth = savingsGrowth;
export const mockPortfolioPerformance = portfolioPerformance;
export const mockVoiceTranscript = voiceDemoTranscript;
export const mockUserProfile = userProfile;
