
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, CheckCircle } from 'lucide-react';

// Using any to bypass framer-motion type mismatch in the current environment
const m = motion as any;

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-brand-surface border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-10 text-center">
              {!submitted ? (
                <>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    {t('waitlist.title')}
                  </h3>
                  <p className="text-gray-400 mb-8 font-light">
                    {t('waitlist.subtitle')}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-left">
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">
                        {t('waitlist.name_label')}
                      </label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 ml-4">
                        {t('waitlist.email_label')}
                      </label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <button 
                      disabled={loading}
                      type="submit"
                      className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {t('waitlist.submit')}
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <m.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Success!</h3>
                  <p className="text-gray-400">
                    {t('waitlist.success')}
                  </p>
                  <button 
                    onClick={onClose}
                    className="mt-10 text-gray-500 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest"
                  >
                    Close Window
                  </button>
                </m.div>
              )}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
