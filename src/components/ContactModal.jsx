import React, { useState } from 'react';
import { Phone, Mail, CheckCircle, Send, X, ShieldAlert } from 'lucide-react';

export default function ContactModal({ 
  propertyTitle, 
  propertyId, 
  isOpen, 
  onClose 
}) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('Schedule Visit');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-5 flex justify-between items-start border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
              Nagpur Real Estate Desk
            </span>
            <h3 className="font-bold text-lg mt-1 text-white">Inquire for Property</h3>
            <p className="text-xs text-slate-300 truncate max-w-xs mt-0.5">{propertyTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Inquiry Dispatched</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                Thank you{name ? `, ${name}` : ''}! Your demonstration visit request for listing{' '}
                <span className="font-semibold text-slate-800 dark:text-slate-200">{propertyId}</span> has been logged to the Nagpur demo registry.
              </p>
              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 font-mono font-medium">
                Direct Hotline: +919898989898
              </div>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="mt-4 px-5 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Close Dialog
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Inquiry Purpose</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Schedule Visit">Schedule In-Person Site Visit</option>
                  <option value="Price Negotiation">Price & Loan Consultation</option>
                  <option value="Floor Plan Request">Request Layout & Floor Plans</option>
                  <option value="Rental Terms">Clarify Rental / Lease Terms</option>
                </select>
              </div>

              {/* Verified Privacy Contact Display */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span className="font-semibold">Official Helpline:</span>
                  <a href="tel:+919898989898" className="font-mono font-bold text-sky-700 dark:text-sky-400 hover:underline">
                    +919898989898
                  </a>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight flex items-start gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>Privacy rule active: No personal agent phone numbers are stored or shared. All inquiries route exclusively via +919898989898.</span>
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
