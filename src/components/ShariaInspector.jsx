import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ShieldAlert, BarChart2, TrendingUp, Info, Scale, Cpu, Activity } from 'lucide-react';

export default function ShariaInspector({ asset, isOpen, onClose }) {
  if (!isOpen || !asset) return null;

  const [activeTab, setActiveTab] = useState('aaoifi');

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass-panel-glow rounded-2xl border border-emerald-500/40 p-5 sm:p-6 shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${asset.shariaCompliant ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {asset.shariaCompliant ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{asset.name} ({asset.symbol})</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase border ${
                  asset.shariaCompliant ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' : 'bg-red-950 text-red-300 border-red-500/40'
                }`}>
                  {asset.shariaCompliant ? '100% HALAL PASSED' : 'VETOED / NON-COMPLIANT'}
                </span>
              </div>
              <p className="text-xs text-slate-400">{asset.category} • AAOIFI Standard No. 21 Audit</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('aaoifi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'aaoifi' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>AAOIFI Sharia Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Trader Analytics & Technicals</span>
          </button>
        </div>

        {/* Tab 1: AAOIFI Sharia Screen */}
        {activeTab === 'aaoifi' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans mb-1">Debt / Market Cap Ratio</div>
                <div className="text-sm font-bold text-emerald-400">
                  {asset.debtToCap || '12.4'}%
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">&lt; 33.0% Max Limit</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans mb-1">Cash Interest Income</div>
                <div className="text-sm font-bold text-emerald-400">
                  {asset.interestCash || '4.1'}%
                </div>
                <div className="text-[9px] text-slate-500 mt-0.5">&lt; 33.0% Max Limit</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-sans mb-1">Impermissible Revenue</div>
                <div className="text-sm font-bold text-purple-300">
                  {asset.nonHalalRevenue || '1.2'}%
                </div>
                <div className="text-[9px] text-purple-400 font-sans mt-0.5">Auto-Purified to Charity</div>
              </div>

            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-sans leading-relaxed text-slate-300">
              <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" /> AAOIFI Audit Summary
              </div>
              <p>
                {asset.shariaCompliant 
                  ? `${asset.name} passed all 3 AAOIFI Standard 21 financial screening ratios. Debt is well below 33%, and micro-impermissible revenue (${asset.nonHalalRevenue || '1.2'}%) is isolated by Zakat Agent for charity purification.`
                  : `${asset.name} failed AAOIFI screening due to prohibited business activity (Riba / Conventional Finance / Alcohol). Trade requests are automatically vetoed by Sharia Guardian AI.`}
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Trader Analytics & Technicals */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">P/E Ratio</div>
                <div className="text-sm font-bold text-white">{asset.peRatio || '31.4'}</div>
                <div className="text-[9px] text-slate-500">Valuation Metric</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">Revenue YoY %</div>
                <div className="text-sm font-bold text-emerald-400">+{asset.revGrowthYoY || '24.8'}%</div>
                <div className="text-[9px] text-slate-500">Fundamental Growth</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">RSI (14-Day)</div>
                <div className="text-sm font-bold text-cyan-300">{asset.rsi14 || '58.2'}</div>
                <div className="text-[9px] text-slate-500">Technical Momentum</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-sans uppercase mb-1">SMA Trend</div>
                <div className="text-sm font-bold text-emerald-400">Bullish</div>
                <div className="text-[9px] text-slate-500">Above SMA-50</div>
              </div>

            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-sans leading-relaxed text-slate-300 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" /> Multi-Agent Policy Reasoning
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-purple-400 font-bold">Semantic NLP: </span>
                  <span>+0.88 Bullish (Strong Earnings Trend)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold">Quant Policy: </span>
                  <span>Spot DCA Order (0x Leverage)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
