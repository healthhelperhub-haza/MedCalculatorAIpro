
import React, { useState, useEffect } from 'react';
import { SavedCalculation } from '../types';
import { Icons } from '../constants';
import { generateClinicalPDF } from '../services/pdf';

const HistoryView: React.FC = () => {
  const [history, setHistory] = useState<SavedCalculation[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('medcalc_history');
    if (data) setHistory(JSON.parse(data));
  }, []);

  const deleteEntry = (id: string) => {
    const newHistory = history.filter(h => h.id !== id);
    setHistory(newHistory);
    localStorage.setItem('medcalc_history', JSON.stringify(newHistory));
  };

  const handleDownloadPDF = async (item: SavedCalculation) => {
    try {
      await generateClinicalPDF(item);
    } catch (e) {
      console.error("PDF download failed", e);
    }
  };

  const clearHistory = () => {
    if (window.confirm('Clear all saved patient records?')) {
      setHistory([]);
      localStorage.removeItem('medcalc_history');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Patient Records</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Locally saved calculations and clinical reports.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-2 uppercase tracking-widest"
          >
            <Icons.Trash /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-4">
            <Icons.History />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No saved records found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs">Run a calculation and save it to patient records to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-[10px] font-bold uppercase">
                      {item.calculatorName}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{item.patientRef}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{item.result}</span>
                    <span className="text-sm font-bold text-slate-400 dark:text-slate-500">{item.unit}</span>
                  </div>
                  {item.interpretation && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{item.interpretation}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownloadPDF(item)}
                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Icons.Download />
                  </button>
                  <button 
                    onClick={() => deleteEntry(item.id)}
                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Entry"
                  >
                    <Icons.Trash />
                  </button>
                </div>
              </div>
              
              {item.aiBrief && (
                <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">AI Clinical Note: "{item.aiBrief}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
