import { useApp } from '@/context/AppContext';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeDashboard } from '@/pages/HomeDashboard';
import { ExpensesPage } from '@/pages/ExpensesPage';
import { VoiceAssistantPage } from '@/pages/VoiceAssistantPage';
import { FinancialTwinPage } from '@/pages/FinancialTwinPage';
import { PortfolioPage } from '@/pages/PortfolioPage';
import { GoalsPage } from '@/pages/GoalsPage';

export default function App() {
  const { activeTab } = useApp();

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <HomeDashboard />;
      case 'expenses': return <ExpensesPage />;
      case 'voice': return <VoiceAssistantPage />;
      case 'twin': return <FinancialTwinPage />;
      case 'portfolio': return <PortfolioPage />;
      case 'goals': return <GoalsPage />;
      default: return <HomeDashboard />;
    }
  };

  return <MobileLayout>{renderPage()}</MobileLayout>;
}
