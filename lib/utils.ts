import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export type OddsFormat = "decimal" | "american" | "fractional"

export function convertOddsFormat(odds: number, from: OddsFormat, to: OddsFormat): number {
  if (from === to) return odds

  // Convert to decimal first
  let decimalOdds = odds
  if (from === "american") {
    decimalOdds = odds > 0 ? odds / 100 + 1 : 100 / Math.abs(odds) + 1
  } else if (from === "fractional") {
    const [numerator, denominator] = odds.toString().split("/").map(Number)
    decimalOdds = numerator / denominator + 1
  }

  // Convert from decimal to target format
  if (to === "decimal") {
    return decimalOdds
  } else if (to === "american") {
    return decimalOdds >= 2 ? (decimalOdds - 1) * 100 : -100 / (decimalOdds - 1)
  } else if (to === "fractional") {
    // Simplified conversion for demo
    const fraction = decimalOdds - 1
    return fraction
  }

  return odds
}

export function formatOdds(odds: number, format: OddsFormat): string {
  if (format === "decimal") {
    return odds.toFixed(2)
  } else if (format === "american") {
    const americanOdds = convertOddsFormat(odds, "decimal", "american")
    return americanOdds > 0 ? `+${Math.round(americanOdds)}` : Math.round(americanOdds).toString()
  } else if (format === "fractional") {
    // Simplified for demo
    const fraction = odds - 1
    // This would need a proper fraction conversion in a real implementation
    return `${Math.round(fraction * 100) / 100}/1`
  }

  return odds.toString()
}
