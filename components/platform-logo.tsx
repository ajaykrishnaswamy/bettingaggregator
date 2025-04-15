import type React from "react"
import { CircleDollarSign, BarChart, TrendingUp, DollarSign, CreditCard } from "lucide-react"

interface PlatformLogoProps {
  platform: string
  className?: string
}

export function PlatformLogo({ platform, className }: PlatformLogoProps) {
  const platformIcons: Record<string, React.ReactNode> = {
    draftkings: <DollarSign className={className} />,
    fanduel: <CreditCard className={className} />,
    kalshi: <BarChart className={className} />,
    polymarket: <CircleDollarSign className={className} />,
    betfair: <TrendingUp className={className} />,
  }

  return <>{platformIcons[platform.toLowerCase()] || <CircleDollarSign className={className} />}</>
}
