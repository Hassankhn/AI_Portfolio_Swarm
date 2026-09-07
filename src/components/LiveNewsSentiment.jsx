import React, { useState } from 'react';
import { Newspaper, Sparkles, RefreshCw, Key, ArrowUpRight, ArrowDownRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export default function LiveNewsSentiment({ newsItems = [], sentimentResult = null, onRefreshNews, onOpenLlmModal, isFetching }) {
  const [expandedHeadlineId, setExpandedHeadlineId] = useState(null);

  const getSentimentBadge = (score) => {
    if (score >= 0.3) {
      return { text: 'BULLISH', bg: 'bg-emerald-950 text-emerald-300 border-emerald-500/40' };
    } else if (score <= -0.3) {
      return { text: 'BEARISH', bg: 'bg-red-950 text-red-300 border-red-500/40' };
    }
    return { text: 'NEUTRAL', bg: 'bg-slate-900 text-slate-300 border-slate-700' };
  };

  const activeProvider = sentimentResult?.provider || 'local';

  const getProviderBadge = () => {
    switch (activeProvider) {
      case 'openai': return 'GPT-4o Intelligence';
      case 'gemini': return 'Gemini 1.5 Pro';
      case 'deepseek': return 'DeepSeek R1 Engine';
      default: return 'Local Algorithmic NLP';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6 relative overflow-hidden">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Live News & Semantic Sentiment Engine
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40">
                {getProviderBadge()}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Real-time market sentiment scoring integrated into Macro & Yield agent trade signals
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenLlmModal}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/40 text-xs font-bold text-purple-300 flex items-center gap-1.5 transition-transform"
          >
            <Key className="w-3.5 h-3.5 text-purple-400" />
            <span>LLM API Keys</span>
          </button>

          <button
            onClick={onRefreshNews}
            disabled={isFetching}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-purple-400' : 'text-slate-400'}`} />
            <span>{isFetching ? 'Fetching Feed...' : 'Refresh Feed'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Macro Sentiment Meter Card */}
        <div className="lg:col-span-1 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Overall Market Score</span>
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>

            {sentimentResult ? (
              <div className="my-3">
                <div className="flex items-baseline justify-between mb-2">
                  <span className={`text-2xl font-black font-mono ${sentimentResult.score >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {sentimentResult.score >= 0 ? `+${sentimentResult.score.toFixed(2)}` : sentimentResult.score.toFixed(2)}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${getSentimentBadge(sentimentResult.score).bg}`}>
                    {getSentimentBadge(sentimentResult.score).text}
                  </span>
                </div>

                {/* Progress Visual Bar */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800 mb-3">
                  <div 
                    className={`h-full transition-all duration-500 ${sentimentResult.score >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(100, Math.max(10, ((sentimentResult.score + 1) / 2) * 100))}%` }}
                  ></div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  "{sentimentResult.summary}"
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-slate-500 text-xs font-mono">
                Calculating news sentiment...
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>AAOIFI Sharia Clean:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Filtered
            </span>
          </div>
        </div>

        {/* Right Column: Live Headlines List */}
        <div className="lg:col-span-2 space-y-2.5 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
          {newsItems.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs font-mono">
              Loading live Alpaca financial news stream...
            </div>
          ) : (
            newsItems.map((item) => {
              const isExpanded = expandedHeadlineId === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setExpandedHeadlineId(isExpanded ? null : item.id)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-purple-400 uppercase bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-500/30">
                          {item.symbol || 'NVDA'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{item.source || 'Alpaca News'}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200 hover:text-white transition-colors leading-snug">
                        {item.headline}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${getSentimentBadge(item.sentimentScore || 0.5).bg}`}>
                        {getSentimentBadge(item.sentimentScore || 0.5).text}
                      </span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && item.summary && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 leading-relaxed font-sans animate-fade-in">
                      {item.summary}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
