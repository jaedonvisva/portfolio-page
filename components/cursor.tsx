"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(false)
  const rectRef = useRef({ x: 0, y: 0, w: 0, h: 0 })
  const currentRef = useRef({ x: 0, y: 0, w: 0, h: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const LINK_PX = 4
    const LINK_PY = 1
    const BLOCK_PX = 8
    const BLOCK_PY = 6

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      const target = rectRef.current
      const cur = currentRef.current

      if (activeRef.current) {
        cur.x = lerp(cur.x, target.x, 0.12)
        cur.y = lerp(cur.y, target.y, 0.12)
        cur.w = lerp(cur.w, target.w, 0.12)
        cur.h = lerp(cur.h, target.h, 0.12)

        cursor.style.opacity = "1"
        cursor.style.transform = `translate(${cur.x}px, ${cur.y}px)`
        cursor.style.width = `${cur.w}px`
        cursor.style.height = `${cur.h}px`
      } else {
        cursor.style.opacity = "0"
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]")
      if (!el || el.hasAttribute("data-no-cursor")) {
        activeRef.current = false
        return
      }
      const r = el.getBoundingClientRect()
      const isBlock = el.hasAttribute("data-cursor")
      const px = isBlock ? BLOCK_PX : LINK_PX
      const py = isBlock ? BLOCK_PY : LINK_PY
      rectRef.current = {
        x: r.left - px,
        y: r.top - py,
        w: r.width + px * 2,
        h: r.height + py * 2,
      }
      currentRef.current = { ...rectRef.current }
      activeRef.current = true
    }

    const onMouseMove = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]")
      if (!el || el.hasAttribute("data-no-cursor")) {
        activeRef.current = false
        return
      }
      const r = el.getBoundingClientRect()
      const isBlock = el.hasAttribute("data-cursor")
      const px = isBlock ? BLOCK_PX : LINK_PX
      const py = isBlock ? BLOCK_PY : LINK_PY
      rectRef.current = {
        x: r.left - px,
        y: r.top - py,
        w: r.width + px * 2,
        h: r.height + py * 2,
      }
      activeRef.current = true
    }

    const onMouseLeave = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor]")
      if (el) return
      activeRef.current = false
    }

    window.addEventListener("mouseover", onMouseOver)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseout", onMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mouseover", onMouseOver)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseout", onMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-[6px] bg-white/5"
      style={{
        opacity: 0,
        transition: "opacity 0.15s ease",
        willChange: "transform, width, height",
      }}
    />
  )
}
