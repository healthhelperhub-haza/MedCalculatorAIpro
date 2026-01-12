
export enum Category {
  GENERAL = 'General',
  RENAL = 'Renal',
  CARDIO = 'Cardiovascular',
  PEDS = 'Pediatric',
  EMERGENCY = 'Emergency',
  PREGNANCY = 'Pregnancy',
  NEURO = 'Neurology',
  METABOLIC = 'Metabolic',
  AI = 'AI Assistant',
  HISTORY = 'Saved Records',
  SETTINGS = 'Settings'
}

export interface Calculator {
  id: string;
  name: string;
  category: Category;
  description: string;
}

export interface CalculationResult {
  value: number | string;
  unit: string;
  interpretation?: string;
  severity?: 'normal' | 'warning' | 'critical';
}

export interface SavedCalculation {
  id: string;
  patientRef: string;
  calculatorName: string;
  result: string;
  unit: string;
  date: string;
  interpretation?: string;
  aiBrief?: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type AppView = 'dashboard' | 'history' | 'privacy' | 'settings';
