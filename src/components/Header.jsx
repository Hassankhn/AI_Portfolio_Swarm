import React, { useState } from 'react';
import { ShieldCheck, Key, PlusCircle, ArrowUpRight, Scale, Calculator, ChevronDown } from 'lucide-react';

export default function Header({ portfolio, onOpenBrokerModal, onOpenDepositModal, onOpenZakatModal }) {
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-emerald-900/40 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/50 ring-2 ring-emerald-400/30">
              <Scale className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  AL-MIZAN <span className="text-emerald-400 font-extrabold">AI</span>
                </h1>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-mono font-semibold">
                  AAOIFI v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>Autonomous Sharia Portfolio Swarm</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Sharia Certified Badge Mobile */}
          <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Halal</span>
          </div>
        </div>

        {/* Live Net Worth & Stats Header */}
        <div className="flex items-center justify-center gap-6 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800/80 shadow-inner w-full md:w-auto">
          <div className="text-center md:text-left">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Portfolio Balance</div>
            <div className="text-lg font-extrabold text-white font-mono flex items-center gap-1.5">
              ${portfolio.totalCapitalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +{portfolio.dailyProfitPercent}%
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

          <div className="text-center md:text-left hidden sm:block">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">24h Halal Yield</div>
            <div className="text-base font-bold text-emerald-400 font-mono">
              +${portfolio.dailyProfitUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Actions & Navigation Tools */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end flex-wrap relative">
          
          {/* Islamic Finance Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-purple-400" />
              <span>Islamic Tools</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isToolsMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 glass-panel-glow rounded-xl border border-purple-500/30 p-2 shadow-2xl z-50 animate-fade-in"
                onMouseLeave={() => setIsToolsMenuOpen(false)}
              >
                <button
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    onOpenZakatModal();
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-purple-950/50 flex items-center gap-2.5 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-purple-300">Zakat & Purification Calculator</div>
                    <div className="text-[10px] text-slate-400">Hawl & Nisab wealth assessment</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Broker Access Pill */}
          <button 
            onClick={onOpenBrokerModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-slate-200 text-xs font-medium transition-all hover:border-amber-400 shadow-sm group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Key className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <div className="text-left font-mono">
              <span className="text-slate-400 block text-[9px] leading-tight uppercase">Broker API</span>
              <span className="text-amber-300 font-semibold leading-tight">{portfolio.brokerConnected.name}</span>
            </div>
          </button>

          {/* Deposit Capital Button */}
          <button 
            onClick={onOpenDepositModal}
            className="emerald-shimmer-btn flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-950 shadow-md transition-transform"
          >
            <PlusCircle className="w-4 h-4 fill-slate-950 text-emerald-400" />
            <span>Fund Capital</span>
          </button>

        </div>

      </div>
    </header>
  );
}
