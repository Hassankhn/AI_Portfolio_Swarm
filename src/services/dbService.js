// Commercial Multi-User Database Service (Vercel Postgres / Supabase / Prisma Integration)

export class DatabaseService {
  constructor() {
    this.dbUrl = import.meta.env.VITE_DATABASE_URL || '';
    this.isCloudDbConnected = !!this.dbUrl;
  }

  // Save or Update User Strategy Configuration
  async saveUserStrategy(userId = 'default-user', strategy) {
    if (this.isCloudDbConnected) {
      try {
        const res = await fetch('/api/db/user-strategy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, strategy })
        });
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn("Cloud DB offline, using local fallback:", e);
      }
    }
    localStorage.setItem('AL_MIZAN_STRATEGY_CONFIG', JSON.stringify(strategy));
    return { success: true, mode: 'local' };
  }

  // Save Trade Order History
  async recordTradeOrder(userId = 'default-user', order) {
    if (this.isCloudDbConnected) {
      try {
        await fetch('/api/db/trade-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, order })
        });
      } catch (e) {
        console.warn("Cloud DB order record fallback:", e);
      }
    }
    const saved = localStorage.getItem('AL_MIZAN_LIVE_ORDERS') || '[]';
    const orders = JSON.parse(saved);
    orders.unshift(order);
    localStorage.setItem('AL_MIZAN_LIVE_ORDERS', JSON.stringify(orders.slice(0, 50)));
  }

  // Save RL Neural Model Weights Matrix
  async saveRlWeights(userId = 'default-user', rlMetrics) {
    if (this.isCloudDbConnected) {
      try {
        await fetch('/api/db/rl-weights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, metrics: rlMetrics })
        });
      } catch (e) {}
    }
    localStorage.setItem('AL_MIZAN_RL_WEIGHTS', JSON.stringify(rlMetrics));
  }
}

export const dbService = new DatabaseService();
