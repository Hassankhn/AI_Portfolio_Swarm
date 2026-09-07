import React, { useState, useRef, useEffect } from 'react';
import { Terminal, ShieldCheck, TrendingUp, Globe, Zap, Scale, Key, Pause, Play, Trash2, Search, ArrowDown } from 'lucide-react';

export default function MultiAgentTerminal({ logs = [], isPaused, onTogglePause, onClearLogs }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoScroll, setAutoScroll] = useState(false); // Default autoScroll false so user page never jumps
  const terminalContainerRef = useRef(null);

  // Smooth scroll ONLY inside the terminal container div (never jumps whole browser window page)
  useEffect(() => {
    if (autoScroll && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const agentTabs = [
    { id: 'ALL', label: 'All Agents', icon: Terminal },
    { id: 'Sharia Guardian', label: 'Sharia Guardian', icon: ShieldCheck, color: 'text-emerald-400' },
    { id: 'Quantitative Yield', label: 'Quantitative Yield', icon: TrendingUp, color: 'text-cyan-400' },
    { id: 'Macro Sentiment', label: 'Macro Sentiment', icon: Globe, color: 'text-purple-400' },
    { id: 'Risk Guardian', label: 'Risk Guardian', icon: Zap, color: 'text-amber-400' },
    { id: 'Zakat & Purification', label: 'Zakat Agent', icon: Scale, color: 'text-purple-300' },
    { id: 'Broker Execution', label: 'Broker Gateway', icon: Key, color: 'text-amber-300' }
  ];

  const filteredLogs = logs.filter((log) => {
    const matchesTab = activeFilter === 'ALL' || log.agent.toLowerCase().includes(activeFilter.toLowerCase()) || log.agentBadge?.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = !searchTerm || log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.agent.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6 relative overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Autonomous 6-Agent Swarm Real-Time Terminal
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                Live Broadcast
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Synchronized event stream across all 6 autonomous agents
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          {/* Keyword Search Input */}
          <div className="relative flex-1 md:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-40 bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Auto-Scroll Toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
              autoScroll ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
          >
            <ArrowDown className={`w-3.5 h-3.5 ${autoScroll ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Auto-Scroll {autoScroll ? 'ON' : 'OFF'}</span>
          </button>

          {/* Pause Toggle */}
          <button
            onClick={onTogglePause}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Clear Logs */}
          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 transition-colors"
            title="Clear Terminal Logs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Filter Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin">
        {agentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : tab.color || 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Output Area with Internal Scroll Container Ref */}
      <div 
        ref={terminalContainerRef}
        className="bg-slate-950/90 rounded-xl border border-slate-900 p-4 font-mono text-xs max-h-72 overflow-y-auto space-y-2.5 scrollbar-thin"
      >
        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-600 text-xs">
            {searchTerm ? `No logs matching "${searchTerm}"` : 'No log events for selected agent.'}
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 sm:gap-3 leading-relaxed hover:bg-slate-900/50 p-1.5 rounded transition-colors">
              <span className="text-slate-500 text-[10px] pt-0.5 select-none">{log.timestamp}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border bg-slate-900 text-slate-300 border-slate-700 whitespace-nowrap">
                {log.agentBadge || 'AGENT'}
              </span>
              <span className="text-slate-200 flex-1 break-words">{log.message}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
