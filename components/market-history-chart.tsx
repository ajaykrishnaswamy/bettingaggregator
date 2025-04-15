"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { getMarketHistory } from "@/lib/market-data"
import { PlatformLogo } from "@/components/platform-logo"

interface MarketHistoryChartProps {
  marketId: string
  period: "1d" | "7d" | "30d"
}

export function MarketHistoryChart({ marketId, period }: MarketHistoryChartProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  // Fetch data (would be async in real implementation)
  const data = getMarketHistory(marketId, period)

  const outcomes = Array.from(new Set(data.map((item) => item.outcome)))
  const platforms = Array.from(new Set(data.map((item) => item.platform)))

  // Filter data based on selections
  const filteredData = data.filter(
    (item) =>
      (selectedOutcome === null || item.outcome === selectedOutcome) &&
      (selectedPlatform === null || item.platform === selectedPlatform),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <div className="mr-2 text-sm text-muted-foreground">Outcome:</div>
        <Badge
          variant={selectedOutcome === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedOutcome(null)}
        >
          All
        </Badge>
        {outcomes.map((outcome) => (
          <Badge
            key={outcome}
            variant={selectedOutcome === outcome ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedOutcome(outcome)}
          >
            {outcome}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="mr-2 text-sm text-muted-foreground">Platform:</div>
        <Badge
          variant={selectedPlatform === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedPlatform(null)}
        >
          All
        </Badge>
        {platforms.map((platform) => (
          <Badge
            key={platform}
            variant={selectedPlatform === platform ? "default" : "outline"}
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setSelectedPlatform(platform)}
          >
            <PlatformLogo platform={platform} className="h-3 w-3" />
            {platform}
          </Badge>
        ))}
      </div>

      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        {filteredData.length > 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p>Chart of {filteredData.length} data points would render here</p>
          </div>
        ) : (
          <p>No data available for the selected filters</p>
        )}
      </div>
    </div>
  )
}
