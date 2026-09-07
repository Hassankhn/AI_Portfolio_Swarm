import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, CheckCircle2, Bot, ShieldCheck, Lock } from 'lucide-react';

export default function LlmSettingsModal({ isOpen, onClose, llmConfig, onUpdateLlmConfig }) {
  if (!isOpen) return null;

  const [provider, setProvider] = useState(llmConfig.provider || 'openai');
  const [apiKey, setApiKey] = useState(llmConfig.apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateLlmConfig({
      provider,
      apiKey: apiKey.trim(),
      enabled: !!apiKey.trim()
    });

    localStorage.setItem('AL_MIZAN_LLM_CONFIG', JSON.stringify({
      provider,
      apiKey: apiKey.trim(),
      enabled: !!apiKey.trim()
    }));

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg glass-panel-glow rounded-2xl border border-purple-500/40 p-5 sm:p-6 shadow-2xl"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">LLM Intelligence Engine Setup</h2>
              <p className="text-xs text-slate-400">Optional AI provider for live market sentiment scoring</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-slate-400 mb-2 uppercase tracking-wider text-[10px]">
              Select AI Engine Provider
            </label>
            <div className="grid grid-cols-3 gap-2 font-sans">
              {[
                { id: 'openai', label: 'OpenAI GPT-4o' },
                { id: 'gemini', label: 'Google Gemini' },
                { id: 'deepseek', label: 'DeepSeek R1' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    provider === p.id 
                      ? 'bg-purple-950/90 border-purple-500/50 text-purple-300 shadow-md' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-slate-400 mb-1">
              {provider.toUpperCase()} API Key (Optional)
            </label>
            <input
              type="password"
              placeholder={provider === 'openai' ? 'sk-...' : 'API Key...'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
            />
            <p className="text-[10px] text-slate-500 mt-1 font-sans">
              Leave blank to use the free built-in local sentiment engine.
            </p>
          </div>

          {/* Security Note */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-sans flex items-start gap-2">
            <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>
              API Keys are stored client-side in your local browser storage (`AL_MIZAN_LLM_CONFIG`). They are used exclusively for sentiment scoring on live financial headlines.
            </span>
          </div>

          {/* Toast */}
          {isSaved && (
            <div className="p-3 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/50 text-xs font-mono font-bold text-center">
              ✅ LLM Intelligence Engine Updated!
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
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-slate-950 font-bold text-xs font-mono shadow-md"
            >
              Save Configuration
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
