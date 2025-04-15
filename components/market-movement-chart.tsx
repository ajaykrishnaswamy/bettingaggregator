"use client"

import { useState } from "react"
import type { MarketMovement } from "@/lib/types"
import { PlatformLogo } from "@/components/platform-logo"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatOdds } from "@/lib/utils"

interface MarketMovementChartProps {
  data: MarketMovement[]
  timeframe: string
}

export function MarketMovementChart({ data, timeframe }: MarketMovementChartProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const filteredData = selectedPlatform ? data.filter((item) => item.platform === selectedPlatform) : data

  // Platform filter buttons
  const platforms = Array.from(new Set(data.map((item) => item.platform)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
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

      <div className="space-y-2">
        {filteredData.length === 0 ? (
          <div className="flex justify-center items-center p-6 text-muted-foreground">
            No market movements found for the selected platform.
          </div>
        ) : (
          filteredData.map((movement) => (
            <Card key={movement.id} className="p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <PlatformLogo platform={movement.platform} className="h-4 w-4" />
                  <span className="font-medium">{movement.platform}</span>
                </div>
                <div className="text-sm">{movement.marketName}</div>
                <div className="text-xs text-muted-foreground">{movement.outcome}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">{formatOdds(movement.previousOdds, "decimal")}</div>
                <div className="text-sm">→</div>
                <div className="font-medium">{formatOdds(movement.currentOdds, "decimal")}</div>
                <Badge
                  variant="outline"
                  className={
                    movement.change > 0
                      ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }
                >
                  {movement.change > 0 ? "+" : ""}
                  {movement.change.toFixed(2)}%
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
