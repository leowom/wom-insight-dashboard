
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Home className="h-4 w-4" />
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          <span className={index === items.length - 1 ? 'text-gray-900 font-medium' : ''}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
