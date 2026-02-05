import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AnomalyCard } from './components/AnomalyCard';
import { DetailPanel } from './components/DetailPanel';
import { TrendsDashboard } from './components/TrendsDashboard';
import { mockAnomalies } from './data/mockData';
import { CompassWidget } from './types';
import { Search, Filter, RefreshCw, ListTodo, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'feed' | 'trends'>('feed');
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string | null>(null);
  const [selectedCompassId, setSelectedCompassId] = useState<string | null>(null);

  const selectedAnomaly = mockAnomalies.find(a => a.id === selectedAnomalyId) || null;

  // Mock Compass Data
  const compassWidgets: CompassWidget[] = [
    {
      id: 'w1',
      type: 'trend',
      title: 'מגמה',
      value: 'ירידה של 15% בתפוקת מחלקת רכב',
      metric: 'down'
    },
    {
      id: 'w2',
      type: 'bottleneck',
      title: 'צוואר בקבוק',
      value: '8 הזמנות ממתינות למדחסים',
      metric: 'warn'
    },
    {
      id: 'w3',
      type: 'opportunity',
      title: 'הזדמנות',
      value: '3 טכנאים פנויים במחלקת נגררים',
      metric: 'idea'
    }
  ];

  const handleCompassClick = (id: string) => {
    setSelectedCompassId(id);
    setSelectedAnomalyId(null); // Deselect specific ticket
  };

  const handleAnomalyClick = (id: string) => {
    setSelectedAnomalyId(id);
    setSelectedCompassId(null); // Deselect analytical mode
  };

  return (
    <div dir="rtl" className="flex h-screen bg-[#F3F4F6] text-slate-800 font-sans overflow-hidden">

      {/* 1. Navigation Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      {/* 2. Content Area */}
      {currentView === 'feed' ? (
        <>
          {/* Main Feed Area - 65% Width */}
          <main className="flex-1 w-[65%] flex flex-col min-w-0 border-l border-gray-200 bg-[#F3F4F6]">

            {/* Header - ChaTene Action Center */}
            <header className="h-16 px-8 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex items-center justify-between shrink-0 sticky top-0 z-10">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">מרכז פעולה (Action Center)</h1>
                  <span className="flex items-center justify-center px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-md">
                    {mockAnomalies.length} משימות
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="hidden md:flex flex-col items-end mr-2 border-l pl-5 border-gray-100">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">שלום, שרון</span>
                  <span className="text-xs font-bold text-gray-900">מנהלת תפ"י</span>
                </div>
              </div>
            </header>

            {/* "The Compass" - Key Performance Indicators */}
            <div className="px-8 pt-6 pb-2">
              <div className="grid grid-cols-3 gap-4">
                {compassWidgets.map((widget) => {
                  const isActive = selectedCompassId === widget.id;
                  return (
                    <button
                      key={widget.id}
                      onClick={() => handleCompassClick(widget.id)}
                      className={`
                        relative p-4 rounded-xl border transition-all text-right group
                        ${isActive
                          ? 'bg-white ring-2 ring-indigo-600 border-transparent shadow-md'
                          : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-indigo-50' : 'bg-gray-50 group-hover:bg-indigo-50'}`}>
                          {widget.type === 'trend' && <TrendingDown className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />}
                          {widget.type === 'bottleneck' && <AlertTriangle className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />}
                          {widget.type === 'opportunity' && <Lightbulb className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-500'
                          }`}>
                          {widget.type === 'trend' ? '-15%' : widget.type === 'bottleneck' ? 'עיכוב' : 'פנוי'}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-gray-500 mb-0.5">{widget.title}</p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{widget.value}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Task List Header */}
            <div className="px-8 pt-6 pb-2">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-gray-400" />
                רשימת פעולות (Action List)
              </h2>
            </div>

            {/* Filters / Search Bar Area - Rounded LG */}
            <div className="px-8 py-2 flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="חיפוש לפי צ' או סוג חריגה..."
                  className="w-full pr-10 pl-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
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
                  onClick={() => handleAnomalyClick(anomaly.id)}
                />
              ))}

              <div className="text-center py-8">
                <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-3 opacity-50"></div>
                <p className="text-xs font-medium text-gray-400">אין משימות נוספות</p>
              </div>
            </div>
          </main>

          {/* 3. The Lab (Smart Assistant) - 35% Width (Left Side in RTL) */}
          <aside className="w-[35%] bg-white border-r border-gray-200 shadow-xl z-20 hidden md:block relative">
            <DetailPanel
              anomaly={selectedAnomaly}
              compassWidget={compassWidgets.find(w => w.id === selectedCompassId)}
              mode={selectedAnomalyId ? 'specific' : 'analytical'}
              onClose={() => {
                setSelectedAnomalyId(null);
                setSelectedCompassId(null);
              }}
            />
          </aside>
        </>
      ) : (
        <TrendsDashboard />
      )}
    </div>
  );
};

export default App;