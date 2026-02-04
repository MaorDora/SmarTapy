import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnomalyCard } from './components/AnomalyCard';
import { DetailPanel } from './components/DetailPanel';
import { TrendsDashboard } from './components/TrendsDashboard';
import { mockAnomalies } from './data/mockData';
import { Search, Filter, RefreshCw, ListTodo } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'trends'>('feed');
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);

  const selectedAnomaly = mockAnomalies.find(a => a.id === selectedAnomalyId) || null;

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-slate-800 font-sans overflow-hidden">
      
      {/* 1. Navigation Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      {/* 2. Content Area */}
      {currentView === 'feed' ? (
        <>
          <main className="flex-1 flex flex-col min-w-0 border-l border-gray-200 bg-[#F3F4F6]">
            
            {/* Header - Styled as an Action Center */}
            <header className="h-16 px-8 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex items-center justify-between shrink-0 sticky top-0 z-10">
              <div className="flex flex-col gap-0.5">
                 <div className="flex items-center gap-3">
                    <h1 className="text-base font-bold text-gray-900 tracking-tight">מרכז פעולה (Action Center)</h1>
                    <span className="flex items-center justify-center w-5 h-5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-md">3</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">ציון אמינות נתונים</span>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">64%</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-5">
                 <div className="hidden md:flex flex-col items-end mr-2 border-l pl-5 border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">שלום, שרון</span>
                    <span className="text-xs font-bold text-gray-900">מנהלת תפ"י</span>
                 </div>
                <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 hover:shadow-sm transition-all">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Task List Header */}
            <div className="px-8 pt-8 pb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                   <ListTodo className="w-5 h-5 text-gray-400" />
                   משימות לטיפול מיידי
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                   נמצאו <span className="font-bold text-gray-900">{mockAnomalies.length}</span> חריגות הדורשות התערבות ידנית.
                </p>
            </div>

            {/* Filters / Search Bar Area - Rounded LG */}
            <div className="px-8 py-2 flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="חיפוש לפי צ' או סוג חריגה..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
                <Filter className="w-3.5 h-3.5" />
                סינון
              </button>
            </div>

            {/* Scrollable Task List */}
            <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-3 no-scrollbar mt-4">
              {mockAnomalies.map((anomaly) => (
                <AnomalyCard 
                  key={anomaly.id}
                  anomaly={anomaly}
                  isSelected={selectedAnomalyId === anomaly.id}
                  onClick={() => setSelectedAnomalyId(anomaly.id)}
                />
              ))}
              
              {/* Empty State / End of list indicator */}
              <div className="text-center py-8">
                <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-3 opacity-50"></div>
                <p className="text-xs font-medium text-gray-400">אין משימות נוספות (You're all caught up)</p>
              </div>
            </div>
          </main>

          {/* 3. Detail Panel (Right Side in LTR code, Left visual in RTL) */}
          <aside className={`
            w-full md:w-[420px] lg:w-[450px] bg-white shadow-xl z-20 md:relative absolute inset-y-0 left-0
            transform transition-transform duration-300 ease-in-out
            ${selectedAnomalyId ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            ${!selectedAnomalyId && 'hidden md:block'} 
          `}>
            <DetailPanel 
              anomaly={selectedAnomaly} 
              onClose={() => setSelectedAnomalyId(null)} 
            />
          </aside>

          {/* Mobile Overlay */}
          {selectedAnomalyId && (
            <div 
              className="md:hidden fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-10"
              onClick={() => setSelectedAnomalyId(null)}
            ></div>
          )}
        </>
      ) : (
        <TrendsDashboard />
      )}
    </div>
  );
};

export default App;