import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { ArbitrageOpportunity } from "@/lib/types"
import { PlatformLogo } from "@/components/platform-logo"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ArbitrageListProps {
  opportunities: ArbitrageOpportunity[]
}

export function ArbitrageList({ opportunities }: ArbitrageListProps) {
  if (opportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="text-muted-foreground">No arbitrage opportunities found.</p>
        <p className="text-sm text-muted-foreground mt-1">We'll notify you when new opportunities arise.</p>
      </div>
    )
  }

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Market</TableHead>
            <TableHead>Platforms</TableHead>
            <TableHead className="text-right">Profit %</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity.id}>
              <TableCell>
                <div className="font-medium">{opportunity.marketName}</div>
                <div className="text-xs text-muted-foreground">{opportunity.eventName}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {opportunity.legs.map((leg) => (
                    <div key={leg.platform} className="flex items-center gap-1">
                      <PlatformLogo platform={leg.platform} className="h-4 w-4" />
                      <span className="text-sm">
                        {leg.platform}: {leg.outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900"
                >
                  +{opportunity.profitPercentage.toFixed(2)}%
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline" className="flex items-center gap-1">
                  <span>View</span>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
