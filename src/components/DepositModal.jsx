import React, { useState } from 'react';
import { X, ArrowDownRight, ArrowUpRight, ShieldCheck, Wallet } from 'lucide-react';

export default function DepositModal({ isOpen, onClose, onDeposit }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('deposit');
  const [amount, setAmount] = useState('10000');
  const [selectedCurrency] = useState('USD');

  const presetAmounts = [1000, 5000, 10000, 25000, 50000];

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericVal = parseFloat(amount);
    if (isNaN(numericVal) || numericVal <= 0) return;

    onDeposit(mode === 'deposit' ? numericVal : -numericVal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-emerald-500/40 p-6 shadow-2xl scrollbar-thin">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Manage Investment Capital</h2>
              <p className="text-xs text-slate-400">Fund your autonomous multi-agent portfolio</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deposit vs Withdraw Tab */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setMode('deposit')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'deposit' 
                ? 'bg-emerald-600 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>Deposit Funds</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('withdraw')}
            className={`py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              mode === 'withdraw' 
                ? 'bg-amber-600 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Withdraw Profits</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Enter Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-400 font-mono font-bold">
                $
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-16 py-3 text-lg font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
                step="500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center font-mono text-xs font-semibold text-slate-400">
                {selectedCurrency}
              </div>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div>
            <div className="text-[11px] text-slate-400 mb-1.5">Quick Presets:</div>
            <div className="flex flex-wrap gap-2">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset.toString())}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  +${preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Capital will be deployed across AAOIFI-screened Halal assets immediately by the Yield Agent.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="emerald-shimmer-btn px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 shadow-lg"
            >
              {mode === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
