import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, ArrowUpRight, Download, Calendar, ChevronDown, Clock, ArrowRight, Filter, Search, Table, FileSpreadsheet, Pencil, Save, X as XIcon } from 'lucide-react';

// Mock data for drill down view
const initialDrillDownData = [
  { id: '81900', type: 'חוסר תאימות', dept: 'רכב', tech: 'דניאל כהן', time: '10:42', status: 'פתוח' },
  { id: '66421', type: 'מניפולציית SLA', dept: 'רכב', tech: 'יוסי לוי', time: '08:15', status: 'בטיפול' },
  { id: '11094', type: 'סגירה ללא ניפוק', dept: 'נגמ"ש', tech: 'רונית אברהם', time: 'אתמול', status: 'סגור' },
  { id: '44521', type: 'חוסר תאימות', dept: 'קשר', tech: 'עמית סגל', time: 'אתמול', status: 'פתוח' },
  { id: '99212', type: 'דיוח חסר', dept: 'רכב', tech: 'דניאל כהן', time: '22/10', status: 'פתוח' },
  { id: '33121', type: 'חריגת זמנים', dept: 'חימוש', tech: 'אבי ביטון', time: '21/10', status: 'בטיפול' },
];

export const TrendsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [drillDownCategory, setDrillDownCategory] = useState<string | null>(null);
  
  // Editing State
  const [tableData, setTableData] = useState(initialDrillDownData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});

  const startEdit = (row: any) => {
    setEditingId(row.id);
    setEditValues({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = () => {
    setTableData(prev => prev.map(row => row.id === editingId ? { ...editValues } : row));
    setEditingId(null);
    setEditValues({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditValues((prev: any) => ({ ...prev, [field]: value }));
  };

  // --------------------------------------------------------------------------
  // RENDER: DRILL DOWN VIEW (Data Investigation)
  // --------------------------------------------------------------------------
  if (drillDownCategory) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-8 lg:p-10 no-scrollbar animate-in slide-in-from-rtl duration-300">
        
        {/* Drill Down Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDrillDownCategory(null)}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                תחקור נתונים: <span className="text-indigo-600">{drillDownCategory}</span>
              </h1>
              <p className="text-gray-500 font-medium text-sm flex items-center gap-2 mt-1">
                 <Clock className="w-3.5 h-3.5" />
                 טווח זמן: {timeRange}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 shadow-sm">
                <FileSpreadsheet className="w-4 h-4" />
                ייצוא לאקסל
             </button>
          </div>
        </div>

        {/* Drill Down Controls */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex justify-between items-center">
           <div className="relative w-96">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="סנן רשומות..." 
                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
           </div>
           <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>מציג {tableData.length} רשומות</span>
           </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden pb-10">
           <table className="w-full text-sm text-right">
             <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
               <tr>
                 <th className="px-4 py-4 font-medium">מס' צ'</th>
                 <th className="px-4 py-4 font-medium">סוג חריגה</th>
                 <th className="px-4 py-4 font-medium">מחלקה</th>
                 <th className="px-4 py-4 font-medium">טכנאי אחראי</th>
                 <th className="px-4 py-4 font-medium">זמן זיהוי</th>
                 <th className="px-4 py-4 font-medium">סטטוס</th>
                 <th className="px-4 py-4 font-medium w-24">פעולות</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {tableData.map((row, idx) => {
                 const isEditing = editingId === row.id;

                 return (
                   <tr key={idx} className={`transition-colors ${isEditing ? 'bg-indigo-50/50' : 'hover:bg-gray-50'}`}>
                     
                     {/* Vehicle ID */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <input 
                           value={editValues.id} 
                           onChange={(e) => handleInputChange('id', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                         />
                       ) : (
                         <span className="font-mono font-medium text-gray-900">{row.id}</span>
                       )}
                     </td>

                     {/* Type */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <input 
                           value={editValues.type} 
                           onChange={(e) => handleInputChange('type', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-indigo-500"
                         />
                       ) : (
                         <span className="text-gray-700">{row.type}</span>
                       )}
                     </td>

                     {/* Department */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <select 
                           value={editValues.dept} 
                           onChange={(e) => handleInputChange('dept', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-indigo-500"
                         >
                           <option value="רכב">רכב</option>
                           <option value='נגמ"ש'>נגמ"ש</option>
                           <option value="קשר">קשר</option>
                           <option value="חימוש">חימוש</option>
                         </select>
                       ) : (
                         <span className="text-gray-600">{row.dept}</span>
                       )}
                     </td>

                     {/* Technician */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <input 
                           value={editValues.tech} 
                           onChange={(e) => handleInputChange('tech', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-indigo-500"
                         />
                       ) : (
                         <span className="text-gray-600">{row.tech}</span>
                       )}
                     </td>

                     {/* Time */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <input 
                           value={editValues.time} 
                           onChange={(e) => handleInputChange('time', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                         />
                       ) : (
                         <span className="font-mono text-gray-500">{row.time}</span>
                       )}
                     </td>

                     {/* Status */}
                     <td className="px-4 py-4">
                       {isEditing ? (
                         <select 
                           value={editValues.status} 
                           onChange={(e) => handleInputChange('status', e.target.value)}
                           className="w-full px-2 py-1 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:border-indigo-500"
                         >
                           <option value="פתוח">פתוח</option>
                           <option value="בטיפול">בטיפול</option>
                           <option value="סגור">סגור</option>
                         </select>
                       ) : (
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                           ${row.status === 'פתוח' ? 'bg-orange-100 text-orange-700' : 
                             row.status === 'בטיפול' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}
                         `}>
                           {row.status}
                         </span>
                       )}
                     </td>

                     {/* Actions */}
                     <td className="px-4 py-4">
                       <div className="flex items-center gap-2">
                         {isEditing ? (
                           <>
                             <button 
                               onClick={saveEdit}
                               className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors"
                               title="שמור שינויים"
                             >
                               <Save className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={cancelEdit}
                               className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                               title="בטל"
                             >
                               <XIcon className="w-4 h-4" />
                             </button>
                           </>
                         ) : (
                           <button 
                             onClick={(e) => { e.stopPropagation(); startEdit(row); }}
                             className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                             title="ערוך רשומה"
                           >
                             <Pencil className="w-4 h-4" />
                           </button>
                         )}
                       </div>
                     </td>

                   </tr>
                 );
               })}
             </tbody>
           </table>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: MAIN DASHBOARD
  // --------------------------------------------------------------------------
  return (
    <div className="flex-1 overflow-y-auto bg-[#F3F4F6] p-8 lg:p-10 no-scrollbar">
      
      {/* Header Area */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">תמונת מצב אמינות וביצועים</h1>
          <p className="text-gray-500 font-medium text-sm">ניתוח מגמות ונתונים בזמן אמת</p>
        </div>

        {/* Splunk-Style Global Time Picker */}
        <div className="bg-white border border-gray-200 p-1 rounded-lg shadow-sm flex items-center self-start xl:self-auto">
           {/* Preset Button */}
           <div className="relative group border-l border-gray-100 pl-1">
             <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
               <Clock className="w-4 h-4 text-indigo-600" />
               <span>{timeRange}</span>
               <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
             </button>
             
             {/* Dropdown Menu (Simulated) */}
             <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                   {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'This Quarter'].map((t) => (
                     <button 
                        key={t}
                        onClick={() => setTimeRange(t)}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                     >
                       {t}
                     </button>
                   ))}
                </div>
             </div>
           </div>
           
           {/* Date Range Display */}
           <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 font-mono border-l border-transparent">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>01/10/2023 - 07/10/2023</span>
           </div>

           {/* Apply Button */}
           <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition-colors ml-1">
              <Search className="w-4 h-4" />
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div 
          onClick={() => setDrillDownCategory('ציון אמינות')}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-200 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              2.4%+ <ArrowUpRight className="w-3 h-3 mr-1" />
            </span>
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">ציון אמינות נתונים</h3>
          <div className="text-3xl font-mono font-bold text-gray-900 tracking-tight group-hover:text-indigo-900">64%</div>
        </div>

        <div 
          onClick={() => setDrillDownCategory('זיהום נתונים')}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-200 group"
        >
           <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="flex items-center text-[10px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
              3 חריגות
            </span>
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">זיהום נתונים (Data Debt)</h3>
          <div className="text-3xl font-mono font-bold text-gray-900 tracking-tight group-hover:text-indigo-900">12</div>
          <p className="text-xs font-medium text-gray-400 mt-2">ירידה של 4 מהשבוע שעבר</p>
        </div>

        <div 
          onClick={() => setDrillDownCategory('זמני תיקון')}
          className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-200 group"
        >
           <div className="flex justify-between items-start mb-6">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">זמן ממוצע לתיקון</h3>
          <div className="text-3xl font-mono font-bold text-gray-900 tracking-tight group-hover:text-indigo-900">2.4h</div>
          <p className="text-xs font-medium text-gray-400 mt-2">יעד: פחות מ-4 שעות</p>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Service Norms (Columns) */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-gray-900">חריגות מנורמות שירות</h3>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors" title="הורד נתונים">
              <Download className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-6 px-2">
            {[
              { label: 'אחזקה', value: 85, target: 90 },
              { label: 'לוגיסטיקה', value: 62, target: 90 },
              { label: 'בחינה', value: 94, target: 90 },
              { label: 'שינוע', value: 78, target: 85 },
              { label: 'מנהלה', value: 88, target: 90 },
            ].map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center w-full group cursor-pointer"
                onClick={() => setDrillDownCategory(`חריגות - ${item.label}`)}
              >
                <div className="relative w-full flex items-end justify-center h-48 bg-gray-50 rounded-xl border border-transparent group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-all">
                   {/* Target Line */}
                   <div 
                     className="absolute bottom-0 w-full border-t border-dashed border-gray-300 z-10 opacity-50" 
                     style={{ height: `${item.target}%` }}
                   ></div>
                   
                   {/* Value Bar */}
                   <div 
                     className={`w-3/5 rounded-t-lg transition-all duration-300 ease-out ${item.value < item.target ? 'bg-orange-500 group-hover:bg-orange-600' : 'bg-blue-600 group-hover:bg-blue-700'}`}
                     style={{ height: `${item.value}%` }}
                   ></div>
                   
                   {/* Tooltip */}
                   <div className="absolute -top-8 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 shadow-md pointer-events-none">
                      לחץ לתחקור
                   </div>
                </div>
                <span className="text-xs text-gray-500 mt-3 font-medium group-hover:text-indigo-600 transition-colors">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Anomaly Breakdown (Horizontal Bars) */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative">
           <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-gray-900">התפלגות סוגי חריגות</h3>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors" title="הורד נתונים">
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-6">
            {[
              { label: 'פתיחה חוזרת (Revolving Door)', count: 24, percent: 45, color: 'bg-rose-500' },
              { label: 'סתירה בין מערכות (ERP/Log)', count: 18, percent: 32, color: 'bg-orange-500' },
              { label: 'חריגת SLA', count: 8, percent: 15, color: 'bg-amber-400' },
              { label: 'דיווח טכני חסר', count: 4, percent: 8, color: 'bg-slate-400' },
            ].map((item, i) => (
              <div 
                key={i} 
                className="group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setDrillDownCategory(item.label)}
              >
                <div className="flex justify-between text-xs mb-2 px-1">
                  <span className="font-medium text-gray-700 group-hover:text-indigo-700">{item.label}</span>
                  <span className="text-gray-500 font-mono font-medium">{item.count} אירועים ({item.percent}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${item.color} group-hover:opacity-80 transition-opacity`} 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
             <h4 className="text-xs font-bold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                תובנת המערכת (AI Insight)
             </h4>
             <p className="text-xs text-gray-600 leading-relaxed">
               מזוהה עלייה של <span className="font-bold text-rose-600">15%</span> בחריגות מסוג "פתיחה חוזרת" במחלקת רכב. 
               הלחץ לעמוד בנורמות השירות גורם לסגירות פיקטיביות.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};