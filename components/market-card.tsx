import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatTimeAgo } from "@/lib/utils"
import { PlatformLogo } from "@/components/platform-logo"
import { OddsComparison } from "@/components/odds-comparison"
import type { Market } from "@/lib/types"
import Link from "next/link"

interface MarketCardProps {
  market: Market
}

export function MarketCard({ market }: MarketCardProps) {
  const hasArbitrage = market.hasArbitrage

  return (
    <Link href={`/markets/${market.id}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-lg">{market.eventName}</CardTitle>
            {hasArbitrage && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900"
              >
                Arbitrage
              </Badge>
            )}
          </div>
          <CardDescription className="flex items-center justify-between">
            <span>{market.marketName}</span>
            <span className="text-xs text-muted-foreground">Updated {formatTimeAgo(market.lastUpdated)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OddsComparison outcomes={market.outcomes} />
        </CardContent>
        <CardFooter className="bg-muted/50 text-xs border-t flex gap-1 flex-wrap">
          {Object.keys(market.platforms).map((platform) => (
            <div key={platform} className="flex items-center gap-1">
              <PlatformLogo platform={platform} className="h-4 w-4" />
              <span>{platform}</span>
            </div>
          ))}
        </CardFooter>
      </Card>
    </Link>
  )
}
