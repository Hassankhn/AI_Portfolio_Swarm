import React from 'react';
import { DollarSign, TrendingUp, HeartHandshake, ShieldCheck, Bot, Info } from 'lucide-react';

export default function PortfolioOverview({ portfolio, agentCount = 6, onOpenZakatModal, onOpenShariaInspector }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* 1. Net Capital & APY */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            Net Halal Capital
            <Info className="w-3 h-3 text-slate-500" title="Active capital deployed across AAOIFI-screened assets" />
          </span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-white font-mono mb-1">
          ${portfolio.totalCapitalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Projected APY:
          </span>
          <span className="font-bold text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            +{portfolio.halalYieldAPY}%
          </span>
        </div>
      </div>

      {/* 2. Autonomous Agents Swarm */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Autonomous AI Swarm</span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Bot className="w-4 h-4 animate-bounce" />
          </div>
        </div>
        <div className="text-2xl font-black text-white font-mono mb-1 flex items-center gap-2">
          {agentCount} / {agentCount}
          <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30 uppercase tracking-wide">
            Simultaneous
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>100% Sharia Veto Active</span>
        </div>
      </div>

      {/* 3. Purified Income Vault */}
      <div 
        onClick={onOpenZakatModal}
        className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 transition-all relative overflow-hidden cursor-pointer group"
        title="Click to view Zakat & Purification Calculator"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Charity Purification</span>
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <HeartHandshake className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-white font-mono mb-1">
          ${portfolio.purifiedCharityTotalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span>Auto-routed Micro Fractions</span>
          <span className="text-purple-300 font-semibold font-mono text-[11px] underline group-hover:text-purple-200">View Vault →</span>
        </div>
      </div>

      {/* 4. AAOIFI Sharia Certification Score */}
      <div 
        onClick={onOpenShariaInspector}
        className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all relative overflow-hidden cursor-pointer group"
        title="Click to inspect AAOIFI screening rules"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AAOIFI Compliance</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-black text-emerald-400 font-mono mb-1 flex items-center justify-between">
          <span>100% Halal</span>
          <span className="text-xs font-sans text-emerald-300 underline font-normal group-hover:text-emerald-200">Audit →</span>
        </div>
        <div className="text-xs text-slate-400 flex items-center justify-between">
          <span className="text-emerald-400 font-medium">Standards 21 & 59 Verified</span>
          <span className="text-slate-500 font-mono text-[10px]">0 Riba</span>
        </div>
      </div>

    </div>
  );
}
