
import React from 'react';
import { ThemeMode } from '../types';
import { Icons } from '../constants';

interface SettingsViewProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isSubscribed: boolean;
  setIsSubscribed: (val: boolean) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ theme, setTheme, isSubscribed, setIsSubscribed }) => {
  const clearData = () => {
    if (window.confirm('Delete all patient records? This action cannot be undone.')) {
      localStorage.removeItem('medcalc_history');
      window.location.reload();
    }
  };

  const resetSubscription = () => {
    if (window.confirm('Reset network subscription? This will show the joining form again.')) {
      localStorage.removeItem('medcalc_subscribed');
      setIsSubscribed(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Configure your clinical workspace and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Section */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Icons.Sun /> Appearance
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${theme === 'light' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                <Icons.Sun />
                <span className="text-[10px] uppercase">Light</span>
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${theme === 'dark' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                <Icons.Moon />
                <span className="text-[10px] uppercase">Dark</span>
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                <Icons.Activity />
                <span className="text-[10px] uppercase">System</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center px-4 leading-relaxed">
              System mode automatically matches your device's operating system preferences.
            </p>
          </div>
        </section>

        {/* Clinical Network Section */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Icons.Stethoscope /> Clinical Network
          </h3>
          
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl border ${isSubscribed ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/20' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">Status</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${isSubscribed ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                  {isSubscribed ? 'Verified' : 'Unverified'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {isSubscribed 
                  ? 'Your profile is active. You have access to AI Reasoning and the full Clinical Intelligence suite.' 
                  : 'Join our network to unlock advanced AI-powered dosage reasoning and clinical interpretations.'}
              </p>
            </div>

            {isSubscribed && (
              <button 
                onClick={resetSubscription}
                className="w-full py-3 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest border border-dashed border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
              >
                Reset Subscription State
              </button>
            )}
          </div>
        </section>

        {/* Data & Privacy Section */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Icons.Trash /> Data Management
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20 rounded-2xl">
              <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-1">Clear Local History</h4>
              <p className="text-[10px] text-red-600/70 dark:text-red-400/50 mb-4 leading-tight">
                Permanently deletes all saved patient records, calculations, and AI briefs from this device.
              </p>
              <button 
                onClick={clearData}
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-lg transition-all uppercase tracking-widest shadow-lg shadow-red-900/20"
              >
                Delete All Records
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col justify-center">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase mb-1">App Version</h4>
              <p className="text-[10px] text-slate-400 mb-4 leading-tight">MedCalc AI Pro v1.2.4 Build 20250510</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Connected to Gemini Clinical Hub</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">Professional Medical Suite &copy; 2025</p>
      </div>
    </div>
  );
};

export default SettingsView;
