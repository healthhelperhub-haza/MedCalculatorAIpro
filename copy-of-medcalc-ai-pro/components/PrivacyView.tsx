
import React from 'react';
import { Icons } from '../constants';

const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <span className="p-2 bg-slate-100 rounded-xl text-slate-600">
            <Icons.FileText />
          </span>
          Privacy Policy & Terms
        </h2>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-3">1. Medical Disclaimer</h3>
            <p className="text-slate-600 leading-relaxed">
              <strong>MedCalc AI Pro is a clinical decision support tool intended for use by qualified healthcare professionals.</strong> It is not a substitute for professional medical judgment, diagnosis, or treatment. Always verify calculations manually. The AI-generated interpretations are for educational and supplementary purposes only and should not be used as the sole basis for clinical decisions.
            </p>
          </section>

          <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-3">2. Data Residency & Local Storage</h3>
            <p className="text-blue-800/80 leading-relaxed">
              To prioritize patient privacy, all data entered into the "Saved Records" section is stored <strong>locally on your device's browser (Local Storage)</strong>. MedCalc AI Pro does not transmit, store, or host your patient records on our servers. Clearing your browser cache or site data will permanently delete these records.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-3">3. AI Processing (Gemini API)</h3>
            <p className="text-slate-600 leading-relaxed">
              When you use the "Explain Clinical Significance" or "Med-AI Assistant" features, the specific calculation value or order text is sent to Google's Gemini API for processing. We recommend <strong>never entering personally identifiable information (PII)</strong> such as patient names, social security numbers, or exact dates of birth into these AI-powered fields.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-800 mb-3">4. Information We Collect</h3>
            <p className="text-slate-600 leading-relaxed">
              We do not collect personal usage data. If you voluntarily provide your information via our newsletter or report forms, that data is handled according to our marketing partner's (Typeform) privacy standards and is used solely to provide the services requested (e.g., sending the PDF report).
            </p>
          </section>

          <section className="pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              <br />
              MedCalc AI Pro - Professional Clinical Suite
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyView;
