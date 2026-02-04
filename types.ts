export type Severity = 'high' | 'medium' | 'low';

export interface DataConflict {
  label: string;
  value: string;
  source: string;
  isMismatch?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string; // ISO or Display string
  time: string;
  label: string;
  status: 'completed' | 'pending' | 'warning';
}

export interface GraphData {
  type: 'bar' | 'comparison';
  title: string;
  items: {
    label: string;
    value: number;
    maxValue: number; // for bar width calculation
    color: string; // tailwind color class
    displayValue: string;
  }[];
  thresholdLabel?: string;
  thresholdValue?: number; // visual marker line
}

export interface Anomaly {
  id: string;
  vehicleId: string; // The Tsadik Number
  title: string;
  description: string; // Context
  severity: Severity;
  conflicts: DataConflict[];
  actionLabel: string;
  
  // Detail View Data
  isLemon: boolean; // "Revolving Door" / Recurring vehicle
  lemonContext?: string;
  timeline: TimelineEvent[];
  
  // Visual Evidence
  evidenceGraph?: GraphData;
}