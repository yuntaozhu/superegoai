
import React from 'react';
import { Settings, Layers, Thermometer, ListFilter } from 'lucide-react';
import { RAGConfig } from '../hooks/useGeminiBrain';

interface RagSettingsProps {
  config: RAGConfig;
  setConfig: (config: RAGConfig) => void;
}

const RagSettings: React.FC<RagSettingsProps> = ({ config, setConfig }) => {
  const handleChange = (key: keyof RAGConfig, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  return (
    <div className="p-4 border-t border-white/10 bg-[#05060f]">
      <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <Settings className="w-3 h-3" /> Inference Configuration
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Strategy Selector */}
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-gray-400 flex items-center gap-2">
            <Layers className="w-3 h-3" /> Retrieval Strategy
          </label>
          <select 
            value={config.strategy}
            onChange={(e) => handleChange('strategy', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="parent">Parent Document</option>
            <option value="contextual">Contextual Retrieval</option>
          </select>
        </div>

        {/* Top K Slider */}
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-gray-400 flex items-center gap-2 justify-between">
            <span className="flex items-center gap-2"><ListFilter className="w-3 h-3" /> Top K Chunks</span>
            <span className="text-blue-400">{config.topK}</span>
          </label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={config.topK}
            onChange={(e) => handleChange('topK', parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>

        {/* Temperature Slider */}
        <div className="space-y-2">
          <label className="text-[9px] font-mono text-gray-400 flex items-center gap-2 justify-between">
            <span className="flex items-center gap-2"><Thermometer className="w-3 h-3" /> Temperature</span>
            <span className="text-orange-400">{config.temperature}</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={config.temperature}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>

      </div>
    </div>
  );
};

export default RagSettings;
