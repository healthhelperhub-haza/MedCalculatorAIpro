
import React from 'react';
import { Category } from './types';

export const Icons = {
  Stethoscope: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3Z"/><path d="M10 22v-2"/><path d="M7 22v-2"/><path d="M9 14h.01"/><path d="M13 14h.01"/><path d="M11 11.5V14"/><path d="M15 11.5V14"/><path d="M6 18h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/></svg>
  ),
  Activity: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
  ),
  Droplets: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z"/></svg>
  ),
  Baby: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 5 6.3"/><path d="M12 2.1a5 5 0 0 1 5 5v0a5 5 0 0 1-10 0v0a5 5 0 0 1 5-5z"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  FileText: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  )
};

export const CALCULATORS: any[] = [
  { id: 'bmi', name: 'BMI & Ideal Weight', category: Category.GENERAL, description: 'Body Mass Index and Devine formula ideal weight' },
  { id: 'bsa', name: 'BSA Calculator', category: Category.GENERAL, description: 'Body Surface Area using Mosteller formula' },
  { id: 'gfr', name: 'Creatinine Clearance', category: Category.RENAL, description: 'Cockcroft-Gault GFR estimation' },
  { id: 'anion', name: 'Anion Gap', category: Category.EMERGENCY, description: 'Serum Anion Gap for acidosis evaluation' },
  { id: 'iv', name: 'IV Drip Rate', category: Category.EMERGENCY, description: 'Infusion rate in drops per minute' },
  { id: 'peds-dose', name: 'Pediatric Dosing', category: Category.PEDS, description: 'Weight-based mg/kg calculations' },
  { id: 'edd', name: 'Pregnancy EDD', category: Category.PREGNANCY, description: 'Estimated Date of Delivery (Naegele’s)' },
  { id: 'gcs', name: 'GCS Score', category: Category.NEURO, description: 'Glasgow Coma Scale for acute trauma' },
  { id: 'map', name: 'MAP Calculator', category: Category.CARDIO, description: 'Mean Arterial Pressure calculation' },
  { id: 'cor-ca', name: 'Corrected Calcium', category: Category.METABOLIC, description: 'Adjusted for Serum Albumin levels' },
  { id: 'na-def', name: 'Sodium Deficit', category: Category.RENAL, description: 'Calculates mmol required for correction' },
  { id: 'fena', name: 'FENa', category: Category.RENAL, description: 'Fractional Excretion of Sodium' },
  { id: 'parkland', name: 'Parkland Formula', category: Category.EMERGENCY, description: 'Burn resuscitation fluid requirements' },
  { id: 'chads', name: 'CHA₂DS₂-VASc', category: Category.CARDIO, description: 'Atrial Fibrillation stroke risk' },
  { id: 'hasbled', name: 'HAS-BLED Score', category: Category.CARDIO, description: 'Major bleeding risk in AFib patients' },
  { id: 'curb65', name: 'CURB-65 Score', category: Category.EMERGENCY, description: 'Pneumonia mortality risk assessment' },
  { id: 'apgar', name: 'APGAR Score', category: Category.PEDS, description: 'Newborn health assessment at 1 & 5 min' },
  { id: 'maint-fluid', name: 'Maintenance Fluids', category: Category.PEDS, description: '4-2-1 rule hourly fluid requirement' },
  { id: 'ibw', name: 'Ideal Body Weight', category: Category.GENERAL, description: 'Devine, Miller, and Hamwi formulas' },
  { id: 'cor-na', name: 'Corrected Sodium', category: Category.METABOLIC, description: 'Sodium correction for hyperglycemia' },
  { id: 'water-def', name: 'Water Deficit', category: Category.METABOLIC, description: 'Free water deficit in hypernatremia' },
  { id: 'osmol-gap', name: 'Osmolal Gap', category: Category.METABOLIC, description: 'Measured vs Calculated osmolarity gap' },
  { id: 'bic-def', name: 'Bicarbonate Deficit', category: Category.METABOLIC, description: 'Amount of HCO3 needed to reach target' },
  { id: 'ldl', name: 'LDL (Friedewald)', category: Category.CARDIO, description: 'Calculated LDL cholesterol' },
  { id: 'qsofa', name: 'qSOFA Score', category: Category.EMERGENCY, description: 'Quick Sequential Organ Failure Assessment' },
  { id: 'sirs', name: 'SIRS Criteria', category: Category.EMERGENCY, description: 'Systemic Inflammatory Response Syndrome' },
  { id: 'wells-pe', name: 'Wells’ Criteria (PE)', category: Category.EMERGENCY, description: 'Pulmonary Embolism probability' },
  { id: 'wells-dvt', name: 'Wells’ Criteria (DVT)', category: Category.EMERGENCY, description: 'Deep Vein Thrombosis probability' },
  { id: 'meld', name: 'MELD Score', category: Category.RENAL, description: 'Model for End-Stage Liver Disease' },
  { id: 'nihss', name: 'NIH Stroke Scale', category: Category.NEURO, description: 'Simplified NIHSS for rapid assessment' },
  { id: 'ai-assist', name: 'Ask Med-AI', category: Category.AI, description: 'Analyze complex medical orders' }
];
