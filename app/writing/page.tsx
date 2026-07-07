import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { posts, series, getSeriesPosts, getPostHref } from "@/lib/writing"

export const metadata: Metadata = {
  title: "Writing — jaedon visva",
  description: "Articles about things I'm building and learning about.",
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export default function WritingIndexPage() {
  const standalonePosts = posts.filter((p) => !p.series)

  return (
    <section>
      <h1 className="text-[1.8rem] md:text-[2.2rem] font-semibold tracking-[-0.035em] leading-[1.15] text-foreground text-balance">
        writing
      </h1>
      <p className="mt-5 text-base md:text-lg leading-[1.75] text-muted-foreground">
        {"things i'm learning, written down."}
      </p>

      <div className="mt-8 space-y-10">
        {series.map((s) => {
          const seriesPosts = getSeriesPosts(s.slug)
          if (seriesPosts.length === 0) return null
          return (
            <div key={s.slug}>
              <div className="mb-4">
                <span className="text-base md:text-lg font-medium text-foreground">
                  {s.title}
                </span>
                <p className="mt-1 text-base text-muted-foreground leading-relaxed">
                  {s.dek}
                </p>
              </div>
              <div className="ml-4 border-l border-border pl-5 space-y-5">
                {seriesPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={getPostHref(post)}
                    data-no-cursor
                    className="group block"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm md:text-base font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                        {post.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-xs font-mono text-muted-foreground/50 tracking-wide">
                      {formatDate(post.date)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {standalonePosts.map((post) => (
          <Link
            key={post.slug}
            href={getPostHref(post)}
            data-no-cursor
            className="group block"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-base md:text-lg font-medium text-foreground group-hover:text-muted-foreground transition-colors">
                {post.title}
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-[3px]" aria-hidden="true" />
            </div>
            <p className="mt-1 text-base text-muted-foreground leading-relaxed">
              {post.dek}
            </p>
            <p className="mt-2 text-xs font-mono text-muted-foreground/50 tracking-wide">
              {formatDate(post.date)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
