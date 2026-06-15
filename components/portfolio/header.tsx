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
      <div className="flex items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
          className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border border-border text-xs font-mono text-muted-foreground/60 hover:text-muted-foreground hover:border-border/80 transition-colors select-none"
        >
          <kbd>⌘K</kbd>
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}
