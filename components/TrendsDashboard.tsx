import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar, AreaChart, Area
} from 'recharts';
import { mockTrendsData } from '../data/mockData';
import { DrillDownModal } from './DrillDownModal';
import { TrendWidgetData } from '../types';
import { AlertTriangle, CheckCircle, Clock, AlertOctagon, TrendingUp, Users } from 'lucide-react';

// --- Chart Colors ---
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// --- Sub-Components for visualizations ---

const SimpleBarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
      <Tooltip
        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        cursor={{ fill: '#F3F4F6' }}
      />
      <Legend iconType="circle" />
      {/* Dynamic Bars based on keys excluding 'name' */}
      {Object.keys(data[0] || {}).filter(k => k !== 'name' && k !== 'fill').map((key, index) => (
        <Bar
          key={key}
          dataKey={key}
          fill={index === 0 ? '#3B82F6' : '#10B981'}
          radius={[4, 4, 0, 0]}
          barSize={20}
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

const GroupedBarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data} layout="vertical">
      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
      <XAxis type="number" hide />
      <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
      <Tooltip cursor={{ fill: 'transparent' }} />
      <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

const DonutChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ right: 0 }} />
    </PieChart>
  </ResponsiveContainer>
);

const TrendLineChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="actual" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorActual)" />
      <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" dot={false} strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
);

const RadialMetric = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height="100%">
    <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={data} startAngle={90} endAngle={-270}>
      <RadialBar

        background
        dataKey="value"
        cornerRadius={10}
        fill="#8884d8"
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-900">
        {data[0]?.value}%
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-xs fill-gray-500">
        נצילות
      </text>
    </RadialBarChart>
  </ResponsiveContainer>
);

const MetricCard = ({ data }: { data: any[] }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="text-5xl font-bold text-gray-900">{data[0]?.value}</div>
    <div className="text-sm text-gray-500 mt-2">{data[0]?.name}</div>
  </div>
);

const AlertList = ({ data }: { data: any[] }) => (
  <div className="flex flex-col gap-2 p-2 h-full overflow-auto custom-scrollbar">
    {data.map((item, idx) => (
      <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${item.alertLevel === 'high' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
        <div className="flex items-center gap-3">
          <AlertTriangle className={`w-5 h-5 ${item.alertLevel === 'high' ? 'text-red-500' : 'text-orange-500'}`} />
          <span className="text-sm font-medium text-gray-800">{item.name}</span>
        </div>
        <span className="text-lg font-bold text-gray-900">{item.count}</span>
      </div>
    ))}
  </div>
);

const SimpleList = ({ data }: { data: any[] }) => (
  <div className="flex flex-col gap-2 p-2 h-full overflow-auto">
    {data.map((item, idx) => (
      <div key={idx} className="flex justify-between items-center p-2 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-700">{item.name}</span>
        <span className="font-bold text-indigo-600">{item.value}</span>
      </div>
    ))}
  </div>
);


// --- Main Dashboard Component ---

export const TrendsDashboard: React.FC = () => {
  const [selectedWidget, setSelectedWidget] = useState<TrendWidgetData | null>(null);

  // State to track active view for each widget (widgetId -> viewKey)
  const [activeViews, setActiveViews] = useState<Record<string, string>>({});

  const handleViewChange = (widgetId: string, viewKey: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal
    setActiveViews(prev => ({ ...prev, [widgetId]: viewKey }));
  };

  const renderChart = (widget: TrendWidgetData) => {
    // Determine which data to show: active view data or default chartData
    const activeViewKey = activeViews[widget.id];
    let dataToShow = widget.chartData;

    if (activeViewKey && widget.availableViews) {
      const view = widget.availableViews.find(v => v.key === activeViewKey);
      if (view) dataToShow = view.data;
    }

    switch (widget.visualType) {
      case 'bar': return <SimpleBarChart data={dataToShow} />;
      case 'stacked_bar': return <GroupedBarChart data={dataToShow} />;
      case 'donut':
      case 'pie': return <DonutChart data={dataToShow} />;
      case 'line': return <TrendLineChart data={dataToShow} />;
      case 'metric_card': return <MetricCard data={dataToShow} />;
      case 'radial': return <RadialMetric data={dataToShow} />;
      case 'list': return <AlertList data={dataToShow} />;
      case 'alert': return <AlertList data={dataToShow} />;
      default: return <SimpleBarChart data={dataToShow} />;
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto p-8" dir="rtl">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">לוח בקרה ומגמות (Trends)</h1>
          <p className="text-sm text-gray-500 mt-1">סקירה מערכתית מבוססת נתונים</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
            ייצוא דו"ח
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {mockTrendsData.map((widget) => {
          const activeViewKey = activeViews[widget.id] || widget.availableViews?.[0]?.key;

          return (
            <div
              key={widget.id}
              onClick={() => setSelectedWidget(widget)}
              className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
              style={{
                gridColumn: ['planning_vs_execution', 'annual_planning'].includes(widget.id) ? 'span 2' : 'span 1',
                height: '320px'
              }}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-50 flex items-start justify-between bg-white z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm">{widget.title}</h3>
                </div>

                {/* View/Filter Toggles */}
                {widget.availableViews && (
                  <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5 z-20" onClick={(e) => e.stopPropagation()}>
                    {widget.availableViews.map(view => (
                      <button
                        key={view.key}
                        onClick={(e) => handleViewChange(widget.id, view.key, e)}
                        className={`px-2 py-0.5 text-[10px] font-medium rounded-md transition-all ${(activeViews[widget.id] === view.key || (!activeViews[widget.id] && widget.availableViews![0].key === view.key))
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:bg-gray-200'
                          }`}
                      >
                        {view.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Hover Hint (Only show if no toggle exists to avoid clutter) */}
                {!widget.availableViews && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-gray-900 text-white px-2 py-1 rounded">
                    לחץ לפירוט
                  </div>
                )}
              </div>

              {/* Chart Area */}
              <div className="flex-1 p-4 w-full h-full min-h-0">
                {renderChart(widget)}
              </div>

              {/* Description Footer */}
              <div className="bg-gray-50 p-3 text-xs text-gray-500 border-t border-gray-100 truncate">
                {widget.description}
              </div>
            </div>
          )
        })}
      </div>

      {/* Drill Down Modal */}
      {selectedWidget && (
        <DrillDownModal
          isOpen={!!selectedWidget}
          onClose={() => setSelectedWidget(null)}
          title={selectedWidget.title}
          data={selectedWidget.drillDownData}
          columns={selectedWidget.drillDownColumns}
          editableField={selectedWidget.editableField}
        />
      )}
    </div>
  );
};