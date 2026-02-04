import React, { useState } from 'react';
import { Anomaly } from '../types';
import { AlertOctagon, Activity, Clock, FileText, X, TrendingUp, Bot, Send, Sparkles, MessageSquare, Zap } from 'lucide-react';

interface DetailPanelProps {
  anomaly: Anomaly | null;
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ anomaly, onClose }) => {
  const [chatInput, setChatInput] = useState('');

  // --------------------------------------------------------------------------
  // RENDER: DEFAULT VIEW (AI Command Center - Futuristic, Minimal)
  // --------------------------------------------------------------------------
  if (!anomaly) {
    return (
      <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden relative">
        {/* Futuristic Background Decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white pointer-events-none"></div>

        {/* Minimal Header */}
        <div className="relative z-10 p-6 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-xs font-mono font-medium text-gray-400 tracking-widest uppercase">AI SYSTEM ONLINE</span>
           </div>
           <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <Bot className="w-4 h-4 text-gray-400" />
           </div>
        </div>

        {/* Main Content - Centered & Clean */}
        <div className="relative z-10 flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar">
          
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
             
             {/* Logo / Icon */}
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200 rotate-3">
                <Sparkles className="w-8 h-8 text-white" />
             </div>

             {/* Dynamic Insight - The "Terminal" Look */}
             <div className="w-full bg-white/80 backdrop-blur-md border border-indigo-100 rounded-xl p-6 shadow-sm text-right relative overflow-hidden group hover:shadow-md transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                   <Zap className="w-4 h-4 text-indigo-500" />
                   תובנה יומית
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  זוהה דפוס חריג: <span className="font-medium text-indigo-700">"סגירות פיקטיביות"</span> במחלקת רכב עלו ב-15% לקראת הסופ"ש. מומלץ לבדוק את יומני העבודה של יום חמישי.
                </p>
             </div>

             {/* Quick Actions Grid */}
             <div className="w-full grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all group">
                   <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 mb-2 transition-colors" />
                   <span className="text-xs font-medium text-gray-600">ניתוח מגמות</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all group">
                   <Activity className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 mb-2 transition-colors" />
                   <span className="text-xs font-medium text-gray-600">חריגות פתוחות</span>
                </button>
             </div>
          </div>

        </div>

        {/* Footer: Input Area - Sleek & Floating */}
        <div className="relative z-20 p-6 pt-2 bg-gradient-to-t from-white via-white to-transparent">
          <div className="relative group">
             <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
             <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="פקודה חדשה..." 
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
                />
                <button className="absolute left-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors">
                   <Send className="w-3.5 h-3.5" />
                </button>
             </div>
          </div>
          <p className="text-[10px] text-center text-gray-300 mt-3 font-mono tracking-wider">
             SECURE CONNECTION • DATA SANITIZER V2.0
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: SELECTED ANOMALY DETAIL VIEW (Standard Professional)
  // --------------------------------------------------------------------------
  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-start duration-300">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-start bg-white">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl font-mono font-medium text-gray-900 bg-gray-50 px-3 py-1 rounded-lg border border-gray-200">
              {anomaly.vehicleId}
            </span>
            {anomaly.severity === 'high' && (
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                <AlertOctagon className="w-3.5 h-3.5" />
                דחיפות גבוהה
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{anomaly.title}</h2>
        </div>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg">
           <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar">
        
        {/* Lemon / Car Fax Section */}
        {anomaly.isLemon && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-lg border border-red-100 shrink-0 shadow-sm">
                 <Activity className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">היסטוריית רכב (Car Fax)</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {anomaly.lemonContext}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual Evidence Graph */}
        {anomaly.evidenceGraph && (
          <div>
            <div className="flex items-center gap-2 mb-4 text-gray-400 px-1">
               <TrendingUp className="w-4 h-4" />
               <span className="text-xs font-bold tracking-wider uppercase">ראיות ויזואליות</span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
               <h4 className="text-sm font-bold text-gray-900 mb-6">{anomaly.evidenceGraph.title}</h4>
               <div className="space-y-5">
                 {anomaly.evidenceGraph.items.map((item, idx) => (
                   <div key={idx}>
                     <div className="flex justify-between text-xs mb-2 px-1">
                       <span className="text-gray-600 font-medium">{item.label}</span>
                       <span className="font-mono font-bold text-gray-900">{item.displayValue}</span>
                     </div>
                     <div className="w-full bg-gray-50 rounded-full h-2.5 overflow-hidden border border-gray-100">
                       <div 
                         className={`h-full rounded-full ${item.color}`} 
                         style={{ width: `${(item.value / item.maxValue) * 100}%` }}
                       ></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Detailed Conflict Table */}
        <div>
           <div className="flex items-center gap-2 mb-4 text-gray-400 px-1">
            <FileText className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">פרטי הסתירה</span>
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-right">
              <thead className="bg-gray-100 text-gray-500 text-xs font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-normal">מקור מידע</th>
                  <th className="px-6 py-3 font-normal">ערך מדווח</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {anomaly.conflicts.map((c, i) => (
                  <tr key={i} className={c.isMismatch ? 'bg-white' : 'bg-transparent'}>
                    <td className="px-6 py-3 text-gray-600">{c.source} ({c.label})</td>
                    <td className={`px-6 py-3 font-mono font-medium ${c.isMismatch ? 'text-gray-900' : 'text-gray-500'}`}>
                      {c.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-6 text-gray-400 px-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">ציר זמן אירועים</span>
          </div>
          
          <div className="relative border-r border-gray-200 mr-3 space-y-10">
            {anomaly.timeline.map((event, idx) => (
              <div key={event.id} className="relative pr-8 group">
                <div className={`
                  absolute -right-2 top-1 w-4 h-4 rounded-full border-[3px] border-white shadow-sm transition-all duration-300
                  ${event.status === 'completed' ? 'bg-gray-300' : event.status === 'warning' ? 'bg-orange-400' : 'bg-gray-100'}
                `}></div>
                
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-gray-400 font-mono">
                    {event.date} • {event.time}
                   </span>
                   <span className={`text-base font-medium ${event.status === 'warning' ? 'text-orange-700' : 'text-gray-700'}`}>
                    {event.label}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Action Button Sticky Footer */}
      <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
         <button className="w-full py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-3">
           <span>{anomaly.actionLabel}</span>
         </button>
      </div>
    </div>
  );
};