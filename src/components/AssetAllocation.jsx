import React, { useState } from 'react';
import { PieChart, ShieldCheck, ArrowUpRight, ArrowDownRight, Search, Filter, ExternalLink, AlertTriangle } from 'lucide-react';

export default function AssetAllocation({ assets, onInspectAsset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', 'Equity', 'Sukuk', 'Commodities', 'Islamic REIT', 'Crypto Asset'];

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || asset.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-amber-400" />
            Asset Holdings & AAOIFI Compliance Breakdown
          </h2>
          <p className="text-xs text-slate-400">
            Real-time asset allocations audited continuously by Sharia Guardian AI
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              categoryFilter === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <th className="pb-3 pl-2">Asset Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3 text-right">Price</th>
              <th className="pb-3 text-right">24h Change</th>
              <th className="pb-3 text-right">Holdings Value</th>
              <th className="pb-3 text-center">AAOIFI Score</th>
              <th className="pb-3 text-center">Sharia Audit</th>
              <th className="pb-3 pr-2 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredAssets.map((asset) => {
              const isCompliant = asset.complianceStatus === 'COMPLIANT';
              return (
                <tr 
                  key={asset.ticker}
                  className={`hover:bg-slate-900/60 transition-colors ${!isCompliant ? 'opacity-60 bg-red-950/10' : ''}`}
                >
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-white text-sm font-sans flex items-center gap-1.5">
                        {asset.ticker}
                        <span className="text-[10px] text-slate-400 font-normal">({asset.name})</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3">
                    <span className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {asset.category}
                    </span>
                  </td>

                  <td className="py-3 text-right text-white font-bold">
                    ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>

                  <td className={`py-3 text-right font-semibold ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    <span className="inline-flex items-center">
                      {asset.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {asset.change24h}%
                    </span>
                  </td>

                  <td className="py-3 text-right text-white font-bold">
                    ${asset.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    <div className="text-[10px] text-slate-500 font-normal">{asset.allocationPercent}% Portfolio</div>
                  </td>

                  <td className="py-3 text-center">
                    {isCompliant ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        {asset.aaoifiScore} / 100
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/40 text-[10px] font-bold">
                        0 / 100
                      </span>
                    )}
                  </td>

                  <td className="py-3 text-center">
                    {isCompliant ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-sans font-semibold">
                        <ShieldCheck className="w-3 h-3" /> 100% Halal
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-950/80 text-red-400 border border-red-500/40 text-[10px] font-sans font-semibold">
                        <AlertTriangle className="w-3 h-3" /> Blocked Veto
                      </span>
                    )}
                  </td>

                  <td className="py-3 pr-2 text-right">
                    <button
                      onClick={() => onInspectAsset(asset)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
                      title="Inspect AAOIFI Financial Ratios"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
