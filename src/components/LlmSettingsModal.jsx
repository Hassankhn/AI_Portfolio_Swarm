import React, { useState, useEffect } from 'react';
import { X, Sparkles, Key, CheckCircle2, Bot, ShieldCheck } from 'lucide-react';

export default function LlmSettingsModal({ isOpen, onClose, llmConfig, onUpdateLlmConfig }) {
  if (!isOpen) return null;

  const [provider, setProvider] = useState(llmConfig?.provider || 'openai');
  const [apiKey, setApiKey] = useState(llmConfig?.apiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('AL_MIZAN_LLM_CONFIG');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.provider) setProvider(parsed.provider);
        if (parsed.apiKey) setApiKey(parsed.apiKey);
      } catch (e) {}
    }
  }, [isOpen]);

  const handleSave = (e) => {
    e.preventDefault();
    const newConfig = {
      provider: provider,
      apiKey: apiKey.trim(),
      enabled: apiKey.trim().length > 5
    };

    localStorage.setItem('AL_MIZAN_LLM_CONFIG', JSON.stringify(newConfig));
    onUpdateLlmConfig(newConfig);

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  const providers = [
    { id: 'openai', label: 'OpenAI GPT-4o / GPT-4o-mini', icon: '🤖', desc: 'Industry-standard news & earnings report sentiment' },
    { id: 'gemini', label: 'Google Gemini 1.5 Pro / Flash', icon: '✨', desc: 'Google Advanced Multimodal Intelligence' },
    { id: 'deepseek', label: 'DeepSeek R1 / V3', icon: '🐋', desc: 'Cost-effective reasoning LLM' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl border border-cyan-500/40 p-5 sm:p-6 shadow-2xl scrollbar-thin">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Optional LLM AI Engine Settings
              </h2>
              <p className="text-xs text-slate-400">
                Connect OpenAI, Gemini, or DeepSeek for live financial news sentiment scoring
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

        <form onSubmit={handleSave} className="space-y-4">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select LLM Model Provider
            </label>
            <div className="space-y-2">
              {providers.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    provider === p.id
                      ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold flex items-center justify-between">
                      <span>{p.label}</span>
                      {provider === p.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-[11px] text-slate-400">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Key input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              {provider.toUpperCase()} API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={`sk-... (Leave blank to use free local sentiment engine)`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              If left blank, Al-Mizan AI uses its built-in free Local Algorithmic Sentiment Engine.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              API Keys are stored 100% locally in your browser (`localStorage`). Keys are NEVER uploaded to any third-party server.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-xs font-bold font-mono shadow-md"
            >
              {isSaved ? 'Saved Config!' : 'Save LLM Settings'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
