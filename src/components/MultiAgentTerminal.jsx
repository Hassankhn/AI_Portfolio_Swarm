import React, { useState } from 'react';
import { Terminal, Shield, TrendingUp, Globe, Zap, Scale, Key, Play, Pause, Trash2, Search, CheckCircle2, AlertOctagon, Info } from 'lucide-react';
import { AGENT_ROLES } from '../data/mockAgentLogs';

export default function MultiAgentTerminal({ logs, isPaused, onTogglePause, onClearLogs }) {
  const [selectedAgentFilter, setSelectedAgentFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesAgent = selectedAgentFilter === 'ALL' || log.agent.toLowerCase().includes(selectedAgentFilter.toLowerCase());
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.agent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  const getLogBadgeStyle = (status) => {
    switch (status) {
      case 'warning':
        return 'bg-red-950/90 text-red-300 border-red-500/50';
      case 'purple':
        return 'bg-purple-950/90 text-purple-300 border-purple-500/50';
      case 'info':
        return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/50';
      case 'success':
      default:
        return 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6 scanline-effect">
      
      {/* Terminal Top Control Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Swarm Execution Console
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPaused ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Real-time multi-agent reasoning, AAOIFI audit checks, & live broker API trade orders
            </p>
          </div>
        </div>

        {/* Console Action Buttons & Search */}
        <div className="flex items-center gap-2.5 self-stretch md:self-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPaused 
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' 
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Clear Logs */}
          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-900 transition-colors"
            title="Clear Console"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Active Agents Status Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 py-3 border-b border-slate-800/60 overflow-x-auto">
        <button
          onClick={() => setSelectedAgentFilter('ALL')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
            selectedAgentFilter === 'ALL'
              ? 'bg-emerald-600 text-slate-950 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          ⚡ All Agents ({logs.length})
        </button>

        {AGENT_ROLES.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgentFilter(agent.name)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              selectedAgentFilter.toLowerCase().includes(agent.id)
                ? 'bg-slate-800 text-white border-emerald-400 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span className="text-xs">{agent.badge.split(' ')[0]}</span>
            <span>{agent.name.replace(' AI', '')}</span>
          </button>
        ))}
      </div>

      {/* Logs Scroll Window */}
      <div className="h-72 overflow-y-auto font-mono text-xs space-y-2 pt-3 pr-2 scrollbar-thin">
        {filteredLogs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs">
            No agent logs match criteria or console cleared.
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div 
              key={log.id} 
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-900 hover:border-slate-800 transition-colors flex items-start gap-3 group"
            >
              <span className="text-slate-500 text-[11px] mt-0.5 select-none">{log.timestamp}</span>

              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getLogBadgeStyle(log.status)} flex items-center gap-1 flex-shrink-0`}>
                {log.status === 'warning' && <AlertOctagon className="w-3 h-3 text-red-400" />}
                {log.status === 'info' && <Info className="w-3 h-3 text-cyan-400" />}
                {log.status === 'success' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {log.agentBadge}
              </span>

              <p className="text-slate-200 leading-relaxed flex-1">
                {log.message}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
