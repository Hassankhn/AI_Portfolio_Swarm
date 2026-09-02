// Initial event logs and stream templates for Al-Mizan Multi-Agent Swarm

export const INITIAL_AGENT_LOGS = [
  {
    id: "log-101",
    timestamp: "02:39:12",
    agent: "Sharia Guardian",
    agentBadge: "🛡️ SHARIA",
    type: "AUDIT_PASS",
    message: "AAOIFI Standard 21 Audit complete for NVDA. Debt/MarketCap = 4.8% (<33%), Cash Interest = 8.9% (<33%). Approved for DCA buy order.",
    status: "success"
  },
  {
    id: "log-102",
    timestamp: "02:39:14",
    agent: "Broker Execution",
    agentBadge: "🔑 BROKER API",
    type: "LIVE_ORDER",
    message: "Executed Alpaca API Spot Buy: 5 shares NVDA @ $128.80. Order ID: #ALP-994182. 0x Leverage applied.",
    status: "info"
  },
  {
    id: "log-103",
    timestamp: "02:39:28",
    agent: "Macro Sentiment",
    agentBadge: "🌐 MACRO",
    type: "NEWS_ANALYSIS",
    message: "Global inflation print decelerating. Tech sector momentum elevated. Recommending +2.5% shift to Halal Semiconductors.",
    status: "info"
  },
  {
    id: "log-104",
    timestamp: "02:39:45",
    agent: "Sharia Guardian",
    agentBadge: "🛡️ SHARIA",
    type: "VETO_BLOCKED",
    message: "ALERT VETO: Blocked trade request for JPM (JPMorgan Chase). Reason: Conventional banking / Riba income ratio is 92.5% (>5%). Zero non-sharia funds allowed.",
    status: "warning"
  },
  {
    id: "log-105",
    timestamp: "02:40:02",
    agent: "Zakat & Purification",
    agentBadge: "⚖️ ZAKAT",
    type: "PURIFICATION_EXEC",
    message: "Purified $3.18 micro-interest fraction from MSFT quarterly dividend distribution -> Automatically routed to Charity Vault #CH-994.",
    status: "purple"
  },
  {
    id: "log-106",
    timestamp: "02:40:15",
    agent: "Risk Guardian",
    agentBadge: "⚡ RISK",
    type: "CAP_CHECK",
    message: "Portfolio diversification audit passed. Max single asset NVDA capped at 22.0%. 0% leverage guardrails active.",
    status: "success"
  },
  {
    id: "log-107",
    timestamp: "02:40:35",
    agent: "Yield Quantitative",
    agentBadge: "📈 YIELD",
    type: "REBALANCE",
    message: "Harvested $145.20 yield from Green Sovereign Sukuk (SUKUK-GREEN). Auto-reinvesting into Physical Gold Spot (XAU-GOLD).",
    status: "success"
  }
];

export const AGENT_ROLES = [
  {
    id: "sharia",
    name: "Sharia Guardian AI",
    badge: "🛡️ SHARIA",
    avatar: "Shield",
    status: "ACTIVE",
    task: "Monitoring AAOIFI Standard 21 & 59 compliance continuously",
    color: "emerald"
  },
  {
    id: "yield",
    name: "Quantitative Yield AI",
    badge: "📈 YIELD",
    avatar: "TrendingUp",
    status: "ACTIVE",
    task: "Executing Halal DCA & Sukuk momentum rebalancing",
    color: "blue"
  },
  {
    id: "macro",
    name: "Macro Sentiment AI",
    badge: "🌐 MACRO",
    avatar: "Globe",
    status: "ACTIVE",
    task: "Scanning real-time earnings reports & global rate news",
    color: "cyan"
  },
  {
    id: "risk",
    name: "Risk Guardian AI",
    badge: "⚡ RISK",
    avatar: "Zap",
    status: "ACTIVE",
    task: "Enforcing 0% leverage, asset allocation caps & stop-losses",
    color: "amber"
  },
  {
    id: "zakat",
    name: "Zakat & Purification AI",
    badge: "⚖️ ZAKAT",
    avatar: "Scale",
    status: "ACTIVE",
    task: "Tracking Nisab threshold & auto-purifying micro-yields",
    color: "purple"
  },
  {
    id: "broker",
    name: "Broker API Gateway",
    badge: "🔑 BROKER API",
    avatar: "Key",
    status: "ACTIVE",
    task: "Routing approved spot orders via Alpaca/IBKR REST APIs",
    color: "gold"
  }
];
