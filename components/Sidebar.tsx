import React from 'react';
import { LayoutGrid, CheckSquare, Settings, Activity, BarChart2 } from 'lucide-react';

interface SidebarProps {
  currentView: 'feed' | 'trends';
  onNavigate: (view: 'feed' | 'trends') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="w-20 h-screen bg-white border-l border-gray-200 flex flex-col items-center py-6 gap-6 z-10 shrink-0 shadow-sm">
      <div className="p-3 bg-gray-900 rounded-xl shadow-lg shadow-gray-900/20">
        <Activity className="w-6 h-6 text-white" />
      </div>

      <nav className="flex flex-col gap-4 w-full items-center">
        <button 
          onClick={() => onNavigate('feed')}
          className={`p-3.5 rounded-xl transition-all duration-200 group relative
            ${currentView === 'feed' 
              ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' 
              : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-lg">
            מרכז פעולה (Feed)
          </span>
        </button>
        
        <button 
          onClick={() => onNavigate('trends')}
          className={`p-3.5 rounded-xl transition-all duration-200 group relative
            ${currentView === 'trends' 
              ? 'bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-100' 
              : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
        >
          <BarChart2 className="w-6 h-6" />
          <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-opacity shadow-lg">
            מגמות וניתוח (Trends)
          </span>
        </button>

        <div className="w-10 h-px bg-gray-100 my-2"></div>

        <button className="p-3.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <Settings className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
};