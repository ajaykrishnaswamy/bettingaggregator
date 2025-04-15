import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getPlatforms } from "@/lib/market-data"
import { ExternalLink, Check } from "lucide-react"
import { PlatformLogo } from "@/components/platform-logo"

export default async function PlatformsPage() {
  const platforms = await getPlatforms()

  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="py-4">
        <h1 className="text-3xl font-bold">Supported Platforms</h1>
        <p className="text-muted-foreground">Betting platforms that we collect and normalize data from</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <Card key={platform.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformLogo platform={platform.id} className="h-5 w-5" />
                  <CardTitle>{platform.name}</CardTitle>
                </div>
                <Badge variant={platform.status === "active" ? "default" : "outline"}>
                  {platform.status === "active" ? "Active" : "Coming Soon"}
                </Badge>
              </div>
              <CardDescription>{platform.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm font-medium">Supported markets:</div>
                <div className="flex flex-wrap gap-2">
                  {platform.markets.map((market) => (
                    <Badge key={market} variant="outline">
                      {market}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-1">
                {platform.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full flex items-center gap-1" asChild>
                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                  <span>Visit {platform.name}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
