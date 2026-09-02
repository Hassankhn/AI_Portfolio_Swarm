// Comprehensive AAOIFI Compliant Assets Universe for Al-Mizan AI

export const HALAL_ASSET_UNIVERSE = [
  // --- HALAL EQUITIES (Tech / Growth / Healthcare) ---
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    category: "Equity",
    sector: "Technology",
    price: 224.50,
    change24h: 1.84,
    complianceStatus: "COMPLIANT",
    debtRatio: 18.2, // Must be < 33%
    cashInterestRatio: 14.5, // Must be < 33%
    impermissibleRevenue: 1.4, // Must be < 5% (Services interest micro-share)
    purificationPerShare: 0.04, // $ per dividend to purify to charity
    allocationPercent: 18.5,
    holdingShares: 45,
    currentValue: 10102.50,
    aaoifiScore: 98,
    reasoning: "Passes AAOIFI Standard 21. Core revenue from consumer hardware & software. Debt/MarketCap is 18.2%, interest cash is 14.5%."
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    category: "Equity",
    sector: "Semiconductors & AI",
    price: 128.80,
    change24h: 3.42,
    complianceStatus: "COMPLIANT",
    debtRatio: 4.8,
    cashInterestRatio: 8.9,
    impermissibleRevenue: 0.2,
    purificationPerShare: 0.01,
    allocationPercent: 22.0,
    holdingShares: 95,
    currentValue: 12236.00,
    aaoifiScore: 99,
    reasoning: "Passes AAOIFI Standard 21. Ultra-clean balance sheet with under 5% total debt. Leader in Halal AI infrastructure."
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    category: "Equity",
    sector: "Automotive & Energy",
    price: 215.30,
    change24h: 2.15,
    complianceStatus: "COMPLIANT",
    debtRatio: 6.1,
    cashInterestRatio: 12.3,
    impermissibleRevenue: 0.8,
    purificationPerShare: 0.00,
    allocationPercent: 12.0,
    holdingShares: 30,
    currentValue: 6459.00,
    aaoifiScore: 97,
    reasoning: "Passes AAOIFI Standard 21. Clean energy hardware & EV manufacturing. Zero alcohol/gambling revenue."
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    category: "Equity",
    sector: "Software & Cloud",
    price: 448.90,
    change24h: 0.95,
    complianceStatus: "COMPLIANT",
    debtRatio: 12.4,
    cashInterestRatio: 16.8,
    impermissibleRevenue: 1.8,
    purificationPerShare: 0.06,
    allocationPercent: 15.0,
    holdingShares: 18,
    currentValue: 8080.20,
    aaoifiScore: 96,
    reasoning: "Passes AAOIFI Standard 21. Cloud computing & productivity software. Micro interest revenue auto-purified by Zakat Agent."
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    category: "Equity",
    sector: "E-Commerce & AWS",
    price: 184.20,
    change24h: 1.12,
    complianceStatus: "COMPLIANT",
    debtRatio: 22.1,
    cashInterestRatio: 11.4,
    impermissibleRevenue: 2.1,
    purificationPerShare: 0.03,
    allocationPercent: 10.0,
    holdingShares: 30,
    currentValue: 5526.00,
    aaoifiScore: 94,
    reasoning: "Passes AAOIFI Standard 21. Core e-commerce retail and AWS cloud infrastructure."
  },
  {
    ticker: "LLY",
    name: "Eli Lilly and Company",
    category: "Equity",
    sector: "Pharmaceuticals",
    price: 885.40,
    change24h: 2.75,
    complianceStatus: "COMPLIANT",
    debtRatio: 19.8,
    cashInterestRatio: 5.2,
    impermissibleRevenue: 0.5,
    purificationPerShare: 0.02,
    allocationPercent: 8.0,
    holdingShares: 5,
    currentValue: 4427.00,
    aaoifiScore: 96,
    reasoning: "Passes AAOIFI Standard 21. Halal healthcare & life-saving metabolic therapeutic drug solutions."
  },

  // --- SUKUK & ISLAMIC FIXED INCOME ---
  {
    ticker: "SUKUK-US3Y",
    name: "US Treasury Sovereign Sukuk (3-5Y)",
    category: "Sukuk",
    sector: "Islamic Fixed Income",
    price: 101.40,
    change24h: 0.15,
    complianceStatus: "COMPLIANT",
    debtRatio: 0.0,
    cashInterestRatio: 0.0,
    impermissibleRevenue: 0.0,
    purificationPerShare: 0.00,
    allocationPercent: 12.0,
    holdingShares: 65,
    currentValue: 6591.00,
    aaoifiScore: 100,
    reasoning: "100% Asset-backed Sovereign Ijarah Sukuk certificate. Zero interest/riba, rental profit distribution structure."
  },
  {
    ticker: "SUKUK-GREEN",
    name: "Global ESG Green Sovereign Sukuk",
    category: "Sukuk",
    sector: "Sustainable Infrastructure",
    price: 99.80,
    change24h: 0.20,
    complianceStatus: "COMPLIANT",
    debtRatio: 0.0,
    cashInterestRatio: 0.0,
    impermissibleRevenue: 0.0,
    purificationPerShare: 0.00,
    allocationPercent: 8.0,
    holdingShares: 45,
    currentValue: 4491.00,
    aaoifiScore: 100,
    reasoning: "Asset-backed Mudarabah structure for renewable energy projects across OIC economies."
  },

  // --- COMMODITIES & REAL ASSETS ---
  {
    ticker: "XAU-GOLD",
    name: "Physical Gold Spot (Allocated)",
    category: "Commodities",
    sector: "Precious Metals",
    price: 2432.50,
    change24h: 0.65,
    complianceStatus: "COMPLIANT",
    debtRatio: 0.0,
    cashInterestRatio: 0.0,
    impermissibleRevenue: 0.0,
    purificationPerShare: 0.00,
    allocationPercent: 10.0,
    holdingShares: 2.25,
    currentValue: 5473.12,
    aaoifiScore: 100,
    reasoning: "Direct physical vault-allocated gold holding. Full compliance with AAOIFI Gold Standard for spot hand-to-hand exchange."
  },

  // --- ISLAMIC REITS & HALAL CRYPTO ---
  {
    ticker: "EQIX-REIT",
    name: "Equinix Data Center Sharia REIT",
    category: "Islamic REIT",
    sector: "Real Estate Infrastructure",
    price: 812.00,
    change24h: 0.88,
    complianceStatus: "COMPLIANT",
    debtRatio: 26.4,
    cashInterestRatio: 4.1,
    impermissibleRevenue: 1.1,
    purificationPerShare: 0.12,
    allocationPercent: 5.0,
    holdingShares: 3.5,
    currentValue: 2842.00,
    aaoifiScore: 93,
    reasoning: "Physical data center leasing rental income. Passes AAOIFI debt ratio screen (<33%)."
  },
  {
    ticker: "BTC-SPOT",
    name: "Bitcoin Spot (0x Leverage)",
    category: "Crypto Asset",
    sector: "Digital Store of Value",
    price: 61400.00,
    change24h: 4.10,
    complianceStatus: "COMPLIANT",
    debtRatio: 0.0,
    cashInterestRatio: 0.0,
    impermissibleRevenue: 0.0,
    purificationPerShare: 0.00,
    allocationPercent: 4.0,
    holdingShares: 0.035,
    currentValue: 2149.00,
    aaoifiScore: 98,
    reasoning: "Spot holdings only. Zero margin lending, zero futures, zero interest yield staking."
  },

  // --- IMPERMISSIBLE / NON-COMPLIANT ASSETS (FOR SCREENER DEMONSTRATION & VETO AUDIT) ---
  {
    ticker: "JPM",
    name: "JPMorgan Chase & Co.",
    category: "Equity",
    sector: "Conventional Banking",
    price: 208.40,
    change24h: -0.45,
    complianceStatus: "NON_COMPLIANT",
    debtRatio: 78.4, // FAILS (> 33%)
    cashInterestRatio: 84.1, // FAILS (> 33%)
    impermissibleRevenue: 92.5, // FAILS (> 5%)
    purificationPerShare: 0.00,
    allocationPercent: 0.0,
    holdingShares: 0,
    currentValue: 0,
    aaoifiScore: 0,
    reasoning: "STRICT VETO: Conventional interest-bearing bank (Riba). Core business model revolves around interest lending. Excluded by Sharia Guardian Agent."
  },
  {
    ticker: "BUD",
    name: "Anheuser-Busch InBev",
    category: "Equity",
    sector: "Alcohol & Beverages",
    price: 58.20,
    change24h: 0.10,
    complianceStatus: "NON_COMPLIANT",
    debtRatio: 42.1,
    cashInterestRatio: 12.0,
    impermissibleRevenue: 98.0, // FAILS (> 5%)
    purificationPerShare: 0.00,
    allocationPercent: 0.0,
    holdingShares: 0,
    currentValue: 0,
    aaoifiScore: 0,
    reasoning: "STRICT VETO: Primary revenue derived from alcoholic beverage manufacturing & distribution. Haram business sector."
  },
  {
    ticker: "CZR",
    name: "Caesars Entertainment",
    category: "Equity",
    sector: "Casinos & Gambling",
    price: 36.80,
    change24h: -1.20,
    complianceStatus: "NON_COMPLIANT",
    debtRatio: 64.2,
    cashInterestRatio: 18.5,
    impermissibleRevenue: 95.0, // FAILS (> 5%)
    purificationPerShare: 0.00,
    allocationPercent: 0.0,
    holdingShares: 0,
    currentValue: 0,
    aaoifiScore: 0,
    reasoning: "STRICT VETO: Gambling / Maysir revenue. Excluded by Sharia Guardian Agent."
  }
];

export const INITIAL_PORTFOLIO_SUMMARY = {
  totalCapitalUSD: 54980.50,
  dailyProfitUSD: 1142.80,
  dailyProfitPercent: 2.12,
  halalYieldAPY: 14.85,
  shariaCertification: "AAOIFI Compliant (Standard 21 & 59)",
  purifiedCharityTotalUSD: 142.30,
  zakatPayableUSD: 1374.51,
  nisabGoldThresholdUSD: 5840.00,
  brokerConnected: {
    name: "Alpaca Securities",
    mode: "Autonomous Live API", // or 'Paper Trading Sandbox'
    accountNo: "ALP-889420-SHARIA",
    buyingPowerUSD: 8520.00,
    withdrawalsAllowed: false, // Security Guardrail
    apiConnected: true
  }
};
