import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Anomaly } from '../types';

interface AnomalyCardProps {
  anomaly: Anomaly;
  isSelected: boolean;
  onClick: () => void;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({ anomaly, isSelected, onClick }) => {

  const getSeverityColor = () => {
    switch (anomaly.severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      default: return 'bg-blue-500';
    }
  };

  const getBorderColor = () => {
    switch (anomaly.severity) {
      case 'high': return 'border-red-200';
      case 'medium': return 'border-orange-200';
      default: return 'border-blue-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-xl border transition-all duration-200 cursor-pointer group text-right overflow-hidden
        ${isSelected
          ? 'bg-white shadow-md ring-1 ring-indigo-500 border-indigo-200'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}
      `}
    >
      {/* Severity Strip */}
      <div className={`absolute top-0 right-0 w-1.5 h-full ${getSeverityColor()}`} />

      <div className="mr-3"> {/* Offset for strip */}

        {/* Metadata Header */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 mb-1.5 uppercase tracking-wider">
          <span>הזמנה: <span className="font-bold text-gray-600">{anomaly.id}</span></span>
          <span className="text-gray-300">|</span>
          <span>צ': <span className="font-bold text-gray-600">{anomaly.vehicleId}</span></span>
        </div>

        {/* Title */}
        <div className="mb-2">
          <h3 className="text-sm font-bold text-gray-900 leading-tight">
            {anomaly.title}
          </h3>
        </div>

        {/* Punchline */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 font-normal">
          {anomaly.punchline}
        </p>

        {/* New Gray Data Section */}
        <div className="mt-4 -mr-3 -ml-4 -mb-4 bg-gray-50 border-t border-gray-100 p-3 flex items-center justify-between text-xs text-gray-500">
          {/* Right Side (Status & Time) */}
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[10px] text-gray-400">מערכת: {anomaly.statusText || 'סטטוס'}</span>
            <span className="font-bold text-gray-900 text-sm">{anomaly.eventTime || 'ללא שעה'}</span>
          </div>

          {/* Left Side (Tech & Action) */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] text-gray-400 text-right">
              טכנאי: {anomaly.technician || 'לא משויך'} <span className="text-gray-300">|</span> {anomaly.department || ''}
            </span>
            <button className="text-sm font-black text-gray-900 hover:text-indigo-600 transition-colors flex items-center gap-1 group/btn">
              {anomaly.actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};