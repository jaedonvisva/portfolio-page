"use client"

import Image from "next/image"
import { useState } from "react"

interface Role {
  company: string
  title: string
  description: string
  href?: string
  period: string
  logo: string
  stack?: string[]
}

const roles: Role[] = [
  {
    company: "Shopify",
    title: "Machine Learning Engineer Intern",
    description: "Incoming for Fall 2026",
    href: "https://shopify.com",
    period: "F26",
    logo: "/logos/shopify.svg",
  },
  {
    company: "Berkeley Street Capital",
    title: "Quantitative Research Intern",
    description: "Crypto microstructure signal generation",
    href: "https://berkeleystreet.ai",
    period: "W26",
    logo: "/logos/berkeley-street-capital.jpg",
    stack: ["Python", "Pytorch", "SQL"],
  },
  {
    company: "Blackstone Energy",
    title: "Machine Learning Intern",
    description: "ML pipelines for large-scale energy demand forecasting",
    href: "https://www.blackstoneenergy.com",
    period: "S25",
    logo: "/logos/blackstone.jpg",
    stack: ["Python", "sklearn", "Postgres"],
  },
]

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section>
      <h2 className="text-sm font-mono uppercase tracking-[0.12em] text-muted-foreground mb-6 md:mb-8">
        Experience
      </h2>
      <div className="space-y-6">
        {roles.map((role, i) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== i
          const isHovered = hoveredIndex === i

          return (
            <div
              key={role.company}
              className="flex gap-3.5"
              style={{
                opacity: isDimmed ? 0.4 : 1,
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="shrink-0 mt-[3px]">
                <Image
                  src={role.logo}
                  alt={`${role.company} logo`}
                  width={24}
                  height={24}
                  className="rounded-[4px] object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="text-base md:text-lg font-medium text-foreground truncate">
                      {role.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 shrink-0">
                    {role.stack && (
                      <span
                        className="text-xs font-mono text-muted-foreground/50 tracking-wide"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transition: "opacity 0.25s ease",
                        }}
                      >
                        [{" "}{role.stack.join(", ")}{" "}]
                      </span>
                    )}
                    <span className="text-sm font-mono text-muted-foreground">
                      {role.period}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-col gap-1 overflow-hidden"
                  style={{
                    maxHeight: isHovered ? "6rem" : "0px",
                    marginTop: isHovered ? "0.125rem" : "0px",
                    transition: "max-height 0.25s ease, margin-top 0.25s ease",
                  }}
                >
                  <div
                    className="flex items-start gap-2 text-base text-muted-foreground"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(0px)" : "translateX(-5px)",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <span className="text-muted-foreground/40 shrink-0 select-none">↳</span>
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base text-muted-foreground hover:text-foreground transition-colors truncate"
                      >
                        {role.company}
                      </a>
                    ) : (
                      <span className="text-base text-muted-foreground truncate">
                        {role.company}
                      </span>
                    )}
                  </div>
                  <div
                    className="flex items-start gap-2 text-base text-muted-foreground pl-5"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(0px)" : "translateX(-5px)",
                      transition: "opacity 0.2s ease 0.04s, transform 0.2s ease 0.04s",
                    }}
                  >
                    <span className="text-muted-foreground/40 shrink-0 select-none">↳</span>
                    <span>{role.description}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
