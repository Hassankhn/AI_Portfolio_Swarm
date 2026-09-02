// Adaptive Q-Learning Reinforcement Learning (RL) Engine with Real Market Data Training

export class ReinforcementLearningEngine {
  constructor() {
    this.alpha = 0.15; // Learning Rate
    this.gamma = 0.90; // Discount Factor
    this.epsilon = 0.20; // Exploration rate
    this.decay = 0.995;

    const savedWeights = localStorage.getItem('AL_MIZAN_RL_WEIGHTS');
    if (savedWeights) {
      try {
        const parsed = JSON.parse(savedWeights);
        this.qTable = parsed.qTable || this.getDefaultQTable();
        this.epochs = parsed.epochs || 0;
        this.successfulTrades = parsed.successfulTrades || 0;
        this.totalTrades = parsed.totalTrades || 0;
        this.avgReward = parsed.avgReward || 0;
        this.epsilon = parsed.epsilon || 0.20;
        this.dataSource = parsed.dataSource || 'Real Live Training';
      } catch (e) {
        this.resetToFreshModel();
      }
    } else {
      this.resetToFreshModel();
    }

    this.replayMemory = [];
  }

  getDefaultQTable() {
    return {
      "BULL_LOW_VOL": [1.0, 1.0, 1.0, 1.0],
      "BULL_HIGH_VOL": [1.0, 1.0, 1.0, 1.0],
      "BEAR_LOW_VOL": [1.0, 1.0, 1.0, 1.0],
      "BEAR_HIGH_VOL": [1.0, 1.0, 1.0, 1.0]
    };
  }

  // Reset training to Epoch 0 from scratch
  resetToFreshModel() {
    this.qTable = this.getDefaultQTable();
    this.epochs = 0;
    this.successfulTrades = 0;
    this.totalTrades = 0;
    this.avgReward = 0;
    this.epsilon = 0.25;
    this.dataSource = 'Clean Model (Epoch 0)';
    this.saveWeights();
  }

  // Determine market state
  getState(marketTrend, volatility) {
    const trend = marketTrend >= 0 ? "BULL" : "BEAR";
    const vol = volatility > 15 ? "HIGH_VOL" : "LOW_VOL";
    return `${trend}_${vol}`;
  }

  // Select action using Epsilon-Greedy Policy
  selectAction(state) {
    if (!this.qTable[state]) {
      this.qTable[state] = [1.0, 1.0, 1.0, 1.0];
    }

    if (Math.random() < this.epsilon) {
      return Math.floor(Math.random() * 4);
    } else {
      const qValues = this.qTable[state];
      let maxIdx = 0;
      for (let i = 1; i < qValues.length; i++) {
        if (qValues[i] > qValues[maxIdx]) {
          maxIdx = i;
        }
      }
      return maxIdx;
    }
  }

  // Train Bellman Q-Learning Model on Real Alpaca Historical Market Bars
  trainOnRealHistoricalBars(symbol, bars) {
    if (!bars || bars.length < 2) return 0;

    let trainedCount = 0;
    for (let i = 1; i < bars.length; i++) {
      const prevBar = bars[i - 1];
      const currentBar = bars[i];

      // Calculate real price return percentage
      const realReturnPercent = ((currentBar.c - prevBar.c) / prevBar.c) * 100;
      const volatility = Math.abs(((currentBar.h - currentBar.l) / prevBar.c) * 100);

      const state = this.getState(realReturnPercent, volatility);
      const action = this.selectAction(state);

      // Reward function based on actual real price return
      let reward = 0;
      if (action === 0) { // Spot DCA Equity
        reward = realReturnPercent * 2.5;
      } else if (action === 1) { // Sukuk Defense
        reward = 0.8; // Steady positive rental yield
      } else if (action === 2) { // Spot Gold
        reward = realReturnPercent < 0 ? 1.5 : 0.5; // Gold hedges negative stock returns
      } else { // Sharia Purification
        reward = 2.0;
      }

      const nextState = this.getState(realReturnPercent + 0.1, volatility);
      this.learn(state, action, reward, nextState, true);
      trainedCount++;
    }

    this.dataSource = `Trained on Real Alpaca Bars (${symbol})`;
    this.saveWeights();
    return trainedCount;
  }

  // Update Q-value via Bellman Equation
  learn(state, action, reward, nextState, isShariaCompliant = true) {
    if (!isShariaCompliant) {
      reward = -100.0;
    }

    if (!this.qTable[state]) this.qTable[state] = [1.0, 1.0, 1.0, 1.0];
    if (!this.qTable[nextState]) this.qTable[nextState] = [1.0, 1.0, 1.0, 1.0];

    const currentQ = this.qTable[state][action];
    const maxNextQ = Math.max(...this.qTable[nextState]);

    const newQ = currentQ + this.alpha * (reward + this.gamma * maxNextQ - currentQ);
    this.qTable[state][action] = parseFloat(newQ.toFixed(4));

    this.epochs += 1;
    this.totalTrades += 1;
    if (reward > 0) this.successfulTrades += 1;

    this.avgReward = parseFloat(((this.avgReward * 0.90) + (reward * 0.10)).toFixed(2));
    this.epsilon = Math.max(0.05, parseFloat((this.epsilon * this.decay).toFixed(4)));

    this.replayMemory.push({
      epoch: this.epochs,
      state,
      action,
      reward,
      nextState,
      timestamp: new Date().toLocaleTimeString()
    });

    if (this.replayMemory.length > 50) this.replayMemory.shift();

    this.saveWeights();

    return {
      updatedQ: newQ,
      winRate: this.totalTrades > 0 ? ((this.successfulTrades / this.totalTrades) * 100).toFixed(1) : "0.0",
      avgReward: this.avgReward,
      epsilon: this.epsilon
    };
  }

  saveWeights() {
    try {
      localStorage.setItem('AL_MIZAN_RL_WEIGHTS', JSON.stringify({
        qTable: this.qTable,
        epochs: this.epochs,
        successfulTrades: this.successfulTrades,
        totalTrades: this.totalTrades,
        avgReward: this.avgReward,
        epsilon: this.epsilon,
        dataSource: this.dataSource
      }));
    } catch (e) {
      console.warn("Failed to persist RL weights", e);
    }
  }

  getMetrics() {
    const winRate = this.totalTrades > 0 ? ((this.successfulTrades / this.totalTrades) * 100).toFixed(1) : "0.0";
    return {
      epochs: this.epochs,
      winRate: winRate,
      avgReward: this.avgReward,
      explorationRate: (this.epsilon * 100).toFixed(1),
      qTable: this.qTable,
      replayMemory: this.replayMemory,
      dataSource: this.dataSource || 'Live Data Engine'
    };
  }
}
