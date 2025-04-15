"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { refreshMarketData } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

export function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshMarketData()
      toast({
        title: "Data refreshed",
        description: "Market data has been updated with the latest information.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "There was a problem refreshing the market data.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center gap-1"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
      <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
    </Button>
  )
}
