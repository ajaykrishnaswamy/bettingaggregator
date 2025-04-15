import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getMarketById } from "@/lib/market-data"
import { OddsComparison } from "@/components/odds-comparison"
import { PlatformLogo } from "@/components/platform-logo"
import { RefreshButton } from "@/components/refresh-button"
import { MarketHistoryChart } from "@/components/market-history-chart"
import { formatTimeAgo } from "@/lib/utils"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

interface MarketDetailPageProps {
  params: {
    id: string
  }
}

export default async function MarketDetailPage({ params }: MarketDetailPageProps) {
  const market = await getMarketById(params.id)

  if (!market) {
    notFound()
  }

  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 py-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="ml-1">Back</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{market.eventName}</h1>
            {market.hasArbitrage && (
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900"
              >
                Arbitrage
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {market.marketName} • Last updated {formatTimeAgo(market.lastUpdated)}
          </p>
        </div>
        <RefreshButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Odds Comparison</CardTitle>
              <CardDescription>Compare odds across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <OddsComparison outcomes={market.outcomes} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(market.platforms).map(([platform, url]) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlatformLogo platform={platform} className="h-5 w-5" />
                      <span>{platform}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd>{market.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Event Date</dt>
                  <dd>{new Date(market.eventDate).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Liquidity</dt>
                  <dd>${market.liquidity.toLocaleString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1d">
            <TabsList className="mb-4">
              <TabsTrigger value="1d">1d</TabsTrigger>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
            </TabsList>

            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <TabsContent value="1d">
                <MarketHistoryChart marketId={market.id} period="1d" />
              </TabsContent>
              <TabsContent value="7d">
                <MarketHistoryChart marketId={market.id} period="7d" />
              </TabsContent>
              <TabsContent value="30d">
                <MarketHistoryChart marketId={market.id} period="30d" />
              </TabsContent>
            </Suspense>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
