
import React, { useState, useEffect } from 'react';
import * as logic from '../calculators/logic';
import { getClinicalBrief } from '../services/gemini';
import { generateClinicalPDF } from '../services/pdf';
import { Icons } from '../constants';
import { SavedCalculation } from '../types';

interface Props {
  id: string;
  name: string;
}

const CalculatorForm: React.FC<Props> = ({ id, name }) => {
  const [inputs, setInputs] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [brief, setBrief] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [patientRef, setPatientRef] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : parseFloat(e.target.value);
    setInputs({ ...inputs, [e.target.name]: val });
    setSaveStatus('idle');
  };

  const toggleCheck = (name: string, points: number) => {
    setInputs({ ...inputs, [name]: inputs[name] ? 0 : points });
    setSaveStatus('idle');
  };

  useEffect(() => {
    let res = null;
    try {
      const { 
        weight, height, age, creatinine, sbp, dbp, 
        na, cl, hco3, naSerum, naUrine, crSerum, crUrine, 
        ca, alb, tbsa, currentNa, targetNa, tc, hdl, tg, 
        bili, inr, glucose, currentHco3, targetHco3, 
        bun, measuredOsm, volume, timeHours, dropFactor 
      } = inputs;

      switch (id) {
        case 'bmi': if (weight && height) res = logic.calculateBMI(weight, height); break;
        case 'bsa': if (weight && height) res = logic.calculateBSA(weight, height); break;
        case 'gfr': if (age && weight && creatinine) res = logic.calculateGFR(age, weight, creatinine, !!inputs.isFemale); break;
        case 'map': if (sbp && dbp) res = logic.calculateMAP(sbp, dbp); break;
        case 'anion': if (na && cl && hco3) res = logic.calculateAnionGap(na, cl, hco3); break;
        case 'fena': if (naSerum && naUrine && crSerum && crUrine) res = logic.calculateFENa(naSerum, naUrine, crSerum, crUrine); break;
        case 'cor-ca': if (ca && alb) res = logic.calculateCorrectedCalcium(ca, alb); break;
        case 'parkland': if (weight && tbsa) res = logic.calculateParkland(weight, tbsa); break;
        case 'maint-fluid': if (weight) res = logic.calculateMaintFluid(weight); break;
        case 'na-def': if (weight && currentNa && targetNa) res = logic.calculateSodiumDeficit(weight, currentNa, targetNa, !!inputs.isFemale); break;
        case 'water-def': if (weight && currentNa) res = logic.calculateWaterDeficit(weight, currentNa, !!inputs.isFemale); break;
        case 'cor-na': if (na && glucose) res = logic.calculateCorrectedSodium(na, glucose); break;
        case 'bic-def': if (weight && currentHco3 && targetHco3) res = logic.calculateBicarbDeficit(weight, currentHco3, targetHco3); break;
        case 'osmol-gap': if (na && glucose && bun && measuredOsm) res = logic.calculateOsmolalGap(na, glucose, bun, measuredOsm); break;
        case 'iv': if (volume && timeHours) res = logic.calculateIVRate(volume, timeHours, dropFactor || 20); break;
        case 'ldl': if (tc && hdl && tg) res = logic.calculateLDL(tc, hdl, tg); break;
        case 'meld': if (creatinine && bili && inr) res = logic.calculateMELD(creatinine, bili, inr); break;
        case 'chads':
        case 'hasbled':
        case 'curb65':
        case 'apgar':
        case 'gcs':
        case 'qsofa':
        case 'sirs':
        case 'wells-pe':
        case 'wells-dvt':
        case 'nihss':
          res = logic.calculatePoints(inputs);
          break;
      }
    } catch (e) {}
    setResult(res);
  }, [inputs, id]);

  const handleBriefRequest = async () => {
    if (!result) return;
    setLoading(true);
    const text = await getClinicalBrief(name, `${result.value} ${result.unit}`);
    setBrief(text || '');
    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    if (!result) return;
    setPdfLoading(true);
    try {
      await generateClinicalPDF({
        patientRef: patientRef || 'Unnamed Patient',
        calculatorName: name,
        result: String(result.value),
        unit: result.unit,
        interpretation: result.interpretation,
        aiBrief: brief,
        date: new Date().toISOString()
      });
    } catch (e) {
      console.error("PDF Generation failed", e);
    } finally {
      setPdfLoading(false);
    }
  };

  const handleSave = () => {
    if (!result) return;
    const historyJson = localStorage.getItem('medcalc_history') || '[]';
    const history: SavedCalculation[] = JSON.parse(historyJson);
    
    const newEntry: SavedCalculation = {
      id: crypto.randomUUID(),
      patientRef: patientRef || 'Unnamed Patient',
      calculatorName: name,
      result: String(result.value),
      unit: result.unit,
      interpretation: result.interpretation,
      aiBrief: brief,
      date: new Date().toISOString()
    };

    history.unshift(newEntry);
    localStorage.setItem('medcalc_history', JSON.stringify(history.slice(0, 50)));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const renderInputs = () => {
    const num = (label: string, name: string, placeholder = "0.00") => (
      <div key={name}>
        <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</label>
        <input 
          type="number" 
          name={name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white"
          placeholder={placeholder}
        />
      </div>
    );
    
    const checkboxInput = (label: string, name: string, points: number) => (
      <div 
        key={name}
        onClick={() => toggleCheck(name, points)}
        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${inputs[name] ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-300' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
      >
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs font-bold opacity-50">+{points}</span>
      </div>
    );

    switch(id) {
      case 'bmi': case 'bsa': case 'maint-fluid': case 'parkland':
        return <div className="space-y-4">{num("Weight (kg)", "weight")}{id !== 'maint-fluid' && num(id === 'parkland' ? "TBSA (%)" : "Height (cm)", id === 'parkland' ? "tbsa" : "height")}</div>;
      case 'gfr':
        return <div className="space-y-4">{num("Age", "age")}{num("Weight (kg)", "weight")}{num("Creatinine (mg/dL)", "creatinine")}</div>;
      case 'map':
        return <div className="space-y-4">{num("Systolic BP", "sbp")}{num("Diastolic BP", "dbp")}</div>;
      case 'cor-na':
        return <div className="space-y-4">{num("Measured Sodium", "na")}{num("Glucose (mg/dL)", "glucose")}</div>;
      case 'iv':
        return <div className="space-y-4">{num("Volume (mL)", "volume")}{num("Time (Hours)", "timeHours")}{num("Drop Factor (gtt/mL)", "dropFactor", "20")}</div>;
      case 'na-def': case 'water-def':
        return <div className="space-y-4">{num("Weight (kg)", "weight")}{num("Current Na", "currentNa")}{id === 'na-def' && num("Target Na", "targetNa")}</div>;
      case 'bic-def':
        return <div className="space-y-4">{num("Weight (kg)", "weight")}{num("Current HCO3", "currentHco3")}{num("Target HCO3", "targetHco3")}</div>;
      case 'osmol-gap':
        return <div className="grid grid-cols-2 gap-4">{num("Serum Na", "na")}{num("Glucose", "glucose")}{num("BUN", "bun")}{num("Measured Osm", "measuredOsm")}</div>;
      case 'chads':
        return (
          <div className="space-y-2">
            {checkboxInput("Congestive Heart Failure", "chf", 1)}
            {checkboxInput("Hypertension", "htn", 1)}
            {checkboxInput("Age ≥ 75", "age75", 2)}
            {checkboxInput("Diabetes Mellitus", "dm", 1)}
            {checkboxInput("Stroke / TIA / TE History", "stroke", 2)}
            {checkboxInput("Vascular Disease", "vasc", 1)}
            {checkboxInput("Age 65-74", "age65", 1)}
            {checkboxInput("Sex (Female)", "female", 1)}
          </div>
        );
      case 'qsofa':
        return (
          <div className="space-y-2">
            {checkboxInput("Altered Mental Status (GCS < 15)", "ams", 1)}
            {checkboxInput("Systolic BP ≤ 100 mmHg", "sbp100", 1)}
            {checkboxInput("Resp Rate ≥ 22/min", "rr22", 1)}
          </div>
        );
      default:
        return <p className="text-slate-400 dark:text-slate-500 italic text-sm">Form configuration for {name} is being finalized. Please enter clinical parameters above.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-6 print:border-none print:shadow-none">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2 print:text-black">
          {name}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 print:hidden">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Clinical Parameters</h4>
            {renderInputs()}
          </div>
          
          <div className="flex flex-col justify-center items-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 print:bg-white print:border-solid print:p-4 print:border-slate-100">
            {result ? (
              <div className="text-center animate-in zoom-in-95 duration-300">
                <p className="text-sm text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-2 print:text-black">Calculated Value</p>
                <div className="text-6xl font-black text-blue-600 dark:text-blue-400 mb-1 print:text-black">{result.value}</div>
                <div className="text-xl font-bold text-slate-400 dark:text-slate-500 print:text-black">{result.unit}</div>
                {result.interpretation && (
                  <div className="mt-4 px-6 py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold shadow-sm print:bg-slate-100 print:text-black print:shadow-none">
                    {result.interpretation}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-300 dark:text-slate-600 print:hidden">
                <div className="w-12 h-12 mx-auto opacity-20"><Icons.Activity /></div>
                <p className="text-xs font-bold mt-2 uppercase tracking-widest">Awaiting Inputs</p>
              </div>
            )}
          </div>
        </div>

        {result && (
          <>
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 print:mt-6 print:pt-6">
               <div className="flex flex-col md:flex-row gap-4 print:hidden">
                  <button 
                    onClick={handleBriefRequest}
                    disabled={loading}
                    className="flex-1 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <Icons.Brain />
                    {loading ? 'Consulting AI...' : 'Explain Clinical Significance'}
                  </button>
                  
                  <button 
                    onClick={handleDownloadPDF}
                    disabled={pdfLoading}
                    className="flex-1 py-4 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border-2 border-blue-500 dark:border-blue-500/30 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {pdfLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div> : <Icons.Download />}
                    Download Clinical PDF
                  </button>
               </div>

               {brief && (
                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/20 rounded-2xl animate-in slide-in-from-top-4 print:bg-white print:border-none print:mt-4 print:p-0">
                   <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2 text-sm uppercase print:text-black">
                     <Icons.Activity /> Clinical Intelligence
                   </h4>
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic print:text-black">"{brief}"</p>
                </div>
               )}
            </div>

            <div className="mt-8 p-6 bg-slate-900 dark:bg-slate-800 rounded-2xl text-white print:hidden">
              <h4 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                <Icons.Save /> Save to Patient Records
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  value={patientRef}
                  onChange={e => setPatientRef(e.target.value)}
                  placeholder="Patient ID or Room #..."
                  className="flex-1 px-4 py-3 bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                  onClick={handleSave}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'}`}
                >
                  {saveStatus === 'saved' ? 'Saved!' : 'Save Calculation'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalculatorForm;
