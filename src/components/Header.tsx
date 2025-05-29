
import React, { useState } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';

interface HeaderProps {
  pageTitle: string;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 right-0 left-0 md:left-80 z-10">
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo for mobile */}
        <div className="md:hidden">
          <h1 className="text-xl font-bold text-blue-600">WOM</h1>
        </div>

        {/* Page title */}
        <div className="hidden md:block">
          <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">Mario Rossi</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User className="h-4 w-4 mr-3" />
                Il mio profilo
              </button>
              <hr className="my-1" />
              <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
