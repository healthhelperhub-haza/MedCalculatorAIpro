
import React, { useState } from 'react';
import { Icons } from '../constants';

// The email address where leads will be sent
const TARGET_EMAIL = "healthhelperhub@gmail.com";

interface MarketingFormProps {
  title: string;
  description: string;
  ctaText: string;
  onSuccess: () => void;
}

const MarketingForm: React.FC<MarketingFormProps> = ({ 
  title, 
  description, 
  ctaText, 
  onSuccess
}) => {
  const [formData, setFormData] = useState({ name: '', email: '', country: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'awaiting_activation'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // FormSubmit AJAX request
      const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          specialty: formData.country,
          _subject: `MedCalc Pro: Initial Activation Request`,
          _captcha: "false",
          _template: "table",
          message: `This is an automated activation request for your MedCalc AI Pro app. Please confirm your email to start receiving leads.`
        })
      });

      const result = await response.json();

      // If result.success is true, the email is already activated and working
      if (response.ok && (result.success === true || result.success === "true")) {
        setStatus('success');
        localStorage.setItem('medcalc_subscribed', 'true');
        setTimeout(() => onSuccess(), 2000);
      } else {
        // FormSubmit returns success: false when the email isn't activated yet
        console.log("Activation required for:", TARGET_EMAIL);
        setStatus('awaiting_activation');
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus('error');
    }
  };

  // Standard form submission fallback - sometimes more reliable for first-time activation
  const handleForceActivation = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `https://formsubmit.co/${TARGET_EMAIL}`;
    
    const msg = document.createElement('input');
    msg.type = 'hidden';
    msg.name = 'message';
    msg.value = 'MedCalc Pro: Manual activation trigger.';
    
    const subject = document.createElement('input');
    subject.type = 'hidden';
    subject.name = '_subject';
    subject.value = 'MedCalc Pro: Confirm Activation';

    form.appendChild(msg);
    form.appendChild(subject);
    document.body.appendChild(form);
    form.submit();
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-10 rounded-3xl border-2 border-green-500 shadow-2xl max-w-md mx-auto text-center animate-in zoom-in-95">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Network Joined</h3>
        <p className="text-slate-500">Welcome to the medical intelligence network.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl max-w-md mx-auto relative overflow-hidden">
      <div className="flex justify-center mb-6">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <Icons.Stethoscope />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 text-center mb-8 leading-relaxed">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Dr. Smith"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Hospital Email</label>
          <input 
            required
            type="email" 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="clinician@hospital.com"
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Specialty / Country</label>
          <input 
            required
            type="text" 
            value={formData.country}
            onChange={e => setFormData({...formData, country: e.target.value})}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Pediatrics, USA"
          />
        </div>
        
        <button 
          disabled={status === 'submitting'}
          type="submit"
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
        >
          {status === 'submitting' ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>{ctaText}</>
          )}
        </button>
        
        {status === 'awaiting_activation' && (
          <div className="mt-4 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 animate-in slide-in-from-top-4 shadow-inner">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs animate-bounce font-bold">1</div>
              <h4 className="text-sm font-black text-blue-900 uppercase">Check Your Inbox</h4>
            </div>
            
            <p className="text-xs text-blue-800 leading-relaxed mb-4">
              We just sent an activation link to <br/>
              <strong className="text-blue-900 text-sm font-mono break-all">{TARGET_EMAIL}</strong>
            </p>

            <ul className="text-[10px] text-blue-700 space-y-2 mb-6 ml-4 list-disc">
              <li>Open your Gmail / Email app</li>
              <li>Look for <b>"FormSubmit - Confirm your email"</b></li>
              <li>Click the big <b>"Activate Form"</b> button</li>
              <li><b>Check your SPAM folder</b> if it's missing!</li>
            </ul>

            <button 
              type="button"
              onClick={handleForceActivation}
              className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              Didn't get the email? Force Resend
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100 text-center">
            <p className="text-xs text-red-600 font-bold">Clinical Server Timeout</p>
            <p className="text-[10px] text-red-400">Please check your connection and retry.</p>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-[9px] text-slate-400 text-center uppercase tracking-[0.2em]">
            Secure Delivery to: {TARGET_EMAIL}
          </p>
        </div>
      </form>
    </div>
  );
};

export default MarketingForm;
