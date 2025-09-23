import React, { useState } from 'react';
import { Menu } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useLanguage } from '../../context/LanguageContext';
// import { LanguageSwitcher } from '../LanguageSwitcher';
import { Sidebar } from '../components/Sidebar';
import { DashboardOverview } from './DashboardOverview';
import { RiskAssessment } from './RiskAssessment';
import { DigitalChecklist } from './DigitalChecklist';
import { TrainingModules } from './TrainingModules';
import { AlertsPanel } from './AlertsPanel';

export function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'risk-assessment':
        return <RiskAssessment />;
      case 'checklist':
        return <DigitalChecklist />;
      case 'training':
        return <TrainingModules />;
      case 'alerts':
        return <AlertsPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {t('welcome_back')}, {user?.name}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {user?.farmName} • {user?.location}
                </p>
              </div>
            </div>

            <LanguageSwitcher />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}