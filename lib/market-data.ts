import type { Market, ArbitrageOpportunity, MarketMovement, MarketUpdate, Platform, MarketHistoryData } from "./types"

/**
 * Fetch markets by category
 */
export async function fetchMarkets(category: string): Promise<Market[]> {
  // This would actually fetch from an API or database
  // For now, we'll return mock data

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const mockMarkets: Market[] = [
    {
      id: "market-1",
      eventName: "NFL: Chiefs vs Ravens",
      marketName: "Moneyline",
      category: "sports",
      eventDate: "2025-02-12T20:00:00Z",
      outcomes: [
        {
          name: "Chiefs",
          odds: {
            DraftKings: 2.1,
            FanDuel: 2.15,
            Betfair: 2.12,
          },
        },
        {
          name: "Ravens",
          odds: {
            DraftKings: 1.8,
            FanDuel: 1.75,
            Betfair: 1.78,
          },
        },
      ],
      platforms: {
        DraftKings: "https://example.com/draftkings",
        FanDuel: "https://example.com/fanduel",
        Betfair: "https://example.com/betfair",
      },
      lastUpdated: new Date().toISOString(),
      hasArbitrage: false,
      liquidity: 250000,
    },
    {
      id: "market-2",
      eventName: "2024 Presidential Election",
      marketName: "Winner",
      category: "politics",
      eventDate: "2024-11-05T00:00:00Z",
      outcomes: [
        {
          name: "Republican Candidate",
          odds: {
            Kalshi: 1.9,
            Polymarket: 1.95,
            Betfair: 1.92,
          },
        },
        {
          name: "Democratic Candidate",
          odds: {
            Kalshi: 2.05,
            Polymarket: 2.0,
            Betfair: 2.1,
          },
        },
      ],
      platforms: {
        Kalshi: "https://example.com/kalshi",
        Polymarket: "https://example.com/polymarket",
        Betfair: "https://example.com/betfair",
      },
      lastUpdated: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      hasArbitrage: true,
      liquidity: 1500000,
    },
    {
      id: "market-3",
      eventName: "NBA Finals 2025",
      marketName: "Champion",
      category: "sports",
      eventDate: "2025-06-15T00:00:00Z",
      outcomes: [
        {
          name: "Boston Celtics",
          odds: {
            DraftKings: 4.5,
            FanDuel: 4.6,
            Kalshi: 4.55,
          },
        },
        {
          name: "Denver Nuggets",
          odds: {
            DraftKings: 5.2,
            FanDuel: 5.0,
            Kalshi: 5.15,
          },
        },
        {
          name: "Los Angeles Lakers",
          odds: {
            DraftKings: 6.5,
            FanDuel: 6.6,
            Kalshi: 6.45,
          },
        },
      ],
      platforms: {
        DraftKings: "https://example.com/draftkings",
        FanDuel: "https://example.com/fanduel",
        Kalshi: "https://example.com/kalshi",
      },
      lastUpdated: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      hasArbitrage: false,
      liquidity: 750000,
    },
    {
      id: "market-4",
      eventName: "Fed Interest Rate Decision",
      marketName: "June 2024 Rate Hike",
      category: "finance",
      eventDate: "2024-06-15T18:00:00Z",
      outcomes: [
        {
          name: "Rate Increase",
          odds: {
            Kalshi: 3.25,
            Polymarket: 3.3,
            Betfair: 3.2,
          },
        },
        {
          name: "No Change",
          odds: {
            Kalshi: 1.45,
            Polymarket: 1.42,
            Betfair: 1.47,
          },
        },
        {
          name: "Rate Decrease",
          odds: {
            Kalshi: 5.5,
            Polymarket: 5.6,
            Betfair: 5.45,
          },
        },
      ],
      platforms: {
        Kalshi: "https://example.com/kalshi",
        Polymarket: "https://example.com/polymarket",
        Betfair: "https://example.com/betfair",
      },
      lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      hasArbitrage: false,
      liquidity: 500000,
    },
    {
      id: "market-5",
      eventName: "2024 Oscars",
      marketName: "Best Picture",
      category: "entertainment",
      eventDate: "2024-02-28T01:00:00Z",
      outcomes: [
        {
          name: "Oppenheimer",
          odds: {
            DraftKings: 1.35,
            Polymarket: 1.32,
            Betfair: 1.38,
          },
        },
        {
          name: "Barbie",
          odds: {
            DraftKings: 3.75,
            Polymarket: 3.8,
            Betfair: 3.7,
          },
        },
        {
          name: "Killers of the Flower Moon",
          odds: {
            DraftKings: 6.5,
            Polymarket: 6.4,
            Betfair: 6.6,
          },
        },
      ],
      platforms: {
        DraftKings: "https://example.com/draftkings",
        Polymarket: "https://example.com/polymarket",
        Betfair: "https://example.com/betfair",
      },
      lastUpdated: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      hasArbitrage: true,
      liquidity: 350000,
    },
    {
      id: "market-6",
      eventName: "English Premier League",
      marketName: "2024/25 Champion",
      category: "sports",
      eventDate: "2025-05-20T16:00:00Z",
      outcomes: [
        {
          name: "Manchester City",
          odds: {
            DraftKings: 2.0,
            FanDuel: 1.95,
            Betfair: 2.05,
          },
        },
        {
          name: "Arsenal",
          odds: {
            DraftKings: 3.5,
            FanDuel: 3.6,
            Betfair: 3.45,
          },
        },
        {
          name: "Liverpool",
          odds: {
            DraftKings: 4.25,
            FanDuel: 4.3,
            Betfair: 4.2,
          },
        },
      ],
      platforms: {
        DraftKings: "https://example.com/draftkings",
        FanDuel: "https://example.com/fanduel",
        Betfair: "https://example.com/betfair",
      },
      lastUpdated: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      hasArbitrage: false,
      liquidity: 900000,
    },
  ]

  return mockMarkets.filter((market) => market.category === category || category === "all")
}

/**
 * Get a specific market by ID
 */
export async function getMarketById(id: string): Promise<Market | null> {
  // This would fetch from API/database
  // For now, we'll return mock data

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Call fetchMarkets to get all markets and filter
  const allMarkets = await fetchMarkets("all")
  return allMarkets.find((market) => market.id === id) || null
}

/**
 * Get recent market updates
 */
export async function getRecentUpdates(): Promise<MarketUpdate[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return [
    {
      id: "update-1",
      platform: "DraftKings",
      market: "NFL: Chiefs vs Ravens - Moneyline",
      description: "Chiefs odds shortened",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      oddsChange: -0.15,
    },
    {
      id: "update-2",
      platform: "Polymarket",
      market: "2024 Presidential Election - Winner",
      description: "Republican candidate odds lengthened",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      oddsChange: 0.1,
    },
    {
      id: "update-3",
      platform: "Kalshi",
      market: "Fed Interest Rate Decision - June 2024",
      description: "No Change probability increased",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      oddsChange: 0.05,
    },
    {
      id: "update-4",
      platform: "Betfair",
      market: "NBA Finals 2025 - Champion",
      description: "Boston Celtics odds shortened",
      timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      oddsChange: -0.2,
    },
    {
      id: "update-5",
      platform: "FanDuel",
      market: "English Premier League - 2024/25 Champion",
      description: "Liverpool odds lengthened",
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      oddsChange: 0.35,
    },
  ]
}

/**
 * Get arbitrage opportunities
 */
export async function getArbitrageOpportunities(): Promise<ArbitrageOpportunity[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "arb-1",
      eventName: "2024 Presidential Election",
      marketName: "Winner",
      profitPercentage: 2.45,
      legs: [
        {
          platform: "Kalshi",
          outcome: "Republican Candidate",
          odds: 1.9,
          stake: 52.63,
        },
        {
          platform: "Betfair",
          outcome: "Democratic Candidate",
          odds: 2.1,
          stake: 47.37,
        },
      ],
    },
    {
      id: "arb-2",
      eventName: "2024 Oscars",
      marketName: "Best Picture",
      profitPercentage: 1.85,
      legs: [
        {
          platform: "DraftKings",
          outcome: "Oppenheimer",
          odds: 1.35,
          stake: 73.53,
        },
        {
          platform: "Betfair",
          outcome: "Barbie",
          odds: 3.7,
          stake: 26.47,
        },
      ],
    },
    {
      id: "arb-3",
      eventName: "Fed Interest Rate Decision",
      marketName: "June 2024 Rate Hike",
      profitPercentage: 0.98,
      legs: [
        {
          platform: "Kalshi",
          outcome: "Rate Increase",
          odds: 3.25,
          stake: 30.77,
        },
        {
          platform: "Polymarket",
          outcome: "No Change",
          odds: 1.42,
          stake: 69.23,
        },
      ],
    },
  ]
}

/**
 * Get market movements (price changes)
 */
export async function getMarketMovements(): Promise<{
  day: MarketMovement[]
  week: MarketMovement[]
  month: MarketMovement[]
}> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  const dayMovements: MarketMovement[] = [
    {
      id: "movement-1",
      platform: "DraftKings",
      marketName: "NFL: Chiefs vs Ravens - Moneyline",
      outcome: "Chiefs",
      previousOdds: 2.25,
      currentOdds: 2.1,
      change: -6.67,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "movement-2",
      platform: "Polymarket",
      marketName: "2024 Presidential Election - Winner",
      outcome: "Republican Candidate",
      previousOdds: 1.85,
      currentOdds: 1.95,
      change: 5.41,
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: "movement-3",
      platform: "Kalshi",
      marketName: "Fed Interest Rate Decision - June 2024",
      outcome: "No Change",
      previousOdds: 1.4,
      currentOdds: 1.45,
      change: 3.57,
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    },
  ]

  const weekMovements: MarketMovement[] = [
    ...dayMovements,
    {
      id: "movement-4",
      platform: "Betfair",
      marketName: "NBA Finals 2025 - Champion",
      outcome: "Boston Celtics",
      previousOdds: 4.8,
      currentOdds: 4.5,
      change: -6.25,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: "movement-5",
      platform: "FanDuel",
      marketName: "English Premier League - 2024/25 Champion",
      outcome: "Liverpool",
      previousOdds: 4.0,
      currentOdds: 4.25,
      change: 6.25,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    },
  ]

  const monthMovements: MarketMovement[] = [
    ...weekMovements,
    {
      id: "movement-6",
      platform: "DraftKings",
      marketName: "NBA Finals 2025 - Champion",
      outcome: "Denver Nuggets",
      previousOdds: 5.5,
      currentOdds: 5.2,
      change: -5.45,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    },
    {
      id: "movement-7",
      platform: "Kalshi",
      marketName: "2024 Oscars - Best Picture",
      outcome: "Oppenheimer",
      previousOdds: 1.45,
      currentOdds: 1.35,
      change: -6.9,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
  ]

  return {
    day: dayMovements,
    week: weekMovements,
    month: monthMovements,
  }
}

/**
 * Get platforms
 */
export async function getPlatforms(): Promise<Platform[]> {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  return [
    {
      id: "draftkings",
      name: "DraftKings",
      description: "Sports betting and daily fantasy sports provider",
      url: "https://www.draftkings.com",
      status: "active",
      markets: ["Sports", "Entertainment", "Politics"],
      features: ["Real-time odds updates", "Decimal and American odds formats", "Deep market depth"],
    },
    {
      id: "fanduel",
      name: "FanDuel",
      description: "Leading sports betting platform in the US market",
      url: "https://www.fanduel.com",
      status: "active",
      markets: ["Sports", "Casino", "Racing"],
      features: ["Live betting", "Cash out feature", "Parlay/Accumulator options"],
    },
    {
      id: "kalshi",
      name: "Kalshi",
      description: "CFTC-regulated event prediction market",
      url: "https://www.kalshi.com",
      status: "active",
      markets: ["Politics", "Economics", "Environment", "Science"],
      features: ["Regulatory compliance", "Event contracts", "Binary outcome markets"],
    },
    {
      id: "polymarket",
      name: "Polymarket",
      description: "Decentralized prediction market platform",
      url: "https://www.polymarket.com",
      status: "active",
      markets: ["Politics", "Crypto", "Entertainment", "Sports"],
      features: ["Blockchain-based", "USDC settlements", "Global access"],
    },
    {
      id: "betfair",
      name: "Betfair",
      description: "World's largest betting exchange",
      url: "https://www.betfair.com",
      status: "active",
      markets: ["Sports", "Politics", "Entertainment", "Financial"],
      features: ["Peer-to-peer betting", "Back and lay options", "Best odds guarantee"],
    },
    {
      id: "pinnacle",
      name: "Pinnacle",
      description: "High-limit, low-margin sportsbook",
      url: "https://www.pinnacle.com",
      status: "coming_soon",
      markets: ["Sports", "Esports"],
      features: ["High limits", "Sharp odds", "No account restrictions"],
    },
  ]
}

/**
 * Get market price history
 */
export function getMarketHistory(marketId: string, period: string): MarketHistoryData[] {
  // In a real app, this would fetch from an API or database
  // For now, return mock data

  const mockData: MarketHistoryData[] = []
  const now = new Date()

  // Generate mock history data
  const platforms = ["DraftKings", "FanDuel", "Kalshi", "Polymarket", "Betfair"]
  const outcomes = ["Option A", "Option B"]

  let days = 1
  if (period === "7d") days = 7
  if (period === "30d") days = 30

  // Generate data points
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)

    // Multiple data points per day
    for (let h = 0; h < 4; h++) {
      const timestamp = new Date(date.getTime() - h * 4 * 60 * 60 * 1000).toISOString()

      // Data for each platform and outcome
      platforms.forEach((platform) => {
        if (Math.random() > 0.3) {
          // Some platforms might not have data for every point
          outcomes.forEach((outcome) => {
            // Base odds plus some random variation
            const baseOdds = outcome === "Option A" ? 1.8 : 2.1
            const variation = (Math.random() - 0.5) * 0.3

            mockData.push({
              timestamp,
              platform,
              outcome,
              odds: baseOdds + variation,
            })
          })
        }
      })
    }
  }

  return mockData
}
