
import React, { useState, useMemo, useEffect } from 'react';
import { Category, Calculator, ThemeMode, AppView } from './types';
import { Icons, CALCULATORS } from './constants';
import CalculatorForm from './components/CalculatorForm';
import AIAssistant from './components/AIAssistant';
import HistoryView from './components/HistoryView';
import PrivacyView from './components/PrivacyView';
import MarketingForm from './components/MarketingForm';
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [activeCalculator, setActiveCalculator] = useState<Calculator | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<AppView>('dashboard');
  const [isSubscribed, setIsSubscribed] = useState(() => localStorage.getItem('medcalc_subscribed') === 'true');
  
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('medcalc_theme') as ThemeMode) || 'system');

  // Handle Theme Application
  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem('medcalc_theme', theme);
    
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(systemDark);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      applyTheme(theme === 'dark');
    }
  }, [theme]);

  const filteredCalculators = useMemo(() => {
    return CALCULATORS.filter(calc => {
      const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;
      const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          calc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleNavClick = (cat: Category | 'All') => {
    setSelectedCategory(cat);
    setActiveCalculator(null);
    if (cat === Category.HISTORY) {
      setView('history');
    } else if (cat === Category.SETTINGS) {
      setView('settings');
    } else {
      setView('dashboard');
    }
  };

  const handlePrivacyClick = () => {
    setActiveCalculator(null);
    setView('privacy');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-72 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 sticky top-0 h-screen overflow-y-auto print:hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
              <Icons.Stethoscope />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white leading-none">MedCalc</h1>
              <span className="text-xs text-blue-600 font-bold tracking-tighter uppercase">AI Professional</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => handleNavClick('All')}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${selectedCategory === 'All' && view === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Icons.Activity /> All Tools
            </button>
            <button 
              onClick={() => handleNavClick(Category.HISTORY)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${view === 'history' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Icons.History /> Saved Records
            </button>
            <button 
              onClick={() => handleNavClick(Category.SETTINGS)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${view === 'settings' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Icons.Settings /> App Settings
            </button>
            
            <div className="pt-4 pb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-4">Categories</div>
            {Object.values(Category).filter(c => c !== Category.HISTORY && c !== Category.SETTINGS).map(cat => (
              <button 
                key={cat}
                onClick={() => handleNavClick(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${selectedCategory === cat && view === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {getIconForCategory(cat)} {cat}
              </button>
            ))}

            <div className="pt-6">
              <button 
                onClick={handlePrivacyClick}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-xs font-medium border-t border-slate-100 dark:border-slate-800 pt-6 ${view === 'privacy' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Icons.FileText /> Privacy & Terms
              </button>
            </div>
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4">
          <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-4 text-white">
            <p className="text-xs font-semibold text-blue-400 mb-1">PRO VERSION</p>
            <p className="text-sm font-medium opacity-80 mb-3">AI Reasoning unlocked with Gemini 3 Pro.</p>
            <div className="h-1 bg-slate-800 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-full"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto max-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center justify-between print:hidden">
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"><Icons.Search /></span>
            <input 
              type="text" 
              placeholder="Search formula or clinical score..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none text-slate-900 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2">
            {!isSubscribed && (
              <button 
                onClick={() => setView('dashboard')}
                className="hidden md:flex px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Join Professional Network
              </button>
            )}
            <div className="px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Clinical Engine Active
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-20">
          
          {view === 'privacy' ? (
            <PrivacyView />
          ) : view === 'history' ? (
            <HistoryView />
          ) : view === 'settings' ? (
            <SettingsView theme={theme} setTheme={setTheme} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} />
          ) : activeCalculator ? (
            <div className="animate-in fade-in slide-in-from-top-4">
              <button 
                onClick={() => setActiveCalculator(null)}
                className="mb-4 text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 hover:underline print:hidden"
              >
                ← Back to tools
              </button>
              {activeCalculator.id === 'ai-assist' ? (
                <AIAssistant />
              ) : (
                <CalculatorForm id={activeCalculator.id} name={activeCalculator.name} />
              )}
            </div>
          ) : (
            <>
              {/* Dashboard sections */}
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedCategory} Calculators</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Select a clinical tool to begin calculation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCalculators.map(calc => (
                  <div 
                    key={calc.id}
                    onClick={() => setActiveCalculator(calc)}
                    className="group cursor-pointer bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 dark:bg-blue-900/10 rounded-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors"></div>
                    <div className="relative">
                      <div className="mb-4 text-blue-600 bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getIconForCategory(calc.category)}
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{calc.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{calc.description}</p>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{calc.category}</span>
                        <span className="text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">Launch →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Capture Section */}
              {!isSubscribed && selectedCategory === 'All' && !searchQuery && (
                <div className="py-12 px-4 border-t border-slate-200 dark:border-slate-800 mt-12">
                   <MarketingForm 
                     title="Clinical Insights & AI Updates"
                     description="Join 12,000+ clinicians receiving weekly AI medical reasoning prompts and clinical calculator updates direct to their hospital inbox."
                     ctaText="Subscribe to Clinical Network"
                     onSuccess={() => setIsSubscribed(true)}
                   />
                </div>
              )}

              {/* Special AI Feature Card */}
              {selectedCategory === 'All' && !searchQuery && (
                <div 
                  onClick={() => setActiveCalculator(CALCULATORS.find(c => c.id === 'ai-assist'))}
                  className="bg-gradient-to-br from-slate-900 to-blue-900 dark:from-slate-800 dark:to-blue-950 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer"
                >
                  <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform">
                    <Icons.Brain />
                  </div>
                  <div className="relative z-10 md:max-w-md">
                    <h3 className="text-2xl font-bold mb-2">Can't find what you need?</h3>
                    <p className="text-blue-100/80 mb-6">Our Med-AI engine can handle custom infusions, pediatric doses, and renal adjustments from raw notes.</p>
                    <button className="px-6 py-3 bg-white dark:bg-slate-100 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-white/10 transition-all">
                      Try AI Clinical Assistant
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Mobile Nav - Fixed Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-50 print:hidden">
        <button onClick={() => {handleNavClick('All');}} className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400">
          <Icons.Activity />
          <span className="text-[10px] font-bold uppercase">Tools</span>
        </button>
        <button onClick={() => setActiveCalculator(CALCULATORS.find(c => c.id === 'ai-assist'))} className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white -mt-10 shadow-xl shadow-blue-500/40 border-4 border-white dark:border-slate-900">
          <Icons.Brain />
        </button>
        <button onClick={() => handleNavClick(Category.SETTINGS)} className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500">
          <Icons.Settings />
          <span className="text-[10px] font-bold uppercase">Settings</span>
        </button>
      </div>
    </div>
  );
};

const getIconForCategory = (cat: Category | string) => {
  switch(cat) {
    case Category.GENERAL: return <Icons.Activity />;
    case Category.RENAL: return <Icons.Droplets />;
    case Category.CARDIO: return <Icons.Activity />;
    case Category.EMERGENCY: return <Icons.Clock />;
    case Category.PEDS: return <Icons.Baby />;
    case Category.AI: return <Icons.Brain />;
    case Category.HISTORY: return <Icons.History />;
    case Category.SETTINGS: return <Icons.Settings />;
    default: return <Icons.Stethoscope />;
  }
};

export default App;
