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
  type: 'zombie' | 'revolving' | 'skill' | 'logistic_mismatch' | 'data_integrity' | 'other';
  punchline: string; // The suspicion description
  conflicts?: DataConflict[]; // Optional now as we might just use punchline
  actionLabel: string;


  // Card Footer Data (Gray Section)
  department?: string;
  technician?: string;
  eventTime?: string;
  statusText?: string;

  // Detail View Data
  isLemon: boolean; // "Revolving Door" / Recurring vehicle
  lemonContext?: string;
  timeline: TimelineEvent[];

  // Visual Evidence
  evidenceGraph?: GraphData;
}

export interface SAPWorkOrder {
  // General Identifiers
  AUFNR: string; // Order Number
  QMEL: string; // Notification Number

  // Header Info
  AUART: string; // Order Type
  KTEXT: string; // Short Text
  STTXT: string; // System Status (REL, TECO, etc.)
  WARPL: string; // Maintenance Plan

  // Responsibility & Location
  INGRP: string; // Planner Group (Main Work Center/Manager)
  VAPLZ: string; // Main Work Center (Department, Vehicle)
  TPLNR: string; // Functional Location
  EQUNR: string; // Equipment Number
  BAUTL: string; // Assembly (Engine, Gear)

  // Dates (SLA)
  GSTRP: string; // Basic Start Date
  GLTRP: string; // Basic Finish Date
  GETRI: string; // Confirmed Finish Date
  FTRMI: string; // Release Date

  // Breakdown Data
  AUSVN: string; // Malfunction Start Date/Time
  AUSBS: string; // Malfunction End Date/Time
  MSAUS: number; // Breakdown Duration (Hours)
  BRKDWN: boolean; // Breakdown Indicator

  // Catalogs & Reasons
  FECOD: string; // Damage Code (What happened?)
  URCOD: string; // Cause Code (Why it happened?)
  PROBC: string; // Problem Code (Main problem)
  MNCOD: string; // Activity Code (What was done?)

  // Audit
  ERNAM: string; // Created By

  // Operations
  operations?: SAPOperation[];

  // Materials / Components
  components?: SAPComponent[];

  // Partners
  partners?: SAPPartner[];

  // Financials
  costs?: SAPCost;
}

export interface SAPOperation {
  operationNum: string; // 0010, 0020
  workCenter: string;
  description: string;
  plannedWork?: number;
  actualWork?: number;
  status?: string; // CNF, etc.
}

export interface SAPComponent {
  materialNum: string;
  description: string;
  quantityRequired: number;
  quantityWithdrawn: number;
  storageLocation?: string;
}

export interface SAPPartner {
  role: string; // Driver, Manager, Contact
  name: string;
  id?: string;
}

export interface SAPCost {
  plannedConfig: number; // Budget/Planned
  actual: number;
  currency: string;
}

export interface Technician {
  id: string; // Personal ID
  name: string;
  availability: 'AVAILABLE' | 'VACATION' | 'GUARD_DUTY' | 'SICK';
  skillLevel: 'CERTIFIED' | 'NOT_CERTIFIED' | 'EXPERT';
  department?: string;
}

export interface CompassWidget {
  id: string;
  type: 'trend' | 'bottleneck' | 'opportunity';
  title: string;
  value: string;
  metric?: string; // e.g., "-15%"
}