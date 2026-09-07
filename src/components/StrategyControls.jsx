import React, { useState } from 'react';
import { Sliders, Shield, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function StrategyControls({ currentStrategy, onUpdateStrategy, portfolioBalance = 50000 }) {
  const [profile, setProfile] = useState(currentStrategy?.profile || 'Mudarabah Growth');
  const [autoRebalance, setAutoRebalance] = useState(currentStrategy?.autoRebalance ?? true);
  const [autoPurify, setAutoPurify] = useState(currentStrategy?.autoPurify ?? true);
  const [maxAllocation, setMaxAllocation] = useState(currentStrategy?.maxAllocation ?? 20);
  const [isSaved, setIsSaved] = useState(false);

  const calculatedDollarCap = (portfolioBalance * (maxAllocation / 100)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleSave = () => {
    const updated = {
      profile,
      autoRebalance,
      autoPurify,
      maxAllocation
    };
    onUpdateStrategy(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Agent Strategy & Risk Tuning
            </h2>
            <p className="text-xs text-slate-400">
              Customize how the 6 simultaneous AI agents manage your capital allocation
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Strategy Profile Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Risk Profile Model
          </label>
          <div className="space-y-2">
            {[
              { id: 'Amana Conservative', label: 'Amana Conservative', desc: '60% Sukuk / Gold, 40% Equities' },
              { id: 'Mudarabah Growth', label: 'Mudarabah Growth', desc: '75% Halal Equities, 25% Safe Havens' },
              { id: 'Takaful High Yield', label: 'Takaful High Yield', desc: '85% Halal Tech Momentum, 15% Sukuk' }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setProfile(item.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  profile === item.id 
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-white shadow-md' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-sans flex items-center justify-between">
                  <span>{item.label}</span>
                  {profile === item.id && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Allocation Limits */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Single Asset Allocation Cap</span>
              <span className="font-mono font-bold text-emerald-400">{maxAllocation}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={maxAllocation}
              onChange={(e) => setMaxAllocation(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-slate-800"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>5% Min</span>
              <span className="text-amber-300 font-bold">Max Cap: ${calculatedDollarCap} USD</span>
              <span>30% Max</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Auto-Rebalance Portfolio</span>
              <button
                onClick={() => setAutoRebalance(!autoRebalance)}
                className={`w-10 h-5 rounded-full transition-colors relative ${autoRebalance ? 'bg-emerald-500' : 'bg-slate-800'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-slate-950 absolute top-0.5 transition-all ${autoRebalance ? 'right-0.5' : 'left-0.5'}`}></span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Auto-Divert Dividend Purification</span>
              <button
                onClick={() => setAutoPurify(!autoPurify)}
                className={`w-10 h-5 rounded-full transition-colors relative ${autoPurify ? 'bg-purple-500' : 'bg-slate-800'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-slate-950 absolute top-0.5 transition-all ${autoPurify ? 'right-0.5' : 'left-0.5'}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Save & Transmit Actions */}
        <div className="flex flex-col justify-between">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" /> AAOIFI Guardrail Protection
            </div>
            <p className="text-[11px]">
              All custom strategy profile updates are checked against AAOIFI Standard No. 21 (0% Riba, 0x Leverage). Non-compliant parameters are automatically vetoed.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Strategy Transmitted to Swarm!</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 text-slate-950" />
                  <span>Apply Strategy Rules & Transmit to Swarm</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
