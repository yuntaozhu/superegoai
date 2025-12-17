import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../context/LanguageContext';

const Studio: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { text: prompt }
            ]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          }
        },
      });

      // Find the image part in the response
      let imageUrl = null;
      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                imageUrl = `data:image/png;base64,${base64EncodeString}`;
                break;
            }
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError("No image generated.");
      }
      
    } catch (err) {
      console.error(err);
      setError(t('studio.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
             {t('studio.title')}
           </h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
             {t('studio.subtitle')}
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
                     Prompt
                   </label>
                   <textarea
                     className="w-full h-40 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-lg"
                     placeholder={t('studio.placeholder')}
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                   />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 uppercase tracking-wide">
                        Aspect Ratio
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {['1:1', '16:9', '9:16'].map((ratio) => (
                            <button
                                key={ratio}
                                onClick={() => setAspectRatio(ratio)}
                                className={`py-3 rounded-lg font-mono text-sm border transition-all ${
                                    aspectRatio === ratio 
                                    ? 'bg-blue-600 border-blue-500 text-white' 
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {ratio}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform ${
                        isLoading || !prompt.trim()
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25 hover:scale-[1.02]'
                    }`}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             {t('studio.generating')}
                        </span>
                    ) : (
                        t('studio.generate')
                    )}
                </button>
             </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
              {!generatedImage && !isLoading && !error && (
                  <div className="text-center text-gray-500">
                      <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-4xl">
                          🎨
                      </div>
                      <p>Your creation will appear here.</p>
                  </div>
              )}

              {isLoading && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                      <div className="flex flex-col items-center">
                          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                          <p className="text-blue-400 font-mono animate-pulse">Computing pixels...</p>
                      </div>
                   </div>
              )}
              
              {error && (
                  <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                      <p className="font-bold mb-2">Error</p>
                      <p>{error}</p>
                  </div>
              )}

              {generatedImage && (
                  <div className="relative w-full h-full flex flex-col items-center">
                      <img 
                          src={generatedImage} 
                          alt="Generated AI Art" 
                          className="max-w-full max-h-[500px] rounded-lg shadow-2xl object-contain mb-4"
                      />
                      <a 
                          href={generatedImage} 
                          download={`ai-first-studio-${Date.now()}.png`}
                          className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/20 font-medium"
                      >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          {t('studio.download')}
                      </a>
                  </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;