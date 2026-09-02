import React, { useState } from 'react';
import { Scale, HeartHandshake, CheckCircle2, DollarSign, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ZakatPurification({ portfolio, isOpen, onClose }) {
  const [purificationLogs, setPurificationLogs] = useState([
    { id: "P-8841", date: "2026-08-08", source: "MSFT Quarterly Dividend", rawDividend: 120.00, impermissiblePercent: 1.8, purifiedAmount: 2.16, status: "Diverted to Charity Vault #CH-994" },
    { id: "P-8842", date: "2026-08-05", source: "AAPL Dividend Distribution", rawDividend: 85.50, impermissiblePercent: 1.4, purifiedAmount: 1.20, status: "Diverted to Relief International" },
    { id: "P-8843", date: "2026-07-28", source: "AMZN E-Commerce Services", rawDividend: 94.00, impermissiblePercent: 2.1, purifiedAmount: 1.97, status: "Diverted to Islamic Relief Worldwide" }
  ]);

  const [zakatPaid, setZakatPaid] = useState(false);

  const handlePayZakat = () => {
    setZakatPaid(true);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Zakat Wealth Calculator & Income Purification Vault
            </h2>
            <p className="text-xs text-slate-400">
              Automated Islamic accounting pursuant to AAOIFI Standard No. 59
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
            AAOIFI Standard 59
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Zakat Calculator Card */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Scale className="w-4 h-4" /> Zakat Liability Assessment
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Hawl Lunar Cycle: 100% Complete
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs mb-5">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Zakatable Net Asset Base:</span>
                <span className="text-white font-bold">${portfolio.totalCapitalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Current Nisab (85g Gold Price):</span>
                <span className="text-amber-300 font-bold">${portfolio.nisabGoldThresholdUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Nisab Status:</span>
                <span className="text-emerald-400 font-bold">ABOVE NISAB (ZAKAT DUE)</span>
              </div>

              <div className="flex justify-between py-2 text-sm bg-purple-950/60 p-3 rounded-xl border border-purple-500/30">
                <span className="text-purple-200 font-bold">Payable Zakat (2.5% Rate):</span>
                <span className="text-purple-300 font-extrabold text-base">
                  ${portfolio.zakatPayableUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayZakat}
            disabled={zakatPaid}
            className={`w-full py-3 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
              zakatPaid 
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default' 
                : 'gold-shimmer-btn text-slate-950 shadow-lg'
            }`}
          >
            {zakatPaid ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zakat Liability Paid & Distributed to Certified Charity</span>
              </>
            ) : (
              <>
                <HeartHandshake className="w-4 h-4" />
                <span>Distribute Zakat (${portfolio.zakatPayableUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}) Now</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Charity Purification Itemized Audit */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4" /> Micro-Dividend Purification Log
            </span>
            <span className="text-xs font-mono font-bold text-white">
              Total Purified: ${portfolio.purifiedCharityTotalUSD.toFixed(2)}
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
            Per AAOIFI rules, micro interest revenue (&lt;5%) in dividend payments is automatically isolated and routed directly to verified non-profit partners so your principal remains 100% pure.
          </p>

          <div className="space-y-2 font-mono text-xs overflow-y-auto max-h-48 scrollbar-thin pr-1">
            {purificationLogs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-bold text-[11px]">{log.source}</div>
                  <div className="text-[10px] text-slate-500">{log.date} • Impermissible: {log.impermissiblePercent}%</div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 font-bold text-xs">+${log.purifiedAmount.toFixed(2)}</div>
                  <div className="text-[9px] text-emerald-400 font-sans">{log.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
