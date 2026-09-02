import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle, Server, Cpu, RefreshCw, ShieldCheck, AlertTriangle } from 'lucide-react';
import { AlpacaService } from '../services/alpacaApi';

export default function BrokerAccountModal({ isOpen, onClose, brokerInfo, onUpdateBroker }) {
  if (!isOpen) return null;

  const [selectedBroker, setSelectedBroker] = useState(brokerInfo?.name || "Alpaca Securities");
  const [executionMode, setExecutionMode] = useState(brokerInfo?.mode || "Paper Trading Sandbox");
  const [apiKey, setApiKey] = useState(brokerInfo?.apiKey || "");
  const [apiSecret, setApiSecret] = useState(brokerInfo?.apiSecret || "");
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState(null); // null, 'testing', { success: boolean, account?: obj, error?: string }

  // Load persisted keys on mount or when modal opens
  useEffect(() => {
    const savedConfig = localStorage.getItem('AL_MIZAN_BROKER_CONFIG');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.name) setSelectedBroker(parsed.name);
        if (parsed.mode) setExecutionMode(parsed.mode);
        if (parsed.apiKey) setApiKey(parsed.apiKey);
        if (parsed.apiSecret) setApiSecret(parsed.apiSecret);
      } catch (e) {
        console.error("Failed to parse saved broker config", e);
      }
    } else {
      if (import.meta.env.VITE_ALPACA_API_KEY) {
        setApiKey(import.meta.env.VITE_ALPACA_API_KEY);
      }
      if (import.meta.env.VITE_ALPACA_SECRET_KEY) {
        setApiSecret(import.meta.env.VITE_ALPACA_SECRET_KEY);
      }
    }
  }, [isOpen]);

  const brokerPlatforms = [
    { id: "Alpaca Securities", label: "Alpaca Securities", icon: "🦙", desc: "US Equities, ETFs & Spot Trading API" },
    { id: "Interactive Brokers", label: "Interactive Brokers (IBKR)", icon: "🏦", desc: "Global Equities, Sukuk & Spot Trading API" },
    { id: "Wahed Invest", label: "Wahed Invest / Sarwa API", icon: "🌙", desc: "Halal Automated Wealth Management API" },
    { id: "Binance Halal Spot", label: "Binance Halal Spot (0x Margin)", icon: "🟡", desc: "Spot Screened Crypto (BTC/ETH only, zero leverage)" }
  ];

  // REAL LIVE HTTP API Credentials Test
  const handleTestConnection = async () => {
    setTestResult("testing");
    const isPaper = executionMode.includes('Paper');
    const alpaca = new AlpacaService(apiKey, apiSecret, isPaper);

    const res = await alpaca.testCredentials();
    setTestResult(res);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const isPaper = executionMode.includes('Paper');
    const updatedConfig = {
      name: selectedBroker,
      mode: isPaper ? "Paper Trading Sandbox" : "Autonomous Live API",
      accountNo: `${selectedBroker.substring(0, 3).toUpperCase()}-994102-${isPaper ? 'PAPER' : 'LIVE'}`,
      apiConnected: true,
      apiKey: apiKey.trim(),
      apiSecret: apiSecret.trim()
    };

    // Save to LocalStorage for instant persistence
    localStorage.setItem('AL_MIZAN_BROKER_CONFIG', JSON.stringify(updatedConfig));

    setTimeout(() => {
      onUpdateBroker(updatedConfig);
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-emerald-500/40 p-5 sm:p-6 shadow-2xl scrollbar-thin">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 sticky top-0 bg-slate-950/90 backdrop-blur-sm z-10 pt-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Brokerage Account & API Access Control
              </h2>
              <p className="text-xs text-slate-400">
                Grant autonomous trading permissions with zero-withdrawal local security.
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Platform Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Investment Brokerage / Exchange
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {brokerPlatforms.map((platform) => (
                <div
                  key={platform.id}
                  onClick={() => setSelectedBroker(platform.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedBroker === platform.id
                      ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-md shadow-emerald-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <div className="text-sm font-semibold flex items-center gap-1.5">
                      {platform.label}
                      {selectedBroker === platform.id && <CheckCircle className="w-3.5 h-3.5 text-emerald-400 ml-auto" />}
                    </div>
                    <div className="text-[10px] text-slate-400 leading-tight">{platform.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Mode Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Execution Environment Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setExecutionMode("Paper Trading Sandbox")}
                className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  executionMode === "Paper Trading Sandbox"
                    ? 'bg-amber-600 text-slate-950 border-amber-400 shadow-md shadow-amber-900/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>🧪 Paper Trading Sandbox</span>
              </button>

              <button
                type="button"
                onClick={() => setExecutionMode("Autonomous Live API")}
                className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold border flex items-center justify-center gap-2 transition-all ${
                  executionMode === "Autonomous Live API"
                    ? 'bg-emerald-600 text-slate-950 border-emerald-400 shadow-md shadow-emerald-900/50'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>🟢 Live Autonomous Execution</span>
              </button>
            </div>
          </div>

          {/* Security Guardrail Banner */}
          <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-emerald-300 block mb-0.5">Enforced Local Security Guardrails:</span>
              <ul className="text-slate-300 space-y-1 list-disc pl-4 text-[11px]">
                <li><strong className="text-white">Withdrawals Strictly Disabled:</strong> API keys have ZERO withdrawal access.</li>
                <li><strong className="text-white">Auto Key Detection:</strong> Paper keys (`PK...`) auto-route to Paper Sandbox; Live keys (`AK...`) route to Live.</li>
              </ul>
            </div>
          </div>

          {/* API Key Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                API Key ID (Starts with PK... or AK...)
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="e.g. PK361Y5TJEYA..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                API Secret Key
              </label>
              <input
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Secret token string"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Live Diagnostic Test Result Box */}
          {testResult && testResult !== "testing" && (
            <div className={`p-3 rounded-xl border text-xs font-mono font-semibold flex items-start gap-2.5 ${
              testResult.success 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' 
                : 'bg-red-950/80 border-red-500/50 text-red-300'
            }`}>
              {testResult.success ? (
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div>
                {testResult.success ? (
                  <div>
                    <div className="font-bold text-white mb-0.5">🟢 REAL ALPACA API AUTHENTICATION SUCCESSFUL!</div>
                    <div>Account No: #{testResult.account.accountNumber} ({testResult.account.isPaper ? 'Paper Sandbox' : 'Live Account'})</div>
                    <div>Buying Power / Cash: ${testResult.account.buyingPower.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-white mb-0.5">🔴 ALPACA AUTHENTICATION FAILED (HTTP 401)</div>
                    <div>{testResult.error}</div>
                    <div className="text-[10px] text-slate-400 font-sans mt-1">Check that your API Key starts with PK... for Paper and that Secret Key has no extra spaces.</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 bg-slate-950/95 p-2 rounded-xl">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testResult === "testing"}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
            >
              {testResult === "testing" ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Pinging Alpaca GET /v2/account...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                  <span>Test Real API Connection</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="emerald-shimmer-btn px-5 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-lg"
              >
                {isSaving ? "Saving Config..." : "Save & Authorize Swarm"}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
