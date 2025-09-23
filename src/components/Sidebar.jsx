import React from 'react';
import { ChevronRight, Home, Shield, ClipboardList, BookOpen, Bell, LogOut } from 'lucide-react';
import { useLanguage } from "../context/LanguageContext"; 
import { useAuth } from "../context/AuthContext";

export function Sidebar({ activeSection, setActiveSection, isOpen, setIsOpen }) {
  const { t } = useLanguage();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col space-y-4 z-50`}>
      <button 
        onClick={() => setIsOpen(false)} 
        className="absolute top-4 right-4 text-gray-600 lg:hidden"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex-1 overflow-y-auto">
        <nav className="mt-10">
          <button
            onClick={() => setActiveSection('dashboard')}
            className={`flex items-center w-full rounded-lg px-4 py-2 transition-colors ${activeSection === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Home className="h-5 w-5 mr-3" />
            <span>{t('dashboard')}</span>
          </button>

          <button
            onClick={() => setActiveSection('risk-assessment')}
            className={`flex items-center w-full rounded-lg mt-2 px-4 py-2 transition-colors ${activeSection === 'risk-assessment' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Shield className="h-5 w-5 mr-3" />
            <span>{t('risk_assessment')}</span>
          </button>
          
          <button
            onClick={() => setActiveSection('checklist')}
            className={`flex items-center w-full rounded-lg mt-2 px-4 py-2 transition-colors ${activeSection === 'checklist' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ClipboardList className="h-5 w-5 mr-3" />
            <span>{t('digital_checklist')}</span>
          </button>

          <button
            onClick={() => setActiveSection('training')}
            className={`flex items-center w-full rounded-lg mt-2 px-4 py-2 transition-colors ${activeSection === 'training' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            <span>{t('training_modules')}</span>
          </button>
          
          <button
            onClick={() => setActiveSection('alerts')}
            className={`flex items-center w-full rounded-lg mt-2 px-4 py-2 transition-colors ${activeSection === 'alerts' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Bell className="h-5 w-5 mr-3" />
            <span>{t('alerts')}</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full rounded-lg mt-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
}