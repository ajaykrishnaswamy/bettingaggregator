import { fetchMarkets } from "@/lib/market-data"
import { MarketCard } from "@/components/market-card"
import { PlatformFilter } from "@/components/platform-filter"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MarketsDashboardProps {
  category: string
}

export async function MarketsDashboard({ category }: MarketsDashboardProps) {
  const markets = await fetchMarkets(category)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-bold">{category.charAt(0).toUpperCase() + category.slice(1)} Markets</h2>
          <span className="text-muted-foreground">{markets.length} markets</span>
        </div>
        <div className="flex gap-2 items-center">
          <PlatformFilter />
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  )
}
