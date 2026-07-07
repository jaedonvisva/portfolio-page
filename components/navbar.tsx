"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMagnet } from "@/hooks/use-magnet"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "/", label: "home" },
  { href: "/writing", label: "writing" },
]

export function Navbar() {
  const magnet = useMagnet(0.15)
  const pathname = usePathname()

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
      <nav className="flex items-center gap-1">
        {navLinks.map(({ href, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                active
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          )
        })}
        <div className="ml-1 pl-2 border-l border-border flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
