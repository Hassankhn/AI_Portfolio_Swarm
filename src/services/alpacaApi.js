// Real Alpaca Securities REST API Service with Auto-Endpoint Detection & Live Data Bars Fetcher

export class AlpacaService {
  constructor(apiKey, apiSecret, isPaperOverride = null) {
    this.apiKey = (apiKey || '').trim();
    this.apiSecret = (apiSecret || '').trim();
    
    // Auto-detect Paper Key (starts with PK) vs Live Key (starts with AK)
    if (this.apiKey.startsWith('PK')) {
      this.isPaper = true;
    } else if (this.apiKey.startsWith('AK')) {
      this.isPaper = false;
    } else {
      this.isPaper = isPaperOverride !== null ? isPaperOverride : true;
    }

    // Use Vite local proxy routes to bypass browser CORS headers
    this.baseUrl = this.isPaper ? '/alpaca-api' : '/alpaca-live-api';
    this.dataUrl = '/alpaca-data';
  }

  getHeaders() {
    return {
      'APCA-API-KEY-ID': this.apiKey,
      'APCA-API-SECRET-KEY': this.apiSecret,
      'Content-Type': 'application/json'
    };
  }

  // Real Live Credentials Verification against Alpaca /v2/account
  async testCredentials() {
    if (!this.apiKey || !this.apiSecret) {
      return { success: false, error: 'API Key and Secret Key cannot be empty.' };
    }

    try {
      console.log(`📡 Ping testing Alpaca endpoint (${this.isPaper ? 'Paper' : 'Live'})...`);
      const res = await fetch(`${this.baseUrl}/v2/account`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      const responseText = await res.text();
      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch (e) {}

      if (!res.ok) {
        const errorMsg = data.message || `HTTP ${res.status}: ${responseText || 'Unauthorized'}`;
        console.error("🔴 Alpaca Authentication Failed:", errorMsg);
        return { success: false, error: errorMsg };
      }

      console.log("🟢 Alpaca Credentials Verified Successfully:", data);
      return {
        success: true,
        account: {
          accountNumber: data.account_number,
          status: data.status,
          buyingPower: parseFloat(data.buying_power || data.cash || 0),
          portfolioValue: parseFloat(data.portfolio_value || data.equity || 0),
          isPaper: this.isPaper
        }
      };
    } catch (err) {
      console.error("🔴 Alpaca Connection Error:", err.message);
      return { success: false, error: err.message || 'Network connection failed' };
    }
  }

  // Fetch real account details
  async getAccount() {
    try {
      const res = await fetch(`${this.baseUrl}/v2/account`, {
        headers: this.getHeaders()
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Alpaca Account Error HTTP ${res.status}: ${text}`);
      }
      return await res.json();
    } catch (err) {
      console.error("🔴 Alpaca API Account Fetch Error:", err.message);
      return null;
    }
  }

  // Fetch real historical stock price bars from Alpaca Market Data API
  async getHistoricalBars(symbol = 'NVDA', timeframe = '1Day', limit = 30) {
    try {
      console.log(`📈 Fetching Real Alpaca Market Bars for ${symbol}...`);
      const res = await fetch(`${this.dataUrl}/v2/stocks/${symbol}/bars?timeframe=${timeframe}&limit=${limit}`, {
        headers: this.getHeaders()
      });

      if (!res.ok) {
        throw new Error(`Alpaca Bars HTTP Error ${res.status}`);
      }

      const data = await res.json();
      console.log(`✅ Received ${data.bars?.length || 0} real price bars for ${symbol}`);
      return data.bars || [];
    } catch (err) {
      console.warn(`Could not fetch Alpaca Market Data for ${symbol}:`, err.message);
      return [];
    }
  }

  // Submit spot order directly to Alpaca Servers
  async submitOrder({ symbol, qty = 1, side = 'buy', type = 'market', timeInForce = 'gtc' }) {
    try {
      const body = {
        symbol: symbol.toUpperCase(),
        qty: parseFloat(qty).toString(),
        side: side.toLowerCase(),
        type: type,
        time_in_force: timeInForce
      };

      console.log("🚀 Transmitting Spot Order to Alpaca:", body);

      const res = await fetch(`${this.baseUrl}/v2/orders`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body)
      });

      const responseText = await res.text();
      let resJson = {};
      try {
        resJson = JSON.parse(responseText);
      } catch (e) {}

      if (!res.ok) {
        throw new Error(resJson.message || `Order HTTP ${res.status}: ${responseText}`);
      }

      console.log("✅ Alpaca Order Executed Successfully:", resJson);
      return resJson;
    } catch (err) {
      console.error("🔴 Alpaca Order Execution Error:", err.message);
      throw err;
    }
  }

  // Fetch real open orders from Alpaca
  async getOrders() {
    try {
      const res = await fetch(`${this.baseUrl}/v2/orders?status=all&limit=15`, {
        headers: this.getHeaders()
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error("Alpaca Fetch Orders Error:", err);
      return [];
    }
  }
}
