import React, { useState } from 'react';
import { Cpu, Brain, Zap, Activity, Download, RefreshCw, Award, Layers, PlayCircle, Trash2 } from 'lucide-react';

export default function MlBrainVisualizer({ rlEngine, onTrainRealData, isTrainingReal }) {
  const [activeTab, setActiveTab] = useState('qtable');
  const [trainStatus, setTrainStatus] = useState(null);

  const metrics = rlEngine ? rlEngine.getMetrics() : {
    epochs: 0,
    winRate: "0.0",
    avgReward: 0,
    explorationRate: "25.0",
    qTable: {
      "BULL_LOW_VOL": [1.0, 1.0, 1.0, 1.0],
      "BULL_HIGH_VOL": [1.0, 1.0, 1.0, 1.0],
      "BEAR_LOW_VOL": [1.0, 1.0, 1.0, 1.0],
      "BEAR_HIGH_VOL": [1.0, 1.0, 1.0, 1.0]
    },
    replayMemory: [],
    dataSource: 'Clean Model (Epoch 0)'
  };

  const actionLabels = ["1. DCA Equity", "2. Sukuk Lock", "3. Spot Gold", "4. Purify Vault"];

  const handleTrainRealDataClick = async () => {
    if (!onTrainRealData) return;
    setTrainStatus("training");
    try {
      const result = await onTrainRealData();
      setTrainStatus(`Trained on ${result} Real Alpaca Market Bars!`);
    } catch (err) {
      setTrainStatus(`Data Error: ${err.message}`);
    } finally {
      setTimeout(() => setTrainStatus(null), 6000);
    }
  };

  const handleResetModel = () => {
    if (rlEngine && window.confirm("Reset RL Model to Epoch 0 with fresh Q-weights?")) {
      rlEngine.resetToFreshModel();
      window.location.reload();
    }
  };

  const handleExportModel = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `al_mizan_ml_weights_epoch_${metrics.epochs}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel-glow p-5 rounded-2xl border border-cyan-500/40 mb-6 relative overflow-hidden">
      
      {/* Background Brain Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Adaptive Reinforcement Learning (RL) Neural Brain
              </h2>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Bellman Q-Learning
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Data Source: <strong className="text-cyan-300 font-mono">{metrics.dataSource}</strong>
            </p>
          </div>
        </div>

        {/* Buttons: Real Data Trainer, Reset Model & Export Model */}
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={handleTrainRealDataClick}
            disabled={isTrainingReal || trainStatus === "training"}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
          >
            <PlayCircle className="w-3.5 h-3.5 fill-slate-950" />
            <span>{trainStatus === "training" ? 'Fetching Alpaca Bars...' : 'Train Model on Real Alpaca Market Data'}</span>
          </button>

          <button
            onClick={handleResetModel}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-red-900/50 text-xs font-bold font-mono text-slate-400 hover:text-red-400 transition-colors"
            title="Reset Model to Epoch 0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleExportModel}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-xs font-bold font-mono text-cyan-300 flex items-center gap-1.5 transition-transform"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Weights</span>
          </button>

        </div>
      </div>

      {trainStatus && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span>{trainStatus}</span>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        
        {/* Win Rate */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Precision Win Rate</span>
            <Award className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-extrabold text-emerald-400 font-mono">
            {metrics.winRate}%
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Real Return Verified</div>
        </div>

        {/* Epochs Trained */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Training Epochs</span>
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-white font-mono">
            {metrics.epochs}
          </div>
          <div className="text-[10px] text-cyan-400 font-semibold mt-0.5">Epoch Count</div>
        </div>

        {/* Average Q-Reward */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Avg Reward Score</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-extrabold text-amber-300 font-mono">
            +{metrics.avgReward}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Sharpe Incentive Weighted</div>
        </div>

        {/* Exploration Rate */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Explore vs Exploit</span>
            <Activity className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-extrabold text-purple-300 font-mono">
            {metrics.explorationRate}% Explore
          </div>
          <div className="text-[10px] text-purple-400 mt-0.5">{(100 - parseFloat(metrics.explorationRate)).toFixed(1)}% Optimal Exploit</div>
        </div>

      </div>

      {/* Tabs for Q-Table Matrix vs Replay Memory */}
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800/80 pb-2">
        <button
          onClick={() => setActiveTab('qtable')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'qtable' 
              ? 'bg-cyan-600 text-slate-950 shadow-md' 
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Q-Matrix Policy Weights</span>
        </button>

        <button
          onClick={() => setActiveTab('replay')}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'replay' 
              ? 'bg-purple-600 text-slate-950 shadow-md' 
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Experience Replay Buffer ({metrics.replayMemory.length})</span>
        </button>
      </div>

      {/* Tab 1: Q-Matrix Grid */}
      {activeTab === 'qtable' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] uppercase">
                <th className="pb-2 pl-2">Market State ($S_t$)</th>
                {actionLabels.map((act) => (
                  <th key={act} className="pb-2 text-right">{act}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {Object.entries(metrics.qTable).map(([stateKey, qVals]) => {
                const maxVal = Math.max(...qVals);
                return (
                  <tr key={stateKey} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-2.5 pl-2 font-bold text-white text-[11px] font-sans">
                      {stateKey.replace('_', ' ')}
                    </td>
                    {qVals.map((val, idx) => (
                      <td key={idx} className="py-2.5 text-right font-bold">
                        <span className={`px-2 py-1 rounded-md text-[11px] border ${
                          val === maxVal 
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-sm' 
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}>
                          {val.toFixed(2)}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Replay Buffer Stream */}
      {activeTab === 'replay' && (
        <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-xs scrollbar-thin">
          {metrics.replayMemory.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              Memory buffer active. RL agent is recording live reward states...
            </div>
          ) : (
            metrics.replayMemory.map((mem, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">#{mem.epoch}</span>
                  <span className="text-cyan-300 font-bold">{mem.state}</span>
                  <span className="text-slate-400">→ {actionLabels[mem.action]}</span>
                </div>
                <span className={`font-bold ${mem.reward > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {mem.reward > 0 ? `+${mem.reward.toFixed(2)} Reward` : `${mem.reward.toFixed(2)} Penalty`}
                </span>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
