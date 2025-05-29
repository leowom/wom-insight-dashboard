
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardContent from '../components/DashboardContent';
import TerapistiManagement from '../components/TerapistiManagement';
import PatientsManagement from '../components/PatientsManagement';
import AppSettersManagement from '../components/AppSettersManagement';
import ProspectTerapistiManagement from '../components/ProspectTerapistiManagement';
import LandingPagesManagement from '../components/LandingPagesManagement';
import Breadcrumb from '../components/Breadcrumb';

const Index = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPageTitle = (item: string) => {
    const titles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'terapisti': 'Gestione Terapisti',
      'pazienti': 'Gestione Pazienti',
      'app-setters': 'App Setters',
      'prospect': 'Prospect Management',
      'landing-pages': 'Landing Pages',
      'campagne': 'Gestione Campagne',
      'whatsapp-logs': 'WhatsApp Logs',
      'pagamenti': 'Sistema Pagamenti',
      'settings': 'Impostazioni'
    };
    return titles[item] || 'Dashboard';
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardContent />;
      case 'terapisti':
        return <TerapistiManagement />;
      case 'pazienti':
        return <PatientsManagement />;
      case 'app-setters':
        return <AppSettersManagement />;
      case 'prospect':
        return <ProspectTerapistiManagement />;
      case 'landing-pages':
        return <LandingPagesManagement />;
      default:
        return (
          <div className="space-y-6">
            <Breadcrumb items={[getPageTitle(activeItem)]} />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-4">{getPageTitle(activeItem)}</h2>
              <p className="text-gray-600">Contenuto per la sezione {getPageTitle(activeItem)}.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <Header 
        pageTitle={getPageTitle(activeItem)}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className="md:ml-80 pt-16">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
