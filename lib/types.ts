export interface Market {
  id: string
  eventName: string
  marketName: string
  category: string
  eventDate: string
  outcomes: MarketOutcome[]
  platforms: Record<string, string> // platform name -> url
  lastUpdated: string
  hasArbitrage: boolean
  liquidity: number
}

export interface MarketOutcome {
  name: string
  odds: Record<string, number> // platform name -> decimal odds
}

export interface ArbitrageOpportunity {
  id: string
  eventName: string
  marketName: string
  profitPercentage: number
  legs: ArbitrageLeg[]
}

export interface ArbitrageLeg {
  platform: string
  outcome: string
  odds: number
  stake: number
}

export interface MarketMovement {
  id: string
  platform: string
  marketName: string
  outcome: string
  previousOdds: number
  currentOdds: number
  change: number // percentage
  timestamp: string
}

export interface MarketUpdate {
  id: string
  platform: string
  market: string
  description: string
  timestamp: string
  oddsChange?: number
}

export interface Platform {
  id: string
  name: string
  description: string
  url: string
  status: "active" | "coming_soon"
  markets: string[]
  features: string[]
}

export interface MarketHistoryData {
  timestamp: string
  outcome: string
  platform: string
  odds: number
}
