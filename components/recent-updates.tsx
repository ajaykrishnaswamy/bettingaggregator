import { getRecentUpdates } from "@/lib/market-data"
import { Timeline, TimelineItem } from "@/components/timeline"
import { Badge } from "@/components/ui/badge"
import { formatTimeAgo } from "@/lib/utils"
import { PlatformLogo } from "@/components/platform-logo"

export async function RecentUpdates() {
  const updates = await getRecentUpdates()

  return (
    <Timeline>
      {updates.map((update) => (
        <TimelineItem key={update.id}>
          <div className="flex gap-2 items-center">
            <PlatformLogo platform={update.platform} className="h-4 w-4" />
            <span className="font-medium">{update.platform}</span>
            <span className="text-xs text-muted-foreground">{formatTimeAgo(update.timestamp)}</span>
          </div>
          <p className="mt-1">
            {update.market}: {update.description}
          </p>
          {update.oddsChange && (
            <Badge
              variant="outline"
              className={`mt-1 ${
                update.oddsChange > 0
                  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200"
                  : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200"
              }`}
            >
              {update.oddsChange > 0 ? "+" : ""}
              {update.oddsChange}
            </Badge>
          )}
        </TimelineItem>
      ))}
    </Timeline>
  )
}
