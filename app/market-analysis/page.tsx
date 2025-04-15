import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getArbitrageOpportunities, getMarketMovements } from "@/lib/market-data"
import { ArbitrageList } from "@/components/arbitrage-list"
import { MarketMovementChart } from "@/components/market-movement-chart"

export default async function MarketAnalysisPage() {
  const arbitrageOpportunities = await getArbitrageOpportunities()
  const marketMovements = await getMarketMovements()

  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="py-4">
        <h1 className="text-3xl font-bold">Market Analysis</h1>
        <p className="text-muted-foreground">Discover arbitrage opportunities and track market movements</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Arbitrage Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <ArbitrageList opportunities={arbitrageOpportunities} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="24h">
              <TabsList className="mb-4">
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>

              <TabsContent value="24h">
                <MarketMovementChart data={marketMovements.day} timeframe="24h" />
              </TabsContent>

              <TabsContent value="7d">
                <MarketMovementChart data={marketMovements.week} timeframe="7d" />
              </TabsContent>

              <TabsContent value="30d">
                <MarketMovementChart data={marketMovements.month} timeframe="30d" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Platform comparison visualization will appear here
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
