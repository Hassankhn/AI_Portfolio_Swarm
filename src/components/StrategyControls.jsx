import React, { useState } from 'react';
import { Sliders, ShieldCheck, Zap, RefreshCw, Lock, Sparkles, Check } from 'lucide-react';

export default function StrategyControls({ currentStrategy, onUpdateStrategy }) {
  const [activeProfile, setActiveProfile] = useState('Mudarabah Growth');
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [autoPurify, setAutoPurify] = useState(true);
  const [maxAllocation, setMaxAllocation] = useState(20);

  const profiles = [
    {
      id: "Amana Conservative",
      name: "Amana Conservative",
      icon: "🛡️",
      desc: "Low-volatility wealth preservation. 60% Sukuk, 25% Gold, 15% Halal Equities."
    },
    {
      id: "Mudarabah Growth",
      name: "Mudarabah Balanced Growth",
      icon: "📈",
      desc: "Optimal capital expansion. 50% Halal Tech, 30% Sukuk, 15% Gold, 5% Spot Crypto."
    },
    {
      id: "Takaful Aggressive",
      name: "Takaful High Growth",
      icon: "⚡",
      desc: "Aggressive halal tech momentum. 75% Halal Equities, 15% Spot Crypto, 10% Gold."
    }
  ];

  const handleProfileSelect = (id) => {
    setActiveProfile(id);
    onUpdateStrategy({ profile: id, autoRebalance, autoPurify, maxAllocation });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Agent Strategy & Risk Tuning
            </h2>
            <p className="text-xs text-slate-400">
              Customize how the 5 simultaneous AI agents manage your capital allocation
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
          0% LEVERAGE ENFORCED
        </span>
      </div>

      {/* Risk Profile Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleProfileSelect(profile.id)}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
              activeProfile === profile.id
                ? 'bg-slate-900 border-emerald-400 shadow-lg shadow-emerald-950/50 ring-1 ring-emerald-400/50'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{profile.icon}</span>
                {activeProfile === profile.id && (
                  <span className="p-1 rounded-full bg-emerald-500 text-slate-950">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div className="font-bold text-sm text-white mb-1">{profile.name}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{profile.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle Controls & Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
        
        {/* Toggle 1: Auto Rebalance */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Auto-Yield Rebalance</div>
            <div className="text-[11px] text-slate-400">Quantitative Agent tuning</div>
          </div>
          <button
            type="button"
            onClick={() => setAutoRebalance(!autoRebalance)}
            className={`w-10 h-6 rounded-full transition-colors p-1 flex items-center ${
              autoRebalance ? 'bg-emerald-500 justify-end' : 'bg-slate-800 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
          </button>
        </div>

        {/* Toggle 2: Auto Purify */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Auto-Charity Purification</div>
            <div className="text-[11px] text-purple-300">Route micro non-halal rev</div>
          </div>
          <button
            type="button"
            onClick={() => setAutoPurify(!autoPurify)}
            className={`w-10 h-6 rounded-full transition-colors p-1 flex items-center ${
              autoPurify ? 'bg-purple-500 justify-end' : 'bg-slate-800 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md"></span>
          </button>
        </div>

        {/* Slider: Max Single Asset Cap */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-white">Single Stock Cap</span>
            <span className="font-mono font-bold text-amber-400">{maxAllocation}% Max</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={maxAllocation}
            onChange={(e) => setMaxAllocation(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

      </div>

    </div>
  );
}
