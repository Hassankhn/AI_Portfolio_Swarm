import React from 'react';
import { PieChart, ShieldCheck, ShieldAlert, ArrowUpRight, Search, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function AssetAllocation({ assets = [], onInspectAsset }) {
  // Compute category totals for stacked progress bar
  const totals = assets.reduce((acc, a) => {
    if (!a.shariaCompliant) return acc;
    const cat = a.category || 'Equity';
    acc[cat] = (acc[cat] || 0) + (a.allocationPercent || 0);
    return acc;
  }, {});

  const totalAllocatedPct = Object.values(totals).reduce((a, b) => a + b, 0);

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                AAOIFI Screened Asset Allocation & Holdings
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                0% Leverage
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Live quantitative weightings audited by Sharia Guardian AI
            </p>
          </div>
        </div>
      </div>

      {/* Visual Asset Allocation Stacked Bar */}
      <div className="mb-5 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-slate-400 font-sans font-semibold text-[11px]">Asset Mix Weighting Distribution</span>
          <span className="text-emerald-400 font-bold">{totalAllocatedPct.toFixed(1)}% Allocated</span>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full transition-all" style={{ width: `${totals['Halal Tech Equity'] || totals['Equity'] || 45}%` }} title="Halal Tech Equities"></div>
          <div className="bg-cyan-500 h-full transition-all" style={{ width: `${totals['Sovereign Sukuk'] || 25}%` }} title="Sovereign Sukuk"></div>
          <div className="bg-amber-500 h-full transition-all" style={{ width: `${totals['Commodities'] || totals['Gold'] || 15}%` }} title="Physical Spot Gold"></div>
          <div className="bg-purple-500 h-full transition-all" style={{ width: `${totals['Real Estate'] || 10}%` }} title="Islamic REITs"></div>
        </div>

        <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-slate-400 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Halal Equities ({totals['Halal Tech Equity'] || totals['Equity'] || 45}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span>Sukuk ({totals['Sovereign Sukuk'] || 25}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Gold ({totals['Commodities'] || totals['Gold'] || 15}%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>REITs ({totals['Real Estate'] || 10}%)</span>
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
              <th className="pb-2 pl-2">Asset Symbol</th>
              <th className="pb-2">Asset Name & Class</th>
              <th className="pb-2 text-right">Target Weight</th>
              <th className="pb-2 text-right">24h Return</th>
              <th className="pb-2 text-center">AAOIFI Screen</th>
              <th className="pb-2 pr-2 text-right">Audit Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {assets.map((asset) => (
              <tr 
                key={asset.symbol} 
                className={`hover:bg-slate-900/60 transition-colors ${!asset.shariaCompliant ? 'opacity-60 bg-red-950/20' : ''}`}
              >
                <td className="py-3 pl-2 font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span>{asset.symbol}</span>
                    {!asset.shariaCompliant && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-950 text-red-400 border border-red-500/40">
                        VETOED
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 font-sans">
                  <div className="font-bold text-slate-200 text-xs">{asset.name}</div>
                  <div className="text-[10px] text-slate-400">{asset.category}</div>
                </td>

                <td className="py-3 text-right font-bold text-white">
                  {asset.allocationPercent ? `${asset.allocationPercent}%` : '0%'}
                </td>

                <td className={`py-3 text-right font-bold ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                </td>

                <td className="py-3 text-center">
                  {asset.shariaCompliant ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-sans font-semibold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> Passed (100%)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 text-[10px] font-sans font-semibold">
                      <ShieldAlert className="w-3 h-3 text-red-400" /> Failed Sector
                    </span>
                  )}
                </td>

                <td className="py-3 pr-2 text-right">
                  <button
                    onClick={() => onInspectAsset(asset)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-sans font-semibold transition-colors"
                  >
                    Inspect →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
