import type { MarketOutcome } from "@/lib/types"
import { formatOdds } from "@/lib/utils"

interface OddsComparisonProps {
  outcomes: MarketOutcome[]
}

export function OddsComparison({ outcomes }: OddsComparisonProps) {
  // Find best odds for each outcome
  const bestOddsByOutcome = outcomes.reduce(
    (acc, outcome) => {
      const bestOdds = Math.max(...Object.values(outcome.odds))
      acc[outcome.name] = bestOdds
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-3">
      {outcomes.map((outcome) => (
        <div key={outcome.name} className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-medium">{outcome.name}</span>
            <span className="text-xs text-muted-foreground">
              Implied prob: {Math.round((1 / Object.values(outcome.odds)[0]) * 100)}%
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(outcome.odds).map(([platform, decimal]) => {
              const isHighestOdds = decimal === bestOddsByOutcome[outcome.name]

              return (
                <div
                  key={platform}
                  className={`p-2 rounded-md border flex justify-between items-center text-sm
                    ${isHighestOdds ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900" : "bg-background"}`}
                >
                  <span className="text-xs">{platform}</span>
                  <span className={isHighestOdds ? "font-bold" : ""}>{formatOdds(decimal, "decimal")}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
