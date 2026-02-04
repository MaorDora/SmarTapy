import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Anomaly } from '../types';

interface AnomalyCardProps {
  anomaly: Anomaly;
  isSelected: boolean;
  onClick: () => void;
}

export const AnomalyCard: React.FC<AnomalyCardProps> = ({ anomaly, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        w-full p-5 md:p-6 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden
        ${isSelected 
          ? 'bg-white border-orange-200 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/20' 
          : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200'}
      `}
    >
      <div className="flex flex-col gap-4">
        {/* Header: Badge + Title */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <span className="inline-flex self-start items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium font-mono bg-gray-100 text-gray-700 border border-gray-200">
              {anomaly.vehicleId}
            </span>
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {anomaly.title}
            </h3>
            <p className="text-sm text-gray-500 font-light">
              {anomaly.description}
            </p>
          </div>
          
          {anomaly.severity === 'high' && (
             <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
          )}
        </div>

        {/* Conflict Data Area - Professional Grid */}
        <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-2 gap-4 border border-gray-100">
          {anomaly.conflicts.map((conflict, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">
                {conflict.source}: {conflict.label}
              </span>
              <span className={`text-sm font-mono font-medium ${conflict.isMismatch ? 'text-gray-900' : 'text-gray-600'}`}>
                {conflict.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end pt-2">
          <button 
            className={`
              flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200
              ${isSelected
                ? 'bg-orange-50 text-orange-700 border border-orange-200 shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
            `}
          >
            {anomaly.actionLabel}
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};