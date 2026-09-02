import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, ShieldCheck, Calendar, Layers } from 'lucide-react';

const mockPerformanceData = {
  '1D': [
    { time: '09:30', portfolio: 53800, spSharia: 53800, gold: 53800 },
    { time: '11:00', portfolio: 54120, spSharia: 53950, gold: 53850 },
    { time: '12:30', portfolio: 54390, spSharia: 54100, gold: 53920 },
    { time: '14:00', portfolio: 54710, spSharia: 54250, gold: 54050 },
    { time: '16:00', portfolio: 54980, spSharia: 54380, gold: 54120 }
  ],
  '1W': [
    { time: 'Mon', portfolio: 51200, spSharia: 51200, gold: 51200 },
    { time: 'Tue', portfolio: 52100, spSharia: 51800, gold: 51500 },
    { time: 'Wed', portfolio: 52850, spSharia: 52150, gold: 52000 },
    { time: 'Thu', portfolio: 53900, spSharia: 52900, gold: 52600 },
    { time: 'Fri', portfolio: 54980, spSharia: 53400, gold: 53100 }
  ],
  '1M': [
    { time: 'Week 1', portfolio: 48000, spSharia: 48000, gold: 48000 },
    { time: 'Week 2', portfolio: 50100, spSharia: 49200, gold: 48900 },
    { time: 'Week 3', portfolio: 52400, spSharia: 50800, gold: 50200 },
    { time: 'Week 4', portfolio: 54980, spSharia: 52100, gold: 51500 }
  ],
  '1Y': [
    { time: 'Q1', portfolio: 40000, spSharia: 40000, gold: 40000 },
    { time: 'Q2', portfolio: 44200, spSharia: 42500, gold: 41800 },
    { time: 'Q3', portfolio: 49800, spSharia: 46100, gold: 45000 },
    { time: 'Q4', portfolio: 54980, spSharia: 49500, gold: 48200 }
  ]
};

export default function PerformanceChart({ currentBalance }) {
  const [timeframe, setTimeframe] = useState('1W');
  const [showBenchmark, setShowBenchmark] = useState(true);

  const chartData = mockPerformanceData[timeframe] || mockPerformanceData['1W'];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-6">
      
      {/* Chart Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Autonomous Capital Growth Curve
          </h2>
          <p className="text-xs text-slate-400">
            Real-time yield compared against S&P 500 Sharia Index & Spot Gold Benchmark
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {/* Benchmark Toggle */}
          <button
            onClick={() => setShowBenchmark(!showBenchmark)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showBenchmark 
                ? 'bg-slate-800 text-emerald-300 border-emerald-500/40' 
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Benchmarks</span>
          </button>

          {/* Timeframe Buttons */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            {['1D', '1W', '1M', '1Y'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-emerald-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis 
              stroke="#64748b" 
              tick={{ fontSize: 11 }} 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderColor: '#10b981', 
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
              formatter={(value, name) => [
                `$${value.toLocaleString('en-US')}`,
                name === 'portfolio' ? 'Al-Mizan AI' : name === 'spSharia' ? 'S&P 500 Sharia' : 'Gold Spot'
              ]}
            />

            <Area 
              type="monotone" 
              dataKey="portfolio" 
              stroke="#10b981" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#emeraldGradient)" 
            />

            {showBenchmark && (
              <>
                <Area 
                  type="monotone" 
                  dataKey="spSharia" 
                  stroke="#38bdf8" 
                  strokeWidth={2} 
                  strokeDasharray="4 4"
                  fillOpacity={0} 
                />
                <Area 
                  type="monotone" 
                  dataKey="gold" 
                  stroke="#fbbf24" 
                  strokeWidth={2} 
                  strokeDasharray="2 2"
                  fillOpacity={0} 
                />
              </>
            )}

          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-white font-semibold">Al-Mizan AI Swarm (+14.85% APY)</span>
        </div>
        {showBenchmark && (
          <>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-sky-400"></span>
              <span className="text-slate-400">S&P 500 Sharia (+9.2%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-amber-400"></span>
              <span className="text-slate-400">Physical Gold Spot (+6.8%)</span>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
