import React, { useState, useEffect } from 'react';
import { X, PlusCircle, ArrowUpRight, ShieldCheck, DollarSign, Lock, AlertCircle } from 'lucide-react';

export default function DepositModal({ isOpen, onClose, onDeposit }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('deposit'); // 'deposit' or 'withdraw'
  const [amount, setAmount] = useState('10000');
  const [confirmed, setConfirmed] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!isNaN(num) && num > 0) {
      onDeposit(num, mode);
      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md glass-panel-glow rounded-2xl border border-emerald-500/40 p-5 sm:p-6 shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Manage Investment Capital</h2>
              <p className="text-xs text-slate-400">Adjust active portfolio capital allocation</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('deposit')}
            className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all text-center ${
              mode === 'deposit'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            💰 Deposit Capital
          </button>
          <button
            type="button"
            onClick={() => setMode('withdraw')}
            className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all text-center ${
              mode === 'withdraw'
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            🏦 Withdraw Profits
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {mode === 'deposit' ? 'Capital Deposit Amount ($)' : 'Profit Withdrawal Amount ($)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-emerald-400 font-mono font-bold text-sm">$</span>
              <input
                type="number"
                min="100"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-4 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {['1000', '5000', '10000', '25000'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="flex-1 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                +${parseInt(val).toLocaleString()}
              </button>
            ))}
          </div>

          {/* Security Guardrail Note */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Capital Protection Guardrail
            </div>
            <p className="leading-relaxed">
              {mode === 'deposit' 
                ? 'Deposited capital is immediately screened for AAOIFI compliance and deployed into Sukuk and Halal equities.'
                : 'For your security, API keys cannot execute bank wire transfers. Actual bank withdrawals must be authorized inside your broker portal.'}
            </p>
          </div>

          {/* Confirmation Message */}
          {confirmed && (
            <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold text-center animate-fade-in">
              ✅ Capital {mode === 'deposit' ? 'Deposited' : 'Withdrawn'} Successfully! Rebalancing Swarm...
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="emerald-shimmer-btn px-5 py-2 rounded-xl text-xs font-bold text-slate-950 font-mono shadow-md"
            >
              Confirm {mode === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
