
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Link } from '../context/LanguageContext';
import { 
  Terminal, 
  Lightbulb, 
  BookOpen, 
  Code2, 
  Search, 
  ShieldAlert, 
  Cpu, 
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  FlaskConical,
  Database,
  Globe
} from 'lucide-react';

const PromptGuide: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('introduction');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 深度集成的 ar-pages 数据架构
  const guideData = useMemo(() => ({
    introduction: {
      title: t('prompt_guide.categories.introduction'),
      icon: <Terminal className="w-5 h-5" />,
      description: "奠定大语言模型提示工程的基础认知。",
      items: [
        { key: "basics", zh: "提示词基础", ar: "أساسيات التلقين", tags: ["Beginner"] },
        { key: "elements", zh: "提示词要素", ar: "عناصر الأوامر", tags: ["Basics"] },
        { key: "settings", zh: "模型设置", ar: "إعدادات النماذج", tags: ["LLM Settings"] },
        { key: "tips", zh: "设计技巧", ar: "نصائح عامة", tags: ["Tips"] },
        { key: "examples", zh: "经典示例", ar: "أمثلة على الأوامر", tags: ["Samples"] }
      ]
    },
    techniques: {
      title: t('prompt_guide.categories.techniques'),
      icon: <Layers className="w-5 h-5" />,
      description: "掌握最新的提示工程前沿技术与范式。",
      items: [
        { key: "zeroshot", zh: "零样本提示", ar: "التلقين بدون أمثلة", tags: ["Standard"] },
        { key: "fewshot", zh: "少样本提示", ar: "التلقين ببضع أمثلة", tags: ["Few-Shot"] },
        { key: "cot", zh: "思维链 (CoT)", ar: "سلسلة من الأفكار", tags: ["Reasoning"] },
        { key: "consistency", zh: "自洽性", ar: "التناسق الذاتي", tags: ["Advanced"] },
        { key: "knowledge", zh: "知识生成提示", ar: "التلقين بالمعرفة", tags: ["RAG"] },
        { key: "chaining", zh: "提示词链", ar: "سلسلة الأوامر", tags: ["Workflow"] },
        { key: "tot", zh: "思维树 (ToT)", ar: "شجرة الأفكار", tags: ["Complex"] },
        { key: "rag", zh: "检索增强生成 (RAG)", ar: "التوليد المعزز", tags: ["Enterprise"] },
        { key: "art", zh: "自动推理与工具", ar: "الاستدلال التلقائي", tags: ["Agent"] },
        { key: "react", zh: "ReAct 框架", ar: "ReAct", tags: ["Agentic"] },
        { key: "reflexion", zh: "自我反思", ar: "Reflexion", tags: ["Self-Correction"] }
      ]
    },
    applications: {
      title: t('prompt_guide.categories.applications'),
      icon: <Code2 className="w-5 h-5" />,
      description: "将提示工程应用于实际开发与业务场景。",
      items: [
        { key: "function_calling", zh: "函数调用", ar: "استدعاء الدوال", tags: ["API"] },
        { key: "generating", zh: "数据生成", ar: "توليد البيانات", tags: ["Data"] },
        { key: "coding", zh: "代码生成", ar: "توليد الأكواد", tags: ["Dev"] },
        { key: "synthetic_rag", zh: "RAG 数据集生成", ar: "توليد مجموعة بيانات", tags: ["RAG"] },
        { key: "casestudy", zh: "职位分类案例", ar: "دراسة حالة", tags: ["Enterprise"] }
      ]
    },
    prompts: {
      title: t('prompt_guide.categories.prompts'),
      icon: <Sparkles className="w-5 h-5" />,
      description: "丰富的提示词案例库，涵盖各行业与任务。",
      items: [
        { key: "classification", zh: "情感与分类", ar: "التصنيف", tags: ["NLP"] },
        { key: "coding_p", zh: "代码指令库", ar: "كتابة أكواد", tags: ["Coding"] },
        { key: "creativity", zh: "创意写作", ar: "الابداع", tags: ["Creative"] },
        { key: "evaluation", zh: "内容评估", ar: "التقييم", tags: ["QA"] },
        { key: "extraction", zh: "信息提取", ar: "استخراج المعلومات", tags: ["Data"] },
        { key: "math", zh: "数学逻辑", ar: "الرياضيات", tags: ["Logic"] },
        { key: "reasoning_p", zh: "复杂推理", ar: "الاستنتاج", tags: ["Deep Thinking"] },
        { key: "summarization", zh: "文本摘要", ar: "تلخيص النصوص", tags: ["Productivity"] }
      ]
    },
    models: {
      title: t('prompt_guide.categories.models'),
      icon: <Cpu className="w-5 h-5" />,
      description: "主流大语言模型的特性与提示策略。",
      items: [
        { key: "gpt4", zh: "GPT-4 / GPT-4o", ar: "GPT-4", tags: ["OpenAI"] },
        { key: "claude3", zh: "Claude 3 / 3.5", ar: "Claude 3", tags: ["Anthropic"] },
        { key: "gemini", zh: "Gemini 1.5 Pro", ar: "Gemini", tags: ["Google"] },
        { key: "llama3", zh: "Llama 3 (8B/70B)", ar: "Llama 3", tags: ["Meta"] },
        { key: "mistral", zh: "Mistral Large", ar: "Mistral", tags: ["Open Source"] },
        { key: "grok", zh: "Grok-1", ar: "Grok-1", tags: ["xAI"] }
      ]
    },
    research: {
      title: t('prompt_guide.categories.research'),
      icon: <FlaskConical className="w-5 h-5" />,
      description: "探索大模型能力的边界与学术研究。",
      items: [
        { key: "agents", zh: "LLM 智能体", ar: "الوكيل الذكي", tags: ["Agentic AI"] },
        { key: "reasoning_r", zh: "逻辑推理机制", ar: "عملية الاستنتاج", tags: ["Deep Research"] },
        { key: "recall", zh: "长上下文召回", ar: "LLM In-Context Recall", tags: ["Context"] },
        { key: "synthetic_data", zh: "合成数据", ar: "البيانات المصنَّعة", tags: ["Training"] },
        { key: "trustworthiness", zh: "模型可信度", ar: "موثوقية النماذج", tags: ["Safety"] },
        { key: "groq_infra", zh: "硬件加速 (Groq)", ar: "ماهو Groq?", tags: ["Infrastructure"] }
      ]
    },
    risks: {
      title: t('prompt_guide.categories.risks'),
      icon: <ShieldAlert className="w-5 h-5" />,
      description: "识别提示工程中的安全风险与偏见。",
      items: [
        { key: "adversarial", zh: "对抗性提示词 (Injection)", ar: "التلقين العكسي", tags: ["Security"] },
        { key: "jailbreaking", zh: "越狱 (Jailbreaking)", ar: "كسر الحماية", tags: ["Safety"] },
        { key: "bias", zh: "模型偏见", ar: "التحيّز", tags: ["Ethics"] },
        { key: "factuality", zh: "幻觉与真实性", ar: "الواقعية", tags: ["Reliability"] }
      ]
    }
  }), [t]);

  // Search filter logic
  const filteredItems = useMemo(() => {
    const category = guideData[activeCategory as keyof typeof guideData];
    if (!searchQuery) return category.items;
    return category.items.filter(item => 
      item.zh.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.key.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery, guideData]);

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <Globe className="w-3 h-3" />
            Decentralized Knowledge System
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            {t('prompt_guide.title')}
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto italic">
            "Orchestrating the latent space through precise semantics."
          </p>
          <p className="text-gray-500 text-sm max-w-3xl mx-auto leading-relaxed border-t border-white/5 pt-8 mt-8">
            {t('prompt_guide.description')} 结合 dair-ai 社区最佳实践，为您呈现最全面的 AI 指令集。
          </p>
        </motion.div>
      </section>

      {/* Content Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Enhanced Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
               <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-6 px-2">Navigation</h3>
               <nav className="space-y-1">
                {Object.entries(guideData).map(([id, cat]) => (
                  <button
                    key={id}
                    onClick={() => { setActiveCategory(id); setSearchQuery(''); }}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${
                      activeCategory === id 
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={`transition-colors ${activeCategory === id ? 'text-white' : 'text-blue-500'}`}>
                      {cat.icon}
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">{cat.title}</span>
                    {activeCategory === id && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
               </nav>
            </div>

            {/* Search Module */}
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
               <input 
                 type="text"
                 placeholder="Search modules..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all font-mono"
               />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Category Header */}
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                    {guideData[activeCategory as keyof typeof guideData].icon}
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                       <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                         {guideData[activeCategory as keyof typeof guideData].title}
                       </h2>
                       <p className="text-gray-400 font-light text-lg">
                         {guideData[activeCategory as keyof typeof guideData].description}
                       </p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-6 py-4 backdrop-blur-md">
                       <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">Index Code</span>
                       <span className="text-white font-black text-xl">PG-0{Object.keys(guideData).indexOf(activeCategory) + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.key}
                      whileHover={{ scale: 1.02 }}
                      className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all hover:bg-white/10 cursor-pointer flex flex-col justify-between h-56 relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded">
                            {item.key}
                          </span>
                          <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h4 className="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.zh}</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-mono text-gray-500 border border-white/5 px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/5">
                        <span className="text-sm text-gray-600 font-black font-mono tracking-tighter" dir="rtl">{item.ar}</span>
                        <div className="flex items-center gap-2">
                           <Database className="w-3 h-3 text-gray-700" />
                           <span className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">Metadata Locked</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {filteredItems.length === 0 && (
                    <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-3xl">
                       <Search className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                       <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">No matching modules in current matrix</p>
                    </div>
                  )}
                </div>

                {/* Contribution / Open Source Card */}
                <div className="p-12 bg-gradient-to-br from-indigo-900/40 via-brand-dark to-brand-dark border border-white/10 rounded-[48px] relative overflow-hidden group mt-12 shadow-2xl">
                   <div className="absolute inset-0 opacity-10 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="grid-p" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-p)" />
                      </svg>
                   </div>
                   <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
                      <div className="p-6 bg-white/5 rounded-[40px] border border-white/10">
                        <BookOpen className="w-16 h-16 text-blue-500" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h4 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">社区驱动的知识库</h4>
                        <p className="text-gray-400 text-lg leading-relaxed font-light mb-8 max-w-2xl">
                          本指南深度整合了 <span className="text-white font-bold">dair-ai/Prompt-Engineering-Guide</span> 的开源成果。我们相信提示词工程不仅是一门技术，更是通往 AGI 的关键钥匙。
                        </p>
                        <a 
                          href="https://github.com/dair-ai/Prompt-Engineering-Guide" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-4 px-8 py-4 bg-white text-brand-dark rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-50 transition-all shadow-xl shadow-white/5"
                        >
                          检阅 GitHub 源码库 <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </section>

      {/* Footer Decoration */}
      <section className="mt-32 pb-10 text-center opacity-20">
         <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[1em]">Knowledge · System · Evolution</span>
      </section>
    </div>
  );
};

export default PromptGuide;
