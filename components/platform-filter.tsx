"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { PlatformLogo } from "@/components/platform-logo"

const platforms = [
  { value: "draftkings", label: "DraftKings" },
  { value: "fanduel", label: "FanDuel" },
  { value: "kalshi", label: "Kalshi" },
  { value: "polymarket", label: "Polymarket" },
  { value: "betfair", label: "Betfair" },
]

export function PlatformFilter() {
  const [open, setOpen] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="flex items-center gap-1 w-[180px] justify-between"
        >
          {selectedPlatforms.length > 0 ? `${selectedPlatforms.length} selected` : "All Platforms"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search platforms..." />
          <CommandList>
            <CommandEmpty>No platform found.</CommandEmpty>
            <CommandGroup>
              {platforms.map((platform) => (
                <CommandItem
                  key={platform.value}
                  value={platform.value}
                  onSelect={() => {
                    setSelectedPlatforms((current) =>
                      current.includes(platform.value)
                        ? current.filter((p) => p !== platform.value)
                        : [...current, platform.value],
                    )
                  }}
                >
                  <div className="flex items-center gap-2">
                    <PlatformLogo platform={platform.value} className="h-4 w-4" />
                    {platform.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPlatforms.includes(platform.value) ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
