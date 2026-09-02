import React from 'react';
import { X, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, DollarSign, PieChart, Info, Scale } from 'lucide-react';
import { evaluateAAOIFICompliance } from '../services/shariaScreener';

export default function ShariaInspector({ asset, isOpen, onClose }) {
  if (!isOpen || !asset) return null;

  const screening = evaluateAAOIFICompliance(asset);
  const isHalal = screening.isCompliant;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-emerald-500/40 p-5 sm:p-6 shadow-2xl scrollbar-thin">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${isHalal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {isHalal ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-mono">{asset.ticker}</h2>
                <span className="text-xs text-slate-400 font-sans">({asset.name})</span>
              </div>
              <p className="text-xs text-slate-400">AAOIFI Standard 21 Financial Ratio Inspection</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sharia Guardian Verdict Card */}
        <div className={`p-4 rounded-xl border mb-5 flex items-start gap-3 ${
          isHalal 
            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200' 
            : 'bg-red-950/70 border-red-500/40 text-red-200'
        }`}>
          {isHalal ? <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />}
          <div>
            <div className="font-bold text-sm mb-0.5 uppercase tracking-wide">
              {isHalal ? 'AAOIFI CERTIFIED SHARIA COMPLIANT' : 'STRICT VETO: IMPERMISSIBLE (HARAM) ASSET'}
            </div>
            <div className="text-xs leading-relaxed opacity-90 font-sans">
              {asset.reasoning}
            </div>
          </div>
        </div>

        {/* Financial Ratio Audit Table */}
        <div className="space-y-3 mb-5 font-sans">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            AAOIFI Standard 21 Audit Criteria
          </div>

          {/* 1. Sector Check */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">1. Core Business Sector</div>
                <div className="text-[11px] text-slate-400">Sector: {asset.sector}</div>
              </div>
            </div>
            {screening.checks.sectorCheck.pass ? (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-bold font-mono">
                PASS (HALAL SECTOR)
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-red-950 text-red-400 border border-red-500/40 text-xs font-bold font-mono">
                FAIL (HARAM SECTOR)
              </span>
            )}
          </div>

          {/* 2. Debt Ratio */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">2. Interest-Bearing Debt Ratio</div>
                <div className="text-[11px] text-slate-400">Debt / Market Cap (Limit: &lt; 33%)</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                screening.checks.debtRatioCheck.pass
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-950 text-red-400 border-red-500/40'
              }`}>
                {asset.debtRatio}%
              </span>
            </div>
          </div>

          {/* 3. Cash & Interest Ratio */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">3. Interest Cash & Securities</div>
                <div className="text-[11px] text-slate-400">Cash / Market Cap (Limit: &lt; 33%)</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                screening.checks.cashInterestCheck.pass
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-950 text-red-400 border-red-500/40'
              }`}>
                {asset.cashInterestRatio}%
              </span>
            </div>
          </div>

          {/* 4. Non-Halal Revenue Purification */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">4. Impermissible Income & Purification</div>
                <div className="text-[11px] text-slate-400">Non-Halal Rev (Limit: &lt; 5%)</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${
                screening.checks.impermissibleRevCheck.pass
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-950 text-red-400 border-red-500/40'
              }`}>
                {asset.impermissibleRevenue}%
              </span>
              {asset.purificationPerShare > 0 && (
                <div className="text-[10px] text-purple-300 mt-1 font-mono font-semibold">
                  Purify: ${asset.purificationPerShare}/share
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
