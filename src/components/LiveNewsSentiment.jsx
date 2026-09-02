import React from 'react';
import { Newspaper, Sparkles, TrendingUp, TrendingDown, RefreshCw, Key, ShieldCheck } from 'lucide-react';

export default function LiveNewsSentiment({ newsItems = [], sentimentResult, onRefreshNews, onOpenLlmModal, isFetching }) {
  const score = sentimentResult?.score || 0.65;
  const sentiment = sentimentResult?.sentiment || 'BULLISH';
  const provider = sentimentResult?.provider || 'Local Algorithmic Lexicon (Free)';

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Live News & LLM Sentiment Intelligence
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {provider.includes('OpenAI') ? 'OpenAI GPT' : provider.includes('Gemini') ? 'Gemini 1.5' : provider.includes('DeepSeek') ? 'DeepSeek R1' : 'Free Local AI'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Macro Sentiment Agent analyzes news headlines to weigh growth equities vs Sukuk/Gold
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLlmModal}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition-transform"
            title="Configure optional OpenAI, Gemini, or DeepSeek API Keys"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>LLM API Keys</span>
          </button>

          <button
            onClick={onRefreshNews}
            disabled={isFetching}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Refresh Live News Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sentiment Gauge & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Macro Sentiment Score
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-2xl font-black font-mono ${score > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {score > 0 ? `+${score.toFixed(2)}` : score.toFixed(2)}
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono uppercase ${
              sentiment === 'BULLISH' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-red-950 text-red-300 border border-red-500/40'
            }`}>
              {sentiment}
            </span>
          </div>

          {/* Sentiment Meter Bar */}
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${Math.max(0, (score + 1) * 50)}%` }}></div>
          </div>
        </div>

        <div className="md:col-span-2 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            LLM Reasoning Synthesis
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {sentimentResult?.reasoning || "Strong growth momentum in Halal AI infrastructure and accelerating Sukuk rental distribution yields."}
          </p>
        </div>

      </div>

      {/* News Stream List */}
      <div className="space-y-2 max-h-40 overflow-y-auto font-sans text-xs scrollbar-thin">
        {newsItems.map((item, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="font-bold text-white text-[11px] mb-0.5">{item.headline}</div>
              <div className="text-[10px] text-slate-400">{item.summary}</div>
            </div>
            <span className="text-[9px] font-mono font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-900 flex-shrink-0">
              {item.source || 'Market Feed'}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
