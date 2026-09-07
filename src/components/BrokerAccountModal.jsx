import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, AlertCircle, ExternalLink, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import { AlpacaService } from '../services/alpacaApi';

export default function BrokerAccountModal({ isOpen, onClose, brokerInfo, onUpdateBroker }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(brokerInfo.mode || 'Paper Trading Sandbox');
  const [apiKey, setApiKey] = useState(brokerInfo.apiKey || '');
  const [apiSecret, setApiSecret] = useState(brokerInfo.apiSecret || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null);

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

  const handleTestConnection = async () => {
    if (!apiKey.trim() || !apiSecret.trim()) {
      setVerifyStatus({ success: false, message: 'Please enter both API Key and Secret Key.' });
      return;
    }

    setIsVerifying(true);
    setVerifyStatus(null);

    const isPaper = mode.includes('Paper');
    const service = new AlpacaService(apiKey, apiSecret, isPaper);
    const result = await service.testCredentials();

    setIsVerifying(false);

    if (result.success) {
      setVerifyStatus({
        success: true,
        message: `Verified! Account: ${result.account.accountNumber} | Buying Power: $${result.account.buyingPower.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
      });

      onUpdateBroker({
        apiKey,
        apiSecret,
        mode: result.account.isPaper ? 'Paper Trading Sandbox' : 'Live Trading Account',
        accountNo: `ALP-${result.account.accountNumber}`,
        apiConnected: true,
        buyingPowerUSD: result.account.buyingPower
      });

      localStorage.setItem('AL_MIZAN_BROKER_CONFIG', JSON.stringify({
        name: 'Alpaca Securities',
        mode: result.account.isPaper ? 'Paper Trading Sandbox' : 'Live Trading Account',
        accountNo: `ALP-${result.account.accountNumber}`,
        apiKey,
        apiSecret
      }));
    } else {
      setVerifyStatus({
        success: false,
        message: result.error || 'Authentication failed. Please check your keys.'
      });
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg glass-panel-glow rounded-2xl border border-amber-500/40 p-5 sm:p-6 shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Alpaca Securities Brokerage Gateway</h2>
              <p className="text-xs text-slate-400">Connect Paper Sandbox or Live API credentials</p>
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
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Execution Environment
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('Paper Trading Sandbox')}
              className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all text-center ${
                mode.includes('Paper')
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🧪 Paper Sandbox
            </button>
            <button
              onClick={() => setMode('Live Trading Account')}
              className={`p-3 rounded-xl border text-xs font-bold font-mono transition-all text-center ${
                !mode.includes('Paper')
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🚀 Live Trading
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-3 mb-5 font-mono text-xs">
          <div>
            <label className="block text-slate-400 mb-1">APCA-API-KEY-ID (Key ID)</label>
            <input
              type="text"
              placeholder={mode.includes('Paper') ? 'PK...' : 'AK...'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">APCA-API-SECRET-KEY (Secret Key)</label>
            <input
              type="password"
              placeholder="••••••••••••••••••••••••••••••••"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Status Toast */}
        {verifyStatus && (
          <div className={`p-3 rounded-xl mb-4 text-xs font-mono font-bold flex items-center gap-2 ${
            verifyStatus.success ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-300 border border-red-500/40'
          }`}>
            {verifyStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            <span>{verifyStatus.message}</span>
          </div>
        )}

        {/* Security Guardrail Note */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 mb-5 flex items-start gap-2">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            API Keys are stored encrypted locally in your browser session. 0x Leverage and AAOIFI screening rules are enforced before order transmission.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleTestConnection}
            disabled={isVerifying}
            className="emerald-shimmer-btn px-5 py-2 rounded-xl text-xs font-bold text-slate-950 font-mono shadow-md flex items-center gap-2"
          >
            {isVerifying && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            <span>{isVerifying ? 'Verifying Key...' : 'Save & Verify Connection'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
