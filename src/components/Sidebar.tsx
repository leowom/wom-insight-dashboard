
import React from 'react';
import { 
  Home, 
  Users, 
  Building2, 
  Phone, 
  Target, 
  Globe, 
  BarChart3, 
  MessageSquare, 
  CreditCard, 
  Settings,
  X
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'terapisti', label: 'Terapisti', icon: Users, badge: '50' },
  { id: 'pazienti', label: 'Pazienti', icon: Building2 },
  { id: 'app-setters', label: 'App Setters', icon: Phone },
  { id: 'prospect', label: 'Prospect', icon: Target },
  { id: 'landing-pages', label: 'Landing Pages', icon: Globe },
  { id: 'campagne', label: 'Campagne', icon: BarChart3 },
  { id: 'whatsapp-logs', label: 'WhatsApp Logs', icon: MessageSquare },
  { id: 'pagamenti', label: 'Pagamenti', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-slate-800 text-white z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">WOM Consulting</h1>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-gray-400 hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700">
          <div className="text-xs text-slate-400">
            © 2024 WOM Consulting
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
