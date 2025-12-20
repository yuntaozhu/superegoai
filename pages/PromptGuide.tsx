
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Terminal, 
  Lightbulb, 
  BookOpen, 
  Code2, 
  Search, 
  ShieldAlert, 
  Settings, 
  Cpu, 
  ChevronRight,
  ArrowRight,
  Layers
} from 'lucide-react';

const PromptGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guideData = {
    introduction: {
      title: t('prompt_guide.categories.introduction'),
      icon: <Terminal className="w-6 h-6" />,
      items: [
        { key: "basics", zh: "提示词基础", ar: "أساسيات التلقين" },
        { key: "elements", zh: "提示词要素", ar: "عناصر الأوامر" },
        { key: "settings", zh: "模型设置", ar: "إعدادات النماذج اللغوية الكبيرة" },
        { key: "tips", zh: "设计技巧", ar: "نصائح عامة لتصميم الأوامر" }
      ]
    },
    techniques: {
      title: t('prompt_guide.categories.techniques'),
      icon: <Layers className="w-6 h-6" />,
      items: [
        { key: "zeroshot", zh: "零样本提示", ar: "التلقين بدون أمثلة مسبقة" },
        { key: "fewshot", zh: "少样本提示", ar: "التلقين ببضع أمثلة" },
        { key: "cot", zh: "思维链 (CoT)", ar: "التلقين بسلسلة من الأفكار" },
        { key: "rag", zh: "检索增强生成 (RAG)", ar: "التوليد المعزز بالمراجع (RAG)" },
        { key: "tot", zh: "思维树 (ToT)", ar: "شجرة الأفكار" }
      ]
    },
    applications: {
      title: t('prompt_guide.categories.applications'),
      icon: <Code2 className="w-6 h-6" />,
      items: [
        { key: "coding", zh: "代码生成", ar: "توليد الأكواد" },
        { key: "generating", zh: "数据生成", ar: "توليد البيانات" },
        { key: "function_calling", zh: "函数调用", ar: "استدعاء الدوال" }
      ]
    },
    models: {
      title: t('prompt_guide.categories.models'),
      icon: <Cpu className="w-6 h-6" />,
      items: [
        { key: "gpt4", zh: "GPT-4", ar: "GPT-4" },
        { key: "claude", zh: "Claude 3", ar: "Claude 3" },
        { key: "gemini", zh: "Gemini", ar: "Gemini" },
        { key: "llama", zh: "Llama 3", ar: "Llama 3" }
      ]
    },
    research: {
      title: t('prompt_guide.categories.research'),
      icon: <Search className="w-6 h-6" />,
      items: [
        { key: "agents", zh: "LLM 智能体", ar: "الوكيل الذكي (LLM Agents)" },
        { key: "reasoning", zh: "逻辑推理", ar: "عملية الاستنتاج في النماذج اللغوية الكبيرة" },
        { key: "trustworthiness", zh: "模型可靠性", ar: "موثوقية النماذج اللغوية" }
      ]
    },
    risks: {
      title: t('prompt_guide.categories.risks'),
      icon: <ShieldAlert className="w-6 h-6" />,
      items: [
        { key: "adversarial", zh: "对抗性提示词", ar: "التلقين العكسي" },
        { key: "bias", zh: "模型偏见", ar: "التحيّز" },
        { key: "factuality", zh: "真实性校验", ar: "الواقعية" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-500/5 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Lightbulb className="w-4 h-4" />
            Knowledge Base
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            {t('prompt_guide.title')}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
            {t('prompt_guide.subtitle')}
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
            {t('prompt_guide.description')}
          </p>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-2">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-6 px-4">Categories</h3>
            {Object.entries(guideData).map(([id, cat]) => (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all border ${
                  activeCategory === id 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.icon}
                <span className="font-bold text-sm tracking-tight">{cat.title}</span>
                {activeCategory === id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </aside>

          {/* Sub-content Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
                        {guideData[activeCategory as keyof typeof guideData].icon}
                      </div>
                      <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter">
                        {guideData[activeCategory as keyof typeof guideData].title}
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden md:block">
                      {activeCategory.toUpperCase()}_SECTION
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guideData[activeCategory as keyof typeof guideData].items.map((item) => (
                      <div 
                        key={item.key}
                        className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all hover:bg-white/10 cursor-pointer flex flex-col justify-between h-40"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest">
                              {item.key}
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-2">{item.zh}</h4>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-xs text-gray-600 font-medium font-mono" dir="rtl">{item.ar}</span>
                          <span className="text-[10px] text-gray-700 group-hover:text-gray-500 transition-colors">Documentation {'>>'}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Info Card */}
                  <div className="p-8 md:p-12 bg-gradient-to-br from-blue-900/40 via-brand-dark to-brand-dark border border-white/10 rounded-[40px] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-10 opacity-5">
                       {guideData[activeCategory as keyof typeof guideData].icon}
                     </div>
                     <div className="relative z-10">
                        <h4 className="text-white font-black text-xl mb-4 uppercase">Learning Path</h4>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xl font-light">
                          Our curriculum integrates these prompt engineering principles into every course module. Master these, and you will effectively manage your AI team.
                        </p>
                        <button className="mt-8 flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-white transition-colors uppercase tracking-widest">
                          Deep Dive Research <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto p-12 bg-white/5 border border-white/10 rounded-[48px] text-center backdrop-blur-md">
           <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-8" />
           <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">
             Inspired by Open Source
           </h3>
           <p className="text-gray-400 font-light mb-8 max-w-2xl mx-auto">
             This guide is powered by the collective wisdom of the global AI community, specifically based on the <span className="text-white font-bold">dair-ai/Prompt-Engineering-Guide</span> project.
           </p>
           <a 
             href="https://github.com/dair-ai/Prompt-Engineering-Guide" 
             target="_blank" 
             rel="noopener noreferrer"
             className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all inline-block"
           >
             Visit Repository
           </a>
        </div>
      </section>
    </div>
  );
};

export default PromptGuide;
