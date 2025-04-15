import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshButton } from "@/components/refresh-button"
import { MarketsDashboard } from "@/components/markets-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentUpdates } from "@/components/recent-updates"

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold">BetCompass</h1>
          <p className="text-muted-foreground">Compare odds across multiple betting platforms</p>
        </div>
        <RefreshButton />
      </div>

      <Tabs defaultValue="sports">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="politics">Politics</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="sports" className="space-y-4">
          <Suspense fallback={<MarketsLoadingSkeleton />}>
            <MarketsDashboard category="sports" />
          </Suspense>
        </TabsContent>

        <TabsContent value="politics" className="space-y-4">
          <Suspense fallback={<MarketsLoadingSkeleton />}>
            <MarketsDashboard category="politics" />
          </Suspense>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Suspense fallback={<MarketsLoadingSkeleton />}>
            <MarketsDashboard category="finance" />
          </Suspense>
        </TabsContent>

        <TabsContent value="entertainment" className="space-y-4">
          <Suspense fallback={<MarketsLoadingSkeleton />}>
            <MarketsDashboard category="entertainment" />
          </Suspense>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Market Updates</h2>
        <RecentUpdates />
      </div>
    </main>
  )
}

function MarketsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[220px] rounded-lg" />
          ))}
      </div>
    </div>
  )
}
