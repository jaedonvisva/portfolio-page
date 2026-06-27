"use client"

import { useEffect, useState, useCallback } from "react"
import { Command, useCommandState } from "cmdk"
import { useTheme } from "next-themes"
import { ArrowUpRight } from "lucide-react"

function ValueWatcher({ onValue }: { onValue: (v: string) => void }) {
  const value = useCommandState((s) => s.value)
  useEffect(() => { onValue(value) }, [value, onValue])
  return null
}

interface Detail {
  title: string
  subtitle?: string
  meta?: string
  description?: string
  stack?: string[]
  href?: string
}

interface CommandItem {
  id: string
  label: string
  sublabel?: string
  group: string
  detail?: Detail
  action: () => void
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  const navigate = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  const commands: CommandItem[] = [
    {
      id: "shopify",
      label: "Shopify",
      sublabel: "ML Engineer Intern · F26",
      group: "Experience",
      detail: {
        title: "Machine Learning Engineer Intern",
        subtitle: "Shopify",
        meta: "Fall 2026",
        description: "Incoming role for Fall 2026.",
        stack: ["Python", "PyTorch", "Kafka"],
        href: "https://shopify.com",
      },
      action: () => navigate("https://shopify.com"),
    },
    {
      id: "bsc",
      label: "Berkeley Street Capital",
      sublabel: "Quant Research Intern · W26",
      group: "Experience",
      detail: {
        title: "Quantitative Research Intern",
        subtitle: "Berkeley Street Capital",
        meta: "Winter 2026",
        description: "Crypto microstructure signal generation.",
        stack: ["Python", "PyTorch", "SQL"],
        href: "https://berkeleystreet.ai",
      },
      action: () => navigate("https://berkeleystreet.ai"),
    },
    {
      id: "blackstone",
      label: "Blackstone Energy",
      sublabel: "ML Intern · S25",
      group: "Experience",
      detail: {
        title: "Machine Learning Engineer Intern",
        subtitle: "Blackstone Energy",
        meta: "Summer 2025",
        description: "ML pipelines for large-scale energy demand forecasting.",
        stack: ["Python", "sklearn", "Postgres"],
        href: "https://www.blackstoneenergy.com",
      },
      action: () => navigate("https://www.blackstoneenergy.com"),
    },
    {
      id: "watmarket",
      label: "WatMarket",
      sublabel: "Prediction market",
      group: "Projects",
      detail: {
        title: "WatMarket",
        description: "Prediction market for the University of Waterloo.",
        href: "https://watmarket.ca",
      },
      action: () => navigate("https://watmarket.ca"),
    },
    {
      id: "neuroblocks",
      label: "Neuroblocks",
      sublabel: "BCI platform",
      group: "Projects",
      detail: {
        title: "Neuroblocks",
        description: "No-code app development platform for brain-computer interfaces.",
        href: "https://dorahacks.io/buidl/21627",
      },
      action: () => navigate("https://dorahacks.io/buidl/21627"),
    },
    {
      id: "theme",
      label: resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      group: "Preferences",
      action: () => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); setOpen(false) },
    },
    {
      id: "github",
      label: "GitHub",
      group: "Links",
      action: () => navigate("https://github.com/jaedonvisva"),
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      group: "Links",
      action: () => navigate("https://linkedin.com/in/jaedonvisva"),
    },
    {
      id: "twitter",
      label: "Twitter / X",
      group: "Links",
      action: () => navigate("https://x.com/jaedonvisva"),
    },
  ]

  const activeDetail = commands.find((c) => c.id === selected)?.detail
  const handleValue = useCallback((v: string) => setSelected(v || null), [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", down)
    return () => window.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (!open) setSelected(null)
  }, [open])

  if (!open) return null

  const groups = ["Experience", "Projects", "Preferences", "Links"]
  const groupHeadingClass = "**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-[10px] **:[[cmdk-group-heading]]:font-mono **:[[cmdk-group-heading]]:uppercase **:[[cmdk-group-heading]]:tracking-widest **:[[cmdk-group-heading]]:text-muted-foreground/40"

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-start justify-center pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-[640px] mx-4 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* List pane */}
        <div className="flex-1 min-w-0 border-r border-border flex flex-col">
          <Command shouldFilter={true}>
            <ValueWatcher onValue={handleValue} />
            <Command.Input
              placeholder="Search..."
              className="w-full px-4 py-3.5 text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none font-sans border-b border-border"
              autoFocus
            />
            <Command.List className="max-h-[360px] overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-muted-foreground font-sans">
                No results.
              </Command.Empty>
              {groups.map((group) => {
                const items = commands.filter((c) => c.group === group)
                if (!items.length) return null
                return (
                  <Command.Group key={group} heading={group} className={groupHeadingClass}>
                    {items.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.id}
                        keywords={[item.label, item.sublabel ?? ""]}
                        onSelect={item.action}
                        className="flex items-center justify-between gap-2 px-2 py-2 rounded-[6px] cursor-pointer select-none aria-selected:bg-muted transition-colors font-sans"
                      >
                        <span className="text-sm text-foreground">{item.label}</span>
                        {item.sublabel && (
                          <span className="text-xs font-mono text-muted-foreground/50 shrink-0">{item.sublabel}</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )
              })}
            </Command.List>
          </Command>
          <div className="px-4 py-2 border-t border-border">
            <span className="text-[10px] font-mono text-muted-foreground/30 tracking-wide">
              ↑↓ navigate &nbsp; ↵ open &nbsp; esc close
            </span>
          </div>
        </div>

        {/* Detail pane */}
        <div className="w-[220px] shrink-0 p-4 flex flex-col gap-3">
          {activeDetail ? (
            <>
              <div>
                <p className="text-sm font-medium text-foreground leading-snug">{activeDetail.title}</p>
                {activeDetail.subtitle && (
                  <p className="text-xs text-muted-foreground mt-0.5">{activeDetail.subtitle}</p>
                )}
                {activeDetail.meta && (
                  <p className="text-[10px] font-mono text-muted-foreground/50 mt-1">{activeDetail.meta}</p>
                )}
              </div>
              {activeDetail.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">{activeDetail.description}</p>
              )}
              {activeDetail.stack && (
                <p className="text-[10px] font-mono text-muted-foreground/50 leading-relaxed">
                  [ {activeDetail.stack.join(", ")} ]
                </p>
              )}
              {activeDetail.href && (
                <a
                  href={activeDetail.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center gap-1 text-[10px] font-mono text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                >
                  open <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[10px] font-mono text-muted-foreground/25 text-center leading-relaxed">
                hover an item<br />to preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
