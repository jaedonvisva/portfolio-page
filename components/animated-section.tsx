"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-in-out",
        isInView ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
