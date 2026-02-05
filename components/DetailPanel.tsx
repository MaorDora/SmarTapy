import React, { useState } from 'react';
import { Anomaly, CompassWidget } from '../types';
import { AlertOctagon, Activity, Clock, FileText, X, TrendingUp, Bot, Send, Sparkles, MessageSquare, Zap, CheckCircle, ArrowLeft } from 'lucide-react';

interface DetailPanelProps {
  anomaly: Anomaly | null;
  compassWidget?: CompassWidget;
  mode: 'specific' | 'analytical';
  onClose: () => void;
}

export const DetailPanel: React.FC<DetailPanelProps> = ({ anomaly, compassWidget, mode, onClose }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'system', text: string, actions?: { label: string, response: string }[] }[]>([]);

  // Reset chat when widget changes
  React.useEffect(() => {
    if (compassWidget) {
      setChatHistory([{
        role: 'system',
        text: `שלום, אני כאן כדי לעזור לנתח את הנתונים. המערכת זיהתה ${compassWidget.value}. כיצד תרצה להתקדם?`,
        actions: [
          { label: 'למה זה קרה? (ניתוח סיבות)', response: 'הסיבות המרכזיות לירידה:\n1. 30% מהטכנאים בחופשת מחלה/בידוד.\n2. מחסור בחלפים קריטיים (מנועים) למשך 48 שעות.\n3. עלייה חריגה של 15% בכמות תקלות שבר.' },
          { label: 'איך לפתור את זה?', response: 'המלצות לביצוע מיידי:\n1. ניוד 2 טכנאים ממחלקת נגמ"ש לתגבור.\n2. ביצוע הזמנת חירום לחלפים חסרים.\n3. תעדוף משימות קריטיות בלבד ל-24 שעות הקרובות.' },
          { label: 'הצג טבלאות רלוונטיות', response: 'פותח דוח מפורט של זמני תקן מול ביצוע...' }
        ]
      }]);
    } else {
      setChatHistory([]);
    }
  }, [compassWidget]);

  const handleActionClick = (action: { label: string, response: string }) => {
    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: action.label },
      { role: 'system', text: action.response }
    ]);
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatHistory(prev => [
      ...prev,
      { role: 'user', text: chatInput },
      { role: 'system', text: 'אני עדיין לומד לענות על שאלות חופשיות. נסה להשתמש בכפתורים למעלה.' }
    ]);
    setChatInput('');
  };

  // --------------------------------------------------------------------------
  // MODE B: ANALYTICAL CHAT (Triggered by Compass OR Default)
  // --------------------------------------------------------------------------
  if (mode === 'analytical') {
    return (
      <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden relative dir-rtl">
        {/* Futuristic Background Decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white pointer-events-none"></div>

        {/* Header - Conditional based on Widget or Default */}
        {compassWidget ? (
          <div className="relative z-10 p-6 flex items-center justify-between border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{compassWidget.metric}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">ניתוח {compassWidget.title}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">{compassWidget.value}</h2>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="relative z-10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-xs font-mono font-medium text-gray-400 tracking-widest uppercase">AI SYSTEM ONLINE</span>
            </div>
            <div className="p-1.5 bg-gray-50 rounded-lg border border-gray-100">
              <Bot className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex-1 flex flex-col p-6 overflow-y-auto no-scrollbar">

          {compassWidget ? (
            /* Widget Specific Context */
            <div className="mb-8">
              <div className="w-full bg-white border border-indigo-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1 h-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  הקשר מיידי
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  הירידה בתפוקה קשורה ישירות ל-3 טכנאים הנמצאים בבידוד. השווה לחודש שעבר: <span className="font-bold text-red-500">-12%</span>.
                </p>
                {/* Mock Mini Chart */}
                <div className="mt-4 flex items-end gap-2 h-16 opacity-50">
                  <div className="w-8 bg-indigo-200 rounded-t h-[60%]"></div>
                  <div className="w-8 bg-indigo-200 rounded-t h-[80%]"></div>
                  <div className="w-8 bg-indigo-200 rounded-t h-[40%]"></div>
                  <div className="w-8 bg-indigo-500 rounded-t h-[30%]"></div>
                </div>
              </div>
            </div>
          ) : (
            /* Default AI Welcome */
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200 rotate-3">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="w-full bg-white/80 backdrop-blur-md border border-indigo-100 rounded-xl p-6 shadow-sm text-right relative overflow-hidden group hover:shadow-md transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-500" />
                  תובנה יומית
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  בוקר טוב שרון, המערכת זיהתה <span className="font-bold text-indigo-700">3 חריגות</span> הדורשות את תשומת ליבך.
                </p>
              </div>
            </div>
          )}

          {/* Prompt Starters / Chips */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {compassWidget ? 'שאלות נפוצות על המגמה' : 'פעולות מהירות'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(compassWidget
                ? ['מי הטכנאים המעכבים?', 'השווה לחודש שעבר', 'הצג התפלגות תקלות']
                : ['הצג סיכום יומי', 'נתח עומסים במחלקות', 'חפש חריגות חוזרות']
              ).map((chip, idx) => (
                <button key={idx} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors">
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 mt-8 space-y-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'system' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                  {msg.role === 'system' ? <Bot className="w-4 h-4" /> : <div className="text-xs font-bold">You</div>}
                </div>
                <div className={`p-3 rounded-2xl text-sm max-w-[80%] whitespace-pre-wrap ${msg.role === 'system'
                    ? 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tr-none'
                    : 'bg-indigo-600 text-white rounded-tl-none'
                  }`}>
                  {msg.text}
                  {/* Actions for System Messages */}
                  {msg.actions && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(action)}
                          className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Scroll Anchor */}
            <div id="chat-anchor"></div>
          </div>
        </div>

        {/* Footer: Input Area */}
        <div className="relative z-20 p-4 border-t border-gray-100 bg-white">
          <div className="relative flex items-center bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="שאל שאלה או תן פקודה..."
              className="w-full pl-4 pr-12 py-3 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              className="absolute left-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // MODE A: SPECIFIC TICKET (Triggered by Feed)
  // --------------------------------------------------------------------------
  if (mode === 'specific' && anomaly) {
    return (
      <div className="h-full bg-white border-r border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-start duration-300 dir-rtl font-sans">

        {/* Top Bar for Actions (Edit/View) */}
        <div className="px-6 py-2 flex justify-end gap-2 bg-gray-50 border-b border-gray-100">
          <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors">
            <FileText className="w-3 h-3" />
            צפה בפרטי הזמנה
          </button>
          <div className="w-px h-4 bg-gray-300 my-auto"></div>
          <button className="text-xs text-gray-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors">
            <Zap className="w-3 h-3" />
            ערוך נתונים ידנית
          </button>
        </div>

        {/* Main Content Scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar">

          {/* Header Section */}
          <div className="p-6 pb-2">
            {/* Badge Row */}
            <div className="flex justify-between items-center mb-3">
              <button onClick={onClose} className="p-1 -mr-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border ${anomaly.severity === 'high' ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold">דחיפות גבוהה</span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">
                  <span className="text-lg font-bold text-gray-900 font-mono tracking-tight">{anomaly.vehicleId}</span>
                  <span className="text-xs text-gray-400 font-medium">צ'</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-black text-gray-900 leading-tight mb-6 text-right">
              {anomaly.title}
            </h1>
          </div>

          <div className="px-6 space-y-8 pb-8">

            {/* 1. Visual Evidence Card */}
            {anomaly.evidenceGraph && (
              <section>
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">ראיות ויזואליות</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-right text-sm font-bold text-gray-900 mb-6 border-b border-gray-50 pb-2">
                    {anomaly.evidenceGraph.title}
                  </h3>
                  <div className="space-y-5">
                    {anomaly.evidenceGraph.items.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-xs font-bold text-gray-900">{item.displayValue}</span>
                          <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
                          <div
                            className={`absolute top-0 right-0 h-full rounded-full ${item.color}`}
                            style={{ width: `${(item.value / item.maxValue) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 2. Structured Data Table */}
            {anomaly.conflicts && anomaly.conflicts.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">פרטי הסתירה</span>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden text-right">
                  <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200">
                    <div className="p-3 text-xs text-gray-500 font-medium">ערך מדווח</div>
                    <div className="p-3 text-xs text-gray-500 font-medium border-l border-gray-200">מקור מידע</div>
                  </div>
                  {anomaly.conflicts.map((c, i) => (
                    <div key={i} className={`grid grid-cols-2 border-b border-gray-100 last:border-0 ${c.isMismatch ? 'bg-white' : ''}`}>
                      <div className={`p-4 text-sm font-mono ${c.isMismatch ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                        {c.value}
                      </div>
                      <div className="p-4 text-sm text-gray-600 border-l border-gray-100 flex items-center justify-end">
                        {c.source}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Timeline (If exists) */}
            {anomaly.timeline && anomaly.timeline.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-wider">ציר זמן אירועים</span>
                </div>
                <div className="relative pr-4 space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute top-2 bottom-2 right-[5px] w-px bg-gray-200"></div>

                  {anomaly.timeline.map((event, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      {/* Dot */}
                      <div className={`absolute top-1.5 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ring-1 ring-gray-200 z-10 ${event.status === 'warning' ? 'bg-orange-500 ring-orange-200' : 'bg-gray-400'
                        }`} />

                      <div className="mr-6 flex-1">
                        <div className="flex items-baseline justify-between mb-0.5">
                          <span className="text-xs text-gray-400 font-mono tracking-wide">{event.time} • {event.date}</span>
                        </div>
                        <h4 className={`text-sm font-bold ${event.status === 'warning' ? 'text-orange-700' : 'text-gray-700'}`}>
                          {event.label}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* Sticky Footer Action */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex gap-3">
          <button className="flex-1 py-3 bg-[#111827] hover:bg-black text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2">
            <span>{anomaly.actionLabel}</span>
          </button>
          <button className="px-4 py-3 bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 text-sm font-bold rounded-xl transition-all active:scale-[0.98]">
            התעלם
          </button>
        </div>

      </div>
    );
  }

  return null;
};