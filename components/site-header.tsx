"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold">BetCompass</span>
          </Link>

          <nav className="flex gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Dashboard
            </Link>
            <Link
              href="/market-analysis"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/market-analysis" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Analysis
            </Link>
            <Link
              href="/platforms"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/platforms" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Platforms
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
