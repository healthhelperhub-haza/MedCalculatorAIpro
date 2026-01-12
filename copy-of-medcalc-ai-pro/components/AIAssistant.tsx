
import React, { useState } from 'react';
import { analyzeMedicalOrder } from '../services/gemini';
import { Icons } from '../constants';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const result = await analyzeMedicalOrder(query);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Icons.Brain />
      </div>

      <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
        <span className="p-2 bg-blue-500 rounded-lg"><Icons.Brain /></span>
        Med-AI Clinical Reasoning
      </h3>
      <p className="text-slate-400 mb-6 text-sm">
        Enter complex dosing orders (e.g., "Dopamine 5mcg/kg/min for 85kg patient, concentration 400mg in 250ml D5W")
      </p>

      <div className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type or paste medical order details here..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 h-32 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
        />
        
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>Analyze Complex Order</>
          )}
        </button>
      </div>

      {analysis && !analysis.error && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-2">Calculated Result</h4>
            <p className="text-2xl font-bold text-white">{analysis.resultValue}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-slate-400 font-bold uppercase text-xs tracking-widest mb-3">Calculations</h4>
              <ul className="space-y-2">
                {analysis.calculationSteps.map((step: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-blue-500 font-mono">[{i + 1}]</span> {step}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-3">Clinical Warnings</h4>
              <ul className="space-y-2">
                {analysis.warnings.map((warning: string, i: number) => (
                  <li key={i} className="flex gap-2 text-sm text-amber-200/80 bg-amber-500/5 p-2 rounded border border-amber-500/10">
                    ⚠️ {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-slate-800 text-[10px] text-slate-500 uppercase tracking-widest">
            <span>AI Confidence: {(analysis.confidence * 100).toFixed(0)}%</span>
            <span>MedCalc Engine v1.2</span>
          </div>
        </div>
      )}

      {analysis?.error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
          {analysis.error}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
