"use client"

import React from "react"
import { useMagnet } from "@/hooks/use-magnet"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const magnet = useMagnet(0.15)

  return (
    <header className="flex items-center justify-between mb-12 md:mb-16">
      <p
        ref={magnet.ref as React.RefObject<HTMLParagraphElement>}
        onMouseMove={magnet.onMouseMove}
        onMouseLeave={magnet.onMouseLeave}
        className="text-base font-mono text-muted-foreground tracking-tight cursor-default select-none"
      >
        [JV]
      </p>
      <ThemeToggle />
    </header>
  )
}
