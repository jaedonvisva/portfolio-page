"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { posts, getPostHref } from "@/lib/writing"

export function Writing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const latest = posts.slice(0, 3)

  return (
    <section>
      <div className="flex items-baseline justify-between mb-6 md:mb-8">
        <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground">
          Writing
        </h2>
        <Link
          href="/writing"
          className="text-xs font-mono text-muted-foreground/60 hover:text-muted-foreground transition-colors"
        >
          view all
        </Link>
      </div>
      <div className="space-y-5">
        {latest.map((post, i) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i

          return (
            <div
              key={post.slug}
              style={{
                opacity: isDimmed ? 0.4 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={getPostHref(post)} data-no-cursor className="group flex gap-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-base md:text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-[3px]" aria-hidden="true" />
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mt-0.5">
                    {post.dek}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
