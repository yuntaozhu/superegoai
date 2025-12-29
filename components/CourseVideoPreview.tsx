
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, X, AlertCircle, Film, Sparkles, Terminal } from 'lucide-react';

const m = motion as any;

interface CourseVideoPreviewProps {
  courseId: string;
  takeaway: string;
  color: string;
  onClose: () => void;
}

const CourseVideoPreview: React.FC<CourseVideoPreviewProps> = ({ courseId, takeaway, color, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'checking_key' | 'generating' | 'ready' | 'error'>('idle');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const loadingMessages = [
    "Initializing Neural Engine...",
    "Analyzing Pedagogical Trajectory...",
    "Synthesizing Cinematic Latent Space...",
    "Rendering Digital Twin Assets...",
    "Applying Temporal Coherence Filters...",
    "Finalizing AI Curriculum Trailer..."
  ];

  // Handle cycling of loading messages
  useEffect(() => {
    let interval: number;
    if (status === 'generating') {
      let idx = 0;
      setLoadingMessage(loadingMessages[0]);
      interval = window.setInterval(() => {
        idx = (idx + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[idx]);
      }, 5000);
    }
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [status]);

  // Main generation handler following GenAI guidelines
  const handleGenerate = async () => {
    try {
      setStatus('checking_key');
      
      // GUIDELINE: Check for selected API key via provided window API
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // GUIDELINE: Assume success and proceed after triggering key selection
      }

      setStatus('generating');
      setError(null);

      // GUIDELINE: Create fresh instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Futuristic educational trailer for a course about "${takeaway}". 
      Cinematic style, abstract 3D visuals representing high-level human-AI collaboration, 
      flowing neural networks, glowing planetary systems, sleek motion design. 
      Professional color grading, 4k high quality, immersive atmosphere.`;

      // GUIDELINE: Use veo-3.1-fast-generate-preview for video generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // GUIDELINE: Poll for operation completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // GUIDELINE: Append API key when fetching from download link
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) throw new Error("Failed to secure video binary.");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('ready');
      } else {
        throw new Error("Generation complete but no video URI found.");
      }

    } catch (err: any) {
      console.error("Veo Generation Error:", err);
      // GUIDELINE: Reset key selection state if error contains specific message
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key Error: Requested entity not found. Please ensure your API key is from a paid GCP project.");
        (window as any).aistudio.openSelectKey();
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <m.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-brand-surface border border-white/10 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500" />
        
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-full z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center shadow-lg border border-blue-500/20">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
                  AI Preview Studio
                </h3>
              </div>
              <p className="text-gray-400 max-w-lg text-sm md:text-base leading-relaxed font-light">
                Generating a cinematic mission trailer based on: <br/>
                <span className="text-blue-400 font-bold italic">"{takeaway}"</span>
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <Terminal className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Veo_3.1_Fast_Preview</span>
            </div>
          </div>

          <div className="w-full aspect-video bg-black/40 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden relative shadow-inner">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <m.button 
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleGenerate}
                  className="group flex flex-col items-center gap-6"
                >
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <Play className="w-10 h-10 text-white fill-current ml-1" />
                  </div>
                  <div className="text-center space-y-1">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Initiate Neural Render</span>
                    <p className="text-[9px] text-gray-500 font-mono">Paid API Key Required • ~2-3 Minutes</p>
                  </div>
                </m.button>
              )}

              {(status === 'generating' || status === 'checking_key') && (
                <m.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-8"
                >
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                    <Film className="w-6 h-6 text-blue-400 absolute inset-0 m-auto opacity-50" />
                  </div>
                  <div className="space-y-4 text-center">
                    <p className="text-white font-mono text-xs uppercase tracking-[0.4em] animate-pulse">{loadingMessage}</p>
                    <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                      <m.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                      />
                    </div>
                  </div>
                </m.div>
              )}

              {status === 'ready' && videoUrl && (
                <m.div 
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative group"
                >
                  <video 
                    src={videoUrl} 
                    className="w-full h-full object-contain bg-black" 
                    controls 
                    autoPlay 
                    playsInline
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] font-black uppercase tracking-widest backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    AI Render Stable
                  </div>
                </m.div>
              )}

              {status === 'error' && (
                <m.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-6 px-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-red-400 text-sm font-bold uppercase tracking-widest">Orchestration Error</p>
                    <p className="text-gray-500 text-xs max-w-sm font-light leading-relaxed">{error}</p>
                  </div>
                  <button 
                    onClick={handleGenerate}
                    className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl"
                  >
                    Restart Engine
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fix: Clarifying JSX nesting to resolve "Cannot find name 'div'" confusion */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="h-px w-20 bg-white/10"></div>
            <div className="flex gap-6 text-[9px] text-gray-600 font-mono uppercase tracking-[0.2em]">
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">Billing Specs</a>
              <span>•</span>
              <span>Latency Variable</span>
              <span>•</span>
              <span>Sovereign Output</span>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default CourseVideoPreview;
