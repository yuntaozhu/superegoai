
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, BarChart, Bar, Cell, PieChart, Pie, Legend, LineChart, Line 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { Brain, Zap, Target, BookOpen, Activity, ChevronRight, BarChart3 } from 'lucide-react';

const m = motion as any;

// Mock Data for 12-Week Longitudinal Engagement
const cohortEngagementData = [
  { week: 'W01', users: 850, retention: 100 },
  { week: 'W02', users: 820, retention: 98 },
  { week: 'W03', users: 790, retention: 96 },
  { week: 'W04', users: 810, retention: 94 },
  { week: 'W05', users: 760, retention: 90 },
  { week: 'W06', users: 745, retention: 89 },
  { week: 'W07', users: 730, retention: 88 },
  { week: 'W08', users: 755, retention: 91 },
  { week: 'W09', users: 720, retention: 86 },
  { week: 'W10', users: 710, retention: 85 },
  { week: 'W11', users: 715, retention: 85 },
  { week: 'W12', users: 725, retention: 87 },
];

const neuralSyncData = [
  { day: 'Mon', syncs: 12, quality: 85 },
  { day: 'Tue', syncs: 19, quality: 78 },
  { day: 'Wed', syncs: 15, quality: 92 },
  { day: 'Thu', syncs: 22, quality: 88 },
  { day: 'Fri', syncs: 30, quality: 95 },
  { day: 'Sat', syncs: 25, quality: 90 },
  { day: 'Sun', syncs: 28, quality: 94 },
];

const planetProgress = [
  { name: 'Art', progress: 45, color: '#8A2BE2' },
  { name: 'Sports', progress: 70, color: '#FF4500' },
  { name: 'Data', progress: 95, color: '#FFD700' },
  { name: 'Quant', progress: 30, color: '#10B981' },
  { name: 'Code', progress: 60, color: '#00FFFF' },
  { name: 'Research', progress: 85, color: '#00BFFF' },
];

const cognitiveDistribution = [
  { name: 'Logic', value: 400, color: '#3b82f6' },
  { name: 'Creativity', value: 300, color: '#8b5cf6' },
  { name: 'Physical', value: 200, color: '#ef4444' },
  { name: 'Financial', value: 150, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-surface/95 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-black text-gray-500 uppercase mb-1">{label}</p>
        <p className="text-sm font-bold text-white">
          {payload[0].name}: <span className="text-blue-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-widest mb-4">
                <Activity className="w-3 h-3" /> System Synchronized
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                {t('dashboard.title')}
              </h1>
              <p className="text-gray-500 font-medium text-lg">
                {t('dashboard.subtitle')}
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
                <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Status</div>
                <div className="text-emerald-500 font-mono text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ORCHESTRATING
                </div>
              </div>
            </div>
          </m.div>
        </div>

        {/* Top Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: t('dashboard.metrics.brain_syncs'), val: '1,284', icon: Brain, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
            { label: t('dashboard.metrics.active_hours'), val: '42.5h', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: t('dashboard.metrics.knowledge_nodes'), val: '89', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            { label: t('dashboard.metrics.orchestration_level'), val: 'Lvl 04', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          ].map((item, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl group hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{item.label}</div>
              <div className="text-2xl font-black text-white">{item.val}</div>
            </m.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Neural Sync Growth - Area Chart */}
          <m.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl"
          >
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-500" />
              {t('dashboard.growth_title')}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={neuralSyncData}>
                  <defs>
                    <linearGradient id="colorSync" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 900 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 900 }} 
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1 }} />
                  <Area 
                    type="monotone" 
                    dataKey="syncs" 
                    name="Syncs"
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSync)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </m.div>

          {/* Cognitive Distribution - Pie Chart */}
          <m.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl"
          >
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
              <Brain className="w-5 h-5 text-purple-500" />
              {t('dashboard.skills_title')}
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cognitiveDistribution}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {cognitiveDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </m.div>
        </div>

        {/* Longitudinal Trajectory - 12 Week Cohort Progress */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl mb-8"
        >
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            12-Week Cohort Engagement Trajectory
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortEngagementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="week" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 900 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                  content={<CustomTooltip />} 
                />
                <Bar 
                  dataKey="users" 
                  name="Active Syncers"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {cohortEngagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index > 8 ? '#3b82f6' : '#1e293b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-gray-500">
             <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded bg-[#1e293b]" /> Foundation Phases (W01-W08)
             </span>
             <span className="flex items-center gap-2">
               <div className="w-2 h-2 rounded bg-[#3b82f6]" /> Orchestration Mastery (W09-W12)
             </span>
          </div>
        </m.div>

        {/* Planet Mastery Snapshot */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-2xl"
        >
          <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
            <Target className="w-5 h-5 text-emerald-500" />
            Planet Progress Snapshot
          </h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={planetProgress} margin={{ left: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#fff', fontSize: 12, fontWeight: 900 }} 
                />
                <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
                <Bar 
                  dataKey="progress" 
                  radius={[0, 10, 10, 0]}
                  barSize={12}
                >
                  {planetProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default Dashboard;
