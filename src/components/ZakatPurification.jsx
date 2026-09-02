import React, { useState } from 'react';
import { X, Scale, HeartHandshake, CheckCircle2, DollarSign, Calendar, Info, ShieldCheck } from 'lucide-react';

export default function ZakatPurification({ portfolio, isOpen, onClose }) {
  if (!isOpen) return null;

  const [purificationLogs] = useState([
    { id: "P-8841", date: "2026-08-08", source: "MSFT Quarterly Dividend", rawDividend: 120.00, impermissiblePercent: 1.8, purifiedAmount: 2.16, status: "Diverted to Charity Vault #CH-994" },
    { id: "P-8842", date: "2026-08-05", source: "AAPL Dividend Distribution", rawDividend: 85.50, impermissiblePercent: 1.4, purifiedAmount: 1.20, status: "Diverted to Relief International" },
    { id: "P-8843", date: "2026-07-28", source: "AMZN E-Commerce Services", rawDividend: 94.00, impermissiblePercent: 2.1, purifiedAmount: 1.97, status: "Diverted to Islamic Relief Worldwide" }
  ]);

  const [zakatPaid, setZakatPaid] = useState(false);

  // Custom user inputs for precise Zakat calculation (yearly income after one year / before Ramadan)
  const [annualSavings, setAnnualSavings] = useState((portfolio?.totalCapitalUSD || 50000).toString());
  const [goldPriceGram] = useState(68.70); // USD per gram

  const nisabThresholdUSD = 85 * goldPriceGram; // 85 grams of gold
  const userWealth = parseFloat(annualSavings) || 0;
  const isAboveNisab = userWealth >= nisabThresholdUSD;
  const calculatedZakat = isAboveNisab ? userWealth * 0.025 : 0;

  const handlePayZakat = () => {
    setZakatPaid(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-purple-500/40 p-5 sm:p-6 shadow-2xl scrollbar-thin">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Zakat Wealth Calculator & Income Purification Vault
              </h2>
              <p className="text-xs text-slate-400">
                Automated Islamic jurisprudence accounting pursuant to AAOIFI Standard No. 59
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Zakat Calculator Card */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> Hawl (1-Year) Zakat Calculator
                </span>
                <span className="text-[10px] text-purple-300 font-semibold bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                  AAOIFI Standard 59
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Zakat is 2.5% of your total net liquid wealth/savings held continuously for one full lunar year (Hawl) above the Nisab threshold.
              </p>

              {/* User input for Hawl Savings */}
              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Net Liquid Wealth / Savings Held 1 Full Year ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-emerald-400 font-mono font-bold text-xs">$</span>
                  <input
                    type="number"
                    value={annualSavings}
                    onChange={(e) => setAnnualSavings(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-7 pr-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs mb-5">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">Current Nisab (85g Gold):</span>
                  <span className="text-amber-300 font-bold">${nisabThresholdUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="flex justify-between py-1.5 border-b border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">Nisab Status:</span>
                  <span className={`font-bold ${isAboveNisab ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {isAboveNisab ? 'ABOVE NISAB (ZAKAT DUE)' : 'BELOW NISAB (EXEMPT)'}
                  </span>
                </div>

                <div className="flex justify-between py-2 text-sm bg-purple-950/60 p-3 rounded-xl border border-purple-500/30 mt-3">
                  <span className="text-purple-200 font-bold">Payable Zakat (2.5% Rate):</span>
                  <span className="text-purple-300 font-extrabold text-base">
                    ${calculatedZakat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayZakat}
              disabled={zakatPaid || calculatedZakat === 0}
              className={`w-full py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                zakatPaid 
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default' 
                  : calculatedZakat > 0
                  ? 'gold-shimmer-btn text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
              }`}
            >
              {zakatPaid ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Zakat Distributed to Verified Charity</span>
                </>
              ) : (
                <>
                  <HeartHandshake className="w-4 h-4" />
                  <span>Distribute Zakat (${calculatedZakat.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Charity Purification Itemized Audit */}
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" /> Micro-Dividend Purification Vault
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  Total Purified: ${portfolio?.purifiedCharityTotalUSD?.toFixed(2) || '142.30'}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                Per AAOIFI rules, micro interest revenue (&lt;5%) in dividend payments is automatically isolated and routed directly to verified non-profit partners so your principal remains 100% pure.
              </p>

              <div className="space-y-2 font-mono text-xs overflow-y-auto max-h-56 scrollbar-thin pr-1">
                {purificationLogs.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
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

            <div className="pt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
              >
                Close Window
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
