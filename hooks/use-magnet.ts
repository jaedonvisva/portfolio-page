"use client"

import { useRef, useCallback } from "react"

export function useMagnet(strength = 0.15) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      el.style.transition = "transform 0.1s ease-out"
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
    el.style.transition = "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
