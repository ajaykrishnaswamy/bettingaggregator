import type React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  className?: string
  children: React.ReactNode
}

export function Timeline({ className, children }: TimelineProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}

interface TimelineItemProps {
  className?: string
  children: React.ReactNode
}

export function TimelineItem({ className, children }: TimelineItemProps) {
  return (
    <div className={cn("relative pl-6 pb-4 pt-1", className)}>
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-primary bg-background"></div>
      <div className="absolute left-1.5 top-5 h-full w-px bg-border"></div>
      <div>{children}</div>
    </div>
  )
}
